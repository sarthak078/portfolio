"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useHydrated } from "@/hooks/use-hydrated"

export function ScrollProgress() {
  const hydrated = useHydrated()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (!hydrated) return null

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_12px_var(--primary)]"
      style={{ scaleX }}
    />
  )
}
