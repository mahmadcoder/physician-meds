import { MessageSquare, User } from "lucide-react";
import type { Contact } from "../types";
import InquiryCard from "./InquiryCard";
import EmptyState from "./EmptyState";

interface ContactsTabProps {
  contacts: Contact[];
  expandedId: string | null;
  onToggleExpanded: (id: string) => void;
  onMarkRead: (id: string) => void;
}

export default function ContactsTab({
  contacts,
  expandedId,
  onToggleExpanded,
  onMarkRead,
}: ContactsTabProps) {
  if (contacts.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No contact submissions yet"
        description="They'll appear here when visitors submit the contact form."
      />
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <InquiryCard
          key={contact.id}
          id={contact.id}
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          createdAt={contact.created_at}
          isRead={contact.is_read}
          message={contact.message}
          fields={[{ label: "Subject", value: contact.subject }]}
          icon={User}
          iconBg="bg-[#2d62ff]/10"
          iconColor="text-[#2d62ff]"
          unreadBorder="border-[#2d62ff]/30 shadow-blue-100"
          expandedId={expandedId}
          onToggleExpanded={onToggleExpanded}
          onMarkRead={() => onMarkRead(contact.id)}
        />
      ))}
    </div>
  );
}
