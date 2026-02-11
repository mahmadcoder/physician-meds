import {
  Search,
  MousePointerClick,
  Share2,
  FileEdit,
  Mail,
  Star,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Eye,
  DollarSign,
  Shield,
  Clock,
  Megaphone,
  Heart,
  Globe,
  Layers,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// TYPESCRIPT INTERFACES
// ============================================================

export interface DigitalMarketingStat {
  value: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

export interface DigitalMarketingService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
}

export interface StrategyStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: LucideIcon;
  color: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
}

export interface DigitalMarketingBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  span: "normal" | "wide";
}

export interface DigitalMarketingTestimonial {
  quote: string;
  name: string;
  role: string;
  specialty: string;
  metric?: string;
  metricLabel?: string;
  rating: number;
}

export interface DigitalMarketingFAQ {
  question: string;
  answer: string;
}

// ============================================================
// HERO SECTION
// ============================================================

export const digitalMarketingHero = {
  badge: "Healthcare Marketing Experts",
  titleLine1: "Grow Your Practice with",
  titleHighlight: "Digital Marketing",
  description:
    "Attract more patients, build your online reputation, and dominate local search results. Our healthcare-focused digital marketing strategies help medical practices achieve measurable growth — from SEO and PPC to social media and content marketing.",
  heroPoints: [
    "HIPAA-compliant marketing strategies",
    "Healthcare-specific SEO & local search",
    "Patient acquisition & retention campaigns",
    "Data-driven results with transparent ROI",
  ],
  ctaPrimary: "Boost Your Practice",
  ctaSecondary: "Call Us Today",
  images: {
    hero: "/services/images/digital-marketing-1.jpg",
    strategy: "/services/images/digital-marketing-2.jpg",
    results: "/services/images/digital-marketing-3.jpg",
  },
};

// ============================================================
// STATISTICS
// ============================================================

export const digitalMarketingStats: DigitalMarketingStat[] = [
  { value: "300", suffix: "%+", label: "Average ROI", icon: TrendingUp },
  { value: "10K", suffix: "+", label: "Leads Generated", icon: Users },
  { value: "95", suffix: "%", label: "Client Retention", icon: Heart },
  { value: "500", suffix: "+", label: "Campaigns Launched", icon: Megaphone },
];

// ============================================================
// DIGITAL MARKETING SERVICES
// ============================================================

export const digitalMarketingServices: DigitalMarketingService[] = [
  {
    id: "seo",
    title: "Medical SEO",
    description:
      "Dominate local and organic search results. We optimize your website for healthcare-specific keywords, Google Business Profile, and technical SEO to ensure patients find you first.",
    icon: Search,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    features: [
      "Local SEO & Google Maps optimization",
      "Keyword research for medical terms",
      "Technical SEO & site speed optimization",
    ],
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    description:
      "Reach patients actively searching for your services with targeted Google Ads and display campaigns. Every dollar is optimized for maximum patient acquisition.",
    icon: MousePointerClick,
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-600",
    features: [
      "Google Ads for healthcare practices",
      "Geo-targeted patient campaigns",
      "Conversion tracking & A/B testing",
    ],
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description:
      "Build trust and engage with patients across Facebook, Instagram, LinkedIn, and more. We create HIPAA-compliant content that humanizes your practice and drives appointments.",
    icon: Share2,
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600",
    features: [
      "Platform-specific content strategies",
      "Community management & engagement",
      "Paid social advertising campaigns",
    ],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description:
      "Establish your practice as a thought leader with educational blog posts, patient guides, and video content that builds authority and improves search rankings.",
    icon: FileEdit,
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-600",
    features: [
      "Medical blog writing & optimization",
      "Patient education resources",
      "Video content & infographics",
    ],
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description:
      "Nurture patient relationships with automated appointment reminders, health newsletters, and re-engagement campaigns that keep your practice top-of-mind.",
    icon: Mail,
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    features: [
      "Automated patient nurture sequences",
      "Appointment reminder systems",
      "Newsletter & health tip campaigns",
    ],
  },
  {
    id: "reputation-management",
    title: "Reputation Management",
    description:
      "Monitor and improve your online reviews across Google, Healthgrades, Vitals, and more. We help you build a 5-star reputation that attracts new patients.",
    icon: Star,
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-600",
    features: [
      "Review monitoring & response",
      "Patient feedback management",
      "Online reputation recovery strategies",
    ],
  },
];

// ============================================================
// STRATEGY STEPS
// ============================================================

export const strategySteps: StrategyStep[] = [
  {
    number: "01",
    title: "Competitive Analysis",
    description:
      "We analyze your local market, competitors, and patient demographics to identify the highest-impact opportunities for growth.",
    icon: Target,
  },
  {
    number: "02",
    title: "Custom Strategy",
    description:
      "A tailored multi-channel marketing plan designed around your specialty, goals, budget, and target patient population.",
    icon: Layers,
  },
  {
    number: "03",
    title: "HIPAA-First Execution",
    description:
      "Every campaign is built with HIPAA compliance at its core — protecting patient privacy while maximizing marketing impact.",
    icon: Shield,
  },
  {
    number: "04",
    title: "Continuous Optimization",
    description:
      "Real-time analytics dashboards and monthly strategy reviews ensure your campaigns keep improving and delivering results.",
    icon: BarChart3,
  },
];

