import { useState, useEffect } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Type,
  AlignLeft,
  List,
  Quote,
  Image,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "quote" | "image" | "callout";
  text?: string;
  level?: number;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  variant?: string;
}

const emptyPost = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  author_name: "",
  author_role: "",
  image: "",
  read_time: "",
  tags: [] as string[],
  featured: false,
  is_published: true,
  content: [] as ContentBlock[],
};

const blockTypeIcons = {
  paragraph: AlignLeft,
  heading: Type,
  list: List,
  quote: Quote,
  image: Image,
  callout: AlertCircle,
};

const AdminBlogEditorPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  usePageTitle(isEditing ? "Edit Blog Post" : "New Blog Post");
  const navigate = useNavigate();
  const [post, setPost] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/pm-portal-x9k2");
      return;
    }
    if (isEditing) {
      fetchPost();
    }
  }, [id, token, navigate]);

  const fetchPost = async () => {
    try {
      const res = await fetch("/api/admin/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const posts = await res.json();
      const found = posts.find((p: { id: string }) => p.id === id);
      if (found) {
        setPost(found);
        setTagsInput((found.tags || []).join(", "));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...post,
        tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      };

      if (isEditing) {
        const res = await fetch("/api/admin/blogs", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }
      } else {
        const res = await fetch("/api/admin/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }
      }

      navigate("/pm-portal-x9k2/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: unknown) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  const addContentBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = { type };
    if (type === "paragraph") newBlock.text = "";
    if (type === "heading") { newBlock.text = ""; newBlock.level = 2; }
    if (type === "list") newBlock.items = [""];
    if (type === "quote") newBlock.text = "";
    if (type === "image") { newBlock.src = ""; newBlock.alt = ""; newBlock.caption = ""; }
    if (type === "callout") { newBlock.text = ""; newBlock.variant = "info"; }

    setPost(prev => ({ ...prev, content: [...prev.content, newBlock] }));
    setExpandedBlock(post.content.length);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    setPost(prev => ({
      ...prev,
      content: prev.content.map((b, i) => i === index ? { ...b, ...updates } : b),
    }));
  };

  const removeBlock = (index: number) => {
    setPost(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newContent = [...post.content];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newContent.length) return;
    [newContent[index], newContent[target]] = [newContent[target], newContent[index]];
    setPost(prev => ({ ...prev, content: newContent }));
    setExpandedBlock(target);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/pm-portal-x9k2/dashboard")}
              className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-2xl font-bold text-brand-dark">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={post.is_published}
                onChange={(e) => updateField("is_published", e.target.checked)}
                className="rounded border-gray-300"
              />
              Published
            </label>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary text-sm disabled:opacity-60"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Meta Fields */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-brand-dark mb-4">Post Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
              <Input
                value={post.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Blog post title"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
              <Input
                value={post.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="url-friendly-slug"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
              <Input
                value={post.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="e.g. Revenue Cycle"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Excerpt</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="Brief description for blog listing..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Author Name</label>
              <Input
                value={post.author_name}
                onChange={(e) => updateField("author_name", e.target.value)}
                placeholder="Author name"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Author Role</label>
              <Input
                value={post.author_role}
                onChange={(e) => updateField("author_role", e.target.value)}
                placeholder="e.g. Medical Billing Expert"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Cover Image URL</label>
              <Input
                value={post.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="https://..."
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Read Time</label>
              <Input
                value={post.read_time}
                onChange={(e) => updateField("read_time", e.target.value)}
                placeholder="e.g. 8 min read"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Tags (comma-separated)</label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="billing, coding, revenue"
                className="border-gray-200 rounded-xl"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-600 pb-2">
                <input
                  type="checkbox"
                  checked={post.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="rounded border-gray-300"
                />
                Featured Post
              </label>
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-brand-dark mb-4">Content Blocks</h2>

          {post.content.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-8">
              No content blocks yet. Add one below.
            </p>
          )}

          <div className="space-y-3">
            {post.content.map((block, i) => {
              const Icon = blockTypeIcons[block.type] || AlignLeft;
              const isExpanded = expandedBlock === i;

              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 p-3 bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedBlock(isExpanded ? null : i)}
                  >
                    <Icon className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm font-medium text-gray-700 capitalize flex-1">
                      {block.type}
                      {block.type === "heading" && ` (H${block.level || 2})`}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); moveBlock(i, "up"); }}
                        disabled={i === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveBlock(i, "down"); }}
                        disabled={i === post.content.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeBlock(i); }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 space-y-3">
                      {(block.type === "paragraph" || block.type === "quote" || block.type === "callout") && (
                        <textarea
                          value={block.text || ""}
                          onChange={(e) => updateBlock(i, { text: e.target.value })}
                          placeholder={`Enter ${block.type} text...`}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm resize-y"
                        />
                      )}
                      {block.type === "heading" && (
                        <>
                          <div className="flex gap-2">
                            {[2, 3, 4].map(level => (
                              <button
                                key={level}
                                onClick={() => updateBlock(i, { level })}
                                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                  block.level === level
                                    ? "bg-brand-blue text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                H{level}
                              </button>
                            ))}
                          </div>
                          <Input
                            value={block.text || ""}
                            onChange={(e) => updateBlock(i, { text: e.target.value })}
                            placeholder="Heading text"
                            className="border-gray-200 rounded-xl"
                          />
                        </>
                      )}
                      {block.type === "list" && (
                        <div className="space-y-2">
                          {(block.items || [""]).map((item, j) => (
                            <div key={j} className="flex gap-2">
                              <span className="text-gray-400 text-sm pt-2">•</span>
                              <Input
                                value={item}
                                onChange={(e) => {
                                  const newItems = [...(block.items || [])];
                                  newItems[j] = e.target.value;
                                  updateBlock(i, { items: newItems });
                                }}
                                placeholder={`Item ${j + 1}`}
                                className="border-gray-200 rounded-xl flex-1"
                              />
                              <button
                                onClick={() => {
                                  const newItems = (block.items || []).filter((_, k) => k !== j);
                                  updateBlock(i, { items: newItems.length ? newItems : [""] });
                                }}
                                className="p-2 text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => updateBlock(i, { items: [...(block.items || []), ""] })}
                            className="text-sm text-brand-blue hover:underline mt-1"
                          >
                            + Add item
                          </button>
                        </div>
                      )}
                      {block.type === "image" && (
                        <div className="space-y-2">
                          <Input
                            value={block.src || ""}
                            onChange={(e) => updateBlock(i, { src: e.target.value })}
                            placeholder="Image URL"
                            className="border-gray-200 rounded-xl"
                          />
                          <Input
                            value={block.alt || ""}
                            onChange={(e) => updateBlock(i, { alt: e.target.value })}
                            placeholder="Alt text"
                            className="border-gray-200 rounded-xl"
                          />
                          <Input
                            value={block.caption || ""}
                            onChange={(e) => updateBlock(i, { caption: e.target.value })}
                            placeholder="Caption (optional)"
                            className="border-gray-200 rounded-xl"
                          />
                        </div>
                      )}
                      {block.type === "callout" && (
                        <select
                          value={block.variant || "info"}
                          onChange={(e) => updateBlock(i, { variant: e.target.value })}
                          className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        >
                          <option value="info">Info</option>
                          <option value="warning">Warning</option>
                          <option value="tip">Tip</option>
                        </select>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Block Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(blockTypeIcons) as ContentBlock["type"][]).map((type) => {
              const Icon = blockTypeIcons[type];
              return (
                <button
                  key={type}
                  onClick={() => addContentBlock(type)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-brand-blue/10 text-gray-600 hover:text-brand-blue border border-gray-200 hover:border-brand-blue/30 rounded-xl text-xs font-medium transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <Plus className="w-2.5 h-2.5" />
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditorPage;
