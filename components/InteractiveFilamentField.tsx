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

const POINTER_RADIUS = 0.15;
const POINTER_PUSH = 0.03;
const POINTER_SWIRL = 0.014;

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
      gradient.addColorStop(0.46, "#1a1511");
      gradient.addColorStop(1, "#2a1d14");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * (0.28 + scroll * 0.1),
        height * 0.38,
        0,
        width * (0.28 + scroll * 0.1),
        height * 0.38,
        Math.max(width, height) * 0.75,
      );
      glow.addColorStop(0, "rgba(147,102,62,0.11)");
      glow.addColorStop(0.55, "rgba(97,66,42,0.045)");
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

    function dynamicHead(org: Organism, index: number, time: number, scroll: number) {
      return {
        x: org.x + Math.sin(time * 0.035 + org.phase + scroll * 2.0) * 0.008,
        y: org.y + Math.cos(time * 0.028 + org.phase * 1.1 + scroll * 1.5) * 0.007,
        rotation: org.rotation + Math.sin(time * 0.024 + index + scroll * 1.4) * 0.055,
      };
    }

    function drawHead(org: Organism, orgIndex: number, time: number, scroll: number) {
      const mobile = width < 720;
      const head = dynamicHead(org, orgIndex, time, scroll);
      const rings = mobile ? 6 : 10;
      const points = mobile ? 54 : 78;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let ring = 0; ring < rings; ring += 1) {
        const ringT = ring / Math.max(rings - 1, 1);
        const scale = 0.46 + ringT * 0.82;
        ctx.beginPath();

        for (let pointIndex = 0; pointIndex <= points; pointIndex += 1) {
          const theta = (pointIndex / points) * TAU;
          const wobble =
            1 +
            Math.sin(theta * 3 + org.phase + time * 0.045) * 0.09 +
            Math.sin(theta * 5 - org.phase * 0.8 + scroll * 1.3) * 0.045;
          const localX = Math.cos(theta) * org.radiusX * scale * wobble;
          const localY = Math.sin(theta) * org.radiusY * scale * wobble;
          const ca = Math.cos(head.rotation);
          const sa = Math.sin(head.rotation);
          const point = applyPointer({
            x: head.x + localX * ca - localY * sa,
            y: head.y + localX * sa + localY * ca,
          });

          if (pointIndex === 0) ctx.moveTo(point.x * width, point.y * height);
          else ctx.lineTo(point.x * width, point.y * height);
        }

        ctx.strokeStyle = `rgba(231,216,194,${0.08 + (1 - ringT) * 0.09})`;
        ctx.lineWidth = mobile ? 0.56 : 0.78;
        ctx.stroke();
      }

      ctx.restore();
    }

    function majorTentaclePoint(
      org: Organism,
      orgIndex: number,
      tentacleIndex: number,
      p: number,
      strandOffset: number,
      time: number,
      scroll: number,
    ): Point {
      const head = dynamicHead(org, orgIndex, time, scroll);
      const tentacleT = org.tentacles <= 1 ? 0.5 : tentacleIndex / (org.tentacles - 1);
      const centered = tentacleT - 0.5;

      const baseAngle =
        head.rotation +
        centered * org.spread +
        (scroll - 0.5) * 0.32 +
        Math.sin(time * 0.06 + org.phase + tentacleIndex * 0.7) * 0.045;

      const rootRadius = org.radiusX * 0.72;
      const rootX = head.x + Math.cos(baseAngle) * rootRadius;
      const rootY = head.y + Math.sin(baseAngle) * org.radiusY * 0.72;

      const currentStrength = 0.008 + Math.pow(p, 1.5) * 0.046;
      const currentPhase =
        time * 0.24 +
        org.phase +
        tentacleIndex * 0.8 +
        p * 5.8 +
        scroll * 2.3;

      const currentX = Math.sin(currentPhase) * currentStrength;
      const currentY = Math.cos(currentPhase * 0.7 + org.phase) * currentStrength * 0.5;
      const gravity = Math.pow(p, 1.85) * (0.045 + scroll * 0.018);
      const bend = Math.sin(p * Math.PI) * org.bend * 0.25;
      const angle = baseAngle + bend;
      const distance = org.tentacleLength * p;

      // Bundle width is dense at the head and opens gradually farther away.
      const normal = { x: -Math.sin(angle), y: Math.cos(angle) };
      const bundleSpread = strandOffset * (0.002 + Math.pow(p, 1.45) * 0.0085);

      return applyPointer({
        x: rootX + Math.cos(angle) * distance + normal.x * bundleSpread + currentX,
        y: rootY + Math.sin(angle) * distance + normal.y * bundleSpread + currentY + gravity,
      });
    }

    function drawMajorTentacles(org: Organism, orgIndex: number, time: number, scroll: number) {
      const mobile = width < 720;
      const bundleLines = mobile ? 4 : 7;
      const points = mobile ? 42 : 62;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let tentacle = 0; tentacle < org.tentacles; tentacle += 1) {
        for (let strand = 0; strand < bundleLines; strand += 1) {
          const offset = strand - (bundleLines - 1) * 0.5;
          ctx.beginPath();

          for (let pointIndex = 0; pointIndex <= points; pointIndex += 1) {
            const p = pointIndex / points;
            const point = majorTentaclePoint(
              org,
              orgIndex,
              tentacle,
              p,
              offset,
              time,
              scroll,
            );
            if (pointIndex === 0) ctx.moveTo(point.x * width, point.y * height);
            else ctx.lineTo(point.x * width, point.y * height);
          }

          const centerWeight = 1 - Math.abs(offset) / Math.max(bundleLines * 0.5, 1);
          ctx.strokeStyle = strand === Math.floor(bundleLines / 2)
            ? `rgba(231,215,192,${0.18 + centerWeight * 0.06})`
            : `rgba(226,211,190,${0.095 + centerWeight * 0.055})`;
          ctx.lineWidth = mobile ? 0.58 : 0.82;
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function drawMicroTentacles(org: Organism, orgIndex: number, time: number, scroll: number) {
      const mobile = width < 720;
      const branchesPerTentacle = mobile ? 4 : 7;
      const branchPoints = mobile ? 20 : 30;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let tentacle = 0; tentacle < org.tentacles; tentacle += 1) {
        for (let branch = 0; branch < branchesPerTentacle; branch += 1) {
          const branchT = branch / Math.max(branchesPerTentacle - 1, 1);
          const startP = 0.22 + branchT * 0.62;
          const base = majorTentaclePoint(org, orgIndex, tentacle, startP, 0, time, scroll);
          const ahead = majorTentaclePoint(org, orgIndex, tentacle, Math.min(1, startP + 0.02), 0, time, scroll);
          const tangent = normalize(ahead.x - base.x, ahead.y - base.y);
          const normal = { x: -tangent.y, y: tangent.x };
          const side = (branch + tentacle + orgIndex) % 2 === 0 ? 1 : -1;
          const branchLength = 0.032 + (1 - startP) * 0.055 + fract(branch * 0.381 + tentacle * 0.17) * 0.025;

          ctx.beginPath();
          for (let pointIndex = 0; pointIndex <= branchPoints; pointIndex += 1) {
            const p = pointIndex / branchPoints;
            const waterWave = Math.sin(
              time * 0.28 +
              org.phase +
              tentacle * 0.7 +
              branch * 0.9 +
              p * 4.2,
            ) * (0.002 + p * 0.009);
            const drift = Math.pow(p, 1.7) * 0.014;
            const branchDir = normalize(
              normal.x * side + tangent.x * 0.32,
              normal.y * side + tangent.y * 0.32,
            );
            const point = applyPointer({
              x: base.x + branchDir.x * branchLength * p + tangent.x * waterWave,
              y: base.y + branchDir.y * branchLength * p + tangent.y * waterWave + drift,
            });

            if (pointIndex === 0) ctx.moveTo(point.x * width, point.y * height);
            else ctx.lineTo(point.x * width, point.y * height);
          }

          ctx.strokeStyle = branch % 3 === 0
            ? "rgba(200,157,105,0.085)"
            : "rgba(230,216,195,0.075)";
          ctx.lineWidth = mobile ? 0.34 : 0.48;
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function drawLooseWaterFibers(time: number, scroll: number) {
      const mobile = width < 720;
      const count = mobile ? 12 : 22;
      const points = mobile ? 26 : 38;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let index = 0; index < count; index += 1) {
        const startX = fract(index * 0.6180339 + 0.13);
        const startY = fract(index * 0.4142135 + 0.27);
        const direction = -0.12 + Math.sin(index * 1.37) * 0.22 + scroll * 0.2;
        const length = 0.12 + fract(index * 0.271) * 0.16;

        ctx.beginPath();
        for (let pointIndex = 0; pointIndex <= points; pointIndex += 1) {
          const p = pointIndex / points;
          const wave = Math.sin(time * 0.15 + index * 0.7 + p * 5.2) * (0.004 + p * 0.01);
          const point = applyPointer({
            x: startX + Math.cos(direction) * length * p + wave,
            y: startY + Math.sin(direction) * length * p + p * p * 0.012,
          });
          if (pointIndex === 0) ctx.moveTo(point.x * width, point.y * height);
          else ctx.lineTo(point.x * width, point.y * height);
        }

        ctx.strokeStyle = "rgba(229,215,194,0.04)";
        ctx.lineWidth = mobile ? 0.3 : 0.42;
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

      ORGANISMS.forEach((org, orgIndex) => {
        drawHead(org, orgIndex, time, scroll);
        drawMajorTentacles(org, orgIndex, time, scroll);
        drawMicroTentacles(org, orgIndex, time, scroll);
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

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
