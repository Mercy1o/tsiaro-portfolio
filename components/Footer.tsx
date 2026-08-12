import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080706] px-5 pb-9 pt-10 text-[#a99475] md:px-10 md:pb-10 md:pt-12 lg:px-14">
      <div className="mx-auto max-w-[1600px] border-t border-[#a98758]/14 pt-6">
        <div className="flex flex-col gap-5 font-mono text-[10px] uppercase tracking-[.16em] text-[#8f7a61]/62 md:flex-row md:items-center md:justify-between md:text-[11px]">
          <p>{siteConfig.name} · {siteConfig.location}</p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#d9c19c]"
            >
              Instagram ↗
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#d9c19c]"
            >
              LinkedIn ↗
            </a>
          </div>

          <p>© {year}</p>
        </div>
      </div>
    </footer>
  );
}
