"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false); // hidden until first interaction
  const [isDark, setIsDark] = useState(false);
  const [isTouch, setIsTouch] = useState(false); // true when last input was touch

  useEffect(() => {
    // Detect dark mode from the .dark class on <html>
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // --- MOUSE ---
    const onMouseMove = (e: MouseEvent) => {
      setIsTouch(false);
      setVisible(true);

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
        setMagnet({ x: centerX + distX * 0.2, y: centerY + distY * 0.2 });
        setHovering(true);
      } else {
        setMagnet({ x: mouseX, y: mouseY });
        setHovering(false);
      }
    };

    const onMouseDown = () => {
      setClick(true);
      setTimeout(() => setClick(false), 300);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // --- TOUCH ---
    const onTouchStart = (e: TouchEvent) => {
      setIsTouch(true);
      setVisible(true);
      setHovering(true); // expand ring on touch
      const t = e.touches[0];
      setMagnet({ x: t.clientX, y: t.clientY });
      setClick(true);
      setTimeout(() => setClick(false), 300);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      setMagnet({ x: t.clientX, y: t.clientY });
    };

    const onTouchEnd = () => {
      setHovering(false);
      // Fade out shortly after finger lifts
      setTimeout(() => setVisible(false), 400);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true, capture: true });
    window.addEventListener("touchend", onTouchEnd, { capture: true });
    window.addEventListener("touchcancel", onTouchEnd, { capture: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      window.removeEventListener("touchcancel", onTouchEnd, { capture: true });
      observer.disconnect();
    };
  }, []);

  // Theme-aware colors
  const cursorColor    = isDark ? "rgba(255,255,255,0.9)"  : "rgba(15,23,42,0.85)";
  const borderColor    = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.4)";
  const borderHover    = isDark ? "#ffffff"                : "#0F172A";
  const bgHover        = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)";
  const rippleColor    = isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.2)";
  const accentOverride = hovering ? (isDark ? "rgba(192,103,30,0.25)" : "rgba(192,103,30,0.15)") : undefined;

  return (
    <>
      {/* Hide the native cursor on all devices */}
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* CLICK / TAP RIPPLE */}
      <AnimatePresence>
        {click && (
          <motion.div
            key="click-ripple"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: isTouch ? 5 : 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isTouch ? 0.5 : 0.35, ease: "easeOut" }}
            style={{
              position:      "fixed",
              left:          magnet.x - 8,
              top:           magnet.y - 8,
              width:         16,
              height:        16,
              borderRadius:  "50%",
              border:        `1px solid ${rippleColor}`,
              pointerEvents: "none",
              zIndex:         9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* CURSOR / TOUCH INDICATOR */}
      <motion.div
        animate={{
          x:       magnet.x - 12,
          y:       magnet.y - 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          // Tighter spring on touch so it feels glued to the finger
          x:       { type: "spring", stiffness: isTouch ? 800 : 400, damping: isTouch ? 40 : 30 },
          y:       { type: "spring", stiffness: isTouch ? 800 : 400, damping: isTouch ? 40 : 30 },
          opacity: { duration: 0.2 },
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
            scale:           hovering ? (isTouch ? 2.2 : 1.8) : 1,
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