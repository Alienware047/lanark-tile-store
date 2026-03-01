"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  progress?: number;
}

// ─── Tile patterns ──────────────────────────────────────────────────────────
// Each tile can be one of several visual styles
type TileStyle = "square" | "diamond" | "cross" | "corner" | "blank";

interface TileData {
  id: number;
  col: number;
  row: number;
  style: TileStyle;
  fill: string;
  accent: string;
  rotate: number;
  delay: number; // ms
}

const PALETTE = [
  { fill: "#c0671e", accent: "#f79d28" },
  { fill: "#d4873a", accent: "#c0671e" },
  { fill: "#f79d28", accent: "#c0671e" },
  { fill: "#a05818", accent: "#f79d28" },
  { fill: "#1a2540", accent: "#c0671e" }, // dark grout tile
  { fill: "#0f1a30", accent: "#d4873a" }, // very dark
];

const STYLES: TileStyle[] = ["square", "diamond", "cross", "corner", "blank"];

function pickStyle(col: number, row: number): TileStyle {
  // Deterministic but varied
  const hash = (col * 7 + row * 13) % 12;
  if (hash < 5) return "square";
  if (hash < 7) return "diamond";
  if (hash < 9) return "cross";
  if (hash < 11) return "corner";
  return "blank";
}

// ─── Single Tile SVG ────────────────────────────────────────────────────────
function Tile({
  style,
  fill,
  accent,
  rotate,
  size,
  opacity,
  placed,
}: {
  style: TileStyle;
  fill: string;
  accent: string;
  rotate: number;
  size: number;
  opacity: number;
  placed: boolean;
}) {
  const s = size;

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 40 40"
      style={{
        display: "block",
        transform: `rotate(${rotate}deg) scale(${placed ? 1 : 0.4})`,
        opacity,
        transition: placed
          ? "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease"
          : "none",
        transformOrigin: "center",
      }}
    >
      {/* Grout border */}
      <rect x="0.5" y="0.5" width="39" height="39" fill="#080d18" />

      {style === "square" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} />
          <rect x="6" y="6" width="28" height="28" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
          <rect x="12" y="12" width="16" height="16" fill={accent} opacity="0.25" />
          <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
          <line x1="38" y1="2" x2="2" y2="38" stroke={accent} strokeWidth="0.4" opacity="0.3" />
        </>
      )}

      {style === "diamond" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.25" />
          <polygon points="20,4 36,20 20,36 4,20" fill={fill} />
          <polygon points="20,10 30,20 20,30 10,20" fill="none" stroke={accent} strokeWidth="0.9" opacity="0.7" />
          <circle cx="20" cy="20" r="3" fill={accent} opacity="0.8" />
        </>
      )}

      {style === "cross" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.15" />
          <rect x="14" y="2" width="12" height="36" fill={fill} />
          <rect x="2" y="14" width="36" height="12" fill={fill} />
          <rect x="16" y="16" width="8" height="8" fill={accent} opacity="0.7" />
          <rect x="2" y="2" width="36" height="36" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.2" />
        </>
      )}

      {style === "corner" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.1" />
          <polygon points="2,2 22,2 2,22" fill={fill} />
          <polygon points="38,38 18,38 38,18" fill={fill} />
          <line x1="2" y1="2" x2="38" y2="38" stroke={accent} strokeWidth="1" opacity="0.4" />
          <rect x="14" y="14" width="12" height="12" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.5" />
        </>
      )}

      {style === "blank" && (
        <>
          <rect x="2" y="2" width="36" height="36" fill={fill} opacity="0.08" />
          <rect x="8" y="8" width="24" height="24" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.25" />
          <circle cx="20" cy="20" r="2" fill={accent} opacity="0.2" />
        </>
      )}
    </svg>
  );
}

