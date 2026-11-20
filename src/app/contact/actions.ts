"use server";

import { supabase } from "@/lib/supabase";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Hidden field that people never see; bots that fill it are ignored.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 100) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message || message.length > 5000) {
    return {
      status: "error",
      message: "Please write a message (up to 5,000 characters).",
    };
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) {
    console.error("sendMessage:", error.message);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }
  return { status: "success" };
}
