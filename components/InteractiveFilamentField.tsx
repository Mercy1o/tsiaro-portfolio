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

type Anchor = {
  x: number;
  y: number;
  angle: number;
  spread: number;
  length: number;
  strands: number;
  phase: number;
  bend: number;
};

type Point = { x: number; y: number };

const TAU = Math.PI * 2;

// Dense organism-like bases. Strands begin almost on top of one another and
// progressively separate, which creates the requested dense-root / loose-tip
// relationship without drawing any solid ribbon.
const ANCHORS: Anchor[] = [
  { x: 0.02, y: 0.18, angle: -0.1, spread: 0.78, length: 0.46, strands: 34, phase: 0.2, bend: 0.24 },
  { x: 0.34, y: 0.08, angle: 0.66, spread: 0.64, length: 0.39, strands: 28, phase: 1.2, bend: -0.2 },
  { x: 0.76, y: 0.04, angle: 1.04, spread: 0.72, length: 0.42, strands: 32, phase: 2.3, bend: 0.18 },
  { x: 0.97, y: 0.38, angle: 2.62, spread: 0.82, length: 0.44, strands: 36, phase: 3.4, bend: -0.28 },
  { x: 0.11, y: 0.62, angle: -0.42, spread: 0.82, length: 0.48, strands: 38, phase: 4.5, bend: 0.26 },
  { x: 0.54, y: 0.52, angle: 0.34, spread: 0.7, length: 0.43, strands: 34, phase: 5.6, bend: -0.22 },
  { x: 0.9, y: 0.78, angle: 2.88, spread: 0.74, length: 0.42, strands: 30, phase: 6.8, bend: 0.2 },
  { x: 0.33, y: 0.92, angle: -0.9, spread: 0.66, length: 0.38, strands: 28, phase: 7.7, bend: -0.18 },
];

