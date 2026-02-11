import {
  Search,
  FileCheck,
  Shield,
  ClipboardCheck,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Award,
  Clock,
  Zap,
  FileText,
  CheckCircle,
  Eye,
  Layers,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface AuditStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface AuditService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
}

export interface WhyAuditItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AuditProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
}

export interface AuditFinding {
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  icon: LucideIcon;
  severity: "high" | "medium" | "low";
  color: string;
}

export interface AuditBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  span: "normal" | "wide" | "tall";
}

export interface AuditTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface AuditFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const auditHero = {
  badge: "Medical Audit Specialists",
  titleLine1: "Protect Your Practice With",
  titleHighlight: "Expert Medical Audits",
  description:
    "Proactively identify compliance gaps, coding inaccuracies, and revenue leaks before they become costly problems. Our certified auditors deliver comprehensive reviews that safeguard your practice and maximize legitimate reimbursement.",
  heroPoints: [
    "AAPC & AHIMA certified auditors",
    "Comprehensive coding & billing reviews",
    "OIG & CMS compliance assurance",
    "Actionable findings with ROI tracking",
  ],
  ctaPrimary: "Schedule Your Audit",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/medical-audit-1.jpg",
    whyAudit: "/services/images/medical-audit-2.jpg",
    results: "/services/images/medical-audit-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const auditStats: AuditStat[] = [
  { value: "99.2", suffix: "%", label: "Accuracy Rate", icon: Target },
  { value: "5,000", suffix: "+", label: "Audits Completed", icon: FileCheck },
  { value: "40", suffix: "%", label: "Avg. Error Reduction", icon: TrendingUp },
  { value: "100", suffix: "%", label: "Compliance Achieved", icon: Shield },
];

// ============================================================
// AUDIT SERVICES
// ============================================================

export const auditServices: AuditService[] = [
  {
    id: "coding-audit",
    title: "Coding Accuracy Audit",
    description:
      "In-depth review of ICD-10, CPT, and HCPCS code assignments to ensure accuracy, specificity, and compliance with official coding guidelines and payer requirements.",
    icon: FileCheck,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    features: [
      "ICD-10 specificity validation",
      "CPT/HCPCS code verification",
      "Modifier usage review",
      "Unbundling detection",
    ],
  },
  {
    id: "billing-audit",
    title: "Billing Compliance Audit",
    description:
      "Thorough examination of billing workflows, charge capture, and claim submission processes to eliminate revenue leakage, duplicate billing, and compliance violations.",
    icon: DollarSign,
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-600",
    features: [
      "Charge capture analysis",
      "Duplicate billing detection",
      "Fee schedule optimization",
      "Claim accuracy verification",
    ],
  },
  {
    id: "compliance-audit",
    title: "Regulatory Compliance Audit",
    description:
      "Comprehensive assessment aligned with OIG Work Plan, CMS guidelines, and HIPAA requirements to identify risks and ensure your practice meets all federal and state regulatory standards.",
    icon: Shield,
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    features: [
      "OIG Work Plan alignment",
      "HIPAA compliance check",
      "Anti-Kickback review",
      "Stark Law assessment",
    ],
  },
  {
    id: "chart-audit",
    title: "Medical Chart Audit",
    description:
      "Detailed review of clinical documentation to verify that records support the codes billed, meet medical necessity requirements, and contain all required elements for compliant reporting.",
    icon: ClipboardCheck,
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-600",
    features: [
      "Documentation completeness review",
      "Medical necessity validation",
      "Provider credential verification",
      "Clinical note consistency",
    ],
  },
  {
    id: "em-audit",
    title: "E/M Level Audit",
    description:
      "Specialized Evaluation & Management coding audit using 2021 AMA guidelines. We analyze code level selection, documentation support, and identify up-coding or down-coding patterns.",
    icon: BarChart3,
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    features: [
      "MDM complexity analysis",
      "Time-based coding review",
      "Level distribution benchmarking",
      "Up-coding/down-coding detection",
    ],
  },
  {
    id: "hcc-audit",
    title: "HCC & Risk Adjustment Audit",
    description:
      "Validate Hierarchical Condition Category coding for accurate risk adjustment factor (RAF) scores. Ensure proper diagnosis capture to reflect true patient acuity and optimize reimbursement.",
    icon: Layers,
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-600",
    features: [
      "RAF score accuracy review",
      "Diagnosis capture optimization",
      "Condition specificity validation",
      "Year-over-year trending",
    ],
  },
];

