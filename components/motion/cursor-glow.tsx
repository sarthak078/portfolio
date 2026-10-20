"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/** Soft light that trails the pointer on fine-pointer devices. */
export function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)
  const x = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const y = useSpring(mouseY, { stiffness: 120, damping: 22 })

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return

    setEnabled(true)
    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [mouseX, mouseY, reduceMotion])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)]"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    />
  )
}