const POINTER_RADIUS = 0.16;
const POINTER_PUSH = 0.036;
const POINTER_SWIRL = 0.018;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalize(x: number, y: number): Point {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

function fract(value: number) {
  return value - Math.floor(value);
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / Math.max(edge1 - edge0, 0.00001), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function InteractiveFilamentField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
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
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.15 : 1.4);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function scrollProgress() {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      return clamp(smoothScroll / maximum, 0, 1);
    }

    function drawBackdrop(scroll: number) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#251d17");
      gradient.addColorStop(0.45, "#1a1511");
      gradient.addColorStop(1, "#2a1d14");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * (0.24 + scroll * 0.12),
        height * 0.34,
        0,
        width * (0.24 + scroll * 0.12),
        height * 0.34,
        Math.max(width, height) * 0.72,
      );
      glow.addColorStop(0, "rgba(145,101,62,0.11)");
      glow.addColorStop(0.55, "rgba(95,66,43,0.045)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
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

    function strandPoint(
      anchor: Anchor,
      anchorIndex: number,
      strandIndex: number,
      p: number,
      time: number,
      scroll: number,
    ): Point {
      const strandT = strandIndex / Math.max(anchor.strands - 1, 1);
      const centered = strandT - 0.5;

      // Dense at the root, open at the tip: separation grows non-linearly with p.
      const separation = Math.pow(p, 1.58);
      const fanAngle = centered * anchor.spread * separation;
      const scrollTurn = (scroll - 0.5) * 0.42;
      const baseAngle = anchor.angle + fanAngle + scrollTurn;

      const seedJitter = (fract(strandIndex * 0.618 + anchorIndex * 0.173) - 0.5) * 0.012;
      const rootTightness = 1 - smoothstep(0, 0.28, p);
      const originX = anchor.x + Math.cos(anchor.angle + Math.PI / 2) * seedJitter * rootTightness;
      const originY = anchor.y + Math.sin(anchor.angle + Math.PI / 2) * seedJitter * rootTightness;

      // Underwater current. Motion amplitude increases toward the free end.
      const currentAmplitude = 0.008 + Math.pow(p, 1.7) * 0.055;
      const currentPhase =
        time * 0.22 +
        anchor.phase +
        strandIndex * 0.065 +
        p * 5.4 +
        scroll * 2.2;
      const currentX = Math.sin(currentPhase) * currentAmplitude;
      const currentY = Math.cos(currentPhase * 0.72 + anchor.phase) * currentAmplitude * 0.58;

      // A slow downward underwater weight / sag. It is subtle near the root and
      // strongest at the loose end, so strands feel suspended rather than rigid.
      const gravity = Math.pow(p, 1.85) * (0.055 + scroll * 0.018);

      // Broad bend keeps groups from reading as straight fans.
      const bend = Math.sin(p * Math.PI) * anchor.bend * 0.18;
      const angle = baseAngle + bend;
      const distance = anchor.length * p;

      const point = {
        x: originX + Math.cos(angle) * distance + currentX,
        y: originY + Math.sin(angle) * distance + currentY + gravity,
      };

      return applyPointer(point);
    }

    function drawAnchorMass(anchor: Anchor, anchorIndex: number, time: number, scroll: number) {
      const mobile = width < 720;
      const strands = mobile ? Math.max(16, Math.floor(anchor.strands * 0.58)) : anchor.strands;
      const points = mobile ? 38 : 58;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let strand = 0; strand < strands; strand += 1) {
        const mappedStrand = mobile
          ? Math.round((strand / Math.max(strands - 1, 1)) * (anchor.strands - 1))
          : strand;

        ctx.beginPath();
        for (let pointIndex = 0; pointIndex <= points; pointIndex += 1) {
          const p = pointIndex / points;
          const point = strandPoint(anchor, anchorIndex, mappedStrand, p, time, scroll);
          const x = point.x * width;
          const y = point.y * height;
          if (pointIndex === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const edge = Math.abs(mappedStrand / Math.max(anchor.strands - 1, 1) - 0.5) * 2;
        const alpha = 0.105 + (1 - edge) * 0.075;
        const copper = mappedStrand % 9 === 0;
        ctx.strokeStyle = copper
          ? `rgba(197,154,104,${alpha * 0.9})`
          : `rgba(231,218,197,${alpha})`;
        ctx.lineWidth = mobile ? 0.58 : 0.78;
        ctx.stroke();
      }

      // Reinforce only the first portion of the organism. Many fine lines are
      // still visible, but their overlap forms the dense parasitic-looking base.
      const rootLines = mobile ? 9 : 15;
      for (let line = 0; line < rootLines; line += 1) {
        const source = Math.round((line / Math.max(rootLines - 1, 1)) * (anchor.strands - 1));
        ctx.beginPath();
        const rootPoints = mobile ? 18 : 26;
        for (let pointIndex = 0; pointIndex <= rootPoints; pointIndex += 1) {
          const p = (pointIndex / rootPoints) * 0.32;
          const point = strandPoint(anchor, anchorIndex, source, p, time, scroll);
          const x = point.x * width;
          const y = point.y * height;
          if (pointIndex === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(236,219,190,0.18)";
        ctx.lineWidth = mobile ? 0.82 : 1.05;
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawLooseWaterFibers(time: number, scroll: number) {
      const mobile = width < 720;
      const count = mobile ? 20 : 38;
      const points = mobile ? 34 : 52;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let index = 0; index < count; index += 1) {
        const startX = fract(index * 0.6180339 + 0.13);
        const startY = fract(index * 0.4142135 + 0.27);
        const direction = -0.12 + Math.sin(index * 1.37) * 0.28 + scroll * 0.32;
        const length = 0.18 + fract(index * 0.271) * 0.22;

        ctx.beginPath();
        for (let pointIndex = 0; pointIndex <= points; pointIndex += 1) {
          const p = pointIndex / points;
          const wave = Math.sin(time * 0.16 + index * 0.7 + p * 5.2) * (0.006 + p * 0.018);
          const gravity = p * p * 0.018;
          const point = applyPointer({
            x: startX + Math.cos(direction) * length * p + wave,
            y: startY + Math.sin(direction) * length * p + gravity + Math.cos(time * 0.11 + p * 4 + index) * 0.006,
          });
          const x = point.x * width;
          const y = point.y * height;
          if (pointIndex === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = index % 7 === 0
          ? "rgba(195,151,101,0.07)"
          : "rgba(229,215,194,0.055)";
        ctx.lineWidth = mobile ? 0.38 : 0.5;
        ctx.stroke();
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

      ctx.clearRect(0, 0, width, height);
      drawBackdrop(scroll);
      drawLooseWaterFibers(time, scroll);
      ANCHORS.forEach((anchor, anchorIndex) => drawAnchorMass(anchor, anchorIndex, time, scroll));

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

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
