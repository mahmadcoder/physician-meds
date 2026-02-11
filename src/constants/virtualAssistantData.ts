import {
  CalendarCheck,
  ClipboardList,
  Clock,
  Globe,
  Heart,
  MessageSquare,
  Phone,
  Shield,
  Star,
  TrendingDown,
  Users,
  Zap,
  FileText,
  DollarSign,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface VAStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface VAService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tasks: string[];
}

export interface VABenefit {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: LucideIcon;
  color: string;
}

export interface VADaySchedule {
  time: string;
  task: string;
  category: string;
  icon: LucideIcon;
}

export interface VAOnboardingStep {
  step: number;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  color: string;
}

export interface VATestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface VAFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const vaHero = {
  badge: "Healthcare Virtual Assistants",
  titleLine1: "Your Practice, Amplified by",
  titleHighlight: "Expert Virtual Support",
  description:
    "Our HIPAA-trained medical virtual assistants handle scheduling, patient communication, billing support, and administrative workflows — so your on-site team can focus entirely on patient care.",
  heroPoints: [
    "HIPAA-trained & certified professionals",
    "Available across all U.S. time zones",
    "Seamless EHR & PM integration",
    "Scalable from solo to multi-provider practices",
  ],
  ctaPrimary: "Get Your Virtual Assistant",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/virtual-assistants-1.jpg",
    team: "/services/images/virtual-assistants-2.jpg",
    dashboard: "/services/images/virtual-assistants-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const vaStats: VAStat[] = [
  { value: "60", suffix: "%", label: "Cost Savings vs. In-Office", icon: DollarSign },
  { value: "98", suffix: "%", label: "Patient Satisfaction Rate", icon: Heart },
  { value: "24", suffix: "/7", label: "Availability Coverage", icon: Clock },
  { value: "500", suffix: "+", label: "Practices Supported", icon: Users },
];

// ============================================================
// VA SERVICE AREAS
// ============================================================

export const vaServices: VAService[] = [
  {
    id: "scheduling",
    title: "Patient Scheduling",
    description:
      "Manage appointment booking, confirmations, rescheduling, and no-show follow-ups across multiple providers and locations. Your calendar stays full and organized.",
    icon: CalendarCheck,
    color: "from-blue-500 to-blue-600",
    tasks: [
      "Appointment booking & confirmations",
      "Waitlist management",
      "Multi-provider calendar coordination",
      "No-show follow-up calls",
    ],
  },
  {
    id: "communication",
    title: "Patient Communication",
    description:
      "Handle inbound calls, patient inquiries, prescription refill requests, and referral coordination with a warm, professional touch — as if they're in your office.",
    icon: MessageSquare,
    color: "from-emerald-500 to-emerald-600",
    tasks: [
      "Inbound & outbound call handling",
      "Insurance verification calls",
      "Prescription refill coordination",
      "Referral & authorization follow-up",
    ],
  },
  {
    id: "billing",
    title: "Billing & Claims Support",
    description:
      "From charge entry and claim submission to payment posting and patient balance calls — your VA handles the revenue cycle tasks that keep your cash flow healthy.",
    icon: FileText,
    color: "from-purple-500 to-purple-600",
    tasks: [
      "Charge entry & claim submission",
      "Payment posting & reconciliation",
      "Patient statement follow-up",
      "Denied claim tracking & resubmission",
    ],
  },
  {
    id: "admin",
    title: "Administrative Support",
    description:
      "Medical record requests, faxing, inbox management, prior authorizations, and data entry — the daily tasks that consume hours but don't require on-site presence.",
    icon: ClipboardList,
    color: "from-orange-500 to-orange-600",
    tasks: [
      "Medical record requests & faxing",
      "EHR data entry & chart prep",
      "Prior authorization processing",
      "Provider credentialing support",
    ],
  },
  {
    id: "telehealth",
    title: "Telehealth Coordination",
    description:
      "Manage virtual visit scheduling, tech support for patients, pre-visit questionnaires, and post-visit follow-ups to ensure seamless telehealth experiences.",
    icon: Globe,
    color: "from-teal-500 to-teal-600",
    tasks: [
      "Virtual visit scheduling",
      "Patient tech onboarding",
      "Pre-visit form management",
      "Post-visit follow-up calls",
    ],
  },
  {
    id: "quality",
    title: "Quality & Patient Outreach",
    description:
      "Proactive patient engagement including wellness reminders, care gap outreach, satisfaction surveys, and chronic care check-ins that improve quality scores.",
    icon: Star,
    color: "from-rose-500 to-rose-600",
    tasks: [
      "Wellness & preventive care reminders",
      "Care gap closure outreach",
      "Patient satisfaction surveys",
      "Chronic care management calls",
    ],
  },
];

