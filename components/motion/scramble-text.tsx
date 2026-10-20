"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ"

type ScrambleTextProps = {
  text: string
  className?: string
  delay?: number
  /** Milliseconds per revealed character */
  speed?: number
  /** Re-run the effect whenever the element is hovered */
  replayOnHover?: boolean
}

/** Decodes `text` from random glyphs. Server-renders the final text so there is no layout shift. */
export function ScrambleText({ text, className, delay = 0, speed = 40, replayOnHover = false }: ScrambleTextProps) {
  const [output, setOutput] = useState(text)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (timer.current) clearInterval(timer.current)

    let revealed = 0
    timer.current = setInterval(() => {
      revealed += 0.5
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || i < revealed) return char
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(""),
      )
      if (revealed >= text.length && timer.current) {
        clearInterval(timer.current)
        setOutput(text)
      }
    }, speed / 2)
  }

  useEffect(() => {
    const start = setTimeout(run, delay)
    return () => {
      clearTimeout(start)
      if (timer.current) clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay])

  return (
    <span className={className} aria-label={text} onMouseEnter={replayOnHover ? run : undefined}>
      <span aria-hidden>{output}</span>
    </span>
  )
}
