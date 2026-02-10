import {
  Receipt,
  FileCode,
  Building2,
  BadgeCheck,
  Wallet,
  ShieldX,
  FileText,
  Users,
  Award,
  Home,
  Monitor,
  Headphones,
  Gift,
  ClipboardCheck,
  Megaphone,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Navigation Links
export const navLinks = [
  {
    name: "Why PhysicianMeds",
    href: "/about-us",
    hasDropdown: true,
    dropdownType: "company",
    isPage: false,
  },
  {
    name: "Services",
    href: "#services",
    hasDropdown: true,
    dropdownType: "services",
    isPage: false,
  },
  {
    name: "Process",
    href: "#process",
    hasDropdown: false,
    dropdownType: "",
    isPage: false,
  },
  {
    name: "Blog",
    href: "/blog",
    hasDropdown: false,
    dropdownType: "",
    isPage: true,
  },
];

// Company Links - Used in Why PhysicianMeds dropdown
export const companyLinks = [
  {
    name: "About Us",
    href: "/about-us",
    description: "Learn about our story and mission",
  },
  {
    name: "Contact Us",
    href: "/consult-now",
    description: "Get in touch with our team",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
    description: "How we protect your data",
  },
  {
    name: "Terms & Conditions",
    href: "/terms-conditions",
    description: "Our terms of service",
  },
];

// Services List - Used in Header dropdown and can be used elsewhere
export const services: {
  name: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Medical Billing",
    href: "/services/medical-billing",
    description:
      "Comprehensive medical billing solutions for healthcare providers.",
    icon: Receipt,
  },
  {
    name: "Medical Coding",
    href: "/services/medical-coding",
    description: "Accurate ICD-10, CPT, and HCPCS coding services.",
    icon: FileCode,
  },
  {
    name: "Practice Management",
    href: "/services/practice-management",
    description: "Streamline your practice operations and workflow.",
    icon: Building2,
  },
  {
    name: "Credential & Enrollment",
    href: "/services/credential-enrollment",
    description: "Provider credentialing and payer enrollment services.",
    icon: BadgeCheck,
  },
  {
    name: "Accounts Receivable",
    href: "/services/accounts-receivable",
    description: "Maximize collections and reduce outstanding balances.",
    icon: Wallet,
  },
  {
    name: "Denial Management",
    href: "/services/denial-management",
    description: "Expert denial analysis and appeal services.",
    icon: ShieldX,
  },
  {
    name: "Out of Network Medical Billing",
    href: "/services/out-of-network-billing",
    description: "Specialized billing for out-of-network claims.",
    icon: FileText,
  },
  {
    name: "Patient Billing",
    href: "/services/patient-billing",
    description: "Patient-friendly billing and statement services.",
    icon: Users,
  },
  {
    name: "Quality Payment Program",
    href: "#services",
    description: "MIPS and APM reporting and optimization.",
    icon: Award,
  },
  {
    name: "Patient-Centered Medical Home",
    href: "#services",
    description: "PCMH recognition and transformation support.",
    icon: Home,
  },
  {
    name: "RCM Software",
    href: "#services",
    description: "Advanced revenue cycle management technology.",
    icon: Monitor,
  },
  {
    name: "Virtual Assistants",
    href: "#services",
    description: "Dedicated virtual staff for administrative tasks.",
    icon: Headphones,
  },
  {
    name: "Incentive Programs",
    href: "#services",
    description: "Navigate healthcare incentive programs effectively.",
    icon: Gift,
  },
  {
    name: "Medical Audit",
    href: "#services",
    description: "Comprehensive coding and billing audits.",
    icon: ClipboardCheck,
  },
  {
    name: "Digital Marketing",
    href: "#services",
    description: "Healthcare-focused digital marketing solutions.",
    icon: Megaphone,
  },
  {
    name: "Practice Reporting",
    href: "#services",
    description: "Detailed analytics and performance reports.",
    icon: BarChart3,
  },
];

// Contact Information
export const contactInfo = {
  phone: "+18882199988",
  phoneDisplay: "(888) 219-9988",
  email: "info@physicianmeds.com",
  address: "3044 Breckenridge Ln STE102-404, Louisville, KY 40220",
  addressUrl:
    "https://www.google.com/maps/place/3044+Breckenridge+Ln+102+404,+Louisville,+KY+40220,+USA/@38.2143394,-85.6284045,17z",
  workingHours: "Mon - Fri: 9:00 AM - 5:00 PM",
};

// Social Media Links
export const socialLinks = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter", href: "#", icon: "twitter" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Instagram", href: "#", icon: "instagram" },
];
