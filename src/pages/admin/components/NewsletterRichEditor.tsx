import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
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
  Type,
  ImagePlus,
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

function ToolbarButton({
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
      className={`p-2 rounded-lg transition-colors ${
        active ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

interface NewsletterRichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function NewsletterRichEditor({
  value,
  onChange,
  placeholder = "Write your newsletter content here...",
}: NewsletterRichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: { style: "max-width: 100%; height: auto; border-radius: 8px;" },
      }),
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[200px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync value when switching campaigns (external update)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  const uploadImage = async (file: File) => {
    const token = localStorage.getItem("admin_token");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            data: base64,
            folder: "newsletter",
          }),
        });
        const data = await res.json();
        if (data.url) {
          editor?.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (e) {
        console.error("Image upload failed:", e);
      }
    };
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    editor?.chain().focus().insertContent(emojiData.emoji).run();
    setEmojiOpen(false);
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-100 bg-gray-50/50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Type className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <span className="text-xs font-bold">H3</span>
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            editor.chain().focus().setColor("#2d62ff").run();
          }}
          active={editor.isActive("bold") && editor.isActive("textStyle", { color: "#2d62ff" })}
          title="Highlight"
        >
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>

        <Popover open={colorOpen} onOpenChange={setColorOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`p-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
              title="Text Color"
            >
              <Palette className="w-4 h-4" />
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

        <ToolbarButton onClick={handleImageClick} title="Insert Image">
          <ImagePlus className="w-4 h-4" />
        </ToolbarButton>

        <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`p-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
              title="Insert Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0" align="start">
            <EmojiPicker onEmojiClick={handleEmojiClick} width={320} height={360} />
          </PopoverContent>
        </Popover>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImage(file);
          e.target.value = "";
        }}
      />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
