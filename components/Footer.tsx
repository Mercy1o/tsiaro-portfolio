import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative px-5 pb-8 pt-7 md:px-10 md:pb-9 md:pt-8 lg:px-14">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[.16em] md:text-[10px]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
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

        <p className="footer-readable shrink-0">© {year}</p>
      </div>
    </footer>
  );
}
