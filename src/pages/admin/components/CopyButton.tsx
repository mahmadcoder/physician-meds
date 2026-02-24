import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}

export default function CopyButton({ icon: Icon, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 text-gray-700 text-[13px] font-medium transition-all cursor-pointer"
      title={`Copy ${value}`}
    >
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="truncate max-w-[200px]">{value}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-40 shrink-0" />
      )}
    </button>
  );
}
