import "server-only";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/nav";

// Contact-form emails are sent through the connect@ GoDaddy mailbox (SMTP).
// The mailbox password lives only in the SMTP_PASSWORD environment variable
// (Vercel → Settings → Environment Variables, and .env.local for local runs).
const SMTP_HOST = "smtpout.secureserver.net";
const SMTP_PORT = 465;

type ContactMessage = { name: string; email: string; message: string };

/** Removes line breaks so user text can't add extra email headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/**
 * Emails a contact-form message to CONTACT_EMAIL. Replying goes straight to
 * the sender. Returns false (and logs why) when email isn't configured or the
 * send fails; the caller still keeps the message in Supabase.
 */
export async function emailContactMessage(msg: ContactMessage): Promise<boolean> {
  const password = process.env.SMTP_PASSWORD;
  if (!password) {
    console.warn("emailContactMessage: SMTP_PASSWORD is not set; skipping email.");
    return false;
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: { user: CONTACT_EMAIL, pass: password },
  });

  const name = oneLine(msg.name);
  try {
    await transport.sendMail({
      from: { name: "Studio Shivdev website", address: CONTACT_EMAIL },
      to: CONTACT_EMAIL,
      replyTo: { name, address: oneLine(msg.email) },
      subject: `New message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${oneLine(msg.email)}`,
        "",
        msg.message,
        "",
        "—",
        "Sent from the contact form on studioshivdev.com. Reply to this email to answer.",
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("emailContactMessage:", err instanceof Error ? err.message : err);
    return false;
  }
}
