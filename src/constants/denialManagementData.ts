import {
  ShieldX,
  FileX,
  AlertTriangle,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  FileText,
  Search,
  Send,
  BarChart3,
  Users,
  Target,
  ClipboardCheck,
  Phone,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface DenialStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface DenialCause {
  title: string;
  description: string;
  frequency: string; // e.g., "High", "Medium", "Low"
}

export interface DenialType {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  causes: DenialCause[];
  solution: string;
  image: string;
}

export interface ResolutionStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string; // e.g., "1-2 days"
}

export interface CaseStudy {
  specialty: string;
  problem: string;
  denialRate: string; // Before
  solution: string;
  result: {
    denialRate: string; // After
    recoveredAmount: string;
    timeframe: string;
  };
  testimonial: string;
  author: string;
  role: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface TimelineStep {
  day: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "completed" | "in-progress" | "pending";
}

export interface DenialFAQ {
  question: string;
  answer: string;
}

export interface DenialTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric: string;
  metricLabel: string;
  rating: number;
}

// ============================================================
// HERO SECTION
// ============================================================

export const dmHero = {
  badge: "Expert Denial Management",
  titleLine1: "Turn Denied Claims Into",
  titleHighlight: "Recovered Revenue",
  titleLine2: "with Strategic Appeals",
  description:
    "PhysicianMeds' denial management experts recover up to 85% of denied claims through systematic analysis, strategic appeals, and root cause prevention. Stop losing revenue to preventable denials—let us maximize your reimbursements.",
  ctaPrimary: "Get Denial Analysis",
  ctaSecondary: "Talk to Expert",
  heroPoints: [
    "85% denial recovery success rate",
    "45-day average turnaround for appeals",
    "Reduce future denials by 60%",
  ],
  images: {
    hero: "/services/images/denial-management-1.jpg",
    process: "/services/images/denial-management-2.jpg",
    results: "/services/images/denial-management-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const dmStats: DenialStat[] = [
  {
    value: "85",
    suffix: "%",
    label: "Denial Recovery Rate",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
  {
    value: "45",
    suffix: " Days",
    label: "Average Appeal Time",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    value: "60",
    suffix: "%",
    label: "Denial Rate Reduction",
    icon: ShieldX,
    color: "text-orange-600",
  },
  {
    value: "$125K",
    suffix: "+",
    label: "Revenue Recovered (2024)",
    icon: DollarSign,
    color: "text-green-600",
  },
];

// ============================================================
// DENIAL TYPES (FOR TABBED INTERFACE)
// ============================================================

export const dmDenialTypes: DenialType[] = [
  {
    id: "technical",
    name: "Technical Denials",
    icon: FileX,
    description:
      "Technical denials occur due to administrative errors, missing information, or incorrect data entry. These are the easiest to prevent and recover.",
    causes: [
      {
        title: "Missing or Invalid Patient Information",
        description:
          "Incorrect demographics, insurance ID, or authorization numbers",
        frequency: "High",
      },
      {
        title: "Coding Errors",
        description: "Wrong CPT codes, modifiers, or diagnosis codes",
        frequency: "High",
      },
      {
        title: "Timely Filing Violations",
        description: "Claims submitted after payer deadlines",
        frequency: "Medium",
      },
      {
        title: "Duplicate Claims",
        description: "Same service billed twice to the same payer",
        frequency: "Low",
      },
    ],
    solution:
      "We implement automated validation checks, staff training programs, and real-time verification systems to eliminate 90%+ of technical denials before submission.",
    image: dmHero.images.hero,
  },
  {
    id: "clinical",
    name: "Clinical Denials",
    icon: AlertTriangle,
    description:
      "Clinical denials are based on medical necessity, coverage policies, or documentation requirements. These require clinical expertise to appeal successfully.",
    causes: [
      {
        title: "Medical Necessity Not Met",
        description: "Service deemed not medically necessary by payer",
        frequency: "High",
      },
      {
        title: "Insufficient Documentation",
        description: "Missing clinical notes or supporting evidence",
        frequency: "High",
      },
      {
        title: "Experimental/Investigational",
        description: "Treatment not covered under policy",
        frequency: "Medium",
      },
      {
        title: "Missing Prior Authorization",
        description: "Required pre-approval not obtained",
        frequency: "Medium",
      },
    ],
    solution:
      "Our clinical team reviews each denial, gathers supporting documentation, and crafts compelling appeals with medical literature and peer comparisons to overturn clinical denials.",
    image: dmHero.images.process,
  },
  {
    id: "administrative",
    name: "Administrative Denials",
    icon: XCircle,
    description:
      "Administrative denials stem from eligibility issues, coordination of benefits, or contract violations. These require investigative work and payer negotiation.",
    causes: [
      {
        title: "Eligibility/Coverage Terminated",
        description: "Patient not active on date of service",
        frequency: "High",
      },
      {
        title: "Coordination of Benefits Issues",
        description: "Primary vs secondary payer disputes",
        frequency: "Medium",
      },
      {
        title: "Non-Covered Service",
        description: "Service not included in patient's plan",
        frequency: "Medium",
      },
      {
        title: "Out-of-Network Provider",
        description: "Provider not contracted with payer",
        frequency: "Low",
      },
    ],
    solution:
      "We verify eligibility retroactively, coordinate with multiple payers, and negotiate exceptions for out-of-network emergencies to recover these complex denials.",
    image: dmHero.images.results,
  },
];

// ============================================================
// RESOLUTION PROCESS (6 STEPS)
// ============================================================

export const dmResolutionProcess: ResolutionStep[] = [
  {
    step: 1,
    title: "Identification",
    description:
      "Automated systems flag denials within 24 hours of receipt, categorizing by type and payer.",
    icon: Search,
    duration: "24 hours",
  },
  {
    step: 2,
    title: "Analysis",
    description:
      "Expert analysts review denial reasons, identify root causes, and determine appeal strategy.",
    icon: BarChart3,
    duration: "1-2 days",
  },
  {
    step: 3,
    title: "Documentation",
    description:
      "Gather all supporting documents, medical records, and evidence needed for appeal.",
    icon: FileText,
    duration: "2-3 days",
  },
  {
    step: 4,
    title: "Appeal Submission",
    description:
      "Craft and submit compelling appeals with complete documentation to payers.",
    icon: Send,
    duration: "1 day",
  },
  {
    step: 5,
    title: "Follow-Up",
    description:
      "Proactive follow-up with payers, providing additional information as requested.",
    icon: Phone,
    duration: "Ongoing",
  },
  {
    step: 6,
    title: "Recovery & Prevention",
    description:
      "Track recovered funds, analyze patterns, and implement prevention strategies.",
    icon: Target,
    duration: "Continuous",
  },
];

// ============================================================
// CASE STUDIES
// ============================================================

export const dmCaseStudies: CaseStudy[] = [
  {
    specialty: "Orthopedic Surgery Practice",
    problem:
      "23% denial rate primarily from medical necessity denials on surgical procedures, losing $8K monthly.",
    denialRate: "23%",
    solution:
      "Implemented pre-submission documentation review, enhanced clinical notes templates, and strategic appeals process.",
    result: {
      denialRate: "6%",
      recoveredAmount: "$42,000",
      timeframe: "6 months",
    },
    testimonial:
      "PhysicianMeds turned our denial nightmare into a success story. Not only did they recover hundreds of thousands in denied claims, but they also helped us prevent future denials.",
    author: "Dr. James Mitchell",
    role: "Practice Owner",
  },
  {
    specialty: "Multi-Specialty Clinic",
    problem:
      "High volume of technical denials (18% rate) due to eligibility verification gaps and coding errors.",
    denialRate: "18%",
    solution:
      "Deployed real-time eligibility verification, staff coding training, and automated claim scrubbing.",
    result: {
      denialRate: "4%",
      recoveredAmount: "$28,000",
      timeframe: "4 months",
    },
    testimonial:
      "The denial rate reduction was impressive, but what really amazed us was the systematic approach to prevention. We've maintained low denial rates for over a year now.",
    author: "Maria Gonzalez",
    role: "Practice Administrator",
  },
];

// ============================================================
// SERVICE FEATURES
// ============================================================

export const dmServiceFeatures: ServiceFeature[] = [
  {
    title: "Root Cause Analysis",
    description:
      "Deep dive into denial patterns to identify and eliminate underlying issues causing repeated denials.",
    icon: Search,
    color: "bg-orange-500",
  },
  {
    title: "Strategic Appeals",
    description:
      "Expert-crafted appeals with compelling arguments, medical literature, and complete documentation.",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "Payer Negotiations",
    description:
      "Direct communication with payers to resolve disputes, negotiate exceptions, and expedite approvals.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Prevention Programs",
    description:
      "Proactive strategies including staff training, process improvements, and automation to stop denials before they happen.",
    icon: ShieldX,
    color: "bg-green-500",
  },
  {
    title: "Real-Time Tracking",
    description:
      "Live dashboard showing denial status, appeal progress, and recovery metrics updated daily.",
    icon: BarChart3,
    color: "bg-pink-500",
  },
  {
    title: "Performance Reporting",
    description:
      "Detailed monthly reports on denial trends, recovery rates, and financial impact with actionable insights.",
    icon: ClipboardCheck,
    color: "bg-indigo-500",
  },
];

// ============================================================
// APPEAL TIMELINE
// ============================================================

export const dmAppealTimeline: TimelineStep[] = [
  {
    day: "Day 1-2",
    title: "Denial Receipt & Categorization",
    description:
      "System automatically flags denial, categorizes by type, and assigns to specialist.",
    icon: AlertTriangle,
    status: "completed",
  },
  {
    day: "Day 3-5",
    title: "Comprehensive Review",
    description:
      "Expert analyst reviews claim, medical records, and payer policies to build appeal strategy.",
    icon: Search,
    status: "completed",
  },
  {
    day: "Day 6-10",
    title: "Evidence Gathering",
    description:
      "Collect supporting documentation, clinical notes, peer reviews, and medical literature.",
    icon: FileText,
    status: "completed",
  },
  {
    day: "Day 11-15",
    title: "Appeal Preparation",
    description:
      "Craft compelling appeal letter with complete documentation package ready for submission.",
    icon: ClipboardCheck,
    status: "in-progress",
  },
  {
    day: "Day 16-20",
    title: "Submission & Tracking",
    description:
      "Submit appeal via payer portal or mail with tracking confirmation and follow-up schedule.",
    icon: Send,
    status: "pending",
  },
  {
    day: "Day 21-45",
    title: "Follow-Up & Resolution",
    description:
      "Proactive follow-up calls, additional documentation if requested, and final recovery.",
    icon: CheckCircle,
    status: "pending",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const dmTestimonials: DenialTestimonial[] = [
  {
    quote:
      "The denial management service has been a game-changer for our practice. We recovered over $45K in previously denied claims and reduced our ongoing denial rate from 19% to just 5%.",
    name: "Dr. Sarah Chen",
    role: "Medical Director",
    specialty: "Cardiology Practice",
    metric: "$45K",
    metricLabel: "Recovered",
    rating: 5,
  },
  {
    quote:
      "What impressed me most wasn't just the recovery—it was the systematic approach to prevention. They didn't just fix the problem; they taught us how to avoid it in the future.",
    name: "Michael Rodriguez",
    role: "CFO",
    specialty: "Multi-Specialty Group",
    metric: "73%",
    metricLabel: "Fewer Denials",
    rating: 5,
  },
  {
    quote:
      "The appeal success rate is phenomenal. PhysicianMeds knows exactly what documentation payers need and how to present it convincingly. Our overturn rate went from 35% to 85%.",
    name: "Dr. Emily Watson",
    role: "Practice Owner",
    specialty: "Neurology Clinic",
    metric: "85%",
    metricLabel: "Appeal Success",
    rating: 5,
  },
];

// ============================================================
// FAQs
// ============================================================

export const dmFAQs: DenialFAQ[] = [
  {
    question: "What percentage of denied claims can typically be recovered?",
    answer:
      "Our average recovery rate is 85% of denied claims. The success rate varies by denial type: technical denials have a 95%+ recovery rate, clinical denials around 75-80%, and administrative denials 60-70%. The key is timely appeals with complete documentation.",
  },
  {
    question: "How long does the appeal process usually take?",
    answer:
      "Most appeals are resolved within 45-60 days from submission. Simple technical denials can be overturned in as little as 2-3 weeks, while complex clinical appeals may take up to 90 days. We provide regular status updates throughout the process.",
  },
  {
    question: "What makes your denial management different from others?",
    answer:
      "We focus on both recovery AND prevention. While we excel at appealing denials, we also analyze root causes and implement systematic changes to prevent future denials. Our clinical expertise, payer relationships, and proprietary technology give us an edge in both areas.",
  },
  {
    question: "Do you handle all types of denials?",
    answer:
      "Yes, we handle all denial types including technical, clinical, and administrative denials across all major payers (Medicare, Medicaid, commercial insurance). We also manage prior authorization denials, medical necessity denials, and timely filing issues.",
  },
  {
    question: "How quickly do you start working on denials?",
    answer:
      "We begin working on denials within 24 hours of notification. Our automated systems flag new denials immediately, and our team prioritizes them based on revenue value, time sensitivity, and recovery probability to maximize your returns.",
  },
  {
    question: "What documentation do we need to provide?",
    answer:
      "We need access to your practice management system, EHR for medical records, denial letters from payers, and any relevant prior correspondence. Our team will work with you to set up secure access and streamline the documentation process.",
  },
  {
    question: "Can you help prevent future denials?",
    answer:
      "Absolutely! Prevention is a core part of our service. We conduct root cause analysis, provide staff training, implement automated validation checks, and establish best practices to reduce your denial rate by 50-70% within 6 months.",
  },
  {
    question: "How do you charge for denial management services?",
    answer:
      "We offer flexible pricing including percentage-based recovery fees (you only pay when we recover funds) or flat monthly rates for comprehensive denial management. We'll recommend the best model based on your practice size and denial volume.",
  },
];

// ============================================================
// PAGE METADATA
// ============================================================

export const dmPageMeta = {
  denialTypesTitle: "Three Main Types of Denials We Overturn",
  denialTypesDescription:
    "Understanding denial types is the first step to recovery. Click each category to see common causes and our proven solutions.",
  
  processTitle: "Our 6-Step Denial Resolution Process",
  processDescription:
    "Systematic approach from identification to recovery—designed to maximize approvals and minimize turnaround time.",
  
  featuresTitle: "Comprehensive Denial Management Services",
  featuresDescription:
    "From root cause analysis to prevention programs, we handle every aspect of denial management for your practice.",
  
  caseStudyTitle: "Real Results from Real Practices",
  caseStudyDescription:
    "See how we've helped practices like yours recover revenue and reduce denial rates dramatically.",
  
  timelineTitle: "45-Day Journey: Denial to Recovery",
  timelineDescription:
    "Every appeal follows a proven process designed for maximum success. Here's what happens from day one.",
  
  testimonialsTitle: "Trusted by Healthcare Providers",
  testimonialsDescription:
    "Our clients see measurable improvements in denial recovery rates and overall revenue.",
  
  ctaTitle: "Ready to Recover Lost Revenue?",
  ctaDescription:
    "Get a free denial analysis and discover how much revenue you could recover. No obligations, just insights.",
};
