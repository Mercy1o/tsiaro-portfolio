"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: number;
  targetActive: number;
};

type Organism = {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  tentacles: number;
  tentacleLength: number;
  spread: number;
  phase: number;
  bend: number;
};

type Point = { x: number; y: number };

const TAU = Math.PI * 2;
const POINTER_RADIUS = 0.15;
const POINTER_PUSH = 0.03;
const POINTER_SWIRL = 0.014;
const HERO_FADE_START_PX = 90;
const HERO_FADE_END_PX = 390;

const ORGANISMS: Organism[] = [
  { x: 0.1, y: 0.14, radiusX: 0.055, radiusY: 0.038, rotation: 0.08, tentacles: 6, tentacleLength: 0.34, spread: 1.45, phase: 0.2, bend: 0.28 },
  { x: 0.42, y: 0.1, radiusX: 0.048, radiusY: 0.035, rotation: 0.72, tentacles: 5, tentacleLength: 0.31, spread: 1.3, phase: 1.4, bend: -0.24 },
  { x: 0.78, y: 0.17, radiusX: 0.06, radiusY: 0.041, rotation: 1.12, tentacles: 7, tentacleLength: 0.36, spread: 1.52, phase: 2.5, bend: 0.22 },
  { x: 0.94, y: 0.5, radiusX: 0.052, radiusY: 0.039, rotation: 2.88, tentacles: 6, tentacleLength: 0.35, spread: 1.38, phase: 3.7, bend: -0.3 },
  { x: 0.18, y: 0.61, radiusX: 0.062, radiusY: 0.043, rotation: -0.34, tentacles: 7, tentacleLength: 0.37, spread: 1.55, phase: 4.9, bend: 0.3 },
  { x: 0.58, y: 0.58, radiusX: 0.05, radiusY: 0.037, rotation: 0.35, tentacles: 5, tentacleLength: 0.32, spread: 1.25, phase: 6.1, bend: -0.22 },
  { x: 0.8, y: 0.86, radiusX: 0.057, radiusY: 0.04, rotation: 2.65, tentacles: 6, tentacleLength: 0.34, spread: 1.42, phase: 7.2, bend: 0.25 },
  { x: 0.29, y: 0.9, radiusX: 0.046, radiusY: 0.034, rotation: -0.9, tentacles: 5, tentacleLength: 0.3, spread: 1.28, phase: 8.4, bend: -0.2 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / Math.max(edge1 - edge0, 0.00001), 0, 1);
  return t * t * (3 - 2 * t);
}

