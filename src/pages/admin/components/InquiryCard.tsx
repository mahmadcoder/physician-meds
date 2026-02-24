import {
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CopyButton from "./CopyButton";
import StatusSelect from "./StatusSelect";

interface Field {
  label: string;
  value: string;
}

interface InquiryCardProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  isRead: boolean;
  message?: string;
  fields?: Field[];
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  unreadBorder: string;
  expandedId: string | null;
  onToggleExpanded: (id: string) => void;
  onMarkRead: () => void;
  status?: string;
  onStatusChange?: (status: string) => void;
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

export default function InquiryCard({
  id,
  name,
  email,
  phone,
  createdAt,
  isRead,
  message,
  fields,
  icon: Icon,
  iconBg,
  iconColor,
  unreadBorder,
  expandedId,
  onToggleExpanded,
  onMarkRead,
  status,
  onStatusChange,
}: InquiryCardProps) {
  const isExpanded = expandedId === id;

  return (
    <div
      className={`bg-white rounded-2xl border p-4 sm:p-6 transition-all hover:shadow-sm ${
        !isRead ? `${unreadBorder} shadow-sm` : "border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-gray-900 truncate">{name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" /> {formatDate(createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 sm:flex-col sm:items-end">
          {status !== undefined && onStatusChange && (
            <StatusSelect value={status} onChange={onStatusChange} />
          )}
          {!isRead && (
            <Button
              size="sm"
              variant="outline"
              onClick={onMarkRead}
              className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
            </Button>
          )}
        </div>
      </div>

      {/* Fields */}
      {fields && fields.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 sm:pl-[52px]">
          {fields.map(
            (field) =>
              field.value && (
                <div key={field.label}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {field.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {field.value}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* Contact info */}
      <div className="flex items-center gap-2 flex-wrap sm:pl-[52px] mb-3">
        <CopyButton icon={Mail} value={email} />
        {phone && <CopyButton icon={Phone} value={phone} />}
      </div>

      {/* Expandable message */}
      {message && (
        <div className="sm:pl-[52px]">
          <button
            onClick={() => onToggleExpanded(id)}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#2d62ff] transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            {isExpanded ? "Hide message" : "Show message"}
          </button>
          {isExpanded && (
            <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
