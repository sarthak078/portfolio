export const profile = {
  name: "Sarthak Pokhrel",
  handle: "sarthak",
  location: "New York, USA",
  timezone: "America/New_York",
  email: "sarthakpokhrel23@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarthak-pokhrel-048556206/",
  github: "https://github.com/sarthak078/",
  roles: ["LLM pipelines", "multi-agent systems", "RAG apps", "ML models", "cloud infrastructure"],
}

export const sections = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
