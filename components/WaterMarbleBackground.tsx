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
              baseFrequency="0.021 0.041"
              numOctaves="5"
              seed="14"
              stitchTiles="stitch"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="42s"
                values="0.021 0.041;0.024 0.036;0.018 0.046;0.021 0.041"
                repeatCount="indefinite"
              />
            </feTurbulence>

            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                0.82 0    0    0 0.20
                0    0.84 0    0 0.22
                0    0    0.82 0 0.21
                0    0    0.46 0 0.80
              "
              result="stoneNoise"
            />

            <feDisplacementMap
              in="stoneNoise"
              in2="noise"
              scale="27"
              xChannelSelector="R"
              yChannelSelector="B"
            >
              <animate
                attributeName="scale"
                dur="34s"
                values="22;30;25;22"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>

          <filter id="water-vein-filter" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.038 0.074"
              numOctaves="4"
              seed="31"
              stitchTiles="stitch"
              result="veinNoise"
            >
              <animate
                attributeName="baseFrequency"
                dur="48s"
                values="0.038 0.074;0.044 0.066;0.034 0.081;0.038 0.074"
                repeatCount="indefinite"
              />
            </feTurbulence>

            <feColorMatrix
              in="veinNoise"
              type="matrix"
              values="
                1.25 0    0    0 -0.18
                0    1.25 0    0 -0.18
                0    0    1.25 0 -0.18
                0    0    0    .72 0
              "
              result="veinContrast"
            />

            <feComponentTransfer in="veinContrast" result="veins">
              <feFuncR type="gamma" amplitude="1" exponent="1.65" offset="0" />
              <feFuncG type="gamma" amplitude="1" exponent="1.65" offset="0" />
              <feFuncB type="gamma" amplitude="1" exponent="1.65" offset="0" />
              <feFuncA type="linear" slope="0.78" />
            </feComponentTransfer>

            <feDisplacementMap
              in="veins"
              in2="veinNoise"
              scale="13"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="40s"
                values="10;15;12;10"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>

        <rect width="100" height="100" fill="#e8e6e0" />
        <rect className="water-marble__base" width="100" height="100" fill="#cfd3d0" filter="url(#water-marble-filter)" opacity="0.92" />
        <rect className="water-marble__veins" width="100" height="100" fill="#aeb5b2" filter="url(#water-vein-filter)" opacity="0.58" />
      </svg>
      <div className="water-marble__wash" />
    </div>
  );
}
