import { useState, useRef } from "react";
import { Upload, X, Loader2, Link as LinkIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  compact?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  compact = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"upload" | "url">(value ? "url" : "upload");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const base64 = await fileToBase64(file);
      const token = localStorage.getItem("admin_token");
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
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const { url } = await res.json();
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex gap-1.5 mb-1.5">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              mode === "upload"
                ? "bg-brand-blue/10 text-brand-blue"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Upload className="w-3 h-3 inline mr-1" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              mode === "url"
                ? "bg-brand-blue/10 text-brand-blue"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <LinkIcon className="w-3 h-3 inline mr-1" />
            URL
          </button>
        </div>

        {mode === "url" ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
          />
        ) : (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 hover:border-brand-blue/30 rounded-xl p-3 text-center cursor-pointer transition-all"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
            {uploading ? (
              <Loader2 className="w-4 h-4 mx-auto text-brand-blue animate-spin" />
            ) : (
              <p className="text-xs text-gray-400">
                Drop image or <span className="text-brand-blue font-medium">browse</span>
              </p>
            )}
          </div>
        )}

        {value && (
          <div className="relative group rounded-lg overflow-hidden">
            <img
              src={value}
              alt=""
              className="w-full h-24 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {error && <p className="text-[11px] text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="flex gap-1.5 mb-1">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === "upload"
              ? "bg-brand-blue/10 text-brand-blue"
              : "text-gray-400 hover:text-gray-600 bg-gray-50"
          }`}
        >
          <Upload className="w-3.5 h-3.5 inline mr-1.5" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === "url"
              ? "bg-brand-blue/10 text-brand-blue"
              : "text-gray-400 hover:text-gray-600 bg-gray-50"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 inline mr-1.5" />
          Paste URL
        </button>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
        />
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 hover:border-brand-blue/30 rounded-xl p-6 text-center cursor-pointer transition-all group"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-brand-blue animate-spin" />
              <p className="text-xs text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-brand-blue/5 flex items-center justify-center transition-colors">
                <Upload className="w-5 h-5 text-gray-300 group-hover:text-brand-blue transition-colors" />
              </div>
              <p className="text-xs text-gray-400">
                Drag & drop or{" "}
                <span className="text-brand-blue font-medium">browse</span>
              </p>
              <p className="text-[10px] text-gray-300">PNG, JPG, WebP up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {value && (
        <div className="relative group rounded-xl overflow-hidden border border-gray-100">
          <img
            src={value}
            alt=""
            className="w-full h-40 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
