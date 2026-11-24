"use client";

import { useEffect, useRef } from "react";

type V3 = [number, number, number];
const D2R = Math.PI / 180;
const vec = (lat: number, lon: number): V3 => {
  const p = lat * D2R;
  const l = lon * D2R;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

const DHAKA = vec(23.81, 90.41);
const SAGA = vec(33.26, 130.3);

// gradient stops (teal, sky, indigo)
const STOPS: V3[] = [
  [94, 234, 212],
  [56, 189, 248],
  [129, 140, 248],
];
const grad = (u: number, a = 1) => {
  const t = Math.min(1, Math.max(0, u)) * 2;
  const i = Math.min(1, Math.floor(t));
  const f = t - i;
  const c = STOPS[i].map((v, k) => Math.round(v + (STOPS[i + 1][k] - v) * f));
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
};

function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  const s = Math.sin(om);
  if (s < 1e-6) return a;
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

// dots on a sphere (Fibonacci lattice)
const DOTS: V3[] = (() => {
  const n = 1100;
  const out: V3[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const phi = i * 2.399963229728653;
    out.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  return out;
})();

// graticule lines (latitude and longitude), sampled
const GRAT: V3[][] = (() => {
  const lines: V3[][] = [];
  for (let lat = -60; lat <= 60; lat += 20) {
    const l: V3[] = [];
    for (let lon = -180; lon <= 180; lon += 4) l.push(vec(lat, lon));
    lines.push(l);
  }
  for (let lon = -180; lon < 180; lon += 20) {
    const l: V3[] = [];
    for (let lat = -88; lat <= 88; lat += 4) l.push(vec(lat, lon));
    lines.push(l);
  }
  return lines;
})();

export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const c2d = canvas.getContext("2d");
    if (!c2d) return;
    const ctx: CanvasRenderingContext2D = c2d;
    const cv: HTMLCanvasElement = canvas;
    const host = canvas.parentElement as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth;
      H = host.clientHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) frame(performance.now());
    };

    const rot = (p: V3, a: number, t: number): V3 => {
      const x1 = p[0] * Math.cos(a) + p[2] * Math.sin(a);
      const z1 = -p[0] * Math.sin(a) + p[2] * Math.cos(a);
      const y2 = p[1] * Math.cos(t) - z1 * Math.sin(t);
      const z2 = p[1] * Math.sin(t) + z1 * Math.cos(t);
      return [x1, y2, z2];
    };

    const label = (x: number, y: number, text: string, side: 1 | -1) => {
      ctx.font = '600 12px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
      const w = ctx.measureText(text).width + 18;
      const h = 24;
      const lx = side === 1 ? x + 16 : x - 16 - w;
      const ly = y - 34;
      ctx.beginPath();
      ctx.roundRect(lx, ly, w, h, 12);
      ctx.fillStyle = "rgba(6,8,13,0.78)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#eef1f8";
      ctx.textBaseline = "middle";
      ctx.fillText(text, lx + 9, ly + h / 2 + 0.5);
      // connector
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(side === 1 ? lx : lx + w, ly + h);
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.stroke();
    };

    const frame = (now: number) => {
      const t = reduce ? 1800 : now - start;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      const intro = Math.min(1, t / 1400);
      const ease = 1 - Math.pow(1 - intro, 3);
      const R = Math.min(W, H) * 0.36 * (0.86 + 0.14 * ease);
      const cx = W / 2;
      const cy = H / 2;

      const lonC = 110 + 24 * Math.sin(t * 0.00018) + cur.x * 30;
      const a = -lonC * D2R;
      const tilt = 0.5 + cur.y * 0.2;

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = ease;


      // atmosphere glow
      const maxR = Math.min(W, H) / 2;
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, maxR);
      g.addColorStop(0, "rgba(56,189,248,0.20)");
      g.addColorStop(0.55, "rgba(129,140,248,0.10)");
      g.addColorStop(1, "rgba(129,140,248,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fill();

      // sphere body: faint fill for depth
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(56,189,248,0.10)");
      body.addColorStop(1, "rgba(10,14,28,0.55)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // graticule
      ctx.lineWidth = 1;
      for (const line of GRAT) {
        ctx.beginPath();
        let pen = false;
        for (const p of line) {
          const q = rot(p, a, tilt);
          if (q[2] > 0) {
            const x = cx + q[0] * R;
            const y = cy - q[1] * R;
            if (!pen) {
              ctx.moveTo(x, y);
              pen = true;
            } else ctx.lineTo(x, y);
          } else pen = false;
        }
        ctx.strokeStyle = "rgba(125,211,252,0.13)";
        ctx.stroke();
      }

      // dots
      for (const p of DOTS) {
        const q = rot(p, a, tilt);
        if (q[2] <= 0.02) continue;
        const x = cx + q[0] * R;
        const y = cy - q[1] * R;
        const u = (q[0] + 1) / 2;
        const s = 0.5 + q[2] * 1.5;
        ctx.fillStyle = grad(u, 0.18 + q[2] * 0.7);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }

      // rim
      const rim = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      rim.addColorStop(0, "rgba(94,234,212,0.7)");
      rim.addColorStop(0.5, "rgba(56,189,248,0.35)");
      rim.addColorStop(1, "rgba(129,140,248,0.7)");
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // arc from Dhaka to Saga
      const pts: Array<{ x: number; y: number; z: number }> = [];
      const N = 72;
      for (let i = 0; i <= N; i++) {
        const k = i / N;
        const s = slerp(DHAKA, SAGA, k);
        const lift = 1 + 0.38 * Math.sin(Math.PI * k);
        const q = rot([s[0] * lift, s[1] * lift, s[2] * lift], a, tilt);
        pts.push({ x: cx + q[0] * R, y: cy - q[1] * R, z: q[2] });
      }
      const p0 = pts[0];
      const p1 = pts[N];
      const ag = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
      ag.addColorStop(0, "rgba(94,234,212,0.95)");
      ag.addColorStop(1, "rgba(129,140,248,0.95)");
      ctx.save();
      ctx.shadowColor = "rgba(94,234,212,0.7)";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = ag;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();
      ctx.restore();

      // travelling packets
      const packet = (k: number, color: string) => {
        const i = Math.min(N, Math.max(0, Math.round(k * N)));
        const p = pts[i];
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
        pg.addColorStop(0, color);
        pg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      };
      const loop = (t * 0.00022) % 1;
      packet(loop, "rgba(94,234,212,0.9)");
      packet(1 - ((t * 0.00022 + 0.5) % 1), "rgba(129,140,248,0.9)");

      // city markers
      const marker = (v: V3, name: string, side: 1 | -1, phase: number) => {
        const q = rot(v, a, tilt);
        if (q[2] <= 0) return;
        const x = cx + q[0] * R;
        const y = cy - q[1] * R;
        const ph = (t * 0.0009 + phase) % 1;
        ctx.strokeStyle = `rgba(125,211,252,${1 - ph})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 5 + ph * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(56,189,248,0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        label(x, y, name, side);
      };
      marker(DHAKA, "Bangladesh", -1, 0);
      marker(SAGA, "Japan", 1, 0.5);

      // orbit ring with a small satellite
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);
      ctx.strokeStyle = "rgba(125,211,252,0.22)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.32, R * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      const chips = ["React", "Node.js", "TypeScript"];
      chips.forEach((name, k) => {
        const ang = t * 0.0005 + (k * Math.PI * 2) / chips.length;
        const sx = Math.cos(ang) * R * 1.32;
        const sy = Math.sin(ang) * R * 0.4;
        const front = Math.sin(ang) > 0;
        ctx.font = '600 11px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
        const w = ctx.measureText(name).width + 16;
        ctx.globalAlpha = ease * (front ? 1 : 0.45);
        ctx.beginPath();
        ctx.roundRect(sx - w / 2, sy - 11, w, 22, 11);
        ctx.fillStyle = "rgba(6,8,13,0.85)";
        ctx.fill();
        ctx.strokeStyle = grad(k / 2, 0.85);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#eef1f8";
        ctx.textBaseline = "middle";
        ctx.fillText(name, sx - w / 2 + 8, sy + 0.5);
      });
      ctx.globalAlpha = ease;
      ctx.restore();

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!running) return;
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const onVis = () => (document.hidden ? pause() : play());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        visible ? play() : pause();
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    resize();
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVis);
      play();
    }

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
