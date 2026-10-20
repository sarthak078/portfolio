"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type TiltCardProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className, intensity = 14 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 260,
    damping: 28,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 260,
    damping: 28,
  })

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((clientX - rect.left) / rect.width - 0.5)
    y.set((clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        className={cn("relative will-change-transform", className)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
