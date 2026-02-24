import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ContentBlock, BlogPostDraft } from "./types";
import { EMPTY_POST } from "./types";

export function useBlogEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPostDraft>(EMPTY_POST);
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
      fetch("/api/admin/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((posts) => {
          const found = posts.find((p: { id: string }) => p.id === id);
          if (found) {
            setPost(found);
            setTagsInput((found.tags || []).join(", "));
          }
        })
        .catch(console.error);
    }
  }, [id, token, navigate, isEditing]);

  const updateField = useCallback(
    (field: string, value: unknown) =>
      setPost((prev) => ({ ...prev, [field]: value })),
    []
  );

  const addBlock = useCallback(
    (type: ContentBlock["type"]) => {
      const block: ContentBlock = { type };
      if (type === "paragraph" || type === "quote") block.content = "";
      if (type === "heading") {
        block.content = "";
        block.level = 2;
      }
      if (type === "list") block.items = [""];
      if (type === "image") {
        block.src = "";
        block.alt = "";
        block.caption = "";
      }
      if (type === "callout") {
        block.content = "";
        block.variant = "info";
      }
      setPost((prev) => ({ ...prev, content: [...prev.content, block] }));
      setExpandedBlock(post.content.length);
    },
    [post.content.length]
  );

  const updateBlock = useCallback(
    (index: number, updates: Partial<ContentBlock>) =>
      setPost((prev) => ({
        ...prev,
        content: prev.content.map((b, i) =>
          i === index ? { ...b, ...updates } : b
        ),
      })),
    []
  );

  const removeBlock = useCallback(
    (index: number) =>
      setPost((prev) => ({
        ...prev,
        content: prev.content.filter((_, i) => i !== index),
      })),
    []
  );

  const moveBlock = useCallback(
    (index: number, direction: "up" | "down") => {
      setPost((prev) => {
        const arr = [...prev.content];
        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= arr.length) return prev;
        [arr[index], arr[target]] = [arr[target], arr[index]];
        setExpandedBlock(target);
        return { ...prev, content: arr };
      });
    },
    []
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...post,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/admin/blogs", {
        method,
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
      navigate("/pm-portal-x9k2/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }, [post, tagsInput, isEditing, token, navigate]);

  return {
    post,
    isEditing,
    saving,
    error,
    tagsInput,
    setTagsInput,
    expandedBlock,
    setExpandedBlock,
    updateField,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    handleSave,
    navigate,
  };
}
