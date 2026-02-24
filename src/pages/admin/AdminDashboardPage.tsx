import { useState, useMemo } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Briefcase,
  FileText,
  MessageCircle,
  Mail,
} from "lucide-react";

import { useAdminData } from "./hooks/useAdminData";
import type {
  Tab,
  NavGroup,
  OverviewCard,
  RecentItem,
  SearchResult,
  DatePeriod,
} from "./types";

import AdminSidebar from "./components/AdminSidebar";
import AdminTopBar from "./components/AdminTopBar";
import OverviewTab from "./components/OverviewTab";
import ContactsTab from "./components/ContactsTab";
import ConsultationsTab from "./components/ConsultationsTab";
import CtaInquiriesTab from "./components/CtaInquiriesTab";
import SubscribersTab from "./components/SubscribersTab";
import BlogsTab from "./components/BlogsTab";
import CommentsTab from "./components/CommentsTab";

const AdminDashboardPage = () => {
  usePageTitle("Admin Dashboard");
  const [datePeriod, setDatePeriod] = useState<DatePeriod>("30d");
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  const {
    activeTab,
    setActiveTab,
    contacts,
    consultations,
    subscribers,
    blogs,
    comments,
    ctaInquiries,
    loading,
    expandedId,
    toggleExpanded,
    sidebarOpen,
    setSidebarOpen,
    notifOpen,
    setNotifOpen,
    notifRef,
    totalUnread,
    markAsRead,
    updateStatus,
    deleteBlog,
    togglePublish,
    deleteComment,
    handleLogout,
  } = useAdminData();

  // ─── Navigation config ─────────────────────────────
  const navGroups: NavGroup[] = [
    {
      label: null,
      items: [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard, count: 0 },
      ],
    },
    {
      label: "INBOX",
      items: [
        { id: "contacts", label: "Contacts", icon: MessageSquare, count: contacts.filter((c) => !c.is_read).length },
        { id: "consultations", label: "Consultations", icon: Users, count: consultations.filter((c) => !c.is_read).length },
        { id: "cta-inquiries", label: "CTA Inquiries", icon: Briefcase, count: ctaInquiries.filter((c) => !c.is_read).length },
      ],
    },
    {
      label: "CONTENT",
      items: [
        { id: "blogs", label: "Blog Posts", icon: FileText, count: 0 },
        { id: "comments", label: "Comments", icon: MessageCircle, count: comments.filter((c) => !c.is_read).length },
      ],
    },
    {
      label: "AUDIENCE",
      items: [
        { id: "subscribers", label: "Subscribers", icon: Mail, count: 0 },
      ],
    },
  ];

  const activeNavLabel =
    navGroups.flatMap((g) => g.items).find((i) => i.id === activeTab)?.label ||
    "Dashboard";

  // ─── Overview data ─────────────────────────────────
  const overviewCards: OverviewCard[] = [
    { label: "Total Contacts", value: contacts.length, unread: contacts.filter((c) => !c.is_read).length, icon: MessageSquare, color: "#2d62ff", tab: "contacts" },
    { label: "Consultations", value: consultations.length, unread: consultations.filter((c) => !c.is_read).length, icon: Users, color: "#7c3aed", tab: "consultations" },
    { label: "CTA Inquiries", value: ctaInquiries.length, unread: ctaInquiries.filter((c) => !c.is_read).length, icon: Briefcase, color: "#d97706", tab: "cta-inquiries" },
    { label: "Subscribers", value: subscribers.length, unread: 0, icon: Mail, color: "#059669", tab: "subscribers" },
    { label: "Blog Posts", value: blogs.length, unread: 0, icon: FileText, color: "#4f46e5", tab: "blogs" },
    { label: "Comments", value: comments.length, unread: comments.filter((c) => !c.is_read).length, icon: MessageCircle, color: "#ea580c", tab: "comments" },
  ];

  const recentItems: RecentItem[] = [
    ...contacts.map((c) => ({ type: "Contact" as const, name: c.name, date: c.created_at, isRead: c.is_read, icon: MessageSquare, color: "#2d62ff", tab: "contacts" as Tab })),
    ...consultations.map((c) => ({ type: "Consultation" as const, name: c.name, date: c.created_at, isRead: c.is_read, icon: Users, color: "#7c3aed", tab: "consultations" as Tab })),
    ...ctaInquiries.map((c) => ({ type: "CTA Inquiry" as const, name: c.name, date: c.created_at, isRead: c.is_read, icon: Briefcase, color: "#d97706", tab: "cta-inquiries" as Tab })),
    ...comments.map((c) => ({ type: "Comment" as const, name: c.author_name, date: c.created_at, isRead: c.is_read, icon: MessageCircle, color: "#ea580c", tab: "comments" as Tab })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const recentUnread = recentItems.filter((i) => !i.isRead);

  // ─── Global search data ────────────────────────────
  const searchResults: SearchResult[] = useMemo(() => {
    const items: SearchResult[] = [];

    contacts.forEach((c) =>
      items.push({
        id: c.id,
        name: c.name,
        detail: `${c.email} \u2022 ${c.subject}`,
        tab: "contacts",
        tabLabel: "Contact",
        color: "#2d62ff",
        icon: MessageSquare,
      })
    );

    consultations.forEach((c) =>
      items.push({
        id: c.id,
        name: c.name,
        detail: `${c.email} \u2022 ${c.practice_name || c.specialty || ""}`,
        tab: "consultations",
        tabLabel: "Consultation",
        color: "#7c3aed",
        icon: Users,
      })
    );

    ctaInquiries.forEach((c) =>
      items.push({
        id: c.id,
        name: c.name,
        detail: `${c.email} \u2022 ${c.practice_name || ""}`,
        tab: "cta-inquiries",
        tabLabel: "CTA Inquiry",
        color: "#d97706",
        icon: Briefcase,
      })
    );

    blogs.forEach((b) =>
      items.push({
        id: b.id,
        name: b.title,
        detail: `${b.category} \u2022 ${b.author_name}`,
        tab: "blogs",
        tabLabel: "Blog",
        color: "#4f46e5",
        icon: FileText,
      })
    );

    comments.forEach((c) =>
      items.push({
        id: c.id,
        name: c.author_name,
        detail: `${c.author_email} \u2022 on ${c.post_slug}`,
        tab: "comments",
        tabLabel: "Comment",
        color: "#ea580c",
        icon: MessageCircle,
      })
    );

    subscribers.forEach((s) =>
      items.push({
        id: s.id,
        name: s.email,
        detail: s.is_active ? "Active" : "Inactive",
        tab: "subscribers",
        tabLabel: "Subscriber",
        color: "#059669",
        icon: Mail,
      })
    );

    return items;
  }, [contacts, consultations, ctaInquiries, blogs, comments, subscribers]);

  // ─── Handlers ──────────────────────────────────────
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleNotifClick = (tab: Tab) => {
    setActiveTab(tab);
    setNotifOpen(false);
  };

  const handleSearchSelect = (tab: Tab, id: string) => {
    setActiveTab(tab);
    toggleExpanded(id);
  };

  // ─── Section summary text ──────────────────────────
  const summaryText: Record<Exclude<Tab, "overview">, string> = {
    contacts: `${contacts.length} total \u2022 ${contacts.filter((c) => !c.is_read).length} unread`,
    consultations: `${consultations.length} total \u2022 ${consultations.filter((c) => !c.is_read).length} unread`,
    subscribers: `${subscribers.length} total \u2022 ${subscribers.filter((s) => s.is_active).length} active`,
    blogs: `${blogs.length} total \u2022 ${blogs.filter((b) => b.is_published).length} published`,
    comments: `${comments.length} total \u2022 ${comments.filter((c) => !c.is_read).length} unread`,
    "cta-inquiries": `${ctaInquiries.length} total \u2022 ${ctaInquiries.filter((c) => !c.is_read).length} unread`,
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      <AdminSidebar
        navGroups={navGroups}
        activeTab={activeTab}
        sidebarOpen={sidebarOpen}
        onTabChange={handleTabChange}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <AdminTopBar
          title={activeNavLabel}
          totalUnread={totalUnread}
          notifOpen={notifOpen}
          notifRef={notifRef}
          recentUnread={recentUnread}
          searchResults={searchResults}
          onToggleSidebar={() => setSidebarOpen(true)}
          onToggleNotif={() => setNotifOpen(!notifOpen)}
          onNotifClick={handleNotifClick}
          onSearchSelect={handleSearchSelect}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Overview */}
          {activeTab === "overview" && (
            <OverviewTab
              loading={loading}
              overviewCards={overviewCards}
              recentItems={recentItems}
              totalUnread={totalUnread}
              datePeriod={datePeriod}
              customDate={customDate}
              onDatePeriodChange={setDatePeriod}
              onCustomDateChange={setCustomDate}
              contacts={contacts}
              consultations={consultations}
              ctaInquiries={ctaInquiries}
              comments={comments}
              subscribers={subscribers}
              onTabChange={handleTabChange}
              unreadRows={[
                { label: "Contacts", count: contacts.filter((c) => !c.is_read).length, color: "#2d62ff" },
                { label: "Consultations", count: consultations.filter((c) => !c.is_read).length, color: "#7c3aed" },
                { label: "Comments", count: comments.filter((c) => !c.is_read).length, color: "#ea580c" },
                { label: "CTA Inquiries", count: ctaInquiries.filter((c) => !c.is_read).length, color: "#d97706" },
              ]}
              contentRows={[
                { label: "Published Posts", value: blogs.filter((b) => b.is_published).length, color: "text-green-600" },
                { label: "Draft Posts", value: blogs.filter((b) => !b.is_published).length, color: "text-gray-400" },
                { label: "Featured Posts", value: blogs.filter((b) => b.featured).length, color: "text-amber-600" },
                { label: "Active Subscribers", value: subscribers.filter((s) => s.is_active).length, color: "text-emerald-600" },
              ]}
            />
          )}

          {/* Data tabs */}
          {activeTab !== "overview" && (
            <>
              {activeTab !== "blogs" && (
                <div className="mb-5">
                  <p className="text-sm text-gray-500">
                    {summaryText[activeTab]}
                  </p>
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-8 h-8 border-3 border-[#2d62ff]/20 border-t-[#2d62ff] rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Loading...</p>
                </div>
              ) : (
                <>
                  {activeTab === "contacts" && (
                    <ContactsTab
                      contacts={contacts}
                      expandedId={expandedId}
                      onToggleExpanded={toggleExpanded}
                      onMarkRead={(id) => markAsRead("contacts", id)}
                    />
                  )}

                  {activeTab === "consultations" && (
                    <ConsultationsTab
                      consultations={consultations}
                      expandedId={expandedId}
                      onToggleExpanded={toggleExpanded}
                      onMarkRead={(id) => markAsRead("consultations", id)}
                      onStatusChange={(id, status) => updateStatus(id, status, "consultations")}
                    />
                  )}

                  {activeTab === "cta-inquiries" && (
                    <CtaInquiriesTab
                      ctaInquiries={ctaInquiries}
                      expandedId={expandedId}
                      onToggleExpanded={toggleExpanded}
                      onMarkRead={(id) => markAsRead("cta-inquiries", id)}
                      onStatusChange={(id, status) => updateStatus(id, status, "cta-inquiries")}
                    />
                  )}

                  {activeTab === "subscribers" && (
                    <SubscribersTab subscribers={subscribers} />
                  )}

                  {activeTab === "blogs" && (
                    <BlogsTab
                      blogs={blogs}
                      onTogglePublish={togglePublish}
                      onDelete={deleteBlog}
                    />
                  )}

                  {activeTab === "comments" && (
                    <CommentsTab
                      comments={comments}
                      expandedId={expandedId}
                      onToggleExpanded={toggleExpanded}
                      onMarkRead={(id) => markAsRead("comments", id)}
                      onDelete={deleteComment}
                    />
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
