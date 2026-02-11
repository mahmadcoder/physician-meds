import {
  BarChart3,
  FileText,
  DollarSign,
  Stethoscope,
  Settings,
  Shield,
  PieChart,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Target,
  Zap,
  Eye,
  Layers,
  Activity,
  Database,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface ReportingStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  sparkData: number[];
  color: string;
}

export interface KPISpotlightItem {
  label: string;
  value: number;
  displayValue: string;
  subtitle: string;
  color: string;
  strokeColor: string;
}

export interface ReportingWorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface ComplianceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "active" | "verified";
}

export interface ReportingBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  span: "normal" | "wide";
}

export interface ReportingTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface ReportingFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const reportingHero = {
  badge: "Advanced Practice Analytics",
  titleLine1: "Data-Driven Insights with",
  titleHighlight: "Practice Reporting",
  description:
    "Transform raw practice data into actionable intelligence. Our comprehensive reporting platform delivers real-time financial, clinical, and operational analytics — empowering smarter decisions that drive revenue growth and operational excellence.",
  heroPoints: [
    "50+ customizable report templates",
    "Real-time dashboards & KPI tracking",
    "Automated scheduled report delivery",
    "HIPAA-compliant data management",
  ],
  ctaPrimary: "See Your Reports",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/practice-reporting-1.jpg",
    analytics: "/services/images/practice-reporting-2.jpg",
    results: "/services/images/practice-reporting-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const reportingStats: ReportingStat[] = [
  { value: "50", suffix: "+", label: "Report Types", icon: FileText },
  { value: "99.8", suffix: "%", label: "Data Accuracy", icon: Target },
  { value: "24", suffix: "hr", label: "Turnaround Time", icon: Clock },
  { value: "1M", suffix: "+", label: "Data Points Analyzed", icon: Database },
];

// ============================================================
// REPORT TYPES
// ============================================================

export const reportTypes: ReportType[] = [
  {
    id: "financial",
    title: "Financial Reports",
    description:
      "Complete revenue cycle visibility with P&L statements, collections analysis, payer mix breakdowns, and aging reports that identify exactly where your money is.",
    icon: DollarSign,
    accentColor: "border-l-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    features: [
      "Revenue & collections trending",
      "Payer mix & reimbursement analysis",
      "Aging accounts receivable breakdown",
    ],
  },
  {
    id: "clinical",
    title: "Clinical Reports",
    description:
      "Patient outcome metrics, quality measure performance, and clinical efficiency indicators that help improve care delivery while meeting regulatory requirements.",
    icon: Stethoscope,
    accentColor: "border-l-emerald-500",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-600",
    features: [
      "Quality measure tracking (MIPS/HEDIS)",
      "Patient outcome analytics",
      "Clinical productivity metrics",
    ],
  },
  {
    id: "operational",
    title: "Operational Reports",
    description:
      "Scheduling efficiency, patient flow analysis, staff productivity, and resource utilization metrics that optimize your practice's day-to-day operations.",
    icon: Settings,
    accentColor: "border-l-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-600",
    features: [
      "Scheduling & no-show analysis",
      "Staff productivity dashboards",
      "Resource utilization tracking",
    ],
  },
  {
    id: "compliance",
    title: "Compliance Reports",
    description:
      "Stay audit-ready with comprehensive compliance documentation, coding accuracy reports, and regulatory adherence tracking across all payers and programs.",
    icon: Shield,
    accentColor: "border-l-rose-500",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    features: [
      "Coding accuracy & audit trails",
      "Regulatory compliance dashboards",
      "Payer contract adherence",
    ],
  },
  {
    id: "benchmark",
    title: "Benchmark Reports",
    description:
      "Compare your practice performance against regional and national benchmarks. Identify competitive advantages and areas needing improvement with peer analysis.",
    icon: BarChart3,
    accentColor: "border-l-orange-500",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    features: [
      "Peer comparison analytics",
      "National benchmark tracking",
      "Performance gap identification",
    ],
  },
  {
    id: "custom",
    title: "Custom Reports",
    description:
      "Build exactly what you need with our drag-and-drop report builder. Combine any data points, create custom filters, and save templates for recurring use.",
    icon: Layers,
    accentColor: "border-l-teal-500",
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-600",
    features: [
      "Drag-and-drop report builder",
      "Custom KPI & metric creation",
      "Scheduled auto-delivery",
    ],
  },
];

