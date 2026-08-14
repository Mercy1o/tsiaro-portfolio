"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function WaterMarbleBackground() {
  const pathname = usePathname();
  const [softened, setSoftened] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setSoftened(true);
      return;
    }

    const onScroll = () => {
      setSoftened(window.scrollY > 56);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <div
      className={`water-marble ${softened ? "water-marble--soft" : "water-marble--sharp"}`}
      aria-hidden="true"
    >
      <div className="water-marble__surface" />
      <div className="water-marble__wash" />
    </div>
  );
}
