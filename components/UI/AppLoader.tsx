"use client";

import { useState } from "react";
import LoadingScreen from "@/components/UI/LoadingScreen";

/**
 * Wrap your root layout with this.
 *
 * app/layout.tsx:
 *   <AppLoader>{children}</AppLoader>
 */
export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone]    = useState(false);
  const [show, setShow]    = useState(false);

  const handleComplete = () => {
    setDone(true);
    setTimeout(() => setShow(true), 80);
  };

  return (
    <>
      {!done && <LoadingScreen onComplete={handleComplete} />}
      <div style={{ opacity: show ? 1 : 0, transition: "opacity 0.6s ease" }}>
        {children}
      </div>
    </>
  );
}