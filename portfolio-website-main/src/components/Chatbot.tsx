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

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "init-1",
      text: "Hi! I'm Siva's AI assistant. Ask me anything about his projects, skills, or experience.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 50);
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    if (isOpen) {
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
      setIsOpen(true);
    }
  };

  const makeId = (prefix = "") => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMsg: Msg = {
      id: makeId("user-"),
      text: trimmed,
      isBot: false,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      // Prepare history for context (last 10 messages)
      const history = messages.slice(-10).map(m => ({
        role: m.isBot ? "assistant" : "user",
        content: m.text
      }));

      const response = await fetch("http://localhost:8083/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history })
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const botMsgId = makeId("bot-");
      // Add empty bot message to start streaming into
      setMessages(prev => [...prev, {
        id: botMsgId,
        text: "",
        isBot: true,
        timestamp: new Date()
      }]);

      const decoder = new TextDecoder();
      let botText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botText += chunk;

        setMessages(prev => prev.map(m =>
          m.id === botMsgId ? { ...m, text: botText } : m
        ));
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        id: makeId("error-"),
        text: "Sorry, I'm having trouble connecting to the server right now.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
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
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted/20 text-foreground px-3 py-2 rounded-lg text-sm italic">
                  Thinking...
                </div>
              </div>
            )}
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
