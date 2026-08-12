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

  const fieldClass = "mt-3 w-full border-b border-[#c8a878]/20 bg-transparent py-3 text-base text-[#e7ddca] outline-none transition-colors placeholder:text-[#d8cbb6]/26 focus:border-[#c8a878]";
  const labelClass = "font-mono text-[9px] uppercase tracking-[.18em] text-[#c8a878]/58";

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name *</span>
          <input name="name" autoComplete="name" required className={fieldClass} placeholder="Your name" />
        </label>

        <label className="block">
          <span className={labelClass}>Email *</span>
          <input name="email" type="email" autoComplete="email" required className={fieldClass} placeholder="you@example.com" />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Subject</span>
        <input name="subject" className={fieldClass} placeholder="Opportunity, collaboration, project…" />
      </label>

      <label className="block">
        <span className={labelClass}>Message *</span>
        <textarea
          name="message"
          rows={6}
          required
          className={`${fieldClass} resize-y leading-7`}
          placeholder="Tell me what you would like to discuss."
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-5">
        <button
          type="submit"
          className="border border-[#c8a878]/32 px-6 py-3 text-xs uppercase tracking-[.16em] text-[#e7ddca] transition-colors hover:border-[#c8a878] hover:bg-[#c8a878]/10 hover:text-[#c8a878]"
        >
          Prepare email ↗
        </button>
        <p role="status" className="text-sm text-[#d8cbb6]/48">{status}</p>
      </div>
    </form>
  );
}
