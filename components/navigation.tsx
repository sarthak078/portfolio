"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Menu, X } from "lucide-react"
import { useActiveSection } from "@/hooks/use-active-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { useHydrated } from "@/hooks/use-hydrated"
import { profile, sections, scrollToSection } from "@/lib/profile"
import { cn } from "@/lib/utils"

const openPalette = () => window.dispatchEvent(new Event("open-command-palette"))

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const hydrated = useHydrated()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
  }, [isMobileMenuOpen])

  const go = (id: string) => {
    scrollToSection(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500",
            isScrolled
              ? "glass border-border/80 shadow-lg shadow-black/5 dark:shadow-black/30"
              : "border-transparent bg-transparent",
          )}
        >
          <button onClick={() => go("home")} className="group flex items-center gap-2.5 px-1" aria-label="Back to top">
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              SP
            </span>
            <span className="hidden font-mono text-sm sm:inline">
              {profile.handle}
              <span className="text-primary">.</span>
              <span className="text-muted-foreground">pokhrel</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {sections.map((item, i) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 font-mono text-[13px] transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {hydrated && isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg border border-primary/30 bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="mr-1 text-primary/70">0{i + 1}</span>
                  {item.label.toLowerCase()}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={openPalette}
              className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />K
            </button>
            <ThemeToggle />
            <button
              className="grid h-9 w-9 place-items-center rounded-lg md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden"
          >
            <div className="bg-grid absolute inset-0 -z-10 opacity-60" />
            {sections.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                onClick={() => go(item.id)}
                className="flex items-baseline gap-4 py-3 text-left text-4xl font-semibold tracking-tight"
              >
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <span className={activeSection === item.id ? "text-gradient" : ""}>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