// ============================================================
// ANALYTICS DASHBOARD METRICS
// ============================================================

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    label: "Monthly Revenue",
    value: "$1.2M",
    trend: "+12.4%",
    trendDirection: "up",
    sparkData: [30, 45, 38, 52, 48, 65, 58, 72, 68, 78, 85, 92],
    color: "text-blue-400",
  },
  {
    label: "Clean Claim Rate",
    value: "96.8%",
    trend: "+3.2%",
    trendDirection: "up",
    sparkData: [75, 78, 80, 82, 85, 84, 88, 90, 92, 94, 95, 97],
    color: "text-emerald-400",
  },
  {
    label: "Days in A/R",
    value: "28",
    trend: "-8 days",
    trendDirection: "down",
    sparkData: [45, 42, 40, 38, 35, 36, 33, 32, 30, 29, 28, 28],
    color: "text-violet-400",
  },
  {
    label: "Patient Volume",
    value: "2,847",
    trend: "+18.6%",
    trendDirection: "up",
    sparkData: [180, 195, 210, 220, 235, 240, 255, 260, 270, 275, 280, 285],
    color: "text-orange-400",
  },
  {
    label: "Denial Rate",
    value: "3.2%",
    trend: "-2.1%",
    trendDirection: "down",
    sparkData: [8, 7.5, 7, 6.5, 6, 5.5, 5, 4.8, 4.2, 3.8, 3.5, 3.2],
    color: "text-rose-400",
  },
  {
    label: "Collection Rate",
    value: "97.5%",
    trend: "+4.8%",
    trendDirection: "up",
    sparkData: [88, 89, 90, 91, 92, 93, 94, 95, 95, 96, 97, 98],
    color: "text-teal-400",
  },
];

// ============================================================
// KPI SPOTLIGHT
// ============================================================

export const kpiSpotlightItems: KPISpotlightItem[] = [
  {
    label: "Revenue Collection",
    value: 97,
    displayValue: "97%",
    subtitle: "of total billed amount collected",
    color: "text-blue-500",
    strokeColor: "stroke-blue-500",
  },
  {
    label: "Claim Approval",
    value: 94,
    displayValue: "94%",
    subtitle: "first-pass acceptance rate",
    color: "text-emerald-500",
    strokeColor: "stroke-emerald-500",
  },
  {
    label: "Patient Satisfaction",
    value: 92,
    displayValue: "92%",
    subtitle: "positive feedback score",
    color: "text-violet-500",
    strokeColor: "stroke-violet-500",
  },
  {
    label: "Staff Efficiency",
    value: 89,
    displayValue: "89%",
    subtitle: "productivity index rating",
    color: "text-orange-500",
    strokeColor: "stroke-orange-500",
  },
];

// ============================================================
// REPORTING WORKFLOW
// ============================================================

export const reportingWorkflow: ReportingWorkflowStep[] = [
  {
    step: 1,
    title: "Data Collection",
    description: "Automated extraction from your EHR, PM system, billing platform, and clearinghouse into our secure analytics engine.",
    icon: Database,
    color: "from-blue-500 to-blue-600",
  },
  {
    step: 2,
    title: "Data Validation",
    description: "Multi-layer validation checks ensure 99.8% accuracy — identifying anomalies, duplicates, and inconsistencies before analysis.",
    icon: CheckCircle,
    color: "from-purple-500 to-purple-600",
  },
  {
    step: 3,
    title: "Deep Analysis",
    description: "Advanced algorithms analyze trends, patterns, and outliers across your financial, clinical, and operational data sets.",
    icon: Activity,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    step: 4,
    title: "Visualization",
    description: "Data transforms into clear, interactive dashboards with charts, graphs, and heatmaps that make insights immediately actionable.",
    icon: PieChart,
    color: "from-orange-500 to-orange-600",
  },
  {
    step: 5,
    title: "Smart Delivery",
    description: "Automated report delivery via email, portal, or API — on your schedule with role-based access and real-time alert notifications.",
    icon: Zap,
    color: "from-rose-500 to-rose-600",
  },
];

