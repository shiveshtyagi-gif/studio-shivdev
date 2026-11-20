"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState, type Field } from "./actions";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // After a failed send, move focus to the first field that needs fixing
  // (or the form-level message); after success, to the thank-you note.
  useEffect(() => {
    if (state.status === "success") {
      statusRef.current?.focus();
    } else if (state.status === "error") {
      const first = (["name", "email", "message"] as Field[]).find((f) => state.errors?.[f]);
      const target = first
        ? formRef.current?.elements.namedItem(first)
        : formRef.current?.querySelector("[data-form-error]");
      if (target instanceof HTMLElement) target.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[18px] bg-background p-8 text-center">
        <p className="text-lg font-semibold">Thanks, your message is in.</p>
        <p className="mt-2 text-muted">We read every message and will get back to you.</p>
      </div>
    );
  }

  const fieldProps = (name: Field) => {
    const error = state.errors?.[name];
    return {
      id: `contact-${name}`,
      name,
      defaultValue: state.values?.[name],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${name}-error` : undefined,
      className: "ds-input",
    };
  };

  const errorText = (name: Field) =>
    state.errors?.[name] ? (
      <span id={`contact-${name}-error`} className="ds-field-error">
        {state.errors[name]}
      </span>
    ) : null;

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
      <p className="text-sm text-muted">All fields are required.</p>

      <div className="flex flex-col gap-1.5 text-sm">
        <label htmlFor="contact-name">Name</label>
        <input {...fieldProps("name")} required maxLength={100} autoComplete="name" />
        {errorText("name")}
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        <label htmlFor="contact-email">Email</label>
        <input
          {...fieldProps("email")}
          type="email"
          inputMode="email"
          required
          maxLength={200}
          autoComplete="email"
        />
        {errorText("email")}
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        <label htmlFor="contact-message">Message</label>
        <textarea
          {...fieldProps("message")}
          required
          maxLength={5000}
          rows={6}
          placeholder="Tell us about yourself, or share a link to your music."
        />
        {errorText("message")}
      </div>

      {/* Spam trap: hidden from people, often filled in by bots. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.formError && (
        <p data-form-error tabIndex={-1} role="alert" className="ds-field-error">
          {state.formError}
        </p>
      )}

      <button type="submit" disabled={pending} className="self-start ds-btn-primary cursor-pointer">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
