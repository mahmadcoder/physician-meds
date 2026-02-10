import {
  ShieldCheck,
  Timer,
  BadgeCheck,
  FileCheck,
  ClipboardList,
  Headphones,
  Users,
  BarChart3,
  AlertTriangle,
  DollarSign,
  FileX,
  Building2,
  TrendingDown,
  Clock,
  Scale,
  CheckCircle,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// --- Types ---

export interface BillingHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BillingService {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BillingProcessStep {
  title: string;
  description: string;
}

export interface BillingStat {
  value: string;
  label: string;
  suffix?: string;
  icon: LucideIcon;
}

export interface BillingPainPoint {
  stat: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BillingFAQ {
  question: string;
  answer: string;
}

// --- Hero Data ---

export const billingHero = {
  badge: "Medical Billing Services",
  titleLine1: "Medical Billing That",
  titleHighlight: "Maximizes Reimbursements",
  description:
    "PhysicianMeds delivers end-to-end medical billing services that reduce denials, accelerate payments, and keep your practice 100% compliant. Our experts become an extension of your team — so you can focus on patient care.",
  ctaPrimary: "Book Free Consultation",
  ctaSecondary: "Talk to an Expert",
  images: {
    hero: "/services/images/medical-billing-1.jpg",
    process: "/services/images/medical-billing-2.jpg",
    specialties: "/services/images/medical-billing-3.jpg",
  },
};

// --- Trust Stats ---

export const billingStats: BillingStat[] = [
  { value: "98.5", suffix: "%", label: "First-Pass Claim Acceptance", icon: CheckCircle },
  { value: "95", suffix: "%", label: "Net Collection Rate", icon: TrendingUp },
  { value: "24/7", label: "Expert Support Available", icon: Headphones },
  { value: "35-45", suffix: "%", label: "Revenue Lift Potential", icon: DollarSign },
];

// --- Why Choose Us Highlights ---

export const billingHighlights: BillingHighlight[] = [
  {
    title: "Reduce Claim Denials",
    description:
      "Clean claims, accurate coding, and proactive edits help you avoid preventable denials and keep revenue flowing.",
    icon: ShieldCheck,
  },
  {
    title: "Accelerate Cash Flow",
    description:
      "Faster submissions, systematic follow-ups, and real-time posting keep your revenue moving without unnecessary delays.",
    icon: Timer,
  },
  {
    title: "Stay 100% Compliant",
    description:
      "We monitor payer rules, HIPAA standards, and regulatory changes continuously so you never have to worry about compliance.",
    icon: BadgeCheck,
  },
];

// --- Core Service Pillars ---

export const billingServices: BillingService[] = [
  {
    title: "Accurate Charge Capture",
    description:
      "We make sure every service is documented and billed correctly with ICD-10, CPT, and HCPCS codes aligned to payer requirements — reducing revenue loss from missed charges.",
    icon: FileCheck,
  },
  {
    title: "Claim Scrubbing & Submission",
    description:
      "Pre-submission checks catch errors before they become denials. We submit clean claims quickly and track them in real time through payer portals.",
    icon: ClipboardList,
  },
  {
    title: "Payer Follow-Up",
    description:
      "Dedicated outreach for underpaid, delayed, or rejected claims. We don't let a single dollar slip through the cracks.",
    icon: Headphones,
  },
  {
    title: "Patient Billing Support",
    description:
      "Clear statements, courteous reminders, and patient-friendly payment options that enhance satisfaction and improve collections.",
    icon: Users,
  },
  {
    title: "Denial & Appeal Management",
    description:
      "Root-cause analysis of every denial and timely, strategic appeals to recover maximum lost revenue.",
    icon: ShieldCheck,
  },
  {
    title: "Analytics & Reporting",
    description:
      "Transparent performance dashboards with actionable insights on collections, denials, aging, and payer trends.",
    icon: BarChart3,
  },
];

// --- Pain Points: Why Practices Struggle ---

export const billingPainPoints: BillingPainPoint[] = [
  {
    stat: "22-38%",
    title: "Claim Denials & Lost Revenue",
    description:
      "Up to 22–38% of collectible revenue is missed due to coding errors, incomplete documentation, or lack of specialty billing expertise.",
    icon: AlertTriangle,
  },
  {
    stat: "59%",
    title: "Secondary Claims Ignored",
    description:
      "Only 59% of secondary claims are filed, meaning a large portion of reimbursements never even make it to the payer.",
    icon: FileX,
  },
  {
    stat: "79%",
    title: "Too Many Payers to Manage",
    description:
      "Nearly 79% of providers deal with 10+ different insurance payers, each with different rules, forms, and updates.",
    icon: Building2,
  },
  {
    stat: "32%",
    title: "Weak Patient Collections",
    description:
      "Only 32% of patients who owe money actually receive a collection letter. Without proper follow-ups, thousands go uncollected.",
    icon: DollarSign,
  },
  {
    stat: "12%",
    title: "Outdated Fee Schedules",
    description:
      "Around 12% of practices never update their payer fee schedules, resulting in systematic underpayment.",
    icon: TrendingDown,
  },
  {
    stat: "55%",
    title: "Limited Use of Analytics",
    description:
      "Only 55% of practices use analytics to monitor revenue leaks, leading to missed opportunities for financial performance.",
    icon: Clock,
  },
];

// --- Process Steps ---

export const billingProcess: BillingProcessStep[] = [
  {
    title: "Patient Intake & Eligibility",
    description:
      "We verify patient demographics, insurance coverage, and benefits upfront to ensure clean, billable encounters from day one.",
  },
  {
    title: "Accurate Medical Coding",
    description:
      "Specialty-trained coders capture every service and apply precise ICD-10, CPT, and HCPCS code selection to maximize reimbursements.",
  },
  {
    title: "Claim Scrubbing & Validation",
    description:
      "Before submission, we review each claim against payer-specific rules to catch errors and minimize the risk of denials.",
  },
  {
    title: "Fast Electronic Submission",
    description:
      "Clean claims are submitted quickly through electronic clearinghouses, with real-time tracking at every step.",
  },
  {
    title: "Payment Posting & Reconciliation",
    description:
      "Payments and EOBs are reconciled accurately so you always know what was paid, what's pending, and why.",
  },
  {
    title: "Denial Resolution & Appeals",
    description:
      "Denied or underpaid claims are analyzed, corrected, and appealed promptly to recover every dollar you're owed.",
  },
];

// --- Specialties ---

export const billingSpecialties = [
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Radiology",
  "Gastroenterology",
  "Anesthesiology",
  "Internal Medicine",
  "Neurology",
  "Plastic Surgery",
  "Urology",
  "Pediatrics",
  "Primary Care",
  "General Surgery",
  "Ophthalmology",
  "ENT",
  "Psychiatry",
];

// --- FAQ ---

export const billingFAQs: BillingFAQ[] = [
  {
    question: "How fast can you onboard our practice?",
    answer:
      "Most practices are fully onboarded within 2-4 weeks, depending on data access, payer setup, and EHR integration requirements.",
  },
  {
    question: "Do you handle both primary and secondary claims?",
    answer:
      "Yes. We file and follow up on all primary and secondary claims to make sure no reimbursement is left on the table.",
  },
  {
    question: "How do you report performance?",
    answer:
      "We provide clear, detailed monthly reporting on collections, denials, accounts receivable aging, and payer trends — plus on-demand access to dashboards.",
  },
  {
    question: "Can you work with our current EHR or PM system?",
    answer:
      "Absolutely. We integrate seamlessly with all leading EHR/PM platforms including Epic, athenahealth, eClinicalWorks, Kareo, and more.",
  },
  {
    question:
      "What makes PhysicianMeds different from other billing companies?",
    answer:
      "We combine specialty-trained billing experts, AI-powered claim scrubbing, transparent pricing at 2.49% of collections, and 24/7 support — delivering real results, not just promises.",
  },
  {
    question: "Is there a long-term contract required?",
    answer:
      "No. We believe in earning your business every month. Our agreements are flexible with no long-term lock-ins.",
  },
];

// --- Testimonials ---

export interface BillingTestimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
  metric: string;
  metricLabel: string;
}

export const billingTestimonials: BillingTestimonial[] = [
  {
    name: "Dr. Patricia Okonkwo",
    role: "Practice Owner",
    specialty: "Internal Medicine",
    quote:
      "Before PhysicianMeds, our denial rate was 18%. Within 3 months, it dropped to under 5%. Their team handles everything — from claim scrubbing to appeals — so my staff can focus on patients.",
    rating: 5,
    metric: "5%",
    metricLabel: "Denial Rate",
  },
  {
    name: "Mark Sullivan",
    role: "CFO",
    specialty: "Multi-Specialty Clinic",
    quote:
      "We saw a 38% increase in collections in the first quarter. The real-time reporting dashboard gives us full visibility into every dollar. Best billing partner we've ever had.",
    rating: 5,
    metric: "38%",
    metricLabel: "More Collections",
  },
  {
    name: "Dr. Anita Sharma",
    role: "Medical Director",
    specialty: "Cardiology Group",
    quote:
      "Switching to PhysicianMeds was seamless. They onboarded our 8-provider practice in 10 days flat. Our cash flow has never been more consistent, and payer follow-up is exceptional.",
    rating: 5,
    metric: "10 Days",
    metricLabel: "Full Onboarding",
  },
];

// --- Page Meta ---

export const billingPageMeta = {
  painPointsTitle: "Why 72% of Practices Struggle to Collect Full Revenue",
  painPointsDescription:
    "Medical billing is far more complicated than it seems. Even small mistakes and delays can cause significant revenue loss.",
  servicesTitle: "End-to-End Medical Billing Services That Work Together",
  servicesDescription:
    "Every step of the revenue cycle is managed by specialists, so your team can focus on what matters most — patient care.",
  processTitle: "Our Proven Billing Workflow",
  processDescription:
    "Each stage is designed to keep claims clean, payments fast, and reporting crystal clear.",
  specialtiesTitle: "Billing Expertise Across 100+ Specialties",
  specialtiesDescription:
    "Whether you're a small practice or a multi-provider organization, our billing specialists understand your specialty's unique requirements.",
  faqTitle: "Common Medical Billing Questions",
  faqDescription:
    "Clear, transparent communication is part of how we build trust with every practice we serve.",
  resultTitle: "The Result?",
  resultDescription:
    "Faster payments, fewer denials, and up to 35–45% increase in net collections within months of partnering with PhysicianMeds.",
  ctaTitle: "Ready to Optimize Your Medical Billing?",
  ctaDescription:
    "Let our experts review your current billing process and show you how much more you can collect. Your free consultation is just one click away.",
  complianceIcon: Scale,
};
