"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type Node = { x: number; y: number; vx: number; vy: number; r: number }

const LINK_DISTANCE = 140
const MOUSE_RADIUS = 200

/** Drifting node graph that wires itself to the cursor. Pauses offscreen and honours reduced motion. */
export function NeuralCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dark = resolvedTheme !== "light"
    const node = dark ? "125, 230, 245" : "14, 116, 160"
    const alt = dark ? "180, 140, 255" : "120, 70, 220"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frame = 0
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(90, Math.floor((width * height) / 14000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!reduceMotion) {
          a.x += a.vx
          a.y += a.vy
          if (a.x < 0 || a.x > width) a.vx *= -1
          if (a.y < 0 || a.y > height) a.vy *= -1
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${node}, ${(1 - d / LINK_DISTANCE) * 0.22})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < MOUSE_RADIUS) {
          const strength = 1 - md / MOUSE_RADIUS
          ctx.strokeStyle = `rgba(${alt}, ${strength * 0.55})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        ctx.fillStyle = `rgba(${md < MOUSE_RADIUS ? alt : node}, ${md < MOUSE_RADIUS ? 0.95 : 0.6})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, md < MOUSE_RADIUS ? a.r + 0.8 : a.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (visible) draw()
      frame = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(canvas)

    resize()
    if (reduceMotion) {
      draw()
    } else {
      loop()
      window.addEventListener("pointermove", onMove)
      document.addEventListener("pointerleave", onLeave)
    }
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />
}
