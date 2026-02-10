import {
  ShieldCheck,
  Users,
  FileText,
  AlertCircle,
  Building2,
  RefreshCw,
  Layers,
  BarChart3,
  Zap,
  CheckCircle,
  Shield,
  type LucideIcon,
} from "lucide-react";

// --- Types ---

export interface CEService {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface CEProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export interface CEStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface CERisk {
  title: string;
  description: string;
  icon: LucideIcon;
  impact: string;
}

export interface CEFAQ {
  question: string;
  answer: string;
}

export interface CETestimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
  metric: string;
  metricLabel: string;
}

export interface CEPayerNetwork {
  name: string;
  type: string;
}

export interface CEChecklistItem {
  title: string;
  description: string;
  required: boolean;
}

// --- Hero ---

export const ceHero = {
  badge: "Credentialing & Enrollment",
  titleLine1: "Fast-Track Your",
  titleHighlight: "Provider Credentialing",
  titleLine2: "& Payer Enrollment",
  description:
    "PhysicianMeds handles every step of provider credentialing and payer enrollment — from initial application to final approval. Get credentialed faster, eliminate rejections, and start billing sooner with zero hassle.",
  ctaPrimary: "Start Credentialing Now",
  ctaSecondary: "Speak to an Expert",
  heroPoints: [
    "60% faster credentialing turnaround",
    "99.8% first-pass approval rate",
    "Zero revenue gaps from delayed enrollment",
  ],
  images: {
    hero: "/services/images/credential-enrollment-1.jpg",
    process: "/services/images/credential-enrollment-2.jpg",
    checklist: "/services/images/credential-enrollment-3.jpg",
  },
};

// --- Stats ---

export const ceStats: CEStat[] = [
  { value: "60", suffix: "%", label: "Faster Credentialing", icon: Zap },
  { value: "99.8", suffix: "%", label: "First-Pass Approval", icon: CheckCircle },
  { value: "500", suffix: "+", label: "Providers Credentialed", icon: Users },
  { value: "50", suffix: "+", label: "Insurance Networks", icon: Shield },
];

// --- Core Services ---

export const ceServices: CEService[] = [
  {
    title: "Initial Provider Credentialing",
    description:
      "Complete credentialing for new providers — from application prep and document gathering to primary source verification and committee review follow-up.",
    icon: ShieldCheck,
    features: [
      "CAQH profile setup & management",
      "Primary source verification",
      "Application submission & tracking",
      "Committee review follow-up",
    ],
  },
  {
    title: "Payer Enrollment & Contracting",
    description:
      "Get enrolled with commercial, government, and managed care payers. We negotiate favorable contracts and manage the entire enrollment lifecycle.",
    icon: FileText,
    features: [
      "Medicare & Medicaid enrollment",
      "Commercial payer applications",
      "Contract negotiation support",
      "Fee schedule analysis",
    ],
  },
  {
    title: "Re-Credentialing & Maintenance",
    description:
      "Never miss a re-credentialing deadline. We track expiration dates, manage renewals, and ensure continuous participation in all your payer networks.",
    icon: RefreshCw,
    features: [
      "Automated expiration tracking",
      "Proactive re-credentialing",
      "License & certification renewals",
      "Continuous compliance monitoring",
    ],
  },
  {
    title: "Hospital & Facility Privileges",
    description:
      "Secure clinical privileges at hospitals, surgical centers, and healthcare facilities. We handle the complex application process end to end.",
    icon: Building2,
    features: [
      "Hospital privilege applications",
      "Surgical center enrollment",
      "Telehealth credentialing",
      "Multi-state licensing support",
    ],
  },
  {
    title: "CAQH & NPI Management",
    description:
      "Keep your CAQH profile current and accurate. We manage NPI registrations, PECOS enrollment, and ensure all directories reflect correct information.",
    icon: Layers,
    features: [
      "CAQH ProView management",
      "NPI registration & updates",
      "PECOS enrollment",
      "Provider directory accuracy",
    ],
  },
  {
    title: "Group Practice Enrollment",
    description:
      "Enroll entire practice groups, add new providers to existing contracts, and manage multi-location credentialing with streamlined processes.",
    icon: Users,
    features: [
      "Group NPI management",
      "Provider additions & terminations",
      "Multi-location enrollment",
      "Roster management",
    ],
  },
];

// --- Process Steps ---

