"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import marbleBg1 from "@/data/marble-bg-1";
import marbleBg2 from "@/data/marble-bg-2";
import marbleBg3 from "@/data/marble-bg-3";
import marbleBg4 from "@/data/marble-bg-4";

export default function WaterMarbleBackground() {
  const pathname = usePathname();
  const [softened, setSoftened] = useState(pathname !== "/");

  const backgroundImage = useMemo(
    () => `url("data:image/webp;base64,${marbleBg1}${marbleBg2}${marbleBg3}${marbleBg4}")`,
    [],
  );

  useEffect(() => {
    if (pathname !== "/") {
      setSoftened(true);
      return;
    }

    const onScroll = () => setSoftened(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <div
      className={`water-marble ${softened ? "water-marble--soft" : "water-marble--sharp"}`}
      aria-hidden="true"
    >
      <div className="water-marble__surface" style={{ backgroundImage }} />
      <div className="water-marble__wash" />
    </div>
  );
}
