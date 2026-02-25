import { useState, useRef, useEffect } from "react";
import { X, Send, Minus, MessageCircle } from "lucide-react";
import type { ChatMessage } from "./types";

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  error: string | null;
  userName: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onSend: (message: string) => void;
  onClose: () => void;
  onMinimize: () => void;
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[82%] ${isUser ? "order-1" : "order-1"}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2d62ff] to-[#1d4ed8] flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-gray-500">PhysicianMeds</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-[#2d62ff] text-white rounded-br-md"
              : "bg-gray-100 text-gray-800 rounded-bl-md"
          }`}
        >
          {msg.content}
        </div>
        <p
          className={`text-[10px] text-gray-400 mt-1 ${
            isUser ? "text-right mr-1" : "ml-8"
          }`}
        >
          {formatTime(msg.created_at)}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2d62ff] to-[#1d4ed8] flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500">PhysicianMeds</span>
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-bl-md px-5 py-3.5 inline-flex items-center gap-1.5">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({
  messages,
  isTyping,
  error,
  scrollRef,
  onSend,
  onClose,
  onMinimize,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    onSend(input);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] animate-in slide-in-from-bottom-4 fade-in-0 duration-300 flex flex-col">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2d62ff] to-[#1d4ed8] px-5 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[15px]">PhysicianMeds</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <p className="text-white/70 text-xs font-medium">Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onMinimize}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="Minimize"
              >
                <Minus className="w-5 h-5 text-white/80" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                title="End chat"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-0 scroll-smooth"
          style={{ overscrollBehavior: "contain" }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          {error && (
            <div className="mx-2 mb-3 px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 font-medium text-center">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-gray-100 px-4 py-3 bg-white">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 resize-none text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#2d62ff] focus:ring-2 focus:ring-[#2d62ff]/10 transition-all max-h-24 overflow-y-auto"
              style={{ minHeight: "44px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-[#2d62ff] hover:bg-[#2452d9] text-white flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#2d62ff]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none shrink-0"
            >
              <Send className="w-[18px] h-[18px]" />
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            Powered by <span className="font-semibold text-gray-500">PhysicianMeds</span> AI
          </p>
        </div>
      </div>
    </div>
  );
}
