"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      subject: String(form.get("subject") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      website: String(form.get("website") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setStatusMessage("Please complete your name, email and message.");
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending message…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Your message could not be sent.");
      }

      formElement.reset();
      setStatus("success");
      setStatusMessage(result.message || "Message sent. Thank you — I’ll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    }
  }

  const fieldClass =
    "mt-3 w-full border-b border-[#c8a878]/20 bg-transparent py-3 text-base text-[#e7ddca] outline-none transition-colors placeholder:text-[#d8cbb6]/26 focus:border-[#c8a878]";
  const labelClass = "font-mono text-[10px] uppercase tracking-[.16em] text-[#c8a878]/66";

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name *</span>
          <input name="name" autoComplete="name" required maxLength={100} className={fieldClass} placeholder="Your name" />
        </label>

        <label className="block">
          <span className={labelClass}>Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Subject</span>
        <input
          name="subject"
          maxLength={140}
          className={fieldClass}
          placeholder="Opportunity, collaboration, project…"
        />
      </label>

      <label className="block">
        <span className={labelClass}>Message *</span>
        <textarea
          name="message"
          rows={6}
          required
          maxLength={6000}
          className={`${fieldClass} resize-y leading-7`}
          placeholder="Tell me what you would like to discuss."
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-[#c8a878]/32 px-6 py-3 text-[11px] uppercase tracking-[.14em] text-[#e7ddca] transition-colors hover:border-[#c8a878] hover:bg-[#c8a878]/10 hover:text-[#c8a878] disabled:cursor-wait disabled:opacity-45"
        >
          {status === "sending" ? "Sending…" : "Send message ↗"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`max-w-md text-sm ${status === "success" ? "text-[#c8a878]" : status === "error" ? "text-[#c98e72]" : "text-[#d8cbb6]/52"}`}
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
