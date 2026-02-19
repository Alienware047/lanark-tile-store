"use client";

import { ReactNode } from "react";

interface DropdownRevealProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export default function DropdownReveal({
  isOpen,
  children,
  className = "",
}: DropdownRevealProps) {
  return (
    <>
      <style jsx>{`
        @keyframes revealDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            visibility: hidden;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
          }
        }

        @keyframes hideUp {
          from {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
            visibility: hidden;
          }
        }

        .dropdown-reveal {
          animation: ${
            isOpen ? "revealDown" : "hideUp"
          } 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className={`dropdown-reveal ${className}`}>{children}</div>
    </>
  );
}
