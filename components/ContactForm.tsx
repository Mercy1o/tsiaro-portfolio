"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/data/site";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "Portfolio enquiry").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Please complete your name, email and message.");
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email application…");
    window.location.href = href;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/35">Name *</span>
          <input
            name="name"
            autoComplete="name"
            required
            className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-base text-bone outline-none transition-colors placeholder:text-bone/20 focus:border-sand"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/35">Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-base text-bone outline-none transition-colors placeholder:text-bone/20 focus:border-sand"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/35">Subject</span>
        <input
          name="subject"
          className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-base text-bone outline-none transition-colors placeholder:text-bone/20 focus:border-sand"
          placeholder="Opportunity, collaboration, project…"
        />
      </label>

      <label className="block">
        <span className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/35">Message *</span>
        <textarea
          name="message"
          rows={6}
          required
          className="mt-3 w-full resize-y border-b border-white/15 bg-transparent py-3 text-base leading-7 text-bone outline-none transition-colors placeholder:text-bone/20 focus:border-sand"
          placeholder="Tell me what you would like to discuss."
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-5">
        <button
          type="submit"
          className="border border-white/15 px-6 py-3 text-xs uppercase tracking-[.16em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-space"
        >
          Prepare email ↗
        </button>
        <p role="status" className="text-sm text-bone/40">{status}</p>
      </div>
    </form>
  );
}