// ============================================================
// WHY MEDICAL AUDITS
// ============================================================

export const whyAuditItems: WhyAuditItem[] = [
  {
    title: "Prevent Costly Penalties",
    description:
      "OIG audits and payer recovery programs can result in massive fines and payback demands. Proactive auditing identifies risks before they trigger external scrutiny.",
    icon: AlertTriangle,
  },
  {
    title: "Maximize Legitimate Revenue",
    description:
      "Studies show 30-40% of claims contain coding errors, often resulting in under-coding. Our audits recover revenue you're already earning but not capturing.",
    icon: DollarSign,
  },
  {
    title: "Improve Documentation Quality",
    description:
      "Targeted feedback to providers improves clinical documentation, supporting higher code specificity and reducing denial rates by up to 45%.",
    icon: FileText,
  },
  {
    title: "Ensure Payer Compliance",
    description:
      "Each payer has unique guidelines. Our audits verify compliance with Medicare, Medicaid, and commercial payer-specific rules to prevent claim rejections.",
    icon: CheckCircle,
  },
  {
    title: "Benchmark Performance",
    description:
      "Compare your coding patterns against national and specialty-specific benchmarks to identify outliers that could trigger audits or investigations.",
    icon: BarChart3,
  },
  {
    title: "Protect Provider Credentials",
    description:
      "Consistent compliance through regular audits protects providers from exclusion, revocation, and reputational harm tied to billing irregularities.",
    icon: Award,
  },
];

// ============================================================
// AUDIT PROCESS STEPS
// ============================================================

export const auditProcessSteps: AuditProcessStep[] = [
  {
    step: 1,
    title: "Scope & Planning",
    description:
      "We define the audit scope, select the record sample using statistical methodology, and establish benchmarks based on your specialty, volume, and risk profile.",
    icon: Target,
    color: "from-blue-500 to-blue-600",
    duration: "Week 1",
  },
  {
    step: 2,
    title: "Data Collection",
    description:
      "Our team securely accesses your claims data, medical records, and billing systems. We extract the sample set and organize it for systematic review.",
    icon: Search,
    color: "from-purple-500 to-purple-600",
    duration: "Week 1-2",
  },
  {
    step: 3,
    title: "Expert Review",
    description:
      "Certified auditors meticulously review each record, comparing documentation to codes billed, verifying medical necessity, and checking compliance with all applicable guidelines.",
    icon: Eye,
    color: "from-emerald-500 to-emerald-600",
    duration: "Week 2-3",
  },
  {
    step: 4,
    title: "Findings Analysis",
    description:
      "We compile all findings, calculate error rates by category, quantify financial impact, and identify root causes of systemic coding and billing issues.",
    icon: BarChart3,
    color: "from-orange-500 to-orange-600",
    duration: "Week 3-4",
  },
  {
    step: 5,
    title: "Report & Education",
    description:
      "A comprehensive audit report is delivered with actionable recommendations, followed by targeted provider education sessions to address identified gaps and prevent recurrence.",
    icon: FileText,
    color: "from-rose-500 to-rose-600",
    duration: "Week 4",
  },
];

// ============================================================
// AUDIT FINDINGS DASHBOARD
// ============================================================

