"use client";

import { useReducedMotion } from "motion/react";

type AtmosphericTerrainProps = {
  className?: string;
  variant?: "planetary" | "liquid" | "hybrid";
  tone?: "dark" | "light";
  showAnalysis?: boolean;
};

const contourOffsets = Array.from({ length: 14 }, (_, index) => index);
const islandScales = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

export default function AtmosphericTerrain({
  className = "",
  variant = "hybrid",
  tone = "dark",
  showAnalysis = true,
}: AtmosphericTerrainProps) {
  const reduceMotion = useReducedMotion();
  const dark = tone === "dark";
  const line = dark ? "rgba(231,220,198,.46)" : "rgba(39,35,30,.28)";
  const faint = dark ? "rgba(201,166,113,.23)" : "rgba(39,35,30,.13)";
  const accent = dark ? "rgba(203,165,108,.8)" : "rgba(144,109,68,.58)";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-[radial-gradient(circle_at_68%_38%,rgba(205,164,105,.14),transparent_22%),radial-gradient(circle_at_42%_76%,rgba(113,83,51,.09),transparent_24%),linear-gradient(180deg,#0c0b09_0%,#070706_58%,#0b0907_100%)]"
            : "bg-[radial-gradient(circle_at_72%_30%,rgba(255,255,255,.82),transparent_24%),linear-gradient(180deg,#eee9df_0%,#e8e1d5_100%)]"
        }`}
      />

      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-[-8%] h-[116%] w-[116%]"
        role="presentation"
      >
        <g
          className={reduceMotion ? "" : "terrain-drift-a"}
          fill="none"
          stroke={line}
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        >
          {contourOffsets.map((index) => (
            <path
              key={`ridge-${index}`}
              opacity={Math.max(0.12, 0.5 - index * 0.022)}
              transform={`translate(0 ${index * 15})`}
              d="M-110 585 C 40 510 122 522 222 566 C 336 617 414 619 520 555 C 630 489 713 474 820 514 C 936 558 1028 565 1145 512 C 1252 463 1330 468 1500 532"
            />
          ))}
        </g>

        {(variant === "liquid" || variant === "hybrid") && (
          <g
            className={reduceMotion ? "" : "terrain-drift-b"}
            fill="none"
            stroke={faint}
            strokeWidth="0.72"
            vectorEffect="non-scaling-stroke"
          >
            {contourOffsets.slice(0, 11).map((index) => (
              <path
                key={`flow-${index}`}
                opacity={Math.max(0.08, 0.34 - index * 0.02)}
                transform={`translate(${index * 4} ${index * 18 - 70})`}
                d="M-80 320 C 75 230 170 362 310 284 S 545 205 675 285 S 920 386 1055 296 S 1270 206 1480 315"
              />
            ))}
          </g>
        )}

        {(variant === "planetary" || variant === "hybrid") && (
          <g className={reduceMotion ? "" : "terrain-islands"} fill="none" stroke={faint} strokeWidth="0.82">
            {islandScales.map((scale, index) => (
              <path
                key={`island-a-${scale}`}
                opacity={0.5 - index * 0.045}
                transform={`translate(${620 * (1 - scale)} ${345 * (1 - scale)}) scale(${scale})`}
                d="M384 366 C365 308 409 246 475 219 C551 188 619 215 664 180 C719 138 815 145 862 206 C910 267 886 329 924 366 C962 404 941 480 878 511 C812 544 752 516 696 544 C628 578 542 557 509 500 C475 442 406 431 384 366 Z"
              />
            ))}
            {islandScales.slice(1).map((scale, index) => (
              <path
                key={`island-b-${scale}`}
                opacity={0.32 - index * 0.032}
                transform={`translate(${1020 * (1 - scale)} ${620 * (1 - scale)}) scale(${scale})`}
                d="M940 626 C927 580 951 536 1000 515 C1054 492 1101 512 1132 552 C1167 598 1154 655 1114 686 C1072 719 1008 716 971 682 C954 666 945 647 940 626 Z"
              />
            ))}
          </g>
        )}

        <g fill="none" stroke={accent} strokeWidth="0.8" opacity="0.55">
          <path d="M118 732 C320 646 452 670 612 617 S945 520 1270 595" />
          <path d="M95 758 C310 690 472 705 638 655 S964 568 1304 625" opacity="0.55" />
        </g>

        {showAnalysis && (
          <g opacity="0.7">
            <circle cx="696" cy="458" r="154" fill="none" stroke={faint} strokeWidth="0.8" />
            <circle cx="696" cy="458" r="4" fill={accent} />
            <path d="M696 282 V636 M520 458 H875" stroke={faint} strokeWidth="0.6" strokeDasharray="3 12" />
            <path d="M1060 184 H1288 M1060 216 H1225 M1060 248 H1262" stroke={faint} strokeWidth="0.65" />
            <circle cx="1060" cy="184" r="2.5" fill={accent} />
            <circle cx="1060" cy="216" r="2.5" fill={accent} opacity="0.68" />
            <circle cx="1060" cy="248" r="2.5" fill={accent} opacity="0.45" />
          </g>
        )}
      </svg>

      <div className={`absolute inset-0 ${dark ? "bg-[radial-gradient(circle_at_center,transparent_16%,rgba(0,0,0,.72)_100%)]" : "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(232,225,213,.3)_100%)]"}`} />
      <div className="terrain-grain absolute inset-0 opacity-[.16] mix-blend-soft-light" />
      <div className={`absolute left-[49.7%] top-[50.4%] h-1.5 w-1.5 rounded-full ${dark ? "bg-sand shadow-[0_0_36px_rgba(203,165,108,.72)]" : "bg-[#8e6a44]"}`} />

      <style>{`
        .terrain-drift-a { transform-origin: 50% 55%; animation: terrainDriftA 22s ease-in-out infinite alternate; }
        .terrain-drift-b { transform-origin: 54% 42%; animation: terrainDriftB 28s ease-in-out infinite alternate; }
        .terrain-islands { transform-origin: 50% 50%; animation: terrainPulse 30s ease-in-out infinite alternate; }
        .terrain-grain {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,.55) 0 .45px, transparent .65px),
            radial-gradient(circle at 70% 65%, rgba(0,0,0,.8) 0 .45px, transparent .7px);
          background-size: 5px 5px, 7px 7px;
        }
        @keyframes terrainDriftA {
          from { transform: translate3d(-1.2%, 1.2%, 0) scale(1.01); }
          to { transform: translate3d(1.4%, -1.1%, 0) scale(1.035); }
        }
        @keyframes terrainDriftB {
          from { transform: translate3d(1.3%, -1%, 0) scale(1.02); }
          to { transform: translate3d(-1.6%, 1.2%, 0) scale(1.045); }
        }
        @keyframes terrainPulse {
          from { transform: rotate(-.5deg) scale(1); }
          to { transform: rotate(.6deg) scale(1.025); }
        }
      `}</style>
    </div>
  );
}
