import { Shield, Lock, Eye, Database, UserCheck, Bell, FileText, Scale, AlertCircle, CreditCard, Clock, XCircle, RefreshCw, Gavel } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ===========================================
// PRIVACY POLICY PAGE - EDITABLE CONTENT
// ===========================================

// Privacy Policy Hero Content
export const privacyPolicyHero = {
  badge: 'Your Privacy Matters',
  title: 'Privacy',
  titleHighlight: 'Policy',
  description: `At PhysicianMeds, we are committed to protecting your privacy and ensuring the 
    security of your personal information. This policy explains how we collect, use, 
    and safeguard your data.`,
  lastUpdated: 'February 1, 2026',
};

// Privacy Policy Content Item Type
export interface PrivacyContentItem {
  subtitle?: string;
  text?: string;
  list?: string[];
}

// Privacy Policy Section Type
export interface PrivacyPolicySection {
  id: string;
  icon: LucideIcon;
  title: string;
  content: PrivacyContentItem[];
}

// Privacy Policy Sections
export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    id: 'information-collection',
    icon: Database,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: `When you use our services, we may collect the following personal information:`,
        list: [
          'Name, email address, and phone number',
          'Practice name and medical specialty',
          'Billing and payment information',
          'Professional credentials and licenses',
          'Communication preferences',
        ],
      },
      {
        subtitle: 'Automatically Collected Information',
        text: `We automatically collect certain information when you visit our website:`,
        list: [
          'IP address and browser type',
          'Device information and operating system',
          'Pages visited and time spent on our site',
          'Referring website addresses',
        ],
      },
    ],
  },
  {
    id: 'information-use',
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      {
        text: `We use the information we collect for the following purposes:`,
        list: [
          'To provide and improve our medical billing services',
          'To communicate with you about your account and services',
          'To process payments and manage billing',
          'To send important updates and service notifications',
          'To respond to your inquiries and support requests',
          'To comply with legal and regulatory requirements',
          'To analyze and improve our website and services',
        ],
      },
    ],
  },
  {
    id: 'data-protection',
    icon: Lock,
    title: 'Data Protection & Security',
    content: [
      {
        text: `We implement robust security measures to protect your personal information:`,
        list: [
          'SSL/TLS encryption for all data transmission',
          'Secure data centers with 24/7 monitoring',
          'Regular security audits and vulnerability assessments',
          'Employee training on data protection best practices',
          'Access controls and authentication protocols',
          'HIPAA-compliant data handling procedures',
        ],
      },
      {
        text: `While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest standards of data protection.`,
      },
    ],
  },
  {
    id: 'information-sharing',
    icon: UserCheck,
    title: 'Information Sharing',
    content: [
      {
        text: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:`,
        list: [
          'With service providers who assist in our operations (under strict confidentiality agreements)',
          'To comply with legal obligations or court orders',
          'To protect our rights, privacy, safety, or property',
          'With your explicit consent',
          'In connection with a business merger or acquisition (with prior notice)',
        ],
      },
    ],
  },
  {
    id: 'hipaa-compliance',
    icon: Shield,
    title: 'HIPAA Compliance',
    content: [
      {
        text: `As a medical billing company, we are committed to full compliance with the Health Insurance Portability and Accountability Act (HIPAA):`,
        list: [
          'We maintain strict policies for Protected Health Information (PHI)',
          'All employees undergo HIPAA training',
          'We have Business Associate Agreements with all partners',
          'Regular compliance audits are conducted',
          'Breach notification procedures are in place',
          'Physical, technical, and administrative safeguards are implemented',
        ],
      },
    ],
  },
  {
    id: 'your-rights',
    icon: UserCheck,
    title: 'Your Rights',
    content: [
      {
        text: `You have the following rights regarding your personal information:`,
        list: [
          'Access: Request a copy of your personal data',
          'Correction: Request correction of inaccurate information',
          'Deletion: Request deletion of your data (subject to legal requirements)',
          'Opt-out: Unsubscribe from marketing communications',
          'Portability: Request your data in a portable format',
          'Complaint: File a complaint with relevant authorities',
        ],
      },
      {
        text: `To exercise any of these rights, please contact us using the information provided below.`,
      },
    ],
  },
  {
    id: 'cookies',
    icon: Bell,
    title: 'Cookies & Tracking',
    content: [
      {
        text: `We use cookies and similar technologies to enhance your experience:`,
        list: [
          'Essential cookies: Required for website functionality',
          'Analytics cookies: Help us understand how visitors use our site',
          'Preference cookies: Remember your settings and preferences',
        ],
      },
      {
        text: `You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.`,
      },
    ],
  },
  {
    id: 'updates',
    icon: Bell,
    title: 'Policy Updates',
    content: [
      {
        text: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:`,
        list: [
          'Posting the updated policy on our website',
          'Updating the "Last Updated" date',
          'Sending an email notification for significant changes',
        ],
      },
      {
        text: `We encourage you to review this policy periodically to stay informed about how we protect your information.`,
      },
    ],
  },
];

