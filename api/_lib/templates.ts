const logoUrl = "https://www.physicianmeds.com/logo.png";
const siteUrl = "https://www.physicianmeds.com";

const brandStyles = `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a2e;`;

const brandBlue = "#2563eb";
const brandDark = "#1a1a2e";
const brandGray = "#64748b";

function headerHtml() {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="background-color: #ffffff; padding: 30px 20px; border-radius: 12px 12px 0 0; border-bottom: 1px solid #e2e8f0;">
        <a href="${siteUrl}" style="text-decoration: none;">
          <img src="${logoUrl}" alt="PhysicianMeds" width="52" style="display: block; margin: 0 auto 14px auto; border: 0; height: auto;" />
        </a>
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 0 auto;">
          <tr>
            <td style="font-size: 24px; font-weight: 700; color: ${brandDark}; letter-spacing: -0.3px;">Physician</td>
            <td style="font-size: 24px; font-weight: 700; color: ${brandBlue}; letter-spacing: -0.3px;">Meds</td>
          </tr>
        </table>
        <p style="color: ${brandGray}; margin: 8px 0 0 0; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;">
          Healthcare Revenue Management
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #ffffff; padding: 0 32px; height: 4px;">
        <div style="height: 3px; background-color: ${brandBlue}; border-radius: 2px;"></div>
      </td>
    </tr>
  </table>`;
}

function footerHtml() {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <td style="background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 6px 0; color: #475569; font-size: 13px; font-weight: 600;">PhysicianMeds</p>
        <p style="margin: 0 0 4px 0; color: #64748b; font-size: 12px; line-height: 1.5;">
          3044 Breckenridge Ln STE102-404, Louisville, KY 40220
        </p>
        <p style="margin: 0 0 12px 0; color: #64748b; font-size: 12px;">
          <a href="tel:+14809189621" style="color: #2563eb; text-decoration: none;">+1 (480) 918-9621</a>
          &nbsp;&#8226;&nbsp;
          <a href="mailto:info@physicianmeds.com" style="color: #2563eb; text-decoration: none;">info@physicianmeds.com</a>
        </p>
        <p style="margin: 0; color: #94a3b8; font-size: 11px;">
          &copy; 2026 PhysicianMeds. All rights reserved.
        </p>
      </td>
    </tr>
  </table>`;
}

