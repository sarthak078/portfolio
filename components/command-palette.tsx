"use client"

import { useEffect, useState } from "react"
import { Command } from "cmdk"
import * as Dialog from "@radix-ui/react-dialog"
import { useTheme } from "next-themes"
import { ArrowRight, Copy, FileText, FolderGit2, Github, Hash, Linkedin, Mail, Moon, Search, Sun } from "lucide-react"
import { useSiteData } from "@/components/site-data-provider"
import { profile, sections, scrollToSection } from "@/lib/profile"

export function openProject(id: number) {
  window.dispatchEvent(new CustomEvent("open-project", { detail: id }))
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { data } = useSiteData()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Autofill and some IMEs dispatch keydown events without a `key`
      if (e.key?.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-command-palette", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-command-palette", onOpen)
    }
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    // Let the dialog close (and restore scroll) before acting
    setTimeout(action, 60)
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      overlayClassName="fixed inset-0 z-[90] bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0"
      contentClassName="fixed left-1/2 top-[18vh] z-[100] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
    >
      <Dialog.Title className="sr-only">Command palette</Dialog.Title>
      <Dialog.Description className="sr-only">Search sections, projects and links</Dialog.Description>
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Command.Input
          placeholder="Type a command or search…"
          className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          ESC
        </kbd>
      </div>
      <Command.List className="max-h-[50vh] overflow-y-auto p-2">
        <Command.Empty className="py-10 text-center font-mono text-sm text-muted-foreground">
          no results found.
        </Command.Empty>

        <Command.Group heading="Navigate">
          {sections.map((s) => (
            <Command.Item key={s.id} value={`go ${s.label}`} onSelect={() => run(() => scrollToSection(s.id))}>
              <Hash className="h-4 w-4 opacity-60" />
              {s.label}
              <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-40" />
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects">
          {data.projects.map((p) => (
            <Command.Item
              key={p.id}
              value={`project ${p.title} ${p.category} ${p.technologies.join(" ")}`}
              onSelect={() => run(() => openProject(p.id))}
            >
              <FolderGit2 className="h-4 w-4 opacity-60" />
              <span className="truncate">{p.title}</span>
              <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {p.category.split(" ")[0]}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Connect">
          <Command.Item value="copy email" onSelect={() => run(() => navigator.clipboard?.writeText(profile.email))}>
            <Copy className="h-4 w-4 opacity-60" />
            Copy email address
          </Command.Item>
          <Command.Item value="send email" onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}>
            <Mail className="h-4 w-4 opacity-60" />
            Send an email
          </Command.Item>
          <Command.Item value="github" onSelect={() => run(() => window.open(profile.github, "_blank"))}>
            <Github className="h-4 w-4 opacity-60" />
            GitHub
          </Command.Item>
          <Command.Item value="linkedin" onSelect={() => run(() => window.open(profile.linkedin, "_blank"))}>
            <Linkedin className="h-4 w-4 opacity-60" />
            LinkedIn
          </Command.Item>
          {data.resumeUrl ? (
            <Command.Item value="resume cv" onSelect={() => run(() => window.open(data.resumeUrl, "_blank"))}>
              <FileText className="h-4 w-4 opacity-60" />
              View résumé
            </Command.Item>
          ) : null}
        </Command.Group>

        <Command.Group heading="Preferences">
          <Command.Item
            value="toggle theme dark light"
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4 opacity-60" /> : <Moon className="h-4 w-4 opacity-60" />}
            Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode
          </Command.Item>
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
        <span>↑↓ navigate · ↵ select</span>
        <span>~/{profile.handle}</span>
      </div>
    </Command.Dialog>
  )
}
