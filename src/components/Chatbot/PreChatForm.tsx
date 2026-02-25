import { useState } from "react";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import type { PreChatFormData } from "./types";

interface PreChatFormProps {
  onSubmit: (data: PreChatFormData) => void;
  onClose: () => void;
  error: string | null;
}

export default function PreChatForm({ onSubmit, onClose, error }: PreChatFormProps) {
  const [form, setForm] = useState<PreChatFormData>({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [validation, setValidation] = useState<Partial<Record<keyof PreChatFormData, string>>>({});

  const validate = (): boolean => {
    const errors: typeof validation = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email";
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  };

  const inputClass = (field: keyof PreChatFormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 ${
      validation[field]
        ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 bg-white focus:border-[#2d62ff] focus:ring-2 focus:ring-[#2d62ff]/10"
    }`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)] animate-in slide-in-from-bottom-4 fade-in-0 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2d62ff] to-[#1d4ed8] px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[15px]">PhysicianMeds</h3>
                <p className="text-white/70 text-xs font-medium">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            Hi there! Before we start, let us know who you are so we can help you better.
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <input
                type="text"
                placeholder="Your name *"
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setValidation((v) => ({ ...v, name: undefined })); }}
                className={inputClass("name")}
              />
              {validation.name && <p className="text-xs text-red-500 mt-1.5 ml-1">{validation.name}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address *"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setValidation((v) => ({ ...v, email: undefined })); }}
                className={inputClass("email")}
              />
              {validation.email && <p className="text-xs text-red-500 mt-1.5 ml-1">{validation.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass("phone")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2d62ff] hover:bg-[#2452d9] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#2d62ff]/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Start Chat
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