// ============================================================
// WHY VA? - BENEFITS WITH STATS
// ============================================================

export const vaBenefits: VABenefit[] = [
  {
    title: "Dramatic Cost Savings",
    description: "Pay a fraction of in-office staff costs with no overhead expenses — no benefits, office space, or equipment required.",
    stat: "60%",
    statLabel: "Lower Cost",
    icon: TrendingDown,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Zero Disruption",
    description: "Our VAs integrate with your EHR and phone systems from day one. No training, no downtime, no workflow changes.",
    stat: "48hr",
    statLabel: "Onboarding",
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Always Available",
    description: "Coverage across all U.S. time zones with options for after-hours, weekends, and holiday coverage to never miss a patient call.",
    stat: "24/7",
    statLabel: "Coverage",
    icon: Clock,
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "HIPAA Certified",
    description: "Every virtual assistant is HIPAA-trained, background-checked, and works on secure, compliant infrastructure.",
    stat: "100%",
    statLabel: "Compliant",
    icon: Shield,
    color: "from-orange-500 to-red-500",
  },
];

// ============================================================
// A DAY IN THE LIFE - VA DAILY SCHEDULE
// ============================================================

export const vaDaySchedule: VADaySchedule[] = [
  { time: "8:00 AM", task: "Review & prep patient charts for the day's appointments", category: "Admin", icon: ClipboardList },
  { time: "8:30 AM", task: "Confirm today's appointments via calls & texts", category: "Scheduling", icon: CalendarCheck },
  { time: "9:15 AM", task: "Handle inbound patient calls & route messages", category: "Communication", icon: Phone },
  { time: "10:00 AM", task: "Process insurance eligibility verifications", category: "Billing", icon: FileText },
  { time: "11:00 AM", task: "Follow up on prior authorization requests", category: "Admin", icon: ClipboardList },
  { time: "12:00 PM", task: "Post morning payments & reconcile ERA batches", category: "Billing", icon: DollarSign },
  { time: "1:30 PM", task: "Manage prescription refill requests & callbacks", category: "Communication", icon: MessageSquare },
  { time: "2:30 PM", task: "Outreach calls for care gaps & wellness reminders", category: "Quality", icon: Heart },
  { time: "3:30 PM", task: "Schedule next-day appointments from waitlist", category: "Scheduling", icon: CalendarCheck },
  { time: "4:30 PM", task: "End-of-day task summary & provider inbox clean-up", category: "Admin", icon: ClipboardList },
];

// ============================================================
// HOW IT WORKS - ONBOARDING PROCESS
// ============================================================

