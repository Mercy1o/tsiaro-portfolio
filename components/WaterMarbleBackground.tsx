"use client";

export default function WaterMarbleBackground() {
  return (
    <div className="water-marble" aria-hidden="true">
      <svg className="water-marble__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="water-marble-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.028"
              numOctaves="4"
              seed="14"
              stitchTiles="stitch"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="34s"
                values="0.012 0.028;0.016 0.022;0.01 0.032;0.012 0.028"
                repeatCount="indefinite"
              />
            </feTurbulence>

            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                0.52 0    0    0 0.38
                0    0.54 0    0 0.39
                0    0    0.52 0 0.38
                0    0    0.28 0 0.68
              "
              result="stoneNoise"
            />

            <feDisplacementMap
              in="stoneNoise"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="B"
            >
              <animate
                attributeName="scale"
                dur="28s"
                values="14;22;17;14"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>

        <rect width="100" height="100" fill="#e4e2dc" />
        <rect width="100" height="100" fill="#d4d5d0" filter="url(#water-marble-filter)" opacity="0.9" />
      </svg>
      <div className="water-marble__wash" />
    </div>
  );
}
