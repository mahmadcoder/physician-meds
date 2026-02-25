// Smart rule-based chatbot engine -- handles natural conversation intelligently.
// Uses multi-layer intent detection: exact patterns -> keyword combos -> context analysis.

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function firstName(name: string): string {
  return name.split(" ")[0];
}

function hasAny(input: string, words: string[]): boolean {
  return words.some((w) => input.includes(w));
}

function hasAll(input: string, words: string[]): boolean {
  return words.every((w) => input.includes(w));
}

// ─── Intent detection ──────────────────────────────────────────

type Intent =
  | "greeting" | "thanks" | "goodbye"
  | "services_list" | "service_billing" | "service_coding" | "service_practice_mgmt"
  | "service_credential" | "service_ar" | "service_denial" | "service_oon"
  | "service_patient_billing" | "service_qpp" | "service_pcmh" | "service_rcm"
  | "service_virtual" | "service_incentive" | "service_audit" | "service_marketing"
  | "service_reporting"
  | "pricing" | "get_started" | "specialties" | "about" | "contact"
  | "location" | "hours" | "consult" | "claims_rate" | "rcm_general"
  | "blog" | "testimonials" | "hipaa" | "money_talk" | "comparison"
  | "timeline" | "guarantee" | "technology" | "team" | "insurance_payers"
  | "small_practice" | "switching" | "fallback";

