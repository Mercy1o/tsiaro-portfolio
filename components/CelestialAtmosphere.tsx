"use client";

import { useReducedMotion } from "motion/react";

type CelestialAtmosphereProps = {
  className?: string;
};

export default function CelestialAtmosphere({ className = "" }: CelestialAtmosphereProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_18%,rgba(201,150,83,.13),transparent_18%),radial-gradient(circle_at_66%_25%,rgba(175,113,55,.08),transparent_13%),linear-gradient(180deg,#070706_0%,#090806_52%,#0b0907_100%)]" />

      <div className={`absolute left-[54%] top-[2%] h-[19vw] min-h-[160px] w-[19vw] min-w-[160px] -translate-x-1/2 rounded-full ${reduceMotion ? "" : "star-primary"}`}>
        <div className="absolute inset-[-110%] rounded-full bg-[radial-gradient(circle,rgba(255,239,206,.28)_0%,rgba(237,194,128,.18)_13%,rgba(194,129,67,.08)_31%,rgba(108,66,34,.025)_51%,transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[2px] w-[205%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#fff3d7]/65 to-transparent blur-[.3px]" />
        <div className="absolute left-1/2 top-1/2 h-[205%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#ffe8bd]/38 to-transparent blur-[.4px]" />
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_43%_38%,#fffdf4_0%,#fff0cd_5%,#e9bf7b_18%,#b06f36_43%,#5b331e_68%,#19100c_100%)] shadow-[0_0_34px_rgba(255,239,204,.92),0_0_86px_rgba(234,184,112,.68),0_0_180px_rgba(180,112,55,.34)]" />
        <div className={`absolute inset-[7%] rounded-full border border-[#fff2d1]/20 ${reduceMotion ? "" : "star-shimmer"}`} />
        <div className="absolute inset-[13%] rounded-full opacity-65 mix-blend-screen [background-image:radial-gradient(circle_at_28%_30%,rgba(255,247,221,.75)_0_1px,transparent_2px),radial-gradient(circle_at_63%_58%,rgba(68,37,20,.8)_0_2px,transparent_4px),radial-gradient(circle_at_46%_72%,rgba(255,221,167,.42)_0_1px,transparent_3px)] [background-size:19px_19px,27px_27px,31px_31px]" />
      </div>

      <div className={`absolute left-[68%] top-[14%] h-[8.5vw] min-h-[72px] w-[8.5vw] min-w-[72px] -translate-x-1/2 rounded-full ${reduceMotion ? "" : "star-secondary"}`}>
        <div className="absolute inset-[-130%] rounded-full bg-[radial-gradient(circle,rgba(255,237,199,.24),rgba(225,174,105,.13)_20%,rgba(145,88,42,.045)_43%,transparent_71%)] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-px w-[240%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#ffebc5]/54 to-transparent" />
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_39%_34%,#fff8e9_0%,#f3d49f_8%,#c58647_35%,#754220_65%,#1b110c_100%)] shadow-[0_0_30px_rgba(255,237,199,.8),0_0_70px_rgba(222,163,91,.52),0_0_135px_rgba(159,95,44,.28)]" />
      </div>

      <div className={`absolute left-[49%] top-[5%] h-[36vh] w-[48vw] min-w-[450px] -translate-x-1/2 rounded-[50%] opacity-70 blur-3xl ${reduceMotion ? "" : "stellar-fog-a"} bg-[radial-gradient(ellipse,rgba(170,113,57,.14),rgba(112,73,39,.055)_44%,transparent_73%)]`} />
      <div className={`absolute left-[66%] top-[8%] h-[32vh] w-[40vw] min-w-[390px] -translate-x-1/2 rounded-[50%] opacity-52 blur-3xl ${reduceMotion ? "" : "stellar-fog-b"} bg-[radial-gradient(ellipse,rgba(215,159,91,.12),rgba(98,58,31,.045)_52%,transparent_75%)]`} />

      <div className={`absolute inset-x-[-10%] top-[20%] h-[42%] opacity-52 ${reduceMotion ? "" : "heat-haze"}`}>
        <svg viewBox="0 0 1600 420" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <filter id="heat-distort" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.035" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <linearGradient id="haze-line" x1="0" x2="1">
              <stop offset="0" stopColor="rgba(245,236,218,0)" />
              <stop offset="0.34" stopColor="rgba(245,236,218,.21)" />
              <stop offset="0.62" stopColor="rgba(221,196,158,.13)" />
              <stop offset="1" stopColor="rgba(245,236,218,0)" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#haze-line)" strokeWidth="0.85" filter="url(#heat-distort)">
            {Array.from({ length: 11 }, (_, index) => (
              <path
                key={index}
                d={`M-120 ${78 + index * 25} C 230 ${42 + index * 21} 430 ${138 + index * 24} 720 ${84 + index * 24} S 1190 ${126 + index * 18} 1740 ${74 + index * 24}`}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className={`absolute inset-x-[-8%] bottom-[5%] h-[38%] ${reduceMotion ? "" : "dust-breath"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_70%,rgba(149,97,53,.15),transparent_43%),radial-gradient(ellipse_at_72%_52%,rgba(183,127,67,.09),transparent_38%)] blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[.2] mix-blend-soft-light [background-image:radial-gradient(circle_at_25%_32%,rgba(255,255,255,.78)_0_.45px,transparent_.72px),radial-gradient(circle_at_72%_64%,rgba(214,177,120,.52)_0_.35px,transparent_.65px)] [background-size:7px_7px,11px_11px]" />

      <div className="absolute inset-x-0 top-0 h-[24vh] bg-gradient-to-b from-[#070706]/82 via-[#070706]/24 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[28vh] bg-gradient-to-t from-[#070706]/86 via-[#070706]/42 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-[#070706]/58 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[14vw] bg-gradient-to-l from-[#070706]/56 to-transparent" />

      <style>{`
        .star-primary { animation: starFloatPrimary 16s ease-in-out infinite alternate; }
        .star-secondary { animation: starFloatSecondary 20s ease-in-out infinite alternate; }
        .star-shimmer { animation: starShimmer 3.8s ease-in-out infinite; }
        .stellar-fog-a { animation: fogDriftA 29s ease-in-out infinite alternate; }
        .stellar-fog-b { animation: fogDriftB 35s ease-in-out infinite alternate; }
        .heat-haze { animation: heatHaze 8.5s ease-in-out infinite alternate; }
        .dust-breath { animation: dustBreath 20s ease-in-out infinite alternate; }
        @keyframes starFloatPrimary {
          0% { transform: translate3d(-50%,0,0) scale(1); }
          100% { transform: translate3d(-49.2%,7px,0) scale(1.028); }
        }
        @keyframes starFloatSecondary {
          0% { transform: translate3d(-50%,0,0) scale(.98); }
          100% { transform: translate3d(-51.1%,9px,0) scale(1.04); }
        }
        @keyframes starShimmer {
          0%, 100% { opacity:.35; transform: scale(.98); box-shadow:0 0 22px rgba(255,240,209,.18); }
          48% { opacity:.92; transform: scale(1.035); box-shadow:0 0 54px rgba(255,240,209,.54); }
        }
        @keyframes fogDriftA {
          0% { transform: translate3d(-51%,0,0) scale(1); opacity:.48; }
          100% { transform: translate3d(-46%,14px,0) scale(1.09); opacity:.72; }
        }
        @keyframes fogDriftB {
          0% { transform: translate3d(-53%,8px,0) scale(.97); opacity:.36; }
          100% { transform: translate3d(-47%,-10px,0) scale(1.08); opacity:.58; }
        }
        @keyframes heatHaze {
          0% { transform: translate3d(-.6%,0,0) scaleY(.98); opacity:.34; }
          100% { transform: translate3d(.7%,7px,0) scaleY(1.05); opacity:.58; }
        }
        @keyframes dustBreath {
          0% { transform: translate3d(-1.5%,8px,0) scale(1); opacity:.52; }
          100% { transform: translate3d(1.8%,-6px,0) scale(1.06); opacity:.76; }
        }
      `}</style>
    </div>
  );
}
