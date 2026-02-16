// Testimonials Page Data

export const testimonialPageMeta = {
  title: "Customer Testimonials",
  subtitle:
    "PhysicianMeds strives to provide the best customer support and continuous improvement of its products and services.",
  description:
    "Discover what healthcare providers say about working with PhysicianMeds. Real stories from doctors, clinics, and organizations nationwide.",
};

export const testimonialStats = [
  { value: 500, suffix: "+", label: "Healthcare Providers", isDecimal: false },
  { value: 98, suffix: "%", label: "Client Satisfaction", isDecimal: false },
  { value: 4.9, suffix: "", label: "Average Rating", isDecimal: true },
  { value: 35, suffix: "%", label: "Avg Revenue Increase", isDecimal: false },
];

export const testimonialCategories = [
  "All",
  "Billing",
  "Coding",
  "Collections",
  "Credentialing",
  "Technology",
];

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  keyword: string;
  quote: string;
  fullQuote: string;
  rating: number;
  category: string;
  metric?: string;
  metricLabel?: string;
  location?: string;
}

export const pageTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Medical Director",
    company: "Metro Health Clinic",
    keyword: "Game-Changer",
    quote:
      "PhysicianMeds transformed our billing process completely. Our revenue increased by 35% within the first six months.",
    fullQuote:
      "PhysicianMeds transformed our billing process completely. Our revenue increased by 35% within the first six months, and we finally have clear visibility into our financial performance. Their team is incredibly knowledgeable and always goes above and beyond to ensure we get paid on time. I would recommend them to any practice looking for a reliable billing partner. The difference has been night and day compared to our previous provider.",
    rating: 5,
    category: "Billing",
    metric: "+35%",
    metricLabel: "Revenue Growth",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Founder & Physician",
    company: "Chen Family Practice",
    keyword: "Responsive",
    quote:
      "They helped us navigate complex insurance requirements and reduced our claim denials by 80%.",
    fullQuote:
      "The team at PhysicianMeds is incredibly responsive and knowledgeable. They helped us navigate complex insurance requirements and reduced our claim denials by 80%. Their proactive approach to follow-ups and appeals has been a game-changer for our practice. We no longer worry about lost revenue from denied claims. Every time we have a question, they respond within hours, not days.",
    rating: 5,
    category: "Collections",
    metric: "-80%",
    metricLabel: "Denial Reduction",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Pediatrician",
    company: "Sunrise Pediatrics",
    keyword: "Innovative",
    quote:
      "Switching to PhysicianMeds was the best decision we made. Their technology platform is intuitive and powerful.",
    fullQuote:
      "Switching to PhysicianMeds was the best decision we made. Their technology platform is intuitive, and their support team is always available when we need them. The real-time reporting dashboard gives us complete visibility into our revenue cycle, and the automated workflows have saved our staff countless hours every week. We went from spending 20 hours a week on billing to just 5.",
    rating: 5,
    category: "Technology",
    metric: "24/7",
    metricLabel: "Support",
    location: "Miami, FL",
  },
  {
    id: 4,
    name: "Dr. James Peterson",
    role: "Practice Owner",
    company: "Peterson Medical Group",
    keyword: "Exceptional",
    quote:
      "Their expertise in medical billing and practice management has significantly streamlined our operations.",
    fullQuote:
      "PhysicianMeds' exceptional communication and expertise elevated our entire practice management experience. Their billing team identified $150K in uncollected revenue within the first quarter. Most helpful is the open and responsive communication of their team with my office, along with the specialty levels of expertise for each aspect of our revenue cycle. They truly understand the nuances of medical billing.",
    rating: 5,
    category: "Billing",
    metric: "$150K",
    metricLabel: "Recovered Revenue",
    location: "Chicago, IL",
  },
  {
    id: 5,
    name: "Kelly Martinez",
    role: "Office Manager",
    company: "Valley Health Partners",
    keyword: "Communicative",
    quote:
      "Regular updates and excellent communication make working with PhysicianMeds a pleasure.",
    fullQuote:
      "PhysicianMeds did an outstanding job with our billing and helped clean up old accounts receivable. Regular updates and good communication were very appreciated. It was nice to not have to worry about billing and to focus on patient care. Their weekly reports give us a clear picture of where we stand, and the monthly reviews help us plan ahead. Best billing partner we've had in 15 years.",
    rating: 5,
    category: "Billing",
    location: "Austin, TX",
  },
  {
    id: 6,
    name: "Dr. Robert Williams",
    role: "Practice Owner",
    company: "Family Behavioral Health",
    keyword: "Impressive",
    quote:
      "I am impressed with their promptness to respond to any inquiries and dedication to reviewing every case.",
    fullQuote:
      "I have been a customer of PhysicianMeds for over a year. They have provided billing and credentialing services for my private behavioral health practice, and I am impressed with their promptness to respond to any inquiries, with the time they dedicate to reviewing each one of the cases, and with their willingness to educate me and my staff about the ever-changing rules of medical billing and best coding practices. This is a company I trust with my billing needs.",
    rating: 5,
    category: "Credentialing",
    location: "Denver, CO",
  },
  {
    id: 7,
    name: "Daniel Thompson",
    role: "President & CEO",
    company: "Regional Lab Testing",
    keyword: "Excellent",
    quote:
      "We have experienced tremendous improvements within our billing and claims department.",
    fullQuote:
      "I am writing this to express our appreciation of PhysicianMeds' team and all they have done for our business. In the past year, we have experienced tremendous improvements within our billing and claims department. We went from having over $100K in uncollected claims to now reaching near $100K in collections some months. They are also helping us acquire new contracts with different insurance companies, which will allow us to expand our services.",
    rating: 5,
    category: "Collections",
    metric: "$100K+",
    metricLabel: "Monthly Collections",
    location: "Dallas, TX",
  },
  {
    id: 8,
    name: "Dr. Amanda Foster",
    role: "Practice Owner",
    company: "Foster & Associates Clinic",
    keyword: "Efficient",
    quote:
      "Their expertise in medical billing, AR management, and coding has significantly streamlined our revenue cycle.",
    fullQuote:
      "Working with PhysicianMeds has been a game-changer for my practice. Their expertise in medical billing, AR management, and coding has significantly streamlined our revenue cycle, reduced claim denials, and improved cash flow. The team is proactive, detail-oriented, and always available to address my concerns. I highly recommend PhysicianMeds to any healthcare provider looking for a reliable and efficient billing partner.",
    rating: 5,
    category: "Coding",
    metric: "-20%",
    metricLabel: "Claim Denials",
    location: "Seattle, WA",
  },
  {
    id: 9,
    name: "Dr. Godfred Mensah",
    role: "Co-Founder",
    company: "Advanced Wellness Care",
    keyword: "Dedicated",
    quote:
      "PhysicianMeds has reduced our claim denials by up to 20% and resolved all of our billing challenges.",
    fullQuote:
      "PhysicianMeds has reduced our claim denials by up to 20% and resolved all of our billing challenges, including prior authorization and credentialing. We have regularly scheduled weekly meetings with them, and they have been very responsive and courteous during the calls. Their dedication to understanding our specific needs sets them apart from other billing companies we've worked with.",
    rating: 5,
    category: "Credentialing",
    metric: "-20%",
    metricLabel: "Denial Rate",
    location: "Atlanta, GA",
  },
  {
    id: 10,
    name: "Shobha Solomon",
    role: "Chief Executive Officer",
    company: "Care Now Clinic",
    keyword: "Fast",
    quote:
      "They rectified all the mistakes from our previous billing partner. They are incredibly fast and efficient.",
    fullQuote:
      "I am very thankful to PhysicianMeds because they rectified all the mistakes which were done by my previous billing partner. They are so fast and efficient. Within the first month, they identified and corrected numerous coding errors that had been costing us thousands. Their onboarding process was smooth and they had us fully transitioned within two weeks.",
    rating: 5,
    category: "Coding",
    location: "Houston, TX",
  },
  {
    id: 11,
    name: "James Berg",
    role: "Chief Operations Officer",
    company: "Ion Diagnostics",
    keyword: "Trustworthy",
    quote:
      "PhysicianMeds has been and continues to be critical to the success of our organization.",
    fullQuote:
      "PhysicianMeds has been and continues to be critical to the success of Ion Diagnostics. Our needs are rooted in compliance and dedicated, responsive client service. Their team ensures we stay compliant with all regulatory requirements while maximizing our revenue. The trust we've built with their team over the years is invaluable to our operations.",
    rating: 5,
    category: "Technology",
    location: "Phoenix, AZ",
  },
  {
    id: 12,
    name: "Dr. Derek Hoxby",
    role: "Licensed Clinician (LMFT)",
    company: "Private Practice",
    keyword: "Outstanding",
    quote:
      "My experience with PhysicianMeds has been terrific and has surpassed all my expectations.",
    fullQuote:
      "I have been a licensed clinician for 23 years and have had four different billing companies handle my billing. My experience with PhysicianMeds has been terrific and has surpassed my expectations. Having a private practice with 35-40 patients weekly, I can send them my patient journals and know they will bill in a timely manner and stay on the case until I get paid. The bottom line is I can do what I am paid to do, trusting they will deal with the insurance providers and get me paid.",
    rating: 5,
    category: "Billing",
    location: "Los Angeles, CA",
  },
];
