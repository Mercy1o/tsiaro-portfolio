import { siteConfig } from "@/data/site";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 20_000;
const recentRequests = new Map<string, number>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host && new URL(origin).host !== host) {
      return Response.json({ ok: false, message: "Request not allowed." }, { status: 403 });
    }

    const clientKey = getClientKey(request);
    const now = Date.now();
    const previousRequest = recentRequests.get(clientKey) ?? 0;

    if (now - previousRequest < RATE_LIMIT_WINDOW_MS) {
      return Response.json(
        { ok: false, message: "Please wait a few seconds before sending another message." },
        { status: 429 },
      );
    }

    let payload: ContactPayload;

    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
    }

    const name = clean(payload.name, 100);
    const email = clean(payload.email, 180).toLowerCase();
    const subject = clean(payload.subject, 140) || "Portfolio enquiry";
    const message = clean(payload.message, 6000);
    const website = clean(payload.website, 200);

    // Honeypot: real visitors never fill this field.
    if (website) {
      return Response.json({ ok: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, message: "Please complete your name, email and message." },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Tsiaro Portfolio <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("Contact form is missing RESEND_API_KEY.");
      return Response.json(
        { ok: false, message: "The contact channel is temporarily unavailable." },
        { status: 503 },
      );
    }

    recentRequests.set(clientKey, now);

    const text = [
      "New portfolio message",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
      "",
      `Sent from ${siteConfig.name}'s portfolio website.`,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "tsiaro-portfolio/1.0",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio - ${subject}`,
        text,
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend contact error:", resendResponse.status, errorBody);
      return Response.json(
        { ok: false, message: "Your message could not be sent. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, message: "Message sent. Thank you - I’ll get back to you soon." });
  } catch (error) {
    console.error("Contact route error:", error);
    return Response.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
