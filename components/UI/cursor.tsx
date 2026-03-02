"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

// ── Brand ────────────────────────────────────────────────────────────────────
const BRAND       = "rgba(192,103,30,";
const BRAND_SOLID = "#c0671e";

// ── Canvas ripple engine ─────────────────────────────────────────────────────
type RippleType = "tap" | "scroll" | "longpress";

function animateRipple(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  type: RippleType,
  onDone: () => void
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) { onDone(); return; }

  const dpr = window.devicePixelRatio || 1;
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.scale(dpr, dpr);

  const cfg = {
    tap:       { maxR: 68,  dur: 500, rings: [{d:0,rm:1,a:0.55,w:1.5},{d:55,rm:0.62,a:0.28,w:1},{d:110,rm:0.32,a:0.15,w:0.8}], dot:true  },
    scroll:    { maxR: 24,  dur: 340, rings: [{d:0,rm:1,a:0.3,w:1.2},{d:40,rm:0.5,a:0.12,w:0.7}],                                dot:false },
    longpress: { maxR: 110, dur: 850, rings: [{d:0,rm:1,a:0.6,w:2},{d:90,rm:0.72,a:0.32,w:1.2},{d:180,rm:0.42,a:0.18,w:1}],    dot:true  },
  }[type];

  const start = performance.now();

  const draw = (now: number) => {
    const elapsed = now - start;
    if (elapsed > cfg.dur) { ctx.clearRect(0, 0, W, H); onDone(); return; }

    ctx.clearRect(0, 0, W, H);
    const p = elapsed / cfg.dur;

    for (const ring of cfg.rings) {
      const rs = ring.d / cfg.dur;
      if (p < rs) continue;
      const rp  = Math.min(1, (p - rs) / (1 - rs));
      const eas = 1 - Math.pow(1 - rp, 4);
      const r   = Math.max(0, cfg.maxR * ring.rm * eas);
      const a   = ring.a * (1 - rp);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `${BRAND}${a})`;
      ctx.lineWidth   = ring.w;
      ctx.stroke();
    }

    if (cfg.dot) {
      const dp  = Math.min(1, p * 4);
      const dF  = p > 0.3 ? 1 - (p - 0.3) / 0.7 : 1;
      const dR  = 4.5 * (1 - Math.pow(1 - dp, 3));
      const dA  = 0.88 * dF;
      ctx.beginPath();
      ctx.arc(x, y, dR, 0, Math.PI * 2);
      ctx.fillStyle = `${BRAND}${dA})`;
      ctx.fill();

      const g = ctx.createRadialGradient(x, y, 0, x, y, 20);
      g.addColorStop(0, `${BRAND}${0.2 * dF})`);
      g.addColorStop(1, `${BRAND}0)`);
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
}

// ── Long-press ring (grows while held) ───────────────────────────────────────
function animateLongPressCharge(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  onDone: () => void
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) { onDone(); return () => {}; }

  const dpr = window.devicePixelRatio || 1;
  const W = window.innerWidth, H = window.innerHeight;
  canvas.width  = W * dpr; canvas.height = H * dpr;
  canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
  ctx.scale(dpr, dpr);

  const HOLD_MS = 480; // how long to fill the arc
  const start   = performance.now();
  let   raf     = 0;
  let   alive   = true;

  const draw = (now: number) => {
    if (!alive) { ctx.clearRect(0, 0, W, H); return; }
    const p = Math.min(1, (now - start) / HOLD_MS);

    ctx.clearRect(0, 0, W, H);

    // Background dim circle
    const gBg = ctx.createRadialGradient(x, y, 0, x, y, 36);
    gBg.addColorStop(0, `${BRAND}${0.08 * p})`);
    gBg.addColorStop(1, `${BRAND}0)`);
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2);
    ctx.fillStyle = gBg;
    ctx.fill();

    // Progress arc — clockwise from top
    ctx.beginPath();
    ctx.arc(x, y, 22, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
    ctx.strokeStyle = `${BRAND}${0.7 * p})`;
    ctx.lineWidth   = 2;
    ctx.lineCap     = "round";
    ctx.stroke();

    // Track arc (faint)
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.strokeStyle = `${BRAND}0.12)`;
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(x, y, 3.5 + p * 2, 0, Math.PI * 2);
    ctx.fillStyle = `${BRAND}${0.5 + p * 0.4})`;
    ctx.fill();

    if (p < 1) {
      raf = requestAnimationFrame(draw);
    } else {
      // Held! Fire big bloom
      ctx.clearRect(0, 0, W, H);
      onDone();
    }
  };

  raf = requestAnimationFrame(draw);
  return () => { alive = false; cancelAnimationFrame(raf); ctx.clearRect(0, 0, W, H); };
}