export const auditFindings: AuditFinding[] = [
  {
    title: "Under-Coded E/M Visits",
    metric: "32%",
    metricLabel: "of practices affected",
    description: "Providers frequently down-code E/M visits, leaving significant revenue uncaptured. Our audits typically recover $50K-$200K annually.",
    icon: TrendingUp,
    severity: "high",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Missing Modifier Usage",
    metric: "28%",
    metricLabel: "error rate average",
    description: "Incorrect or missing modifiers lead to claim denials and payment reductions. Proper modifier application can boost collections by 15-20%.",
    icon: AlertTriangle,
    severity: "high",
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Documentation Gaps",
    metric: "45%",
    metricLabel: "of charts reviewed",
    description: "Incomplete clinical documentation fails to support the level of service billed, exposing practices to audit risk and refund demands.",
    icon: FileText,
    severity: "medium",
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Unbundling Issues",
    metric: "18%",
    metricLabel: "of claims flagged",
    description: "Separate billing for services that should be bundled triggers payer red flags and can lead to fraud investigations if not corrected.",
    icon: Layers,
    severity: "medium",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Diagnosis Specificity",
    metric: "35%",
    metricLabel: "lacking specificity",
    description: "Non-specific ICD-10 codes reduce RAF scores and trigger additional documentation requests, slowing revenue and increasing admin burden.",
    icon: Target,
    severity: "medium",
    color: "from-teal-500 to-cyan-600",
  },
  {
    title: "Compliance Violations",
    metric: "12%",
    metricLabel: "of practices at risk",
    description: "Undiscovered compliance violations can result in False Claims Act penalties of $11K-$23K per claim. Proactive audits eliminate this exposure.",
    icon: Shield,
    severity: "high",
    color: "from-emerald-500 to-green-600",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const auditBenefits: AuditBenefit[] = [
  {
    title: "Reduce Audit Exposure",
    description:
      "Proactive internal auditing reduces the likelihood of external audits and positions your practice to respond confidently if one occurs.",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    span: "wide",
  },
  {
    title: "Recover Lost Revenue",
    description:
      "Our audits consistently identify $80K-$300K+ in recoverable revenue from under-coding, missed charges, and documentation improvements.",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    span: "normal",
  },
  {
    title: "Reduce Denial Rates",
    description:
      "Targeted coding education from audit findings reduces claim denial rates by an average of 40%, improving cash flow and reducing rework.",
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    span: "normal",
  },
  {
    title: "Provider Education",
    description:
      "Audit-driven education programs give providers specific, actionable feedback that improves documentation quality and coding accuracy across the board.",
    icon: Users,
    color: "from-purple-500 to-violet-600",
    span: "normal",
  },
  {
    title: "Compliance Confidence",
    description:
      "A documented audit program demonstrates good faith compliance efforts, providing legal protection and peace of mind for practice leadership.",
    icon: Award,
    color: "from-orange-500 to-amber-600",
    span: "normal",
  },
  {
    title: "Operational Efficiency",
    description:
      "Audit insights streamline billing workflows, reduce claim rejections, and accelerate reimbursement cycles — improving your entire revenue cycle.",
    icon: Clock,
    color: "from-teal-500 to-cyan-600",
    span: "wide",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const auditTestimonials: AuditTestimonial[] = [
  {
    quote:
      "PhysicianMeds' audit uncovered that we were consistently under-coding our E/M visits. After implementing their recommendations, we recovered over $180,000 in previously lost revenue within the first year. The ROI on this audit was incredible.",
    name: "Dr. Rachel Kim",
    role: "Practice Owner",
    specialty: "Internal Medicine",
    metric: "$180K+",
    metricLabel: "Revenue Recovered",
    rating: 5,
  },
  {
    quote:
      "We had no idea our modifier usage was causing so many denials. The audit team identified the patterns, trained our coders, and our denial rate dropped from 18% to just 4% in three months. This was a game-changer for our practice.",
    name: "Mark Sullivan",
    role: "Practice Administrator",
    specialty: "Orthopedic Surgery",
    metric: "-78%",
    metricLabel: "Denial Reduction",
    rating: 5,
  },
  {
    quote:
      "After a competitor practice in our area was hit with an OIG audit, we decided to be proactive. PhysicianMeds conducted a thorough compliance audit, identified several risk areas, and helped us fix them before any issues arose. Best investment we've made.",
    name: "Dr. Priya Patel",
    role: "Medical Director",
    specialty: "Multi-Specialty Group",
    metric: "100%",
    metricLabel: "Compliance Score",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const auditFAQs: AuditFAQ[] = [
  {
    question: "What is a medical audit and why does my practice need one?",
    answer:
      "A medical audit is a systematic review of your coding, billing, and documentation practices to identify errors, compliance risks, and revenue opportunities. Regular audits are essential because coding errors are found in 30-40% of claims industry-wide, and undetected issues can lead to OIG investigations, payer payback demands, and significant financial penalties.",
  },
  {
    question: "How many records do you review during an audit?",
    answer:
      "Our sample size depends on your practice volume and the audit type. For a standard coding audit, we typically review 50-100 records per provider using statistically valid sampling methodology. For targeted audits addressing specific risk areas, we may review a larger or more focused sample. The goal is always a sample size that provides statistically reliable findings.",
  },
  {
    question: "How often should my practice be audited?",
    answer:
      "We recommend a comprehensive baseline audit followed by annual reviews and quarterly spot-checks. New providers should be audited within their first 90 days. Practices undergoing significant changes — new EHR systems, new providers, expansion into new specialties — should schedule an audit during the transition period to catch issues early.",
  },
  {
    question: "Will the audit disrupt our daily operations?",
    answer:
      "No. Our audit process is designed to be minimally disruptive. We work with electronic records and can access most data remotely through secure connections. Provider interviews and education sessions are scheduled at convenient times. The entire process from planning to final report typically takes 3-4 weeks.",
  },
  {
    question: "What happens if you find significant errors?",
    answer:
      "Finding errors is the point — it's a positive outcome, not a negative one. When we identify significant issues, we provide a prioritized corrective action plan, provider-specific education, and workflow recommendations. For compliance-related findings, we advise on any necessary voluntary self-disclosure or refund processes to mitigate risk proactively.",
  },
  {
    question: "How is your audit different from a payer audit?",
    answer:
      "Our audits are proactive and protective — we work for you, not against you. Unlike payer audits that aim to recover overpayments, our goal is to identify and fix issues before payers find them. Our findings are protected under attorney-client privilege when conducted under legal counsel, and we help you fix problems rather than penalize you for them.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const auditPageMeta = {
  title: "Medical Audit Services | PhysicianMeds",
  description:
    "Comprehensive medical audit services — coding audits, billing compliance, regulatory reviews, E/M level analysis, and HCC risk adjustment. Protect your practice and recover lost revenue.",

  servicesTitle: "Comprehensive Audit Services",
  servicesDescription:
    "From coding accuracy to regulatory compliance, our AAPC and AHIMA certified auditors provide thorough reviews across every aspect of your revenue cycle.",

  whyAuditTitle: "Why Medical Audits Matter",
  whyAuditDescription:
    "In an era of increased regulatory scrutiny, proactive auditing isn't optional — it's essential for protecting your practice and maximizing revenue.",

  processTitle: "Our Proven Audit Process",
  processDescription:
    "A structured, methodical approach that delivers actionable insights with minimal disruption to your daily operations.",

  findingsTitle: "Common Audit Discoveries",
  findingsDescription:
    "Our audits consistently uncover these issues across practices of all sizes — catching them early saves revenue and prevents compliance problems.",

  benefitsTitle: "The Audit Advantage",
  benefitsDescription:
    "Regular medical audits don't just find problems — they drive continuous improvement across your entire revenue cycle.",

  testimonialsTitle: "Trusted by Leading Practices",
  testimonialsSubtitle:
    "See how our medical audit expertise has helped practices recover revenue, reduce denials, and achieve full compliance.",

  faqDescription:
    "Common questions about medical auditing, our process, audit frequency, and what to expect when you partner with our team.",

  bottomCTA: {
    title: "Don't Wait for an External Audit",
    description:
      "Proactive auditing protects your practice, recovers lost revenue, and gives you peace of mind. Our certified auditors are ready to help you identify risks and unlock opportunities.",
    primaryButton: "Schedule Your Free Audit Consultation",
  },
};
