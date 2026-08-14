"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type HillField = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  levels: number;
  stepX: number;
  stepY: number;
};

type TreeCluster = [number, number, number, number];

const hillFields: HillField[] = [
  { cx: 170, cy: 130, rx: 330, ry: 235, rotation: -17, levels: 24, stepX: 11.4, stepY: 8.1 },
  { cx: 470, cy: 345, rx: 290, ry: 205, rotation: 12, levels: 23, stepX: 10.6, stepY: 7.5 },
  { cx: 860, cy: 140, rx: 315, ry: 188, rotation: -8, levels: 22, stepX: 11.2, stepY: 6.5 },
  { cx: 1280, cy: 255, rx: 355, ry: 235, rotation: 18, levels: 25, stepX: 11.8, stepY: 7.8 },
  { cx: 1510, cy: 720, rx: 330, ry: 230, rotation: -14, levels: 23, stepX: 11.2, stepY: 7.9 },
  { cx: 1080, cy: 760, rx: 300, ry: 210, rotation: 8, levels: 22, stepX: 10.7, stepY: 7.3 },
  { cx: 570, cy: 840, rx: 355, ry: 228, rotation: -10, levels: 25, stepX: 11.7, stepY: 7.4 },
  { cx: 80, cy: 820, rx: 285, ry: 205, rotation: 14, levels: 21, stepX: 10.4, stepY: 7.4 },
];

const terraceLines = [
  "M-100 225 C115 145 250 168 388 258 C526 348 676 352 820 250 C972 142 1130 135 1280 230 C1424 322 1550 308 1710 206",
  "M-120 292 C96 214 242 230 384 320 C526 410 690 410 842 308 C994 206 1144 200 1294 292 C1440 382 1570 370 1730 268",
  "M-130 368 C92 288 240 300 388 390 C542 484 712 488 864 386 C1022 278 1172 278 1320 366 C1460 450 1582 446 1740 342",
  "M-132 452 C102 366 252 378 400 468 C554 560 732 568 888 466 C1044 364 1194 362 1342 452 C1480 536 1602 532 1756 432",
  "M-118 542 C118 454 270 464 420 554 C578 650 752 658 914 558 C1072 458 1224 456 1370 546 C1506 630 1628 624 1778 526",
  "M-92 636 C138 554 292 560 442 650 C602 746 776 756 938 660 C1098 562 1252 560 1398 648 C1532 730 1650 728 1796 632",
  "M-62 732 C162 652 316 656 466 744 C628 840 800 850 964 756 C1124 662 1280 660 1426 746 C1558 824 1678 824 1820 730",
  "M-24 826 C188 754 340 756 494 840 C654 928 824 938 988 848 C1150 760 1304 756 1452 840 C1582 914 1700 916 1842 830",
];

const paths = [
  "M-60 730 C126 670 232 572 284 438 C344 284 466 198 664 214 C826 228 922 196 1020 98",
  "M760 1080 C758 894 840 800 986 758 C1146 712 1260 640 1360 526 C1456 418 1542 372 1700 326",
  "M116 1030 C268 900 346 818 410 708 C474 594 568 542 694 550 C806 556 884 536 960 486",
];

const treeClusters: TreeCluster[] = [
  [120, 188, 1.05, -12], [186, 222, .82, 8], [252, 178, .94, -4], [304, 238, .72, 14],
  [392, 300, .84, -8], [460, 260, .68, 11], [520, 328, .9, -14], [580, 296, .72, 6],
  [1012, 156, .88, 12], [1074, 194, .74, -10], [1134, 142, .92, 6], [1196, 184, .7, -8],
  [1250, 146, .82, 14], [1320, 206, .96, -12], [1384, 168, .76, 8], [1450, 222, .88, -4],
  [1080, 566, .74, -8], [1134, 602, .86, 12], [1192, 570, .7, -4], [1254, 616, .9, 8],
  [1312, 586, .74, -10], [1370, 630, .84, 7], [1434, 596, .68, -6],
  [388, 720, .82, 8], [450, 748, .72, -8], [508, 706, .9, 12], [566, 754, .76, -5],
  [624, 714, .84, 8], [684, 766, .68, -10], [742, 724, .94, 5], [802, 776, .72, -7],
  [1504, 728, .82, -8], [1556, 690, .7, 12], [1608, 748, .9, -4],
  [146, 832, .72, 9], [204, 874, .86, -7], [264, 830, .68, 12],
];

