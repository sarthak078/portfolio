"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, Github, Play, X } from "lucide-react"
import { useSiteData } from "@/components/site-data-provider"
import { ProjectCardMedia } from "@/components/project-card-media"
import { getProjectSummary } from "@/lib/project-display"
import { SectionHeading } from "@/components/motion/section-heading"
import { SpotlightCard } from "@/components/motion/spotlight-card"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

const hasLink = (url: string, placeholder: string) => Boolean(url) && url !== placeholder

/** Cards shown before the rest drop into the compact archive table. */
const GRID_LIMIT = 9

function ProjectDialog({ project, number, onClose }: { project: Project | null; number: string; onClose: () => void }) {
  return (
    <Dialog.Root open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[80] max-h-[90vh] w-[min(820px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl shadow-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          {project ? (
            <>
              <div className="relative">
                <ProjectCardMedia
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  technologies={project.technologies}
                  className="h-56 md:h-72"
                />
                <Dialog.Close
                  className="glass absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-border transition-colors hover:text-primary"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>
              <div className="space-y-6 p-6 md:p-8">
                <div>
                  <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    #{number} · {project.category}
                    {project.period && <span className="text-muted-foreground"> · {project.period}</span>}
                    {project.team && <span className="text-secondary"> · team project</span>}
                  </div>
                  <Dialog.Title className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                    {project.title}
                  </Dialog.Title>
                </div>
                <Dialog.Description className="text-pretty leading-relaxed text-muted-foreground">
                  {project.longDescription || project.description}
                </Dialog.Description>

                {project.technologies.length > 0 && (
                  <div>
                    <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">// stack</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(hasLink(project.github, "https://github.com") || hasLink(project.demo, "https://demo.com")) && (
                  <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                    {hasLink(project.github, "https://github.com") && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm transition-colors hover:border-primary/60 hover:text-primary"
                      >
                        <Github className="h-4 w-4" /> Source
                      </a>
                    )}
                    {hasLink(project.demo, "https://demo.com") && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
                      >
                        <Play className="h-4 w-4" /> Live demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function ProjectsSection() {
  const { data } = useSiteData()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openId, setOpenId] = useState<number | null>(null)

  const { categories, projects } = data
  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)
  const openProject = projects.find((p) => p.id === openId) ?? null
  const gridProjects = filteredProjects.slice(0, GRID_LIMIT)
  const archiveProjects = filteredProjects.slice(GRID_LIMIT)
  const numberOf = (project: Project) => String(projects.indexOf(project) + 1).padStart(2, "0")

  useEffect(() => {
    const onOpen = (e: Event) => setOpenId((e as CustomEvent<number>).detail)
    window.addEventListener("open-project", onOpen)
    return () => window.removeEventListener("open-project", onOpen)
  }, [])

  const countFor = (category: string) =>
    category === "All" ? projects.length : projects.filter((p) => p.category === category).length

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          label="selected work"
          title="Things I've"
          highlight="built & shipped."
          description="Machine learning, generative AI agents, cloud platforms and security tooling, each one taken from dataset or idea through to something that runs."
        />

        <div className="-mx-4 mb-10 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:mx-0 sm:px-0 sm:[mask-image:none]">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {categories.map((category) => {
              const active = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "relative isolate whitespace-nowrap rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors",
                    active
                      ? "border-primary/50 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {category}
                  <span className="ml-2 opacity-50">{String(countFor(category)).padStart(2, "0")}</span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {gridProjects.map((project, i) => {
              const featured = selectedCategory === "All" && i === 0
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(featured && "md:col-span-2 lg:row-span-2")}
                >
                  <SpotlightCard
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenId(project.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenId(project.id))}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className={cn("relative", featured && "lg:min-h-[360px] lg:flex-1")}>
                      <ProjectCardMedia
                        image={project.image}
                        title={project.title}
                        category={project.category}
                        technologies={project.technologies}
                        className={featured ? "h-56 md:h-72 lg:absolute lg:inset-0 lg:h-full" : "h-48"}
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="glass rounded-md border border-border/80 px-2 py-1 font-mono text-[11px] text-primary">
                          #{numberOf(project)}
                        </span>
                        {featured && (
                          <span className="glass rounded-md border border-accent/40 px-2 py-1 font-mono text-[11px] text-accent">
                            featured
                          </span>
                        )}
                      </div>
                      <div className="glass absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-border/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    <div className={cn("flex flex-col p-6 pt-2", !featured && "flex-1")}>
                      <div className="mb-2 flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        <span>{project.category}</span>
                        {project.period && <span className="text-muted-foreground/60">· {project.period}</span>}
                        {project.team && <span className="text-secondary">· team</span>}
                      </div>
                      <h3
                        className={cn(
                          "mb-3 text-balance font-semibold tracking-tight transition-colors group-hover:text-primary",
                          featured ? "text-2xl" : "text-lg",
                        )}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={cn(
                          "mb-5 text-sm leading-relaxed text-muted-foreground",
                          featured ? "line-clamp-4 lg:line-clamp-none lg:text-base" : "line-clamp-3",
                        )}
                      >
                        {featured ? project.longDescription || getProjectSummary(project) : getProjectSummary(project)}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
                          <span key={tech} className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > (featured ? 6 : 4) && (
                          <span className="px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
                            +{project.technologies.length - (featured ? 6 : 4)}
                          </span>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {archiveProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
          >
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span>// more projects</span>
              <span className="text-primary">{String(archiveProjects.length).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              {archiveProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setOpenId(project.id)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border/60 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-primary/5 md:grid-cols-[2.5rem_1.4fr_1fr_1.2fr_auto] md:px-6"
                >
                  <span className="font-mono text-xs text-primary/70">#{numberOf(project)}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium transition-colors group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="block truncate font-mono text-[11px] text-muted-foreground md:hidden">
                      {project.category}
                    </span>
                  </span>
                  <span className="hidden truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:block">
                    {project.category}
                  </span>
                  <span className="hidden truncate font-mono text-xs text-muted-foreground md:block">
                    {project.technologies.slice(0, 3).join(" · ")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <ProjectDialog project={openProject} number={openProject ? numberOf(openProject) : ""} onClose={() => setOpenId(null)} />
    </section>
  )
}
