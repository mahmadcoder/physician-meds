import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorTopBarProps {
  isEditing: boolean;
  isPublished: boolean;
  saving: boolean;
  showPreview: boolean;
  onBack: () => void;
  onTogglePublish: (val: boolean) => void;
  onTogglePreview: () => void;
  onSave: () => void;
}

export default function EditorTopBar({
  isEditing,
  isPublished,
  saving,
  showPreview,
  onBack,
  onTogglePublish,
  onTogglePreview,
  onSave,
}: EditorTopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-base sm:text-lg font-bold text-brand-dark">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onTogglePreview}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              showPreview
                ? "bg-brand-blue/5 text-brand-blue border-brand-blue/20"
                : "text-gray-500 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {showPreview ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            {showPreview ? "Hide Preview" : "Preview"}
          </button>

          <label className="hidden sm:flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => onTogglePublish(e.target.checked)}
              className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue/20"
            />
            Published
          </label>

          <Button
            onClick={onSave}
            disabled={saving}
            className="btn-primary text-xs sm:text-sm disabled:opacity-60"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