export default function WaterMarbleBackground() {
  const pathname = usePathname();
  const [softened, setSoftened] = useState(pathname !== "/");

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
    <div className={`water-marble ${softened ? "water-marble--soft" : "water-marble--sharp"}`} aria-hidden="true">
      <svg className="terrain-plan" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="terrain-hill-fill" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#f4f1e9" />
            <stop offset="46%" stopColor="#e6e1d7" />
            <stop offset="78%" stopColor="#d6d1c7" />
            <stop offset="100%" stopColor="#c6c3bc" />
          </radialGradient>

          <filter id="terrain-paper-relief" x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="4" seed="23" stitchTiles="stitch" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="0.7" result="softNoise" />
            <feDiffuseLighting in="softNoise" surfaceScale="8" diffuseConstant="1.04" lightingColor="#ffffff" result="diffuse">
              <feDistantLight azimuth="315" elevation="48" />
            </feDiffuseLighting>
            <feSpecularLighting in="softNoise" surfaceScale="5" specularConstant="0.28" specularExponent="9" lightingColor="#ffffff" result="specular">
              <feDistantLight azimuth="315" elevation="58" />
            </feSpecularLighting>
            <feBlend in="diffuse" in2="specular" mode="screen" result="light" />
            <feColorMatrix in="light" type="matrix" values="0.72 0 0 0 0.18  0 0.72 0 0 0.17  0 0 0.70 0 0.15  0 0 0 .34 0" />
          </filter>

          <filter id="terrain-contour-warp" x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.0048 0.0076" numOctaves="3" seed="11" stitchTiles="stitch" result="warpNoise" />
            <feDisplacementMap in="SourceGraphic" in2="warpNoise" scale="23" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          <filter id="terrain-tree-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blur" />
            <feOffset in="blur" dx="2.2" dy="3.1" result="offset" />
            <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0.22  0 0 0 0 0.22  0 0 0 0 0.20  0 0 0 .16 0" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <symbol id="terrain-tree" viewBox="-24 -24 48 48">
            <circle cx="0" cy="0" r="11" />
            <circle cx="8" cy="-5" r="8" />
            <circle cx="-8" cy="5" r="8.5" />
            <circle cx="2" cy="8" r="7" />
            <circle cx="-2" cy="-9" r="6.5" />
          </symbol>
        </defs>

        <rect width="1600" height="1000" className="terrain-plan__base" />
        <rect width="1600" height="1000" className="terrain-plan__paper-relief" filter="url(#terrain-paper-relief)" />

        <g className="terrain-plan__masses">
          {hillFields.map((hill, index) => (
            <ellipse
              key={`mass-${index}`}
              cx={hill.cx}
              cy={hill.cy}
              rx={hill.rx * 0.92}
              ry={hill.ry * 0.92}
              transform={`rotate(${hill.rotation} ${hill.cx} ${hill.cy})`}
            />
          ))}
        </g>

        <g className="terrain-plan__contours" filter="url(#terrain-contour-warp)">
          {hillFields.map((hill, hillIndex) => (
            <g key={`hill-${hillIndex}`} transform={`rotate(${hill.rotation} ${hill.cx} ${hill.cy})`}>
              {Array.from({ length: hill.levels }, (_, level) => {
                const rx = hill.rx - level * hill.stepX;
                const ry = hill.ry - level * hill.stepY;
                if (rx < 16 || ry < 12) return null;
                return <ellipse key={`hill-${hillIndex}-level-${level}`} cx={hill.cx} cy={hill.cy} rx={rx} ry={ry} />;
              })}
            </g>
          ))}
          <g className="terrain-plan__terraces">
            {terraceLines.map((d, index) => <path key={`terrace-${index}`} d={d} />)}
          </g>
        </g>

        <g className="terrain-plan__paths terrain-plan__paths--shadow">
          {paths.map((d, index) => <path key={`path-shadow-${index}`} d={d} />)}
        </g>
        <g className="terrain-plan__paths terrain-plan__paths--surface">
          {paths.map((d, index) => <path key={`path-surface-${index}`} d={d} />)}
        </g>
        <g className="terrain-plan__paths terrain-plan__paths--edge">
          {paths.map((d, index) => <path key={`path-edge-${index}`} d={d} />)}
        </g>

        <g className="terrain-plan__trees" filter="url(#terrain-tree-shadow)">
          {treeClusters.map(([x, y, scale, rotation], index) => (
            <g key={`cluster-${index}`} transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
              <use href="#terrain-tree" x="-19" y="-15" width="38" height="38" />
              <use href="#terrain-tree" x="4" y="-4" width="32" height="32" />
              <use href="#terrain-tree" x="-34" y="5" width="29" height="29" />
              <use href="#terrain-tree" x="-4" y="15" width="28" height="28" />
            </g>
          ))}
        </g>
      </svg>
      <div className="water-marble__wash" />
    </div>
  );
}
