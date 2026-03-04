"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ── Shared tile palette (tiles never change with theme) ──────────────────────
const PALETTE = [
  { fill: "#c0671e", accent: "#f79d28" },
  { fill: "#d4873a", accent: "#c0671e" },
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

function DecorTile({ size = 48, seed = 0, tileStyle = "square" }: {
  size?: number; seed?: number;
  tileStyle?: "square" | "diamond" | "cross" | "corner";
}) {
  const rnd = seededRandom(seed);
  const p = PALETTE[Math.floor(rnd() * PALETTE.length)];
  const rotate = [0, 90, 180, 270][Math.floor(rnd() * 4)];
  const { fill, accent } = p;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40"
      style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
      {/* tile bg stays dark — intentional per spec */}
      <rect x="0.5" y="0.5" width="39" height="39" fill="#080d18" />
      {tileStyle === "square" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} />
        <rect x="6" y="6" width="28" height="28" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        <rect x="12" y="12" width="16" height="16" fill={accent} opacity="0.25" />
        <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
        <line x1="38" y1="2" x2="2" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      </>)}
      {tileStyle === "diamond" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.25" />
        <polygon points="20,4 36,20 20,36 4,20" fill={fill} />
        <polygon points="20,10 30,20 20,30 10,20" fill="none" stroke={accent} strokeWidth="0.9" opacity="0.7" />
        <circle cx="20" cy="20" r="3" fill={accent} opacity="0.8" />
      </>)}
      {tileStyle === "cross" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.15" />
        <rect x="14" y="2" width="12" height="36" fill={fill} />
        <rect x="2" y="14" width="36" height="12" fill={fill} />
        <rect x="16" y="16" width="8" height="8" fill={accent} opacity="0.7" />
      </>)}
      {tileStyle === "corner" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.1" />
        <polygon points="2,2 22,2 2,22" fill={fill} />
        <polygon points="38,38 18,38 38,18" fill={fill} />
        <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="1" opacity="0.4" />
      </>)}
    </svg>
  );
}

function ShatteredTile() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <filter id="glowErr">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="8" y="8" width="104" height="104" fill="#0f1a30" stroke="#c0671e" strokeWidth="1.5" rx="2" />
      <rect x="14" y="14" width="92" height="92" fill="none" stroke="#c0671e" strokeWidth="0.6" opacity="0.3" />
      {[0,1,2].map(row => [0,1,2].map(col => {
        const x = 20 + col * 28, y = 20 + row * 28;
        const isCenter = row === 1 && col === 1;
        return (
          <rect key={`${row}-${col}`} x={x} y={y} width="25" height="25"
            fill={isCenter ? "#c0671e" : "#1a2540"}
            stroke="#c0671e" strokeWidth="0.8" rx="1"
            opacity={isCenter ? 1 : 0.6} />
        );
      }))}
      <g stroke="#f79d28" strokeWidth="1.5" opacity="0.9" filter="url(#glowErr)">
        <line x1="60" y1="60" x2="20" y2="10" />
        <line x1="60" y1="60" x2="100" y2="8" />
        <line x1="60" y1="60" x2="110" y2="70" />
        <line x1="60" y1="60" x2="90" y2="112" />
        <line x1="60" y1="60" x2="30" y2="108" />
        <line x1="60" y1="60" x2="8" y2="80" />
      </g>
      <g stroke="#f79d28" strokeWidth="0.7" opacity="0.5">
        <line x1="30" y1="45" x2="45" y2="55" />
        <line x1="75" y1="38" x2="68" y2="50" />
        <line x1="82" y1="75" x2="70" y2="68" />
        <line x1="40" y1="85" x2="50" y2="72" />
      </g>
      <circle cx="60" cy="60" r="5" fill="#f79d28" opacity="0.9" filter="url(#glowErr)" />
    </svg>
  );
}

function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88">
      <polygon points="44,4 84,44 44,84 4,44" fill="#0F172A" stroke="#c0671e" strokeWidth="1.8" />
      {[0,1,2].map(row => [0,1,2].map(col => {
        const x = 24 + col * 15, y = 24 + row * 15;
        const isCenter = row === 1 && col === 1;
        return <rect key={`${row}-${col}`} x={x} y={y} width="13" height="13"
          fill={isCenter ? "#c0671e" : "#1E293B"} stroke="#c0671e" strokeWidth="0.7" rx="0.5" />;
      }))}
      <circle cx="44" cy="44" r="2.5" fill="#f79d28" opacity="0.85" />
    </svg>
  );
}

