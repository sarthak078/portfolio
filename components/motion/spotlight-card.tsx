"use client"

import { useRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/** Surface whose border and fill glow under the cursor (styles live in `.spotlight` in globals.css). */
export function SpotlightCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn("spotlight rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm", className)}
      {...props}
    >
      {children}
    </div>
  )
}
