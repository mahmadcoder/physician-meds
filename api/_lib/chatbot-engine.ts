import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client (requires process.env.GEMINI_API_KEY)
// We will instantiate it dynamically to avoid throwing on startup if it's missing,
// allowing the request to fail gracefully instead.

const SYSTEM_INSTRUCTION = `
You are the official PhysicianMeds AI Assistant. Your name is PhysicianMeds Assistant. 
You are helpful, professional, and knowledgeable about medical billing and healthcare revenue cycle management (RCM).

Your primary goal is to help healthcare providers understand your services and encourage them to book a free consultation at physicianmeds.com/consult-now or call +1 (480) 918-9621.

Company Information:
- Physician-owned medical billing company
- Headquarters: 3044 Breckenridge Ln STE102-404, Louisville, KY 40220
- Contact: info@physicianmeds.com | +1 (480) 918-9621
- Hours: Mon-Fri 9:00 AM - 5:00 PM EST
- We serve practices nationwide across all 50 states remotely.

Key Performance Indicators (KPIs):
- 98.5% first-pass clean claims rate (industry average is ~80%)
- 30% faster reimbursements vs industry average
- Less than 3% denial rate
- 95%+ collection rate

We offer 16 core services:
1. Medical Billing
2. Medical Coding (certified CPC, CCS, CIC)
3. Denial Management
4. Accounts Receivable (AR) Management
5. Patient Billing
6. Out-of-Network Billing
7. Practice Management
8. Credentialing & Enrollment
9. Virtual Assistants
10. RCM Software
11. Quality Payment Program (QPP/MIPS)
12. Patient-Centered Medical Home (PCMH)
13. Incentive Programs
14. Medical Audits
15. Digital Marketing (SEO/PPC/Websites)
16. Practice Reporting & Analytics

Pricing: 
- Customized based on specialty, claim volume, and services.
- Typically a percentage of collections (you only pay when you get paid).
- No hidden fees, no long-term contracts.
- High ROI. Book consultation for exact pricing.

CRITICAL FORMATTING GUIDELINES:
1. ALWAYS use neat bullet points (-) or numbered lists (1., 2.) when listing items, services, or contact details.
2. NEVER use excessive bolding, italics, or excessive asterisks (like ***) that clutter the text. Keep formatting clean and professional.
3. When providing contact information or next steps, present them clearly, preferably in a bulleted list.
4. Separate paragraphs cleanly. Keep them short, airy, and highly readable.

BEHAVIORAL GUIDELINES:
1. Answer questions concisely and directly.
2. Do not hallucinate services or stats. Stick directly to the facts provided above.
3. Be warm, friendly, and address the user by their first name if provided.
4. For specific pricing requests or highly complex questions, politely direct the user to book a free consultation.
5. If someone talks about their revenue (e.g. $100k), congratulate them and explain how you can increase their collections by 10-25%.
6. If users ask about specialties, tell them we work with virtually every medical specialty including Internal Medicine, Cardiology, Dermatology, Urology, Orthopedic, Oncology, Pulmonology, General Surgery, Neurosurgery, OB/GYN, Pediatric, Gastroenterology, Radiology, Mental Health, Pain Management, and many more.
`;

export async function generateReply(
  message: string, 
  userName: string, 
  conversationHistory: { role: string, content: string }[] = []
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return "I am currently undergoing maintenance and cannot connect to my intelligence engine. Please contact info@physicianmeds.com or call +1 (480) 918-9621 directly for assistance.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // Map conversation history to Gemini format
    // role must be 'user' or 'model'
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ];

    try {
      // Primary Attempt: Gemini 2.5 Pro (Smarter, but strict rate limits)
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION + `\n\nThe user's name is ${userName}.`,
          temperature: 0.3,
        }
      });
      return response.text || "I apologize, I wasn't able to generate a response. Please try again.";
    } catch (proError: unknown) {
      const errMsg = proError instanceof Error ? proError.message : String(proError);
      console.warn("Gemini Pro failed (likely rate limit), falling back to Flash:", errMsg);
      
      // Fallback Attempt: Gemini 2.5 Flash (Faster, much higher rate limits)
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION + `\n\nThe user's name is ${userName}.`,
          temperature: 0.3,
        }
      });
      return fallbackResponse.text || "I apologize, I wasn't able to generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Gemini API Error (Both models failed):", error);
    return "I'm having a little trouble connecting to my network right now. You can reach us at info@physicianmeds.com or call +1 (480) 918-9621.";
  }
}
