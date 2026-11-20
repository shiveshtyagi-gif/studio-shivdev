"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "./actions";

const initial: ContactState = { status: "idle" };

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-8">
        <p className="text-lg font-semibold">Thanks, your message is in.</p>
        <p className="mt-2 text-muted">We read every message and will get back to you.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Name
        <input name="name" required maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Email
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Message
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={6}
          placeholder="Tell us about yourself, or share a link to your music."
          className={field}
        />
      </label>
      {/* Spam trap: hidden from people, often filled in by bots. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-accent">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent-ink hover:bg-foreground hover:text-background disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
