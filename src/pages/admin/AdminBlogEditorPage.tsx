import { useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { AlertCircle } from "lucide-react";
import { useBlogEditor } from "./blog-editor/useBlogEditor";
import EditorTopBar from "./blog-editor/EditorTopBar";
import PostDetailsForm from "./blog-editor/PostDetailsForm";
import ContentBlockEditor from "./blog-editor/ContentBlockEditor";
import ArticlePreview from "./blog-editor/ArticlePreview";

const AdminBlogEditorPage = () => {
  const {
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
  } = useBlogEditor();

  usePageTitle(isEditing ? "Edit Blog Post" : "New Blog Post");
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <EditorTopBar
        isEditing={isEditing}
        isPublished={post.is_published}
        saving={saving}
        showPreview={showPreview}
        onBack={() => navigate("/pm-portal-x9k2/dashboard")}
        onTogglePublish={(val) => updateField("is_published", val)}
        onTogglePreview={() => setShowPreview((p) => !p)}
        onSave={handleSave}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 mb-5 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div
          className={`flex gap-6 ${showPreview ? "flex-col lg:flex-row" : ""}`}
        >
          {/* Editor column */}
          <div
            className={`space-y-5 min-w-0 ${
              showPreview ? "flex-1 lg:max-w-[55%]" : "max-w-4xl mx-auto w-full"
            }`}
          >
            <PostDetailsForm
              post={post}
              tagsInput={tagsInput}
              onFieldChange={updateField}
              onTagsChange={setTagsInput}
            />
            <ContentBlockEditor
              blocks={post.content}
              expandedBlock={expandedBlock}
              onExpand={setExpandedBlock}
              onAdd={addBlock}
              onUpdate={updateBlock}
              onRemove={removeBlock}
              onMove={moveBlock}
            />
          </div>

          {/* Preview column */}
          {showPreview && (
            <div className="flex-1 min-w-0 lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-96px)]">
              <ArticlePreview post={post} tagsInput={tagsInput} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditorPage;
