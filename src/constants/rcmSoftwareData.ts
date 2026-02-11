import {
  Cpu,
  BarChart3,
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  Users,
  FileText,
  Database,
  RefreshCw,
  Lock,
  Layers,
  GitBranch,
  Activity,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface RCMStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface RCMModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export interface RCMCapability {
  label: string;
  traditional: string;
  ourSoftware: string;
  improvement: string;
}

export interface RCMIntegration {
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface RCMWorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  automation: string;
  color: string;
}

export interface RCMROIMetric {
  value: string;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

export interface RCMTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface RCMFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const rcmHero = {
  badge: "Smart RCM Technology",
  titleLine1: "Revenue Cycle Management",
  titleHighlight: "Powered by Intelligence",
  titleLine2: "",
  description:
    "Our proprietary RCM software automates the entire revenue cycle — from patient registration to final payment. Real-time analytics, intelligent claim scrubbing, and seamless EHR integration deliver measurable results from day one.",
  heroPoints: [
    "AI-powered claim scrubbing & validation",
    "Real-time revenue analytics dashboard",
    "Seamless EHR & PM integration",
    "HIPAA-compliant cloud platform",
  ],
  ctaPrimary: "Request a Live Demo",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/rcm-software-1.jpg",
    platform: "/services/images/rcm-software-2.jpg",
    results: "/services/images/rcm-software-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const rcmStats: RCMStat[] = [
  { value: "99.5", suffix: "%", label: "Platform Uptime", icon: Shield },
  { value: "40", suffix: "%", label: "Faster Claims Processing", icon: Zap },
  { value: "98", suffix: "%", label: "First-Pass Acceptance", icon: CheckCircle },
  { value: "$4.2", suffix: "M+", label: "Revenue Recovered Annually", icon: DollarSign },
];

// ============================================================
// SOFTWARE MODULES
// ============================================================

export const rcmModules: RCMModule[] = [
  {
    id: "registration",
    title: "Patient Registration",
    description:
      "Streamlined patient intake with automated eligibility verification, real-time insurance validation, and demographic data management — all within a single intuitive interface.",
    icon: Users,
    color: "bg-blue-500",
    features: [
      "Real-time eligibility verification",
      "Auto-populated demographics",
      "Insurance card scanning & OCR",
      "Copay estimation at check-in",
    ],
  },
  {
    id: "claims",
    title: "Claims Management",
    description:
      "Intelligent claim creation, scrubbing, and submission engine that catches errors before they cause denials. Automated tracking follow-up ensures nothing falls through the cracks.",
    icon: FileText,
    color: "bg-purple-500",
    features: [
      "AI-powered claim scrubbing",
      "Batch & single claim submission",
      "Automated ERA posting",
      "Denial pattern detection",
    ],
  },
  {
    id: "payments",
    title: "Payment Processing",
    description:
      "End-to-end payment management with auto-posting, patient payment portals, and intelligent allocation. Supports all major payment methods and plans.",
    icon: DollarSign,
    color: "bg-emerald-500",
    features: [
      "Automated payment posting",
      "Patient payment portal",
      "Payment plan management",
      "Credit card processing",
    ],
  },
  {
    id: "analytics",
    title: "Revenue Analytics",
    description:
      "Real-time dashboards and predictive analytics that give you complete visibility into your revenue cycle performance, identifying bottlenecks before they impact cash flow.",
    icon: BarChart3,
    color: "bg-orange-500",
    features: [
      "Real-time KPI dashboards",
      "Predictive revenue modeling",
      "Payer performance tracking",
      "Custom report builder",
    ],
  },
  {
    id: "denials",
    title: "Denial Tracking",
    description:
      "Proactive denial management with root cause analysis, automated appeal workflows, and pattern recognition to prevent future denials before they happen.",
    icon: AlertCircle,
    color: "bg-red-500",
    features: [
      "Root cause analysis engine",
      "Automated appeal generation",
      "Denial trend reporting",
      "Prevention rule configuration",
    ],
  },
  {
    id: "compliance",
    title: "Compliance Engine",
    description:
      "Built-in compliance monitoring ensures every claim meets payer-specific guidelines, CMS regulations, and HIPAA standards — automatically updated with rule changes.",
    icon: Lock,
    color: "bg-indigo-500",
    features: [
      "Auto-updated coding rules",
      "HIPAA compliance monitoring",
      "Audit trail & logging",
      "Payer-specific rule sets",
    ],
  },
];

// ============================================================
// PLATFORM CAPABILITIES COMPARISON
// ============================================================

export const rcmCapabilities: RCMCapability[] = [
  {
    label: "Claim Submission",
    traditional: "Manual entry, 48-72hr processing",
    ourSoftware: "One-click auto-submission, real-time",
    improvement: "95% faster",
  },
  {
    label: "Denial Management",
    traditional: "Reactive, manual tracking in spreadsheets",
    ourSoftware: "AI predicts & prevents denials proactively",
    improvement: "60% fewer denials",
  },
  {
    label: "Payment Posting",
    traditional: "Manual reconciliation, days behind",
    ourSoftware: "Automated ERA/EFT posting, same day",
    improvement: "98% auto-posted",
  },
  {
    label: "Analytics & Reporting",
    traditional: "Monthly reports, outdated by delivery",
    ourSoftware: "Real-time dashboards, predictive insights",
    improvement: "Instant visibility",
  },
  {
    label: "Compliance Updates",
    traditional: "Manual tracking of rule changes",
    ourSoftware: "Auto-updated rules, zero manual effort",
    improvement: "Always current",
  },
];

// ============================================================
// INTEGRATION ECOSYSTEM
// ============================================================

export const rcmIntegrations: RCMIntegration[] = [
  {
    name: "Epic Systems",
    category: "EHR",
    description: "Full bi-directional integration",
    icon: Database,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Cerner",
    category: "EHR",
    description: "Real-time data synchronization",
    icon: Database,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "athenahealth",
    category: "PM/EHR",
    description: "Native API integration",
    icon: Layers,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    name: "eClinicalWorks",
    category: "EHR",
    description: "Seamless claim flow integration",
    icon: Database,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Allscripts",
    category: "EHR",
    description: "Deep clinical integration",
    icon: Database,
    color: "from-teal-500 to-teal-600",
  },
  {
    name: "Availity",
    category: "Clearinghouse",
    description: "Direct payer connectivity",
    icon: GitBranch,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Change Healthcare",
    category: "Clearinghouse",
    description: "Multi-payer claim routing",
    icon: RefreshCw,
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Waystar",
    category: "Clearinghouse",
    description: "Automated eligibility & claims",
    icon: Activity,
    color: "from-cyan-500 to-cyan-600",
  },
];

// ============================================================
// AUTOMATED WORKFLOW PIPELINE
// ============================================================

export const rcmWorkflow: RCMWorkflowStep[] = [
  {
    step: 1,
    title: "Patient Intake",
    description:
      "Automated eligibility check, benefits verification, and demographic capture at registration.",
    icon: Users,
    automation: "100% Automated",
    color: "from-blue-500 to-blue-600",
  },
  {
    step: 2,
    title: "Charge Capture",
    description:
      "AI-assisted coding suggestions, charge validation, and bundling logic applied in real-time.",
    icon: Cpu,
    automation: "AI-Assisted",
    color: "from-purple-500 to-purple-600",
  },
  {
    step: 3,
    title: "Claim Scrubbing",
    description:
      "270+ rule engine validates every claim against payer-specific requirements before submission.",
    icon: Shield,
    automation: "270+ Rules",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    step: 4,
    title: "Submission & Tracking",
    description:
      "Electronic submission with real-time status tracking, auto-follow-up on pending claims.",
    icon: RefreshCw,
    automation: "Real-Time",
    color: "from-orange-500 to-orange-600",
  },
  {
    step: 5,
    title: "Post & Reconcile",
    description:
      "Automated payment posting, patient billing, denial routing, and financial reconciliation.",
    icon: CheckCircle,
    automation: "98% Auto-Posted",
    color: "from-rose-500 to-rose-600",
  },
];

// ============================================================
// ROI IMPACT METRICS
// ============================================================

export const rcmROIMetrics: RCMROIMetric[] = [
  {
    value: "35",
    suffix: "%",
    label: "Revenue Increase",
    description: "Average revenue lift within 6 months of implementation",
    color: "from-emerald-500 to-green-600",
  },
  {
    value: "72",
    suffix: "%",
    label: "Faster Collections",
    description: "Reduction in average days in accounts receivable",
    color: "from-blue-500 to-indigo-600",
  },
  {
    value: "60",
    suffix: "%",
    label: "Fewer Denials",
    description: "Decrease in claim denials through AI prevention",
    color: "from-purple-500 to-violet-600",
  },
  {
    value: "4.2",
    suffix: "x",
    label: "ROI in Year One",
    description: "Average return on investment within the first 12 months",
    color: "from-orange-500 to-red-500",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const rcmTestimonials: RCMTestimonial[] = [
  {
    quote:
      "Switching to PhysicianMeds' RCM software was a game-changer. Our claim rejection rate dropped from 18% to under 3%, and we see revenue data in real-time instead of waiting for month-end reports.",
    name: "Dr. Michael Roberts",
    role: "Practice Owner",
    specialty: "Internal Medicine",
    metric: "85%",
    metricLabel: "Fewer Rejections",
    rating: 5,
  },
  {
    quote:
      "The automation is incredible. Payment posting that used to take our team 4 hours daily now happens automatically. We redirected that time entirely to patient-facing activities.",
    name: "Lisa Chang",
    role: "Revenue Cycle Director",
    specialty: "Multi-Specialty Group",
    metric: "4hrs",
    metricLabel: "Saved Daily",
    rating: 5,
  },
  {
    quote:
      "Integration with our Epic EHR was seamless — we were live in under 2 weeks. The predictive analytics have transformed how we manage our revenue cycle. We catch issues before they become problems.",
    name: "David Martinez",
    role: "CFO",
    specialty: "Orthopedic Surgery",
    metric: "35%",
    metricLabel: "Revenue Increase",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const rcmFAQs: RCMFAQ[] = [
  {
    question: "How long does implementation take?",
    answer:
      "Most practices are live within 2-4 weeks depending on the complexity of your existing systems. Our dedicated implementation team handles data migration, EHR integration configuration, staff training, and go-live support — with zero disruption to your daily operations.",
  },
  {
    question: "Does your software integrate with our EHR?",
    answer:
      "Yes — we offer native, bi-directional integrations with all major EHR systems including Epic, Cerner, athenahealth, eClinicalWorks, Allscripts, and many more. Our API-first architecture also supports custom integrations for proprietary systems.",
  },
  {
    question: "Is the platform HIPAA-compliant?",
    answer:
      "Absolutely. Our platform is SOC 2 Type II certified, HIPAA-compliant, and hosted on encrypted, HITRUST-certified infrastructure. We undergo annual third-party security audits and maintain a 99.5% uptime SLA.",
  },
  {
    question: "What kind of ROI can we expect?",
    answer:
      "Our clients see an average 35% increase in net revenue within the first 6 months. This comes from higher first-pass acceptance rates, faster claims processing, reduced denials, and automated workflows that eliminate manual bottlenecks.",
  },
  {
    question: "Can we run reports and track KPIs in real-time?",
    answer:
      "Yes — our analytics dashboard provides real-time visibility into every aspect of your revenue cycle. Track over 50+ KPIs including collection rates, denial trends, days in AR, payer performance, and more. You can also build custom reports and schedule automated delivery.",
  },
  {
    question: "Do you provide ongoing support and training?",
    answer:
      "Every client gets a dedicated account manager, 24/7 technical support, and access to our online learning center. We also provide quarterly business reviews and proactive optimization recommendations based on your performance data.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const rcmPageMeta = {
  title: "RCM Software | PhysicianMeds",
  description:
    "Advanced revenue cycle management software with AI-powered claim scrubbing, real-time analytics, and seamless EHR integration. Boost revenue by 35% with our platform.",

  modulesTitle: "One Platform, Complete RCM",
  modulesDescription:
    "Six powerful modules working together to automate every step of your revenue cycle — from patient intake to final payment.",

  capabilitiesTitle: "Traditional RCM vs. Our Platform",
  capabilitiesDescription:
    "See how our intelligent software outperforms manual and legacy RCM processes at every stage.",

  integrationsTitle: "Seamless Integration Ecosystem",
  integrationsDescription:
    "Connect with the systems you already use. Our platform integrates with leading EHRs, clearinghouses, and healthcare IT solutions.",

  workflowTitle: "Automated Claim Pipeline",
  workflowDescription:
    "From patient intake to payment reconciliation — our 5-stage automated pipeline eliminates manual touchpoints and accelerates cash flow.",

  roiTitle: "Measurable Impact, Real Results",
  roiDescription:
    "Our clients don't just see improvements — they see transformative results backed by data.",

  testimonialsTitle: "Trusted by Healthcare Leaders",
  testimonialsSubtitle:
    "See how our RCM software is transforming revenue cycles for practices nationwide.",

  faqDescription:
    "Common questions about our RCM software platform, implementation, integrations, and the results you can expect.",

  bottomCTA: {
    title: "Ready to Modernize Your Revenue Cycle?",
    description:
      "Join hundreds of practices that have transformed their revenue cycle with our intelligent RCM platform. Start seeing results in weeks, not months.",
    primaryButton: "Request a Live Demo",
  },
};
