import {
  BarChart3,
  Users,
  Calendar,
  FileText,
  Shield,
  TrendingUp,
  Clock,
  Headphones,
  Settings,
  LineChart,
  Workflow,
  Target,
  Layers,
  Zap,
  RefreshCw,
  MonitorCheck,
  Heart,
  type LucideIcon,
} from "lucide-react";

// --- Types ---

export interface PMFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface PMWorkflowStep {
  phase: string;
  title: string;
  description: string;
  items: string[];
}

export interface PMStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface PMChallenge {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PMFAQ {
  question: string;
  answer: string;
}

export interface PMTestimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
  metric: string;
  metricLabel: string;
}

export interface PMIntegration {
  name: string;
  category: string;
}

export interface PMTimelineResult {
  period: string;
  title: string;
  achievements: string[];
  highlight: string;
}

export interface PMGuarantee {
  title: string;
  description: string;
}

// --- Hero ---

export const pmHero = {
  badge: "Practice Management",
  titleLine1: "Streamline Your",
  titleHighlight: "Practice Operations",
  titleLine2: "& Boost Efficiency",
  description:
    "PhysicianMeds transforms how healthcare practices operate — from patient scheduling and workflow automation to financial reporting and compliance. Let us handle the complexity so you can focus on patient care.",
  ctaPrimary: "Get Started Today",
  ctaSecondary: "Talk to an Expert",
  heroPoints: [
    "Reduce administrative burden by 40%",
    "Improve patient satisfaction scores",
    "Real-time financial visibility & reporting",
  ],
  images: {
    hero: "/services/images/practice-management-1.jpg",
    workflow: "/services/images/practice-management-2.jpg",
    dashboard: "/services/images/practice-management-3.jpg",
  },
};

// --- Stats ---

export const pmStats: PMStat[] = [
  { value: "40", suffix: "%", label: "Reduction in Admin Tasks", icon: TrendingUp },
  { value: "95", suffix: "%", label: "Patient Satisfaction Rate", icon: Heart },
  { value: "60", suffix: "%", label: "Faster Claim Processing", icon: Zap },
  { value: "100", suffix: "+", label: "Practices Managed", icon: Users },
];

// --- Core Features ---

