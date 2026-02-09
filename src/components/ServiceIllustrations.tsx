/**
 * SVG decorative illustrations used across service pages.
 * Kept in a separate file for clean code organization.
 */

export const DashboardSVG = () => (
  <svg
    viewBox="0 0 200 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
  >
    {/* Frame */}
    <rect x="4" y="4" width="192" height="132" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
    {/* Top bar */}
    <rect x="14" y="14" width="172" height="20" rx="4" fill="#eef2ff" />
    <circle cx="26" cy="24" r="5" fill="#4f7df3" />
    <rect x="36" y="21" width="40" height="6" rx="3" fill="#c7d2fe" />
    {/* Card 1 */}
    <rect x="14" y="44" width="80" height="44" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
    <rect x="22" y="52" width="24" height="6" rx="3" fill="#c7d2fe" />
    <rect x="22" y="64" width="60" height="4" rx="2" fill="#e2e8f0" />
    <rect x="22" y="72" width="50" height="4" rx="2" fill="#e2e8f0" />
    {/* Card 2 */}
    <rect x="106" y="44" width="80" height="44" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
    <rect x="114" y="52" width="32" height="6" rx="3" fill="#bbf7d0" />
    <rect x="114" y="64" width="60" height="4" rx="2" fill="#e2e8f0" />
    <rect x="114" y="72" width="50" height="4" rx="2" fill="#e2e8f0" />
    {/* Chart bars */}
    <rect x="14" y="98" width="56" height="30" rx="6" fill="#eef2ff" />
    <rect x="22" y="106" width="20" height="14" rx="2" fill="#4f7df3" opacity="0.6" />
    <rect x="30" y="106" width="4" height="14" rx="2" fill="#4f7df3" />
    {/* Line chart */}
    <rect x="78" y="98" width="56" height="30" rx="6" fill="#f0fdf4" />
    <polyline points="86,120 96,112 106,116 116,106 126,110" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Donut chart */}
    <rect x="142" y="98" width="44" height="30" rx="6" fill="#fef3c7" />
    <circle cx="164" cy="113" r="10" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="20 43" strokeDashoffset="-5" />
    <text x="160" y="117" fontSize="9" fill="#f59e0b" fontWeight="bold">72</text>
  </svg>
);

export const WorkflowSVG = () => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
  >
    <rect x="2" y="30" width="50" height="40" rx="8" fill="#eef2ff" stroke="#4f7df3" strokeWidth="1.5" />
    <text x="27" y="54" fontSize="8" fill="#4f7df3" textAnchor="middle" fontWeight="600">Assess</text>
    <line x1="52" y1="50" x2="72" y2="50" stroke="#4f7df3" strokeWidth="1.5" strokeDasharray="3 3" />
    <polygon points="70,46 78,50 70,54" fill="#4f7df3" />
    <rect x="76" y="30" width="50" height="40" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
    <text x="101" y="54" fontSize="8" fill="#22c55e" textAnchor="middle" fontWeight="600">Optimize</text>
    <line x1="126" y1="50" x2="146" y2="50" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />
    <polygon points="144,46 152,50 144,54" fill="#22c55e" />
    <rect x="150" y="30" width="48" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="174" y="54" fontSize="8" fill="#f59e0b" textAnchor="middle" fontWeight="600">Grow</text>
  </svg>
);

