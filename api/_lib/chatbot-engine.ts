// Rule-based chatbot engine -- zero cost, no API key needed.
// Matches user intent via keyword patterns and returns contextual responses.

interface Rule {
  patterns: RegExp[];
  response: string | string[];
}

function pick(responses: string | string[]): string {
  if (typeof responses === "string") return responses;
  return responses[Math.floor(Math.random() * responses.length)];
}

const GREETING_PATTERNS = [/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|sup|yo|hola)/i];
const THANKS_PATTERNS = [/\b(thanks|thank\s*you|thx|appreciate)\b/i];
const BYE_PATTERNS = [/\b(bye|goodbye|see\s*ya|take\s*care|cya|later)\b/i];

const RULES: Rule[] = [
  // --- Services ---
  {
    patterns: [/medical\s*billing/i, /billing\s*service/i, /claim\s*submission/i, /billing\s*solution/i],
    response: [
      "We offer complete end-to-end medical billing services! This includes claim submission, payment posting, follow-up on unpaid claims, and denial management. Our team ensures a 98.5% first-pass clean claims rate so you get paid faster.\n\nWant to learn more? Visit physicianmeds.com/services/medical-billing or book a free consultation at physicianmeds.com/consult-now",
      "Medical billing is one of our core strengths! We handle everything from claim creation to payment posting, with a 98.5% clean claims rate. Our team works with all major payers and specialties.\n\nI'd love to help you explore how we can boost your collections. Would you like to schedule a free consultation?",
    ],
  },
  {
    patterns: [/medical\s*coding/i, /icd[\s-]*10/i, /cpt\s*cod/i, /hcpcs/i, /coding\s*service/i],
    response: "We provide accurate ICD-10, CPT, and HCPCS coding by certified coders. Our team stays up-to-date with the latest coding guidelines to ensure compliance, reduce audit risk, and maximize your reimbursements.\n\nLearn more at physicianmeds.com/services/medical-coding or schedule a free consultation!",
  },
  {
    patterns: [/practice\s*management/i, /streamline.*operations/i, /workflow\s*optim/i],
    response: "Our practice management services help streamline your operations -- from scheduling and patient registration to insurance verification and staff training. We help your practice run more efficiently so you can focus on patients.\n\nCheck it out at physicianmeds.com/services/practice-management",
  },
  {
    patterns: [/credential/i, /enrollment/i, /caqh/i, /payer\s*contract/i],
    response: "We handle the entire credentialing and enrollment process -- initial credentialing, re-credentialing, CAQH profile management, and payer contract negotiations. Getting credentialed shouldn't slow you down!\n\nMore details at physicianmeds.com/services/credential-enrollment",
  },
  {
    patterns: [/accounts?\s*receivable/i, /\bar\b/i, /outstanding\s*balance/i, /collections?\b/i, /unpaid\s*claim/i],
    response: "Our Accounts Receivable management service maximizes your collections and reduces outstanding balances. We perform aging analysis, follow up on unpaid claims, resolve claim issues, and keep your cash flow healthy.\n\nLearn more at physicianmeds.com/services/accounts-receivable",
  },
  {
    patterns: [/denial\s*management/i, /denied\s*claim/i, /appeal/i, /claim\s*denial/i],
    response: "Dealing with denied claims? We specialize in denial analysis, root cause identification, and expert appeals. We work to overturn denied claims and implement preventive strategies to reduce future denials.\n\nVisit physicianmeds.com/services/denial-management for details!",
  },
  {
    patterns: [/out[\s-]*of[\s-]*network/i, /oon\b/i, /balance\s*billing/i],
    response: "We offer specialized out-of-network billing services. We negotiate with payers, handle balance billing compliance, and maximize reimbursement for OON services. It's a tricky area and we've got the expertise.\n\nMore info at physicianmeds.com/services/out-of-network-billing",
  },
  {
    patterns: [/patient\s*billing/i, /patient\s*statement/i, /payment\s*plan/i],
    response: "Our patient billing services include patient-friendly statements, flexible payment plans, collections follow-up, and handling patient inquiries with professional, compassionate communication.\n\nDetails at physicianmeds.com/services/patient-billing",
  },
  {
    patterns: [/quality\s*payment/i, /qpp\b/i, /mips\b/i, /apm\b/i],
    response: "We help practices navigate CMS Quality Payment Programs including MIPS and APM reporting. We track your measures, optimize performance, and maximize incentive payments while avoiding penalties.\n\nLearn more at physicianmeds.com/services/quality-payment-program",
  },
  {
    patterns: [/pcmh\b/i, /patient[\s-]*centered\s*medical\s*home/i, /ncqa/i],
    response: "We provide PCMH recognition and transformation support. Our team guides your practice through the NCQA recognition process, documentation requirements, and ongoing compliance.\n\nMore at physicianmeds.com/services/patient-centered-medical-home",
  },
  {
    patterns: [/rcm\s*software/i, /revenue\s*cycle.*software/i, /claim\s*tracking/i, /analytics\s*dashboard/i],
    response: "Our cloud-based RCM software gives you real-time claim tracking, analytics dashboards, automated workflows, and detailed performance reporting -- all in one place.\n\nExplore at physicianmeds.com/services/rcm-software",
  },
  {
    patterns: [/virtual\s*assistant/i, /virtual\s*staff/i, /prior\s*auth/i, /referral\s*management/i],
    response: "Our virtual assistants handle scheduling, prior authorizations, referral management, data entry, and patient follow-up calls. Dedicated virtual staff to lighten your administrative load!\n\nDetails at physicianmeds.com/services/virtual-assistants",
  },
  {
    patterns: [/incentive\s*program/i, /promoting\s*interoperability/i],
    response: "We help practices navigate healthcare incentive programs like MIPS and Promoting Interoperability. We assess eligibility, track performance, and maximize your incentive payments.\n\nMore at physicianmeds.com/services/incentive-programs",
  },
  {
    patterns: [/medical\s*audit/i, /coding\s*audit/i, /billing\s*audit/i, /compliance\s*audit/i],
    response: "We perform comprehensive coding and billing audits -- both prospective and retrospective. We identify revenue leaks, compliance risks, and opportunities for improvement.\n\nLearn more at physicianmeds.com/services/medical-audit",
  },
  {
    patterns: [/digital\s*marketing/i, /seo\b/i, /ppc\b/i, /social\s*media/i, /reputation\s*management/i],
    response: "Our healthcare-focused digital marketing services include SEO, PPC advertising, social media management, website design, reputation management, and content marketing to grow your patient base.\n\nExplore at physicianmeds.com/services/digital-marketing",
  },
  {
    patterns: [/practice\s*reporting/i, /analytics/i, /performance\s*report/i, /kpi/i],
    response: "We provide detailed analytics and custom performance reports showing KPIs, financial trends, payer mix analysis, and actionable insights for your practice growth.\n\nDetails at physicianmeds.com/services/practice-reporting",
  },

  // --- General questions ---
  {
    patterns: [/all.*service/i, /what.*service/i, /what.*do\s*you\s*(do|offer)/i, /what.*you\s*provide/i, /list.*service/i, /how.*can.*help/i],
    response: "We offer 16 specialized healthcare services:\n\n1. Medical Billing\n2. Medical Coding\n3. Practice Management\n4. Credential & Enrollment\n5. Accounts Receivable\n6. Denial Management\n7. Out-of-Network Billing\n8. Patient Billing\n9. Quality Payment Program\n10. Patient-Centered Medical Home\n11. RCM Software\n12. Virtual Assistants\n13. Incentive Programs\n14. Medical Audit\n15. Digital Marketing\n16. Practice Reporting\n\nWould you like to know more about any specific service? Or visit physicianmeds.com/services to see them all!",
  },
  {
    patterns: [/pric/i, /cost/i, /how\s*much/i, /rate/i, /fee/i, /afford/i, /budget/i, /package/i, /plan\b/i, /quote/i],
    response: [
      "Our pricing is tailored to each practice's unique needs and volume -- there's no one-size-fits-all. The great news is we offer a free consultation where we assess your practice and provide a custom quote!\n\nBook yours at physicianmeds.com/consult-now or call us at +1 (480) 918-9621",
      "Great question! We customize pricing based on your practice size, specialty, and volume. We'd love to discuss your specific situation in a free, no-obligation consultation.\n\nSchedule one at physicianmeds.com/consult-now -- it only takes a minute!",
    ],
  },
  {
    patterns: [/get\s*started/i, /how\s*to\s*(start|begin)/i, /sign\s*up/i, /onboard/i, /join/i],
    response: "Getting started is easy!\n\n1. Book a free consultation at physicianmeds.com/consult-now\n2. Our team analyzes your practice needs\n3. We create a tailored solution for you\n4. Seamless onboarding with minimal disruption\n\nYou can also call us at +1 (480) 918-9621 or email info@physicianmeds.com. We're ready when you are!",
  },
  {
    patterns: [/specialt/i, /what.*specialt/i, /which.*specialt/i, /work\s*with/i],
    response: "We work with all medical specialties! This includes primary care, cardiology, orthopedics, dermatology, OB/GYN, psychiatry, gastroenterology, pulmonology, neurology, ophthalmology, and many more.\n\nNo matter your specialty, we have certified coders and billing experts who understand your specific needs.",
  },
  {
    patterns: [/about/i, /who\s*(are|is)\s*(you|physician)/i, /tell\s*me\s*about/i, /company/i, /background/i],
    response: "PhysicianMeds is a physician-owned medical billing and revenue cycle management company based in Louisville, KY. With 5+ years of experience and 50+ team members, we serve 100+ healthcare practices across the US.\n\nWe combine certified billing specialists with advanced technology to deliver a 98.5% first-pass clean claims rate and 30% faster reimbursements. Our mission is simple: let you focus on patients while we handle the billing.\n\nLearn more at physicianmeds.com/about-us",
  },
  {
    patterns: [/contact/i, /reach/i, /phone/i, /email.*address/i, /call/i, /speak.*human/i, /talk.*someone/i, /real\s*person/i],
    response: "You can reach our team anytime!\n\nPhone: +1 (480) 918-9621\nEmail: info@physicianmeds.com\nAddress: 3044 Breckenridge Ln STE102-404, Louisville, KY 40220\nHours: Mon-Fri, 9:00 AM - 5:00 PM EST\n\nOr fill out our contact form at physicianmeds.com/contact-us and we'll get back to you promptly!",
  },
  {
    patterns: [/location/i, /where.*located/i, /address/i, /office/i],
    response: "We're based in Louisville, Kentucky!\n\nAddress: 3044 Breckenridge Ln STE102-404, Louisville, KY 40220\n\nWhile our office is in Louisville, we serve healthcare practices nationwide across all 50 states. Everything is handled remotely with seamless communication.",
  },
  {
    patterns: [/hour/i, /when.*open/i, /working.*time/i, /available/i, /schedule/i],
    response: "Our team is available Monday through Friday, 9:00 AM to 5:00 PM EST.\n\nPhone: +1 (480) 918-9621\nEmail: info@physicianmeds.com\n\nFor after-hours inquiries, feel free to email us or fill out the contact form at physicianmeds.com/contact-us -- we'll respond first thing!",
  },
  {
    patterns: [/consult/i, /free.*consult/i, /book.*meeting/i, /appointment/i, /demo/i, /assessment/i],
    response: [
      "We offer a completely free, no-obligation consultation! Our team will analyze your practice needs and create a tailored solution just for you.\n\nBook yours now at physicianmeds.com/consult-now -- it takes less than a minute!",
      "Absolutely! We'd love to chat about your practice. Our free consultation includes a full practice assessment and custom recommendations.\n\nHead to physicianmeds.com/consult-now to schedule, or call +1 (480) 918-9621!",
    ],
  },
  {
    patterns: [/clean\s*claim/i, /first[\s-]*pass/i, /claim\s*rate/i, /success\s*rate/i],
    response: "We're proud of our 98.5% first-pass clean claims rate! This means the vast majority of claims we submit are accepted on the first try -- no rework, no delays. Combined with 30% faster reimbursements, your cash flow stays healthy.",
  },
  {
    patterns: [/revenue\s*cycle/i, /\brcm\b/i],
    response: "Revenue Cycle Management (RCM) is our bread and butter! We manage the entire revenue cycle from patient registration to final payment -- including coding, claim submission, denial management, AR follow-up, and reporting.\n\nExplore our RCM services at physicianmeds.com/services",
  },
  {
    patterns: [/blog/i, /article/i, /resource/i, /insight/i, /read/i],
    response: "We publish regular insights on medical billing, coding updates, RCM best practices, and healthcare industry trends on our blog!\n\nCheck out our latest articles at physicianmeds.com/blogs",
  },
  {
    patterns: [/testimonial/i, /review/i, /client.*say/i, /feedback/i],
    response: "Our clients love working with us! You can read their stories and feedback on our testimonials page.\n\nVisit physicianmeds.com/testimonials to see what practices like yours have to say!",
  },
  {
    patterns: [/hipaa/i, /security/i, /complian/i, /privacy/i, /data.*protect/i],
    response: "We take data security very seriously. We're fully HIPAA compliant and follow strict security protocols to protect all patient and practice data. Our team undergoes regular compliance training.\n\nYou can review our privacy policy at physicianmeds.com/privacy-policy",
  },
];

