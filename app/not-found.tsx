import Link from "next/link";

export default function NotFound() {
  return (
    <main className="space-field cinematic-grid flex min-h-[85svh] items-center px-5 pb-20 pt-32 text-bone md:px-10 lg:px-14">
      <div className="mx-auto w-full max-w-[1600px]">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-sand">404 / LOST SIGNAL</p>
        <h1 className="mt-8 text-[clamp(5rem,14vw,13rem)] font-medium uppercase leading-[.78] tracking-[-.07em]">
          Page<br />not found.
        </h1>
        <Link href="/" className="mt-10 inline-flex border border-white/15 px-5 py-3 text-xs uppercase tracking-[.16em] transition-colors hover:bg-bone hover:text-space">
          Return home ↗
        </Link>
      </div>
    </main>
  );
}