export const CredentialingSVG = () => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
  >
    {/* Background card */}
    <rect x="8" y="8" width="184" height="144" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
    {/* Badge / Shield */}
    <path d="M100 20 L130 34 L130 64 Q130 85 100 100 Q70 85 70 64 L70 34 Z" fill="#eef2ff" stroke="#4f7df3" strokeWidth="1.5" />
    <circle cx="100" cy="55" r="14" fill="#4f7df3" opacity="0.15" />
    <polyline points="92,55 98,61 110,49" stroke="#4f7df3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Credential card left */}
    <rect x="16" y="108" width="76" height="36" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
    <circle cx="32" cy="120" r="5" fill="#c7d2fe" />
    <rect x="42" y="117" width="40" height="5" rx="2.5" fill="#e2e8f0" />
    <rect x="42" y="126" width="28" height="4" rx="2" fill="#c7d2fe" />
    {/* Credential card right */}
    <rect x="108" y="108" width="76" height="36" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
    <circle cx="124" cy="120" r="5" fill="#bbf7d0" />
    <rect x="134" y="117" width="40" height="5" rx="2.5" fill="#e2e8f0" />
    <rect x="134" y="126" width="28" height="4" rx="2" fill="#bbf7d0" />
    {/* Decorative dots */}
    <circle cx="32" cy="32" r="2" fill="#c7d2fe" />
    <circle cx="40" cy="32" r="2" fill="#c7d2fe" />
    <circle cx="48" cy="32" r="2" fill="#c7d2fe" />
    <circle cx="168" cy="32" r="2" fill="#bbf7d0" />
    <circle cx="160" cy="32" r="2" fill="#bbf7d0" />
    <circle cx="152" cy="32" r="2" fill="#bbf7d0" />
  </svg>
);

export const TimelineSVG = () => (
  <svg
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
  >
    {/* Timeline line */}
    <line x1="20" y1="40" x2="180" y2="40" stroke="#e2e8f0" strokeWidth="2" />
    {/* Step 1 */}
    <circle cx="40" cy="40" r="12" fill="#4f7df3" />
    <text x="40" y="44" fontSize="9" fill="white" textAnchor="middle" fontWeight="600">1</text>
    <text x="40" y="66" fontSize="7" fill="#64748b" textAnchor="middle">Apply</text>
    {/* Step 2 */}
    <circle cx="90" cy="40" r="12" fill="#22c55e" />
    <text x="90" y="44" fontSize="9" fill="white" textAnchor="middle" fontWeight="600">2</text>
    <text x="90" y="66" fontSize="7" fill="#64748b" textAnchor="middle">Verify</text>
    {/* Step 3 */}
    <circle cx="140" cy="40" r="12" fill="#f59e0b" />
    <text x="140" y="44" fontSize="9" fill="white" textAnchor="middle" fontWeight="600">3</text>
    <text x="140" y="66" fontSize="7" fill="#64748b" textAnchor="middle">Enroll</text>
    {/* Connecting arrows */}
    <line x1="52" y1="40" x2="76" y2="40" stroke="#4f7df3" strokeWidth="1.5" strokeDasharray="3 3" />
    <polygon points="74,36 82,40 74,44" fill="#4f7df3" />
    <line x1="102" y1="40" x2="126" y2="40" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />
    <polygon points="124,36 132,40 124,44" fill="#22c55e" />
  </svg>
);

/**
 * Denial Management SVGs
 */

export const CircularProcessSVG = () => (
  <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    {/* Central circle */}
    <circle cx="300" cy="300" r="80" fill="url(#circleGrad)" opacity="0.1" />
    <circle cx="300" cy="300" r="80" stroke="url(#circleGrad)" strokeWidth="3" fill="none" />
    <text x="300" y="295" textAnchor="middle" className="fill-brand-blue font-bold text-base">Denial</text>
    <text x="300" y="315" textAnchor="middle" className="fill-brand-blue font-bold text-base">Recovery</text>
    
    {/* Connecting circle */}
    <circle cx="300" cy="300" r="200" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" fill="none" />
    
    {/* Process dots at 6 positions */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle - 90) * (Math.PI / 180);
      const x = 300 + 200 * Math.cos(rad);
      const y = 300 + 200 * Math.sin(rad);
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4'];
      const labels = ['Identify', 'Analyze', 'Document', 'Appeal', 'Follow-Up', 'Recover'];
      
      return (
        <g key={i} className="dm-process-step">
          <circle cx={x} cy={y} r="50" fill={colors[i]} />
          <circle cx={x} cy={y} r="50" stroke={colors[i]} strokeWidth="3" fill="none" opacity="0.3" />
          <text x={x} y={y - 5} textAnchor="middle" fill="white" fontWeight="700" fontSize="24">{i + 1}</text>
          <text x={x} y={y + 15} textAnchor="middle" fill="white" fontWeight="500" fontSize="14">{labels[i]}</text>
        </g>
      );
    })}
  </svg>
);
