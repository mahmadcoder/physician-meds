import {
  Award,
  BarChart3,
  Shield,
  TrendingUp,
  CheckCircle,
  DollarSign,
  FileText,
  Target,
  Users,
  Zap,
  Heart,
  Star,
  Layers,
  Activity,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface QPPStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface QPPTrack {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  recommended?: boolean;
}

export interface QPPCategory {
  name: string;
  weight: string;
  description: string;
  icon: LucideIcon;
  color: string;
  measures: string[];
}

export interface QPPBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface QPPTimeline {
  quarter: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "completed" | "in-progress" | "upcoming";
}

export interface QPPPenalty {
  scenario: string;
  impact: string;
  risk: "high" | "medium" | "low";
  description: string;
}

export interface QPPTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface QPPFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const qppHero = {
  badge: "MIPS & APM Experts",
  titleLine1: "Maximize Your",
  titleHighlight: "Quality Payment Score",
  description:
    "Navigate CMS's Quality Payment Program with confidence. We help providers optimize MIPS performance, avoid payment penalties of up to 9%, and earn incentive bonuses — all while improving patient outcomes.",
  heroPoints: [
    "Avoid up to 9% Medicare payment penalties",
    "MIPS score optimization & reporting",
    "Advanced APM pathway guidance",
    "Real-time performance dashboards",
  ],
  ctaPrimary: "Get a Free QPP Assessment",
  ctaSecondary: "Call Our Experts",
  images: {
    hero: "/services/images/quality-payment-1.jpg",
    process: "/services/images/quality-payment-2.jpg",
    results: "/services/images/quality-payment-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const qppStats: QPPStat[] = [
  { value: "95+", suffix: "", label: "Avg. MIPS Score Achieved", icon: Target },
  { value: "9", suffix: "%", label: "Max Penalty Avoided", icon: Shield },
  { value: "500", suffix: "+", label: "Providers Helped", icon: Users },
  { value: "$2.1", suffix: "M", label: "Incentives Earned", icon: DollarSign },
];

// ============================================================
// MIPS PERFORMANCE CATEGORIES
// ============================================================

export const qppCategories: QPPCategory[] = [
  {
    name: "Quality",
    weight: "30%",
    description:
      "Report on clinical quality measures that demonstrate high-value, patient-centered care across your specialty.",
    icon: Star,
    color: "from-blue-500 to-blue-600",
    measures: [
      "6 quality measures required",
      "One outcome or high-priority measure",
      "Data completeness thresholds",
      "Specialty-specific measure sets",
    ],
  },
  {
    name: "Cost",
    weight: "30%",
    description:
      "CMS calculates cost scores using Medicare claims data — no separate reporting needed, but optimization is critical.",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    measures: [
      "Total per-capita cost",
      "Medicare spending per beneficiary",
      "Episode-based cost measures",
      "Automatically calculated by CMS",
    ],
  },
  {
    name: "Promoting Interoperability",
    weight: "25%",
    description:
      "Demonstrate meaningful use of certified EHR technology for health information exchange and patient engagement.",
    icon: Activity,
    color: "from-purple-500 to-purple-600",
    measures: [
      "e-Prescribing adoption",
      "Health information exchange",
      "Patient electronic access",
      "Public health registry reporting",
    ],
  },
  {
    name: "Improvement Activities",
    weight: "15%",
    description:
      "Complete qualifying activities that improve clinical practice operations, care coordination, and patient engagement.",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600",
    measures: [
      "Behavioral health integration",
      "Care coordination agreements",
      "Patient safety initiatives",
      "Telehealth expansion activities",
    ],
  },
];

// ============================================================
// QPP TRACKS (MIPS VS APM)
// ============================================================

export const qppTracks: QPPTrack[] = [
  {
    id: "mips",
    name: "Traditional MIPS",
    description:
      "The standard reporting pathway — you report on four performance categories, earn a composite score (0-100), and receive a payment adjustment.",
    icon: BarChart3,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    features: [
      "Report on 4 performance categories",
      "Composite score determines adjustment",
      "Up to +9% positive adjustment",
      "Penalty of up to -9% for low scores",
      "Most providers participate here",
      "Multiple submission methods available",
    ],
    recommended: true,
  },
  {
    id: "mips-value",
    name: "MIPS Value Pathways (MVPs)",
    description:
      "A streamlined, aligned reporting framework connecting quality measures to cost and improvement activities around a clinical topic.",
    icon: Layers,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    features: [
      "Topic-based measure sets",
      "Simplified reporting requirements",
      "Population health measures included",
      "Aligned quality and cost measures",
      "Growing number of MVPs available",
      "Encouraged by CMS for future MIPS",
    ],
  },
  {
    id: "apm",
    name: "Advanced APMs",
    description:
      "Qualifying APM participants earn a 5% APM incentive payment and are exempt from MIPS reporting and adjustments.",
    icon: Award,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    features: [
      "5% APM incentive payment",
      "Exempt from MIPS reporting",
      "Shared savings/risk models",
      "ACOs, bundled payments, PCMH",
      "Higher threshold requirements",
      "Maximum potential rewards",
    ],
  },
];

// ============================================================
// ANNUAL TIMELINE
// ============================================================

export const qppTimeline: QPPTimeline[] = [
  {
    quarter: "Q1",
    title: "Assessment & Planning",
    description:
      "We audit your current MIPS standing, identify optimal measures, and build a personalized performance strategy for the year.",
    icon: Target,
    status: "completed",
  },
  {
    quarter: "Q2",
    title: "Implementation & Training",
    description:
      "Configure your EHR workflows, train your team on documentation requirements, and begin data collection for quality measures.",
    icon: Zap,
    status: "completed",
  },
  {
    quarter: "Q3",
    title: "Mid-Year Review & Optimization",
    description:
      "Analyze interim performance data, identify gaps, and make targeted adjustments to maximize your composite score.",
    icon: BarChart3,
    status: "in-progress",
  },
  {
    quarter: "Q4",
    title: "Final Reporting & Submission",
    description:
      "Complete data collection, validate all measures, and submit your MIPS data to CMS before the March 31st deadline.",
    icon: CheckCircle,
    status: "upcoming",
  },
];

// ============================================================
// PENALTY RISKS
// ============================================================

export const qppPenalties: QPPPenalty[] = [
  {
    scenario: "No Data Submitted",
    impact: "-9% Medicare Adjustment",
    risk: "high",
    description: "Failing to report any MIPS data results in the maximum negative payment adjustment applied to all Medicare Part B claims.",
  },
  {
    scenario: "Partial / Low Score",
    impact: "-3% to -7% Adjustment",
    risk: "medium",
    description: "Submitting incomplete data or scoring below the performance threshold results in a proportional negative adjustment.",
  },
  {
    scenario: "Threshold Score (75+)",
    impact: "Neutral to +1% Adjustment",
    risk: "low",
    description: "Meeting the performance threshold avoids all penalties and may earn a small positive adjustment.",
  },
  {
    scenario: "Exceptional Score (90+)",
    impact: "Up to +9% Adjustment",
    risk: "low",
    description: "Achieving an exceptional score earns the maximum positive adjustment plus potential additional incentive payments.",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const qppBenefits: QPPBenefit[] = [
  {
    title: "Penalty-Free Practice",
    description: "We ensure you never face negative Medicare adjustments due to inadequate QPP reporting.",
    icon: Shield,
  },
  {
    title: "Maximum Incentive Earnings",
    description: "Our optimization strategies consistently achieve scores that qualify for the highest positive adjustments.",
    icon: DollarSign,
  },
  {
    title: "Streamlined Reporting",
    description: "We handle all measure selection, data collection, and submission — zero burden on your clinical staff.",
    icon: FileText,
  },
  {
    title: "Real-Time Dashboards",
    description: "Track your MIPS score throughout the year with live performance dashboards and alerts.",
    icon: BarChart3,
  },
  {
    title: "Improved Patient Outcomes",
    description: "QPP measures align with best practices, so improving your score also improves care quality.",
    icon: Heart,
  },
  {
    title: "Future-Proof Strategy",
    description: "Stay ahead of CMS policy changes with proactive guidance on MVPs, APMs, and evolving requirements.",
    icon: ArrowUpRight,
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const qppTestimonials: QPPTestimonial[] = [
  {
    quote:
      "We went from a MIPS score of 42 to 96 in our first year with PhysicianMeds. The penalty we were facing turned into a significant bonus. Their team understood exactly which measures to focus on for our cardiology practice.",
    name: "Dr. James Patterson",
    role: "Cardiologist",
    specialty: "Cardiology",
    metric: "96",
    metricLabel: "MIPS Score",
    rating: 5,
  },
  {
    quote:
      "The QPP landscape was overwhelming for our small practice. PhysicianMeds simplified everything — from measure selection to final submission. We earned a positive adjustment for the first time in 3 years.",
    name: "Dr. Linda Morales",
    role: "Practice Owner",
    specialty: "Internal Medicine",
    metric: "+7%",
    metricLabel: "Payment Adjustment",
    rating: 5,
  },
  {
    quote:
      "Their mid-year reviews are invaluable. They caught gaps in our Promoting Interoperability measures in Q2 and helped us correct course before it was too late. We ended up with a 91 composite score.",
    name: "Robert Chen",
    role: "Practice Administrator",
    specialty: "Orthopedics",
    metric: "91",
    metricLabel: "Composite Score",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const qppFAQs: QPPFAQ[] = [
  {
    question: "What is the Quality Payment Program (QPP)?",
    answer:
      "The QPP is a CMS program that adjusts Medicare Part B payments based on provider performance. It has two tracks: MIPS (Merit-based Incentive Payment System) and Advanced APMs (Alternative Payment Models). Providers either report through MIPS or participate in an Advanced APM to earn incentive payments and avoid penalties.",
  },
  {
    question: "What happens if I don't report MIPS data?",
    answer:
      "Failing to report MIPS data — or failing to meet the low-volume threshold exemption — results in a negative payment adjustment of up to 9% applied to all your Medicare Part B claims for the following two years. This can represent a significant revenue loss for any practice.",
  },
  {
    question: "How do you help improve my MIPS score?",
    answer:
      "We start with a comprehensive audit of your current measures and workflows. We then select the optimal quality measures for your specialty, configure your EHR documentation, train your staff, and provide ongoing monitoring with mid-year corrections to maximize your composite score.",
  },
  {
    question: "What's the difference between MIPS and Advanced APMs?",
    answer:
      "MIPS requires reporting on four performance categories (quality, cost, interoperability, improvement activities) and adjusts payments based on your score. Advanced APMs, like ACOs and bundled payment models, offer a flat 5% incentive bonus and exemption from MIPS, but require assuming financial risk.",
  },
  {
    question: "When is the MIPS reporting deadline?",
    answer:
      "The performance year runs January 1 to December 31. Data submission must be completed by March 31st of the following year. We recommend beginning preparation in Q1 of the performance year to ensure all measures are properly tracked throughout the year.",
  },
  {
    question: "Can small practices participate in QPP?",
    answer:
      "Yes! However, providers billing ≤$90,000 in Medicare Part B allowed charges or seeing ≤200 Medicare patients are exempt from MIPS. Small practices that do participate can qualify for bonus points and have access to simplified reporting through MIPS Value Pathways (MVPs).",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const qppPageMeta = {
  title: "Quality Payment Program Services | PhysicianMeds",
  description:
    "Expert MIPS reporting, QPP optimization, and APM guidance to maximize your Medicare incentive payments and avoid penalties of up to 9%.",

  categoriesTitle: "The Four MIPS Performance Pillars",
  categoriesDescription:
    "Your MIPS composite score is built from four weighted categories. We optimize each one to maximize your total score.",

  tracksTitle: "Choose Your QPP Pathway",
  tracksDescription:
    "CMS offers multiple participation tracks. We help you choose and execute the one that delivers the best financial outcome for your practice.",

  timelineTitle: "Your Year-Round QPP Strategy",
  timelineDescription:
    "We don't just submit data at year-end. Our four-phase approach ensures you achieve the highest possible score throughout the performance year.",

  penaltiesTitle: "What's at Stake?",
  penaltiesDescription:
    "Understanding the financial impact of QPP performance helps you see why proactive optimization is essential — not optional.",

  benefitsTitle: "Why Partner With Us",
  benefitsDescription:
    "Our QPP specialists have helped hundreds of providers turn potential penalties into positive adjustments.",

  faqDescription:
    "Common questions about CMS's Quality Payment Program, MIPS reporting requirements, and how we help providers optimize their performance scores.",

  testimonialsTitle: "QPP Success Stories",
  testimonialsSubtitle:
    "See how providers across specialties have transformed their MIPS performance with our expert guidance.",

  bottomCTA: {
    title: "Stop Leaving Money on the Table",
    description:
      "Every year without QPP optimization is another year of potential penalties and missed incentives. Let our experts maximize your score.",
    primaryButton: "Get Free QPP Assessment",
  },
};
