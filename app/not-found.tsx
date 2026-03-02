"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// ── Shared tile palette ──────────────────────────────────────────────────────
const PALETTE = [
  { fill: "#c0671e", accent: "#f79d28" },
  { fill: "#d4873a", accent: "#c0671e" },
  { fill: "#f79d28", accent: "#c0671e" },
  { fill: "#a05818", accent: "#f79d28" },
  { fill: "#1a2540", accent: "#c0671e" },
  { fill: "#0f1a30", accent: "#d4873a" },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// ── Static decorative tile ───────────────────────────────────────────────────
function DecorTile({
  size = 48,
  seed = 0,
  opacity = 1,
  style: tileStyle = "square",
}: {
  size?: number;
  seed?: number;
  opacity?: number;
  style?: "square" | "diamond" | "cross" | "corner";
}) {
  const rnd = seededRandom(seed);
  const p = PALETTE[Math.floor(rnd() * PALETTE.length)];
  const rotate = [0, 90, 180, 270][Math.floor(rnd() * 4)];
  const { fill, accent } = p;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ opacity, transform: `rotate(${rotate}deg)`, display: "block" }}
    >
      <rect x="0.5" y="0.5" width="39" height="39" fill="#080d18" />

      {tileStyle === "square" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} />
          <rect x="6" y="6" width="28" height="28" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
          <rect x="12" y="12" width="16" height="16" fill={accent} opacity="0.25" />
          <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
          <line x1="38" y1="2" x2="2" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
        </>
      )}
      {tileStyle === "diamond" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.25" />
          <polygon points="20,4 36,20 20,36 4,20" fill={fill} />
          <polygon points="20,10 30,20 20,30 10,20" fill="none" stroke={accent} strokeWidth="0.9" opacity="0.7" />
          <circle cx="20" cy="20" r="3" fill={accent} opacity="0.8" />
        </>
      )}
      {tileStyle === "cross" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.15" />
          <rect x="14" y="2" width="12" height="36" fill={fill} />
          <rect x="2" y="14" width="36" height="12" fill={fill} />
          <rect x="16" y="16" width="8" height="8" fill={accent} opacity="0.7" />
        </>
      )}
      {tileStyle === "corner" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.1" />
          <polygon points="2,2 22,2 2,22" fill={fill} />
          <polygon points="38,38 18,38 38,18" fill={fill} />
          <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="1" opacity="0.4" />
        </>
      )}
    </svg>
  );
}

// ── Broken tile strip ────────────────────────────────────────────────────────
function BrokenTileStrip() {
  const styles: Array<"square" | "diamond" | "cross" | "corner"> = [
    "corner", "cross", "diamond", "square", "corner", "diamond", "cross",
    "square", "corner", "cross", "diamond", "square",
  ];
  return (
    <div style={{ display: "flex", gap: 3, opacity: 0.18, marginBottom: 4 }}>
      {styles.map((s, i) => (
        <DecorTile key={i} size={38} seed={i * 17 + 3} tileStyle={s} />
      ))}
    </div>
  );
}

// ── Cracked 404 SVG ──────────────────────────────────────────────────────────
function Cracked404() {
  return (
    <svg
      width="360"
      height="120"
      viewBox="0 0 360 120"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="glow404">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 4 */}
      <text x="10" y="105" fontSize="120" fontWeight="900"
        fontFamily="'Georgia', serif" fill="#0f1a30"
        stroke="#c0671e" strokeWidth="1" filter="url(#glow404)"
        style={{ letterSpacing: "-4px" }}>
        4
      </text>

      {/* 0 */}
      <text x="122" y="105" fontSize="120" fontWeight="900"
        fontFamily="'Georgia', serif" fill="#0f1a30"
        stroke="#c0671e" strokeWidth="1" filter="url(#glow404)">
        0
      </text>

      {/* 4 */}
      <text x="240" y="105" fontSize="120" fontWeight="900"
        fontFamily="'Georgia', serif" fill="#0f1a30"
        stroke="#c0671e" strokeWidth="1" filter="url(#glow404)">
        4
      </text>

      {/* crack lines across the 0 */}
      <g stroke="#f79d28" strokeWidth="1.2" opacity="0.7">
        <line x1="148" y1="15" x2="162" y2="40" />
        <line x1="162" y1="40" x2="155" y2="60" />
        <line x1="155" y1="60" x2="170" y2="85" />
        <line x1="162" y1="40" x2="178" y2="52" />
        <line x1="148" y1="15" x2="136" y2="30" />
      </g>

      {/* tile grid overlay on the 0 */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={134 + col * 18}
            y={18 + row * 22}
            width="16"
            height="20"
            fill="none"
            stroke="#c0671e"
            strokeWidth="0.5"
            opacity="0.25"
            rx="0.5"
          />
        ))
      )}
    </svg>
  );
}