function detectIntent(input: string): Intent {
  const s = input.toLowerCase().replace(/[^a-z0-9\s$%]/g, " ").replace(/\s+/g, " ").trim();

  // Greetings
  if (/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|sup|yo|hola|whats up|how are you)\b/.test(s)) return "greeting";
  if (/^(hi|hello|hey)\s/.test(s) && s.length < 50) return "greeting";

  // Thanks / Bye
  if (hasAny(s, ["thanks", "thank you", "thx", "appreciate"]) && s.length < 50) return "thanks";
  if (hasAny(s, ["bye", "goodbye", "see ya", "take care", "later", "cya"]) && s.length < 40) return "goodbye";

  // Money / budget / revenue talk (like "I have 100k", "my revenue is...", "100k dollar")
  if (hasAny(s, ["100k", "200k", "300k", "500k", "million", "50k", "75k", "150k", "250k"])) return "money_talk";
  if (/\$\d/.test(s) || /\d+k?\s*(dollar|usd|revenue|collection|billing)/i.test(s)) return "money_talk";
  if (hasAny(s, ["my revenue", "my collection", "we collect", "our revenue", "annual revenue", "monthly revenue"])) return "money_talk";
  if (hasAll(s, ["have", "dollar"])) return "money_talk";
  if (hasAll(s, ["start", "with"]) && /\d/.test(s)) return "money_talk";
  if (hasAny(s, ["budget", "afford", "investment", "worth it", "roi", "return on investment"])) return "money_talk";

  // Specific services
  if (hasAny(s, ["medical billing", "billing service", "claim submission", "submit claim", "billing solution", "billing company"])) return "service_billing";
  if (hasAny(s, ["medical coding", "icd 10", "icd10", "cpt code", "hcpcs", "coding service", "coder"])) return "service_coding";
  if (hasAny(s, ["practice management", "manage practice", "workflow optim", "scheduling", "patient registration"])) return "service_practice_mgmt";
  if (hasAny(s, ["credential", "enrollment", "caqh", "payer contract", "credentialing"])) return "service_credential";
  if (hasAny(s, ["accounts receivable", "account receivable", " ar ", "ar management", "outstanding balance", "unpaid claim", "aging report"])) return "service_ar";
  if (hasAny(s, ["denial management", "denied claim", "appeal", "claim denial", "denial rate"])) return "service_denial";
  if (hasAny(s, ["out of network", "oon", "balance billing", "out-of-network"])) return "service_oon";
  if (hasAny(s, ["patient billing", "patient statement", "payment plan", "patient pay", "patient balance"])) return "service_patient_billing";
  if (hasAny(s, ["quality payment", "qpp", "mips", " apm"])) return "service_qpp";
  if (hasAny(s, ["pcmh", "patient centered medical home", "ncqa"])) return "service_pcmh";
  if (hasAny(s, ["rcm software", "revenue cycle software", "claim tracking", "analytics dashboard"])) return "service_rcm";
  if (hasAny(s, ["virtual assistant", "virtual staff", "prior auth", "referral management", "virtual team"])) return "service_virtual";
  if (hasAny(s, ["incentive program", "promoting interoperability"])) return "service_incentive";
  if (hasAny(s, ["medical audit", "coding audit", "billing audit", "compliance audit"])) return "service_audit";
  if (hasAny(s, ["digital marketing", " seo", " ppc", "social media", "reputation management", "website design", "online presence"])) return "service_marketing";
  if (hasAny(s, ["practice reporting", "performance report", " kpi", "financial report", "payer mix"])) return "service_reporting";

  // General intents
  if (hasAny(s, ["all service", "what service", "what do you do", "what do you offer", "what you provide", "list service", "how can you help", "what can you do", "your service"])) return "services_list";
  if (hasAny(s, ["pricing", "price", "cost", "how much", "rate", "fee", "package", "quote", "charge", "expensive", "cheap"])) return "pricing";
  if (hasAny(s, ["get started", "how to start", "how to begin", "sign up", "onboard", "join", "start with you", "work with you", "begin"])) return "get_started";
  if (hasAny(s, ["specialty", "specialties", "speciality", "what type of doctor", "which doctor", "which practice", "type of practice"])) return "specialties";
  if (hasAny(s, ["about", "who are you", "who is physician", "tell me about", "company", "background", "your story", "your team", "your history"])) return "about";
  if (hasAny(s, ["contact", "reach", "phone number", "email address", "call you", "speak to human", "talk to someone", "real person", "support"])) return "contact";
  if (hasAny(s, ["location", "where are you", "where located", "address", "office", "based"])) return "location";
  if (hasAny(s, ["hours", "when open", "working time", "available", "business hour", "open hours"])) return "hours";
  if (hasAny(s, ["consultation", "free consult", "book meeting", "appointment", "demo", "assessment", "schedule"])) return "consult";
  if (hasAny(s, ["clean claim", "first pass", "claim rate", "success rate", "accuracy"])) return "claims_rate";
  if (hasAny(s, ["revenue cycle", " rcm"])) return "rcm_general";
  if (hasAny(s, ["blog", "article", "resource", "insight", "read"])) return "blog";
  if (hasAny(s, ["testimonial", "review", "client say", "feedback", "case study"])) return "testimonials";
  if (hasAny(s, ["hipaa", "security", "compliance", "privacy", "data protect", "secure"])) return "hipaa";
  if (hasAny(s, ["compare", "competitor", "better than", "difference between", "vs", "why you", "why choose", "why physician"])) return "comparison";
  if (hasAny(s, ["how long", "timeline", "how fast", "turnaround", "time to start", "how soon"])) return "timeline";
  if (hasAny(s, ["guarantee", "promise", "what if", "risk", "money back"])) return "guarantee";
  if (hasAny(s, ["technology", "software", "system", "platform", "tool", "ehr", "emr", "clearinghouse"])) return "technology";
  if (hasAny(s, ["team", "staff", "employee", "people", "expert", "specialist"])) return "team";
  if (hasAny(s, ["insurance", "payer", "medicare", "medicaid", "blue cross", "aetna", "cigna", "united health"])) return "insurance_payers";
  if (hasAny(s, ["small practice", "solo practice", "solo doctor", "small clinic", "new practice", "startup practice"])) return "small_practice";
  if (hasAny(s, ["switch", "transition", "change billing", "current company", "leave", "migrate"])) return "switching";

  return "fallback";
}

// ─── Response generator ────────────────────────────────────────

