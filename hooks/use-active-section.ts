"use client"

import { useEffect, useState } from "react"

const sections = ["home", "projects", "skills", "experience", "about", "contact"] as const

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("home")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return activeSection
}
