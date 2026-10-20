"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react"
import { SectionHeading } from "@/components/motion/section-heading"
import { slideInLeft, slideInRight } from "@/lib/motion"
import { profile } from "@/lib/profile"
import { cn } from "@/lib/utils"

const contactLinks = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/sarthak-pokhrel", href: profile.linkedin, external: true },
  { icon: Github, label: "GitHub", value: "github.com/sarthak078", href: profile.github, external: true },
]

type Status = "idle" | "sending" | "sent" | "error"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("https://formspree.io/f/xrbanjda", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("sent")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const fieldClass =
    "w-full bg-transparent py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[500px] bg-gradient-to-t from-primary/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          label="contact"
          title="Let's build something"
          highlight="intelligent."
          description="Recruiter, collaborator or just curious about the work? I'm always excited to talk AI, data science, SRE or DevOps."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft} className="space-y-3">
            {contactLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-5 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-muted/60 transition-colors group-hover:border-primary/50 group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{link.label}</span>
                    <span className="block truncate font-medium">{link.value}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              )
            })}
            <button
              onClick={copyEmail}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "copied to clipboard" : "copy email address"}
            </button>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-xl border border-border bg-card/70 shadow-2xl shadow-black/5 backdrop-blur-sm dark:shadow-black/30"
            >
              <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">send_message.sh</span>
              </div>
              <div className="space-y-1 p-5 md:p-6">
                <label className="flex items-baseline gap-3 border-b border-border/60 focus-within:border-primary">
                  <span className="shrink-0 font-mono text-sm text-accent">$ name</span>
                  <input name="name" placeholder="Ada Lovelace" value={formData.name} onChange={handleChange} required className={fieldClass} />
                </label>
                <label className="flex items-baseline gap-3 border-b border-border/60 pt-3 focus-within:border-primary">
                  <span className="shrink-0 font-mono text-sm text-accent">$ email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="ada@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </label>
                <label className="block pt-4">
                  <span className="mb-2 block font-mono text-sm text-accent">$ message &lt;&lt;EOF</span>
                  <textarea
                    name="message"
                    placeholder="Tell me about the role, project or idea…"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={cn(fieldClass, "resize-none rounded-lg border border-border/60 bg-muted/30 px-3 focus:border-primary")}
                  />
                  <span className="mt-2 block font-mono text-sm text-accent">EOF</span>
                </label>

                <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className={cn(
                      "font-mono text-xs",
                      status === "sent" && "text-accent",
                      status === "error" && "text-destructive",
                      (status === "idle" || status === "sending") && "text-muted-foreground",
                    )}
                    aria-live="polite"
                  >
                    {status === "idle" && "> awaiting input_"}
                    {status === "sending" && "> transmitting…"}
                    {status === "sent" && "✓ message delivered. talk soon."}
                    {status === "error" && "✗ failed to send. try email instead."}
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-mono text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--primary)] transition-all hover:shadow-[0_0_50px_-6px_var(--primary)] disabled:opacity-60"
                  >
                    {status === "sending" ? "sending…" : "./send ↵"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
