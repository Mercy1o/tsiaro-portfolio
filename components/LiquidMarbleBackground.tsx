"use client";

import { useEffect, useRef, useState } from "react";

const vertexShader = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.53;
  for (int i = 0; i < 4; i++) {
    value += noise(p) * amplitude;
    p = p * 2.03 + vec2(11.7, 7.9);
    amplitude *= 0.48;
  }
  return value;
}

vec2 fluidWarp(vec2 p, float t) {
  vec2 slowDrift = vec2(t * 0.020, -t * 0.013);

  float a = fbm(p * 0.82 + slowDrift);
  float b = fbm(p * 0.82 - slowDrift + vec2(4.1, -2.7));

  vec2 flow = vec2(a - 0.5, b - 0.5);

  flow += vec2(
    sin(p.y * 1.15 + t * 0.16),
    cos(p.x * 1.05 - t * 0.13)
  ) * 0.075;

  return p + flow * 0.78;
}

float surfaceHeight(vec2 uv, float t) {
  vec2 p = fluidWarp(uv, t);
  vec2 driftA = vec2(t * 0.014, -t * 0.009);
  vec2 driftB = vec2(-t * 0.008, t * 0.012);

  float broad = fbm(p * 1.05 + driftA);
  float medium = fbm((p + vec2(broad - 0.5)) * 2.05 + driftB);
  float detail = noise(p * 4.3 - driftA * 0.5);

  float h = broad * 0.60 + medium * 0.32 + detail * 0.08;
  return smoothstep(0.19, 0.84, h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  uv *= 1.38;

  // Deliberately slow: viscous water / liquid stone rather than fast turbulence.
  float t = u_time * 0.22;
  float h = surfaceHeight(uv, t);

  float px = 2.15 / u_resolution.y;
  float hx = surfaceHeight(uv + vec2(px, 0.0), t) - surfaceHeight(uv - vec2(px, 0.0), t);
  float hy = surfaceHeight(uv + vec2(0.0, px), t) - surfaceHeight(uv - vec2(0.0, px), t);

  vec3 normal = normalize(vec3(-hx * 9.0, -hy * 9.0, 0.29));

  vec3 lightDir = normalize(vec3(
    -0.54 + sin(t * 0.07) * 0.035,
     0.67 + cos(t * 0.055) * 0.025,
     0.75
  ));

  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float diffuse = max(dot(normal, lightDir), 0.0);
  vec3 reflected = reflect(-lightDir, normal);
  float specular = pow(max(dot(reflected, viewDir), 0.0), 48.0);

  vec3 deep = vec3(0.64, 0.645, 0.625);
  vec3 mid = vec3(0.825, 0.82, 0.795);
  vec3 high = vec3(0.962, 0.954, 0.932);

  vec3 color = mix(deep, mid, smoothstep(0.10, 0.58, h));
  color = mix(color, high, smoothstep(0.52, 0.92, h));

  color *= 0.79 + diffuse * 0.32;
  color += vec3(1.0, 0.995, 0.98) * specular * 0.72;
  color -= (1.0 - h) * vec3(0.048);

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function LiquidMarbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [soft, setSoft] = useState(false);

  useEffect(() => {
    let softState = window.scrollY >= 150;
    setSoft(softState);

    const onScroll = () => {
      // Tsiaro Rakototiana starts entering around 105px and is fully present near 260px.
      // Blur the background during that handoff, not on the opening wordmark screen.
      const next = window.scrollY >= 150;
      if (next !== softState) {
        softState = next;
        setSoft(next);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create WebGL shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const resize = () => {
      // Full device DPR is unnecessary for an organic background and costs heavily on 2x displays.
      const dpr = Math.min(window.devicePixelRatio || 1, 0.9);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    let frame = 0;
    let running = true;

    const render = (time: number) => {
      if (!running) return;
      resize();
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 h-screen w-screen transition-[filter,opacity] duration-[1400ms] ease-out ${
        soft ? "blur-[5px] opacity-80" : "blur-0 opacity-100"
      }`}
      style={{ zIndex: 0, transform: "scale(1.025)" }}
    />
  );
}
