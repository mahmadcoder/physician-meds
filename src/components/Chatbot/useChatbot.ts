import { useState, useRef, useCallback, useEffect } from "react";
import type { ChatMessage, ChatView, PreChatFormData } from "./types";

const API_BASE = "/api/chat";

export function useChatbot() {
  const [view, setView] = useState<ChatView>("bubble");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const startSession = useCallback(async (data: PreChatFormData) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to start chat");

      const { session_id } = await res.json();
      setSessionId(session_id);
      setUserName(data.name);
      setView("chat");
      endedRef.current = false;

      // Add welcome message
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hi ${data.name.split(" ")[0]}! Welcome to PhysicianMeds. I'm here to help you with any questions about our healthcare billing and revenue cycle management services. What can I help you with today?`,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Unable to connect. Please try again.");
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId || !content.trim() || isTyping) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, message: content.trim() }),
        });

        if (!res.ok) throw new Error("Failed to send message");

        const { reply } = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: reply,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch {
        setError("Message failed to send. Please try again.");
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, isTyping]
  );

  const endSession = useCallback(async () => {
    if (!sessionId || endedRef.current) return;
    endedRef.current = true;

    try {
      await fetch(`${API_BASE}/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
    } catch {
      // Silent fail on end -- not critical for UX
    }
  }, [sessionId]);

  const closeChat = useCallback(() => {
    endSession();
    setView("bubble");
    setSessionId(null);
    setMessages([]);
    setUserName("");
    setError(null);
  }, [endSession]);

  const openChat = useCallback(() => {
    setView(sessionId ? "chat" : "prechat");
  }, [sessionId]);

  return {
    view,
    messages,
    isTyping,
    error,
    userName,
    scrollRef,
    openChat,
    closeChat,
    startSession,
    sendMessage,
    setView,
  };
}