function dataRow(label: string, value: string, isLink = false, isAlt = false) {
  const bg = isAlt ? "background-color: #f8fafc;" : "";
  const val = isLink
    ? `<a href="mailto:${value}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${value}</a>`
    : `<span style="color: #1e293b; font-size: 14px;">${value}</span>`;
  return `
    <tr>
      <td style="padding: 14px 16px; font-weight: 600; width: 140px; color: #475569; font-size: 13px; border-bottom: 1px solid #f1f5f9; ${bg}">${label}</td>
      <td style="padding: 14px 16px; border-bottom: 1px solid #f1f5f9; ${bg}">${val}</td>
    </tr>`;
}

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
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="background-color: #eff6ff; border-radius: 10px; padding: 10px 16px;">
                <span style="font-size: 16px; font-weight: 700; color: #1e40af;">&#128233; New Contact Submission</span>
              </td>
            </tr>
          </table>
          <p style="margin: 16px 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.6;">Someone reached out via the website Contact Us page.</p>

          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px;">
            ${dataRow("Name", data.name, false, true)}
            ${dataRow("Email", data.email, true)}
            ${dataRow("Phone", data.phone || "Not provided", false, true)}
            ${dataRow("Subject", data.subject)}
          </table>

          <div style="margin-top: 24px; padding: 18px; background-color: #f0f9ff; border-radius: 10px; border-left: 4px solid #2563eb;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; color: #334155; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${data.message}</p>
          </div>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
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
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="background-color: #f0fdf4; border-radius: 10px; padding: 10px 16px;">
                <span style="font-size: 16px; font-weight: 700; color: #166534;">&#129657; New Consultation Request</span>
              </td>
            </tr>
          </table>
          <p style="margin: 16px 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.6;">A potential client has requested a free consultation.</p>

          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px;">
            ${dataRow("Name", data.name, false, true)}
            ${dataRow("Email", data.email, true)}
            ${dataRow("Phone", data.phone, false, true)}
            ${dataRow("Practice", data.practiceName || "Not provided")}
            ${dataRow("Specialty", data.specialty || "Not specified", false, true)}
          </table>

          <div style="margin-top: 24px; padding: 18px; background-color: #f0f9ff; border-radius: 10px; border-left: 4px solid #2563eb;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; color: #334155; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${data.message || "No additional message provided."}</p>
          </div>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
  </div>`;
}

// ─── Consult Form: confirmation to client ──────────────────
export function consultConfirmationTemplate(data: { name: string }) {
  const firstName = data.name.split(" ")[0];
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #1e293b; font-weight: 700;">Thank you, ${firstName}!</h2>
          <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
            We've received your consultation request and are excited to connect with you. Our team of healthcare revenue management experts will review your information and reach out to you <strong style="color: #1e293b;">within 24 hours</strong>.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #f0f9ff; border-radius: 12px; border: 1px solid #dbeafe;">
            <tr>
              <td width="56" valign="top" style="padding: 18px 0 18px 18px;">
                <div style="width: 44px; height: 44px; background-color: #dbeafe; border-radius: 10px; text-align: center; line-height: 44px; font-size: 22px;">&#9989;</div>
              </td>
              <td valign="top" style="padding: 18px 18px 18px 14px;">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #1e40af; font-size: 14px;">What happens next?</p>
                <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.6;">A billing specialist will contact you to discuss your practice's needs and how we can help optimize your revenue cycle.</p>
              </td>
            </tr>
          </table>

          <p style="margin: 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
            In the meantime, explore our <a href="${siteUrl}/services" style="color: #2563eb; text-decoration: none; font-weight: 600;">services</a> or read our <a href="${siteUrl}/blogs" style="color: #2563eb; text-decoration: none; font-weight: 600;">latest insights</a> on medical billing and revenue cycle management.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 4px 0 28px 0;">
                <a href="${siteUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
                  Visit Our Website &rarr;
                </a>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
            <tr>
              <td align="center" style="padding: 18px;">
                <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #1e293b;">Need immediate help?</strong><br/>
                  Call <a href="tel:+14809189621" style="color: #2563eb; font-weight: 600; text-decoration: none;">+1 (480) 918-9621</a>
                  &nbsp;&#8226;&nbsp;
                  Email <a href="mailto:info@physicianmeds.com" style="color: #2563eb; font-weight: 600; text-decoration: none;">info@physicianmeds.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
  </div>`;
}

// ─── Newsletter: welcome email ──────────────────
export function welcomeSubscriberTemplate() {
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px; text-align: center;">
          <div style="width: 64px; height: 64px; background-color: #f0fdf4; border-radius: 50%; margin: 0 auto 16px auto; line-height: 64px; font-size: 32px;">&#127881;</div>
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #1e293b; font-weight: 700;">Welcome Aboard!</h2>
          <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
            You're now part of the PhysicianMeds community. Get the latest billing insights, industry updates, and expert tips delivered straight to your inbox.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 0 auto;">
            <tr>
              <td align="center" style="padding: 4px 0 24px 0;">
                <a href="${siteUrl}/blogs" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
                  Read Our Latest Insights &rarr;
                </a>
              </td>
            </tr>
          </table>

          <p style="margin: 0; color: #94a3b8; font-size: 12px;">No spam, ever. Unsubscribe anytime.</p>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
  </div>`;
}

// ─── Newsletter: notification to team ──────────────────
export function newsletterNotificationTemplate(email: string) {
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="background-color: #eff6ff; border-radius: 10px; padding: 10px 16px;">
                <span style="font-size: 16px; font-weight: 700; color: #1e40af;">&#128231; New Newsletter Subscriber</span>
              </td>
            </tr>
          </table>
          <p style="margin: 16px 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.6;">A new user has subscribed to the newsletter.</p>

          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px;">
            ${dataRow("Email", email, true)}
            ${dataRow("Time", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }), false, true)}
          </table>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
  </div>`;
}