// ─── Center Logo overlay ─────────────────────────────────────────────────────
function CenterLogo({ progress, phase }: { progress: number; phase: string }) {
  const glow = progress / 100;
  const show = progress > 60;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* Logo card */}
      <div
        style={{
          background: "rgba(8,13,24,0.82)",
          border: "1px solid rgba(192,103,30,0.5)",
          borderRadius: 4,
          padding: "32px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          backdropFilter: "blur(12px)",
          boxShadow: `0 0 60px rgba(192,103,30,${0.15 + glow * 0.25}), 0 0 120px rgba(192,103,30,${0.05 + glow * 0.1})`,
        }}
      >
        {/* SVG logo */}
        <svg
          width="72" height="72" viewBox="0 0 88 88"
          style={{ filter: `drop-shadow(0 0 ${6 + glow * 18}px rgba(192,103,30,${0.4 + glow * 0.5}))` }}
        >
          <polygon points="44,4 84,44 44,84 4,44" fill="#0F172A" stroke="#c0671e" strokeWidth="1.8" />
          {[0,1,2].map(row => [0,1,2].map(col => {
            const x = 24 + col * 15;
            const y = 24 + row * 15;
            const isCenter = row === 1 && col === 1;
            return (
              <rect key={`${row}-${col}`} x={x} y={y} width="13" height="13"
                fill={isCenter ? "#c0671e" : "#1E293B"} stroke="#c0671e" strokeWidth="0.7" rx="0.5" />
            );
          }))}
          <polygon points="44,31 57,44 44,57 31,44" fill="none" stroke="#f79d28" strokeWidth="0.9" opacity="0.5" />
          <circle cx="44" cy="44" r="2.5" fill="#f79d28" opacity="0.85" />
        </svg>

        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 24, fontWeight: 700, letterSpacing: "0.25em",
            color: "#F1F5F9", textTransform: "uppercase",
            textShadow: `0 0 ${8 + glow * 20}px rgba(192,103,30,${0.5 + glow * 0.4})`,
          }}>Lanark</div>
          <div style={{
            fontSize: 9, letterSpacing: "0.45em", color: "#94A3B8",
            textTransform: "uppercase", marginTop: 4,
          }}>Fine Tiles &amp; Stone</div>
        </div>

        {/* Progress bar */}
        <div style={{ width: 220 }}>
          <div style={{ display: "flex", gap: 2, height: 6, marginBottom: 8 }}>
            {Array.from({ length: 22 }).map((_, i) => {
              const filled = (i / 22) * 100 < progress;
              return (
                <div key={i} style={{
                  flex: 1,
                  background: filled
                    ? i % 3 === 0 ? "rgba(247,157,40,0.9)" : "rgba(192,103,30,0.85)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${filled ? "rgba(192,103,30,0.4)" : "#1e293b"}`,
                  borderRadius: 1,
                  transition: "background 0.2s ease",
                  boxShadow: filled ? "0 0 4px rgba(192,103,30,0.4)" : "none",
                }} />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, letterSpacing: "0.12em", color: "#64748B", textTransform: "uppercase" }}>
            <span>Laying the foundation</span>
            <span style={{ color: "#c0671e", fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function LoadingScreen({ onComplete, progress: externalProg }: LoadingScreenProps) {
  const [progress, setProgress]   = useState(0);
  const [phase, setPhase]         = useState<"loading" | "exit">("loading");
  const [placedCount, setPlaced]  = useState(0);
  const [mounted, setMounted]     = useState(false);

  // Grid dimensions — computed client-side only
  const [grid, setGrid] = useState({ cols: 0, rows: 0, tileSize: 0 });

  // Only run on client to avoid SSR/hydration mismatch
  useEffect(() => {
    setMounted(true);
    const TILE = 52; // px per tile
    const cols = Math.ceil(window.innerWidth  / TILE) + 1;
    const rows = Math.ceil(window.innerHeight / TILE) + 1;
    setGrid({ cols, rows, tileSize: TILE });
  }, []);

  // Build tile order — random snake-ish placement across screen
  const tiles = useMemo<TileData[]>(() => {
    if (!grid.cols || !grid.rows) return [];
    const all: TileData[] = [];
    const total = grid.cols * grid.rows;
    // Spiral-ish from center outward for nice reveal
    const cx = Math.floor(grid.cols / 2);
    const cy = Math.floor(grid.rows / 2);

    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const dx = col - cx;
        const dy = row - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const jitter = Math.random() * 4 - 2;
        const paletteIdx = Math.floor(Math.random() * PALETTE.length);
        const rotations = [0, 90, 180, 270];
        all.push({
          id: row * grid.cols + col,
          col,
          row,
          style: pickStyle(col, row),
          fill: PALETTE[paletteIdx].fill,
          accent: PALETTE[paletteIdx].accent,
          rotate: rotations[Math.floor(Math.random() * 4)],
          delay: (dist + jitter) * 40, // ms — closer to center = earlier
        });
      }
    }
    return all;
  }, [grid.cols, grid.rows]);

  // Simulate progress
  useEffect(() => {
    if (externalProg !== undefined) return;
    let p = 0;
    const sim = () => {
      const inc = p < 25 ? 0.9 : p < 60 ? 0.35 : p < 85 ? 0.18 : p < 95 ? 0.08 : 0.55;
      p = Math.min(100, p + inc);
      setProgress(p);
      if (p < 100) setTimeout(sim, 28);
    };
    sim();
  }, []);

  useEffect(() => {
    if (externalProg !== undefined) setProgress(externalProg);
  }, [externalProg]);

  // Drive tile placement count via rAF — tiles appear as progress grows
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!tiles.length) return;
    const drive = () => {
      // How many tiles should be placed given current progress?
      const target = Math.floor((progress / 100) * tiles.length);
      setPlaced(target);
      rafRef.current = requestAnimationFrame(drive);
    };
    rafRef.current = requestAnimationFrame(drive);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress, tiles.length]);

  // Trigger exit
  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      // Small pause so last tiles settle, then exit
      setTimeout(() => {
        setPhase("exit");
        setTimeout(() => onComplete?.(), 900);
      }, 600);
    }
  }, [progress, phase, onComplete]);

  // Sort tiles by delay for ordered placement
  const sortedTiles = useMemo(
    () => [...tiles].sort((a, b) => a.delay - b.delay),
    [tiles]
  );

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#080d18",
        overflow: "hidden",
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "scale(1.04)" : "scale(1)",
        transition: phase === "exit" ? "opacity 0.9s ease, transform 0.9s ease" : "none",
      }}
    >
      {/* Tile grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${grid.cols}, ${grid.tileSize}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${grid.tileSize}px)`,
        }}
      >
        {sortedTiles.map((tile, i) => {
          const placed = i < placedCount;
          return (
            <div
              key={tile.id}
              style={{
                gridColumn: tile.col + 1,
                gridRow: tile.row + 1,
                width: grid.tileSize,
                height: grid.tileSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tile
                style={tile.style}
                fill={tile.fill}
                accent={tile.accent}
                rotate={tile.rotate}
                size={grid.tileSize}
                opacity={placed ? 1 : 0}
                placed={placed}
              />
            </div>
          );
        })}
      </div>

      {/* Subtle scanline texture over tiles */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
        pointerEvents: "none",
        zIndex: 5,
      }} />

      {/* Center logo / progress — appears once enough tiles are laid */}
      <CenterLogo progress={progress} phase={phase} />
    </div>
  );
}