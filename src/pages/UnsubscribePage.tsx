import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import { MailX, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

type Status = "loading" | "confirm" | "success" | "already" | "error";

export default function UnsubscribePage() {
  usePageTitle("Unsubscribe");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    fetch(`/api/unsubscribe?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setEmail(data.email);
          if (data.message?.includes("already")) {
            setStatus("already");
          } else {
            setStatus("confirm");
          }
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Verifying your request...</p>
            </>
          )}

          {status === "confirm" && (
            <>
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <MailX className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribe</h1>
              <p className="text-gray-500 mb-1 text-sm">You are about to unsubscribe</p>
              <p className="text-gray-900 font-semibold mb-6">{email}</p>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                You will no longer receive newsletter emails from PhysicianMeds.
                You can always resubscribe on our website.
              </p>
              <button
                onClick={handleUnsubscribe}
                disabled={processing}
                className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Yes, Unsubscribe Me"
                )}
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to website
              </Link>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribed</h1>
              <p className="text-gray-500 mb-6 leading-relaxed">
                <strong className="text-gray-700">{email}</strong> has been removed from our mailing list.
                We're sorry to see you go!
              </p>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-blue-700 text-sm font-medium">Changed your mind?</p>
                <p className="text-blue-600 text-xs mt-1">You can resubscribe anytime from our website.</p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to PhysicianMeds
              </Link>
            </>
          )}

          {status === "already" && (
            <>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Already Unsubscribed</h1>
              <p className="text-gray-500 mb-6 leading-relaxed">
                <strong className="text-gray-700">{email}</strong> is already unsubscribed from our newsletter.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to PhysicianMeds
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
              <p className="text-gray-500 mb-6 leading-relaxed">
                This unsubscribe link is invalid or has expired. If you need help, please contact us.
              </p>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                Contact Support
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
