import {
  TrendingUp,
  Shield,
  DollarSign,
  CheckCircle,
  BarChart3,
  FileText,
  Users,
  Target,
  Award,
  Clock,
  Zap,
  Heart,
  Layers,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface IncentiveStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface IncentiveProgram {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  benefits: string[];
}

export interface EligibilityItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface IncentiveTimelineStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
}

export interface IncentiveBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  span: "normal" | "wide" | "tall";
}

export interface IncentiveTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface IncentiveFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const incentiveHero = {
  badge: "Healthcare Incentive Experts",
  titleLine1: "Maximize Your",
  titleHighlight: "Incentive Earnings",
  description:
    "Navigate the complex landscape of healthcare incentive programs with confidence. Our specialists help practices unlock maximum reimbursements through MIPS, Promoting Interoperability, Value-Based Care, and more — turning quality measures into measurable revenue.",
  heroPoints: [
    "Expert MIPS & APM reporting support",
    "Promoting Interoperability optimization",
    "Value-based care program guidance",
    "Avoid penalties, maximize bonuses",
  ],
  ctaPrimary: "Start Earning More",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/incentive-programs-1.jpg",
    programs: "/services/images/incentive-programs-2.jpg",
    results: "/services/images/incentive-programs-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const incentiveStats: IncentiveStat[] = [
  { value: "97", suffix: "%", label: "Client Success Rate", icon: Target },
  { value: "$2.8", suffix: "M+", label: "Incentives Earned", icon: DollarSign },
  { value: "500", suffix: "+", label: "Practices Served", icon: Users },
  { value: "0", suffix: "%", label: "Penalty Rate", icon: Shield },
];

// ============================================================
// INCENTIVE PROGRAMS
// ============================================================

export const incentivePrograms: IncentiveProgram[] = [
  {
    id: "mips",
    title: "MIPS Reporting",
    description:
      "The Merit-based Incentive Payment System (MIPS) determines Medicare payment adjustments. We ensure you score high across all four categories — Quality, Cost, Improvement Activities, and Promoting Interoperability.",
    icon: Award,
    color: "bg-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    benefits: [
      "Quality measure selection & optimization",
      "Cost category performance tracking",
      "Improvement activity documentation",
      "Score projection & gap analysis",
    ],
  },
  {
    id: "promoting-interoperability",
    title: "Promoting Interoperability",
    description:
      "Formerly Meaningful Use, this program rewards the effective use of certified EHR technology. We handle attestation, measure tracking, and compliance to secure your maximum bonus.",
    icon: Layers,
    color: "bg-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-600",
    benefits: [
      "EHR technology optimization",
      "Security risk analysis support",
      "Health Information Exchange setup",
      "Attestation & documentation",
    ],
  },
  {
    id: "value-based",
    title: "Value-Based Care",
    description:
      "Transition from fee-for-service to value-based payment models with expert guidance. We optimize performance on quality metrics, patient outcomes, and cost efficiency indicators.",
    icon: Heart,
    color: "bg-emerald-500",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-600",
    benefits: [
      "Quality outcome measurement",
      "Patient engagement strategies",
      "Cost reduction analysis",
      "Shared savings optimization",
    ],
  },
  {
    id: "bundled-payments",
    title: "Bundled Payments",
    description:
      "Navigate bundled payment initiatives with confidence. Our team analyzes episode costs, identifies savings opportunities, and ensures quality benchmarks are met for maximum shared savings.",
    icon: DollarSign,
    color: "bg-orange-500",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    benefits: [
      "Episode cost analysis & tracking",
      "Quality benchmark monitoring",
      "Risk stratification support",
      "Savings opportunity identification",
    ],
  },
  {
    id: "apm",
    title: "Advanced APMs",
    description:
      "Qualify for the APM incentive bonus by meeting threshold requirements. We help practices evaluate, join, and thrive in Advanced Alternative Payment Models for superior reimbursement rates.",
    icon: TrendingUp,
    color: "bg-rose-500",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    benefits: [
      "APM eligibility assessment",
      "Threshold performance monitoring",
      "Financial risk management",
      "5% APM incentive qualification",
    ],
  },
  {
    id: "chronic-care",
    title: "Chronic Care Management",
    description:
      "Unlock recurring revenue through CCM programs. We implement workflows for qualifying patients, coordinate care plans, and handle billing to maximize monthly per-patient reimbursements.",
    icon: FileText,
    color: "bg-teal-500",
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-600",
    benefits: [
      "Patient identification & enrollment",
      "Care plan development support",
      "Monthly billing optimization",
      "Compliance & documentation",
    ],
  },
];

// ============================================================
// ELIGIBILITY CHECKLIST
// ============================================================

