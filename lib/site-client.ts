import type { SiteData } from "@/lib/types"

export async function fetchSiteData(): Promise<SiteData> {
  try {
    const response = await fetch("/api/site/", { cache: "no-store" })
    if (response.ok) {
      return (await response.json()) as SiteData
    }
  } catch {
    // fall through to static JSON
  }

  const fallback = await fetch("/data/site.json", { cache: "no-store" })
  if (!fallback.ok) {
    throw new Error("Could not load site data")
  }
  return (await fallback.json()) as SiteData
}
