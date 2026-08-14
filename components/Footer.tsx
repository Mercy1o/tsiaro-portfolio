import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative bg-transparent px-5 pb-8 pt-7 md:px-10 md:pb-9 md:pt-8 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 font-mono text-[9px] uppercase tracking-[.16em] md:text-[10px]">
        <div aria-hidden="true" />

        <div className="flex items-center justify-center gap-x-7 md:gap-x-8">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="footer-readable transition-opacity hover:opacity-55"
          >
            Instagram ↗
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="footer-readable transition-opacity hover:opacity-55"
          >
            LinkedIn ↗
          </a>
        </div>

        <p className="footer-readable justify-self-end">© {year}</p>
      </div>
    </footer>
  );
}
