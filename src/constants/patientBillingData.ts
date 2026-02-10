import {
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Monitor,
  Shield,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  AlertTriangle,
  Heart,
  BarChart3,
  Zap,
  Eye,
  Send,
  Headphones,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface PBStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface PBService {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface PBJourneyStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
}

export interface PBSupportChannel {
  title: string;
  description: string;
  icon: LucideIcon;
  availability: string;
  color: string;
}

export interface PBMistake {
  title: string;
  description: string;
  impact: string;
  icon: LucideIcon;
}

export interface PBBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PBComparisonItem {
  label: string;
  before: string;
  after: string;
}

export interface PBTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface PBFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const pbHero = {
  badge: "Patient-Friendly Billing",
  titleLine1: "Billing That Patients",
  titleHighlight: "Actually Understand",
  titleLine2: "",
  description:
    "We transform confusing medical bills into clear, easy-to-read statements. Our patient billing services reduce billing disputes by 65%, accelerate collections, and keep patient satisfaction high.",
  heroPoints: [
    "Crystal-clear itemized statements",
    "Multi-channel payment options",
    "Dedicated patient support line",
    "HIPAA-compliant payment portal",
  ],
  ctaPrimary: "Get a Free Billing Assessment",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/patient-billing-1.jpg",
    process: "/services/images/patient-billing-2.jpg",
    results: "/services/images/patient-billing-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const pbStats: PBStat[] = [
  { value: "65", suffix: "%", label: "Fewer Billing Disputes", icon: Shield },
  { value: "40", suffix: "%", label: "Faster Patient Payments", icon: Zap },
  { value: "98", suffix: "%", label: "Patient Satisfaction", icon: Heart },
  { value: "$2.5", suffix: "M+", label: "Collected for Providers", icon: DollarSign },
];

// ============================================================
// CORE SERVICES
// ============================================================

export const pbServices: PBService[] = [
  {
    title: "Transparent Statement Design",
    description:
      "Easy-to-read, itemized billing statements that clearly explain every charge, procedure, and insurance adjustment — no medical jargon.",
    icon: FileText,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Patient Payment Portal",
    description:
      "Secure, HIPAA-compliant online portal where patients can view statements, set up payment plans, and pay bills 24/7 from any device.",
    icon: Monitor,
    color: "text-purple-600 bg-purple-50",
  },
  {
    title: "Payment Plan Management",
    description:
      "Flexible payment arrangements tailored to each patient's financial situation, with automated reminders and zero-interest options.",
    icon: CreditCard,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Insurance Coordination",
    description:
      "We handle all insurance correspondence, explain EOBs to patients, and ensure accurate co-pay and deductible calculations.",
    icon: Shield,
    color: "text-orange-600 bg-orange-50",
  },
  {
    title: "Multi-Channel Collections",
    description:
      "Polite, professional follow-up through statements, calls, texts, and emails — maintaining patient relationships while improving collections.",
    icon: Send,
    color: "text-teal-600 bg-teal-50",
  },
  {
    title: "Financial Counseling",
    description:
      "Dedicated team to help patients understand their benefits, explore assistance programs, and find affordable payment options.",
    icon: Headphones,
    color: "text-pink-600 bg-pink-50",
  },
];

// ============================================================
// BEFORE/AFTER COMPARISON
// ============================================================

export const pbComparison: PBComparisonItem[] = [
  {
    label: "Statement Clarity",
    before: "Dense medical codes, no explanations",
    after: "Plain-language descriptions for every line",
  },
  {
    label: "Payment Options",
    before: "Check or single payment only",
    after: "Online, mobile, phone, mail + payment plans",
  },
  {
    label: "Patient Confusion",
    before: "60%+ patients call with questions",
    after: "Under 15% inquiry rate",
  },
  {
    label: "Collection Cycle",
    before: "90-120 days average",
    after: "Under 45 days average",
  },
  {
    label: "Dispute Rate",
    before: "25-30% of statements disputed",
    after: "Under 8% dispute rate",
  },
];

// ============================================================
// PATIENT JOURNEY TIMELINE
// ============================================================

export const pbJourneySteps: PBJourneyStep[] = [
  {
    step: 1,
    title: "Patient Visit",
    description:
      "Eligibility verified, copays collected at time of service, and clear cost estimates provided upfront.",
    icon: Users,
    duration: "Day 0",
  },
  {
    step: 2,
    title: "Claim Processing",
    description:
      "We submit clean claims to insurance, track adjudication, and resolve any payer issues proactively.",
    icon: Send,
    duration: "Day 1-7",
  },
  {
    step: 3,
    title: "Statement Delivery",
    description:
      "Patients receive a clear, itemized statement showing insurance payments, adjustments, and their balance.",
    icon: FileText,
    duration: "Day 8-14",
  },
  {
    step: 4,
    title: "Payment & Support",
    description:
      "Multiple payment options available. Our team handles questions, sets up payment plans, and provides financial counseling.",
    icon: CreditCard,
    duration: "Day 15-30",
  },
  {
    step: 5,
    title: "Resolution",
    description:
      "Balance resolved through payment, plan completion, or assistance program. Patient relationship preserved.",
    icon: CheckCircle,
    duration: "Day 30-45",
  },
];

// ============================================================
// COMMON BILLING MISTAKES
// ============================================================

export const pbMistakes: PBMistake[] = [
  {
    title: "Sending Confusing Statements",
    description:
      "Statements full of medical codes and jargon that patients can't understand, leading to ignored bills and disputes.",
    impact: "35% lower collection rates",
    icon: Eye,
  },
  {
    title: "No Payment Plan Options",
    description:
      "Demanding full payment immediately without offering flexible arrangements drives patients to ignore bills entirely.",
    impact: "40% of balances go uncollected",
    icon: CreditCard,
  },
  {
    title: "Slow Statement Delivery",
    description:
      "Sending bills 60+ days after service when patients have forgotten about the visit, reducing payment likelihood.",
    impact: "50% drop in payment after 60 days",
    icon: Clock,
  },
  {
    title: "Aggressive Collection Tactics",
    description:
      "Heavy-handed collection approaches that damage patient relationships and lead to negative reviews.",
    impact: "Loss of returning patients",
    icon: AlertTriangle,
  },
  {
    title: "Ignoring Payment Technology",
    description:
      "Not offering online payment portals, text-to-pay, or mobile options that modern patients expect.",
    impact: "25% fewer payments received",
    icon: Monitor,
  },
];

// ============================================================
// SUPPORT CHANNELS
// ============================================================

export const pbSupportChannels: PBSupportChannel[] = [
  {
    title: "Phone Support",
    description:
      "Live billing specialists answer patient questions, explain charges, and set up payment arrangements.",
    icon: Phone,
    availability: "Mon—Fri, 8am—6pm EST",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Patient Portal",
    description:
      "Self-service portal for viewing statements, making payments, downloading receipts, and managing plans.",
    icon: Monitor,
    availability: "24/7 Access",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Email Support",
    description:
      "Detailed billing inquiries handled within 24 hours with written documentation for patient records.",
    icon: Mail,
    availability: "24hr Response Time",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Text & Chat",
    description:
      "Quick answers via text messaging and live chat for simple billing questions and payment confirmations.",
    icon: MessageSquare,
    availability: "Real-time Responses",
    color: "from-orange-500 to-orange-600",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const pbBenefits: PBBenefit[] = [
  {
    title: "Higher Collection Rates",
    description: "Clear billing leads to faster, more complete payments from patients.",
    icon: TrendingUp,
  },
  {
    title: "Fewer Phone Calls",
    description: "Transparent statements reduce billing inquiry calls by over 60%.",
    icon: Phone,
  },
  {
    title: "Patient Retention",
    description: "Positive billing experiences keep patients coming back.",
    icon: Heart,
  },
  {
    title: "Reduced Write-Offs",
    description: "Proactive follow-up and flexible plans minimize bad debt.",
    icon: DollarSign,
  },
  {
    title: "Compliance & Security",
    description: "HIPAA-compliant processes protect patient financial data.",
    icon: Shield,
  },
  {
    title: "Real-Time Analytics",
    description: "Dashboard tracking of patient payments, aging, and collection metrics.",
    icon: BarChart3,
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const pbTestimonials: PBTestimonial[] = [
  {
    quote:
      "Since switching to PhysicianMeds for patient billing, our collection rate jumped 40% and patient complaints about billing dropped to almost zero. The statements are so clear.",
    name: "Dr. Sarah Mitchell",
    role: "Practice Owner",
    specialty: "Family Medicine",
    metric: "40%",
    metricLabel: "Higher Collections",
    rating: 5,
  },
  {
    quote:
      "Our patients actually thank us for our billing now. The payment portal is intuitive, the statements are easy to understand, and the support team is incredibly patient.",
    name: "Jennifer Reyes",
    role: "Office Manager",
    specialty: "Pediatrics",
    metric: "98%",
    metricLabel: "Satisfaction",
    rating: 5,
  },
  {
    quote:
      "We used to spend hours on billing calls every day. Now patients understand their bills right away. Our front desk staff can focus on patient care instead of billing disputes.",
    name: "Mark Thompson",
    role: "Practice Administrator",
    specialty: "Orthopedics",
    metric: "65%",
    metricLabel: "Fewer Disputes",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const pbFAQs: PBFAQ[] = [
  {
    question: "How do you make patient bills easier to understand?",
    answer:
      "We redesign your billing statements with plain-language descriptions for every procedure, clear breakdowns of what insurance paid versus what the patient owes, and an easy-to-find total balance with payment instructions. No medical codes or confusing jargon.",
  },
  {
    question: "What payment options do patients get?",
    answer:
      "Patients can pay online through our secure portal, by phone, via text-to-pay, through the mail, or in-person. We also offer customizable payment plans with automated reminders, making it easy for patients to pay on their terms.",
  },
  {
    question: "How do you handle patients who can't afford their bills?",
    answer:
      "Our financial counselors work with patients to explore insurance benefits, charity care programs, sliding-scale discounts, and flexible payment plans. We prioritize keeping patient relationships intact while maximizing collections for your practice.",
  },
  {
    question: "Will patient billing affect our existing billing workflow?",
    answer:
      "Not at all — we integrate seamlessly with your current practice management system and EHR. Our team handles all patient-facing billing communications while your existing medical billing continues uninterrupted.",
  },
  {
    question: "How quickly do patients receive their statements?",
    answer:
      "Statements are generated and sent within 5-7 business days of insurance adjudication, both electronically through the patient portal and via mail. Prompt delivery significantly improves collection rates.",
  },
  {
    question: "Is the patient payment portal HIPAA-compliant?",
    answer:
      "Absolutely. Our portal uses bank-level 256-bit SSL encryption, is fully HIPAA-compliant, and undergoes regular security audits. Patient financial data is protected with the highest industry standards.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const pbPageMeta = {
  title: "Patient Billing Services | PhysicianMeds",
  description:
    "Transform your patient billing with clear statements, flexible payment options, and dedicated support. Increase collections by 40% while maintaining patient satisfaction.",

  servicesTitle: "Complete Patient Billing Solutions",
  servicesDescription:
    "From statement design to payment processing, we handle every aspect of patient billing so your team can focus on care.",

  comparisonTitle: "The PhysicianMeds Difference",
  comparisonDescription:
    "See how our approach transforms every aspect of the patient billing experience.",

  journeyTitle: "The Patient Billing Journey",
  journeyDescription:
    "From visit to payment — a seamless, transparent experience at every step.",

  mistakesTitle: "Billing Mistakes Costing You Revenue",
  mistakesDescription:
    "These common patient billing errors silently drain your revenue. We eliminate all of them.",

  supportTitle: "Patient Support, Every Channel",
  supportDescription:
    "Your patients get help however they prefer — always professional, always compassionate.",

  benefitsTitle: "Why Practices Choose Us",
  benefitsDescription:
    "Transparent billing isn't just patient-friendly — it's profitable.",

  faqDescription:
    "Common questions about our patient billing services and how we help practices improve collections while keeping patients happy.",

  testimonialsTitle: "Trusted by Healthcare Providers",
  testimonialsSubtitle:
    "See how our patient billing approach is transforming practices nationwide.",

  bottomCTA: {
    title: "Ready to Transform Your Patient Billing?",
    description:
      "Join hundreds of practices that have increased collections and patient satisfaction with our transparent billing approach.",
    primaryButton: "Start Free Assessment",
  },
};
