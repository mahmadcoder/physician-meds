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

export const OutOfNetworkCircularSVG = () => (
  <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <linearGradient id="oonCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    {/* Central circle */}
    <circle cx="300" cy="300" r="80" fill="url(#oonCircleGrad)" opacity="0.1" />
    <circle cx="300" cy="300" r="80" stroke="url(#oonCircleGrad)" strokeWidth="3" fill="none" />
    <text x="300" y="295" textAnchor="middle" className="fill-brand-blue font-bold text-base">Out-of-Network</text>
    <text x="300" y="315" textAnchor="middle" className="fill-brand-blue font-bold text-base">Billing</text>
    
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
        <g key={i} className="oon-process-step">
          <circle cx={x} cy={y} r="50" fill={colors[i]} />
          <circle cx={x} cy={y} r="50" stroke={colors[i]} strokeWidth="3" fill="none" opacity="0.3" />
          <text x={x} y={y - 5} textAnchor="middle" fill="white" fontWeight="700" fontSize="24">{i + 1}</text>
          <text x={x} y={y + 15} textAnchor="middle" fill="white" fontWeight="500" fontSize="14">{labels[i]}</text>
        </g>
      );
    })}
  </svg>
);

/**
 * Out of Network SVGs
 */

export const NetworkNodesSVG = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <linearGradient id="oonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    {/* Central patient node */}
    <circle cx="200" cy="200" r="40" fill="url(#oonGrad)" />
    <text x="200" y="205" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">Patient</text>
    
    {/* Connecting lines to providers */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 200 + 120 * Math.cos(rad);
      const y = 200 + 120 * Math.sin(rad);
      const isInNetwork = i % 3 === 0;
      
      return (
        <g key={i}>
          {/* Connection line */}
          <line
            x1="200"
            y1="200"
            x2={x}
            y2={y}
            stroke={isInNetwork ? "#10B981" : "#4F7DF3"}
            strokeWidth="2"
            strokeDasharray={isInNetwork ? "0" : "5,5"}
            opacity="0.4"
          />
          
          {/* Provider node */}
          <circle cx={x} cy={y} r="25" fill={isInNetwork ? "#10B981" : "#4F7DF3"} opacity="0.9" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="600">
            {isInNetwork ? "In" : "Out"}
          </text>
        </g>
      );
    })}
    
    {/* Legend */}
    <g transform="translate(20, 350)">
      <circle cx="0" cy="0" r="8" fill="#10B981" />
      <text x="15" y="4" fontSize="11" fill="#64748b">In-Network</text>
      <circle cx="100" cy="0" r="8" fill="#4F7DF3" />
      <text x="115" y="4" fontSize="11" fill="#64748b">Out-of-Network</text>
    </g>
  </svg>
);

export const BalanceScaleSVG = () => (
  <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    {/* Central support */}
    <rect x="145" y="120" width="10" height="60" fill="#64748b" rx="2" />
    <rect x="120" y="175" width="60" height="8" fill="#64748b" rx="4" />
    
    {/* Balance beam - tilted towards right */}
    <line x1="60" y1="130" x2="240" y2="110" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    
    {/* Left side - Limited Network */}
    <line x1="60" y1="130" x2="60" y2="155" stroke="#64748b" strokeWidth="2" />
    <rect x="30" y="155" width="60" height="40" rx="4" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2" />
    <text x="60" y="178" textAnchor="middle" fontSize="10" fill="#F59E0B" fontWeight="700">Limited</text>
    
    {/* Right side - Unlimited Access - Higher position (advantage) */}
    <line x1="240" y1="110" x2="240" y2="135" stroke="#64748b" strokeWidth="2" />
    <rect x="210" y="135" width="60" height="40" rx="4" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="2" />
    <text x="240" y="158" textAnchor="middle" fontSize="10" fill="#10B981" fontWeight="700">Unlimited</text>
    
    {/* Center pivot point */}
    <circle cx="150" cy="120" r="6" fill="#64748b" />
  </svg>
);

