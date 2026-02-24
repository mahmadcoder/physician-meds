import {
  MessageCircle,
  FileText,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Trash2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Comment } from "../types";
import CopyButton from "./CopyButton";
import EmptyState from "./EmptyState";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface CommentsTabProps {
  comments: Comment[];
  expandedId: string | null;
  onToggleExpanded: (id: string) => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CommentsTab({
  comments,
  expandedId,
  onToggleExpanded,
  onMarkRead,
  onDelete,
}: CommentsTabProps) {
  if (comments.length === 0) {
    return <EmptyState icon={MessageCircle} title="No blog comments yet" />;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const isExpanded = expandedId === comment.id;

        return (
          <div
            key={comment.id}
            className={`bg-white rounded-2xl border p-4 sm:p-6 transition-all hover:shadow-sm ${
              !comment.is_read
                ? "border-orange-300/50 shadow-sm shadow-orange-100"
                : "border-gray-100"
            }`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900">
                    {comment.author_name}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />{" "}
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!comment.is_read && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onMarkRead(comment.id)}
                    className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
                  </Button>
                )}
                <button
                  onClick={() => onDelete(comment.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Post slug */}
            <div className="sm:pl-[52px] mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">on:</span>
                <a
                  href={`/blogs/${comment.post_slug}`}
                  className="text-xs font-semibold text-[#2d62ff] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {comment.post_slug}
                </a>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex items-center gap-2 flex-wrap sm:pl-[52px] mb-3">
              <CopyButton icon={Mail} value={comment.author_email} />
              {comment.author_website && (
                <a
                  href={comment.author_website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-[13px] font-medium transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-gray-500" /> Website
                </a>
              )}
            </div>

            {/* Expandable comment */}
            <div className="sm:pl-[52px]">
              <button
                onClick={() => onToggleExpanded(comment.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#2d62ff] transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
                {isExpanded ? "Hide comment" : "Show full comment"}
              </button>
              {isExpanded && (
                <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