// ============================================================
// RESULTS DASHBOARD METRICS
// ============================================================

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Monthly Impressions",
    value: "2.4M",
    change: "+67%",
    changeType: "up",
    icon: Eye,
    color: "from-blue-400 to-blue-600",
  },
  {
    label: "Click-Through Rate",
    value: "4.8%",
    change: "+2.1%",
    changeType: "up",
    icon: MousePointerClick,
    color: "from-purple-400 to-purple-600",
  },
  {
    label: "New Patient Leads",
    value: "847",
    change: "+124%",
    changeType: "up",
    icon: Users,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    label: "Cost Per Acquisition",
    value: "$23",
    change: "-38%",
    changeType: "down",
    icon: DollarSign,
    color: "from-orange-400 to-orange-600",
  },
  {
    label: "Return on Ad Spend",
    value: "8.2x",
    change: "+190%",
    changeType: "up",
    icon: TrendingUp,
    color: "from-rose-400 to-rose-600",
  },
  {
    label: "Conversion Rate",
    value: "12.5%",
    change: "+5.3%",
    changeType: "up",
    icon: Target,
    color: "from-teal-400 to-teal-600",
  },
];

// ============================================================
// GROWTH ROADMAP
// ============================================================

export const growthRoadmap: RoadmapStep[] = [
  {
    step: 1,
    title: "Discovery & Audit",
    description:
      "Complete audit of your current online presence, website performance, competitor landscape, and patient acquisition channels.",
    icon: Search,
    color: "from-blue-500 to-blue-600",
    duration: "Week 1",
  },
  {
    step: 2,
    title: "Strategy Blueprint",
    description:
      "Custom marketing strategy document covering channels, budgets, content calendar, KPIs, and projected ROI for your practice.",
    icon: Target,
    color: "from-purple-500 to-purple-600",
    duration: "Week 2",
  },
  {
    step: 3,
    title: "Campaign Launch",
    description:
      "Execute across all channels — website optimization, ad campaigns, social profiles, content publishing, and email sequences go live.",
    icon: Zap,
    color: "from-emerald-500 to-emerald-600",
    duration: "Week 3-4",
  },
  {
    step: 4,
    title: "Optimize & Scale",
    description:
      "Continuous A/B testing, bid optimization, content refinement, and budget reallocation based on real performance data.",
    icon: BarChart3,
    color: "from-orange-500 to-orange-600",
    duration: "Month 2+",
  },
  {
    step: 5,
    title: "Report & Grow",
    description:
      "Monthly performance reports with actionable insights, new opportunities, and strategic recommendations for sustained growth.",
    icon: TrendingUp,
    color: "from-rose-500 to-rose-600",
    duration: "Ongoing",
  },
];

// ============================================================
// BENEFITS
// ============================================================

