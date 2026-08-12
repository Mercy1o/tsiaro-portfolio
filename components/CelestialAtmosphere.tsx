"use client";

import { useReducedMotion } from "motion/react";

type CelestialAtmosphereProps = {
  className?: string;
};

export default function CelestialAtmosphere({ className = "" }: CelestialAtmosphereProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(132,91,50,.06),transparent_24%),linear-gradient(180deg,#070706_0%,#080705_52%,#0a0806_100%)]" />

      <div className={`absolute left-[54%] top-[4%] h-[18vw] min-h-[150px] w-[18vw] min-w-[150px] -translate-x-1/2 rounded-full ${reduceMotion ? "" : "star-primary"}`}>
        <div className="absolute inset-[-42%] rounded-full bg-[radial-gradient(circle,rgba(224,190,138,.16)_0%,rgba(180,126,69,.09)_26%,rgba(113,76,39,.035)_47%,transparent_69%)] blur-2xl" />
        <div className="absolute inset-[13%] rounded-full bg-[radial-gradient(circle_at_42%_38%,#e5c79a_0%,#b47b45_34%,#5d3823_68%,#1b120e_100%)] shadow-[0_0_58px_rgba(190,137,79,.22),0_0_140px_rgba(144,93,47,.08)]" />
        <div className="absolute inset-[16%] rounded-full opacity-55 mix-blend-screen [background-image:radial-gradient(circle_at_28%_30%,rgba(255,235,196,.42)_0_1px,transparent_2px),radial-gradient(circle_at_63%_58%,rgba(52,30,20,.72)_0_2px,transparent_4px),radial-gradient(circle_at_46%_72%,rgba(246,202,143,.24)_0_1px,transparent_3px)] [background-size:19px_19px,27px_27px,31px_31px]" />
      </div>

      <div className={`absolute left-[68%] top-[16%] h-[7vw] min-h-[62px] w-[7vw] min-w-[62px] -translate-x-1/2 rounded-full ${reduceMotion ? "" : "star-secondary"}`}>
        <div className="absolute inset-[-75%] rounded-full bg-[radial-gradient(circle,rgba(213,177,121,.14),rgba(145,94,48,.05)_38%,transparent_72%)] blur-xl" />
        <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_39%_34%,#d7b077_0%,#9c6539_41%,#4b2e20_72%,#17100c_100%)] shadow-[0_0_42px_rgba(175,122,66,.17)]" />
      </div>

      <div className={`absolute left-[47%] top-[7%] h-[34vh] w-[44vw] min-w-[430px] -translate-x-1/2 rounded-[50%] opacity-55 blur-2xl ${reduceMotion ? "" : "stellar-fog-a"} bg-[radial-gradient(ellipse,rgba(117,78,43,.11),rgba(94,61,35,.04)_45%,transparent_72%)]`} />
      <div className={`absolute left-[65%] top-[10%] h-[30vh] w-[38vw] min-w-[380px] -translate-x-1/2 rounded-[50%] opacity-38 blur-3xl ${reduceMotion ? "" : "stellar-fog-b"} bg-[radial-gradient(ellipse,rgba(185,130,72,.09),rgba(84,52,31,.04)_52%,transparent_75%)]`} />

      <div className={`absolute inset-x-[-10%] top-[22%] h-[38%] opacity-40 ${reduceMotion ? "" : "heat-haze"}`}>
        <svg viewBox="0 0 1600 420" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <filter id="heat-distort" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.035" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="17" xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <linearGradient id="haze-line" x1="0" x2="1">
              <stop offset="0" stopColor="rgba(225,218,203,0)" />
              <stop offset="0.34" stopColor="rgba(225,218,203,.15)" />
              <stop offset="0.62" stopColor="rgba(202,184,154,.09)" />
              <stop offset="1" stopColor="rgba(225,218,203,0)" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#haze-line)" strokeWidth="0.8" filter="url(#heat-distort)">
            {Array.from({ length: 9 }, (_, index) => (
              <path
                key={index}
                d={`M-120 ${90 + index * 27} C 230 ${48 + index * 22} 430 ${145 + index * 25} 720 ${90 + index * 25} S 1190 ${132 + index * 18} 1740 ${80 + index * 25}`}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className={`absolute inset-x-[-8%] bottom-[5%] h-[36%] ${reduceMotion ? "" : "dust-breath"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_70%,rgba(124,83,49,.13),transparent_43%),radial-gradient(ellipse_at_72%_52%,rgba(160,108,60,.07),transparent_38%)] blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[.18] mix-blend-soft-light [background-image:radial-gradient(circle_at_25%_32%,rgba(255,255,255,.7)_0_.45px,transparent_.72px),radial-gradient(circle_at_72%_64%,rgba(197,165,115,.45)_0_.35px,transparent_.65px)] [background-size:7px_7px,11px_11px]" />

      <div className="absolute inset-x-0 top-0 h-[28vh] bg-gradient-to-b from-[#070706] via-[#070706]/38 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[32vh] bg-gradient-to-t from-[#070706] via-[#070706]/52 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[20vw] bg-gradient-to-r from-[#070706]/72 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[18vw] bg-gradient-to-l from-[#070706]/68 to-transparent" />

      <style>{`
        .star-primary { animation: starFloatPrimary 19s ease-in-out infinite alternate; }
        .star-secondary { animation: starFloatSecondary 24s ease-in-out infinite alternate; }
        .stellar-fog-a { animation: fogDriftA 31s ease-in-out infinite alternate; }
        .stellar-fog-b { animation: fogDriftB 37s ease-in-out infinite alternate; }
        .heat-haze { animation: heatHaze 10s ease-in-out infinite alternate; }
        .dust-breath { animation: dustBreath 22s ease-in-out infinite alternate; }
        @keyframes starFloatPrimary {
          0% { transform: translate3d(-50%,0,0) scale(1); }
          100% { transform: translate3d(-49.2%,8px,0) scale(1.025); }
        }
        @keyframes starFloatSecondary {
          0% { transform: translate3d(-50%,0,0) scale(.98); }
          100% { transform: translate3d(-51.2%,10px,0) scale(1.035); }
        }
        @keyframes fogDriftA {
          0% { transform: translate3d(-51%,0,0) scale(1); opacity:.38; }
          100% { transform: translate3d(-46%,14px,0) scale(1.09); opacity:.62; }
        }
        @keyframes fogDriftB {
          0% { transform: translate3d(-53%,8px,0) scale(.97); opacity:.28; }
          100% { transform: translate3d(-47%,-10px,0) scale(1.08); opacity:.48; }
        }
        @keyframes heatHaze {
          0% { transform: translate3d(-.6%,0,0) scaleY(.98); opacity:.28; }
          100% { transform: translate3d(.7%,7px,0) scaleY(1.045); opacity:.48; }
        }
        @keyframes dustBreath {
          0% { transform: translate3d(-1.5%,8px,0) scale(1); opacity:.48; }
          100% { transform: translate3d(1.8%,-6px,0) scale(1.06); opacity:.72; }
        }
      `}</style>
    </div>
  );
}
