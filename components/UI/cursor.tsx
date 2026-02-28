"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [click, setClick] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // default true = hidden until we confirm mouse
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect touch-only device — hide cursor entirely
    const checkTouch = () => {
      // If the device has never moved a mouse, keep hidden
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.matchMedia("(pointer: coarse)").addEventListener("change", checkTouch);

    // Detect dark mode from the .dark class on <html>
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const move = (e: MouseEvent) => {
      // Once we get a real mousemove, we know it's not touch-only
      setIsTouch(false);

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const target = (e.target as HTMLElement)?.closest(
        "button, a, [data-cursor]"
      ) as HTMLElement | null;

      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = mouseX - centerX;
        const distY = mouseY - centerY;

        setMagnet({
          x: centerX + distX * 0.2,
          y: centerY + distY * 0.2,
        });
        setHovering(true);
      } else {
        setMagnet({ x: mouseX, y: mouseY });
        setHovering(false);
      }
    };

    const down = () => {
      setClick(true);
      setTimeout(() => setClick(false), 300);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.matchMedia("(pointer: coarse)").removeEventListener("change", checkTouch);
      observer.disconnect();
    };
  }, []);

  // Don't render anything on touch/mobile devices
  if (isTouch) return null;

  // Theme-aware colors
  // Light mode: dark cursor on light background
  // Dark mode: light cursor on dark background
  const cursorColor     = isDark ? "rgba(255,255,255,0.9)"  : "rgba(15,23,42,0.85)";
  const borderColor     = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.4)";
  const borderHover     = isDark ? "#ffffff"                : "#0F172A";
  const bgHover         = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)";
  const rippleColor     = isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.2)";
  // On primary-colored buttons, always use white
  const accentOverride  = hovering ? (isDark ? "rgba(192,103,30,0.25)" : "rgba(192,103,30,0.15)") : undefined;

  return (
    <>
      {/* Hide the native cursor site-wide when this component is active */}
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* CLICK RIPPLE */}
      <AnimatePresence>
        {click && (
          <motion.div
            key="click-ripple"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position:        "fixed",
              left:            magnet.x - 8,
              top:             magnet.y - 8,
              width:           16,
              height:          16,
              borderRadius:    "50%",
              border:          `1px solid ${rippleColor}`,
              pointerEvents:   "none",
              zIndex:           9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* CURSOR */}
      <motion.div
        animate={{
          x: magnet.x - 12,
          y: magnet.y - 12,
        }}
        transition={{
          type:      "spring",
          stiffness: 400,
          damping:   30,
        }}
        style={{
          position:      "fixed",
          top:            0,
          left:           0,
          pointerEvents: "none",
          zIndex:         9999,
        }}
      >
        {/* OUTER RING */}
        <motion.div
          animate={{
            scale:           hovering ? 1.8 : 1,
            backgroundColor: hovering ? (accentOverride ?? bgHover) : "transparent",
            borderColor:     hovering ? borderHover : borderColor,
          }}
          transition={{ duration: 0.18 }}
          style={{
            width:          24,
            height:         24,
            borderRadius:   "50%",
            border:         `1.5px solid ${borderColor}`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            // Subtle backdrop blur so cursor is readable over any bg
            backdropFilter: "blur(1px)",
          }}
        >
          {/* INNER DOT */}
          <motion.div
            animate={{
              opacity: hovering ? 0 : 1,
              scale:   hovering ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
            style={{
              width:        6,
              height:       6,
              borderRadius: "50%",
              background:   cursorColor,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}