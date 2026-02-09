import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileText,
  Target,
  RefreshCw,
  BarChart3,
  Shield,
  CheckCircle,
  Users,
  Zap,
  Calendar,
  Phone,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

// --- Types ---

export interface ARFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface ARWorkflowStep {
  phase: string;
  title: string;
  description: string;
  items: string[];
}

export interface ARStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface ARChallenge {
  title: string;
  description: string;
  icon: LucideIcon;
  severity: string;
}

export interface ARFAQ {
  question: string;
  answer: string;
}

export interface ARTestimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
  metric: string;
  metricLabel: string;
}

export interface ARBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ARMetric {
  icon: LucideIcon;
  label: string;
  detail: string;
}

// --- Hero ---

export const arHero = {
  badge: "Accounts Receivable Management",
  titleLine1: "Maximize Revenue with",
  titleHighlight: "Expert A/R Management",
  titleLine2: "& Faster Collections",
  description:
    "PhysicianMeds delivers comprehensive accounts receivable solutions that reduce A/R days, recover outstanding claims, and optimize your cash flow. Our data-driven approach ensures you capture every dollar you've earned while maintaining patient relationships.",
  ctaPrimary: "Get Free A/R Audit",
  ctaSecondary: "Talk to an Expert",
  heroPoints: [
    "Reduce A/R days below 40 consistently",
    "Recover 25-35% more from aged claims",
    "99% clean claim submission rate",
  ],
  images: {
    hero: "/services/images/accounts-receivable-1.jpg",
    workflow: "/services/images/accounts-receivable-2.jpg",
    dashboard: "/services/images/accounts-receivable-3.jpg",
  },
};

// --- Stats ---

export const arStats: ARStat[] = [
  { value: "35", suffix: "%", label: "Increase in Collections" },
  { value: "40", suffix: "", label: "Average A/R Days" },
  { value: "99", suffix: "%", label: "Clean Claim Rate" },
  { value: "10", suffix: "M+", label: "Revenue Recovered" },
];

// --- Core Features ---