// ============================================================
// COMPLIANCE & INSIGHTS
// ============================================================

export const complianceItems: ComplianceItem[] = [
  {
    title: "HIPAA Data Protection",
    description: "End-to-end encryption, access controls, and audit trails for all reporting data.",
    icon: Shield,
    status: "verified",
  },
  {
    title: "SOC 2 Type II Certified",
    description: "Enterprise-grade security controls verified by independent third-party auditors.",
    icon: CheckCircle,
    status: "verified",
  },
  {
    title: "CMS Reporting Standards",
    description: "All reports align with CMS quality program requirements and submission formats.",
    icon: FileText,
    status: "active",
  },
  {
    title: "Real-Time Audit Trail",
    description: "Complete logging of every data access, export, and modification for compliance.",
    icon: Eye,
    status: "active",
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions ensure staff only see the data relevant to their role.",
    icon: Users,
    status: "verified",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const reportingBenefits: ReportingBenefit[] = [
  {
    title: "Identify Revenue Leaks",
    description:
      "Our reports pinpoint exactly where revenue is being lost — from undercoding and missed charges to slow collections and payer underpayments.",
    icon: DollarSign,
    color: "from-red-500 to-rose-600",
    span: "wide",
  },
  {
    title: "Real-Time Visibility",
    description:
      "Stop waiting for month-end reports. Our live dashboards give you instant access to the metrics that matter most to your practice.",
    icon: Eye,
    color: "from-blue-500 to-indigo-600",
    span: "normal",
  },
  {
    title: "Automated Delivery",
    description:
      "Set it and forget it. Schedule any report to auto-generate and deliver to the right people at the right time — daily, weekly, or monthly.",
    icon: Zap,
    color: "from-emerald-500 to-green-600",
    span: "normal",
  },
  {
    title: "Benchmark Your Performance",
    description:
      "Compare your practice against regional and national benchmarks. Know exactly where you stand and where the biggest improvement opportunities are.",
    icon: BarChart3,
    color: "from-purple-500 to-violet-600",
    span: "normal",
  },
  {
    title: "Predict Future Trends",
    description:
      "Advanced trending analysis helps you anticipate revenue changes, staffing needs, and patient volume shifts before they impact your bottom line.",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-600",
    span: "normal",
  },
  {
    title: "Compliance-Ready Reports",
    description:
      "Every report is built to meet HIPAA, CMS, and payer-specific requirements. Stay audit-ready without any extra effort from your team.",
    icon: Shield,
    color: "from-teal-500 to-cyan-600",
    span: "wide",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const reportingTestimonials: ReportingTestimonial[] = [
  {
    quote:
      "PhysicianMeds' reporting platform is a game-changer. We found $340K in missed revenue in the first month alone. The dashboards are so intuitive that even our non-technical staff can pull insights without any training.",
    name: "Dr. Steven Park",
    role: "Practice Owner",
    specialty: "Gastroenterology",
    metric: "$340K",
    metricLabel: "Revenue Found",
    rating: 5,
  },
  {
    quote:
      "We used to spend 20+ hours each month manually compiling reports from different systems. Now everything is automated and delivered to my inbox every Monday morning. It's transformed how we make decisions.",
    name: "Lisa Hernandez",
    role: "Practice Manager",
    specialty: "Multi-Location Primary Care",
    metric: "20hrs",
    metricLabel: "Saved Monthly",
    rating: 5,
  },
  {
    quote:
      "The benchmark reports alone are worth it. We discovered we were 15% below our peers in collection rates. After implementing their recommendations, we've closed that gap completely and now exceed the national average.",
    name: "Dr. Robert Kim",
    role: "Medical Director",
    specialty: "Orthopedic Surgery",
    metric: "+15%",
    metricLabel: "Collections Boost",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const reportingFAQs: ReportingFAQ[] = [
  {
    question: "What systems does your reporting platform integrate with?",
    answer:
      "We integrate with all major EHR and practice management systems including Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, Kareo, DrChrono, and many more. Our platform also connects with clearinghouses, billing systems, and payer portals to provide a unified data view. If you use a system not listed, our team can typically build a custom integration within 2-3 weeks.",
  },
  {
    question: "How quickly can I start receiving reports?",
    answer:
      "Most practices are fully onboarded within 1-2 weeks. This includes system integration, data validation, dashboard configuration, and staff training. You'll receive your first set of reports within 48 hours of completing the data integration. Custom report templates typically take an additional 3-5 business days to configure.",
  },
  {
    question: "Can I customize existing report templates?",
    answer:
      "Absolutely. Every report template is fully customizable. You can modify metrics, date ranges, filters, groupings, and visualizations. Our drag-and-drop report builder lets you create entirely new reports from scratch using any combination of your practice data. All customizations can be saved as reusable templates.",
  },
  {
    question: "How do you ensure data accuracy in reports?",
    answer:
      "We employ a multi-layer validation process that achieves 99.8% data accuracy. This includes automated reconciliation against source systems, anomaly detection algorithms, duplicate identification, and human quality assurance checks for critical financial reports. Any discrepancies are flagged and resolved before reports are delivered.",
  },
  {
    question: "Is my practice data secure on your platform?",
    answer:
      "Security is our top priority. We are SOC 2 Type II certified and fully HIPAA compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain comprehensive audit trails, role-based access controls, and regular third-party security assessments. Your data is hosted in HIPAA-compliant cloud infrastructure with 99.99% uptime.",
  },
  {
    question: "Do you offer benchmark comparisons with similar practices?",
    answer:
      "Yes. Our benchmark database includes anonymized performance data from thousands of practices across all specialties. You can compare your metrics against practices of similar size, specialty, region, and payer mix. Benchmark reports highlight performance gaps and include specific, actionable recommendations for improvement.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const reportingPageMeta = {
  title: "Practice Reporting | PhysicianMeds",
  description:
    "Comprehensive practice reporting and analytics — financial reports, clinical metrics, operational dashboards, compliance tracking, and benchmark analysis. Data-driven decisions for better outcomes.",

  reportTypesTitle: "Reports That Drive Results",
  reportTypesDescription:
    "From financial deep-dives to clinical performance tracking, our reporting suite covers every aspect of your practice with precision and clarity.",

  analyticsTitle: "Live Analytics Dashboard",
  analyticsDescription:
    "A glimpse into our real-time analytics platform — tracking the metrics that matter most to your practice's financial health and operational performance.",

  kpiTitle: "Key Performance Indicators",
  kpiDescription:
    "Our platform continuously monitors your practice's critical KPIs, providing at-a-glance visibility into the health of your revenue cycle and operations.",

  workflowTitle: "How Our Reporting Works",
  workflowDescription:
    "From raw data to actionable insights — our 5-step process delivers accurate, timely, and meaningful reports you can trust.",

  complianceTitle: "Security & Compliance",
  complianceDescription:
    "Your data security is non-negotiable. Our platform meets the highest standards of healthcare data protection and regulatory compliance.",

  benefitsTitle: "Why Practices Trust Our Reports",
  benefitsDescription:
    "Our reporting platform doesn't just show you numbers — it reveals the stories behind them and the actions that will improve them.",

  testimonialsTitle: "Insights That Drive Growth",
  testimonialsSubtitle:
    "See how our reporting and analytics platform has helped practices uncover hidden revenue, optimize operations, and make smarter decisions.",

  faqDescription:
    "Common questions about our practice reporting platform, data integrations, customization options, security measures, and benchmark capabilities.",

  bottomCTA: {
    title: "See What Your Data Is Telling You",
    description:
      "Join thousands of practices that have transformed their decision-making with our comprehensive reporting and analytics platform. Get a free demo with your own practice data.",
    primaryButton: "Request a Free Demo",
  },
};
