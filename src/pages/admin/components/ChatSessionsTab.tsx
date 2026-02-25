import { useState, useCallback, useEffect } from "react";
import {
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Mail,
  Phone,
  User,
  Bot,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CopyButton from "./CopyButton";
import StatusSelect from "./StatusSelect";
import EmptyState from "./EmptyState";
import type { ChatSession, ChatMessage } from "../types";

interface ChatSessionsTabProps {
  sessions: ChatSession[];
  expandedId: string | null;
  onToggleExpanded: (id: string) => void;
  onMarkRead: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function ChatTranscript({ sessionId, authHeaders }: { sessionId: string; authHeaders: () => Record<string, string> }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (fetched) return;
    try {
      const res = await fetch(`/api/admin/chat-messages?session_id=${sessionId}`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Fetch chat messages error:", err);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }, [sessionId, authHeaders, fetched]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-5 h-5 border-2 border-[#2d62ff]/20 border-t-[#2d62ff] rounded-full animate-spin" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">No messages in this session.</p>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === "user" ? "" : ""}`}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              msg.role === "user"
                ? "bg-gray-100"
                : "bg-[#2d62ff]/10"
            }`}
          >
            {msg.role === "user" ? (
              <User className="w-3.5 h-3.5 text-gray-500" />
            ) : (
              <Bot className="w-3.5 h-3.5 text-[#2d62ff]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-700">
                {msg.role === "user" ? "Visitor" : "Bot"}
              </span>
              <span className="text-[10px] text-gray-400">{formatTime(msg.created_at)}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SessionCard({
  session,
  isExpanded,
  onToggleExpanded,
  onMarkRead,
  onStatusChange,
  onDelete,
  authHeaders,
}: {
  session: ChatSession;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onMarkRead: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
  authHeaders: () => Record<string, string>;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 sm:p-6 transition-all hover:shadow-sm ${
        !session.is_read
          ? "border-emerald-300/50 shadow-sm shadow-emerald-100"
          : "border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-gray-900 truncate">{session.name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" /> {formatDate(session.started_at)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <StatusSelect value={session.status} onChange={onStatusChange} />
          {!session.is_read && (
            <Button
              size="sm"
              variant="outline"
              onClick={onMarkRead}
              className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="text-xs border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Meta fields */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 sm:pl-[52px]">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Messages</p>
          <p className="text-sm font-semibold text-gray-800">{session.message_count}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
          <p className="text-sm font-semibold text-gray-800">
            {session.ended_at
              ? `${Math.max(1, Math.round((new Date(session.ended_at).getTime() - new Date(session.started_at).getTime()) / 60000))} min`
              : "Active"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Team Email</p>
          <p className={`text-sm font-semibold ${session.email_sent_to_team ? "text-emerald-600" : "text-gray-400"}`}>
            {session.email_sent_to_team ? "Sent" : "Not sent"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Client Email</p>
          <p className={`text-sm font-semibold ${session.email_sent_to_client ? "text-emerald-600" : "text-gray-400"}`}>
            {session.email_sent_to_client ? "Sent" : "Not sent"}
          </p>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex items-center gap-2 flex-wrap sm:pl-[52px] mb-3">
        <CopyButton icon={Mail} value={session.email} />
        {session.phone && <CopyButton icon={Phone} value={session.phone} />}
      </div>

      {/* Expandable transcript */}
      <div className="sm:pl-[52px]">
        <button
          onClick={onToggleExpanded}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#2d62ff] transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          {isExpanded ? "Hide conversation" : "View conversation"}
        </button>
        {isExpanded && (
          <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <ChatTranscript sessionId={session.id} authHeaders={authHeaders} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatSessionsTab({
  sessions,
  expandedId,
  onToggleExpanded,
  onMarkRead,
  onStatusChange,
  onDelete,
}: ChatSessionsTabProps) {
  const token = localStorage.getItem("admin_token");
  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="No chat sessions yet"
        description="Chat conversations will appear here when visitors use the chatbot."
      />
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isExpanded={expandedId === session.id}
          onToggleExpanded={() => onToggleExpanded(session.id)}
          onMarkRead={() => onMarkRead(session.id)}
          onStatusChange={(status) => onStatusChange(session.id, status)}
          onDelete={() => onDelete(session.id)}
          authHeaders={authHeaders}
        />
      ))}
    </div>
  );
}
