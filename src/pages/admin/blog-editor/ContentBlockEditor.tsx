import { useRef } from "react";
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
  Highlighter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ContentBlock } from "./types";
import { BLOCK_TYPES } from "./types";
import ImageUpload from "./ImageUpload";

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
                  {block.type === "paragraph" && block.content
                    ? ` — ${block.content.slice(0, 40)}${block.content.length > 40 ? "…" : ""}`
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

/* ─── Highlight helper ──────────────────────────────────────────────── */

function toggleHighlight(
  ref: React.RefObject<HTMLTextAreaElement | HTMLInputElement | null>,
  currentValue: string,
  onChangeValue: (newVal: string) => void
) {
  const el = ref.current;
  if (!el) return;

  const start = el.selectionStart ?? 0;
  const end = el.selectionEnd ?? 0;
  const selected = currentValue.slice(start, end);

  if (selected) {
    // If already highlighted, un-highlight; otherwise wrap with **
    let newVal: string;
    if (selected.startsWith("**") && selected.endsWith("**")) {
      newVal =
        currentValue.slice(0, start) +
        selected.slice(2, -2) +
        currentValue.slice(end);
    } else {
      newVal =
        currentValue.slice(0, start) +
        `**${selected}**` +
        currentValue.slice(end);
    }
    onChangeValue(newVal);
  } else {
    // No selection: insert **** placeholder at cursor
    const newVal =
      currentValue.slice(0, start) + "****" + currentValue.slice(end);
    onChangeValue(newVal);
    // Place cursor between the asterisks
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + 2, start + 2);
    });
  }
}

function HighlightButton({
  textRef,
  value,
  onChange,
}: {
  textRef: React.RefObject<HTMLTextAreaElement | HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => toggleHighlight(textRef, value, onChange)}
      title="Highlight selected text"
      className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 border border-brand-blue/15 rounded-lg transition-all"
    >
      <Highlighter className="w-3 h-3" />
      Highlight
    </button>
  );
}

function HighlightHint() {
  return (
    <p className="text-[10px] text-gray-400 mt-1">
      Select text and click <strong>Highlight</strong> — or wrap words in{" "}
      <code className="bg-gray-100 px-1 rounded text-[10px]">**double asterisks**</code>{" "}
      to emphasize them.
    </p>
  );
}

/* ─── Block fields ──────────────────────────────────────────────────── */

function BlockFields({
  block,
  index,
  onUpdate,
}: {
  block: ContentBlock;
  index: number;
  onUpdate: (i: number, u: Partial<ContentBlock>) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (block.type === "paragraph" || block.type === "quote") {
    return (
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <HighlightButton
            textRef={textareaRef}
            value={block.content || ""}
            onChange={(v) => onUpdate(index, { content: v })}
          />
        </div>
        <textarea
          ref={textareaRef}
          value={block.content || ""}
          onChange={(e) => onUpdate(index, { content: e.target.value })}
          placeholder={`Enter ${block.type} text...`}
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm resize-y transition-all"
        />
        <HighlightHint />
      </div>
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
          value={block.content || ""}
          onChange={(e) => onUpdate(index, { content: e.target.value })}
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
          <ListItemWithHighlight
            key={j}
            item={item}
            itemIndex={j}
            items={items}
            blockIndex={index}
            onUpdate={onUpdate}
          />
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
        <ImageUpload
          value={block.src || ""}
          onChange={(url) => onUpdate(index, { src: url })}
          compact
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
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <HighlightButton
              textRef={textareaRef}
              value={block.content || ""}
              onChange={(v) => onUpdate(index, { content: v })}
            />
          </div>
          <textarea
            ref={textareaRef}
            value={block.content || ""}
            onChange={(e) => onUpdate(index, { content: e.target.value })}
            placeholder="Callout text..."
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm resize-y transition-all"
          />
          <HighlightHint />
        </div>
      </>
    );
  }

  return null;
}

/* ─── List item with highlight support ──────────────────────────────── */

function ListItemWithHighlight({
  item,
  itemIndex,
  items,
  blockIndex,
  onUpdate,
}: {
  item: string;
  itemIndex: number;
  items: string[];
  blockIndex: number;
  onUpdate: (i: number, u: Partial<ContentBlock>) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-gray-300 text-sm font-bold w-4 text-center shrink-0">
        •
      </span>
      <Input
        ref={ref}
        value={item}
        onChange={(e) => {
          const arr = [...items];
          arr[itemIndex] = e.target.value;
          onUpdate(blockIndex, { items: arr });
        }}
        placeholder={`Item ${itemIndex + 1}`}
        className="border-gray-200 rounded-xl flex-1"
      />
      <button
        type="button"
        onClick={() =>
          toggleHighlight(ref, item, (v) => {
            const arr = [...items];
            arr[itemIndex] = v;
            onUpdate(blockIndex, { items: arr });
          })
        }
        title="Highlight selected text"
        className="p-1.5 text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-colors shrink-0"
      >
        <Highlighter className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => {
          const arr = items.filter((_, k) => k !== itemIndex);
          onUpdate(blockIndex, { items: arr.length ? arr : [""] });
        }}
        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