const RESPONSES: Record<Intent, (name: string) => string[]> = {
  greeting: (name) => [
    `Hey ${firstName(name)}! Welcome to PhysicianMeds. I'm here to help you with anything -- whether it's about our billing services, getting a consultation, or just understanding how we can help your practice grow. What's on your mind?`,
    `Hi ${firstName(name)}! Great to have you here. I can help with questions about medical billing, practice revenue, our services, or anything else. Just ask away!`,
  ],

  thanks: () => [
    "You're welcome! Is there anything else I can help you with?",
    "Happy to help! Feel free to ask anything else.",
  ],

  goodbye: (name) => [
    `Thanks for chatting, ${firstName(name)}! If you ever need anything, we're at info@physicianmeds.com or +1 (480) 918-9621. Have a great day!`,
    `Great talking with you, ${firstName(name)}! Remember, our free consultation is always available at physicianmeds.com/consult-now. Take care!`,
  ],

  money_talk: (name) => [
    `That's great, ${firstName(name)}! Regardless of your practice's current collection volume, we tailor our approach to maximize your revenue. We've helped practices of all sizes -- from solo providers collecting $30K/month to large groups doing $500K+.\n\nOur team will analyze your current billing performance, identify revenue leaks, and show you exactly how much more you could be collecting. Many of our clients see a 15-30% increase in collections within the first 3 months.\n\nWant us to do a free revenue analysis for your practice? Book at physicianmeds.com/consult-now`,
    `Thanks for sharing that, ${firstName(name)}! Your revenue volume helps us understand your practice better. Here's the thing -- no matter where you are today, there's almost always room to collect more.\n\nWe typically find that practices leave 10-25% of revenue on the table due to coding errors, missed follow-ups, or claim denials. Our job is to close that gap.\n\nWe'd love to look at your numbers in detail during a free consultation. No commitment, just a clear picture of your revenue potential. Interested? Visit physicianmeds.com/consult-now`,
  ],

  specialties: () => [
    "We work with virtually every medical specialty! Here are some we serve:\n\n- Primary Care & Internal Medicine\n- Cardiology\n- Orthopedics & Pain Management\n- Dermatology\n- OB/GYN\n- Psychiatry & Behavioral Health\n- Gastroenterology\n- Pulmonology\n- Neurology\n- Ophthalmology\n- Urology\n- ENT (Otolaryngology)\n- Radiology\n- Emergency Medicine\n- Pediatrics\n- General Surgery\n- And many more!\n\nEach specialty has unique billing nuances and we have certified coders trained specifically for each one. What specialty is your practice?",
    "Great question! We serve all medical specialties. Our team includes certified coders trained in specialty-specific billing for:\n\nPrimary Care, Cardiology, Orthopedics, Dermatology, OB/GYN, Psychiatry, Gastro, Pulmonology, Neurology, Ophthalmology, Urology, ENT, Radiology, Pediatrics, Surgery, Pain Management, and more.\n\nWe understand that each specialty has different coding requirements, payer rules, and reimbursement patterns. That's why we assign coders with specific expertise in your field.\n\nWhat specialty are you looking for help with? I can give you more specific details!",
  ],

  services_list: () => [
    "We offer a complete suite of 16 healthcare revenue management services:\n\nBILLING & CODING:\n1. Medical Billing - End-to-end claim management\n2. Medical Coding - ICD-10, CPT, HCPCS by certified coders\n3. Denial Management - Appeal & prevent denials\n4. Accounts Receivable - Maximize collections\n5. Patient Billing - Statements & payment plans\n6. Out-of-Network Billing - Specialized OON claims\n\nPRACTICE OPERATIONS:\n7. Practice Management - Streamline workflows\n8. Credential & Enrollment - Payer credentialing\n9. Virtual Assistants - Admin support staff\n10. RCM Software - Cloud-based tracking tools\n\nCOMPLIANCE & QUALITY:\n11. Quality Payment Program - MIPS/APM reporting\n12. Patient-Centered Medical Home - PCMH support\n13. Incentive Programs - Maximize incentive payments\n14. Medical Audit - Coding & billing audits\n\nGROWTH:\n15. Digital Marketing - SEO, PPC, social media\n16. Practice Reporting - Analytics & KPIs\n\nWhich area interests you most? I can dive deeper into any of these!",
  ],

  service_billing: () => [
    "Medical billing is our flagship service! Here's what we handle:\n\n- Complete claim creation & submission\n- Insurance verification & eligibility checks\n- Payment posting & reconciliation\n- Denial management & appeals\n- Patient statement generation\n- Follow-up on unpaid claims\n- Monthly revenue reports\n\nOur results speak for themselves: 98.5% first-pass clean claims rate and 30% faster reimbursements compared to industry average.\n\nWe work with all major payers and specialize in getting you paid the maximum amount in the shortest time. Would you like to learn more or schedule a free assessment?",
  ],

  service_coding: () => [
    "Our medical coding team consists of certified professionals (CPC, CCS, CIC) who ensure accurate ICD-10, CPT, and HCPCS coding for every claim.\n\nWhat we offer:\n- Diagnosis & procedure coding\n- Code auditing & optimization\n- Specialty-specific coding expertise\n- Compliance with latest coding guidelines\n- E/M level optimization\n- Modifier usage review\n\nAccurate coding = higher reimbursements + fewer denials + lower audit risk. Our coders undergo continuous training on CMS updates.\n\nWant to know more about coding for your specific specialty?",
  ],

  service_practice_mgmt: () => [
    "Our practice management services help your office run like clockwork:\n\n- Patient scheduling optimization\n- Insurance verification & eligibility\n- Patient registration & intake\n- Workflow process improvement\n- Staff training & development\n- EHR/EMR optimization\n- Front desk operations support\n\nWe identify bottlenecks in your operations and implement solutions that save time, reduce errors, and improve patient satisfaction. Interested in a practice assessment?",
  ],

  service_credential: () => [
    "Credentialing is critical and we make it painless:\n\n- Initial provider credentialing\n- Re-credentialing management\n- CAQH profile setup & maintenance\n- Payer enrollment applications\n- Contract negotiations\n- Multi-state licensing support\n- Hospital privilege applications\n\nWe track all deadlines and handle the entire paper trail so you don't miss a single enrollment window. Most providers are fully enrolled within 60-90 days.\n\nNeed help getting credentialed?",
  ],

  service_ar: () => [
    "Our AR management keeps your cash flow healthy:\n\n- Aging report analysis (30/60/90/120+ days)\n- Aggressive follow-up on unpaid claims\n- Underpayment identification & recovery\n- Payment variance analysis\n- Insurance follow-up & resubmission\n- Appeals on underpaid claims\n\nWe typically reduce AR days by 25-40% and recover significant revenue that practices thought was lost. Would you like us to analyze your current AR?",
  ],

  service_denial: () => [
    "We're experts at turning denials into payments:\n\n- Root cause analysis of every denial\n- Expert appeal letter writing\n- Preventive strategy implementation\n- Denial trend reporting\n- Payer-specific denial patterns\n- Real-time denial tracking\n\nOur goal isn't just to fix denials -- it's to prevent them from happening. We typically reduce denial rates by 30-50% within the first quarter.\n\nDealing with high denial rates? Let's talk about it!",
  ],

  service_oon: () => [
    "Out-of-network billing requires specialized expertise and that's exactly what we bring:\n\n- OON claim submission & follow-up\n- Payer negotiation for maximum reimbursement\n- Balance billing compliance\n- No Surprises Act compliance\n- UCR rate analysis\n- Patient communication management\n\nWe maximize your OON reimbursements while staying fully compliant with state and federal regulations.",
  ],

  service_patient_billing: () => [
    "We handle patient billing with professionalism and compassion:\n\n- Clear, easy-to-understand statements\n- Flexible payment plan setup\n- Online payment portal support\n- Patient inquiry handling\n- Proactive collection follow-up\n- Financial hardship assistance\n\nHappy patients pay faster. Our patient-friendly approach reduces bad debt while maintaining positive patient relationships.",
  ],

  service_qpp: () => [
    "We help practices navigate CMS Quality Payment Programs:\n\n- MIPS score optimization\n- Quality measure tracking & reporting\n- Promoting Interoperability support\n- Improvement Activities documentation\n- Cost measure analysis\n- APM participation guidance\n\nWe help you avoid penalties and maximize incentive payments. Many of our clients earn exceptional performance bonuses.",
  ],

  service_pcmh: () => [
    "We guide practices through the entire PCMH journey:\n\n- NCQA recognition application\n- Gap analysis & readiness assessment\n- Policy & procedure development\n- Documentation support\n- Staff training\n- Ongoing compliance monitoring\n\nPCMH recognition can increase reimbursements, improve patient outcomes, and differentiate your practice. We make the process manageable.",
  ],

  service_rcm: () => [
    "Our cloud-based RCM software gives you complete visibility:\n\n- Real-time claim status tracking\n- Automated workflow management\n- Custom analytics dashboards\n- Denial trend analysis\n- Revenue forecasting\n- Payer performance metrics\n- Mobile-friendly access\n\nAll this with a user-friendly interface that doesn't require a PhD to use! Want a demo?",
  ],

  service_virtual: () => [
    "Our virtual assistants extend your team without the overhead:\n\n- Appointment scheduling & reminders\n- Prior authorization processing\n- Referral management\n- Insurance verification\n- Data entry & chart prep\n- Patient follow-up calls\n- Prescription refill coordination\n\nTrained, HIPAA-compliant staff that work as a seamless extension of your office. It's like adding team members without the HR headache!",
  ],

  service_incentive: () => [
    "We help you maximize healthcare incentive payments:\n\n- MIPS incentive optimization\n- Promoting Interoperability compliance\n- Quality measure benchmarking\n- Performance tracking & reporting\n- Penalty avoidance strategies\n- Program eligibility assessment\n\nDon't leave money on the table -- many practices miss out on thousands in incentives simply because they don't report correctly.",
  ],

  service_audit: () => [
    "Our auditing services protect your practice and find hidden revenue:\n\n- Prospective & retrospective audits\n- Coding accuracy review\n- Documentation improvement recommendations\n- Compliance risk identification\n- Revenue leakage detection\n- Audit response preparation\n\nRegular audits typically find 5-15% in missed revenue opportunities. When was your last audit?",
  ],

  service_marketing: () => [
    "We help healthcare practices grow their patient base:\n\n- Search Engine Optimization (SEO)\n- Pay-Per-Click advertising (PPC)\n- Social media management\n- Medical website design\n- Online reputation management\n- Content marketing & blog writing\n- Google Business Profile optimization\n\nHealthcare marketing requires specialized knowledge of regulations and patient behavior. That's our sweet spot!",
  ],

  service_reporting: () => [
    "Knowledge is power -- our reporting gives you both:\n\n- Custom KPI dashboards\n- Revenue trend analysis\n- Payer mix breakdown\n- Provider productivity metrics\n- Collection rate tracking\n- Denial pattern reports\n- Monthly & quarterly summaries\n\nWe turn complex billing data into clear, actionable insights that help you make better business decisions.",
  ],

  pricing: (name) => [
    `Great question, ${firstName(name)}! We don't believe in one-size-fits-all pricing. Our fees are customized based on:\n\n- Your practice specialty\n- Monthly claim volume\n- Services you need\n- Current revenue & collections\n\nWhat I can tell you is that most of our clients see a significant ROI -- the increase in collections far outweighs our fees. Many practices actually end up making MORE money after paying for our services.\n\nThe best way to get accurate pricing is through a free consultation where we analyze your specific needs. No pressure, no commitment!\n\nBook at: physicianmeds.com/consult-now\nOr call: +1 (480) 918-9621`,
    `${firstName(name)}, pricing depends on your practice's unique situation -- we customize every package. But here's what I can share:\n\n- We typically work on a percentage of collections model\n- You only pay when you get paid\n- No hidden fees or long-term contracts\n- The ROI is usually 3-5x what you invest\n\nThe best step? Schedule a free consultation and we'll give you a transparent, no-obligation quote based on your exact numbers.\n\nVisit physicianmeds.com/consult-now to book!`,
  ],

  get_started: (name) => [
    `Getting started is really simple, ${firstName(name)}! Here's how it works:\n\n1. Free Consultation -- We learn about your practice and goals\n2. Practice Analysis -- We review your current billing performance\n3. Custom Proposal -- We create a tailored solution with clear pricing\n4. Seamless Onboarding -- Our team handles the transition (typically 2-4 weeks)\n5. Go Live -- We start managing your billing while you focus on patients\n\nThe whole process is designed to be smooth with minimal disruption to your practice.\n\nReady to take the first step? Book your free consultation at physicianmeds.com/consult-now`,
  ],

  about: () => [
    "PhysicianMeds is a physician-owned medical billing company -- which means we truly understand the challenges healthcare providers face because we've lived them.\n\nFounded 5+ years ago in Louisville, KY, we now serve 100+ practices across the US with a team of 50+ certified billing specialists.\n\nOur results:\n- 98.5% first-pass clean claims rate\n- 30% faster reimbursements\n- $100K+ revenue processed\n\nWhat makes us different? We combine deep healthcare expertise with modern technology, and because we're physician-owned, we put your practice's needs first -- always.\n\nLearn our full story at physicianmeds.com/about-us",
  ],

  contact: () => [
    "Here's how to reach our team:\n\nPhone: +1 (480) 918-9621\nEmail: info@physicianmeds.com\nAddress: 3044 Breckenridge Ln STE102-404, Louisville, KY 40220\n\nOr fill out our contact form at physicianmeds.com/contact-us\n\nOur team is available Mon-Fri, 9 AM - 5 PM EST. We typically respond to emails within a few hours!\n\nWould you prefer someone from our team to call you?",
  ],

  location: () => [
    "We're headquartered in Louisville, Kentucky:\n\n3044 Breckenridge Ln STE102-404\nLouisville, KY 40220\n\nBut here's the best part -- we serve practices nationwide across all 50 states! Everything is handled remotely with secure, HIPAA-compliant systems. So no matter where you are, we can help your practice.\n\nPhone: +1 (480) 918-9621\nEmail: info@physicianmeds.com",
  ],

  hours: () => [
    "Our team is available:\n\nMonday - Friday: 9:00 AM - 5:00 PM EST\n\nFor after-hours inquiries, you can:\n- Email us at info@physicianmeds.com\n- Fill out our contact form at physicianmeds.com/contact-us\n- Chat with me anytime right here!\n\nWe respond to all messages within one business day.",
  ],

  consult: (name) => [
    `Absolutely, ${firstName(name)}! Our free consultation includes:\n\n- Practice needs assessment\n- Current billing performance review\n- Revenue opportunity identification\n- Custom service recommendations\n- Transparent pricing discussion\n\nNo commitment, no pressure -- just a clear picture of how we can help.\n\nBook now at: physicianmeds.com/consult-now\nOr call: +1 (480) 918-9621\n\nMost consultations take about 30 minutes and our clients find them incredibly valuable even if they don't sign up!`,
  ],

  claims_rate: () => [
    "We're really proud of our numbers:\n\n- 98.5% first-pass clean claims rate (industry average is ~80%)\n- 30% faster reimbursements vs industry average\n- Less than 3% denial rate\n- 95%+ collection rate\n\nThis means fewer reworks, faster payments, and more revenue for your practice. These results come from our combination of certified coders, rigorous QA processes, and smart technology.\n\nWant to see how your practice compares? We offer a free billing performance analysis!",
  ],

  rcm_general: () => [
    "Revenue Cycle Management (RCM) is the backbone of practice profitability. We manage every step:\n\nPatient Registration -> Insurance Verification -> Coding -> Claim Submission -> Payment Posting -> Denial Management -> AR Follow-up -> Reporting\n\nThink of us as your complete revenue management team. We handle the complexity so you can focus on medicine.\n\nOur RCM approach combines experienced specialists with cloud-based technology for real-time visibility into your revenue cycle.\n\nWant to learn how we can optimize your revenue cycle?",
  ],

  blog: () => [
    "We regularly publish expert insights on medical billing, coding updates, practice management tips, and industry news!\n\nCheck out our blog at: physicianmeds.com/blogs\n\nPopular topics include denial management strategies, coding guideline updates, revenue optimization tips, and practice growth advice.\n\nIs there a specific topic you're interested in?",
  ],

  testimonials: () => [
    "Our clients love working with us! Here's what they typically say:\n\n- Significant increase in collections\n- Dramatic reduction in denials\n- Better visibility into financial performance\n- More time to focus on patients\n- Professional, responsive team\n\nRead their full stories at: physicianmeds.com/testimonials\n\nWant to hear about results for your specific specialty?",
  ],

  hipaa: () => [
    "Data security is non-negotiable for us:\n\n- Fully HIPAA compliant\n- Encrypted data transmission & storage\n- Regular security audits\n- Staff background checks & HIPAA training\n- Business Associate Agreements (BAA) with all clients\n- Secure cloud infrastructure\n- Access controls & audit trails\n\nWe protect your data like it's our own -- because trust is the foundation of everything we do.\n\nReview our privacy policy at: physicianmeds.com/privacy-policy",
  ],

  comparison: () => [
    "Great question! Here's what sets PhysicianMeds apart:\n\n1. Physician-Owned -- We understand your challenges firsthand\n2. 98.5% Clean Claims Rate -- Industry-leading accuracy\n3. All-in-One Solution -- 16 services under one roof\n4. No Long-Term Contracts -- We earn your business every month\n5. Dedicated Account Manager -- Not a rotating team\n6. Transparent Reporting -- Real-time visibility into your revenue\n7. US-Based Team -- No offshore billing centers\n8. Technology + Expertise -- Best of both worlds\n\nMany practices come to us after frustrating experiences with other billing companies. We're built to be different.\n\nWant to see the difference for yourself? Let's schedule a consultation!",
  ],

  timeline: () => [
    "We move fast because we know time is money:\n\n- Consultation & Proposal: 1-2 days\n- Onboarding & Setup: 2-4 weeks\n- First claims submitted: Within the first week after go-live\n- Full optimization: 60-90 days\n\nDuring the transition, your billing doesn't skip a beat. We handle the migration smoothly while your current operations continue.\n\nReady to get started? The sooner we begin, the sooner you see results!",
  ],

  guarantee: () => [
    "We stand behind our work with confidence:\n\n- No long-term contracts -- you can leave anytime\n- Transparent pricing -- no hidden fees ever\n- Monthly performance reports -- full visibility\n- Dedicated support -- we're always a call away\n- Free initial consultation -- no risk to explore\n\nOur retention rate speaks for itself -- once practices experience our service, they stay. But we believe you should never feel locked in.\n\nWant to learn more? Let's schedule a consultation!",
  ],

  technology: () => [
    "We use cutting-edge technology to power our services:\n\n- Cloud-based practice management platform\n- Real-time claim tracking & status updates\n- Automated eligibility verification\n- Electronic claim submission\n- Integrated clearinghouse connections\n- Custom analytics dashboards\n- Compatible with all major EHR/EMR systems\n\nWe work seamlessly with whatever systems you already use -- no disruption, no forced changes.\n\nCurious about our tech? We can give you a walkthrough during a consultation!",
  ],

  team: () => [
    "Our team is our greatest asset:\n\n- 50+ dedicated professionals\n- Certified coders (CPC, CCS, CIC)\n- Experienced billing specialists\n- Dedicated account managers\n- Compliance officers\n- US-based team (no offshore operations)\n\nEvery team member undergoes rigorous training, background checks, and ongoing education. When you work with PhysicianMeds, you get a dedicated team that knows your practice inside and out.\n\nWant to meet the team? Schedule a consultation!",
  ],

  insurance_payers: () => [
    "We work with all major insurance payers:\n\n- Medicare & Medicaid\n- Blue Cross Blue Shield\n- Aetna\n- Cigna\n- UnitedHealthcare\n- Humana\n- Tricare\n- Workers' Compensation\n- All commercial payers\n- State-specific Medicaid programs\n\nWe understand each payer's unique requirements, timely filing deadlines, and appeal processes. This expertise is key to maximizing your reimbursements.\n\nHaving issues with a specific payer? Let us know!",
  ],

  small_practice: (name) => [
    `${firstName(name)}, we love working with small and solo practices! In fact, many of our clients are independent providers.\n\nSmall practices often benefit the MOST from our services because:\n\n- You don't have dedicated billing staff\n- Every dollar of revenue matters more\n- You're wearing too many hats already\n- One denied claim can significantly impact your month\n\nWe scale our services to fit your size and budget. There's no minimum volume requirement.\n\nLet us take the billing burden off your shoulders so you can focus on your patients. Interested in a free assessment?`,
  ],

  switching: (name) => [
    `${firstName(name)}, switching billing companies is easier than you might think! Here's our process:\n\n1. We analyze your current setup during a free consultation\n2. We create a transition plan with zero billing gaps\n3. We coordinate with your current company for data transfer\n4. We run parallel operations to ensure nothing falls through cracks\n5. Full go-live with your dedicated team\n\nTypical transition: 2-4 weeks with ZERO disruption to your cash flow.\n\nMany of our clients switched from companies that weren't delivering results. We'd love to show you the difference!`,
  ],

  fallback: (name) => [
    `That's a great question, ${firstName(name)}! While I may not have the specific details on that, our billing specialists definitely can help. Here's how to reach them:\n\nPhone: +1 (480) 918-9621\nEmail: info@physicianmeds.com\nFree consultation: physicianmeds.com/consult-now\n\nIs there anything else about our services I can help with?`,
    `I appreciate you asking, ${firstName(name)}! For a detailed answer on that, I'd recommend connecting with our team directly -- they can provide personalized guidance.\n\nYou can call +1 (480) 918-9621, email info@physicianmeds.com, or book a free consultation at physicianmeds.com/consult-now.\n\nIn the meantime, feel free to ask me about any of our services, pricing, getting started, or how we work!`,
    `Good question, ${firstName(name)}! I want to make sure you get the most accurate answer. Our team would be best positioned to help with that.\n\nReach out at info@physicianmeds.com or +1 (480) 918-9621.\n\nI can also help you with questions about our billing services, coding, practice management, pricing, or anything related to healthcare revenue management!`,
  ],
};

export function generateReply(message: string, userName: string): string {
  const intent = detectIntent(message);
  const responses = RESPONSES[intent](userName);
  return pick(responses);
}
