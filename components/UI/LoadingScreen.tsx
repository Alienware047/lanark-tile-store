"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  progress?: number;
}

type TileStyle = "square" | "diamond" | "cross" | "corner" | "blank";

interface TileData {
  id: number; col: number; row: number;
  style: TileStyle; fill: string; accent: string;
  rotate: number; delay: number;
}

// Tiles keep their own dark palette — never changes with theme
const PALETTE = [
  { fill: "#c0671e", accent: "#f79d28" },
  { fill: "#d4873a", accent: "#c0671e" },
  { fill: "#f79d28", accent: "#c0671e" },
  { fill: "#a05818", accent: "#f79d28" },
  { fill: "#1a2540", accent: "#c0671e" },
  { fill: "#0f1a30", accent: "#d4873a" },
];

function pickStyle(col: number, row: number): TileStyle {
  const hash = (col * 7 + row * 13) % 12;
  if (hash < 5) return "square";
  if (hash < 7) return "diamond";
  if (hash < 9) return "cross";
  if (hash < 11) return "corner";
  return "blank";
}

function Tile({
  style, fill, accent, rotate, size, opacity, placed,
}: {
  style: TileStyle; fill: string; accent: string; rotate: number;
  size: number; opacity: number; placed: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40"
      style={{
        display: "block",
        transform: `rotate(${rotate}deg) scale(${placed ? 1 : 0.4})`,
        opacity,
        transition: placed ? "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease" : "none",
        transformOrigin: "center",
      }}
    >
      {/* Tile background is always dark — per spec tiles stay the same */}
      <rect x="0.5" y="0.5" width="39" height="39" fill="#080d18" />

      {style === "square" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} />
        <rect x="6" y="6" width="28" height="28" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        <rect x="12" y="12" width="16" height="16" fill={accent} opacity="0.25" />
        <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
        <line x1="38" y1="2" x2="2" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      </>)}
      {style === "diamond" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.25" />
        <polygon points="20,4 36,20 20,36 4,20" fill={fill} />
        <polygon points="20,10 30,20 20,30 10,20" fill="none" stroke={accent} strokeWidth="0.9" opacity="0.7" />
        <circle cx="20" cy="20" r="3" fill={accent} opacity="0.8" />
      </>)}
      {style === "cross" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.15" />
        <rect x="14" y="2" width="12" height="36" fill={fill} />
        <rect x="2" y="14" width="36" height="12" fill={fill} />
        <rect x="16" y="16" width="8" height="8" fill={accent} opacity="0.7" />
        <rect x="2" y="2" width="36" height="36" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.2" />
      </>)}
      {style === "corner" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.1" />
        <polygon points="2,2 22,2 2,22" fill={fill} />
        <polygon points="38,38 18,38 38,18" fill={fill} />
        <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="1" opacity="0.4" />
        <rect x="14" y="14" width="12" height="12" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.5" />
      </>)}
      {style === "blank" && (<>
        <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.08" />
        <rect x="8" y="8" width="24" height="24" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.25" />
        <circle cx="20" cy="20" r="2" fill={accent} opacity="0.2" />
      </>)}
    </svg>
  );
}

