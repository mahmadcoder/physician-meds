import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Smile,
  Palette,
  Highlighter,
} from "lucide-react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TEXT_COLORS = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#dc2626", "#ea580c", "#ca8a04",
  "#65a30d", "#16a34a", "#059669", "#0d9488", "#0891b2", "#0284c7", "#2563eb",
  "#4f46e5", "#7c3aed", "#9333ea", "#c026d3", "#db2777", "#e11d48",
];

function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? "bg-blue-100 text-blue-700"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

interface RichTextBlockProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function RichTextBlock({
  value,
  onChange,
  placeholder = "Enter text...",
  rows = 4,
}: RichTextBlockProps) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none px-3 py-2 focus:outline-none",
        style: `min-height: ${rows * 1.5}em`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync value from outside (e.g. block switching)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    editor?.chain().focus().insertContent(emojiData.emoji).run();
    setEmojiOpen(false);
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-gray-100 bg-gray-50/50">
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-gray-200 mx-0.5" />

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-gray-200 mx-0.5" />

        <ToolbarBtn
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            editor.chain().focus().setColor("#2d62ff").run();
          }}
          active={editor.isActive("bold") && editor.isActive("textStyle", { color: "#2d62ff" })}
          title="Highlight"
        >
          <Highlighter className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Popover open={colorOpen} onOpenChange={setColorOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-1.5 rounded-md transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Text Color"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="grid grid-cols-5 gap-1">
              {TEXT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setColorOpen(false);
                  }}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-1.5 rounded-md transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Insert Emoji"
            >
              <Smile className="w-3.5 h-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0" align="start">
            <EmojiPicker onEmojiClick={handleEmojiClick} width={320} height={360} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