export const ReimbursementFlowSVG = () => (
  <svg viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    {/* Flow boxes */}
    <g>
      {/* Provider */}
      <rect x="10" y="40" width="80" height="70" rx="8" fill="#EEF2FF" stroke="#4F7DF3" strokeWidth="2" />
      <text x="50" y="65" textAnchor="middle" fontSize="12" fill="#4F7DF3" fontWeight="700">Provider</text>
      <text x="50" y="85" textAnchor="middle" fontSize="10" fill="#64748b">Service</text>
      
      {/* Claim */}
      <rect x="140" y="40" width="80" height="70" rx="8" fill="#F0FDF4" stroke="#10B981" strokeWidth="2" />
      <text x="180" y="65" textAnchor="middle" fontSize="12" fill="#10B981" fontWeight="700">Claim</text>
      <text x="180" y="85" textAnchor="middle" fontSize="10" fill="#64748b">Submitted</text>
      
      {/* Insurance */}
      <rect x="270" y="40" width="80" height="70" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <text x="310" y="65" textAnchor="middle" fontSize="12" fill="#F59E0B" fontWeight="700">Insurance</text>
      <text x="310" y="85" textAnchor="middle" fontSize="10" fill="#64748b">Processing</text>
      
      {/* Reimbursement */}
      <rect x="400" y="40" width="80" height="70" rx="8" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
      <text x="440" y="65" textAnchor="middle" fontSize="12" fill="#EC4899" fontWeight="700">Payment</text>
      <text x="440" y="85" textAnchor="middle" fontSize="10" fill="#64748b">Issued</text>
      
      {/* Patient */}
      <rect x="530" y="40" width="60" height="70" rx="8" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
      <text x="560" y="70" textAnchor="middle" fontSize="12" fill="#8B5CF6" fontWeight="700">Patient</text>
      <text x="560" y="90" textAnchor="middle" fontSize="10" fill="#64748b">Paid</text>
    </g>
    
    {/* Arrows */}
    <g>
      <line x1="95" y1="75" x2="135" y2="75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowOON)" />
      <line x1="225" y1="75" x2="265" y2="75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowOON)" />
      <line x1="355" y1="75" x2="395" y2="75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowOON)" />
      <line x1="485" y1="75" x2="525" y2="75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowOON)" />
    </g>
    
    {/* Dollar signs */}
    <text x="115" y="60" fontSize="14" fill="#10B981" fontWeight="700">$</text>
    <text x="375" y="60" fontSize="14" fill="#10B981" fontWeight="700">$$</text>
    <text x="505" y="60" fontSize="14" fill="#10B981" fontWeight="700">$$$</text>
    
    <defs>
      <marker id="arrowOON" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <polygon points="0 0, 10 5, 0 10" fill="#64748b" />
      </marker>
    </defs>
  </svg>
);

/**
 * Quality Payment Program SVGs
 */

export const QPPScoreGaugeSVG = () => (
  <svg viewBox="0 0 320 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <linearGradient id="qppRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <filter id="qppGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer glow ring */}
    <circle cx="160" cy="150" r="115" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.15" />

    {/* Background track */}
    <circle cx="160" cy="150" r="100" stroke="#E5E7EB" strokeWidth="14" fill="none" strokeLinecap="round" />

    {/* Score ring — 95% filled (circumference ≈ 628, 95% ≈ 597) */}
    <circle cx="160" cy="150" r="100" stroke="url(#qppRingGrad)" strokeWidth="14" fill="none" strokeLinecap="round"
      strokeDasharray="597 628" strokeDashoffset="157" filter="url(#qppGlow)" />

    {/* Center content */}
    <text x="160" y="140" textAnchor="middle" fontSize="48" fill="#1E293B" fontWeight="800">95</text>
    <text x="160" y="158" textAnchor="middle" fontSize="11" fill="#94A3B8" fontWeight="600" letterSpacing="2">/ 100</text>
    <text x="160" y="180" textAnchor="middle" fontSize="13" fill="#3B82F6" fontWeight="700" letterSpacing="1">MIPS SCORE</text>

    {/* Category colored bars */}
    <g transform="translate(40, 270)">
      <rect x="0" y="0" rx="4" ry="4" width="56" height="8" fill="#3B82F6" opacity="0.8" />
      <text x="28" y="22" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Quality</text>
      <text x="28" y="32" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="500">30%</text>

      <rect x="66" y="0" rx="4" ry="4" width="56" height="8" fill="#10B981" opacity="0.8" />
      <text x="94" y="22" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Cost</text>
      <text x="94" y="32" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="500">30%</text>

      <rect x="132" y="0" rx="4" ry="4" width="56" height="8" fill="#8B5CF6" opacity="0.8" />
      <text x="160" y="22" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">PI</text>
      <text x="160" y="32" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="500">25%</text>

      <rect x="198" y="0" rx="4" ry="4" width="42" height="8" fill="#F59E0B" opacity="0.8" />
      <text x="220" y="22" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">IA</text>
      <text x="220" y="32" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="500">15%</text>
    </g>
  </svg>
);

