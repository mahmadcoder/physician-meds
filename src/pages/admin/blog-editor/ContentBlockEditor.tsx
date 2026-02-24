import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  Type,
  AlignLeft,
  List,
  Quote,
  Image,
  AlertCircle,
  GripVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ContentBlock } from "./types";
import { BLOCK_TYPES } from "./types";

const ICONS: Record<ContentBlock["type"], React.ComponentType<{ className?: string }>> = {
  paragraph: AlignLeft,
  heading: Type,
  list: List,
  quote: Quote,
  image: Image,
  callout: AlertCircle,
};

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  expandedBlock: number | null;
  onExpand: (index: number | null) => void;
  onAdd: (type: ContentBlock["type"]) => void;
  onUpdate: (index: number, updates: Partial<ContentBlock>) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, dir: "up" | "down") => void;
}

export default function ContentBlockEditor({
  blocks,
  expandedBlock,
  onExpand,
  onAdd,
  onUpdate,
  onRemove,
  onMove,
}: ContentBlockEditorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-brand-dark mb-4 tracking-wide uppercase">
        Content Blocks
      </h2>

      {blocks.length === 0 && (
        <div className="text-center py-10">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center">
            <AlignLeft className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm">
            No content blocks yet. Add one below.
          </p>
        </div>
      )}

      <div className="space-y-2.5">
        {blocks.map((block, i) => {
          const Icon = ICONS[block.type] || AlignLeft;
          const isOpen = expandedBlock === i;

          return (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "border-brand-blue/20 shadow-sm shadow-brand-blue/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors ${
                  isOpen ? "bg-brand-blue/[0.03]" : "bg-gray-50/80 hover:bg-gray-50"
                }`}
                onClick={() => onExpand(isOpen ? null : i)}
              >
                <GripVertical className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <Icon className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="text-sm font-medium text-gray-700 capitalize flex-1 truncate">
                  {block.type}
                  {block.type === "heading" && ` (H${block.level || 2})`}
                  {block.type === "paragraph" && block.text
                    ? ` — ${block.text.slice(0, 40)}${block.text.length > 40 ? "…" : ""}`
                    : ""}
                </span>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(i, "up");
                    }}
                    disabled={i === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-colors"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(i, "down");
                    }}
                    disabled={i === blocks.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(i);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="px-4 py-3.5 space-y-3 border-t border-gray-100">
                  <BlockFields
                    block={block}
                    index={i}
                    onUpdate={onUpdate}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {BLOCK_TYPES.map((type) => {
          const Icon = ICONS[type];
          return (
            <button
              key={type}
              onClick={() => onAdd(type)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-brand-blue/5 text-gray-600 hover:text-brand-blue border border-gray-200 hover:border-brand-blue/20 rounded-xl text-xs font-medium transition-all"
            >
              <Icon className="w-3.5 h-3.5" />
              <Plus className="w-2.5 h-2.5" />
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BlockFields({
  block,
  index,
  onUpdate,
}: {
  block: ContentBlock;
  index: number;
  onUpdate: (i: number, u: Partial<ContentBlock>) => void;
}) {
  if (block.type === "paragraph" || block.type === "quote") {
    return (
      <textarea
        value={block.text || ""}
        onChange={(e) => onUpdate(index, { text: e.target.value })}
        placeholder={`Enter ${block.type} text...`}
        rows={4}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm resize-y transition-all"
      />
    );
  }

  if (block.type === "heading") {
    return (
      <>
        <div className="flex gap-1.5">
          {[2, 3, 4].map((level) => (
            <button
              key={level}
              onClick={() => onUpdate(index, { level })}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                block.level === level
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              H{level}
            </button>
          ))}
        </div>
        <Input
          value={block.text || ""}
          onChange={(e) => onUpdate(index, { text: e.target.value })}
          placeholder="Heading text"
          className="border-gray-200 rounded-xl"
        />
      </>
    );
  }

  if (block.type === "list") {
    const items = block.items?.length ? block.items : [""];
    return (
      <div className="space-y-2">
        {items.map((item, j) => (
          <div key={j} className="flex gap-2 items-center">
            <span className="text-gray-300 text-sm font-bold w-4 text-center shrink-0">
              •
            </span>
            <Input
              value={item}
              onChange={(e) => {
                const arr = [...items];
                arr[j] = e.target.value;
                onUpdate(index, { items: arr });
              }}
              placeholder={`Item ${j + 1}`}
              className="border-gray-200 rounded-xl flex-1"
            />
            <button
              onClick={() => {
                const arr = items.filter((_, k) => k !== j);
                onUpdate(index, { items: arr.length ? arr : [""] });
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => onUpdate(index, { items: [...items, ""] })}
          className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
        >
          + Add item
        </button>
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <div className="space-y-2.5">
        <Input
          value={block.src || ""}
          onChange={(e) => onUpdate(index, { src: e.target.value })}
          placeholder="Image URL"
          className="border-gray-200 rounded-xl"
        />
        <Input
          value={block.alt || ""}
          onChange={(e) => onUpdate(index, { alt: e.target.value })}
          placeholder="Alt text"
          className="border-gray-200 rounded-xl"
        />
        <Input
          value={block.caption || ""}
          onChange={(e) => onUpdate(index, { caption: e.target.value })}
          placeholder="Caption (optional)"
          className="border-gray-200 rounded-xl"
        />
      </div>
    );
  }

  if (block.type === "callout") {
    return (
      <>
        <div className="flex gap-1.5">
          {(["info", "warning", "tip"] as const).map((v) => (
            <button
              key={v}
              onClick={() => onUpdate(index, { variant: v })}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                (block.variant || "info") === v
                  ? v === "info"
                    ? "bg-blue-100 text-blue-700"
                    : v === "warning"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <textarea
          value={block.text || ""}
          onChange={(e) => onUpdate(index, { text: e.target.value })}
          placeholder="Callout text..."
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm resize-y transition-all"
        />
      </>
    );
  }

  return null;
}
