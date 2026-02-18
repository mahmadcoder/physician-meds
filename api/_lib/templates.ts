const logoUrl = "https://www.physicianmeds.com/favicon.png";

const brandStyles = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1a1a2e;
  -webkit-font-smoothing: antialiased;
`;

const headerHtml = `
  <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #1d4ed8 100%); padding: 28px 32px; text-align: center; border-radius: 12px 12px 0 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <td align="center">
          <img src="${logoUrl}" alt="PhysicianMeds" width="44" height="44" style="display: block; margin: 0 auto 12px auto; border-radius: 10px;" />
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
            Physician<span style="color: #93c5fd;">Meds</span>
          </h1>
          <p style="color: #93c5fd; margin: 6px 0 0 0; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;">
            Healthcare Revenue Management
          </p>
        </td>
      </tr>
    </table>
  </div>
`;

const dividerHtml = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <td style="padding: 0 32px;">
        <div style="height: 3px; background: linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%); border-radius: 2px;"></div>
      </td>
    </tr>
  </table>
`;

const footerHtml = `
  <div style="background: #f1f5f9; padding: 24px 32px; text-align: center; border-radius: 0 0 12px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <td align="center">
          <p style="margin: 0 0 6px 0; color: #475569; font-size: 13px; font-weight: 600;">
            PhysicianMeds
          </p>
          <p style="margin: 0 0 4px 0; color: #64748b; font-size: 12px; line-height: 1.5;">
            3044 Breckenridge Ln STE102-404, Louisville, KY 40220
          </p>
          <p style="margin: 0 0 12px 0; color: #64748b; font-size: 12px;">
            <a href="tel:+14809189621" style="color: #2563eb; text-decoration: none;">+1 (480) 918-9621</a>
            &nbsp;&bull;&nbsp;
            <a href="mailto:info@physicianmeds.com" style="color: #2563eb; text-decoration: none;">info@physicianmeds.com</a>
          </p>
          <p style="margin: 0; color: #94a3b8; font-size: 11px;">
            &copy; ${new Date().getFullYear()} PhysicianMeds. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
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
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles} background: #f8fafc; padding: 20px;">
    <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      ${headerHtml}
      ${dividerHtml}
      <div style="padding: 32px;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="background: #eff6ff; border-radius: 10px; padding: 10px 14px; display: inline-block; margin-bottom: 16px;">
            <span style="font-size: 18px;">&#128233;</span>
            <span style="font-size: 16px; font-weight: 700; color: #1e40af; margin-left: 6px;">New Contact Submission</span>
          </div>
        </div>
        <p style="margin: 0 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.6;">Someone reached out via the website Contact Us page.</p>

        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
          <tr style="background: #f8fafc;">
            <td style="padding: 14px 16px; font-weight: 600; width: 140px; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Name</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Email</td>
            <td style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Phone</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${data.phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px;">Subject</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px;">${data.subject}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 18px; background: #f0f9ff; border-radius: 10px; border-left: 4px solid #2563eb;">
          <p style="margin: 0 0 8px 0; font-weight: 700; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
          <p style="margin: 0; color: #334155; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      ${footerHtml}
    </div>
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
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles} background: #f8fafc; padding: 20px;">
    <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      ${headerHtml}
      ${dividerHtml}
      <div style="padding: 32px;">
        <div style="background: #f0fdf4; border-radius: 10px; padding: 10px 14px; display: inline-block; margin-bottom: 16px;">
          <span style="font-size: 18px;">&#129657;</span>
          <span style="font-size: 16px; font-weight: 700; color: #166534; margin-left: 6px;">New Consultation Request</span>
        </div>
        <p style="margin: 0 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.6;">A potential client has requested a free consultation.</p>

        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
          <tr style="background: #f8fafc;">
            <td style="padding: 14px 16px; font-weight: 600; width: 150px; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Name</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Email</td>
            <td style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Phone</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Practice</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${data.practiceName || "Not provided"}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 14px 16px; font-weight: 600; color: #475569; font-size: 13px;">Specialty</td>
            <td style="padding: 14px 16px; color: #1e293b; font-size: 14px;">${data.specialty || "Not specified"}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 18px; background: #f0f9ff; border-radius: 10px; border-left: 4px solid #2563eb;">
          <p style="margin: 0 0 8px 0; font-weight: 700; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
          <p style="margin: 0; color: #334155; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${data.message || "No additional message provided."}</p>
        </div>
      </div>
      ${footerHtml}
    </div>
  </div>`;
}

// ─── Consult Form: confirmation to client ──────────────────
export function consultConfirmationTemplate(data: { name: string }) {
  const firstName = data.name.split(" ")[0];
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles} background: #f8fafc; padding: 20px;">
    <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      ${headerHtml}
      ${dividerHtml}
      <div style="padding: 32px;">
        <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #1e293b; font-weight: 700;">Thank you, ${firstName}!</h2>
        <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
          We've received your consultation request and are excited to connect with you. Our team of healthcare revenue management experts will review your information and reach out to you <strong style="color: #1e293b;">within 24 hours</strong>.
        </p>

        <div style="background: #f0f9ff; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #dbeafe;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td width="48" valign="top" style="padding-right: 14px;">
                <div style="width: 44px; height: 44px; background: #dbeafe; border-radius: 10px; text-align: center; line-height: 44px; font-size: 22px;">&#9989;</div>
              </td>
              <td valign="top">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #1e40af; font-size: 14px;">What happens next?</p>
                <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.6;">A billing specialist will contact you to discuss your practice's needs and how we can help optimize your revenue cycle.</p>
              </td>
            </tr>
          </table>
        </div>

        <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
          In the meantime, feel free to explore our <a href="https://www.physicianmeds.com/services" style="color: #2563eb; text-decoration: none; font-weight: 600;">services</a> or check out our <a href="https://www.physicianmeds.com/blogs" style="color: #2563eb; text-decoration: none; font-weight: 600;">latest insights</a> on medical billing and revenue cycle management.
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="https://www.physicianmeds.com" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; letter-spacing: 0.3px;">
            Visit Our Website &rarr;
          </a>
        </div>

        <div style="padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
            <strong style="color: #1e293b;">Need immediate help?</strong><br/>
            Call <a href="tel:+14809189621" style="color: #2563eb; font-weight: 600; text-decoration: none;">+1 (480) 918-9621</a>
            &nbsp;&bull;&nbsp;
            Email <a href="mailto:info@physicianmeds.com" style="color: #2563eb; font-weight: 600; text-decoration: none;">info@physicianmeds.com</a>
          </p>
        </div>
      </div>
      ${footerHtml}
    </div>
  </div>`;
}

// ─── Newsletter: welcome email ──────────────────
export function welcomeSubscriberTemplate() {
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles} background: #f8fafc; padding: 20px;">
    <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      ${headerHtml}
      ${dividerHtml}
      <div style="padding: 32px; text-align: center;">
        <div style="width: 64px; height: 64px; background: #f0fdf4; border-radius: 50%; margin: 0 auto 16px auto; line-height: 64px; font-size: 32px;">&#127881;</div>
        <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #1e293b; font-weight: 700;">Welcome Aboard!</h2>
        <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.8; font-size: 15px; max-width: 420px; margin-left: auto; margin-right: auto;">
          You're now part of the PhysicianMeds community. Get the latest billing insights, industry updates, and expert tips delivered straight to your inbox.
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="https://www.physicianmeds.com/blogs" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
            Read Our Latest Insights &rarr;
          </a>
        </div>

        <p style="margin: 24px 0 0 0; color: #94a3b8; font-size: 12px;">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
      ${footerHtml}
    </div>
  </div>`;
}
