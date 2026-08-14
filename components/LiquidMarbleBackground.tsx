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
    p = p * 2.02 + vec2(13.7, 8.3);
    amplitude *= 0.5;
  }
  return value;
}

float surfaceHeight(vec2 uv, float t) {
  vec2 flowA = vec2(sin(t * 0.23), cos(t * 0.19)) * 0.24;
  vec2 flowB = vec2(cos(t * 0.17), sin(t * 0.21)) * 0.18;

  vec2 warp = vec2(
    fbm(uv * 1.65 + flowB),
    fbm(uv * 1.65 - flowB + 4.7)
  ) - 0.5;

  float broad = fbm(uv * 1.22 + flowA);
  float medium = fbm(uv * 2.25 + warp * 1.35 + flowA * 0.35);
  float fine = fbm(uv * 4.65 - warp * 0.55 - flowB * 0.7);

  float h = broad * 0.52 + medium * 0.36 + fine * 0.12;
  return smoothstep(0.22, 0.82, h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  uv *= 1.45;

  float t = u_time * 0.12;
  float h = surfaceHeight(uv, t);

  float px = 1.7 / u_resolution.y;
  float hx = surfaceHeight(uv + vec2(px, 0.0), t) - surfaceHeight(uv - vec2(px, 0.0), t);
  float hy = surfaceHeight(uv + vec2(0.0, px), t) - surfaceHeight(uv - vec2(0.0, px), t);

  vec3 normal = normalize(vec3(-hx * 10.5, -hy * 10.5, 0.23));
  vec3 lightDir = normalize(vec3(-0.58, 0.68, 0.72));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);

  float diffuse = max(dot(normal, lightDir), 0.0);
  vec3 reflected = reflect(-lightDir, normal);
  float specular = pow(max(dot(reflected, viewDir), 0.0), 54.0);

  vec3 deep = vec3(0.64, 0.645, 0.625);
  vec3 mid = vec3(0.82, 0.815, 0.79);
  vec3 high = vec3(0.955, 0.95, 0.925);

  vec3 color = mix(deep, mid, smoothstep(0.12, 0.56, h));
  color = mix(color, high, smoothstep(0.52, 0.92, h));

  color *= 0.78 + diffuse * 0.34;
  color += vec3(1.0, 0.995, 0.975) * specular * 0.82;
  color -= (1.0 - h) * vec3(0.055);

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