// ── Canvas pool ──────────────────────────────────────────────────────────────
function useCanvasPool(container: React.RefObject<HTMLDivElement | null>) {
  const pool   = useRef<HTMLCanvasElement[]>([]);
  const active = useRef<Set<HTMLCanvasElement>>(new Set());

  const acquire = useCallback((): HTMLCanvasElement | null => {
    if (!container.current) return null;
    for (const c of pool.current) {
      if (!active.current.has(c)) {
        active.current.add(c);
        return c;
      }
    }
    const c = document.createElement("canvas");
    c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9990;mix-blend-mode:screen;";
    container.current.appendChild(c);
    pool.current.push(c);
    active.current.add(c);
    return c;
  }, [container]);

  const release = useCallback((c: HTMLCanvasElement) => {
    active.current.delete(c);
    const ctx = c.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, c.width, c.height);
  }, []);

  return { acquire, release };
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Cursor() {
  // ── Shared state ──
  const [isDark, setIsDark]         = useState(false);
  const [isTouchDevice, setIsTouch] = useState(true); // assume touch until mouse fires

  // ── Mouse-cursor state ──
  const [pos,      setPos]      = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible,  setVisible]  = useState(false);

  // ── Touch canvas layer ──
  const containerRef = useRef<HTMLDivElement>(null);
  const { acquire, release } = useCanvasPool(containerRef);

  const clickTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollThrottle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longCancelRef  = useRef<(() => void) | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouch      = useRef({ x: 0, y: 0 });
  const touchMovedRef  = useRef(false);

  // ── Dark mode ──
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // ── Mouse events ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.movementX !== 0 || e.movementY !== 0) setIsTouch(false);

      const mx = e.clientX, my = e.clientY;
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "button,a,[role='button'],[data-cursor]"
      );

      if (el) {
        const r  = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top  + r.height / 2;
        setPos({ x: cx + (mx - cx) * 0.25, y: cy + (my - cy) * 0.25 });
        setHovering(true);
      } else {
        setPos({ x: mx, y: my });
        setHovering(false);
      }
      setVisible(true);
    };

    const onDown = () => {
      setClicking(true);
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => setClicking(false), 380);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  // ── Touch events ──
  useEffect(() => {
    const fire = (x: number, y: number, type: RippleType) => {
      const c = acquire();
      if (c) animateRipple(c, x, y, type, () => release(c));
    };

    const cancelLong = () => {
      if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
      if (longCancelRef.current)  { longCancelRef.current(); longCancelRef.current = null; }
    };

    const onTouchStart = (e: TouchEvent) => {
      setIsTouch(true);
      const t = e.touches[0];
      lastTouch.current   = { x: t.clientX, y: t.clientY };
      touchMovedRef.current = false;

      // Immediate tap ripple
      fire(t.clientX, t.clientY, "tap");

      // Begin long-press charge animation
      const chargeCanvas = acquire();
      if (chargeCanvas) {
        longCancelRef.current = animateLongPressCharge(
          chargeCanvas,
          t.clientX, t.clientY,
          () => {
            release(chargeCanvas);
            longCancelRef.current = null;
            // Big bloom on release
            fire(t.clientX, t.clientY, "longpress");
          }
        );
      }

      // Fallback: if charge completes (onDone fires), cancel timer
      longPressTimer.current = setTimeout(() => {
        cancelLong();
        fire(lastTouch.current.x, lastTouch.current.y, "longpress");
      }, 520);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      lastTouch.current    = { x: t.clientX, y: t.clientY };
      touchMovedRef.current = true;

      // Cancel long press if finger moves
      cancelLong();

      // Throttled scroll trail
      if (scrollThrottle.current) return;
      scrollThrottle.current = setTimeout(() => { scrollThrottle.current = null; }, 16);
      fire(t.clientX, t.clientY, "scroll");
    };

    const onTouchEnd = () => {
      cancelLong();
    };

    window.addEventListener("touchstart",  onTouchStart,  { passive: true });
    window.addEventListener("touchmove",   onTouchMove,   { passive: true });
    window.addEventListener("touchend",    onTouchEnd,    { passive: true });
    window.addEventListener("touchcancel", onTouchEnd,    { passive: true });

    return () => {
      window.removeEventListener("touchstart",  onTouchStart);
      window.removeEventListener("touchmove",   onTouchMove);
      window.removeEventListener("touchend",    onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      cancelLong();
      if (scrollThrottle.current) clearTimeout(scrollThrottle.current);
    };
  }, [acquire, release]);

  // ── Mouse cursor colors ──
  const dot    = isDark ? "rgba(255,255,255,0.92)" : "rgba(15,23,42,0.88)";
  const ring   = isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.35)";
  const ringHv = BRAND_SOLID;
  const bgHv   = isDark ? "rgba(192,103,30,0.18)"  : "rgba(192,103,30,0.1)";

  return (
    <>
      {/* Hide native cursor on non-touch only */}
      {!isTouchDevice && (
        <style>{`* { cursor: none !important; }`}</style>
      )}

      {/* ── Touch canvas container ── */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990 }}
      />

      {/* ── Mouse cursor (hidden on touch) ── */}
      {!isTouchDevice && (
        <>
          {/* Click ripple */}
          <AnimatePresence>
            {clicking && (
              <motion.div
                key="ripple"
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: 4.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  left: pos.x - 8, top: pos.y - 8,
                  width: 16, height: 16,
                  borderRadius: "50%",
                  border: `1.5px solid rgba(192,103,30,${isDark ? 0.5 : 0.4})`,
                  pointerEvents: "none",
                  zIndex: 9998,
                }}
              />
            )}
          </AnimatePresence>

          {/* Cursor body */}
          <motion.div
            animate={{
              x: pos.x - 12,
              y: pos.y - 12,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              x: { type: "spring", stiffness: 520, damping: 36, mass: 0.5 },
              y: { type: "spring", stiffness: 520, damping: 36, mass: 0.5 },
              opacity: { duration: 0.15 },
            }}
            style={{
              position: "fixed", top: 0, left: 0,
              pointerEvents: "none", zIndex: 9999,
              willChange: "transform",
            }}
          >
            <motion.div
              animate={{
                scale:           hovering ? 1.9 : clicking ? 0.78 : 1,
                backgroundColor: hovering ? bgHv : "transparent",
                borderColor:     hovering ? ringHv : ring,
              }}
              transition={{ scale: { type: "spring", stiffness: 400, damping: 28 }, backgroundColor: { duration: 0.18 }, borderColor: { duration: 0.18 } }}
              style={{
                width: 24, height: 24, borderRadius: "50%",
                border: `1.5px solid ${ring}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <motion.div
                animate={{
                  scale:           hovering ? 0 : clicking ? 2.2 : 1,
                  opacity:         hovering ? 0 : 1,
                  backgroundColor: clicking ? BRAND_SOLID : dot,
                }}
                transition={{ scale: { type: "spring", stiffness: 500, damping: 30 }, opacity: { duration: 0.12 }, backgroundColor: { duration: 0.1 } }}
                style={{ width: 5, height: 5, borderRadius: "50%", background: dot }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
}