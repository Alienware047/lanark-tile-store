"use client";

import { useEffect, useRef, useState } from "react";

const BRAND = "#c0671e";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;
    let isHovering = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // rAF loop — dot snaps, ring lerps (the Florem signature effect)
    const tick = () => {
      rx = lerp(rx, mx, 0.092);
      ry = lerp(ry, my, 0.092);
      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.opacity  = "1";
      ring.style.opacity = "1";

      const hoverable = (e.target as HTMLElement)?.closest<HTMLElement>(
        "button,a,[role='button'],[data-cursor],input,textarea,label,select"
      );

      if (hoverable && !isHovering) {
        isHovering = true;
        // Dot disappears, ring expands + turns brand color
        dot.style.opacity = "0";
        ring.style.width            = "54px";
        ring.style.height           = "54px";
        ring.style.borderColor      = BRAND;
        ring.style.backgroundColor  = "rgba(192,103,30,0.1)";
        ring.style.mixBlendMode     = "normal";
      } else if (!hoverable && isHovering) {
        isHovering = false;
        dot.style.opacity = "1";
        ring.style.width           = "38px";
        ring.style.height          = "38px";
        ring.style.borderColor     = "rgba(255,255,255,0.65)";
        ring.style.backgroundColor = "transparent";
        ring.style.mixBlendMode    = "difference";
      }
    };

    const onDown = () => {
      ring.style.width  = isHovering ? "62px" : "22px";
      ring.style.height = isHovering ? "62px" : "22px";
      if (!isHovering) dot.style.transform += " scale(0.4)";
    };

    const onUp = () => {
      ring.style.width  = isHovering ? "54px" : "38px";
      ring.style.height = isHovering ? "54px" : "38px";
    };

    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot — snaps instantly to mouse position */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 7, height: 7,
          borderRadius: "50%",
          background: "#fff",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.18s ease",
        }}
      />

      {/* Ring — follows with smooth lerp lag */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 38, height: 38,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.65)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: "difference",
          opacity: 0,
          willChange: "transform",
          transition: [
            "width 0.38s cubic-bezier(0.16,1,0.3,1)",
            "height 0.38s cubic-bezier(0.16,1,0.3,1)",
            "border-color 0.28s ease",
            "background-color 0.28s ease",
            "opacity 0.18s ease",
          ].join(", "),
        }}
      />
    </>
  );
}