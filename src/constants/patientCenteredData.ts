import {
  Award,
  Heart,
  Shield,
  Users,
  DollarSign,
  FileText,
  Target,
  TrendingUp,
  Zap,
  BarChart3,
  Activity,
  Star,
  Layers,
  ArrowUpRight,
  Clock,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// INTERFACES
// ============================================================

export interface PCMHStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface PCMHPillar {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export interface PCMHRecognitionLevel {
  level: string;
  badge: string;
  description: string;
  color: string;
  borderColor: string;
  requirements: string[];
  recommended?: boolean;
}

export interface PCMHComparisonItem {
  category: string;
  traditional: string;
  pcmh: string;
}

export interface PCMHTransformationStep {
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
}

export interface PCMHBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PCMHTestimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
}

export interface PCMHFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO
// ============================================================

export const pcmhHero = {
  badge: "NCQA PCMH Experts",
  titleLine1: "Transform Your Practice Into a",
  titleHighlight: "Patient-Centered Medical Home",
  description:
    "Achieve NCQA PCMH recognition and deliver coordinated, whole-person care. We guide your practice through every step — from gap assessment to successful recognition — unlocking better outcomes, higher reimbursements, and a competitive edge.",
  heroPoints: [
    "Full NCQA PCMH gap analysis & readiness assessment",
    "Team-based care model implementation",
    "Higher reimbursement from payers & Medicare bonuses",
    "Continuous quality improvement coaching",
  ],
  ctaPrimary: "Start Your PCMH Journey",
  ctaSecondary: "Talk to a Consultant",
  images: {
    hero: "/services/images/patient-centered-1.jpg",
    process: "/services/images/patient-centered-2.jpg",
    results: "/services/images/patient-centered-3.jpg",
  },
};

// ============================================================
// STATS
// ============================================================

export const pcmhStats: PCMHStat[] = [
  {
    value: "97",
    suffix: "%",
    label: "NCQA Approval Rate",
    icon: Target,
  },
  {
    value: "20",
    suffix: "%+",
    label: "Revenue Increase Avg.",
    icon: TrendingUp,
  },
  {
    value: "300",
    suffix: "+",
    label: "Practices Transformed",
    icon: Users,
  },
  {
    value: "40",
    suffix: "%",
    label: "Fewer ER Visits for Patients",
    icon: Heart,
  },
];

// ============================================================
// PCMH CORE PILLARS (UNIQUE)
// ============================================================

export const pcmhPillars: PCMHPillar[] = [
  {
    title: "Patient-Centered Access",
    description:
      "Same-day appointments, after-hours access, and telehealth options ensure patients can always reach their care team.",
    icon: Clock,
    color: "from-cyan-500 to-blue-600",
    features: [
      "Same-day / next-day scheduling",
      "After-hours care access",
      "Telehealth & virtual visits",
      "Patient portal engagement",
    ],
  },
  {
    title: "Team-Based Care",
    description:
      "A coordinated team works together to deliver comprehensive care, with each member operating at the top of their scope.",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    features: [
      "Care coordinator assignments",
      "Behavioral health integration",
      "Clinical staff empowerment",
      "Collaborative care plans",
    ],
  },
  {
    title: "Population Health Management",
    description:
      "Proactive identification and management of patient populations to improve outcomes and reduce costs across your panel.",
    icon: BarChart3,
    color: "from-emerald-500 to-green-600",
    features: [
      "Risk stratification protocols",
      "Chronic disease registries",
      "Preventive care gap tracking",
      "Social determinants screening",
    ],
  },
  {
    title: "Care Coordination",
    description:
      "Seamless transitions between providers, specialists, and facilities with comprehensive tracking and follow-up.",
    icon: Layers,
    color: "from-amber-500 to-orange-600",
    features: [
      "Referral tracking & closed loops",
      "Hospital discharge follow-up",
      "Specialist communication protocols",
      "Community resource connections",
    ],
  },
  {
    title: "Quality & Safety",
    description:
      "Evidence-based clinical protocols and continuous performance measurement to constantly improve patient care delivery.",
    icon: Shield,
    color: "from-rose-500 to-red-600",
    features: [
      "Clinical decision support tools",
      "Performance measure dashboards",
      "Medication reconciliation",
      "Patient safety protocols",
    ],
  },
  {
    title: "Continuous Improvement",
    description:
      "Ongoing data analysis, benchmarking, and practice redesign to sustain and expand PCMH capabilities over time.",
    icon: ArrowUpRight,
    color: "from-indigo-500 to-blue-600",
    features: [
      "PDSA improvement cycles",
      "Staff training programs",
      "Patient experience surveys",
      "Annual renewal preparation",
    ],
  },
];

// ============================================================
// RECOGNITION LEVELS (UNIQUE)
// ============================================================

export const pcmhRecognitionLevels: PCMHRecognitionLevel[] = [
  {
    level: "Level 1",
    badge: "🥉",
    description:
      "Foundational PCMH capabilities with basic patient-centered processes and team-based care structures in place.",
    color: "bg-amber-50",
    borderColor: "border-amber-300",
    requirements: [
      "Patient-centered appointment access",
      "Basic care team structure",
      "Minimum quality reporting",
      "Initial care coordination",
    ],
  },
  {
    level: "Level 2",
    badge: "🥈",
    description:
      "Intermediate implementation with robust population health management, data-driven care processes, and quality improvement.",
    color: "bg-slate-50",
    borderColor: "border-slate-400",
    requirements: [
      "Comprehensive access standards",
      "Integrated behavioral health",
      "Population health analytics",
      "Advanced care coordination",
      "Performance measurement system",
    ],
  },
  {
    level: "Level 3",
    badge: "🏅",
    description:
      "The highest tier of NCQA PCMH recognition — demonstrating exceptional patient-centered care, full team integration, and continuous quality improvement.",
    color: "bg-amber-50/70",
    borderColor: "border-yellow-500",
    requirements: [
      "24/7 patient access & triage",
      "Full team-based care model",
      "Advanced population health management",
      "Comprehensive quality improvement",
      "Patient engagement technology",
      "Care transitions excellence",
    ],
    recommended: true,
  },
];

// ============================================================
// CARE MODEL COMPARISON (UNIQUE)
// ============================================================

export const pcmhComparison: PCMHComparisonItem[] = [
  {
    category: "Patient Access",
    traditional: "Limited office hours, long waits for appointments",
    pcmh: "Same-day access, after-hours care, telehealth options",
  },
  {
    category: "Care Coordination",
    traditional: "Fragmented, patient responsible for managing referrals",
    pcmh: "Seamless transitions, dedicated care coordinators",
  },
  {
    category: "Data & Analytics",
    traditional: "Reactive, based on individual visits",
    pcmh: "Proactive, population-level risk management",
  },
  {
    category: "Reimbursement",
    traditional: "Standard fee-for-service rates",
    pcmh: "Enhanced per-member-per-month payments + bonuses",
  },
  {
    category: "Quality Measurement",
    traditional: "Minimal reporting, few benchmarks",
    pcmh: "Continuous monitoring, HEDIS/quality dashboards",
  },
  {
    category: "Patient Experience",
    traditional: "Transactional, visit-focused",
    pcmh: "Relationship-based, whole-person care",
  },
];

// ============================================================
// TRANSFORMATION JOURNEY (UNIQUE)
// ============================================================

export const pcmhTransformation: PCMHTransformationStep[] = [
  {
    phase: "Phase 1",
    title: "Gap Assessment & Readiness",
    description:
      "We conduct a comprehensive gap analysis against NCQA standards, assess your EHR capabilities, and identify areas needing improvement to build your transformation roadmap.",
    icon: Target,
    duration: "2–4 Weeks",
  },
  {
    phase: "Phase 2",
    title: "Workflow Redesign & Training",
    description:
      "Redesign clinical workflows, implement team-based care models, configure EHR templates, and train staff on new processes aligned with PCMH requirements.",
    icon: Zap,
    duration: "4–8 Weeks",
  },
  {
    phase: "Phase 3",
    title: "Documentation & Submission",
    description:
      "Prepare all required NCQA documentation, policies, procedures, and evidence. We manage the entire submission process end-to-end on your behalf.",
    icon: FileText,
    duration: "3–6 Weeks",
  },
  {
    phase: "Phase 4",
    title: "Recognition & Ongoing Support",
    description:
      "Celebrate your PCMH recognition! We provide ongoing support for annual renewals, continuous quality improvement, and maintaining compliance with evolving standards.",
    icon: Award,
    duration: "Ongoing",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const pcmhBenefits: PCMHBenefit[] = [
  {
    title: "Higher Reimbursement",
    description:
      "PCMH-recognized practices earn 10–20% higher reimbursements from most commercial payers and Medicare incentives.",
    icon: DollarSign,
  },
  {
    title: "Better Patient Outcomes",
    description:
      "Coordinated care reduces ER visits by 40%, hospital admissions by 20%, and improves chronic disease management.",
    icon: Heart,
  },
  {
    title: "Competitive Advantage",
    description:
      "PCMH recognition differentiates your practice in the market, attracting patients who value quality and coordinated care.",
    icon: Star,
  },
  {
    title: "Staff Satisfaction",
    description:
      "Team-based care reduces physician burnout and empowers all staff members to practice at the top of their license.",
    icon: Users,
  },
  {
    title: "Value-Based Readiness",
    description:
      "PCMH positions your practice for success in value-based payment models, ACOs, and alternative payment arrangements.",
    icon: Activity,
  },
  {
    title: "Reduced Administrative Burden",
    description:
      "Streamlined workflows, standardized processes, and technology integration reduce paperwork and improve efficiency.",
    icon: Stethoscope,
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const pcmhTestimonials: PCMHTestimonial[] = [
  {
    name: "Dr. Karen Mitchell",
    role: "Medical Director",
    specialty: "Valley Primary Care Associates",
    quote:
      "Achieving Level 3 PCMH recognition with PhysicianMeds was seamless. Their team handled everything from gap analysis to NCQA submission. Our reimbursements increased by 18% in the first year, and our patient satisfaction scores have never been higher.",
    rating: 5,
  },
  {
    name: "Dr. Marcus Rivera",
    role: "Family Medicine Physician",
    specialty: "CommunityFirst Health Center",
    quote:
      "The transformation journey was remarkably smooth. PhysicianMeds trained our entire staff, redesigned our workflows, and helped us implement a team-based care model that actually works. We're delivering better care with less burnout.",
    rating: 5,
  },
  {
    name: "Sandra Nguyen",
    role: "Practice Administrator",
    specialty: "Westside Medical Group",
    quote:
      "We tried becoming PCMH-recognized on our own twice and failed. PhysicianMeds got us Level 3 recognition on the first try. The ongoing support for annual renewals gives us peace of mind, and the revenue increase has been substantial.",
    rating: 5,
  },
];

// ============================================================
// FAQs
// ============================================================

export const pcmhFAQs: PCMHFAQ[] = [
  {
    question: "What is PCMH recognition and why does it matter?",
    answer:
      "Patient-Centered Medical Home (PCMH) is a healthcare delivery model recognized by the National Committee for Quality Assurance (NCQA). It emphasizes coordinated, patient-centered care that improves quality and experience while reducing costs. PCMH recognition signals to patients, payers, and the market that your practice meets the highest standards of primary care.",
  },
  {
    question: "How long does it take to achieve PCMH recognition?",
    answer:
      "The typical timeline is 3–6 months from initial assessment to NCQA submission, depending on your practice's current readiness level. Practices with existing EHR systems and quality reporting capabilities may move faster. We've helped some well-prepared practices achieve recognition in as few as 10 weeks.",
  },
  {
    question: "What are the financial benefits of PCMH recognition?",
    answer:
      "PCMH-recognized practices typically see 10–20% higher reimbursement rates from commercial payers, Medicare per-member-per-month (PMPM) care management fees, reduced overhead through streamlined workflows, and potential bonus payments tied to quality metrics. Most practices see a positive ROI within 6–12 months.",
  },
  {
    question: "Do we need to change our EHR to become PCMH?",
    answer:
      "In most cases, no. We work with all major EHR systems and help you optimize your existing technology to meet NCQA requirements. This includes configuring templates, setting up patient registries, building quality dashboards, and enabling patient portal features.",
  },
  {
    question: "What happens after we achieve recognition?",
    answer:
      "PCMH recognition requires annual renewal with NCQA. We provide ongoing support including annual attestation preparation, continuous quality improvement coaching, staff training for new team members, and updates to keep your practice aligned with evolving NCQA standards.",
  },
  {
    question: "Which practices are eligible for PCMH recognition?",
    answer:
      "Any primary care practice — including family medicine, internal medicine, pediatrics, and multi-specialty groups with primary care — is eligible. Both solo practitioners and large group practices can achieve recognition. Specialty practices may qualify under different NCQA programs.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const pcmhPageMeta = {
  title: "PCMH Recognition Services | PhysicianMeds",
  description:
    "Achieve NCQA PCMH recognition with PhysicianMeds. Expert guidance through gap analysis, workflow redesign, documentation, and submission.",

  pillarsTitle: "The Six Pillars of PCMH Excellence",
  pillarsDescription:
    "Our approach covers every dimension of the PCMH model — ensuring your practice excels in all NCQA standards and delivers truly patient-centered care.",

  recognitionTitle: "NCQA Recognition Levels",
  recognitionDescription:
    "NCQA offers multiple levels of PCMH recognition. We help your practice achieve the level that best fits your goals and unlock the highest possible incentives.",

  comparisonTitle: "Traditional Practice vs. Medical Home",
  comparisonDescription:
    "See how the PCMH model transforms every aspect of your practice — from patient access to quality measurement and financial performance.",

  transformationTitle: "Your Transformation Roadmap",
  transformationDescription:
    "Our proven 4-phase approach takes your practice from initial assessment to full NCQA recognition — with ongoing support to maintain and grow your capabilities.",

  benefitsTitle: "The PCMH Advantage",
  benefitsDescription:
    "PCMH recognition delivers measurable improvements across every dimension of practice performance — clinical, financial, and operational.",

  testimonialsTitle: "Trusted by Practices Nationwide",
  testimonialsSubtitle: "Hear from practices that have transformed with our help.",

  faqDescription:
    "Common questions about PCMH recognition, the transformation process, and what to expect working with PhysicianMeds.",

  bottomCTA: {
    title: "Ready to Become a Patient-Centered Medical Home?",
    description:
      "Join 300+ practices that have achieved NCQA PCMH recognition with our help. Get a free readiness assessment today.",
    primaryButton: "Get a Free PCMH Assessment",
  },
};
