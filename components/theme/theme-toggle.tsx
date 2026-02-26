"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export default function ThemeToggle() {

  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  const isSystem = theme === "system";
  const isDark = resolvedTheme === "dark";


  function cycleTheme() {

    if (theme === "light") {
      setTheme("dark");
    }

    else if (theme === "dark") {
      setTheme("system");
    }

    else {
      setTheme("light");
    }

  }


  return (

    <button
      onClick={cycleTheme}
      title={`Theme: ${theme}`}
      className="
      flex items-center justify-center
      w-10 h-10
      rounded-lg
      bg-[var(--color-card)]
      border border-[var(--color-border)]
      hover:bg-[var(--primary-light)]
      transition
      "
    >

      {isSystem ? (

        <Laptop size={18} />

      ) : isDark ? (

        <Sun size={18} />

      ) : (

        <Moon size={18} />

      )}

    </button>

  );

}