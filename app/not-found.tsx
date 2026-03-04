"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// ── Tile palette — never changes with theme ───────────────────────────────────
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

function DecorTile({
  size = 48, seed = 0, opacity = 1,
  style: tileStyle = "square",
}: {
  size?: number; seed?: number; opacity?: number;
  style?: "square" | "diamond" | "cross" | "corner";
}) {
  const rnd = seededRandom(seed);
  const p = PALETTE[Math.floor(rnd() * PALETTE.length)];
  const rotate = [0, 90, 180, 270][Math.floor(rnd() * 4)];
  const { fill, accent } = p;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40"
      style={{ opacity, transform: `rotate(${rotate}deg)`, display: "block" }}>
      {/* Tile background is always dark — never reacts to theme */}
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

function BrokenTileStrip() {
  const styles: Array<"square" | "diamond" | "cross" | "corner"> = [
    "corner", "cross", "diamond", "square", "corner", "diamond", "cross",
    "square", "corner", "cross", "diamond", "square",
  ];
  return (
    <div className="nf-tile-strip" style={{ display: "flex", gap: 3, marginBottom: 4 }}>
      {styles.map((s, i) => (
        <DecorTile key={i} size={38} seed={i * 17 + 3} style={s} />
      ))}
    </div>
  );
}

function Cracked404() {
  return (
    <svg width="360" height="120" viewBox="0 0 360 120" style={{ overflow: "visible" }}>
      <defs>
        <filter id="glow404">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* 404 numerals — fill via CSS class so they adapt to theme */}
      <text x="10" y="105" fontSize="120" fontWeight="900"
        fontFamily="'Georgia', serif" className="nf-404-fill"
        stroke="#c0671e" strokeWidth="1" filter="url(#glow404)"
        style={{ letterSpacing: "-4px" }}>4</text>
      <text x="122" y="105" fontSize="120" fontWeight="900"
        fontFamily="'Georgia', serif" className="nf-404-fill"
        stroke="#c0671e" strokeWidth="1" filter="url(#glow404)">0</text>
      <text x="240" y="105" fontSize="120" fontWeight="900"
        fontFamily="'Georgia', serif" className="nf-404-fill"
        stroke="#c0671e" strokeWidth="1" filter="url(#glow404)">4</text>
      {/* Crack lines */}
      <g stroke="#f79d28" strokeWidth="1.2" opacity="0.7">
        <line x1="148" y1="15" x2="162" y2="40" />
        <line x1="162" y1="40" x2="155" y2="60" />
        <line x1="155" y1="60" x2="170" y2="85" />
        <line x1="162" y1="40" x2="178" y2="52" />
        <line x1="148" y1="15" x2="136" y2="30" />
      </g>
      {/* Tile grid overlay */}
      {[0,1,2].map(row => [0,1,2].map(col => (
        <rect key={`${row}-${col}`}
          x={134 + col * 18} y={18 + row * 22} width="16" height="20"
          fill="none" stroke="#c0671e" strokeWidth="0.5" opacity="0.25" rx="0.5" />
      )))}
    </svg>
  );
}

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88">
      <polygon points="44,4 84,44 44,84 4,44" fill="#0F172A" stroke="#c0671e" strokeWidth="1.8" />
      {[0,1,2].map(row => [0,1,2].map(col => {
        const x = 24 + col * 15, y = 24 + row * 15;
        const isCenter = row === 1 && col === 1;
        return <rect key={`${row}-${col}`} x={x} y={y} width="13" height="13"
          fill={isCenter ? "#c0671e" : "#1E293B"} stroke="#c0671e" strokeWidth="0.7" rx="0.5" />;
      }))}
      <polygon points="44,31 57,44 44,57 31,44" fill="none" stroke="#f79d28" strokeWidth="0.9" opacity="0.5" />
      <circle cx="44" cy="44" r="2.5" fill="#f79d28" opacity="0.85" />
    </svg>
  );
}