// ===========================================
// TERMS & CONDITIONS PAGE - EDITABLE CONTENT
// ===========================================

// Terms & Conditions Hero Content
export const termsConditionsHero = {
  badge: 'Legal Agreement',
  title: 'Terms &',
  titleHighlight: 'Conditions',
  description: `Please read these Terms and Conditions carefully before using our medical billing 
    services. By using our services, you agree to be bound by these terms.`,
  lastUpdated: 'February 1, 2026',
};

// Terms Content Item Type
export interface TermsContentItem {
  subtitle?: string;
  text?: string;
  list?: string[];
}

// Terms & Conditions Section Type
export interface TermsConditionsSection {
  id: string;
  icon: LucideIcon;
  title: string;
  content: TermsContentItem[];
}

// Terms & Conditions Sections
export const termsConditionsSections: TermsConditionsSection[] = [
  {
    id: 'acceptance',
    icon: FileText,
    title: 'Acceptance of Terms',
    content: [
      {
        text: `By accessing or using the services provided by PhysicianMeds ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our services.`,
      },
      {
        text: `These Terms constitute a legally binding agreement between you and PhysicianMeds. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on our website.`,
      },
    ],
  },
  {
    id: 'services',
    icon: Scale,
    title: 'Description of Services',
    content: [
      {
        text: `PhysicianMeds provides medical billing and revenue cycle management services to healthcare providers, including but not limited to:`,
        list: [
          'Medical billing and claims submission',
          'Medical coding services (ICD-10, CPT, HCPCS)',
          'Provider credentialing and enrollment',
          'Denial management and appeals',
          'Accounts receivable management',
          'Practice management consulting',
          'Revenue cycle optimization',
          'Compliance and audit services',
        ],
      },
      {
        text: `The specific services provided to you will be outlined in your service agreement. We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.`,
      },
    ],
  },
  {
    id: 'client-responsibilities',
    icon: AlertCircle,
    title: 'Client Responsibilities',
    content: [
      {
        text: `As a client of PhysicianMeds, you agree to:`,
        list: [
          'Provide accurate, complete, and timely information necessary for billing services',
          'Maintain valid and current provider credentials and licenses',
          'Comply with all applicable healthcare laws and regulations',
          'Respond promptly to inquiries and requests for information',
          'Notify us immediately of any changes to your practice information',
          'Maintain appropriate insurance coverage for your practice',
          'Review and approve claims before submission when required',
          'Ensure patient information is collected and stored in compliance with HIPAA',
        ],
      },
      {
        text: `Failure to fulfill these responsibilities may result in delays, claim denials, or termination of services.`,
      },
    ],
  },
  {
    id: 'fees-payment',
    icon: CreditCard,
    title: 'Fees & Payment',
    content: [
      {
        text: `Our fee structure will be outlined in your service agreement and may include:`,
        list: [
          'Percentage-based fees on collections',
          'Flat monthly fees for specified services',
          'Per-claim or per-transaction fees',
          'Setup and implementation fees',
          'Additional fees for specialized services',
        ],
      },
      {
        subtitle: 'Payment Terms',
        text: `Unless otherwise specified in your agreement:`,
        list: [
          'Invoices are issued monthly',
          'Payment is due within 30 days of invoice date',
          'Late payments may incur interest at 1.5% per month',
          'We accept payment via ACH, check, or credit card',
          'All fees are non-refundable unless otherwise stated',
        ],
      },
    ],
  },
  {
    id: 'term-termination',
    icon: Clock,
    title: 'Term & Termination',
    content: [
      {
        subtitle: 'Agreement Term',
        text: `The initial term of your service agreement will be specified in your contract. Unless terminated, agreements typically renew automatically for successive periods.`,
      },
      {
        subtitle: 'Termination by Client',
        text: `You may terminate services by providing written notice as specified in your agreement (typically 30-60 days). Early termination may be subject to fees.`,
      },
      {
        subtitle: 'Termination by Company',
        text: `We may terminate services:`,
        list: [
          'For non-payment after reasonable notice',
          'For material breach of these Terms',
          'If you provide false or misleading information',
          'If continuing services would violate laws or regulations',
          'Upon 30 days written notice for any reason',
        ],
      },
      {
        subtitle: 'Effect of Termination',
        text: `Upon termination, we will provide reasonable assistance in transitioning your billing operations. All outstanding fees become immediately due.`,
      },
    ],
  },
  {
    id: 'limitation-liability',
    icon: XCircle,
    title: 'Limitation of Liability',
    content: [
      {
        text: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:`,
        list: [
          'Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim',
          'We are not liable for indirect, incidental, special, or consequential damages',
          'We are not liable for claim denials resulting from inaccurate information provided by you',
          'We are not liable for delays caused by third parties, including insurance companies',
          'We are not responsible for changes in payer policies or reimbursement rates',
        ],
      },
      {
        text: `This limitation applies regardless of the form of action, whether in contract, tort, negligence, or otherwise.`,
      },
    ],
  },
  {
    id: 'indemnification',
    icon: RefreshCw,
    title: 'Indemnification',
    content: [
      {
        text: `You agree to indemnify, defend, and hold harmless PhysicianMeds, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from:`,
        list: [
          'Your breach of these Terms',
          'Your violation of any law or regulation',
          'Claims related to your medical practice or patient care',
          'Inaccurate or fraudulent information provided by you',
          'Your failure to maintain required credentials or licenses',
        ],
      },
    ],
  },
  {
    id: 'confidentiality',
    icon: Scale,
    title: 'Confidentiality',
    content: [
      {
        text: `Both parties agree to maintain the confidentiality of all proprietary and sensitive information exchanged during the course of our business relationship. This includes:`,
        list: [
          'Patient health information (PHI)',
          'Financial and billing data',
          'Business strategies and processes',
          'Pricing and fee structures',
          'Software and technology systems',
        ],
      },
      {
        text: `Confidentiality obligations survive termination of the service agreement for a period of five (5) years.`,
      },
    ],
  },
  {
    id: 'dispute-resolution',
    icon: Gavel,
    title: 'Dispute Resolution',
    content: [
      {
        text: `In the event of a dispute arising from these Terms or our services:`,
        list: [
          'The parties will first attempt to resolve the dispute through good-faith negotiation',
          'If negotiation fails, disputes will be submitted to mediation',
          'If mediation is unsuccessful, disputes will be resolved through binding arbitration',
          'Arbitration will be conducted in Louisville, Kentucky',
          'The prevailing party may recover reasonable attorney fees',
        ],
      },
      {
        text: `These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Kentucky, without regard to conflict of law principles.`,
      },
    ],
  },
  {
    id: 'miscellaneous',
    icon: FileText,
    title: 'Miscellaneous Provisions',
    content: [
      {
        list: [
          'Entire Agreement: These Terms, together with your service agreement, constitute the entire agreement between the parties',
          'Severability: If any provision is found unenforceable, the remaining provisions remain in effect',
          'Waiver: Failure to enforce any provision does not constitute a waiver of that provision',
          'Assignment: You may not assign your rights without our written consent',
          'Force Majeure: Neither party is liable for delays due to circumstances beyond reasonable control',
          'Notices: All notices must be in writing and sent to the addresses specified in your agreement',
        ],
      },
    ],
  },
];

// Agreement Notice
export const termsAgreementNotice = `By using PhysicianMeds services, you acknowledge that you have read, understood, 
  and agree to be bound by these Terms and Conditions.`;
