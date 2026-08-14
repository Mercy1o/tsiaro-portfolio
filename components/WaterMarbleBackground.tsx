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
      <svg className="water-marble__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="water-marble-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.032"
              numOctaves="5"
              seed="14"
              stitchTiles="stitch"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="38s"
                values="0.018 0.032;0.021 0.027;0.015 0.036;0.018 0.032"
                repeatCount="indefinite"
              />
            </feTurbulence>

            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                0.72 0    0    0 0.28
                0    0.76 0    0 0.30
                0    0    0.74 0 0.29
                0    0    0.42 0 0.76
              "
              result="stoneNoise"
            />

            <feDisplacementMap
              in="stoneNoise"
              in2="noise"
              scale="24"
              xChannelSelector="R"
              yChannelSelector="B"
            >
              <animate
                attributeName="scale"
                dur="32s"
                values="20;28;23;20"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>

        <rect width="100" height="100" fill="#e7e5df" />
        <rect width="100" height="100" fill="#cfd3d0" filter="url(#water-marble-filter)" opacity="0.96" />
      </svg>
      <div className="water-marble__wash" />
    </div>
  );
}
