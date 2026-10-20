export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
  /** e.g. "Feb 2026 – Mar 2026" */
  period?: string
  /** Built with collaborators */
  team?: boolean
}

export interface SiteData {
  resumeUrl: string
  categories: string[]
  projects: Project[]
}
