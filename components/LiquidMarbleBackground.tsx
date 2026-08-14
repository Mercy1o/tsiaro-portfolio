"use client";

import { useEffect, useRef } from "react";

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
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    value += noise(p) * amplitude;
    p = p * 2.01 + vec2(13.7, 8.3);
    amplitude *= 0.5;
  }
  return value;
}

vec2 flowField(vec2 p, float t) {
  float e = 0.035;
  float n1 = fbm(p * 0.72 + vec2(0.0, t * 0.055));
  float nx = fbm((p + vec2(e, 0.0)) * 0.72 + vec2(0.0, t * 0.055));
  float ny = fbm((p + vec2(0.0, e)) * 0.72 + vec2(0.0, t * 0.055));
  vec2 grad = vec2(nx - n1, ny - n1) / e;
  return vec2(grad.y, -grad.x);
}

vec2 advect(vec2 p, float t) {
  vec2 q = p;
  vec2 v1 = flowField(q, t);
  q += v1 * 0.34;

  vec2 v2 = flowField(q * 1.18 + vec2(3.2, -1.7), t + 11.0);
  q += v2 * 0.20;

  q += vec2(
    sin(q.y * 1.35 + t * 0.09),
    cos(q.x * 1.15 - t * 0.075)
  ) * 0.055;

  return q;
}

float surfaceHeight(vec2 uv, float t) {
  vec2 p = advect(uv, t);

  vec2 driftA = vec2(t * 0.022, -t * 0.014);
  vec2 driftB = vec2(-t * 0.011, t * 0.018);

  vec2 warp = vec2(
    fbm(p * 1.48 + driftA),
    fbm(p * 1.48 + driftB + 5.2)
  ) - 0.5;

  vec2 p2 = p + warp * 0.95;

  float broad = fbm(p2 * 1.02 + driftA * 0.45);
  float medium = fbm(p2 * 2.05 - warp * 0.72 + driftB * 0.55);
  float fine = fbm(p2 * 4.10 + warp * 0.36 - driftA * 0.32);

  float h = broad * 0.56 + medium * 0.33 + fine * 0.11;
  h += sin((p2.x + p2.y) * 1.15 + t * 0.045) * 0.018;

  return smoothstep(0.22, 0.82, h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  uv *= 1.42;

  float t = u_time;
  float h = surfaceHeight(uv, t);

  float px = 1.55 / u_resolution.y;
  float hx = surfaceHeight(uv + vec2(px, 0.0), t) - surfaceHeight(uv - vec2(px, 0.0), t);
  float hy = surfaceHeight(uv + vec2(0.0, px), t) - surfaceHeight(uv - vec2(0.0, px), t);

  vec3 normal = normalize(vec3(-hx * 11.0, -hy * 11.0, 0.25));

  vec3 lightDir = normalize(vec3(
    -0.52 + sin(t * 0.035) * 0.06,
     0.66 + cos(t * 0.028) * 0.04,
     0.74
  ));

  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float diffuse = max(dot(normal, lightDir), 0.0);
  vec3 reflected = reflect(-lightDir, normal);
  float specular = pow(max(dot(reflected, viewDir), 0.0), 46.0);

  vec3 deep = vec3(0.63, 0.635, 0.615);
  vec3 mid = vec3(0.82, 0.815, 0.79);
  vec3 high = vec3(0.958, 0.95, 0.925);

  vec3 color = mix(deep, mid, smoothstep(0.10, 0.56, h));
  color = mix(color, high, smoothstep(0.50, 0.92, h));

  color *= 0.77 + diffuse * 0.35;
  color += vec3(1.0, 0.995, 0.98) * specular * 0.78;
  color -= (1.0 - h) * vec3(0.052);

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function LiquidMarbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    let frame = 0;
    const render = (time: number) => {
      resize();
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
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
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      style={{ zIndex: 0 }}
    />
  );
}
