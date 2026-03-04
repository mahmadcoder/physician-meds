import { Activity } from "lucide-react";

interface LoadingIndicatorProps {
  label?: string;
  className?: string;
}

export default function LoadingIndicator({ label = "Loading data", className = "py-20" }: LoadingIndicatorProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Outer spinning rings */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#2d62ff" strokeWidth="2" strokeDasharray="60 100" strokeLinecap="round" className="opacity-30" />
        </svg>
        <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_reverse_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="40 80" strokeLinecap="round" className="opacity-50" />
        </svg>
        
        {/* Inner pulsing icon */}
        <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-50/50 z-10">
          <Activity className="w-5 h-5 text-[#2d62ff]" />
          
          {/* Heartbeat pulse effect */}
          <div className="absolute inset-0 rounded-full border-2 border-[#2d62ff] animate-ping opacity-20" style={{ animationDuration: '1.5s' }} />
        </div>
      </div>
      
      {/* Loading text with animated dots */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{label}</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2d62ff] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#2d62ff] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
