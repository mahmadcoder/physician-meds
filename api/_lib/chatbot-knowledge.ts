// Keywords that indicate the visitor showed service interest,
// used to decide whether to send a follow-up email to the client.

const SERVICE_KEYWORDS = [
  "billing", "coding", "practice management", "credential", "enrollment",
  "accounts receivable", "denial", "out of network", "patient billing",
  "quality payment", "pcmh", "rcm software", "virtual assistant",
  "incentive", "audit", "digital marketing", "reporting",
  "consultation", "consult", "pricing", "cost", "plan", "get started",
  "interested", "sign up", "demo", "trial", "quote",
];

export function shouldEmailClient(messages: { role: string; content: string }[]): boolean {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join(" ");

  return SERVICE_KEYWORDS.some((kw) => userMessages.includes(kw));
}
