import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Studio Shivdev, or send us your music.",
};

export default function ContactPage() {
  return (
    <section className="grid gap-12 py-16 md:grid-cols-2">
      <div>
        <h1 className="ds-h1">Contact</h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          Artists, collaborators, press or fans: we&apos;d love to hear from
          you. For demos, include a link to your music on SoundCloud, YouTube
          or a shared folder.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
