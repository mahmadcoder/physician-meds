export interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "quote" | "image" | "callout";
  content?: string;
  level?: number;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  variant?: string;
}

export interface BlogPostDraft {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author_name: string;
  author_role: string;
  image: string;
  read_time: string;
  tags: string[];
  featured: boolean;
  is_published: boolean;
  content: ContentBlock[];
}

export const EMPTY_POST: BlogPostDraft = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  author_name: "",
  author_role: "",
  image: "",
  read_time: "",
  tags: [],
  featured: false,
  is_published: true,
  content: [],
};

export const BLOCK_TYPES: ContentBlock["type"][] = [
  "paragraph",
  "heading",
  "list",
  "quote",
  "image",
  "callout",
];
