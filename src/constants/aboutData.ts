import { Heart, Shield, Zap, Users, Award, TrendingUp, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ===========================================
// ABOUT US PAGE - EDITABLE CONTENT
// ===========================================
// Edit this file to update all About Us page content
// ===========================================

// Hero Section Content
export const aboutHeroContent = {
  badge: 'Your Trusted Billing Partner',
  title: 'About',
  titleHighlight: 'PhysicianMeds',
  description: `We're more than just a billing company. We're your dedicated partner in navigating 
    the complexities of healthcare revenue cycle management, helping you focus on what 
    matters most — your patients.`,
};

// Who We Are / Story Section Content
export const aboutStoryContent = {
  sectionLabel: 'Who We Are',
  title: 'A Physician-Owned Company Built on',
  titleHighlight: 'Trust & Results',
  experienceYears: '5+',
  experienceText: 'Years of Excellence in Medical Billing',
  paragraphs: [
    `PhysicianMeds was born from a simple yet powerful idea — healthcare providers 
    deserve a billing partner who truly understands their challenges. As a 
    physician-owned company, we've experienced firsthand the frustrations of 
    complex billing processes, delayed reimbursements, and administrative overload.`,
    `That's why we built PhysicianMeds: to be the partner every healthcare practice 
    deserves. We combine advanced AI-powered technology with a team of certified 
    billing specialists to deliver accurate, efficient, and transparent billing 
    services that maximize your revenue.`,
    `Today, we proudly serve 100+ healthcare practices across the United States, 
    helping them achieve 98% clean claim rates and 30% faster reimbursements. 
    But numbers only tell part of the story — our real measure of success is 
    seeing our clients thrive.`,
  ],
  quickStats: [
    { value: '100+', label: 'Practices Served' },
    { value: '$100K+', label: 'Revenue Processed' },
    { value: '50+', label: 'Team Members' },
  ],
};

// Mission & Vision Section Content
export const aboutMissionVision = {
  sectionLabel: 'What Drives Us',
  sectionTitle: 'Our Mission & Vision',
  mission: {
    title: 'Our Mission',
    description: `To empower healthcare providers by eliminating the burden of medical billing. 
      We take care of the complexities of coding, claims, and reimbursements so you 
      can focus entirely on delivering exceptional patient care. Our goal is to 
      ensure every provider gets paid accurately and on time, every single time.`,
    tags: ['Accuracy', 'Efficiency', 'Reliability'],
  },
  vision: {
    title: 'Our Vision',
    description: `To become the most trusted name in healthcare revenue cycle management. We 
      envision a future where every healthcare provider — from solo practitioners 
      to large clinics — has access to world-class billing solutions that drive 
      financial stability and practice growth.`,
    tags: ['Innovation', 'Partnership', 'Excellence'],
  },
};

// Core Values Data
export interface CoreValue {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export const coreValues: CoreValue[] = [
  {
    icon: Heart,
    title: 'Client-Centered',
    description: 'Your success is our priority. We build lasting partnerships based on trust and mutual growth.',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty in every interaction and transaction.',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Leveraging cutting-edge technology and AI to deliver faster, more accurate billing solutions.',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working alongside your team as an extension of your practice, not just a service provider.',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
];

// Values Section Header
export const coreValuesSection = {
  sectionLabel: 'What We Stand For',
  sectionTitle: 'Our Core Values',
  sectionDescription: 'These principles guide everything we do and shape how we serve our clients.',
};

// Stats Data
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export const statsData: StatItem[] = [
  { value: 100, suffix: '+', label: 'Healthcare Providers', icon: Users },
  { value: 98, suffix: '%', label: 'Clean Claim Rate', icon: Award },
  { value: 30, suffix: '%', label: 'Faster Reimbursements', icon: TrendingUp },
  { value: 24, suffix: '/7', label: 'Support Available', icon: Clock },
];

// Stats Section Header
export const statsSection = {
  title: 'Our Impact in Numbers',
  description: `Results that speak for themselves. Here's what we've achieved together with our partners.`,
};

// Journey/Timeline Data
export interface JourneyStep {
  year: string;
  title: string;
  description: string;
}

export const journeySteps: JourneyStep[] = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Founded with a vision to transform medical billing for healthcare providers across the USA.',
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description: 'Expanded our team and services, reaching 50+ healthcare practices nationwide.',
  },
  {
    year: '2023',
    title: 'AI Integration',
    description: 'Implemented AI-powered billing solutions for enhanced accuracy and efficiency.',
  },
  {
    year: '2024',
    title: 'Industry Leader',
    description: 'Serving 100+ practices with a 98% clean claim rate and industry-leading results.',
  },
];

// Journey Section Header
export const journeySection = {
  sectionLabel: 'Our Journey',
  sectionTitle: 'How We Got Here',
  sectionDescription: 'From a small team with a big vision to a trusted partner for healthcare providers nationwide.',
};

// Why Choose Us Section
export const whyChooseUsSection = {
  sectionLabel: 'Why Choose Us',
  title: 'What Sets',
  titleHighlight: 'PhysicianMeds',
  titleEnd: 'Apart',
  description: `We're not just another billing company. We're a team of dedicated professionals 
    who understand the healthcare industry inside and out. Here's why practices 
    across the nation choose us as their billing partner.`,
  benefits: [
    'Physician-owned company with deep industry understanding',
    'AI-powered technology for maximum accuracy',
    'Dedicated account managers for personalized service',
    '98% first-pass claim acceptance rate',
    'Transparent pricing with no hidden fees',
    '24/7 support and real-time reporting access',
  ],
  highlightStats: [
    { value: '98%', label: 'Clean Claim Rate', type: 'primary' as const },
    { value: '30%', label: 'Faster Payments', type: 'default' as const },
    { value: '100+', label: 'Practices Served', type: 'default' as const },
    { value: '$100K+', label: 'Revenue Processed', type: 'accent' as const },
  ],
};

// Testimonials Data
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  practice: string;
  image?: string;
  content: string;
  rating: number;
  metric?: {
    value: string;
    label: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    role: 'Medical Director',
    practice: 'Family Care Clinic',
    content: `PhysicianMeds transformed our billing operations completely. We saw immediate improvements 
      in cash flow and reduced claim denials by 50% within the first quarter. Their team is responsive 
      and truly understands our needs.`,
    rating: 5,
    metric: {
      value: '50%',
      label: 'Reduced Denials',
    },
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Practice Owner',
    practice: 'Orthopedic Specialists',
    content: `The team's expertise in medical billing and coding saved us countless hours. They handle 
      everything from claim submissions to follow-ups, and our revenue has increased significantly 
      since we partnered with them.`,
    rating: 5,
    metric: {
      value: '35%',
      label: 'Revenue Growth',
    },
  },
  {
    id: 3,
    name: 'Amanda Rodriguez',
    role: 'Practice Manager',
    practice: 'Cardiology Associates',
    content: `Outstanding service! PhysicianMeds has been instrumental in streamlining our revenue cycle. 
      Their AI-powered solutions and dedicated account managers have made billing one less thing 
      we need to worry about.`,
    rating: 5,
    metric: {
      value: '98%',
      label: 'Collection Rate',
    },
  },
  {
    id: 4,
    name: 'Dr. James Thompson',
    role: 'Chief Medical Officer',
    practice: 'Primary Care Network',
    content: `Switching to PhysicianMeds was the best decision for our practice. Their transparent 
      reporting and proactive approach to denial management has improved our bottom line substantially.`,
    rating: 5,
    metric: {
      value: '40%',
      label: 'Faster Payments',
    },
  },
  {
    id: 5,
    name: 'Dr. Emily Watson',
    role: 'Pediatrician',
    practice: 'Kids First Pediatrics',
    content: `Professional and reliable team. They transformed our revenue cycle management and helped 
      us achieve financial stability we hadn't seen in years. Highly recommend their services.`,
    rating: 5,
    metric: {
      value: '45%',
      label: 'Revenue Growth',
    },
  },
  {
    id: 6,
    name: 'Robert Kim',
    role: 'Administrator',
    practice: 'Urgent Care Centers',
    content: `PhysicianMeds handles our billing across multiple locations seamlessly. Their technology 
      integration was smooth, and the support team is always available when we need them.`,
    rating: 5,
    metric: {
      value: '24/7',
      label: 'Support',
    },
  },
];

// Testimonials Section Header
export const testimonialsSection = {
  sectionLabel: 'What Our Clients Say',
  sectionTitle: 'Trusted by Healthcare Providers',
  sectionDescription: `Don't just take our word for it. Here's what healthcare providers across 
    the nation have to say about partnering with PhysicianMeds.`,
};

// CTA Section Content
export const ctaSection = {
  title: 'Ready to Transform Your Revenue Cycle?',
  description: `Join 100+ healthcare providers who trust PhysicianMeds for their billing needs. 
    Let's discuss how we can help your practice thrive.`,
  primaryButton: 'Schedule a Consultation',
  secondaryButton: 'Explore Our Services',
};