// ─── Blog Comment: notification to team ──────────────────
export function commentNotificationTemplate(data: {
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  comment: string;
  articleTitle: string;
  articleSlug: string;
}) {
  const articleUrl = `${siteUrl}/blogs/${data.articleSlug}`;
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="background-color: #faf5ff; border-radius: 10px; padding: 10px 16px;">
                <span style="font-size: 16px; font-weight: 700; color: #7c3aed;">&#128172; New Blog Comment</span>
              </td>
            </tr>
          </table>
          <p style="margin: 16px 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.6;">Someone left a comment on your blog article.</p>

          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px;">
            ${dataRow("Article", `<a href="${articleUrl}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${data.articleTitle}</a>`, false, true)}
            ${dataRow("Name", data.authorName)}
            ${dataRow("Email", data.authorEmail, true, true)}
            ${dataRow("Website", data.authorWebsite || "Not provided")}
            ${dataRow("Date", new Date().toLocaleString("en-US", { timeZone: "America/New_York" }), false, true)}
          </table>

          <div style="margin-top: 24px; padding: 18px; background-color: #faf5ff; border-radius: 10px; border-left: 4px solid #7c3aed;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Comment</p>
            <p style="margin: 0; color: #334155; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${data.comment}</p>
          </div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 24px;">
            <tr>
              <td align="center">
                <a href="${articleUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  View Article &rarr;
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
  </div>`;
}

// ─── Blog Comment: confirmation to commenter ──────────────────
export function commentConfirmationTemplate(data: {
  authorName: string;
  articleTitle: string;
  articleSlug: string;
}) {
  const firstName = data.authorName.split(" ")[0];
  const articleUrl = `${siteUrl}/blogs/${data.articleSlug}`;
  return `
  <div style="max-width: 600px; margin: 0 auto; ${brandStyles}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr><td>${headerHtml()}</td></tr>
      <tr>
        <td style="padding: 32px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #1e293b; font-weight: 700;">Thank you, ${firstName}!</h2>
          <p style="margin: 0 0 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
            Your comment on <strong style="color: #1e293b;">"${data.articleTitle}"</strong> has been posted successfully. We appreciate you taking the time to share your thoughts!
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #faf5ff; border-radius: 12px; border: 1px solid #e9d5ff;">
            <tr>
              <td width="56" valign="top" style="padding: 18px 0 18px 18px;">
                <div style="width: 44px; height: 44px; background-color: #e9d5ff; border-radius: 10px; text-align: center; line-height: 44px; font-size: 22px;">&#128172;</div>
              </td>
              <td valign="top" style="padding: 18px 18px 18px 14px;">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #7c3aed; font-size: 14px;">Your comment is live!</p>
                <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.6;">Your comment is now visible on the article. Visit the article to see your comment and continue the discussion.</p>
              </td>
            </tr>
          </table>

          <p style="margin: 24px 0; color: #475569; line-height: 1.8; font-size: 15px;">
            Explore more of our <a href="${siteUrl}/blogs" style="color: #2563eb; text-decoration: none; font-weight: 600;">healthcare insights</a> or learn about our <a href="${siteUrl}/services" style="color: #2563eb; text-decoration: none; font-weight: 600;">services</a> to see how we can help optimize your revenue cycle.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 4px 0 28px 0;">
                <a href="${articleUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
                  View Article &rarr;
                </a>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
            <tr>
              <td align="center" style="padding: 18px;">
                <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #1e293b;">Have questions?</strong><br/>
                  Call <a href="tel:+14809189621" style="color: #2563eb; font-weight: 600; text-decoration: none;">+1 (480) 918-9621</a>
                  &nbsp;&#8226;&nbsp;
                  Email <a href="mailto:info@physicianmeds.com" style="color: #2563eb; font-weight: 600; text-decoration: none;">info@physicianmeds.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td>${footerHtml()}</td></tr>
    </table>
  </div>`;
}