export function generateReply(message: string, userName: string, isFirstMessage: boolean): string {
  const input = message.trim().toLowerCase();

  // Greetings
  if (GREETING_PATTERNS.some((p) => p.test(input))) {
    const name = userName.split(" ")[0];
    return pick([
      `Hey ${name}! Welcome to PhysicianMeds. I'm here to help you with any questions about our healthcare billing and revenue management services. What can I help you with?`,
      `Hi ${name}! Great to have you here. I can help you learn about our medical billing services, schedule a consultation, or answer any questions. What's on your mind?`,
      `Hello ${name}! Thanks for reaching out to PhysicianMeds. Whether you have questions about our services, pricing, or want to get started -- I'm here to help!`,
    ]);
  }

  // Thanks
  if (THANKS_PATTERNS.some((p) => p.test(input)) && input.length < 40) {
    return pick([
      "You're welcome! Is there anything else I can help you with?",
      "Happy to help! Let me know if you have any other questions.",
      "Glad I could help! Feel free to ask anything else about our services.",
    ]);
  }

  // Goodbye
  if (BYE_PATTERNS.some((p) => p.test(input)) && input.length < 30) {
    const name = userName.split(" ")[0];
    return pick([
      `Thanks for chatting with us, ${name}! If you ever need help, we're just a message away. Have a great day!`,
      `It was great chatting with you, ${name}! Don't hesitate to reach out anytime at info@physicianmeds.com or +1 (480) 918-9621. Take care!`,
    ]);
  }

  // Match rules
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(input))) {
      return pick(rule.response);
    }
  }

  // Fallback
  if (isFirstMessage) {
    return pick([
      "Thanks for your message! I can help you with questions about our medical billing, coding, practice management, and other healthcare services. Could you tell me a bit more about what you're looking for?",
      "I appreciate you reaching out! I'm best at answering questions about our billing services, revenue cycle management, and healthcare solutions. What would you like to know?",
    ]);
  }

  return pick([
    "That's a great question! For detailed guidance on this, I'd recommend speaking with our billing specialists directly. You can reach us at info@physicianmeds.com or +1 (480) 918-9621, or book a free consultation at physicianmeds.com/consult-now",
    "I want to make sure you get the best answer! Our team can provide more specific details on this. Would you like to schedule a free consultation at physicianmeds.com/consult-now? Or feel free to call us at +1 (480) 918-9621.",
    "I'd love to help more with this! For a personalized answer, our billing specialists would be the best fit. You can reach them at info@physicianmeds.com or +1 (480) 918-9621.\n\nIs there anything else about our services I can help with?",
  ]);
}