export const digitalMarketingBenefits: DigitalMarketingBenefit[] = [
  {
    title: "HIPAA-Compliant Marketing",
    description:
      "Every campaign, ad, and piece of content is built with HIPAA compliance at its foundation — no shortcuts, no risks to patient privacy.",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    span: "wide",
  },
  {
    title: "More Patients, Less Spend",
    description:
      "Our optimization-first approach reduces cost per acquisition while increasing patient volume. Most clients see 3x+ ROI within 90 days.",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    span: "normal",
  },
  {
    title: "Local Search Dominance",
    description:
      "Rank #1 in your local area for key healthcare searches. Our SEO strategies put your practice at the top of Google Maps and organic results.",
    icon: Globe,
    color: "from-blue-500 to-indigo-600",
    span: "normal",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Custom dashboards give you complete visibility into every campaign metric — impressions, clicks, calls, appointments, and revenue attribution.",
    icon: BarChart3,
    color: "from-purple-500 to-violet-600",
    span: "normal",
  },
  {
    title: "Dedicated Account Manager",
    description:
      "A healthcare marketing specialist is assigned to your practice. Monthly strategy calls, weekly updates, and always-on Slack/email support.",
    icon: Users,
    color: "from-orange-500 to-amber-600",
    span: "normal",
  },
  {
    title: "Fast Time-to-Results",
    description:
      "See measurable improvements in website traffic and patient inquiries within 30 days. PPC campaigns deliver new patient leads from day one.",
    icon: Clock,
    color: "from-teal-500 to-cyan-600",
    span: "wide",
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const digitalMarketingTestimonials: DigitalMarketingTestimonial[] = [
  {
    quote:
      "PhysicianMeds completely transformed our online presence. We went from barely showing up on Google to ranking #1 for 15+ local keywords. New patient appointments increased by 180% in just 6 months — the ROI has been incredible.",
    name: "Dr. Rachel Nguyen",
    role: "Practice Owner",
    specialty: "Dermatology",
    metric: "+180%",
    metricLabel: "New Patients",
    rating: 5,
  },
  {
    quote:
      "Their PPC campaigns are incredibly well-managed. We're spending 30% less on ads but getting twice as many qualified leads. The team understands healthcare marketing in a way generic agencies simply don't.",
    name: "Dr. Michael Chen",
    role: "Medical Director",
    specialty: "Orthopedic Group",
    metric: "2x",
    metricLabel: "Lead Volume",
    rating: 5,
  },
  {
    quote:
      "We struggled with negative reviews and poor online reputation for years. PhysicianMeds implemented a comprehensive reputation management strategy and within 4 months we went from 3.2 to 4.8 stars across all platforms.",
    name: "Jennifer Adams",
    role: "Practice Administrator",
    specialty: "Multi-Specialty Clinic",
    metric: "4.8★",
    metricLabel: "Avg Rating",
    rating: 5,
  },
];

// ============================================================
// FAQ
// ============================================================

export const digitalMarketingFAQs: DigitalMarketingFAQ[] = [
  {
    question: "How is healthcare digital marketing different from regular marketing?",
    answer:
      "Healthcare marketing requires strict HIPAA compliance, understanding of medical terminology, and sensitivity to patient privacy. We specialize exclusively in healthcare — every campaign, ad copy, and piece of content is designed with compliance at its core. We also understand patient psychology and the healthcare buyer journey, which is fundamentally different from typical consumer marketing.",
  },
  {
    question: "How quickly will I see results from digital marketing?",
    answer:
      "PPC advertising can generate new patient leads within the first week. SEO typically shows significant improvements in 3-6 months, with some quick wins possible within 30 days. Social media engagement builds progressively over 2-3 months. We provide weekly progress reports so you can track improvements in real-time across all channels.",
  },
  {
    question: "What budget do I need for effective digital marketing?",
    answer:
      "Effective healthcare marketing campaigns typically start at $2,000-$5,000/month depending on your market, specialty, and goals. We work with practices of all sizes and customize strategies to match your budget. Our focus is always on maximizing ROI — many clients see 3-5x return on their marketing investment within the first quarter.",
  },
  {
    question: "Do you ensure HIPAA compliance in all marketing activities?",
    answer:
      "Absolutely. HIPAA compliance is non-negotiable in every aspect of our work. This includes how we handle patient data in email marketing, testimonial collection with proper consent, social media policies, website forms, and ad targeting. Our team is trained in healthcare privacy regulations and we maintain strict protocols across all channels.",
  },
  {
    question: "Can you help with our website design and optimization?",
    answer:
      "Yes. A high-performing website is the foundation of any digital marketing strategy. We offer complete website audits, landing page optimization, mobile responsiveness improvements, speed optimization, and conversion rate optimization (CRO). We ensure your website turns visitors into booked appointments with clear calls-to-action and patient-friendly design.",
  },
  {
    question: "How do you measure and report on marketing performance?",
    answer:
      "We provide custom analytics dashboards with real-time data across all channels — website traffic, search rankings, ad performance, social engagement, email metrics, and most importantly, patient lead attribution. Monthly strategy reports include detailed ROI analysis, competitive benchmarking, and recommended optimizations for the upcoming period.",
  },
];

// ============================================================
// PAGE META
// ============================================================

export const digitalMarketingPageMeta = {
  title: "Digital Marketing | PhysicianMeds",
  description:
    "Healthcare-focused digital marketing services — SEO, PPC, social media, content marketing, email campaigns, and reputation management. Grow your practice with data-driven strategies.",

  servicesTitle: "Our Digital Marketing Services",
  servicesDescription:
    "A full suite of healthcare marketing solutions designed to attract new patients, build your brand, and grow your practice revenue.",

  strategyTitle: "Our Strategic Approach",
  strategyDescription:
    "We don't believe in one-size-fits-all marketing. Every strategy is custom-built around your practice's unique goals, specialty, and patient demographics.",

  dashboardTitle: "Real Campaign Results",
  dashboardDescription:
    "Here's a snapshot of the average performance metrics our healthcare clients achieve within the first 6 months of working with us.",

  roadmapTitle: "Your Growth Roadmap",
  roadmapDescription:
    "Our proven 5-step process takes you from audit to accelerated growth — with full transparency and measurable results at every stage.",

  benefitsTitle: "Why Practices Choose Us",
  benefitsDescription:
    "We're not a generic marketing agency. We're healthcare marketing specialists who understand the unique challenges and opportunities of growing a medical practice.",

  testimonialsTitle: "Real Growth, Real Practices",
  testimonialsSubtitle:
    "See how our digital marketing expertise has helped healthcare practices increase patient volume, improve online reputation, and achieve sustainable growth.",

  faqDescription:
    "Common questions about healthcare digital marketing, HIPAA-compliant campaigns, budgeting, timelines, and measuring ROI for your practice.",

  bottomCTA: {
    title: "Ready to Grow Your Practice?",
    description:
      "Join hundreds of healthcare practices that have transformed their patient acquisition with our data-driven digital marketing strategies. Get a free marketing audit and custom growth plan.",
    primaryButton: "Get Your Free Marketing Audit",
  },
};
