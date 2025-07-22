"use client";

import React from "react";
import { useDarkMode } from "@/app/hooks/useDarkMode";

export function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
