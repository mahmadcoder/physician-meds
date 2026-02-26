export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  practice_name: string;
  specialty: string;
  message: string;
  created_at: string;
  is_read: boolean;
  status: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author_name: string;
  author_role: string;
  image: string;
  read_time: string;
  tags: string[];
  featured: boolean;
  is_published: boolean;
  content: unknown[];
}

export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  author_email: string;
  author_website: string;
  comment: string;
  created_at: string;
  is_read: boolean;
}

export interface CtaInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  practice_name: string;
  monthly_collection: string;
  total_ar: string;
  message: string;
  created_at: string;
  is_read: boolean;
  status: string;
}

export interface ChatSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  started_at: string;
  ended_at: string | null;
  is_read: boolean;
  status: "new" | "active" | "contacted" | "converted" | "closed" | "ended" | "resolved";
  message_count: number;
  email_sent_to_client: boolean;
  email_sent_to_team: boolean;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export type Tab =
  | "overview"
  | "contacts"
  | "consultations"
  | "subscribers"
  | "blogs"
  | "comments"
  | "cta-inquiries"
  | "chat-sessions";

export interface NavItem {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

export interface NavGroup {
  label: string | null;
  items: NavItem[];
}

export interface OverviewCard {
  label: string;
  value: number;
  unread: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  tab: Tab;
}

export interface RecentItem {
  type: "Contact" | "Consultation" | "CTA Inquiry" | "Comment" | "Chat Session";
  name: string;
  date: string;
  isRead: boolean;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  tab: Tab;
}

export interface SearchResult {
  id: string;
  name: string;
  detail: string;
  tab: Tab;
  tabLabel: string;
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export type DatePreset =
  | "today"
  | "yesterday"
  | "this-week"
  | "last-week"
  | "this-month"
  | "last-month"
  | "this-year"
  | "last-year"
  | "all";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface ChartDataPoint {
  date: string;
  label: string;
  contacts: number;
  consultations: number;
  ctaInquiries: number;
  comments: number;
  subscribers: number;
}
