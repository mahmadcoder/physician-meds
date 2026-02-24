import { Link } from "react-router-dom";
import { FileText, Eye, EyeOff, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "../types";
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

interface BlogsTabProps {
  blogs: BlogPost[];
  onTogglePublish: (id: string, currentState: boolean) => void;
  onDelete: (id: string) => void;
}

export default function BlogsTab({
  blogs,
  onTogglePublish,
  onDelete,
}: BlogsTabProps) {
  return (
    <>
      {/* Action bar */}
      <div className="flex items-center justify-end mb-5">
        <Link to="/pm-portal-x9k2/blog/new">
          <Button className="bg-[#2d62ff] hover:bg-[#1a4fd9] text-white rounded-xl text-sm shadow-md shadow-[#2d62ff]/20">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <EmptyState icon={FileText} title="No blog posts yet" />
      ) : (
        <div className="space-y-3">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    post.is_published ? "bg-green-50" : "bg-gray-100"
                  }`}
                >
                  <FileText
                    className={`w-4 h-4 ${post.is_published ? "text-green-600" : "text-gray-400"}`}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        post.is_published
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {post.category}
                    <span className="text-gray-300 mx-1">&bull;</span>
                    {post.author_name}
                    <span className="text-gray-300 mx-1">&bull;</span>
                    {formatDate(post.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => onTogglePublish(post.id, post.is_published)}
                  className={`p-2 rounded-lg transition-all ${
                    post.is_published
                      ? "text-gray-400 hover:text-orange-600 hover:bg-orange-50"
                      : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                  }`}
                  title={post.is_published ? "Unpublish" : "Publish"}
                >
                  {post.is_published ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <Link
                  to={`/pm-portal-x9k2/blog/edit/${post.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => onDelete(post.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