// Center logo card — uses theme-aware CSS vars for the UI chrome, tiles stay dark
function CenterLogo({ progress }: { progress: number }) {
  const glow = progress / 100;
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 20,
      opacity: progress > 55 ? 1 : 0,
      transition: "opacity 0.8s ease",
      zIndex: 10, pointerEvents: "none",
    }}>
      <div style={{
        background: "var(--ls-card-bg)",
        border: "1px solid var(--ls-card-border)",
        borderRadius: 4, padding: "32px 48px",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 16,
        backdropFilter: "blur(14px)",
        boxShadow: `0 0 60px rgba(192,103,30,${0.15 + glow * 0.25}), 0 0 120px rgba(192,103,30,${0.05 + glow * 0.1})`,
      }}>
        {/* Logo — always dark background, brand colours */}
        <svg width="72" height="72" viewBox="0 0 88 88"
          style={{ filter: `drop-shadow(0 0 ${6 + glow * 18}px rgba(192,103,30,${0.4 + glow * 0.5}))` }}>
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

        {/* Wordmark */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 24, fontWeight: 700, letterSpacing: "0.25em",
            color: "var(--ls-text-primary)", textTransform: "uppercase",
            textShadow: `0 0 ${8 + glow * 20}px rgba(192,103,30,${0.5 + glow * 0.4})`,
          }}>Lanark</div>
          <div style={{
            fontSize: 9, letterSpacing: "0.45em",
            color: "var(--ls-text-muted)",
            textTransform: "uppercase", marginTop: 4,
          }}>
            Fine Tiles &amp; Stone
          </div>
        </div>

        {/* Progress bar segments */}
        <div style={{ width: 220 }}>
          <div style={{ display: "flex", gap: 2, height: 6, marginBottom: 8 }}>
            {Array.from({ length: 22 }).map((_, i) => {
              const filled = (i / 22) * 100 < progress;
              return <div key={i} style={{
                flex: 1,
                background: filled
                  ? (i % 3 === 0 ? "rgba(247,157,40,0.9)" : "rgba(192,103,30,0.85)")
                  : "var(--ls-seg-empty)",
                border: `1px solid ${filled ? "rgba(192,103,30,0.4)" : "var(--ls-seg-border)"}`,
                borderRadius: 1,
                transition: "background 0.2s ease",
                boxShadow: filled ? "0 0 4px rgba(192,103,30,0.4)" : "none",
              }} />;
            })}
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontSize: 9, letterSpacing: "0.12em",
            color: "var(--ls-text-muted)", textTransform: "uppercase",
          }}>
            <span>Laying the foundation</span>
            <span style={{ color: "#c0671e", fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page load progress hook ──────────────────────────────────────────────────
function usePageLoadProgress(externalProg?: number) {
  const [progress, setProgress] = useState(0);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (externalProg !== undefined) { setProgress(externalProg); return; }

    const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

    function ramp(cur: number, to: number, stepMs: number, inc: number, cb?: () => void) {
      clear();
      const tick = (v: number) => {
        if (v >= to) { cb?.(); return; }
        const next = Math.min(to, v + inc);
        setProgress(next);
        timerRef.current = setTimeout(() => tick(next), stepMs);
      };
      tick(cur);
    }

    const snapTo100 = () => { clear(); setProgress(100); };

    const startRamp = () => {
      ramp(0, 30, 16, 1.4, () =>
        ramp(30, 70, 38, 0.55, () =>
          ramp(70, 95, 80, 0.14, () => {
            if (loadedRef.current) snapTo100();
          })
        )
      );
    };

    if (typeof window === "undefined") return;

    if (document.readyState === "complete") {
      loadedRef.current = true;
      ramp(0, 85, 10, 3, () => snapTo100());
    } else {
      startRamp();
      const onLoad = () => { loadedRef.current = true; setTimeout(snapTo100, 150); };
      window.addEventListener("load", onLoad, { once: true });
      return () => { clear(); window.removeEventListener("load", onLoad); };
    }
    return () => clear();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (externalProg !== undefined) setProgress(externalProg);
  }, [externalProg]);

  return progress;
}

