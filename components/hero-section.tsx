"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Command } from "lucide-react"
import { useSiteData } from "@/components/site-data-provider"
import { NeuralCanvas } from "@/components/motion/neural-canvas"
import { ScrambleText } from "@/components/motion/scramble-text"
import { CountUp } from "@/components/motion/count-up"
import { profile, scrollToSection } from "@/lib/profile"
import { easeOut } from "@/lib/motion"

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: easeOut },
})

function RoleTicker() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = profile.roles[index]
    const done = !deleting && text === word
    const cleared = deleting && text === ""

    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true)
        if (cleared) {
          setDeleting(false)
          setIndex((i) => (i + 1) % profile.roles.length)
          return
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      },
      done ? 1800 : deleting ? 35 : 70,
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  return (
    <span className="text-primary">
      {text}
      <span className="caret" aria-hidden />
    </span>
  )
}

const terminalLines: { kind: "cmd" | "out" | "ok"; text: string }[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "sarthak · ai/ml engineer · llms + agents + cloud" },
  { kind: "cmd", text: "cat focus.json" },
  { kind: "out", text: '{ "genai": ["Bedrock", "LangChain", "CrewAI", "RAG"],' },
  { kind: "out", text: '  "ml": ["PyTorch", "TensorFlow", "Scikit-learn"],' },
  { kind: "out", text: '  "cloud": ["AWS", "Terraform", "Kubernetes"] }' },
  { kind: "cmd", text: "./status --now" },
  { kind: "ok", text: "AI Intern @ Shane Smith Law" },
  { kind: "ok", text: "Graduate RA, LLM pipelines @ Fordham EDM Lab" },
  { kind: "ok", text: "M.S. Data Science @ Fordham · GPA 3.8" },
]

function Terminal() {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(terminalLines.length)
      return
    }
    if (shown >= terminalLines.length) return
    const next = terminalLines[shown]
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 900 : next.kind === "cmd" ? 550 : 160)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card/70 shadow-2xl shadow-primary/10 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">sarthak@nyc: ~/portfolio</span>
      </div>
      <div className="min-h-[300px] space-y-1.5 p-5 font-mono text-[13px] leading-relaxed">
        {terminalLines.slice(0, shown).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="whitespace-pre-wrap break-words"
          >
            {line.kind === "cmd" && (
              <>
                <span className="text-accent">➜</span> <span className="text-primary">~</span>{" "}
                <span className="text-foreground">{line.text}</span>
              </>
            )}
            {line.kind === "out" && <span className="text-muted-foreground">{line.text}</span>}
            {line.kind === "ok" && (
              <>
                <span className="text-accent">✓</span> <span className="text-foreground/90">{line.text}</span>
              </>
            )}
          </motion.div>
        ))}
        <div>
          <span className="text-accent">➜</span> <span className="text-primary">~</span> <span className="caret" aria-hidden />
        </div>
      </div>
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    </div>
  )
}

export function HeroSection() {
  const { data } = useSiteData()
  const resumeUrl = data?.resumeUrl

  const stats = [
    { value: data.projects.length, suffix: "+", label: "projects shipped" },
    { value: 2.5, decimals: 1, suffix: "+ yrs", label: "production cloud" },
    { value: 100, suffix: "%", label: "uptime for Nokia" },
    { value: 3, label: "peer-reviewed papers" },
  ]

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <NeuralCanvas className="absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-secondary/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-8">
        <div>
          <motion.div
            {...rise(0)}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 font-mono text-xs text-foreground/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            available for opportunities · {profile.location}
          </motion.div>

          <motion.p {...rise(0.1)} className="mb-4 font-mono text-sm text-muted-foreground">
            <span className="text-primary">&gt;</span> hello world, i&apos;m
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mb-6 text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl"
          >
            <ScrambleText text="Sarthak" delay={300} replayOnHover className="block" />
            <ScrambleText text="Pokhrel." delay={600} replayOnHover className="text-gradient block" />
          </motion.h1>

          <motion.p {...rise(0.3)} className="mb-6 font-mono text-lg text-foreground/90 md:text-xl">
            I build <RoleTicker />
          </motion.p>

          <motion.p {...rise(0.4)} className="mb-10 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            AI/ML engineer building <span className="text-foreground">LLM pipelines, multi-agent systems and RAG
            applications</span>, and deploying them on cloud infrastructure that scales. Backed by 2.5 years in production
            DevOps and 3 peer-reviewed publications.
          </motion.p>

          <motion.div {...rise(0.5)} className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-[0_0_40px_-8px_var(--primary)] transition-all hover:shadow-[0_0_60px_-6px_var(--primary)]"
            >
              Explore projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-card/50 px-6 font-medium backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
              >
                Résumé
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : null}
            <button
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              className="hidden items-center gap-2 px-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              or press
              <kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: easeOut }}
          className="relative hidden [perspective:1200px] md:block"
        >
          <div className="absolute -inset-6 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 blur-2xl" />
          <Terminal />
        </motion.div>
      </div>

      <motion.div
        {...rise(0.7)}
        className="mx-auto mt-16 grid w-full max-w-7xl grid-cols-2 border-y border-border/60 md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-4 py-6 sm:px-6 lg:px-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-border/60`}
          >
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">
              <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