export const ceProcess: CEProcessStep[] = [
  {
    step: "01",
    title: "Document Collection",
    description: "We gather all required documents — licenses, certifications, malpractice history, education verification, and work history.",
    duration: "Days 1-3",
  },
  {
    step: "02",
    title: "Application Preparation",
    description: "Our team prepares and reviews all applications for accuracy, completeness, and compliance with payer-specific requirements.",
    duration: "Days 3-7",
  },
  {
    step: "03",
    title: "Submission & Tracking",
    description: "Applications are submitted to all target payers simultaneously. We actively track status and follow up on any delays or requests.",
    duration: "Days 7-14",
  },
  {
    step: "04",
    title: "Follow-Up & Resolution",
    description: "We manage all payer communications, resolve deficiencies, and escalate stalled applications to ensure timely approval.",
    duration: "Days 14-45",
  },
  {
    step: "05",
    title: "Approval & Activation",
    description: "Once approved, we verify effective dates, update all systems, and ensure you can start billing immediately — zero revenue gaps.",
    duration: "Days 45-60",
  },
];

// --- Risks of Poor Credentialing ---

export const ceRisks: CERisk[] = [
  {
    title: "Revenue Loss",
    description: "Delayed credentialing means providers can't bill insurance, causing thousands in lost revenue per week.",
    icon: BarChart3,
    impact: "$10K+/week",
  },
  {
    title: "Claim Denials",
    description: "Claims submitted before credentialing is complete are automatically denied by payers.",
    icon: AlertCircle,
    impact: "100% rejection",
  },
  {
    title: "Compliance Violations",
    description: "Lapsed credentials or missed re-credentialing deadlines can result in fines and network termination.",
    icon: ShieldCheck,
    impact: "Network loss",
  },
  {
    title: "Provider Frustration",
    description: "Lengthy credentialing delays frustrate new hires, impacting recruitment and retention.",
    icon: Users,
    impact: "3-6 months avg.",
  },
];

// --- Credentialing Checklist ---

export const ceChecklist: CEChecklistItem[] = [
  { title: "Medical License (state-specific)", description: "Active, unrestricted medical license for each practicing state.", required: true },
  { title: "DEA Certificate", description: "Valid Drug Enforcement Administration registration.", required: true },
  { title: "Board Certification", description: "Board certification or eligibility documentation.", required: true },
  { title: "Malpractice Insurance", description: "Current professional liability coverage with adequate limits.", required: true },
  { title: "NPI Number", description: "Active individual and/or organizational NPI.", required: true },
  { title: "CAQH Profile", description: "Complete and attested CAQH ProView profile.", required: true },
  { title: "Education & Training Records", description: "Medical school diploma, residency, and fellowship documentation.", required: true },
  { title: "Work History (5+ years)", description: "Complete employment history with no unexplained gaps.", required: true },
  { title: "Hospital Privilege Letters", description: "Current privilege status from affiliated hospitals.", required: false },
  { title: "Professional References", description: "Peer references from licensed physicians in same specialty.", required: false },
];

// --- Payer Networks ---

export const cePayerNetworks: CEPayerNetwork[] = [
  { name: "Medicare", type: "Government" },
  { name: "Medicaid", type: "Government" },
  { name: "Blue Cross Blue Shield", type: "Commercial" },
  { name: "Aetna", type: "Commercial" },
  { name: "UnitedHealthcare", type: "Commercial" },
  { name: "Cigna", type: "Commercial" },
  { name: "Humana", type: "Commercial" },
  { name: "Tricare", type: "Government" },
  { name: "Anthem", type: "Commercial" },
  { name: "Molina Healthcare", type: "Managed Care" },
  { name: "Centene", type: "Managed Care" },
  { name: "Magellan Health", type: "Managed Care" },
  { name: "WellCare", type: "Managed Care" },
  { name: "Oscar Health", type: "Commercial" },
];

// --- Testimonials ---

