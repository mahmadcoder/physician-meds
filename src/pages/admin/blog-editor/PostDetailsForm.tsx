import { Input } from "@/components/ui/input";
import type { BlogPostDraft } from "./types";

interface PostDetailsFormProps {
  post: BlogPostDraft;
  tagsInput: string;
  onFieldChange: (field: string, value: unknown) => void;
  onTagsChange: (val: string) => void;
}

export default function PostDetailsForm({
  post,
  tagsInput,
  onFieldChange,
  onTagsChange,
}: PostDetailsFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-brand-dark mb-4 tracking-wide uppercase">
        Post Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <Field label="Title" span={2}>
          <Input
            value={post.title}
            onChange={(e) => onFieldChange("title", e.target.value)}
            placeholder="Blog post title"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Slug">
          <Input
            value={post.slug}
            onChange={(e) => onFieldChange("slug", e.target.value)}
            placeholder="url-friendly-slug"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Category">
          <Input
            value={post.category}
            onChange={(e) => onFieldChange("category", e.target.value)}
            placeholder="e.g. Revenue Cycle"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Excerpt" span={2}>
          <textarea
            value={post.excerpt}
            onChange={(e) => onFieldChange("excerpt", e.target.value)}
            placeholder="Brief description for blog listing..."
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none text-sm"
          />
        </Field>
        <Field label="Author Name">
          <Input
            value={post.author_name}
            onChange={(e) => onFieldChange("author_name", e.target.value)}
            placeholder="Author name"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Author Role">
          <Input
            value={post.author_role}
            onChange={(e) => onFieldChange("author_role", e.target.value)}
            placeholder="e.g. Medical Billing Expert"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Cover Image URL">
          <Input
            value={post.image}
            onChange={(e) => onFieldChange("image", e.target.value)}
            placeholder="https://..."
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Read Time">
          <Input
            value={post.read_time}
            onChange={(e) => onFieldChange("read_time", e.target.value)}
            placeholder="e.g. 8 min read"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <Input
            value={tagsInput}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="billing, coding, revenue"
            className="border-gray-200 rounded-xl"
          />
        </Field>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-gray-600 pb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={post.featured}
              onChange={(e) => onFieldChange("featured", e.target.checked)}
              className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue/20"
            />
            Featured Post
          </label>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  span,
  children,
}: {
  label: string;
  span?: number;
  children: React.ReactNode;
}) {
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <label className="block text-[11px] font-medium text-gray-400 mb-1 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
