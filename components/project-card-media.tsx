"use client"

import { useState } from "react"
import { Bot, Brain, Cloud, Cpu, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react"
import { getProjectImageSrc } from "@/lib/project-image"
import { cn } from "@/lib/utils"

type ProjectCardMediaProps = {
  image?: string
  title?: string
  category?: string
  technologies?: string[]
  className?: string
}

const coverStyles: Record<string, { icon: LucideIcon; from: string; to: string }> = {
  "NLP & Generative AI": { icon: Sparkles, from: "var(--secondary)", to: "var(--primary)" },
  "AI Agents & Productivity Tools": { icon: Bot, from: "var(--primary)", to: "var(--accent)" },
  "Machine Learning & Deep Learning": { icon: Brain, from: "var(--chart-5)", to: "var(--secondary)" },
  "Cloud & DevOps": { icon: Cloud, from: "var(--primary)", to: "var(--chart-4)" },
  Cybersecurity: { icon: ShieldCheck, from: "var(--accent)", to: "var(--primary)" },
}

function initials(title = "") {
  return title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("")
}

/** Generated cover for projects without a screenshot: category hue, glyph and stack. */
function GeneratedCover({ title, category = "", technologies = [] }: Omit<ProjectCardMediaProps, "image" | "className">) {
  const style = coverStyles[category] ?? { icon: Cpu, from: "var(--primary)", to: "var(--secondary)" }
  const Icon = style.icon

  return (
    <div className="relative h-full w-full overflow-hidden bg-card [container-type:size]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(110% 90% at 0% 0%, color-mix(in oklch, ${style.from} 55%, transparent), transparent 60%), radial-gradient(90% 80% at 100% 100%, color-mix(in oklch, ${style.to} 45%, transparent), transparent 65%)`,
        }}
      />
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `color-mix(in oklch, ${style.from} 60%, transparent)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="select-none text-[clamp(4rem,45cqh,14rem)] font-bold leading-none tracking-tighter text-transparent"
          style={{ WebkitTextStroke: `1.5px color-mix(in oklch, ${style.to} 85%, white)` }}
        >
          {initials(title)}
        </span>
      </div>
      <Icon className="absolute bottom-5 right-5 h-7 w-7 text-foreground/60" aria-hidden />
      <div className="absolute bottom-5 left-5 hidden space-y-0.5 font-mono text-[10px] leading-tight text-foreground/55 sm:block">
        {technologies.slice(0, 3).map((t) => (
          <div key={t}>
            <span className="text-secondary">import</span> {t.toLowerCase().replace(/[^a-z0-9]+/g, "_")}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectCardMedia({ image, title, category, technologies, className }: ProjectCardMediaProps) {
  const [failed, setFailed] = useState(false)
  const imageSrc = getProjectImageSrc(image)
  const showImage = Boolean(imageSrc) && !failed

  return (
    <div className={cn("relative w-full shrink-0 overflow-hidden bg-muted", className)}>
      {showImage ? (
        <img
          src={imageSrc!}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-85 saturate-[0.85] transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
          <GeneratedCover title={title} category={category} technologies={technologies} />
        </div>
      )}
      <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
    </div>
  )
}
