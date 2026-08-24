import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-shell site-footer-inner">
        <p>© {year} {siteConfig.brand}</p>
        <div className="site-footer-links">
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>
    </footer>
  );
}