export const pmFeatures: PMFeature[] = [
  {
    title: "Patient Scheduling & Registration",
    description:
      "Streamlined appointment booking, automated reminders, online self-scheduling, and seamless patient intake workflows that reduce no-shows by up to 35%.",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    title: "Revenue Cycle Optimization",
    description:
      "End-to-end revenue cycle oversight — from charge capture and claim submission to payment posting and A/R follow-up, maximizing your collections.",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
  {
    title: "Financial Reporting & Analytics",
    description:
      "Real-time dashboards, custom financial reports, KPI tracking, and trend analysis that give you complete visibility into your practice's financial health.",
    icon: BarChart3,
    color: "bg-purple-500",
  },
  {
    title: "Staff & Workflow Management",
    description:
      "Optimize staff scheduling, role-based task assignments, performance tracking, and standard operating procedures to boost team productivity.",
    icon: Users,
    color: "bg-orange-500",
  },
  {
    title: "Compliance & Credentialing",
    description:
      "Stay fully compliant with HIPAA, OSHA, and payer requirements. We manage credentialing, re-credentialing, and ensure all licenses stay current.",
    icon: Shield,
    color: "bg-red-500",
  },
  {
    title: "EHR/PM System Integration",
    description:
      "Seamless integration with all major EHR and practice management systems — ensuring data flows smoothly without duplicate entry or data silos.",
    icon: Layers,
    color: "bg-cyan-500",
  },
  {
    title: "Claims & Denial Management",
    description:
      "Proactive claim scrubbing, automated denial tracking, root cause analysis, and systematic appeal processes that recover maximum revenue.",
    icon: FileText,
    color: "bg-pink-500",
  },
  {
    title: "Patient Communication Hub",
    description:
      "Automated appointment reminders, billing notifications, patient portal management, and satisfaction surveys that improve patient engagement.",
    icon: Headphones,
    color: "bg-indigo-500",
  },
];

// --- Workflow Phases ---

export const pmWorkflow: PMWorkflowStep[] = [
  {
    phase: "01",
    title: "Assessment & Onboarding",
    description: "We analyze your current workflows, identify bottlenecks, and create a tailored optimization plan.",
    items: [
      "Practice audit & gap analysis",
      "Workflow mapping & optimization",
      "Staff training & transition plan",
      "System integration setup",
    ],
  },
  {
    phase: "02",
    title: "Implementation & Optimization",
    description: "We deploy streamlined processes and integrate with your existing systems for a seamless transition.",
    items: [
      "Process automation rollout",
      "EHR/PM system configuration",
      "Revenue cycle recalibration",
      "Quality benchmarks setup",
    ],
  },
  {
    phase: "03",
    title: "Monitoring & Growth",
    description: "Continuous performance tracking, regular reporting, and ongoing optimization to drive long-term growth.",
    items: [
      "Monthly KPI reporting",
      "Quarterly strategy reviews",
      "Continuous process improvement",
      "Scalable growth support",
    ],
  },
];

// --- Challenges Practices Face ---

export const pmChallenges: PMChallenge[] = [
  {
    title: "Administrative Overload",
    description: "Staff spending more time on paperwork than patient care, leading to burnout, errors, and high turnover rates.",
    icon: Clock,
  },
  {
    title: "Revenue Leakage",
    description: "Missed charges, coding errors, and delayed claim submissions causing significant revenue loss every month.",
    icon: TrendingUp,
  },
  {
    title: "Compliance Risks",
    description: "Difficulty keeping up with changing regulations, payer requirements, and credentialing deadlines.",
    icon: Shield,
  },
  {
    title: "Patient No-Shows",
    description: "Lack of automated reminders and patient engagement tools resulting in 15-30% no-show rates.",
    icon: Calendar,
  },
  {
    title: "Data Silos",
    description: "Disconnected systems and manual processes creating information gaps and duplicate data entry.",
    icon: Layers,
  },
  {
    title: "Scaling Difficulties",
    description: "Inability to scale operations efficiently when adding new providers, locations, or specialties.",
    icon: Settings,
  },
];

// --- Transformation Timeline ---

export const pmTimelineResults: PMTimelineResult[] = [
  {
    period: "First 30 Days",
    title: "Foundation & Quick Wins",
    achievements: [
      "Complete practice audit & workflow analysis",
      "System integration & staff training",
      "15-20% reduction in claim denials",
      "Automated appointment reminders live",
    ],
    highlight: "20% denial reduction",
  },
  {
    period: "60 Days",
    title: "Optimization & Efficiency",
    achievements: [
      "Revenue cycle fully optimized",
      "35% reduction in admin workload",
      "Patient no-show rate cut in half",
      "Real-time dashboard analytics active",
    ],
    highlight: "35% less admin work",
  },
  {
    period: "90 Days",
    title: "Growth & Scaling",
    achievements: [
      "20-30% increase in net collections",
      "Staff productivity at peak efficiency",
      "Full compliance & credentialing managed",
      "Strategic growth plan in action",
    ],
    highlight: "30% revenue growth",
  },
];

// --- Our Guarantee ---

export const pmGuarantees: PMGuarantee[] = [
  {
    title: "No Long-Term Contracts",
    description: "We earn your business monthly. No lock-in contracts, no cancellation fees — stay because you want to, not because you have to.",
  },
  {
    title: "Dedicated Account Manager",
    description: "A single point of contact who understands your practice inside and out, available whenever you need support or strategic advice.",
  },
  {
    title: "Measurable ROI Guarantee",
    description: "If we don't improve your collections or reduce your admin costs within 90 days, we'll work for free until we do.",
  },
  {
    title: "Zero Disruption Onboarding",
    description: "Our seamless transition process ensures your practice never misses a beat. We handle all the heavy lifting during setup.",
  },
  {
    title: "HIPAA-Compliant & Secure",
    description: "Enterprise-grade security with 256-bit encryption, SOC 2 compliance, and regular third-party audits to protect patient data.",
  },
  {
    title: "24/7 Priority Support",
    description: "Round-the-clock technical and operational support. Critical issues are escalated and resolved within hours, not days.",
  },
];

// --- Integrations ---

export const pmIntegrations: PMIntegration[] = [
  { name: "Epic", category: "EHR" },
  { name: "Cerner", category: "EHR" },
  { name: "Athenahealth", category: "PM" },
  { name: "eClinicalWorks", category: "EHR" },
  { name: "NextGen", category: "PM" },
  { name: "DrChrono", category: "EHR" },
  { name: "Kareo", category: "PM" },
  { name: "AdvancedMD", category: "PM" },
  { name: "Practice Fusion", category: "EHR" },
  { name: "Greenway Health", category: "EHR" },
  { name: "Allscripts", category: "EHR" },
  { name: "ModMed", category: "PM" },
];

// --- Testimonials ---

export const pmTestimonials: PMTestimonial[] = [
  {
    name: "Dr. Michael Chen",
    role: "Practice Owner",
    specialty: "Family Medicine",
    quote:
      "PhysicianMeds completely transformed how we run our practice. Admin tasks dropped by 40%, and our revenue increased 28% in just 6 months. The team truly understands healthcare operations.",
    rating: 5,
    metric: "28%",
    metricLabel: "Revenue Increase",
  },
  {
    name: "Sarah Williams, MBA",
    role: "Practice Administrator",
    specialty: "Multi-Specialty Group",
    quote:
      "Managing 12 providers across 3 locations was a nightmare before PhysicianMeds. Now everything runs like clockwork — scheduling, billing, compliance, all handled seamlessly.",
    rating: 5,
    metric: "3 Locations",
    metricLabel: "Seamlessly Managed",
  },
  {
    name: "Dr. James Rodriguez",
    role: "Medical Director",
    specialty: "Urgent Care",
    quote:
      "Our patient no-show rate dropped from 22% to 8% after implementing their scheduling and reminder system. The ROI was immediate and the support team is exceptional.",
    rating: 5,
    metric: "8%",
    metricLabel: "No-Show Rate",
  },
];

// --- FAQ ---

export const pmFAQs: PMFAQ[] = [
  {
    question: "What does practice management include?",
    answer:
      "Our practice management services cover the full spectrum of healthcare operations — from patient scheduling and revenue cycle management to compliance monitoring, staff optimization, financial reporting, and EHR/PM system integration.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most practices are fully onboarded within 2-4 weeks, depending on size and complexity. We handle all system integration, staff training, and workflow setup with minimal disruption to your daily operations.",
  },
  {
    question: "Can you integrate with our existing EHR/PM system?",
    answer:
      "Yes. We integrate with all major EHR and practice management systems including Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, and many more. Our team handles the entire integration process.",
  },
  {
    question: "How do you improve revenue for practices?",
    answer:
      "We optimize your entire revenue cycle — from clean claim submission and proactive denial management to charge capture accuracy, A/R follow-up, and fee schedule optimization. Most practices see a 15-30% revenue increase.",
  },
  {
    question: "Do you handle compliance and credentialing?",
    answer:
      "Absolutely. We manage HIPAA compliance, OSHA requirements, payer credentialing, re-credentialing timelines, and license tracking to ensure your practice stays fully compliant at all times.",
  },
  {
    question: "Can you manage multiple practice locations?",
    answer:
      "Yes. Our Enterprise tier is specifically designed for multi-location practices and healthcare networks. We provide centralized reporting, standardized workflows, and location-specific optimization.",
  },
  {
    question: "What kind of reporting do you provide?",
    answer:
      "We provide real-time dashboards with KPIs including collection rates, denial rates, patient volume trends, provider productivity, A/R aging, and financial performance. Custom reports are available in our Professional and Enterprise tiers.",
  },
  {
    question: "Is patient data secure with your services?",
    answer:
      "100%. We are fully HIPAA-compliant with enterprise-grade encryption, access controls, and audit trails. All team members undergo regular security training and background checks.",
  },
];

// --- Key Metrics We Track ---

export const pmKeyMetrics = [
  { icon: LineChart, label: "Collection Rate", detail: "Track net collections vs expected" },
  { icon: RefreshCw, label: "Denial Rate", detail: "Monitor and reduce claim denials" },
  { icon: Clock, label: "Days in A/R", detail: "Minimize accounts receivable aging" },
  { icon: Users, label: "Patient Volume", detail: "Track visits and growth trends" },
  { icon: MonitorCheck, label: "Clean Claim Rate", detail: "First-pass claim acceptance" },
  { icon: Workflow, label: "Staff Productivity", detail: "Provider & staff efficiency" },
  { icon: Target, label: "No-Show Rate", detail: "Patient attendance tracking" },
  { icon: Zap, label: "Turnaround Time", detail: "Claim processing speed" },
];

// --- Page Meta ---

export const pmPageMeta = {
  challengesTitle: "Challenges Practices Face Every Day",
  challengesDescription:
    "Without proper management, healthcare practices struggle with inefficiency, revenue loss, and compliance risks. Here's what we help you overcome.",
  featuresTitle: "Comprehensive Practice Management Services",
  featuresDescription:
    "From front desk to financials — we manage every aspect of your practice operations so you can focus on what matters most: patient care.",
  workflowTitle: "Our 3-Phase Management Approach",
  workflowDescription:
    "A proven methodology that transforms your practice operations systematically — from initial assessment to continuous improvement.",
  timelineTitle: "Your Practice Transformation Timeline",
  timelineDescription:
    "See the measurable impact our management services deliver at every stage — from the first week to long-term growth.",
  guaranteeTitle: "Our Promise to Your Practice",
  guaranteeDescription:
    "We don't just make promises — we back them up with real commitments that put your practice first.",
  metricsTitle: "Key Metrics We Track & Optimize",
  metricsDescription:
    "We monitor the KPIs that matter most to your practice's financial health and operational efficiency — in real time.",
  integrationsTitle: "Seamless System Integrations",
  integrationsDescription:
    "We work with all major EHR and practice management systems to ensure your data flows smoothly and securely.",
  faqTitle: "Practice Management FAQs",
  faqDescription:
    "Get answers to common questions about how we can help streamline your practice operations and boost your bottom line.",
  ctaTitle: "Ready to Transform Your Practice?",
  ctaDescription:
    "Schedule a free practice assessment and discover how PhysicianMeds can reduce your administrative burden, boost revenue, and improve patient satisfaction.",
};