// ── Theme-aware styles ────────────────────────────────────────────────────────
const styles = `
  .ge-root {
    --ge-bg:           #080d18;
    --ge-card-bg:      rgba(8,13,24,0.92);
    --ge-card-border:  rgba(192,103,30,0.3);
    --ge-text-primary: #F1F5F9;
    --ge-text-muted:   #64748B;
    --ge-text-brand:   #64748B;
    --ge-text-foot:    #1e293b;
    --ge-scan:         rgba(0,0,0,0.07);
    --ge-glow-base:    rgba(192,60,30,0.09);
    --ge-digest-bg:    rgba(192,103,30,0.06);
    --ge-digest-border:rgba(192,103,30,0.15);
    --ge-digest-label: #475569;
    --ge-divider:      rgba(192,103,30,0.15);
    --ge-btn-ghost-bg: transparent;
    --ge-btn-ghost-c:  #94A3B8;
    --ge-btn-ghost-b:  rgba(192,103,30,0.25);
  }

  @media (prefers-color-scheme: light) {
    .ge-root {
      --ge-bg:           #f5f0ea;
      --ge-card-bg:      rgba(253,248,243,0.95);
      --ge-card-border:  rgba(192,103,30,0.35);
      --ge-text-primary: #1a1208;
      --ge-text-muted:   #7a6652;
      --ge-text-brand:   #7a6652;
      --ge-text-foot:    #b89272;
      --ge-scan:         rgba(0,0,0,0.025);
      --ge-glow-base:    rgba(192,103,30,0.06);
      --ge-digest-bg:    rgba(192,103,30,0.08);
      --ge-digest-border:rgba(192,103,30,0.25);
      --ge-digest-label: #9a7a5e;
      --ge-divider:      rgba(192,103,30,0.2);
      --ge-btn-ghost-bg: rgba(192,103,30,0.04);
      --ge-btn-ghost-c:  #7a6652;
      --ge-btn-ghost-b:  rgba(192,103,30,0.3);
    }
  }

  :root.dark .ge-root, [data-theme="dark"] .ge-root {
    --ge-bg:           #080d18;
    --ge-card-bg:      rgba(8,13,24,0.92);
    --ge-card-border:  rgba(192,103,30,0.3);
    --ge-text-primary: #F1F5F9;
    --ge-text-muted:   #64748B;
    --ge-text-brand:   #64748B;
    --ge-text-foot:    #1e293b;
    --ge-scan:         rgba(0,0,0,0.07);
    --ge-glow-base:    rgba(192,60,30,0.09);
    --ge-digest-bg:    rgba(192,103,30,0.06);
    --ge-digest-border:rgba(192,103,30,0.15);
    --ge-digest-label: #475569;
    --ge-divider:      rgba(192,103,30,0.15);
    --ge-btn-ghost-bg: transparent;
    --ge-btn-ghost-c:  #94A3B8;
    --ge-btn-ghost-b:  rgba(192,103,30,0.25);
  }

  :root.light .ge-root, [data-theme="light"] .ge-root {
    --ge-bg:           #f5f0ea;
    --ge-card-bg:      rgba(253,248,243,0.95);
    --ge-card-border:  rgba(192,103,30,0.35);
    --ge-text-primary: #1a1208;
    --ge-text-muted:   #7a6652;
    --ge-text-brand:   #7a6652;
    --ge-text-foot:    #b89272;
    --ge-scan:         rgba(0,0,0,0.025);
    --ge-glow-base:    rgba(192,103,30,0.06);
    --ge-digest-bg:    rgba(192,103,30,0.08);
    --ge-digest-border:rgba(192,103,30,0.25);
    --ge-digest-label: #9a7a5e;
    --ge-divider:      rgba(192,103,30,0.2);
    --ge-btn-ghost-bg: rgba(192,103,30,0.04);
    --ge-btn-ghost-c:  #7a6652;
    --ge-btn-ghost-b:  rgba(192,103,30,0.3);
  }

  @keyframes borderPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(192,103,30,0); border-color: var(--ge-card-border); }
    50%       { box-shadow: 0 0 28px 6px rgba(192,103,30,0.18); border-color: rgba(192,103,30,0.7); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes flickerIn {
    0%  { opacity: 0; } 40% { opacity: 1; } 55% { opacity: 0.4; }
    70% { opacity: 1; } 85% { opacity: 0.7; } 100% { opacity: 1; }
  }

  .ge-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px; background: #c0671e; color: #fff;
    font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; border: none; border-radius: 2px;
    font-family: Georgia, serif; cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .ge-btn-primary:hover {
    background: #d4793a;
    box-shadow: 0 4px 18px rgba(192,103,30,0.35);
  }

  .ge-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px;
    background: var(--ge-btn-ghost-bg);
    color: var(--ge-btn-ghost-c);
    font-size: 12px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; text-decoration: none; border-radius: 2px;
    border: 1px solid var(--ge-btn-ghost-b);
    font-family: Georgia, serif;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .ge-btn-ghost:hover {
    border-color: rgba(192,103,30,0.55);
    color: #c0671e;
    background: rgba(192,103,30,0.06);
  }
`;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong — Lanark</title>
        <style>{styles}</style>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="ge-root" style={{
          minHeight: "100vh",
          background: "var(--ge-bg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          overflow: "hidden", position: "relative",
          padding: "40px 24px",
          transition: "background 0.3s",
        }}>

          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, var(--ge-scan) 3px, var(--ge-scan) 4px)`,
          }} />

          {/* Ambient glow */}
          <div style={{
            position: "absolute", top: "30%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 400,
            background: `radial-gradient(ellipse, var(--ge-glow-base) 0%, transparent 70%)`,
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Corner tile grids — tiles keep their own dark colours */}
          <div style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 48px)", gap: 2 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <DecorTile key={i} size={48} seed={i * 7}
                  tileStyle={["square", "cross", "corner", "diamond"][i % 4] as "square"} />
              ))}
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 48px)", gap: 2 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <DecorTile key={i} size={48} seed={i * 11 + 33}
                  tileStyle={["diamond", "corner", "square", "cross"][i % 4] as "square"} />
              ))}
            </div>
          </div>

          {/* Main card */}
          <div style={{
            position: "relative", zIndex: 2,
            background: "var(--ge-card-bg)",
            border: "1px solid var(--ge-card-border)",
            borderRadius: 4,
            padding: "clamp(28px,5vw,48px) clamp(24px,6vw,56px)",
            maxWidth: 520, width: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 28, textAlign: "center",
            backdropFilter: "blur(12px)",
            animation: "borderPulse 3s ease-in-out infinite",
          }}>

            {/* Brand */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              animation: "flickerIn 0.8s ease forwards",
            }}>
              <LogoMark size={26} />
              <span style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.3em",
                color: "var(--ge-text-brand)", textTransform: "uppercase",
              }}>Lanark Fine Tiles &amp; Stone</span>
            </div>

            {/* Shattered tile */}
            <div style={{ animation: "fadeInUp 0.6s 0.2s ease both" }}>
              <ShatteredTile />
            </div>

            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeInUp 0.6s 0.4s ease both" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px",
                border: "1px solid rgba(192,103,30,0.35)",
                borderRadius: 2, alignSelf: "center",
              }}>
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" fill="#c0671e" />
                </svg>
                <span style={{ fontSize: 10, letterSpacing: "0.25em", color: "#c0671e", textTransform: "uppercase", fontWeight: 700 }}>
                  System Error
                </span>
              </div>

              <h1 style={{
                margin: 0, fontSize: "clamp(20px,4vw,28px)", fontWeight: 700,
                color: "var(--ge-text-primary)", letterSpacing: "0.04em",
                textTransform: "uppercase", lineHeight: 1.3,
              }}>
                Something cracked<br />
                <span style={{ color: "#c0671e" }}>in the foundation</span>
              </h1>

              <p style={{
                margin: 0, fontSize: 14,
                color: "var(--ge-text-muted)", lineHeight: 1.75, fontStyle: "italic",
              }}>
                An unexpected error occurred while loading this page.
                Our team has been notified and is laying a new course.
              </p>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", gap: 4, alignItems: "center", width: "100%" }}>
              <div style={{ flex: 1, height: 1, background: "var(--ge-divider)" }} />
              <svg width="10" height="10" viewBox="0 0 10 10" style={{ opacity: 0.4 }}>
                <polygon points="5,0 10,5 5,10 0,5" fill="#c0671e" />
              </svg>
              <div style={{ flex: 1, height: 1, background: "var(--ge-divider)" }} />
            </div>

            {/* Error digest */}
            {error.digest && (
              <div style={{
                width: "100%",
                background: "var(--ge-digest-bg)",
                border: "1px solid var(--ge-digest-border)",
                borderRadius: 2, padding: "10px 14px",
                animation: "fadeInUp 0.6s 0.5s ease both",
              }}>
                <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.12em", color: "var(--ge-digest-label)", textTransform: "uppercase" }}>
                  Error Reference
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#c0671e", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                  {error.digest}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div style={{
              display: "flex", gap: 12, flexWrap: "wrap",
              justifyContent: "center", width: "100%",
              animation: "fadeInUp 0.6s 0.6s ease both",
            }}>
              <button className="ge-btn-primary" onClick={reset}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 7A5 5 0 1 1 7 2M7 2l3 0M7 2l0 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Try Again
              </button>

              <Link href="/" className="ge-btn-ghost">Return Home</Link>
            </div>

            {/* Footer note */}
            <p style={{
              margin: 0, fontSize: 10,
              color: "var(--ge-text-foot)", letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              Error 500 — Internal Application Error
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}