import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.brand}.`,
};

export default function ContactPage() {
  return (
    <main className="site-page page-contact">
      <section className="site-shell contact-layout">
        <p className="eyebrow">Contact</p>
        <h1>Let’s talk.</h1>
        <a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email} ↗</a>
        <div className="contact-meta">
          <p>{siteConfig.location}</p>
          <div>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
