import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  /** Optional headers (e.g. List-Unsubscribe for newsletters) */
  headers?: Record<string, string>;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "mail.privateemail.com",
    port: parseInt(process.env.EMAIL_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function sendEmail({ to, subject, html, headers }: EmailOptions) {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"PhysicianMeds" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    headers: headers as Record<string, string | string[]>,
  });
}