// ─── Theme style injection ────────────────────────────────────────────────────
const themeStyles = `
  .ls-root {
    --ls-bg:          #080d18;
    --ls-card-bg:     rgba(8,13,24,0.85);
    --ls-card-border: rgba(192,103,30,0.5);
    --ls-text-primary:#F1F5F9;
    --ls-text-muted:  #94A3B8;
    --ls-seg-empty:   rgba(255,255,255,0.04);
    --ls-seg-border:  #1e293b;
    --ls-scan:        rgba(0,0,0,0.08);
  }

  @media (prefers-color-scheme: light) {
    .ls-root {
      --ls-bg:          #f5f0ea;
      --ls-card-bg:     rgba(253,248,243,0.92);
      --ls-card-border: rgba(192,103,30,0.45);
      --ls-text-primary:#1a1208;
      --ls-text-muted:  #7a6652;
      --ls-seg-empty:   rgba(0,0,0,0.06);
      --ls-seg-border:  rgba(192,103,30,0.15);
      --ls-scan:        rgba(0,0,0,0.022);
    }
  }

  :root.dark .ls-root, [data-theme="dark"] .ls-root {
    --ls-bg:          #080d18;
    --ls-card-bg:     rgba(8,13,24,0.85);
    --ls-card-border: rgba(192,103,30,0.5);
    --ls-text-primary:#F1F5F9;
    --ls-text-muted:  #94A3B8;
    --ls-seg-empty:   rgba(255,255,255,0.04);
    --ls-seg-border:  #1e293b;
    --ls-scan:        rgba(0,0,0,0.08);
  }

  :root.light .ls-root, [data-theme="light"] .ls-root {
    --ls-bg:          #f5f0ea;
    --ls-card-bg:     rgba(253,248,243,0.92);
    --ls-card-border: rgba(192,103,30,0.45);
    --ls-text-primary:#1a1208;
    --ls-text-muted:  #7a6652;
    --ls-seg-empty:   rgba(0,0,0,0.06);
    --ls-seg-border:  rgba(192,103,30,0.15);
    --ls-scan:        rgba(0,0,0,0.022);
  }
`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoadingScreen({ onComplete, progress: externalProg }: LoadingScreenProps) {
  const progress              = usePageLoadProgress(externalProg);
  const [phase, setPhase]     = useState<"loading" | "exit">("loading");
  const [placedCount, setPlaced] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [grid, setGrid]       = useState({ cols: 0, rows: 0, tileSize: 0 });
  const rafRef                = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    const TILE = 52;
    setGrid({
      cols: Math.ceil(window.innerWidth  / TILE) + 1,
      rows: Math.ceil(window.innerHeight / TILE) + 1,
      tileSize: TILE,
    });
  }, []);

  const sortedTiles = useMemo<TileData[]>(() => {
    if (!grid.cols || !grid.rows) return [];
    const cx = Math.floor(grid.cols / 2);
    const cy = Math.floor(grid.rows / 2);
    const all: TileData[] = [];
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const dx = col - cx, dy = row - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const p = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        all.push({
          id: row * grid.cols + col, col, row,
          style:  pickStyle(col, row),
          fill:   p.fill, accent: p.accent,
          rotate: [0, 90, 180, 270][Math.floor(Math.random() * 4)],
          delay:  (dist + Math.random() * 4 - 2) * 40,
        });
      }
    }
    return all.sort((a, b) => a.delay - b.delay);
  }, [grid.cols, grid.rows]);

  useEffect(() => {
    if (!sortedTiles.length) return;
    const drive = () => {
      setPlaced(Math.floor((progress / 100) * sortedTiles.length));
      rafRef.current = requestAnimationFrame(drive);
    };
    rafRef.current = requestAnimationFrame(drive);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress, sortedTiles.length]);

  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(() => onComplete?.(), 900);
      }, 550);
      return () => clearTimeout(t);
    }
  }, [progress, phase, onComplete]);

  if (!mounted) return null;

  return (
    <>
      <style>{themeStyles}</style>
      <div
        className="ls-root"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "var(--ls-bg)", overflow: "hidden",
          opacity:   phase === "exit" ? 0 : 1,
          transform: phase === "exit" ? "scale(1.04)" : "scale(1)",
          transition: phase === "exit" ? "opacity 0.9s ease, transform 0.9s ease" : "none",
        }}
      >
        {/* Tile grid — always dark themed, independent of UI theme */}
        <div style={{
          position: "absolute", inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${grid.cols}, ${grid.tileSize}px)`,
          gridTemplateRows:    `repeat(${grid.rows}, ${grid.tileSize}px)`,
        }}>
          {sortedTiles.map((tile, i) => {
            const placed = i < placedCount;
            return (
              <div key={tile.id} style={{
                gridColumn: tile.col + 1, gridRow: tile.row + 1,
                width: grid.tileSize, height: grid.tileSize,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Tile
                  style={tile.style} fill={tile.fill} accent={tile.accent}
                  rotate={tile.rotate} size={grid.tileSize}
                  opacity={placed ? 1 : 0} placed={placed}
                />
              </div>
            );
          })}
        </div>

        {/* Scanline overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, var(--ls-scan) 3px, var(--ls-scan) 4px)`,
        }} />

        {/* Logo + progress card */}
        <CenterLogo progress={progress} />
      </div>
    </>
  );
}