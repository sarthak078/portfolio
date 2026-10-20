"use client"

import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CommandPalette } from "@/components/command-palette"
import { SiteDataProvider } from "@/components/site-data-provider"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { CursorGlow } from "@/components/motion/cursor-glow"

export default function Home() {
  return (
    <SiteDataProvider>
      <ScrollProgress />
      <CursorGlow />
      <CommandPalette />
      <div className="noise pointer-events-none fixed inset-0 z-[60]" aria-hidden />
      <main className="relative isolate min-h-screen overflow-x-clip bg-background">
        <div className="bg-grid pointer-events-none fixed inset-0 -z-20 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
        <Navigation />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </SiteDataProvider>
  )
}
