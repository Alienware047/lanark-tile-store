"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {

  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  // Prevent hydration mismatch
  if (!mounted) return null;


  const isDark = resolvedTheme === "dark";


  return (

    <button

      onClick={() => setTheme(isDark ? "light" : "dark")}

      className="
      flex items-center justify-center
      w-10 h-10
      rounded-lg
      bg-card
      border border-border
      hover:bg-secondary
      transition
      "

    >

      {isDark ? (

        <Sun size={18} />

      ) : (

        <Moon size={18} />

      )}

    </button>

  );

}
