require("dotenv").config();
const express = require("express");
// const fetch = require("node-fetch"); // Node >=18 supports global fetch; otherwise install node-fetch
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
let GROQ_API_BASE = process.env.GROQ_API_BASE || "https://api.groq.com/openai/v1";
if (GROQ_API_BASE === "https://api.groq.com" || GROQ_API_BASE.includes("console.groq.com")) {
    GROQ_API_BASE = "https://api.groq.com/openai/v1";
}
const portfolioContext = require("./data/portfolioContext");

const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const PORT = process.env.PORT || 8083;

if (!GROQ_API_KEY) {
    console.error("❌ Missing GROQ_API_KEY in .env");
    process.exit(1);
}

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
    res.json({ ok: true, message: "Server proxy to ChatGroq is active ✅" });
});

// ---------------------------
// ChatGroq Proxy Endpoint
// ---------------------------
app.post("/api/chat", async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Missing `message` field in request." });
        }

        // Prepare messages array (OpenAI-style)
        const messages = [];

        // System Prompt with Portfolio Context
        const systemPrompt = `
    You are an AI assistant for the portfolio of ${portfolioContext.personalInfo.name}.
    Your goal is to answer questions about Siva's skills, projects, and background using the provided context.
    
    Context:
    ${JSON.stringify(portfolioContext, null, 2)}
    
    Guidelines:
    - Be friendly, professional, and concise.
    - Answer as if you are a helpful assistant representing Siva.
    - If asked about contact info, provide the email and phone from the context.
    - If asked about projects, mention the specific ones in the context.
    - Do not make up facts not present in the context.
    `;

        messages.push({ role: "system", content: systemPrompt });

        if (Array.isArray(history)) {
            messages.push(...history);
        }
        messages.push({ role: "user", content: message });

        // Build payload for Groq API
        const payload = {
            model: GROQ_MODEL,
            messages,
            max_tokens: 512,
            temperature: 0.7,
            stream: true,
        };

        const apiUrl = `${GROQ_API_BASE}/chat/completions`;
        console.log("---------------------------------------------------");
        console.log("🚀 Sending request to:", apiUrl);
        console.log("🤖 Model:", GROQ_MODEL);
        console.log("---------------------------------------------------");

        // Send request to Groq API
        const upstream = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        if (!upstream.ok) {
            const text = await upstream.text();
            console.error("Groq API error:", upstream.status, text);
            return res
                .status(502)
                .json({ error: "Groq API error", status: upstream.status, details: text });
        }

        // Detect if upstream is streaming (SSE or chunked)
        const contentType = upstream.headers.get("content-type") || "";
        const isStream = /stream|event-stream|text\/plain/i.test(contentType);

        // If streaming, forward each token chunk to client
        if (isStream && upstream.body) {
            res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
            res.setHeader("Cache-Control", "no-cache, no-transform");
            res.setHeader("Connection", "keep-alive");

            const decoder = new TextDecoder("utf-8");
            const reader = upstream.body.getReader();
            let buffer = "";

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });

                    // Parse SSE format and extract "data: ..." lines
                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6).trim();
                            if (data === "[DONE]") continue;
                            try {
                                const parsed = JSON.parse(data);
                                const token = parsed?.choices?.[0]?.delta?.content || "";
                                if (token) {
                                    res.write(token);
                                }
                            } catch {
                                res.write(data);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Streaming error:", err);
            } finally {
                res.end();
            }
            return;
        }

        // Non-streaming fallback
        const json = await upstream.json();
        const reply =
            json?.choices?.[0]?.message?.content ||
            json?.choices?.[0]?.text ||
            json?.output?.[0]?.content ||
            JSON.stringify(json);

        return res.json({ reply, raw: json });
    } catch (err) {
        console.error("❌ Server Error in /api/chat:", err);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Internal Server Error" });
        } else {
            try {
                res.end();
            } catch { }
        }
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 ChatGroq Proxy running at http://localhost:${PORT}`);
});

app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("⚠️  Email credentials not found. Mocking email send.");
        console.log(`📧 Mock Email:\nFrom: ${name} <${email}>\nMessage: ${message}`);
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.status(200).json({ message: "Email sent successfully (Mock Mode)." });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: "New Contact Form Submission from Portfolio",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});