export const arFeatures: ARFeature[] = [
  {
    title: "Proactive Claims Follow-Up",
    description:
      "Systematic tracking and follow-up on every submitted claim. We monitor claim status daily, identify bottlenecks, and take immediate action to accelerate payment processing.",
    icon: RefreshCw,
    color: "bg-blue-500",
  },
  {
    title: "Aging A/R Analysis & Recovery",
    description:
      "Deep-dive analysis of aged accounts by payer, service type, and time period. We prioritize high-value claims and deploy targeted strategies to recover revenue you thought was lost.",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
  {
    title: "Denial Management & Appeals",
    description:
      "Expert denial resolution with root cause analysis. We identify patterns, fix systemic issues, prepare compelling appeals, and track success rates to prevent future denials.",
    icon: AlertTriangle,
    color: "bg-red-500",
  },
  {
    title: "Patient Responsibility Collection",
    description:
      "Professional, compassionate patient collections that protect relationships. Automated reminders, flexible payment plans, and clear communication that improves collection rates.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "A/R Cleanup & Write-Off Recovery",
    description:
      "Comprehensive audit of legacy A/R to identify recoverable revenue. We challenge inappropriate write-offs, reopen eligible claims, and systematically clear your backlog.",
    icon: ClipboardList,
    color: "bg-orange-500",
  },
  {
    title: "Real-Time Reporting & KPIs",
    description:
      "Custom dashboards tracking collection rates, A/R aging, denial trends, and payer performance. Transparent reporting with actionable insights delivered weekly or on-demand.",
    icon: BarChart3,
    color: "bg-cyan-500",
  },
  {
    title: "Multi-Payer Follow-Up Strategies",
    description:
      "Payer-specific follow-up protocols optimized for each insurance company's processes. We know the shortcuts, the contacts, and the best times to call for fastest resolution.",
    icon: Phone,
    color: "bg-pink-500",
  },
  {
    title: "Payment Posting & Reconciliation",
    description:
      "Accurate, same-day payment posting with detailed reconciliation. We identify underpayments, bundle errors, and contractual discrepancies — ensuring you receive every dollar owed.",
    icon: DollarSign,
    color: "bg-indigo-500",
  },
];

// --- Workflow Phases ---

export const arWorkflow: ARWorkflowStep[] = [
  {
    phase: "01",
    title: "A/R Assessment & Baseline",
    description: "Comprehensive audit of your current A/R status, identifying aging trends, denial patterns, and recovery opportunities.",
    items: [
      "Complete A/R aging analysis",
      "Denial rate & root cause review",
      "Payer performance benchmarking",
      "Recovery opportunity identification",
    ],
  },
  {
    phase: "02",
    title: "Strategic Action Plan",
    description: "Develop targeted strategies for each account category — prioritizing high-value claims and systematic issue resolution.",
    items: [
      "Prioritized claim follow-up schedule",
      "Denial prevention protocols",
      "Patient collection workflows",
      "Custom KPI targets & tracking",
    ],
  },
  {
    phase: "03",
    title: "Active Management & Recovery",
    description: "Daily claim monitoring, proactive follow-up, denial appeals, and patient outreach — driving continuous revenue recovery.",
    items: [
      "Daily claim status monitoring",
      "Multi-channel payer follow-up",
      "Appeal preparation & submission",
      "Patient payment plan setup",
    ],
  },
  {
    phase: "04",
    title: "Optimization & Reporting",
    description: "Continuous process improvement with transparent reporting, trend analysis, and proactive recommendations.",
    items: [
      "Weekly performance dashboards",
      "Monthly trend analysis",
      "Process optimization reviews",
      "Strategic growth recommendations",
    ],
  },
];

// --- Challenges Practices Face ---

export const arChallenges: ARChallenge[] = [
  {
    title: "High A/R Days",
    description: "A/R days over 60 indicate serious cash flow problems. Delayed collections strain operations and limit growth potential.",
    icon: Clock,
    severity: "Critical",
  },
  {
    title: "Aging Accounts Backlog",
    description: "Claims over 90 days become increasingly difficult to collect. Most practices write off 15-25% of aged receivables unnecessarily.",
    icon: FileText,
    severity: "High",
  },
  {
    title: "Claim Denials & Rejections",
    description: "Denial rates over 10% signal systemic problems. Each denial requires 3-5x more work to resolve than a clean claim.",
    icon: AlertTriangle,
    severity: "Critical",
  },
  {
    title: "Inconsistent Follow-Up",
    description: "Without dedicated A/R staff, claims fall through the cracks. Lack of systematic follow-up leaves money on the table.",
    icon: Target,
    severity: "High",
  },
  {
    title: "Patient Collection Challenges",
    description: "Rising patient responsibility makes collection harder. Many practices lack tools and processes to collect patient balances effectively.",
    icon: Users,
    severity: "Medium",
  },
  {
    title: "Limited A/R Visibility",
    description: "Without real-time reporting, practices can't identify problems until it's too late. Poor visibility prevents proactive management.",
    icon: BarChart3,
    severity: "Medium",
  },
];

// --- Benefits of Outsourcing A/R ---

export const arBenefits: ARBenefit[] = [
  {
    title: "Improved Cash Flow",
    description: "Faster collections and reduced A/R days mean consistent, predictable revenue — giving you the financial stability to invest in growth.",
    icon: TrendingUp,
  },
  {
    title: "Lower Operational Costs",
    description: "Eliminate the cost of hiring, training, and managing in-house A/R staff. Our performance-based model aligns our success with yours.",
    icon: DollarSign,
  },
  {
    title: "Expert Denial Resolution",
    description: "Certified billing specialists with deep payer knowledge resolve denials faster and with higher success rates than in-house teams.",
    icon: Shield,
  },
  {
    title: "Comprehensive Reporting",
    description: "Real-time dashboards and detailed analytics give you complete visibility into your revenue cycle performance.",
    icon: BarChart3,
  },
  {
    title: "Scalable Support",
    description: "Whether you add providers, locations, or specialties — our A/R support scales seamlessly without hiring or training delays.",
    icon: Zap,
  },
  {
    title: "Focus on Patient Care",
    description: "Free your staff from tedious A/R follow-up so they can focus on what matters most — delivering exceptional patient care.",
    icon: Users,
  },
];

// --- Testimonials ---

export const arTestimonials: ARTestimonial[] = [
  {
    name: "Dr. Amanda Foster",
    role: "Practice Owner",
    specialty: "Internal Medicine",
    quote:
      "Our A/R was a disaster — over 75 days and growing. PhysicianMeds took over and within 90 days had us below 40. They recovered over $180K in aged claims we thought were lost. Game changer.",
    rating: 5,
    metric: "$180K",
    metricLabel: "Recovered Revenue",
  },
  {
    name: "James Peterson, CPA",
    role: "Practice Administrator",
    specialty: "Orthopedic Surgery",
    quote:
      "The weekly reporting alone is worth it — we finally have visibility into our A/R performance. Denial rates dropped from 14% to under 5%, and our collection rate is the highest it's ever been.",
    rating: 5,
    metric: "5%",
    metricLabel: "Denial Rate",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Medical Director",
    specialty: "Multi-Specialty Group",
    quote:
      "Managing A/R across 8 providers was overwhelming. PhysicianMeds handles everything — follow-up, appeals, patient collections. Our cash flow is consistent and our team can focus on patient care.",
    rating: 5,
    metric: "38 Days",
    metricLabel: "Average A/R",
  },
];

// --- FAQ ---

export const arFAQs: ARFAQ[] = [
  {
    question: "What is accounts receivable management?",
    answer:
      "Accounts receivable (A/R) management is the process of tracking, following up on, and collecting payments owed to your practice — both from insurance payers and patients. It includes claim follow-up, denial management, payment posting, patient collections, and A/R reporting.",
  },
  {
    question: "What are 'A/R days' and why do they matter?",
    answer:
      "A/R days measure the average time it takes to collect payment after services are rendered. Industry best practice is under 40 days. High A/R days (60+) indicate cash flow problems, inefficient processes, or systemic billing issues that need immediate attention.",
  },
  {
    question: "How do you reduce denial rates?",
    answer:
      "We reduce denials through proactive claim scrubbing before submission, root cause analysis of existing denials, staff training on common errors, and payer-specific coding guidelines. Most practices see denial rates drop 50-70% within 90 days.",
  },
  {
    question: "Can you recover aged accounts receivable?",
    answer:
      "Yes. Our A/R cleanup service audits claims over 90 days, identifies recoverable revenue, prepares appeals with supporting documentation, and systematically works through backlog. We typically recover 25-35% of aged A/R that practices assumed was uncollectible.",
  },
  {
    question: "How do you handle patient collections?",
    answer:
      "We use a multi-channel approach: automated payment reminders via text/email, flexible payment plans, online payment portals, and professional phone follow-up. Our patient-friendly approach improves collection rates while protecting patient relationships.",
  },
  {
    question: "What kind of reporting do you provide?",
    answer:
      "We provide weekly dashboards showing A/R aging, collection rates, denial trends, payer performance, and patient balance aging. Custom reports are available for specific metrics you want to track. All reports are accessible via secure portal 24/7.",
  },
  {
    question: "Do you work with our existing billing software?",
    answer:
      "Yes. We integrate with all major EHR and practice management systems including Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, Kareo, AdvancedMD, and many others. Integration is part of our onboarding process.",
  },
  {
    question: "How quickly will we see results?",
    answer:
      "Most practices see measurable improvement within 30 days — reduced A/R days, higher collection rates, and lower denial rates. Full optimization typically takes 60-90 days as we work through aged backlog and implement process improvements.",
  },
];

// --- Key Metrics We Track ---

export const arKeyMetrics: ARMetric[] = [
  { icon: Calendar, label: "Days in A/R", detail: "Average collection timeline" },
  { icon: DollarSign, label: "Net Collection Rate", detail: "% of expected revenue collected" },
  { icon: AlertTriangle, label: "Denial Rate", detail: "Claims denied on first submission" },
  { icon: Clock, label: "Aging Buckets", detail: "0-30, 31-60, 61-90, 90+ day breakdown" },
  { icon: TrendingUp, label: "Recovery Rate", detail: "Aged A/R successfully collected" },
  { icon: BarChart3, label: "Payer Performance", detail: "Individual payer collection metrics" },
  { icon: Users, label: "Patient Balance", detail: "Outstanding patient responsibility" },
  { icon: CheckCircle, label: "Clean Claim Rate", detail: "First-pass acceptance percentage" },
];

// --- Page Meta ---

export const arPageMeta = {
  challengesTitle: "A/R Challenges Costing You Money Every Day",
  challengesDescription:
    "Unmanaged accounts receivable silently drains revenue from your practice. Here are the most common — and most costly — A/R problems we solve.",
  featuresTitle: "Comprehensive A/R Management Services",
  featuresDescription:
    "From proactive follow-up and denial appeals to patient collections and real-time reporting — we manage every aspect of your accounts receivable.",
  workflowTitle: "Our Strategic A/R Management Process",
  workflowDescription:
    "A proven, data-driven methodology that identifies opportunities, prioritizes high-value claims, and delivers consistent revenue recovery.",
  benefitsTitle: "Why Practices Choose Our A/R Services",
  benefitsDescription:
    "Outsourcing A/R management isn't just about collections — it's about improving cash flow, reducing costs, and giving your team back valuable time.",
  metricsTitle: "A/R Performance Metrics We Monitor",
  metricsDescription:
    "We track the KPIs that matter most to your practice's financial health — providing transparency and actionable insights in real time.",
  ctaTitle: "Get Your Free A/R Performance Audit",
  ctaDescription:
    "Discover exactly how much revenue is sitting in your A/R and get a customized recovery plan. Our experts will analyze your current A/R status and show you the path to faster collections and improved cash flow.",
};