export const eligibilityItems: EligibilityItem[] = [
  {
    title: "Medicare/Medicaid Participation",
    description: "Active participation in Medicare Part B or Medicaid programs with valid NPI registration.",
    icon: CheckCircle,
  },
  {
    title: "EHR System Certification",
    description: "Use of ONC-certified electronic health record technology with current-year edition.",
    icon: Shield,
  },
  {
    title: "Minimum Patient Volume",
    description: "Meet the low-volume threshold exclusion criteria — typically 200+ Medicare patients or $90K+ in allowed charges.",
    icon: Users,
  },
  {
    title: "Quality Data Submission",
    description: "Ability to report on required quality measures through QCDR, qualified registry, or EHR submission.",
    icon: BarChart3,
  },
  {
    title: "Active Clinical Practice",
    description: "Maintaining an active clinical practice with documented patient encounters during performance period.",
    icon: Heart,
  },
  {
    title: "Compliance & Documentation",
    description: "Proper documentation of improvement activities, security risk analysis, and clinical quality measures.",
    icon: FileText,
  },
];

// ============================================================
// HOW IT WORKS TIMELINE
// ============================================================

export const incentiveTimeline: IncentiveTimelineStep[] = [
  {
    step: 1,
    title: "Program Assessment",
    description:
      "We analyze your practice profile, patient population, and current reporting to identify the most lucrative incentive programs for your specialty.",
    icon: Target,
    color: "from-blue-500 to-blue-600",
    duration: "Week 1",
  },
  {
    step: 2,
    title: "Strategy Development",
    description:
      "Our experts craft a personalized incentive strategy, selecting optimal quality measures, improvement activities, and reporting methods for maximum scores.",
    icon: FileText,
    color: "from-purple-500 to-purple-600",
    duration: "Week 2",
  },
  {
    step: 3,
    title: "System Configuration",
    description:
      "We configure your EHR system, set up dashboards, and implement automated tracking for all selected measures and reporting requirements.",
    icon: Zap,
    color: "from-emerald-500 to-emerald-600",
    duration: "Week 3",
  },
  {
    step: 4,
    title: "Staff Training",
    description:
      "Comprehensive training for your clinical and administrative staff on documentation requirements, workflow changes, and quality measure capture.",
    icon: Users,
    color: "from-orange-500 to-orange-600",
    duration: "Week 4",
  },
  {
    step: 5,
    title: "Ongoing Monitoring",
    description:
      "Continuous performance monitoring with real-time dashboards, monthly progress reports, and proactive adjustments to maintain exceptional scores.",
    icon: BarChart3,
    color: "from-rose-500 to-rose-600",
    duration: "Ongoing",
  },
  {
    step: 6,
    title: "Reporting & Submission",
    description:
      "We handle all data validation, final reporting, and submission to CMS — ensuring accuracy, completeness, and timely filing before deadlines.",
    icon: CheckCircle,
    color: "from-teal-500 to-teal-600",
    duration: "Year-End",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const incentiveBenefits: IncentiveBenefit[] = [
  {
    title: "Avoid Medicare Penalties",
    description:
      "Non-participation in MIPS can result in a -9% payment adjustment. We ensure you stay compliant and penalty-free year after year.",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    span: "wide",
  },
  {
    title: "Maximize Bonus Payments",
    description:
      "Top performers can earn up to +9% Medicare payment adjustments. Our optimization strategies consistently place clients in the exceptional performance category.",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    span: "normal",
  },
  {
    title: "Reduce Admin Burden",
    description:
      "We handle all the complexity — measure selection, data tracking, reporting, and submission — so your team can focus on patient care.",
    icon: Clock,
    color: "from-blue-500 to-indigo-600",
    span: "normal",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Real-time performance dashboards give you complete visibility into your incentive program progress, enabling smarter clinical and business decisions.",
    icon: BarChart3,
    color: "from-purple-500 to-violet-600",
    span: "normal",
  },
  {
    title: "Future-Proof Your Practice",
    description:
      "As healthcare moves toward value-based care, practices with strong incentive program participation are better positioned for long-term success and sustainability.",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-600",
    span: "normal",
  },
  {
    title: "Expert Compliance Support",
    description:
      "Stay ahead of regulatory changes with our team of certified specialists who monitor CMS updates and adapt your strategy proactively.",
    icon: Award,
    color: "from-teal-500 to-cyan-600",
    span: "wide",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const incentiveTestimonials: IncentiveTestimonial[] = [
  {
    quote:
      "Before PhysicianMeds, we were facing a 7% MIPS penalty. Their team took over our reporting, optimized our measures, and we ended up with a +4% bonus instead. That swing in revenue was over $180,000 for our practice.",
    name: "Dr. Angela Torres",
    role: "Practice Owner",
    specialty: "Family Medicine",
    metric: "+11%",
    metricLabel: "Payment Swing",
    rating: 5,
  },
  {
    quote:
      "The team made Promoting Interoperability reporting completely painless. They configured our EHR, trained our staff, and handled the attestation. We scored 100% on PI measures for the first time ever.",
    name: "Dr. James Patterson",
    role: "Medical Director",
    specialty: "Cardiology Group",
    metric: "100%",
    metricLabel: "PI Score",
    rating: 5,
  },
  {
    quote:
      "We had no idea we were leaving money on the table with CCM billing. PhysicianMeds identified over 200 qualifying patients and set up the entire workflow. We now generate $35K+ in additional monthly revenue.",
    name: "Sarah Mitchell",
    role: "Practice Administrator",
    specialty: "Internal Medicine",
    metric: "$35K+",
    metricLabel: "Monthly Revenue",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const incentiveFAQs: IncentiveFAQ[] = [
  {
    question: "What is MIPS and how does it affect my practice?",
    answer:
      "MIPS (Merit-based Incentive Payment System) is a CMS program that adjusts Medicare Part B payments based on performance. Clinicians are scored across Quality, Cost, Promoting Interoperability, and Improvement Activities. Poor scores can result in payment cuts up to -9%, while high performers earn bonuses up to +9%. Our team ensures you maximize your score and avoid penalties.",
  },
  {
    question: "How much can I earn through incentive programs?",
    answer:
      "Earnings vary by practice size, specialty, and patient volume. However, our clients typically earn between $50,000 and $500,000+ annually through combined MIPS bonuses, CCM billing, and value-based care shared savings. Many practices are surprised by how much revenue they've been leaving on the table.",
  },
  {
    question: "Do I need to change my EHR system to participate?",
    answer:
      "In most cases, no. We work with all major ONC-certified EHR systems and can optimize your existing technology for incentive program reporting. Our team configures your system for automated measure tracking, quality reporting, and CMS submission — typically without any system replacement needed.",
  },
  {
    question: "What happens if I don't participate in MIPS?",
    answer:
      "Non-participation or poor performance in MIPS results in a negative payment adjustment of up to -9% on all Medicare Part B reimbursements. This penalty applies for the following two payment years and compounds if left unaddressed. We help you avoid penalties entirely and turn MIPS into a revenue-positive program.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "We typically complete the initial assessment and strategy development within 2-3 weeks. System configuration and staff training follow within a month. You'll see performance improvements on your dashboards immediately, while actual payment adjustments from CMS apply to the payment year following your performance period (typically a 2-year lag).",
  },
  {
    question: "Can you help practices that have already received penalties?",
    answer:
      "Absolutely. Many of our clients come to us after receiving penalties. We perform a root cause analysis of your previous scoring, implement corrective measures, and build a strategy to not only eliminate future penalties but earn positive adjustments. Our track record shows a 97% success rate in turning penalized practices into bonus-earning ones.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const incentivePageMeta = {
  title: "Incentive Programs | PhysicianMeds",
  description:
    "Expert healthcare incentive program management — MIPS reporting, Promoting Interoperability, Value-Based Care, and APM optimization. Maximize bonuses and avoid penalties.",

  programsTitle: "Programs We Specialize In",
  programsDescription:
    "From MIPS reporting to Advanced APMs, we help practices navigate every major healthcare incentive program to maximize earnings and ensure compliance.",

  eligibilityTitle: "Are You Eligible?",
  eligibilityDescription:
    "Most Medicare-participating practices qualify for one or more incentive programs. Here's what you need to get started.",

  timelineTitle: "How We Get You There",
  timelineDescription:
    "Our proven 6-step process takes you from assessment to maximum incentive earnings — with minimal disruption to your daily operations.",

  benefitsTitle: "Why Practices Choose Us",
  benefitsDescription:
    "We don't just help you avoid penalties — we transform incentive programs into a significant, reliable revenue stream for your practice.",

  testimonialsTitle: "Real Results, Real Revenue",
  testimonialsSubtitle:
    "See how our incentive program expertise has helped practices turn compliance requirements into substantial earnings.",

  faqDescription:
    "Common questions about healthcare incentive programs, MIPS reporting, eligibility requirements, and the financial impact on your practice.",

  bottomCTA: {
    title: "Stop Leaving Money on the Table",
    description:
      "Join hundreds of practices that have turned healthcare incentive programs into a major revenue stream. Our experts will build a personalized strategy to maximize your earnings.",
    primaryButton: "Get Your Free Assessment",
  },
};