function normalize(x: number, y: number): Point {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

export default function InteractiveFilamentField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasEl: HTMLCanvasElement = canvas;
    const context = canvasEl.getContext("2d", { alpha: true });
    if (!context) return;

    const ctx = context;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let visible = !document.hidden;
    let lastFrame = -Infinity;
    let smoothScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const pointer: PointerState = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      active: 0,
      targetActive: 0,
    };

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.15 : 1.4);
      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function scrollProgress() {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      return clamp(smoothScroll / maximum, 0, 1);
    }

    function heroProminence() {
      return 1 - smoothstep(HERO_FADE_START_PX, HERO_FADE_END_PX, smoothScroll);
    }

    function alphaFor(base: number, prominence: number, boost = 2.15) {
      return Math.min(0.72, base * (0.78 + prominence * boost));
    }

    function widthFor(base: number, prominence: number) {
      return base * (0.94 + prominence * 0.38);
    }

    function applyPointer(point: Point): Point {
      const dx = point.x - pointer.x;
      const dy = point.y - pointer.y;
      const d2 = dx * dx + dy * dy;
      const influence = Math.exp(-d2 / (POINTER_RADIUS * POINTER_RADIUS)) * pointer.active;
      if (influence < 0.001) return point;
      const radial = normalize(dx, dy);
      const tangent = { x: -radial.y, y: radial.x };
      return {
        x: point.x + radial.x * POINTER_PUSH * influence + tangent.x * POINTER_SWIRL * influence,
        y: point.y + radial.y * POINTER_PUSH * influence + tangent.y * POINTER_SWIRL * influence,
      };
    }

    function dynamicHead(org: Organism, index: number, time: number, scroll: number) {
      return {
        x: org.x + Math.sin(time * 0.035 + org.phase + scroll * 2) * 0.008,
        y: org.y + Math.cos(time * 0.028 + org.phase * 1.1 + scroll * 1.5) * 0.007,
        rotation: org.rotation + Math.sin(time * 0.024 + index + scroll * 1.4) * 0.055,
      };
    }

    function majorPoint(org: Organism, orgIndex: number, tentacleIndex: number, p: number, strandOffset: number, time: number, scroll: number): Point {
      const head = dynamicHead(org, orgIndex, time, scroll);
      const t = org.tentacles <= 1 ? 0.5 : tentacleIndex / (org.tentacles - 1);
      const centered = t - 0.5;
      const baseAngle = head.rotation + centered * org.spread + (scroll - 0.5) * 0.32 + Math.sin(time * 0.06 + org.phase + tentacleIndex * 0.7) * 0.045;
      const rootX = head.x + Math.cos(baseAngle) * org.radiusX * 0.72;
      const rootY = head.y + Math.sin(baseAngle) * org.radiusY * 0.72;
      const currentStrength = 0.008 + Math.pow(p, 1.5) * 0.046;
      const currentPhase = time * 0.24 + org.phase + tentacleIndex * 0.8 + p * 5.8 + scroll * 2.3;
      const gravity = Math.pow(p, 1.85) * (0.045 + scroll * 0.018);
      const bend = Math.sin(p * Math.PI) * org.bend * 0.25;
      const angle = baseAngle + bend;
      const normal = { x: -Math.sin(angle), y: Math.cos(angle) };
      const spread = strandOffset * (0.002 + Math.pow(p, 1.45) * 0.0085);
      return applyPointer({
        x: rootX + Math.cos(angle) * org.tentacleLength * p + normal.x * spread + Math.sin(currentPhase) * currentStrength,
        y: rootY + Math.sin(angle) * org.tentacleLength * p + normal.y * spread + Math.cos(currentPhase * 0.7 + org.phase) * currentStrength * 0.5 + gravity,
      });
    }

    function drawBackdrop(scroll: number, prominence: number) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, prominence > 0.45 ? "#30241b" : "#251d17");
      gradient.addColorStop(0.46, prominence > 0.45 ? "#211914" : "#1a1511");
      gradient.addColorStop(1, prominence > 0.45 ? "#342419" : "#2a1d14");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(width * (0.28 + scroll * 0.1), height * 0.38, 0, width * (0.28 + scroll * 0.1), height * 0.38, Math.max(width, height) * 0.75);
      glow.addColorStop(0, `rgba(166,116,70,${0.1 + prominence * 0.08})`);
      glow.addColorStop(0.55, `rgba(104,72,46,${0.04 + prominence * 0.035})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    }

    function drawHead(org: Organism, orgIndex: number, time: number, scroll: number, prominence: number) {
      const head = dynamicHead(org, orgIndex, time, scroll);
      const mobile = width < 720;
      const rings = mobile ? 6 : 10;
      const points = mobile ? 48 : 72;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let ring = 0; ring < rings; ring += 1) {
        const rt = ring / Math.max(rings - 1, 1);
        const scale = 0.46 + rt * 0.82;
        ctx.beginPath();
        for (let i = 0; i <= points; i += 1) {
          const theta = (i / points) * TAU;
          const wobble = 1 + Math.sin(theta * 3 + org.phase + time * 0.045) * 0.09 + Math.sin(theta * 5 - org.phase * 0.8 + scroll * 1.3) * 0.045;
          const lx = Math.cos(theta) * org.radiusX * scale * wobble;
          const ly = Math.sin(theta) * org.radiusY * scale * wobble;
          const ca = Math.cos(head.rotation);
          const sa = Math.sin(head.rotation);
          const p = applyPointer({ x: head.x + lx * ca - ly * sa, y: head.y + lx * sa + ly * ca });
          if (i === 0) ctx.moveTo(p.x * width, p.y * height);
          else ctx.lineTo(p.x * width, p.y * height);
        }
        ctx.strokeStyle = `rgba(235,220,197,${alphaFor(0.08 + (1 - rt) * 0.09, prominence, 2.05)})`;
        ctx.lineWidth = widthFor(mobile ? 0.56 : 0.78, prominence);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawTentacles(org: Organism, orgIndex: number, time: number, scroll: number, prominence: number) {
      const mobile = width < 720;
      const bundleLines = mobile ? 4 : 7;
      const steps = mobile ? 38 : 56;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let tentacle = 0; tentacle < org.tentacles; tentacle += 1) {
        for (let strand = 0; strand < bundleLines; strand += 1) {
          const offset = strand - (bundleLines - 1) * 0.5;
          ctx.beginPath();
          for (let i = 0; i <= steps; i += 1) {
            const p = majorPoint(org, orgIndex, tentacle, i / steps, offset, time, scroll);
            if (i === 0) ctx.moveTo(p.x * width, p.y * height);
            else ctx.lineTo(p.x * width, p.y * height);
          }
          const center = strand === Math.floor(bundleLines / 2);
          ctx.strokeStyle = center
            ? `rgba(238,221,195,${alphaFor(0.2, prominence, 2.1)})`
            : `rgba(230,214,191,${alphaFor(0.11, prominence, 2.05)})`;
          ctx.lineWidth = widthFor(mobile ? 0.58 : 0.82, prominence);
          ctx.stroke();
        }

        const branches = mobile ? 4 : 7;
        for (let branch = 0; branch < branches; branch += 1) {
          const startP = 0.22 + (branch / Math.max(branches - 1, 1)) * 0.62;
          const base = majorPoint(org, orgIndex, tentacle, startP, 0, time, scroll);
          const ahead = majorPoint(org, orgIndex, tentacle, Math.min(1, startP + 0.02), 0, time, scroll);
          const tangent = normalize(ahead.x - base.x, ahead.y - base.y);
          const normal = { x: -tangent.y, y: tangent.x };
          const side = (branch + tentacle + orgIndex) % 2 === 0 ? 1 : -1;
          const length = 0.04 + (1 - startP) * 0.05;
          ctx.beginPath();
          const branchSteps = mobile ? 16 : 24;
          for (let i = 0; i <= branchSteps; i += 1) {
            const p = i / branchSteps;
            const wave = Math.sin(time * 0.28 + org.phase + branch * 0.9 + p * 4.2) * (0.002 + p * 0.009);
            const dir = normalize(normal.x * side + tangent.x * 0.32, normal.y * side + tangent.y * 0.32);
            const point = applyPointer({
              x: base.x + dir.x * length * p + tangent.x * wave,
              y: base.y + dir.y * length * p + tangent.y * wave + Math.pow(p, 1.7) * 0.014,
            });
            if (i === 0) ctx.moveTo(point.x * width, point.y * height);
            else ctx.lineTo(point.x * width, point.y * height);
          }
          ctx.strokeStyle = `rgba(232,218,196,${alphaFor(0.075, prominence, 2.25)})`;
          ctx.lineWidth = widthFor(mobile ? 0.34 : 0.48, prominence);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function draw(timestamp: number) {
      if (!running || !visible) return;
      if (!reduceMotion && timestamp - lastFrame < 32) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;
      pointer.x += (pointer.targetX - pointer.x) * 0.032;
      pointer.y += (pointer.targetY - pointer.y) * 0.032;
      pointer.active += (pointer.targetActive - pointer.active) * 0.045;
      smoothScroll += (targetScroll - smoothScroll) * 0.052;
      const time = timestamp * 0.001;
      const scroll = scrollProgress();
      const prominence = heroProminence();
      ctx.clearRect(0, 0, width, height);
      drawBackdrop(scroll, prominence);
      ORGANISMS.forEach((org, index) => {
        drawHead(org, index, time, scroll, prominence);
        drawTentacles(org, index, time, scroll, prominence);
      });
      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      pointer.targetX = event.clientX / Math.max(window.innerWidth, 1);
      pointer.targetY = event.clientY / Math.max(window.innerHeight, 1);
      pointer.targetActive = 1;
    }

    function onPointerLeave() {
      pointer.targetActive = 0;
    }

    function onScroll() {
      targetScroll = window.scrollY;
    }

    function onVisibilityChange() {
      visible = !document.hidden;
      if (visible && !reduceMotion) {
        lastFrame = -Infinity;
        frame = window.requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (reduceMotion) draw(0);
    else frame = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
