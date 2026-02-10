import {
  TrendingUp,
  Users,
  Calendar,
  Award,
  MapPin,
  Heart,
  Star,
  FileText,
  Send,
  DollarSign,
  CheckCircle,
  Clock,
  Target,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface OutOfNetworkStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface ComparisonPoint {
  inNetwork: string;
  outOfNetwork: string;
  advantage: "in" | "out" | "neutral";
}

export interface ReimbursementBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  timeline: string;
}

export interface Scenario {
  category: string;
  description: string;
  icon: LucideIcon;
  reimbursementRate: string;
  complexity: "Critical" | "High" | "Medium";
  examples: string[];
}

export interface OutOfNetworkCaseStudy {
  specialty: string;
  problem: string;
  denialRate: string;
  solution: string;
  result: {
    denialRate: string;
    recoveredAmount: string;
    timeframe: string;
  };
  testimonial: string;
  author: string;
  role: string;
}

export interface OutOfNetworkFAQ {
  question: string;
  answer: string;
}

export interface OutOfNetworkTestimonial {
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

export const oonHero = {
  badge: "Out of Network Specialists",
  titleLine1: "Maximize Reimbursement for",
  titleHighlight: "Out-of-Network Services",
  titleLine2: "with Expert Billing Support",
  description:
    "PhysicianMeds specializes in out-of-network billing, helping providers achieve up to 95% reimbursement rates while maintaining patient satisfaction. Our expert team handles the complexities of OON claims, so you can focus on delivering exceptional care without network restrictions.",
  ctaPrimary: "Get Free Quote",
  ctaSecondary: "Speak with Expert",
  heroPoints: [
    "95% average reimbursement success rate",
    "Higher revenue potential than in-network",
    "No network restrictions or limitations",
  ],
  images: {
    hero: "/services/images/out-of-network-1.jpg",
    dashboard: "/services/images/out-of-network-2.jpg",
    results: "/services/images/out-of-network-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const oonStats: OutOfNetworkStat[] = [
  {
    value: "95",
    suffix: "%",
    label: "Reimbursement Success Rate",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
  {
    value: "$2.8M",
    suffix: "+",
    label: "Recovered in 2024",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    value: "45",
    suffix: " Days",
    label: "Avg Reimbursement Time",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    value: "98",
    suffix: "%",
    label: "Patient Satisfaction",
    icon: Heart,
    color: "text-pink-600",
  },
];

// ============================================================
// IN-NETWORK VS OUT-OF-NETWORK COMPARISON
// ============================================================

export const oonComparison: ComparisonPoint[] = [
  {
    inNetwork: "Limited to contracted providers only",
    outOfNetwork: "Freedom to choose any provider",
    advantage: "out",
  },
  {
    inNetwork: "Capped reimbursement rates per contract",
    outOfNetwork: "Charge usual and customary rates",
    advantage: "out",
  },
  {
    inNetwork: "Network restrictions may delay care",
    outOfNetwork: "Immediate access to specialists",
    advantage: "out",
  },
  {
    inNetwork: "Lower administrative overhead",
    outOfNetwork: "Requires expert billing support",
    advantage: "in",
  },
  {
    inNetwork: "Guaranteed payment (if credentialed)",
    outOfNetwork: "Higher revenue per service",
    advantage: "out",
  },
  {
    inNetwork: "Limited patient choice",
    outOfNetwork: "Attracts premium patients",
    advantage: "out",
  },
];

// ============================================================
// REIMBURSEMENT BENEFITS
// ============================================================

export const oonBenefits: ReimbursementBenefit[] = [
  {
    title: "Higher Reimbursement Rates",
    description:
      "Charge your usual and customary rates without network contract limitations, typically 30-40% higher than in-network.",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
  {
    title: "Expand Patient Choice",
    description:
      "Attract patients seeking specific expertise regardless of network status, expanding your patient base.",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Access Premium Specialists",
    description:
      "Patients can see top specialists in their field without waiting for network approvals or referrals.",
    icon: Award,
    color: "bg-purple-500",
  },
  {
    title: "No Network Restrictions",
    description:
      "Practice medicine without insurance company interference, treatment limitations, or pre-authorization delays.",
    icon: Shield,
    color: "bg-indigo-500",
  },
  {
    title: "Faster Appointments",
    description:
      "Reduce wait times for patients who need specialized care urgently without network scheduling constraints.",
    icon: Calendar,
    color: "bg-orange-500",
  },
  {
    title: "Better Patient Match",
    description:
      "Patients choose providers based on expertise and reputation, leading to better therapeutic relationships.",
    icon: Heart,
    color: "bg-pink-500",
  },
  {
    title: "Competitive Advantage",
    description:
      "Differentiate your practice by offering services that network restrictions prevent competitors from providing.",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    title: "Revenue Growth Potential",
    description:
      "Increase practice revenue by 25-35% through proper out-of-network billing and reimbursement optimization.",
    icon: Zap,
    color: "bg-red-500",
  },
];

// ============================================================
// REIMBURSEMENT PROCESS FLOW
// ============================================================

export const oonProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Service Delivery",
    description:
      "Provide exceptional care and thoroughly document all services, procedures, and medical necessity.",
    icon: Heart,
    timeline: "Day of Service",
  },
  {
    step: 2,
    title: "Claim Preparation",
    description:
      "Expert preparation of superbills with proper coding, documentation, and justification for out-of-network rates.",
    icon: FileText,
    timeline: "1-2 Days",
  },
  {
    step: 3,
    title: "Patient Balance Billing",
    description:
      "Collect patient payment upfront or provide detailed superbill for patient to submit to insurance.",
    icon: DollarSign,
    timeline: "Same Day",
  },
  {
    step: 4,
    title: "Insurance Submission",
    description:
      "Submit claims with comprehensive documentation to maximize reimbursement from patient's insurance.",
    icon: Send,
    timeline: "2-3 Days",
  },
  {
    step: 5,
    title: "Reimbursement & Follow-up",
    description:
      "Track claim status, handle appeals if needed, and ensure maximum reimbursement to patient.",
    icon: CheckCircle,
    timeline: "30-45 Days",
  },
];

// ============================================================
// COMMON SCENARIOS
// ============================================================

export const oonScenarios: Scenario[] = [
  {
    category: "Emergency Services",
    description:
      "Life-threatening situations requiring immediate care from the nearest available provider.",
    icon: Zap,
    reimbursementRate: "90-95%",
    complexity: "Critical",
    examples: [
      "Emergency room visits",
      "Ambulance services",
      "Trauma care",
      "Critical stabilization",
    ],
  },
  {
    category: "Specialist Consultations",
    description:
      "Highly specialized care from top experts in specific medical fields.",
    icon: Award,
    reimbursementRate: "85-90%",
    complexity: "High",
    examples: [
      "Complex surgical procedures",
      "Rare disease specialists",
      "Second opinion consultations",
      "Advanced diagnostics",
    ],
  },
  {
    category: "Out-of-State Care",
    description:
      "Medical services received outside patient's home state or insurance network area.",
    icon: MapPin,
    reimbursementRate: "80-90%",
    complexity: "High",
    examples: [
      "Travel emergencies",
      "Specialized treatment centers",
      "Academic medical centers",
      "Clinical trials",
    ],
  },
  {
    category: "Preferred Provider Choice",
    description:
      "Patient's choice to see specific provider due to reputation, expertise, or relationship.",
    icon: Star,
    reimbursementRate: "75-85%",
    complexity: "Medium",
    examples: [
      "Established patient relationships",
      "Preferred surgeon",
      "Specialist with unique expertise",
      "Provider recommendations",
    ],
  },
  {
    category: "Premium Procedures",
    description:
      "Advanced or innovative procedures not commonly covered by standard networks.",
    icon: Target,
    reimbursementRate: "80-90%",
    complexity: "Medium",
    examples: [
      "Innovative surgical techniques",
      "Advanced imaging",
      "Cutting-edge treatments",
      "Experimental therapies",
    ],
  },
  {
    category: "Second Opinion Services",
    description:
      "Consultation with additional specialists before major treatment decisions.",
    icon: Users,
    reimbursementRate: "75-85%",
    complexity: "Medium",
    examples: [
      "Pre-surgical consultations",
      "Cancer treatment planning",
      "Complex diagnosis review",
      "Treatment alternatives",
    ],
  },
];

// ============================================================
// CASE STUDIES
// ============================================================

export const oonCaseStudies: OutOfNetworkCaseStudy[] = [
  {
    specialty: "Orthopedic Surgery Practice",
    problem:
      "High-volume orthopedic surgeon wanted to serve patients outside limited network while maintaining revenue. Complex billing requirements, patient confusion about reimbursement, and low initial success rate.",
    denialRate: "68%",
    solution:
      "Implemented comprehensive OON billing system with patient education, automated superbill generation, and expert claim support.",
    result: {
      denialRate: "6%",
      recoveredAmount: "$485,000",
      timeframe: "12 months",
    },
    testimonial:
      "PhysicianMeds transformed our out-of-network billing from a headache into a revenue stream. Our patients get the care they need, and we're reimbursed fairly for our expertise.",
    author: "Dr. Michael Rodriguez",
    role: "Orthopedic Surgeon, Denver, CO",
  },
  {
    specialty: "Emergency Medicine Group",
    problem:
      "Multi-provider ER group treating patients from various insurance networks in emergency situations. High volume of out-of-network claims, tight documentation timelines, and frequent payment denials.",
    denialRate: "42%",
    solution:
      "Deployed real-time documentation support, automated emergency claim justification, and aggressive appeal process.",
    result: {
      denialRate: "9%",
      recoveredAmount: "$1.2M",
      timeframe: "10 months",
    },
    testimonial:
      "In emergency medicine, you can't control which patients walk through your door. PhysicianMeds ensures we're compensated fairly regardless of network status.",
    author: "Dr. Sarah Chen",
    role: "Emergency Medicine Director, Phoenix, AZ",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const oonTestimonials: OutOfNetworkTestimonial[] = [
  {
    quote:
      "Our practice revenue increased 32% after partnering with PhysicianMeds for out-of-network billing. The team handles all the complexity while we focus on patient care.",
    name: "Dr. James Patterson",
    role: "Practice Owner",
    specialty: "Cardiology",
    metric: "32%",
    metricLabel: "Revenue Increase",
    rating: 5,
  },
  {
    quote:
      "The patient education materials and superbill process make our out-of-network services seamless. Patients understand their reimbursement options clearly.",
    name: "Linda Martinez",
    role: "Practice Manager",
    specialty: "Multi-Specialty Clinic",
    metric: "4.9/5",
    metricLabel: "Patient Satisfaction",
    rating: 5,
  },
  {
    quote:
      "I was skeptical about out-of-network billing, but the 94% reimbursement rate speaks for itself. This has opened new revenue opportunities for our practice.",
    name: "Dr. Emily Wong",
    role: "Specialist",
    specialty: "Neurology",
    metric: "94%",
    metricLabel: "Success Rate",
    rating: 5,
  },
];

// ============================================================
// FAQs
// ============================================================

export const oonFAQs: OutOfNetworkFAQ[] = [
  {
    question: "What is out-of-network billing and how does it work?",
    answer:
      "Out-of-network billing occurs when a provider treats patients whose insurance doesn't have a contract with that provider. The patient typically pays upfront or receives a superbill to submit to their insurance for reimbursement. Our team ensures proper documentation and coding to maximize the patient's reimbursement from their insurance company.",
  },
  {
    question: "What reimbursement rate can providers expect for out-of-network services?",
    answer:
      "On average, our clients achieve 85-95% reimbursement rates for properly documented out-of-network services. Emergency services typically see 90-95%, while elective specialist services range from 75-90%. The key is comprehensive documentation and expert claim preparation.",
  },
  {
    question: "How long does it take for patients to receive reimbursement?",
    answer:
      "Most insurance companies process out-of-network claims within 30-45 days. Emergency claims are often expedited to 15-30 days. We provide claim tracking and follow-up services to ensure timely processing and handle any delays or denials.",
  },
  {
    question: "What is the patient's financial responsibility?",
    answer:
      "Patients typically pay the full amount upfront or within 30 days. They then submit a superbill to their insurance for reimbursement. We provide clear financial policies and patient education materials to explain the process, which results in higher patient satisfaction and fewer billing issues.",
  },
  {
    question: "What documentation is required for successful out-of-network claims?",
    answer:
      "Comprehensive medical documentation including detailed procedure notes, medical necessity justification, proper ICD-10 and CPT coding, and itemized billing. Our team provides templates and real-time support to ensure all documentation meets insurance requirements for maximum reimbursement.",
  },
  {
    question: "Can you help with claim denials and appeals?",
    answer:
      "Absolutely. Our denial management team has extensive experience with out-of-network appeals. We analyze denial reasons, gather additional documentation as needed, and submit compelling appeals. Our appeal success rate for out-of-network claims is 78%, significantly higher than the industry average.",
  },
  {
    question: "How can I maximize reimbursement for out-of-network services?",
    answer:
      "Key strategies include: thorough documentation of medical necessity, using proper coding with modifiers, charging usual and customary rates (supported by market data), providing detailed operative reports, and timely claim submission. Our team implements all these best practices automatically.",
  },
  {
    question: "What are your fees for out-of-network billing services?",
    answer:
      "We offer flexible pricing models including percentage-based fees (only when you collect), flat monthly rates for high-volume practices, or hybrid models. Pricing depends on your specialty, volume, and service requirements. Contact us for a customized quote based on your practice needs.",
  },
];

// ============================================================
// PAGE METADATA
// ============================================================

export const oonPageMeta = {
  comparisonTitle: "In-Network vs Out-of-Network: Understanding Your Options",
  comparisonDescription:
    "See how out-of-network billing provides greater flexibility and revenue potential for your practice.",
  
  benefitsTitle: "8 Key Advantages of Out-of-Network Billing",
  benefitsDescription:
    "Maximize revenue, expand patient access, and maintain clinical freedom with expert OON billing support.",
  
  processTitle: "Our 5-Step Out-of-Network Reimbursement Process",
  processDescription:
    "From service delivery to payment collection, we handle every aspect of OON billing with precision.",
  
  scenariosTitle: "Common Out-of-Network Scenarios We Handle",
  scenariosDescription:
    "Emergency services, specialist care, out-of-state treatment—we optimize reimbursement for every situation.",
  
  caseStudyTitle: "Real Results from Healthcare Providers",
  caseStudyDescription:
    "See how practices like yours have increased revenue and patient satisfaction with our OON billing expertise.",
  
  testimonialsTitle: "Trusted by Healthcare Providers Nationwide",
  testimonialsDescription:
    "Our clients achieve industry-leading reimbursement rates and revenue growth.",
  
  ctaTitle: "Ready to Maximize Your Out-of-Network Revenue?",
  ctaDescription:
    "Get a free consultation and customized quote. Discover how much more you could be earning with expert OON billing support.",
};