// ── Lanark logo mark ─────────────────────────────────────────────────────────
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88">
      <polygon points="44,4 84,44 44,84 4,44" fill="#0F172A" stroke="#c0671e" strokeWidth="1.8" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const x = 24 + col * 15, y = 24 + row * 15;
          const isCenter = row === 1 && col === 1;
          return (
            <rect key={`${row}-${col}`} x={x} y={y} width="13" height="13"
              fill={isCenter ? "#c0671e" : "#1E293B"} stroke="#c0671e" strokeWidth="0.7" rx="0.5" />
          );
        })
      )}
      <polygon points="44,31 57,44 44,57 31,44" fill="none" stroke="#f79d28" strokeWidth="0.9" opacity="0.5" />
      <circle cx="44" cy="44" r="2.5" fill="#f79d28" opacity="0.85" />
    </svg>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function NotFound() {
  const shimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shimRef.current;
    if (!el) return;
    let x = -100;
    let raf: number;
    const animate = () => {
      x = x > 120 ? -100 : x + 0.18;
      el.style.backgroundPosition = `${x}% 50%`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080d18",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflow: "hidden",
        position: "relative",
        padding: "40px 24px",
      }}
    >
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
      }} />

      {/* Corner tile accents */}
      <div style={{ position: "absolute", top: 0, left: 0, opacity: 0.12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 48px)", gap: 2 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <DecorTile key={i} size={48} seed={i * 5} style={["square", "diamond", "cross", "corner"][i % 4] as "square"} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 48px)", gap: 2 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <DecorTile key={i} size={48} seed={i * 9 + 50} style={["corner", "cross", "diamond", "square"][i % 4] as "square"} />
          ))}
        </div>
      </div>

      {/* Content card */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 32, textAlign: "center", maxWidth: 520, width: "100%",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={28} />
          <span style={{
            fontSize: 13, fontWeight: 700, letterSpacing: "0.3em",
            color: "#94A3B8", textTransform: "uppercase",
            fontFamily: "Georgia, serif",
          }}>Lanark</span>
        </div>

        {/* Tile strip top */}
        <BrokenTileStrip />

        {/* 404 */}
        <div>
          <Cracked404 />
        </div>

        {/* Tile strip bottom */}
        <BrokenTileStrip />

        {/* Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(18px, 4vw, 26px)",
            fontWeight: 700,
            color: "#F1F5F9",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            This tile has gone missing
          </h1>
          <p style={{
            margin: 0,
            fontSize: 15,
            color: "#64748B",
            lineHeight: 1.7,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}>
            The page you&apos;re looking for has been removed, relocated,<br />
            or never existed in our collection.
          </p>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", gap: 4, alignItems: "center", width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(192,103,30,0.2)" }} />
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ opacity: 0.5 }}>
            <polygon points="6,0 12,6 6,12 0,6" fill="#c0671e" />
          </svg>
          <div style={{ flex: 1, height: 1, background: "rgba(192,103,30,0.2)" }} />
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px",
            background: "#c0671e",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 2,
            fontFamily: "Georgia, serif",
            transition: "background 0.2s",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>

          <Link href="/tiles" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px",
            background: "transparent",
            color: "#94A3B8",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 2,
            border: "1px solid rgba(192,103,30,0.3)",
            fontFamily: "Georgia, serif",
          }}>
            Browse Tiles
          </Link>
        </div>

        {/* Footer note */}
        <p style={{
          margin: 0, fontSize: 11,
          color: "#334155",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Error 404 — Page Not Found
        </p>
      </div>
    </div>
  );
}