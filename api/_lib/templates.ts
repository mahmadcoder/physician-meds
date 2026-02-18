// Beautiful HTML email templates for PhysicianMeds

const brandStyles = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1a1a2e;
`;

const headerHtml = `
  <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Physician<span style="color: #93c5fd;">Meds</span></h1>
  </div>
`;

const footerHtml = `
  <div style="background: #f8fafc; padding: 24px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;">
      PhysicianMeds — Transforming Healthcare Revenue Management
    </p>
    <p style="margin: 0; color: #94a3b8; font-size: 12px;">
      3044 Breckenridge Ln STE102-404, Louisville, KY 40220 &bull; +14809189621
    </p>
  </div>
`;

// ─── Contact Form: notification to team ──────────────────
export function contactNotificationTemplate(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    ${headerHtml}
    <div style="padding: 32px; background: white;">
      <h2 style="margin: 0 0 4px 0; font-size: 20px; color: #2563eb;">📩 New Contact Form Submission</h2>
      <p style="margin: 0 0 24px 0; color: #64748b; font-size: 14px;">Someone reached out via the website Contact Us page.</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 140px; color: #475569;">Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Email</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Phone</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Subject</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.subject}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #475569; font-size: 13px;">MESSAGE</p>
        <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
    ${footerHtml}
  </div>`;
}

// ─── Consult Form: notification to team ──────────────────
export function consultNotificationTemplate(data: {
  name: string;
  email: string;
  phone: string;
  practiceName: string;
  specialty: string;
  message: string;
}) {
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    ${headerHtml}
    <div style="padding: 32px; background: white;">
      <h2 style="margin: 0 0 4px 0; font-size: 20px; color: #2563eb;">🩺 New Consultation Request</h2>
      <p style="margin: 0 0 24px 0; color: #64748b; font-size: 14px;">A potential client has requested a free consultation.</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 150px; color: #475569;">Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Email</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Phone</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Practice Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.practiceName || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Specialty</td>
          <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${data.specialty || "Not specified"}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #475569; font-size: 13px;">MESSAGE</p>
        <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${data.message || "No additional message provided."}</p>
      </div>
    </div>
    ${footerHtml}
  </div>`;
}

// ─── Consult Form: confirmation to client ──────────────────
export function consultConfirmationTemplate(data: { name: string }) {
  const firstName = data.name.split(" ")[0];
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    ${headerHtml}
    <div style="padding: 32px; background: white;">
      <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #1e293b;">Thank you, ${firstName}!</h2>
      <p style="margin: 0 0 16px 0; color: #475569; line-height: 1.7; font-size: 15px;">
        We've received your consultation request and are excited to connect with you. Our team of medical billing experts will review your information and reach out to you <strong>within 24 hours</strong>.
      </p>
      <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.7; font-size: 15px;">
        In the meantime, feel free to explore our <a href="https://physicianmeds.com/services" style="color: #2563eb; text-decoration: none; font-weight: 600;">services</a> or check out our <a href="https://physicianmeds.com/blogs" style="color: #2563eb; text-decoration: none; font-weight: 600;">latest blog articles</a> for helpful insights on medical billing and revenue cycle management.
      </p>

      <div style="text-align: center; margin: 28px 0;">
        <a href="https://physicianmeds.com" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Visit Our Website →
        </a>
      </div>

      <div style="padding: 16px; background: #eff6ff; border-radius: 8px; border: 1px solid #dbeafe;">
        <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
          <strong>Need immediate help?</strong> Call us at <a href="tel:+14809189621" style="color: #1e40af; font-weight: 600;">+1 (480) 918-9621</a> or email <a href="mailto:info@physicianmeds.com" style="color: #1e40af; font-weight: 600;">info@physicianmeds.com</a>
        </p>
      </div>
    </div>
    ${footerHtml}
  </div>`;
}

// ─── Newsletter: welcome email ──────────────────
export function welcomeSubscriberTemplate() {
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    ${headerHtml}
    <div style="padding: 32px; background: white; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
      <h2 style="margin: 0 0 12px 0; font-size: 22px; color: #1e293b;">You're In!</h2>
      <p style="margin: 0 0 20px 0; color: #475569; line-height: 1.7; font-size: 15px;">
        Welcome to the PhysicianMeds newsletter. You'll receive the latest billing insights, industry updates, and expert tips delivered straight to your inbox.
      </p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="https://physicianmeds.com/blogs" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Read Our Latest Blogs →
        </a>
      </div>

      <p style="margin: 0; color: #94a3b8; font-size: 13px;">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
    ${footerHtml}
  </div>`;
}
