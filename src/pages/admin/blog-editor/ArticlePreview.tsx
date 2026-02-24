import {
  Calendar,
  Clock,
  Tag,
  Info,
  AlertTriangle,
  Lightbulb,
  Quote,
  CheckCircle,
  User,
} from "lucide-react";
import type { BlogPostDraft, ContentBlock } from "./types";

interface ArticlePreviewProps {
  post: BlogPostDraft;
  tagsInput: string;
}

export default function ArticlePreview({ post, tagsInput }: ArticlePreviewProps) {
  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hasContent = post.title || post.content.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/60 shrink-0">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-[11px] font-medium text-gray-400 ml-2 tracking-wide">
          LIVE PREVIEW
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!hasContent ? (
          <div className="flex items-center justify-center h-full min-h-[300px] px-6">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Quote className="w-6 h-6 text-gray-200" />
              </div>
              <p className="text-gray-400 text-sm font-medium">
                Start writing to see the preview
              </p>
              <p className="text-gray-300 text-xs mt-1">
                Your article will appear here in real-time
              </p>
            </div>
          </div>
        ) : (
          <article className="px-5 sm:px-8 py-6">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-xl mb-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            {post.category && (
              <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
                {post.category}
              </span>
            )}

            {post.title && (
              <h1 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight mb-4">
                {post.title}
              </h1>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 mb-6 pb-5 border-b border-gray-100">
              {post.author_name && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-gray-600 font-medium">
                    {post.author_name}
                  </span>
                  {post.author_role && (
                    <span className="text-gray-300">· {post.author_role}</span>
                  )}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {today}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.read_time}
                </span>
              )}
            </div>

            {post.excerpt && (
              <p className="text-gray-500 text-sm leading-relaxed mb-6 italic border-l-2 border-brand-blue/20 pl-4">
                {post.excerpt}
              </p>
            )}

            <div className="prose-preview">
              {post.content.map((block, i) => (
                <PreviewBlock key={i} block={block} />
              ))}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-5 border-t border-gray-100">
                <Tag className="w-3.5 h-3.5 text-gray-300 mt-0.5" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-gray-50 text-gray-500 text-[11px] font-medium rounded-full border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  );
}

function renderHighlighted(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-brand-blue font-semibold">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

function PreviewBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      if (!block.text) return null;
      return (
        <p className="text-gray-700 leading-[1.85] text-[14px] mb-4">
          {renderHighlighted(block.text)}
        </p>
      );

    case "heading": {
      const text = block.text || "";
      if (!text) return null;
      if (block.level === 2) {
        return (
          <h2 className="font-display text-base sm:text-lg font-bold text-brand-blue mt-7 mb-3 px-3 py-2 bg-brand-blue/[0.07] rounded-lg border-l-4 border-brand-blue">
            {text}
          </h2>
        );
      }
      return (
        <h3 className="font-display text-sm sm:text-base font-semibold text-brand-blue mt-5 mb-2 pl-3 border-l-[3px] border-brand-accent">
          {text}
        </h3>
      );
    }

    case "list": {
      const items = block.items?.filter(Boolean);
      if (!items?.length) return null;
      return (
        <ul className="space-y-2 mb-4 ml-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed text-[14px]">
                {renderHighlighted(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    case "quote":
      if (!block.text) return null;
      return (
        <blockquote className="relative my-6 bg-white rounded-xl p-5 border border-brand-blue/10 shadow-md shadow-brand-blue/5">
          <Quote className="w-7 h-7 text-brand-blue/15 mb-2" />
          <p className="text-gray-800 leading-relaxed text-[14px] font-medium italic">
            {renderHighlighted(block.text)}
          </p>
          <div className="mt-3 w-10 h-1 bg-gradient-to-r from-brand-blue to-brand-accent rounded-full" />
        </blockquote>
      );

    case "callout": {
      const variants: Record<
        string,
        {
          bg: string;
          iconBg: string;
          icon: React.ReactNode;
          text: string;
          label: string;
          labelColor: string;
        }
      > = {
        info: {
          bg: "bg-blue-50/80 border-blue-200/60",
          iconBg: "bg-blue-100",
          icon: <Info className="w-4 h-4 text-blue-600" />,
          text: "text-blue-900",
          label: "Note",
          labelColor: "text-blue-600",
        },
        warning: {
          bg: "bg-amber-50/80 border-amber-200/60",
          iconBg: "bg-amber-100",
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          text: "text-amber-900",
          label: "Important",
          labelColor: "text-amber-600",
        },
        tip: {
          bg: "bg-emerald-50/80 border-emerald-200/60",
          iconBg: "bg-emerald-100",
          icon: <Lightbulb className="w-4 h-4 text-emerald-600" />,
          text: "text-emerald-900",
          label: "Pro Tip",
          labelColor: "text-emerald-600",
        },
      };
      const v = variants[block.variant || "info"] ?? variants.info;
      if (!block.text) return null;
      return (
        <div className={`rounded-xl border my-5 overflow-hidden ${v.bg}`}>
          <div className="flex items-center gap-2 px-4 py-2 border-b border-inherit">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center ${v.iconBg}`}
            >
              {v.icon}
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${v.labelColor}`}
            >
              {v.label}
            </span>
          </div>
          <div className="px-4 py-3">
            <p className={`${v.text} text-xs leading-relaxed`}>
              {renderHighlighted(block.text)}
            </p>
          </div>
        </div>
      );
    }

    case "image":
      if (!block.src) return null;
      return (
        <figure className="my-5">
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full rounded-lg shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {block.caption && (
            <figcaption className="text-center text-xs text-gray-400 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}