export const ceTestimonials: CETestimonial[] = [
  {
    name: "Dr. Emily Carter",
    role: "Practice Owner",
    specialty: "Dermatology",
    quote:
      "PhysicianMeds got me credentialed with 12 payers in under 45 days. My previous billing company took over 6 months and still had issues. The difference is night and day.",
    rating: 5,
    metric: "45 Days",
    metricLabel: "12 Payer Enrollment",
  },
  {
    name: "Robert Kim, MBA",
    role: "Operations Director",
    specialty: "Multi-Provider Group",
    quote:
      "We onboarded 5 new providers last quarter and PhysicianMeds handled all credentialing simultaneously. Not a single revenue gap — every provider started billing on day one.",
    rating: 5,
    metric: "0 Days",
    metricLabel: "Revenue Gap",
  },
  {
    name: "Dr. Lisa Martinez",
    role: "Medical Director",
    specialty: "Behavioral Health",
    quote:
      "Re-credentialing used to be a nightmare — we'd get dropped from panels without warning. PhysicianMeds tracks every deadline and handles renewals proactively. We haven't had a single lapse.",
    rating: 5,
    metric: "100%",
    metricLabel: "On-Time Renewals",
  },
];

// --- FAQ ---

export const ceFAQs: CEFAQ[] = [
  {
    question: "How long does provider credentialing typically take?",
    answer:
      "Traditional credentialing takes 90-180 days. With PhysicianMeds, we expedite the process to 45-60 days on average by submitting to multiple payers simultaneously, proactively following up, and resolving issues before they cause delays.",
  },
  {
    question: "What's the difference between credentialing and enrollment?",
    answer:
      "Credentialing verifies a provider's qualifications — education, licenses, certifications, and work history. Enrollment is the process of getting approved by specific insurance payers so you can bill them for services. Both are required before you can receive insurance reimbursement.",
  },
  {
    question: "Do you handle re-credentialing and renewals?",
    answer:
      "Yes. We proactively track all credentialing expiration dates and initiate re-credentialing well before deadlines. This prevents gaps in network participation, ensuring uninterrupted billing and revenue flow.",
  },
  {
    question: "Can you credential providers in multiple states?",
    answer:
      "Absolutely. We handle multi-state licensing and credentialing for providers who practice across state lines, including telehealth providers who need to be credentialed in multiple states simultaneously.",
  },
  {
    question: "What documents do I need to get started?",
    answer:
      "You'll need your medical license, DEA certificate, board certification, NPI number, malpractice insurance, CAQH profile, education records, and work history. We provide a complete checklist and help you gather everything efficiently.",
  },
  {
    question: "Do you help with CAQH profile management?",
    answer:
      "Yes. We set up, maintain, and regularly attest your CAQH ProView profile. Many credentialing delays stem from incomplete or outdated CAQH data — we ensure your profile is always current and complete.",
  },
  {
    question: "What happens if a credentialing application is denied?",
    answer:
      "Denials are rare with our 99.8% approval rate, but if one occurs, we immediately identify the reason, prepare an appeal with supporting documentation, and resubmit. We've successfully overturned the vast majority of initial denials.",
  },
  {
    question: "Can you enroll an entire group practice at once?",
    answer:
      "Yes. We specialize in group practice enrollment — managing the group NPI, individual provider credentialing, roster updates, and multi-location enrollment as a coordinated process.",
  },
];

// --- Page Meta ---

export const cePageMeta = {
  risksTitle: "The True Cost of Credentialing Delays",
  risksDescription:
    "Every week without proper credentialing means lost revenue, denied claims, and frustrated providers. See what's at stake.",
  servicesTitle: "Complete Credentialing & Enrollment Services",
  servicesDescription:
    "From initial provider credentialing to payer enrollment and ongoing maintenance — we manage the entire lifecycle so you never miss a billing day.",
  processTitle: "Our Proven 5-Step Credentialing Process",
  processDescription:
    "A streamlined, transparent process designed to get your providers credentialed and billing as fast as possible.",
  checklistTitle: "Provider Credentialing Checklist",
  checklistDescription:
    "Everything your providers need to have ready for a smooth credentialing process. We help you gather and verify each item.",
  networksTitle: "Payer Networks We Cover",
  networksDescription:
    "We manage credentialing and enrollment with 50+ insurance payers — from government programs to major commercial and managed care networks.",
  faqTitle: "Credentialing & Enrollment FAQs",
  faqDescription:
    "Get answers to the most common questions about provider credentialing, payer enrollment, and how we simplify the process.",
  ctaTitle: "Start Your Credentialing Today — Free Consultation",
  ctaDescription:
    "Don't let credentialing delays cost you revenue. Our experts will assess your current status and create a fast-track plan to get you billing sooner.",
};
