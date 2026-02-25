export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  started_at: string;
  ended_at: string | null;
  is_read: boolean;
  status: "active" | "ended" | "resolved";
  message_count: number;
  email_sent_to_client: boolean;
  email_sent_to_team: boolean;
}

export interface PreChatFormData {
  name: string;
  email: string;
  phone: string;
}

export type ChatView = "bubble" | "prechat" | "chat";
