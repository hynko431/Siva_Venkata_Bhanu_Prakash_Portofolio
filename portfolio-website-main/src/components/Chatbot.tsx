// src/components/ChatBot.tsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ChatCircle, X, PaperPlaneTilt, Robot } from "phosphor-react";

type Msg = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const questions = [
  "Hi! What's your name?",
  "Nice to meet you! What's your current role (student / dev / designer / other)?",
  "What are your top 2–3 skills or interests?",
  "Would you like to share a link to your portfolio or GitHub?",
  "Thanks! Anything else you'd like me to know or ask?"
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: String(Date.now()) + "-init",
      text: "Hi! I'm AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  // track which question in the predefined flow we're on
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  // store answers (optional)
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const chatboxRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // initial button animation
  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, delay: 1.2, ease: "back.out(1.7)" }
    );
  }, []);

  // open chatbox animation
  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      gsap.fromTo(
        chatboxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  // auto scroll to bottom when messages change
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      // small timeout to allow DOM update
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 50);
    }
  }, [messages]);

  const openAndStartQuestions = () => {
    setIsOpen(true);
    // start the question flow if not started
    if (questionIndex === null) {
      // push first question after a short delay so the user sees the initial greeting first
      setTimeout(() => {
        askQuestion(0);
      }, 500);
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      // close with animation then setIsOpen(false)
      if (chatboxRef.current) {
        gsap.to(chatboxRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.2,
          onComplete: () => setIsOpen(false)
        });
      } else {
        setIsOpen(false);
      }
    } else {
      openAndStartQuestions();
    }
  };

  // Helper to create a unique id
  const makeId = (prefix = "") => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // push a bot question by index
  const askQuestion = (idx: number) => {
    if (idx < 0 || idx >= questions.length) return;
    const botMsg: Msg = {
      id: makeId("bot-"),
      text: questions[idx],
      isBot: true,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, botMsg]);
    setQuestionIndex(idx);
  };

  // The main send handler
  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    // capture user's message now (fixes closure issues)
    const userMessageText = trimmed;

    const userMsg: Msg = {
      id: makeId("user-"),
      text: userMessageText,
      isBot: false,
      timestamp: new Date()
    };

    // append user message
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    // If we're in a guided question flow, record the answer and ask the next question
    if (questionIndex !== null && questionIndex < questions.length) {
      const questionKey = `q${questionIndex}`;
      setAnswers((prev) => ({ ...prev, [questionKey]: userMessageText }));

      // ask next question (or finish)
      const nextIdx = questionIndex + 1;
      setTimeout(() => {
        if (nextIdx < questions.length) {
          askQuestion(nextIdx);
        } else {
          // final acknowledgement
          const botMsg: Msg = {
            id: makeId("bot-"),
            text: "Thanks for sharing — I've noted it. How else can I help?",
            isBot: true,
            timestamp: new Date()
          };
          setMessages((prev) => [...prev, botMsg]);
          // keep questionIndex set to questions.length to indicate finished flow
          setQuestionIndex(nextIdx);
        }
      }, 800);

      return;
    }

    // Otherwise, fallback / keyword-based quick replies (non-guided)
    setTimeout(() => {
      const userLower = userMessageText.toLowerCase();
      let reply = "Sorry, I didn't understand that. Can you rephrase it?";

      if (userLower.includes("services")) {
        reply = "I offer help with frontend, backend, animations, and AI integration. Want a portfolio link?";
      } else if (userLower.includes("contact") || userLower.includes("email")) {
        reply = "You can contact via the contact form or email codezenithhq@gmail.com";
      } else if (userLower.includes("react") || userLower.includes("gsap")) {
        reply = "Yes — I can help with React + GSAP UI work (components, animations, transitions).";
      } else if (userLower.includes("project")) {
        reply = "Tell me about your project: what's the goal and the stack you're thinking of?";
      } else if (userLower.includes("hi") || userLower.includes("hello") || userLower.includes("hey")) {
        reply = "Hey! What would you like to talk about — projects, skills, or portfolio?";
      }

      const botReply: Msg = {
        id: makeId("bot-"),
        text: reply,
        isBot: true,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botReply]);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          ref={chatboxRef}
          className="mb-4 w-80 h-96 glass-card overflow-hidden flex flex-col bg-black border border-gray-200"
        >
          <div className="p-4 border-b border-glass-border ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-full">
                  <Robot size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.isBot ? "bg-muted/20 text-foreground" : "bg-gradient-primary text-foreground"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-glass border border-glass-border rounded-lg text-sm focus:outline-none focus:border-primary"
                aria-label="Type a message"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 w-8 h-8 bg-gradient-primary rounded-lg hover:scale-105 transition-transform"
                aria-label="Send message"
              >
                <PaperPlaneTilt size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={toggleChat}
        className="chatbot w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} className="text-foreground" /> : <ChatCircle size={24} className="text-foreground" />}
      </button>
    </div>
  );
};

export default Chatbot;
