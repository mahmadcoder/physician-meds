import { Briefcase } from "lucide-react";
import type { CtaInquiry } from "../types";
import InquiryCard from "./InquiryCard";
import EmptyState from "./EmptyState";

interface CtaInquiriesTabProps {
  ctaInquiries: CtaInquiry[];
  expandedId: string | null;
  onToggleExpanded: (id: string) => void;
  onMarkRead: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export default function CtaInquiriesTab({
  ctaInquiries,
  expandedId,
  onToggleExpanded,
  onMarkRead,
  onStatusChange,
}: CtaInquiriesTabProps) {
  if (ctaInquiries.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No CTA inquiries yet"
      />
    );
  }

  return (
    <div className="space-y-4">
      {ctaInquiries.map((inquiry) => (
        <InquiryCard
          key={inquiry.id}
          id={inquiry.id}
          name={inquiry.name}
          email={inquiry.email}
          phone={inquiry.phone}
          createdAt={inquiry.created_at}
          isRead={inquiry.is_read}
          message={inquiry.message}
          status={inquiry.status}
          onStatusChange={(val) => onStatusChange(inquiry.id, val)}
          fields={[
            { label: "Practice", value: inquiry.practice_name },
            { label: "Monthly Collection", value: inquiry.monthly_collection },
            { label: "Total AR", value: inquiry.total_ar },
          ]}
          icon={Briefcase}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          unreadBorder="border-amber-300/50 shadow-amber-100"
          expandedId={expandedId}
          onToggleExpanded={onToggleExpanded}
          onMarkRead={() => onMarkRead(inquiry.id)}
        />
      ))}
    </div>
  );
}
