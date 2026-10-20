"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/lib/profile"

function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular-nums">{time ?? "--:--:--"}</span>
}

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const links = [
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
    { href: profile.github, label: "GitHub", icon: Github, external: true },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              all systems operational
            </span>
            <span>
              NYC <LocalTime />
            </span>
            <span>© {new Date().getFullYear()} {profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            {links.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="text-outline pointer-events-none mt-8 select-none whitespace-nowrap text-center text-[17vw] font-bold leading-[0.8] tracking-tighter"
      >
        SARTHAK
      </div>
    </footer>
  )
}
