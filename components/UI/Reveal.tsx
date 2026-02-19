"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";

export type RevealType =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down"
  | "scale";

interface RevealProps {
  children: ReactNode;
  type?: RevealType;           // Animation type
  duration?: number;           // Animation duration in ms
  delay?: number;              // Delay in ms
  className?: string;          // Additional Tailwind classes
  repeat?: boolean;            // Repeat animation on scroll
}

export default function Reveal({
  children,
  type = "fade",
  duration = 600,
  delay = 0,
  className,
  repeat = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat) {
          setVisible(false);
        }
      },
      { threshold: 0.15 } // Trigger slightly before fully visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [repeat]);

  // Define base Tailwind + type-specific classes
  const base = "transition-all ease-out opacity-0";
  const typeClasses: Record<RevealType, string> = {
    fade: "opacity-100",
    "slide-left": "translate-x-0 opacity-100",
    "slide-right": "translate-x-0 opacity-100",
    "slide-up": "translate-y-0 opacity-100",
    "slide-down": "translate-y-0 opacity-100",
    scale: "scale-100 opacity-100",
  };

  const initialTransform: Record<RevealType, string> = {
    fade: "opacity-0",
    "slide-left": "-translate-x-6",
    "slide-right": "translate-x-6",
    "slide-up": "translate-y-6",
    "slide-down": "-translate-y-6",
    scale: "scale-95",
  };

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        base,
        isVisible ? typeClasses[type] : initialTransform[type]
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
