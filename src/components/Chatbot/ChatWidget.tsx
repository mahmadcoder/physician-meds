import { MessageCircle } from "lucide-react";
import { useChatbot } from "./useChatbot";
import PreChatForm from "./PreChatForm";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const {
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
  } = useChatbot();

  return (
    <>
      {/* Floating bubble */}
      {view === "bubble" && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-[9999] w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#2d62ff] to-[#1d4ed8] text-white shadow-xl shadow-[#2d62ff]/30 hover:shadow-2xl hover:shadow-[#2d62ff]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Pre-chat form */}
      {view === "prechat" && (
        <PreChatForm
          onSubmit={startSession}
          onClose={() => setView("bubble")}
          error={error}
        />
      )}

      {/* Chat window */}
      {view === "chat" && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          error={error}
          userName={userName}
          scrollRef={scrollRef}
          onSend={sendMessage}
          onClose={closeChat}
          onMinimize={() => setView("bubble")}
        />
      )}
    </>
  );
}
