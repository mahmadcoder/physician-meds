import { Users } from "lucide-react";
import type { Consultation } from "../types";
import InquiryCard from "./InquiryCard";
import EmptyState from "./EmptyState";

interface ConsultationsTabProps {
  consultations: Consultation[];
  expandedId: string | null;
  onToggleExpanded: (id: string) => void;
  onMarkRead: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export default function ConsultationsTab({
  consultations,
  expandedId,
  onToggleExpanded,
  onMarkRead,
  onStatusChange,
}: ConsultationsTabProps) {
  if (consultations.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No consultation requests yet"
      />
    );
  }

  return (
    <div className="space-y-4">
      {consultations.map((consult) => (
        <InquiryCard
          key={consult.id}
          id={consult.id}
          name={consult.name}
          email={consult.email}
          phone={consult.phone}
          createdAt={consult.created_at}
          isRead={consult.is_read}
          message={consult.message}
          status={consult.status}
          onStatusChange={(val) => onStatusChange(consult.id, val)}
          fields={[
            { label: "Practice", value: consult.practice_name },
            { label: "Specialty", value: consult.specialty },
          ]}
          icon={Users}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          unreadBorder="border-purple-300/50 shadow-purple-100"
          expandedId={expandedId}
          onToggleExpanded={onToggleExpanded}
          onMarkRead={() => onMarkRead(consult.id)}
        />
      ))}
    </div>
  );
}
