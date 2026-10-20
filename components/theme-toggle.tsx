"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useHydrated } from "@/hooks/use-hydrated"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const hydrated = useHydrated()

  const isDark = hydrated && resolvedTheme === "dark"

  return (
    <button
      className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      disabled={!hydrated}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
