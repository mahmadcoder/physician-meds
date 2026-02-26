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
    <div className="h-screen flex flex-col bg-[#f5f6fa]">
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

      {/* Fill remaining viewport height below the top bar */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-full">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 my-4 flex items-center gap-2 shrink-0">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div
            className={`flex gap-6 h-full py-6 ${
              showPreview ? "flex-col lg:flex-row" : ""
            }`}
          >
            {/* Editor column — scrolls independently */}
            <div
              className={`min-w-0 overflow-y-auto ${
                showPreview
                  ? "flex-1 lg:max-w-[55%]"
                  : "max-w-4xl mx-auto w-full"
              }`}
            >
              <div className="space-y-5 pb-6">
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
            </div>

            {/* Preview column — scrolls independently, stays in place */}
            {showPreview && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <ArticlePreview post={post} tagsInput={tagsInput} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditorPage;
