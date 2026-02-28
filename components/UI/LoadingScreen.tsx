"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  progress?: number;
}

// ─── CSS variable helpers ──────────────────────────────────────────────────
// We read computed CSS variables at runtime so the loader respects
// both light and dark mode automatically.
function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// ─── SVG Tile Shapes ───────────────────────────────────────────────────────

function TileSquare({ size = 20, fill = "#c0671e", stroke = "#7a3e10", rotate = 0 }: {
  size?: number; fill?: string; stroke?: string; rotate?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
      <rect x="1.5" y="1.5" width="17" height="17" fill={fill} stroke={stroke} strokeWidth="1.2" rx="0.5" />
      <line x1="1.5" y1="1.5" x2="18.5" y2="18.5" stroke={stroke} strokeWidth="0.4" opacity="0.4" />
      <line x1="18.5" y1="1.5" x2="1.5" y2="18.5" stroke={stroke} strokeWidth="0.4" opacity="0.4" />
    </svg>
  );
}

function TileDiamond({ size = 18, fill = "#c0671e", stroke = "#7a3e10", rotate = 0 }: {
  size?: number; fill?: string; stroke?: string; rotate?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
      <polygon points="10,1.5 18.5,10 10,18.5 1.5,10" fill={fill} stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

function TileHex({ size = 20, fill = "#c0671e", stroke = "#7a3e10", rotate = 0 }: {
  size?: number; fill?: string; stroke?: string; rotate?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
      <polygon points="10,1.5 17.5,5.5 17.5,14.5 10,18.5 2.5,14.5 2.5,5.5" fill={fill} stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

function TileShard({ size = 14, fill = "#f79d28", stroke = "#a05a10", rotate = 0 }: {
  size?: number; fill?: string; stroke?: string; rotate?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
      <polygon points="7,1 13,5 10,13 4,13 1,5" fill={fill} stroke={stroke} strokeWidth="0.9" />
    </svg>
  );
}

// ─── Orbital config ────────────────────────────────────────────────────────

type TileComp = typeof TileSquare | typeof TileDiamond | typeof TileHex | typeof TileShard;

// Uses brand primary (#c0671e) and secondary (#f79d28) tones,
// with lighter/darker variants to create depth
const TILE_SHAPES: { Component: TileComp; layer: 1 | 2 | 3; startAngle: number; fill: string; stroke: string; size: number }[] = [
  { Component: TileDiamond, layer: 1, startAngle: 0,   fill: "#c0671e", stroke: "#7a3e10", size: 22 },
  { Component: TileSquare,  layer: 1, startAngle: 90,  fill: "#f79d28", stroke: "#a05a10", size: 20 },
  { Component: TileHex,     layer: 1, startAngle: 180, fill: "#c0671e", stroke: "#7a3e10", size: 19 },
  { Component: TileShard,   layer: 1, startAngle: 270, fill: "#f79d28", stroke: "#a05a10", size: 16 },
  { Component: TileSquare,  layer: 2, startAngle: 30,  fill: "#d4873a", stroke: "#8a4818", size: 17 },
  { Component: TileDiamond, layer: 2, startAngle: 102, fill: "#e8a848", stroke: "#986020", size: 20 },
  { Component: TileShard,   layer: 2, startAngle: 174, fill: "#c0671e", stroke: "#7a3e10", size: 14 },
  { Component: TileHex,     layer: 2, startAngle: 246, fill: "#f79d28", stroke: "#a05a10", size: 16 },
  { Component: TileDiamond, layer: 2, startAngle: 318, fill: "#d4873a", stroke: "#8a4818", size: 18 },
  { Component: TileSquare,  layer: 3, startAngle: 15,  fill: "#a05818", stroke: "#603010", size: 14 },
  { Component: TileHex,     layer: 3, startAngle: 67,  fill: "#e8a848", stroke: "#986020", size: 16 },
  { Component: TileShard,   layer: 3, startAngle: 119, fill: "#f79d28", stroke: "#a05a10", size: 12 },
  { Component: TileSquare,  layer: 3, startAngle: 171, fill: "#c0671e", stroke: "#7a3e10", size: 15 },
  { Component: TileDiamond, layer: 3, startAngle: 223, fill: "#d4873a", stroke: "#8a4818", size: 13 },
  { Component: TileShard,   layer: 3, startAngle: 275, fill: "#a05818", stroke: "#603010", size: 14 },
  { Component: TileHex,     layer: 3, startAngle: 327, fill: "#c0671e", stroke: "#7a3e10", size: 15 },
];

const LAYER_CONFIG = [
  { radius: 88,  visibleAt: 0,  dir: 1  as 1 | -1 },
  { radius: 148, visibleAt: 28, dir: -1 as 1 | -1 },
  { radius: 210, visibleAt: 62, dir: 1  as 1 | -1 },
];

// ─── Center Logo ───────────────────────────────────────────────────────────

function CenterLogo({ glow }: { glow: number }) {
  // Uses --primary and --card colors from globals.css
  return (
    <svg
      width="88" height="88" viewBox="0 0 88 88"
      style={{
        filter: `drop-shadow(0 0 ${6 + glow * 20}px rgba(192,103,30,${0.3 + glow * 0.5}))`,
      }}
    >
      {/* Outer diamond — card background with primary border */}
      <polygon points="44,4 84,44 44,84 4,44" fill="var(--card, #1E293B)" stroke="#c0671e" strokeWidth="1.8" />
      {/* 3×3 tile grid */}
      {[0, 1, 2].map(row =>
        [0, 1, 2].map(col => {
          const x = 24 + col * 15;
          const y = 24 + row * 15;
          const isCenter = row === 1 && col === 1;
          return (
            <rect
              key={`${row}-${col}`}
              x={x} y={y} width="13" height="13"
              fill={isCenter ? "#c0671e" : "var(--surface, #1E293B)"}
              stroke="#c0671e"
              strokeWidth="0.7"
              rx="0.5"
            />
          );
        })
      )}
      {/* Secondary accent ring */}
      <polygon points="44,31 57,44 44,57 31,44" fill="none" stroke="#f79d28" strokeWidth="0.9" opacity="0.5" />
      {/* Center dot */}
      <circle cx="44" cy="44" r="2.5" fill="#f79d28" opacity="0.8" />
    </svg>
  );
}

// ─── Corner Decoration ─────────────────────────────────────────────────────

function CornerAccent({ pos, rotate, opacity }: {
  pos: React.CSSProperties; rotate: number; opacity: number;
}) {
  return (
    <svg
      width="48" height="48" viewBox="0 0 48 48"
      style={{ position: "absolute", ...pos, opacity, transform: `rotate(${rotate}deg)`, transition: "opacity 0.7s ease" }}
    >
      {/* L-bracket */}
      <path d="M3,24 L3,3 L24,3" fill="none" stroke="#c0671e" strokeWidth="1.5" strokeLinecap="square" />
      {/* Small tile */}
      <rect x="6" y="6" width="10" height="10" fill="none" stroke="#c0671e" strokeWidth="0.9" opacity="0.6" />
      <rect x="8" y="8" width="6" height="6" fill="#c0671e" opacity={0.15 + opacity * 0.2} />
      {/* Secondary dot accent */}
      <circle cx="38" cy="38" r="2" fill="#f79d28" opacity={opacity * 0.5} />
    </svg>
  );
}

// ─── Burst Shards ──────────────────────────────────────────────────────────

function BurstShards() {
  const palette = ["#c0671e", "#f79d28", "#d4873a", "#e8a848", "#a05818"];
  const shards = Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * 360 + Math.random() * 8,
    dist:  85 + Math.random() * 160,
    size:  6 + Math.random() * 14,
    delay: Math.random() * 0.2,
    fill:  palette[Math.floor(Math.random() * palette.length)],
    rot:   Math.random() * 220,
  }));

  return (
    <>
      {shards.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const tx  = Math.cos(rad) * s.dist;
        const ty  = Math.sin(rad) * s.dist;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              animation: `tileShatter 1s cubic-bezier(0.15,0,0.85,1) ${s.delay}s forwards`,
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
              "--rot": `${s.rot}deg`,
            } as React.CSSProperties}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 14 14">
              <polygon points="7,1 13,5 10,13 4,13 1,5" fill={s.fill} stroke="#7a3e10" strokeWidth="0.8" />
            </svg>
          </div>
        );
      })}
      <style>{`
        @keyframes tileShatter {
          0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx),var(--ty)) rotate(var(--rot)) scale(0.1); opacity: 0; }
        }
      `}</style>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function LoadingScreen({ onComplete, progress: externalProg }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<"loading" | "burst" | "exit">("loading");
  const [angle, setAngle]       = useState(0);
  const lastTsRef               = useRef<number>(0);
  const rafRef                  = useRef<number>();

  // Auto-simulate progress
  useEffect(() => {
    if (externalProg !== undefined) return;
    let p = 0;
    const sim = () => {
      const inc = p < 25 ? 0.85 : p < 60 ? 0.32 : p < 85 ? 0.17 : p < 95 ? 0.07 : 0.6;
      p = Math.min(100, p + inc);
      setProgress(p);
      if (p < 100) setTimeout(sim, 28);
    };
    sim();
  }, []);

  useEffect(() => {
    if (externalProg !== undefined) setProgress(externalProg);
  }, [externalProg]);

  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      setPhase("burst");
      setTimeout(() => {
        setPhase("exit");
        setTimeout(() => onComplete?.(), 800);
      }, 950);
    }
  }, [progress, phase, onComplete]);

  useEffect(() => {
    const tick = (ts: number) => {
      const delta = lastTsRef.current ? ts - lastTsRef.current : 0;
      lastTsRef.current = ts;
      const speed = 1 + (progress / 100) * 5.5 + (phase === "burst" ? 9 : 0);
      setAngle(a => (a + (delta / 1000) * 40 * speed) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [progress, phase]);

  const glow      = progress / 100;
  const speedMult = 1 + (progress / 100) * 5.5;

  return (
    <div
      style={{
        position:   "fixed",
        inset:       0,
        zIndex:      9999,
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        // Dark background that matches the dark mode --background (#0F172A)
        // with a warm primary-tinted glow at center
        background: `radial-gradient(ellipse at 50% 45%, rgba(192,103,30,${0.08 + glow * 0.06}) 0%, #0F172A 55%, #080d18 100%)`,
        opacity:    phase === "exit" ? 0 : 1,
        transform:  phase === "exit" ? "scale(1.06)" : "scale(1)",
        transition: phase === "exit" ? "opacity 0.8s ease, transform 0.8s ease" : "none",
        overflow:   "hidden",
        // Match the body font stack from globals.css
        fontFamily: "var(--font-geist-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      }}
    >
      {/* Grout grid — uses --border color at low opacity */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045 + glow * 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grout" width="52" height="52" patternUnits="userSpaceOnUse">
            <rect width="52" height="52" fill="none" stroke="#334155" strokeWidth="1" />
            <rect x="2" y="2" width="48" height="48" fill="none" stroke="#c0671e" strokeWidth="0.2" strokeDasharray="2,10" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grout)" />
      </svg>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 28%, rgba(8,13,24,0.7) 100%)",
      }} />

      {/* Corner accents */}
      <CornerAccent pos={{ top: 20, left: 20 }}    rotate={0}   opacity={0.18 + glow * 0.45} />
      <CornerAccent pos={{ top: 20, right: 20 }}   rotate={90}  opacity={0.18 + glow * 0.45} />
      <CornerAccent pos={{ bottom: 20, right: 20 }} rotate={180} opacity={0.18 + glow * 0.45} />
      <CornerAccent pos={{ bottom: 20, left: 20 }} rotate={270} opacity={0.18 + glow * 0.45} />

      {/* Orbital rings */}
      {LAYER_CONFIG.map((layer, li) => {
        const vis    = progress >= layer.visibleAt;
        const ringOp = vis ? Math.min(1, (progress - layer.visibleAt) / 20) * 0.2 : 0;
        return (
          <div key={li} style={{
            position:     "absolute",
            width:        layer.radius * 2,
            height:       layer.radius * 2,
            borderRadius: "50%",
            border:       `1px solid rgba(192,103,30,${ringOp})`,
            transition:   "all 0.8s ease",
          }} />
        );
      })}

      {/* Orbiting tile fragments */}
      {TILE_SHAPES.map((tile, i) => {
        const layer   = LAYER_CONFIG[tile.layer - 1];
        const vis     = progress >= layer.visibleAt;
        const opacity = vis ? Math.min(1, (progress - layer.visibleAt) / 18) : 0;

        const layerAngle = tile.startAngle + layer.dir * angle * (1 + (tile.layer - 1) * 0.38);
        const rad = (layerAngle * Math.PI) / 180;
        const x   = Math.cos(rad) * layer.radius;
        const y   = Math.sin(rad) * layer.radius;
        const bm  = phase === "burst" ? 1.4 : 1;

        return (
          <div key={i} style={{
            position:      "absolute",
            transform:     `translate(${x * bm}px, ${y * bm}px)`,
            opacity:       opacity * (phase === "exit" ? 0 : 1),
            transition:    phase === "burst" ? "transform 0.35s ease-out" : "opacity 0.6s ease",
            filter:        `drop-shadow(0 0 ${3 + speedMult * 1.5}px rgba(192,103,30,0.6))`,
            pointerEvents: "none",
          }}>
            <tile.Component
              size={tile.size}
              fill={tile.fill}
              stroke={tile.stroke}
              rotate={layerAngle * 0.45}
            />
          </div>
        );
      })}

      {phase === "burst" && <BurstShards />}

      {/* Center content */}
      <div style={{
        position:       "relative",
        zIndex:          10,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:             22,
      }}>
        {/* Logo */}
        <div style={{
          transform:  phase === "burst" ? "scale(1.18)" : "scale(1)",
          transition: "transform 0.35s ease",
          animation:  "tileBreath 3.2s ease-in-out infinite",
        }}>
          <CenterLogo glow={glow} />
        </div>

        {/* Wordmark — uses --text-main / --text-muted equivalents */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize:      28,
            fontWeight:    600,
            letterSpacing: "0.22em",
            color:         "#F1F5F9",          // --text-main in dark
            textTransform: "uppercase",
            textShadow:    `0 0 ${8 + glow * 24}px rgba(192,103,30,${0.4 + glow * 0.4})`,
            transition:    "text-shadow 0.5s",
          }}>
            Lanark
          </div>
          <div style={{
            fontSize:      10,
            letterSpacing: "0.4em",
            color:         "#94A3B8",           // --text-muted
            textTransform: "uppercase",
            marginTop:      5,
          }}>
            Fine Tiles &amp; Stone
          </div>
        </div>

        {/* Progress — segmented tile bar matching --primary + --border */}
        <div style={{ width: 240 }}>
          {/* Tile segments */}
          <div style={{ display: "flex", gap: 3, height: 8, marginBottom: 9 }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const filled = (i / 20) * 100 < progress;
              // Alternate primary and secondary for filled tiles
              const fillColor = filled
                ? i % 3 === 0
                  ? `rgba(247,157,40,${0.6 + (i / 20) * 0.4})`    // --secondary
                  : `rgba(192,103,30,${0.55 + (i / 20) * 0.45})`  // --primary
                : "rgba(255,255,255,0.04)";
              return (
                <div key={i} style={{
                  flex:         1,
                  background:   fillColor,
                  border:       `1px solid ${filled ? "rgba(192,103,30,0.35)" : "#334155"}`, // --border in dark
                  borderRadius:  1,
                  transition:   "background 0.25s ease, border-color 0.25s ease",
                  boxShadow:    filled ? "0 0 5px rgba(192,103,30,0.35)" : "none",
                }} />
              );
            })}
          </div>

          {/* Labels */}
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            fontSize:        10,
            letterSpacing:  "0.14em",
            color:           "#64748B",           // --text-muted
            textTransform:  "uppercase",
          }}>
            <span>Laying the foundation</span>
            <span style={{ color: "#c0671e", fontWeight: 600 }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tileBreath {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}