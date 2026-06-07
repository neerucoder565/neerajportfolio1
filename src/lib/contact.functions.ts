import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  senderName: z.string().trim().min(1).max(200),
  senderEmail: z.string().trim().email().max(320),
  subject: z.string().trim().min(1).max(300),
  body: z.string().trim().min(1).max(10000),
  attachmentNames: z.array(z.string().max(255)).max(10).default([]),
});

// Displayed/public-facing address shown in the UI
const PUBLIC_EMAIL = "neerajmadan2006@gmail.com";
// Actual inbox where messages are delivered (Gmail connector account)
const OWNER_EMAIL = "neerajmohan0410@gmail.com";

function encodeRFC2047(str: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(str)) return str;
  const b64 = Buffer.from(str, "utf-8").toString("base64");
  return `=?UTF-8?B?${b64}?=`;
}

function buildRawEmail(opts: {
  to: string;
  from: string;
  replyTo: string;
  replyToName: string;
  subject: string;
  body: string;
}): string {
  const lines = [
    `To: ${opts.to}`,
    `From: ${encodeRFC2047(opts.replyToName)} <${opts.from}>`,
    `Reply-To: ${encodeRFC2047(opts.replyToName)} <${opts.replyTo}>`,
    `Subject: ${encodeRFC2047(opts.subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    opts.body,
  ];
  const raw = lines.join('\r\n');
  return Buffer.from(raw, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    // Write directly into the connected Gmail mailbox so it appears in Inbox
    // even when the connected account and recipient inbox are the same account.
    const lovableKey = process.env.LOVABLE_API_KEY;
    const gmailKey = process.env.GOOGLE_MAIL_API_KEY;

    if (!lovableKey || !gmailKey) {
      return {
        saved: true,
        emailDelivered: false,
        emailError: "Email service not configured.",
      };
    }

    const attachmentsLine = data.attachmentNames.length
      ? `\n\nAttachments mentioned by sender:\n- ${data.attachmentNames.join("\n- ")}`
      : "";

    const bodyText =
      `New message from your portfolio contact form\n` +
      `------------------------------------------------\n` +
      `From: ${data.senderName} <${data.senderEmail}>\n\n` +
      `${data.body}${attachmentsLine}`;

    const raw = buildRawEmail({
      to: OWNER_EMAIL,
      from: PUBLIC_EMAIL,
      replyTo: data.senderEmail,
      replyToName: data.senderName,
      subject: `[Portfolio] ${data.subject}`,
      body: bodyText,
    });

    try {
      const res = await fetch(
        "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": gmailKey,
          },
          body: JSON.stringify({
            raw,
            labelIds: ["INBOX", "UNREAD"],
          }),
        },
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Gmail inbox insert failed", res.status, errText);
        return {
          saved: true,
          emailDelivered: false,
          emailError: `Gmail inbox insert failed (${res.status})`,
        };
      }

      return { saved: true, emailDelivered: true, emailError: null };
    } catch (e) {
      console.error("Gmail send threw", e);
      return {
        saved: true,
        emailDelivered: false,
        emailError: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });
