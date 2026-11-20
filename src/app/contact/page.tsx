import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Studio Shivdev, or send us your music.",
};

export default function ContactPage() {
  return (
    <>
      <section className="ds-tile pb-10">
        <h1 className="ds-display">Contact.</h1>
        <p className="mx-auto mt-4 max-w-xl ds-lead">
          Artists, collaborators, press or fans: we&apos;d love to hear from you.
          For demos, include a link to your music on SoundCloud, YouTube or a
          shared folder.
        </p>
      </section>
      <section className="ds-container max-w-[640px] pb-20">
        <div className="rounded-[28px] bg-surface p-6 sm:p-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
