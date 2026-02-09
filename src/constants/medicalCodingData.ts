import {
  ShieldCheck,
  FileCheck,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  DollarSign,
  FileX,
  TrendingDown,
  Clock,
  Stethoscope,
  Search,
  Activity,
  Zap,
  Heart,
  Lock,
  Users,
  Target,
  Award,
  type LucideIcon,
} from "lucide-react";

// --- Types ---

export interface CodingService {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface CodingProcessStep {
  title: string;
  description: string;
}

export interface CodingStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface CodingPainPoint {
  stat: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CodingFAQ {
  question: string;
  answer: string;
}

export interface CodingBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CodingAuditService {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CodingChallenge {
  abbr: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  us: string;
  competitors: string;
}

export interface CodingTestimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
}

// --- Hero ---

export const codingHero = {
  badge: "Medical Coding Services",
  titleLine1: "HIPAA-Compliant",
  titleHighlight: "Medical Coding",
  titleLine2: "Services",
  description:
    "Our AAPC and AHIMA-certified medical coding experts transform your clinical documentation into clean, compliant codes — driving revenue growth, reducing denials, and keeping your practice 100% compliant.",
  ctaPrimary: "Book Free Consultation",
  ctaSecondary: "Talk to a Coding Expert",
  heroPoints: [
    "99% Accurate Code Assignments",
    "Up to 30% Revenue Recovery",
    "24/7 Expert Support Available",
  ],
  images: {
    hero: "/services/images/medical-coding-1.jpg",
    process: "/services/images/medical-coding-2.jpg",
    audit: "/services/images/medical-coding-3.jpg",
  },
};

// --- Stats ---

export const codingStats: CodingStat[] = [
  { value: "100", suffix: "%", label: "HIPAA Compliant" },
  { value: "30", suffix: "%", label: "Revenue Increase" },
  { value: "99", suffix: "%", label: "Code Accuracy" },
  { value: "98.5", suffix: "%", label: "First-Pass Acceptance" },
];

// --- Why Accurate Coding Matters ---

export const codingPainPoints: CodingPainPoint[] = [
  {
    stat: "30%",
    title: "Revenue Lost to Coding Errors",
    description:
      "Healthcare practices lose up to 30% of revenue annually due to inaccurate, incomplete, or outdated medical coding.",
    icon: DollarSign,
  },
  {
    stat: "63%",
    title: "Denials from Coding Issues",
    description:
      "Over 63% of claim denials are directly linked to coding errors, missing modifiers, or documentation mismatches.",
    icon: FileX,
  },
  {
    stat: "45%",
    title: "Undercoding Revenue Gap",
    description:
      "Many practices systematically undercode to avoid audits, leaving up to 45% of legitimate revenue unclaimed.",
    icon: TrendingDown,
  },
  {
    stat: "12%",
    title: "Outdated Code Sets in Use",
    description:
      "Around 12% of practices still use outdated code sets, leading to automatic rejections and compliance risks.",
    icon: Clock,
  },
  {
    stat: "22%",
    title: "Higher Audit Risk",
    description:
      "Practices with inconsistent coding face 22% higher audit rates from payers and regulatory bodies.",
    icon: AlertTriangle,
  },
  {
    stat: "8-12",
    title: "Extra A/R Days from Rework",
    description:
      "Coding rework and resubmissions add 8-12 days to accounts receivable, delaying cash flow significantly.",
    icon: Clock,
  },
];

// --- Core Coding Services ---

export const codingServices: CodingService[] = [
  {
    title: "Procedural Coding (CPT)",
    description:
      "Every procedure is captured with precise CPT codes — from diagnostic tests to treatments and therapies — ensuring maximum reimbursement rates.",
    icon: FileCheck,
    color: "bg-blue-500",
  },
  {
    title: "Diagnostic Coding (ICD-10-CM)",
    description:
      "We link patient diagnoses to the right ICD-10-CM codes, justifying medical necessity and reducing denials while maintaining compliance.",
    icon: Stethoscope,
    color: "bg-emerald-500",
  },
  {
    title: "Inpatient Coding (DRG)",
    description:
      "Accurate DRG and ICD-10-PCS coding for hospitals and acute care — from complex surgeries to extended stays — maximizing cash flow.",
    icon: Activity,
    color: "bg-purple-500",
  },
  {
    title: "Outpatient Coding (APC)",
    description:
      "For clinics, urgent care, and same-day surgery centers — accurate CPT, APC, and ICD-10 codes that keep denials low and payments fast.",
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    title: "HCPCS Level II Coding",
    description:
      "Supplies, equipment, prosthetics, medications, and ambulance rides properly coded so your practice never misses billable revenue.",
    icon: ClipboardList,
    color: "bg-pink-500",
  },
  {
    title: "Risk Adjustment (HCC)",
    description:
      "Accurate capture of chronic conditions and risk factors — ensuring fair reimbursements in Medicare Advantage and value-based care programs.",
    icon: Heart,
    color: "bg-red-500",
  },
  {
    title: "E/M Coding",
    description:
      "Expert Evaluation & Management coding for office visits, consultations, and follow-ups — one of the most commonly audited areas done right.",
    icon: Search,
    color: "bg-cyan-500",
  },
  {
    title: "Surgical Coding",
    description:
      "Complex surgeries with multiple steps, combined services, and special modifier rules — all documented and coded correctly.",
    icon: ShieldCheck,
    color: "bg-indigo-500",
  },
  {
    title: "Coding Audits & Consultancy",
    description:
      "Detailed record reviews, risk identification, missed revenue opportunities, and expert recommendations for better accuracy and compliance.",
    icon: BarChart3,
    color: "bg-teal-500",
  },
];

// --- Process Steps ---

export const codingProcess: CodingProcessStep[] = [
  {
    title: "Review Clinical Notes",
    description:
      "We carefully gather and analyze patient medical records, visit details, and clinical documentation.",
  },
  {
    title: "Assign Accurate Codes",
    description:
      "Certified coders apply the correct ICD-10, CPT, HCPCS, or DRG codes for every service and diagnosis.",
  },
  {
    title: "Verify & Validate",
    description:
      "We double-check all codes for errors, missing modifiers, and documentation alignment to ensure completeness.",
  },
  {
    title: "Submit Clean Claims",
    description:
      "Clean, coded claims are sent to payers electronically for fast processing and maximum acceptance rates.",
  },
  {
    title: "Track & Follow Up",
    description:
      "Our team monitors claim status and quickly addresses any denials, corrections, or underpayments.",
  },
];

// --- Complex Coding Challenges ---

export const codingChallenges: CodingChallenge[] = [
  {
    abbr: "OFC",
    title: "Outstanding Financial Class",
    description:
      "Patient accounts that remain unpaid due to pending insurance eligibility, verification, or processing. We resolve OFC delays by verifying insurance details upfront and speeding up approvals.",
  },
  {
    abbr: "DNFB",
    title: "Discharged Not Final Billed",
    description:
      "Claims that remain unbilled after patient discharge due to incomplete coding. We reduce DNFB by ensuring records are coded quickly and accurately so claims are submitted without delays.",
  },
  {
    abbr: "DRG",
    title: "Diagnosis-Related Group",
    description:
      "A system used by Medicare to categorize inpatient cases and determine payment. Our CDI-infused DRG coding ensures each case is grouped correctly for optimized revenue recovery.",
  },
  {
    abbr: "RAF",
    title: "Risk Adjustment Factor Score",
    description:
      "A measure of a patient's expected healthcare costs based on diagnosis and demographics. We ensure every condition is accurately documented so your RAF scores reflect true patient severity.",
  },
  {
    abbr: "DNFC",
    title: "Discharged Not Final Coded",
    description:
      "When a patient's chart remains uncoded after discharge, delaying claim submission. Our team provides timely coding to prevent backlogs and avoid revenue loss.",
  },
  {
    abbr: "CMI",
    title: "Case Mix Index",
    description:
      "Reflects the overall complexity and severity of care provided. We improve CMI accuracy by ensuring every procedure and diagnosis is properly documented and coded.",
  },
];

// --- Comparison Table ---

export const codingComparison: ComparisonRow[] = [
  {
    feature: "Accuracy & Compliance",
    us: "99.9% accuracy with ICD-10, CPT, HCPCS, DRG, and APC coding by certified coders.",
    competitors:
      "Low accuracy levels leading to errors, resubmissions, and compliance risks.",
  },
  {
    feature: "Specialty Coverage",
    us: "Specialty-specific expert coders for all 100+ medical specialties.",
    competitors:
      "Limited specialty coverage with no specialty-specific coders.",
  },
  {
    feature: "Audit & Risk Management",
    us: "Regular coding audits, CDI support, and proactive denial prevention strategies.",
    competitors:
      "Reactive approach — issues addressed only after denials or audits.",
  },
  {
    feature: "Technology & Transparency",
    us: "Advanced tools for real-time tracking, reporting, and full performance visibility.",
    competitors: "Limited transparency; reporting is often delayed or unclear.",
  },
  {
    feature: "Flexibility & Scalability",
    us: "Customized solutions for small practices, large facilities, or full outsourcing.",
    competitors: "One-size-fits-all model with little to no customization.",
  },
  {
    feature: "Cost Efficiency",
    us: "Reduce overhead costs with top-tier expertise at competitive pricing.",
    competitors: "Higher outsourcing costs with inconsistent quality.",
  },
];

// --- Testimonials ---

export const codingTestimonials: CodingTestimonial[] = [
  {
    name: "Dr. Karen Lee",
    role: "Practice Owner",
    specialty: "Pediatrics",
    quote:
      "With PhysicianMeds handling our coding, collections have consistently been above 85%. They handle patient-billing communications too, which improved satisfaction. Highly recommended.",
    rating: 5,
    metric: "85%+",
    metricLabel: "Collection Rate",
  },
  {
    name: "Dr. Samuel Nguyen",
    role: "Chief of Surgery",
    specialty: "Orthopedics",
    quote:
      "Their team understood our specialty's coding challenges and negotiated better payer contracts. Our reimbursement per procedure went up, and we finally feel they have our back.",
    rating: 5,
    metric: "32%",
    metricLabel: "Higher Reimbursement",
  },
  {
    name: "Rebecca Gomez",
    role: "COO",
    specialty: "Urgent Care Network",
    quote:
      "Transitioning to PhysicianMeds was the easiest business change we've made. They handled credentialing, legacy data migration, and we experienced minimal disruption.",
    rating: 5,
    metric: "2 Weeks",
    metricLabel: "Full Transition",
  },
];

// --- Outsourcing Benefits ---

export const codingBenefits: CodingBenefit[] = [
  {
    title: "Higher Reimbursements",
    description:
      "Clean, accurate claims lead to faster approvals and maximum payouts for every service.",
    icon: DollarSign,
  },
  {
    title: "Faster Payments",
    description:
      "Organized submissions and timely follow-ups shorten the payment cycle and improve cash flow.",
    icon: Zap,
  },
  {
    title: "Stronger Compliance",
    description:
      "Stay fully aligned with ICD-10, CPT, HCPCS, HIPAA, and CMS standards without stress.",
    icon: Lock,
  },
  {
    title: "Fewer Denials",
    description:
      "Expert coding and preventive auditing significantly reduce errors that lead to rejected claims.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Support",
    description:
      "Whether you're a solo practitioner or large healthcare system, our services scale with your needs.",
    icon: Users,
  },
  {
    title: "More Time for Patients",
    description:
      "Free your care team from admin overload so they can focus on delivering quality patient care.",
    icon: Heart,
  },
  {
    title: "Specialty Expertise",
    description:
      "Access to coders trained in 100+ specialties, from primary care to advanced surgical fields.",
    icon: Target,
  },
  {
    title: "Reduced DNFB & Backlogs",
    description:
      "Clear discharged-not-final-billed cases and coding backlogs efficiently — no billing delays.",
    icon: Activity,
  },
  {
    title: "Certified Excellence",
    description:
      "AAPC and AHIMA-certified coders with ongoing training on latest CMS updates and guidelines.",
    icon: Award,
  },
];

// --- Why Choose Us Points ---

export const codingWhyChoose = [
  "Certified coders trained across ICD-10, CPT, HCPCS, DRG, APC, and HCC.",
  "Continuous training and audits to prevent upcoding or downcoding errors.",
  "Specialty-focused support for 100+ medical areas.",
  "Compliance-driven processes that reduce legal and financial risks.",
  "Dedicated account managers and ongoing education for your team.",
  "Full HIPAA compliance with enterprise-grade data security.",
];

// --- Specialties ---

export const codingSpecialties = [
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
  "Family Medicine",
  "Behavioral Health",
  "Pulmonology",
  "Rheumatology",
];

// --- FAQ ---

export const codingFAQs: CodingFAQ[] = [
  {
    question: "What coding standards do your coders follow?",
    answer:
      "Our coders are AAPC and AHIMA-certified, trained across ICD-10-CM, ICD-10-PCS, CPT, HCPCS, DRG, APC, and HCC coding systems. They stay current with annual CMS updates and payer-specific guidelines.",
  },
  {
    question: "How does outsourcing coding reduce claim denials?",
    answer:
      "By ensuring accurate code assignment, proper modifier usage, and documentation alignment upfront, we prevent the common errors that cause over 63% of claim denials before they happen.",
  },
  {
    question: "Can you handle specialty-specific coding?",
    answer:
      "Absolutely. We assign specialty-trained coders to your practice — covering 100+ specialties from cardiology and orthopedics to behavioral health with deep domain knowledge.",
  },
  {
    question: "Do you offer coding audits for existing practices?",
    answer:
      "Yes. Our coding audit services review your existing records, identify revenue leakage, flag compliance risks, and provide actionable recommendations to improve accuracy and collections.",
  },
  {
    question: "How quickly can you start coding for our practice?",
    answer:
      "Most practices are onboarded within 1-2 weeks. We integrate with your existing EHR/PM system and begin coding with minimal disruption to your daily workflow.",
  },
  {
    question: "Is my patient data safe with PhysicianMeds?",
    answer:
      "100%. We are fully HIPAA-compliant with enterprise-grade encryption, firewalls, and access controls. We also comply with MIPS, QPP, MACRA, and all applicable federal data regulations.",
  },
  {
    question:
      "What is the difference between medical coding and medical billing?",
    answer:
      "Medical coding translates clinical documentation into standardized codes (ICD-10, CPT, HCPCS), while medical billing uses those codes to create and submit claims to insurance payers for reimbursement. Both are critical parts of the revenue cycle.",
  },
  {
    question: "Do you provide real-time reporting on coding performance?",
    answer:
      "Yes. We provide transparent performance tracking dashboards with real-time reporting on code accuracy, denial rates, turnaround times, and revenue impact — so you always have full visibility.",
  },
];

// --- Page Meta ---

export const codingPageMeta = {
  painPointsTitle: "Losing Revenue Due to Coding Errors?",
  painPointsDescription:
    "Every year, healthcare practices lose significant revenue due to inaccurate and incomplete medical coding. Here's what the data reveals about the true cost of coding errors.",
  whyAccurateTitle: "Why Is Accurate Coding Necessary?",
  whyAccurateDescription:
    "Inaccurate coding doesn't just slow down cash flow — it creates roadblocks in patient care. When done right, coding captures the complete patient care journey, reduces denials, and keeps your practice compliant.",
  servicesTitle: "Complete Medical Coding Solutions",
  servicesDescription:
    "From procedural and diagnostic coding to risk adjustment and surgical coding — our certified experts cover the full spectrum of healthcare coding needs.",
  processTitle: "How Our Coding Process Works",
  processDescription:
    "A systematic, quality-controlled workflow that turns clinical documentation into clean, compliant codes ready for billing.",
  challengesTitle: "Navigating Complex Coding Challenges",
  challengesDescription:
    "Healthcare RCM involves complex procedures that directly affect reimbursements. Our experts help your practice navigate these with confidence.",
  comparisonTitle: "Why Choose PhysicianMeds Over Others?",
  comparisonDescription:
    "See how our medical coding services compare to typical competitors across the factors that matter most.",
  benefitsTitle: "Benefits of Outsourcing Your Coding",
  benefitsDescription:
    "Partnering with PhysicianMeds offers far more than cost savings — it transforms your revenue cycle and increases overall efficiency.",
  specialtiesTitle: "Multi-Specialty Coding Expertise",
  specialtiesDescription:
    "Each specialty comes with unique coding challenges, guidelines, and modifiers. We assign specialty-specific coders for accurate claim processing and fewer errors.",
  faqTitle: "Medical Coding Questions Answered",
  faqDescription:
    "Get clear answers to common questions about our coding services, compliance standards, and how we can help your practice.",
  ctaTitle: "Get Your Free Coding Audit — No Strings Attached",
  ctaDescription:
    "Let our USA-trained coders review your records, identify where revenue is slipping away, and highlight areas for improvement. No fees — just honest insight to help your practice get paid what it deserves.",
  hipaaTitle: "100% HIPAA-Compliant Coding",
  hipaaDescription:
    "We use enterprise-grade encryption, firewalls, and access controls. Beyond HIPAA, we comply with MIPS, CPC+, QPP, MACRA, and MSSP — guaranteeing 99.9% accuracy and full data security.",
  whyChooseTitle: "Why Choose PhysicianMeds Coding Services?",
  whyChooseDescription:
    "Accurate coding is the backbone of a healthy revenue cycle. Under the Affordable Care Act, it's now a legal requirement for providers to maintain accurate records of services and costs.",
};
