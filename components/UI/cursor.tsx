"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
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
        const strength = 0.2;

        setMagnet({
          x: centerX + distX * strength,
          y: centerY + distY * strength,
        });

        setHovering(true);
      } else {
        setMagnet({ x: mouseX, y: mouseY });
        setHovering(false);
      }
    };

    const down = () => {
      setClick(true);
      setTimeout(() => setClick(false), 300); // shorter ripple duration
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
    };
  }, []);

  return (
    <>
      {/* CLICK RIPPLE */}
      <AnimatePresence>
        {click && (
          <motion.div
            key="click-ripple"
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              left: magnet.x - 8, // center the ripple (half of w-4)
              top: magnet.y - 8,
            }}
            className="
              fixed
              w-4
              h-4
              rounded-full
              border border-white/50
              pointer-events-none
              z-[9998]
            "
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
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        {/* OUTER */}
        <motion.div
          animate={{
            scale: hovering ? 1.8 : 1,
            backgroundColor: hovering ? "rgba(255,255,255,0.2)" : "transparent",
            borderColor: hovering ? "#ffffff" : "rgba(255,255,255,0.5)",
          }}
          transition={{ duration: 0.2 }}
          className="w-6 h-6 rounded-full border flex items-center justify-center"
        >
          {/* INNER DOT */}
          <motion.div
            animate={{
              opacity: hovering ? 0 : 1,
              scale: hovering ? 0 : 1,
            }}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
