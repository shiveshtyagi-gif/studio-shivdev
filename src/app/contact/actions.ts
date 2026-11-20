"use server";

import { emailContactMessage } from "@/lib/mail";
import { supabase } from "@/lib/supabase";

export type Field = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** One message per field that needs fixing, shown under that field. */
  errors?: Partial<Record<Field, string>>;
  /** A problem that isn't about one field (e.g. the database is down). */
  formError?: string;
  /** What was typed, so the form can show it again after an error
   *  (React clears a form after its action runs). */
  values?: Record<Field, string>;
};

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Hidden field that people never see; bots that fill it are ignored.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 200)
    errors.email = "Enter an email address like name@example.com.";
  if (!values.message) errors.message = "Write a message, or paste a link to your music.";
  else if (values.message.length > 5000)
    errors.message = `Shorten your message to 5,000 characters (it's ${values.message.length.toLocaleString("en-IN")}).`;

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // Keep a copy in Supabase and email it to connect@studioshivdev.com.
  // The message counts as sent if either one works.
  const [{ error }, emailed] = await Promise.all([
    supabase.from("contact_messages").insert(values),
    emailContactMessage(values),
  ]);

  if (error) console.error("sendMessage:", error.message);
  if (error && !emailed) {
    return {
      status: "error",
      formError: "Your message couldn't be sent. Please try again in a moment.",
      values,
    };
  }
  return { status: "success" };
}