export const PCMHHubSVG = () => (
  <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <defs>
      <linearGradient id="pcmhGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <linearGradient id="pcmhLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0891B2" stopOpacity="0.25" />
      </linearGradient>
      <filter id="pcmhGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer decorative ring */}
    <circle cx="200" cy="180" r="155" stroke="url(#pcmhGrad)" strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.15" />

    {/* Connecting lines */}
    <line x1="200" y1="180" x2="105" y2="85" stroke="url(#pcmhLine)" strokeWidth="2.5" strokeDasharray="6 4" />
    <line x1="200" y1="180" x2="295" y2="85" stroke="url(#pcmhLine)" strokeWidth="2.5" strokeDasharray="6 4" />
    <line x1="200" y1="180" x2="60" y2="240" stroke="url(#pcmhLine)" strokeWidth="2.5" strokeDasharray="6 4" />
    <line x1="200" y1="180" x2="340" y2="240" stroke="url(#pcmhLine)" strokeWidth="2.5" strokeDasharray="6 4" />
    <line x1="200" y1="180" x2="200" y2="310" stroke="url(#pcmhLine)" strokeWidth="2.5" strokeDasharray="6 4" />

    {/* Center patient circle */}
    <circle cx="200" cy="180" r="55" fill="url(#pcmhGrad)" opacity="0.08" />
    <circle cx="200" cy="180" r="40" fill="url(#pcmhGrad)" opacity="0.15" />
    <circle cx="200" cy="180" r="28" fill="url(#pcmhGrad)" filter="url(#pcmhGlow)" />
    <text x="200" y="186" textAnchor="middle" fontSize="22" fill="white" fontWeight="700">&#9829;</text>

    {/* Pillar nodes — Access */}
    <circle cx="105" cy="85" r="30" fill="#2563EB" opacity="0.1" />
    <circle cx="105" cy="85" r="20" fill="#2563EB" />
    <text x="105" y="90" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">A</text>
    <text x="105" y="125" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Access</text>

    {/* Team */}
    <circle cx="295" cy="85" r="30" fill="#7C3AED" opacity="0.1" />
    <circle cx="295" cy="85" r="20" fill="#7C3AED" />
    <text x="295" y="90" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">T</text>
    <text x="295" y="125" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Team</text>

    {/* Quality */}
    <circle cx="60" cy="240" r="30" fill="#059669" opacity="0.1" />
    <circle cx="60" cy="240" r="20" fill="#059669" />
    <text x="60" y="245" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">Q</text>
    <text x="60" y="280" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Quality</text>

    {/* Data */}
    <circle cx="340" cy="240" r="30" fill="#D97706" opacity="0.1" />
    <circle cx="340" cy="240" r="20" fill="#D97706" />
    <text x="340" y="245" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">D</text>
    <text x="340" y="280" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Data</text>

    {/* Coordination */}
    <circle cx="200" cy="310" r="30" fill="#DC2626" opacity="0.1" />
    <circle cx="200" cy="310" r="20" fill="#DC2626" />
    <text x="200" y="315" textAnchor="middle" fontSize="14" fill="white" fontWeight="700">C</text>
    <text x="200" y="350" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">Coordination</text>
  </svg>
);
