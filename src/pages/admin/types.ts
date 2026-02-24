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
  featured: boolean;
  is_published: boolean;
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

export type Tab =
  | "overview"
  | "contacts"
  | "consultations"
  | "subscribers"
  | "blogs"
  | "comments"
  | "cta-inquiries";

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
  type: "Contact" | "Consultation" | "CTA Inquiry" | "Comment";
  name: string;
  date: string;
  isRead: boolean;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  tab: Tab;
}
