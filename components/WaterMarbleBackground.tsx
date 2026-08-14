"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const horizontalLines = Array.from({ length: 17 }, (_, i) => {
  const y = 70 + i * 58;
  const bend = i % 2 === 0 ? 34 : -24;
  return `M-120 ${y} C240 ${y + bend} 430 ${y - bend * 0.6} 760 ${y + bend * 0.2} C1080 ${y - bend} 1320 ${y + bend * 0.8} 1720 ${y}`;
});

const verticalLines = Array.from({ length: 24 }, (_, i) => {
  const x = -20 + i * 72;
  const bend = i % 3 === 0 ? 54 : i % 3 === 1 ? -38 : 24;
  return `M${x} -100 C${x + bend} 210 ${x - bend * 0.55} 470 ${x + bend * 0.35} 700 C${x - bend * 0.45} 860 ${x + bend * 0.2} 980 ${x} 1120`;
});

const contours = [
  "M-110 730 C90 610 210 592 350 650 C482 705 570 818 740 824 C922 830 1000 680 1160 636 C1324 590 1456 666 1710 556",
  "M-120 770 C82 646 218 632 364 692 C506 752 592 858 754 866 C934 874 1026 726 1178 678 C1340 628 1476 702 1724 598",
  "M-132 812 C68 692 224 672 378 736 C520 796 612 900 770 908 C944 916 1046 772 1194 724 C1356 672 1496 746 1740 642",
  "M980 98 C1108 38 1260 54 1352 144 C1436 226 1424 338 1330 408 C1228 484 1090 454 1018 356 C948 262 900 138 980 98 Z",
  "M1022 134 C1122 88 1236 98 1310 166 C1378 230 1368 316 1294 370 C1214 428 1110 404 1052 330 C994 256 958 166 1022 134 Z",
  "M1048 168 C1128 132 1218 138 1276 190 C1326 236 1320 302 1260 344 C1198 388 1120 370 1074 312 C1028 254 1000 190 1048 168 Z",
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
      <svg className="portfolio-paper" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <rect width="1600" height="1000" className="portfolio-paper__base" />

        <g className="portfolio-paper__grid">
          {horizontalLines.map((d, index) => <path key={`h-${index}`} d={d} />)}
          {verticalLines.map((d, index) => <path key={`v-${index}`} d={d} />)}
        </g>

        <g className="portfolio-paper__contours">
          {contours.map((d, index) => <path key={`c-${index}`} d={d} />)}
        </g>

        <g className="portfolio-paper__marks">
          <path className="portfolio-paper__mark-red" d="M188 816 C214 790 250 778 288 784 C260 806 236 830 220 862" />
          <path className="portfolio-paper__mark-yellow" d="M1328 222 L1362 206 L1350 244 L1388 230" />
        </g>
      </svg>
      <div className="water-marble__wash" />
    </div>
  );
}
