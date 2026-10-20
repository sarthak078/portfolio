import type { Project } from "@/lib/types"

export function getProjectSummary(project: Project, maxLength = 220): string {
  const short = project.description.trim()
  if (short) return short

  const long = project.longDescription.trim()
  if (!long) return ""

  if (long.length <= maxLength) return long
  return `${long.slice(0, maxLength).trimEnd()}…`
}

export function getProjectBody(project: Project, expanded: boolean): string {
  const short = project.description.trim()
  const long = project.longDescription.trim()

  if (expanded) {
    if (long) return long
    return short
  }

  return getProjectSummary(project)
}