export const vaOnboardingSteps: VAOnboardingStep[] = [
  {
    step: 1,
    title: "Discovery Call",
    description: "We learn about your practice, workflows, EHR system, and specific needs to match you with the perfect VA.",
    detail: "30-minute consultation",
    icon: Phone,
    color: "from-blue-500 to-blue-600",
  },
  {
    step: 2,
    title: "VA Matching & Training",
    description: "We select a VA experienced with your specialty and EHR, then train them on your specific protocols and procedures.",
    detail: "Specialty-matched professionals",
    icon: Users,
    color: "from-purple-500 to-purple-600",
  },
  {
    step: 3,
    title: "System Integration",
    description: "Your VA connects to your EHR, phone system, and communication tools — ready to work as a seamless extension of your team.",
    detail: "Secure HIPAA-compliant setup",
    icon: Zap,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    step: 4,
    title: "Go Live & Optimize",
    description: "Your VA begins handling tasks with supervised support the first week, then runs independently with ongoing performance monitoring.",
    detail: "Live within 48 hours",
    icon: Star,
    color: "from-orange-500 to-orange-600",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const vaTestimonials: VATestimonial[] = [
  {
    quote:
      "Our virtual assistant handles 80% of our phone volume. My front desk staff finally has time to focus on patients in the office instead of being glued to the phone all day.",
    name: "Dr. Sarah Chen",
    role: "Practice Owner",
    specialty: "Family Medicine",
    metric: "80%",
    metricLabel: "Call Volume Handled",
    rating: 5,
  },
  {
    quote:
      "We went from a 15% no-show rate to under 4% within the first month. The confirmation calls and follow-ups our VA does are consistent, professional, and save us thousands in lost revenue.",
    name: "James Patterson",
    role: "Office Manager",
    specialty: "Dermatology",
    metric: "4%",
    metricLabel: "No-Show Rate",
    rating: 5,
  },
  {
    quote:
      "Hiring a full-time in-office billing person would cost us $55K+ a year. Our virtual assistant costs a third of that and handles the same workload with better accuracy. It's the best investment we've made.",
    name: "Dr. Michael Rivera",
    role: "Medical Director",
    specialty: "Multi-Specialty Group",
    metric: "60%",
    metricLabel: "Cost Savings",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const vaFAQs: VAFAQ[] = [
  {
    question: "How quickly can a virtual assistant start?",
    answer:
      "Most VAs are onboarded and productive within 48 hours. We handle all training on your specific EHR/PM system, phone protocols, and workflows. You'll have a brief orientation call, and then your VA begins handling tasks immediately with supervision during the first week.",
  },
  {
    question: "Are your virtual assistants HIPAA-compliant?",
    answer:
      "Yes — every VA undergoes rigorous HIPAA training and certification before being assigned. They work on dedicated, encrypted, HIPAA-compliant workstations with monitored internet access and secure VPN connections. We conduct annual re-certifications and audits.",
  },
  {
    question: "Can they use our existing EHR and phone system?",
    answer:
      "Absolutely. Our VAs are experienced with all major EHR/PM systems including Epic, Cerner, athenahealth, eClinicalWorks, Allscripts, AdvancedMD, and others. They connect to your phone system remotely and handle calls as if sitting in your office.",
  },
  {
    question: "What happens if our VA is sick or on vacation?",
    answer:
      "We provide guaranteed backup coverage. If your assigned VA is unavailable, a cross-trained backup VA who's already familiar with your practice protocols steps in seamlessly — no gap in service.",
  },
  {
    question: "How do you ensure quality and performance?",
    answer:
      "Every VA has a dedicated account manager who monitors performance metrics including call answer rates, task completion, patient satisfaction, and error rates. You receive monthly performance reports and can provide real-time feedback through our portal.",
  },
  {
    question: "Can we scale up or down as needed?",
    answer:
      "Yes — scaling is one of the biggest advantages. Need extra help during flu season or while onboarding a new provider? Just let us know, and we'll add VA hours within 48 hours. You can scale down just as easily during slower periods.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const vaPageMeta = {
  title: "Virtual Assistants | PhysicianMeds",
  description:
    "HIPAA-certified medical virtual assistants for scheduling, patient communication, billing support, and administrative tasks. Save 60% vs in-office staff.",

  servicesTitle: "Everything Your Practice Needs, Handled Remotely",
  servicesDescription:
    "Our virtual assistants are trained across six core healthcare operations areas — delivering the same quality as in-office staff at a fraction of the cost.",

  benefitsTitle: "Why Healthcare Practices Choose Virtual Assistants",
  benefitsDescription:
    "The numbers speak for themselves — virtual support delivers measurable results for practices of every size.",

  dayTitle: "A Day in the Life of Your Virtual Assistant",
  dayDescription:
    "See exactly what your VA handles in a typical workday — from morning prep to end-of-day wrap-up.",

  onboardingTitle: "Up and Running in 48 Hours",
  onboardingDescription:
    "From initial call to go-live, our streamlined onboarding process gets your virtual assistant working for you in as little as two days.",

  testimonialsTitle: "Trusted by Practices Nationwide",
  testimonialsSubtitle:
    "Hear from healthcare providers who have transformed their practice operations with our virtual assistants.",

  faqDescription:
    "Everything you need to know about our HIPAA-certified medical virtual assistant services.",

  bottomCTA: {
    title: "Ready to Transform Your Practice Operations?",
    description:
      "Join hundreds of practices that save time, reduce costs, and improve patient care with our dedicated virtual assistants. Get started in as little as 48 hours.",
    primaryButton: "Get Your Virtual Assistant",
  },
};