// ── Theme styles ──────────────────────────────────────────────────────────────
const themeStyles = `
  /* ── Dark (default) ──────────────────────────────────────────────── */
  .nf-root {
    --nf-bg:            #080d18;
    --nf-text-primary:  #F1F5F9;
    --nf-text-muted:    #64748B;
    --nf-text-brand:    #94A3B8;
    --nf-text-foot:     #334155;
    --nf-scan:          rgba(0,0,0,0.06);
    --nf-divider:       rgba(192,103,30,0.2);
    --nf-404-fill:      #0f1a30;
    --nf-strip-opacity: 0.18;
    --nf-corner-opacity:0.12;
    --nf-btn-ghost-c:   #94A3B8;
    --nf-btn-ghost-b:   rgba(192,103,30,0.3);
    --nf-btn-ghost-bg:  transparent;
  }

  /* ── Light — OS preference ───────────────────────────────────────── */
  @media (prefers-color-scheme: light) {
    .nf-root {
      --nf-bg:            #f5f0ea;
      --nf-text-primary:  #1a1208;
      --nf-text-muted:    #7a6652;
      --nf-text-brand:    #6b4f2e;
      --nf-text-foot:     #b89272;
      --nf-scan:          rgba(0,0,0,0.025);
      --nf-divider:       rgba(192,103,30,0.22);
      --nf-404-fill:      #d4b896;
      --nf-strip-opacity: 0.3;
      --nf-corner-opacity:0.2;
      --nf-btn-ghost-c:   #7a6652;
      --nf-btn-ghost-b:   rgba(192,103,30,0.35);
      --nf-btn-ghost-bg:  rgba(192,103,30,0.05);
    }
  }

  /* ── Explicit dark class / attribute ─────────────────────────────── */
  :root.dark .nf-root, [data-theme="dark"] .nf-root {
    --nf-bg:            #080d18;
    --nf-text-primary:  #F1F5F9;
    --nf-text-muted:    #64748B;
    --nf-text-brand:    #94A3B8;
    --nf-text-foot:     #334155;
    --nf-scan:          rgba(0,0,0,0.06);
    --nf-divider:       rgba(192,103,30,0.2);
    --nf-404-fill:      #0f1a30;
    --nf-strip-opacity: 0.18;
    --nf-corner-opacity:0.12;
    --nf-btn-ghost-c:   #94A3B8;
    --nf-btn-ghost-b:   rgba(192,103,30,0.3);
    --nf-btn-ghost-bg:  transparent;
  }

  /* ── Explicit light class / attribute ───────────────────────────── */
  :root.light .nf-root, [data-theme="light"] .nf-root {
    --nf-bg:            #f5f0ea;
    --nf-text-primary:  #1a1208;
    --nf-text-muted:    #7a6652;
    --nf-text-brand:    #6b4f2e;
    --nf-text-foot:     #b89272;
    --nf-scan:          rgba(0,0,0,0.025);
    --nf-divider:       rgba(192,103,30,0.22);
    --nf-404-fill:      #d4b896;
    --nf-strip-opacity: 0.3;
    --nf-corner-opacity:0.2;
    --nf-btn-ghost-c:   #7a6652;
    --nf-btn-ghost-b:   rgba(192,103,30,0.35);
    --nf-btn-ghost-bg:  rgba(192,103,30,0.05);
  }

  /* ── SVG hooks ───────────────────────────────────────────────────── */
  .nf-root .nf-404-fill      { fill: var(--nf-404-fill); }
  .nf-root .nf-tile-strip    { opacity: var(--nf-strip-opacity); }
  .nf-root .nf-corner-tiles  { opacity: var(--nf-corner-opacity); }

  /* ── Buttons ─────────────────────────────────────────────────────── */
  .nf-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px; background: #c0671e; color: #fff;
    font-size: 13px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; text-decoration: none;
    border-radius: 2px; font-family: Georgia, serif;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .nf-btn-primary:hover {
    background: #d4793a;
    box-shadow: 0 4px 18px rgba(192,103,30,0.35);
  }

  .nf-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px;
    background: var(--nf-btn-ghost-bg);
    color: var(--nf-btn-ghost-c);
    font-size: 13px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; text-decoration: none;
    border-radius: 2px; border: 1px solid var(--nf-btn-ghost-b);
    font-family: Georgia, serif;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .nf-btn-ghost:hover {
    border-color: rgba(192,103,30,0.6);
    color: #c0671e;
    background: rgba(192,103,30,0.06);
  }
`;

// ── Main Page ─────────────────────────────────────────────────────────────────
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
    <>
      <style>{themeStyles}</style>

      <div className="nf-root" style={{
        minHeight: "100vh",
        background: "var(--nf-bg)",
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
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, var(--nf-scan) 3px, var(--nf-scan) 4px)`,
        }} />

        {/* Corner tile grids — tiles keep their own dark colours */}
        <div className="nf-corner-tiles" style={{ position: "absolute", top: 0, left: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 48px)", gap: 2 }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <DecorTile key={i} size={48} seed={i * 5}
                style={["square", "diamond", "cross", "corner"][i % 4] as "square"} />
            ))}
          </div>
        </div>
        <div className="nf-corner-tiles" style={{ position: "absolute", bottom: 0, right: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 48px)", gap: 2 }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <DecorTile key={i} size={48} seed={i * 9 + 50}
                style={["corner", "cross", "diamond", "square"][i % 4] as "square"} />
            ))}
          </div>
        </div>

        {/* Content */}
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
              color: "var(--nf-text-brand)", textTransform: "uppercase",
              fontFamily: "Georgia, serif",
            }}>Lanark</span>
          </div>

          {/* Tile strip top */}
          <BrokenTileStrip />

          {/* 404 */}
          <div><Cracked404 /></div>

          {/* Tile strip bottom */}
          <BrokenTileStrip />

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h1 style={{
              margin: 0, fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 700,
              color: "var(--nf-text-primary)", letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              This tile has gone missing
            </h1>
            <p style={{
              margin: 0, fontSize: 15, color: "var(--nf-text-muted)",
              lineHeight: 1.7, fontFamily: "Georgia, serif", fontStyle: "italic",
            }}>
              The page you&apos;re looking for has been removed, relocated,<br />
              or never existed in our collection.
            </p>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", gap: 4, alignItems: "center", width: "100%" }}>
            <div style={{ flex: 1, height: 1, background: "var(--nf-divider)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12" style={{ opacity: 0.5 }}>
              <polygon points="6,0 12,6 6,12 0,6" fill="#c0671e" />
            </svg>
            <div style={{ flex: 1, height: 1, background: "var(--nf-divider)" }} />
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/" className="nf-btn-primary">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
            <Link href="/services" className="nf-btn-ghost">
              Browse Services
            </Link>
          </div>

          {/* Footer note */}
          <p style={{
            margin: 0, fontSize: 11,
            color: "var(--nf-text-foot)",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Error 404 — Page Not Found
          </p>
        </div>

        {/* Shim ref (unused visually but kept for future shimmer effect) */}
        <div ref={shimRef} style={{ display: "none" }} />
      </div>
    </>
  );
}