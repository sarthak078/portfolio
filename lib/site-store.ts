import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"
import type { SiteData } from "@/lib/types"
import { getProjectImageSrc } from "@/lib/project-image"
import defaultSiteData from "@/data/site.json"

function normalizeSiteData(data: SiteData): SiteData {
  return {
    ...data,
    projects: data.projects.map((project) => ({
      ...project,
      image: getProjectImageSrc(project.image) ?? "",
    })),
  }
}

const LOCAL_PATH = path.join(process.cwd(), "data", "site.json")
const PUBLIC_PATH = path.join(process.cwd(), "public", "data", "site.json")
const BLOB_FILENAME = "portfolio-site.json"

async function readLocalSiteData(): Promise<SiteData> {
  try {
    const raw = await readFile(LOCAL_PATH, "utf-8")
    return JSON.parse(raw) as SiteData
  } catch {
    return defaultSiteData as SiteData
  }
}

async function readBlobSiteData(): Promise<SiteData | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return null

  try {
    const { list } = await import("@vercel/blob")
    const { blobs } = await list({ prefix: BLOB_FILENAME, token })
    const blob = blobs.find((b) => b.pathname === BLOB_FILENAME)
    if (!blob?.url) return null

    const response = await fetch(blob.url, { cache: "no-store" })
    if (!response.ok) return null
    return (await response.json()) as SiteData
  } catch {
    return null
  }
}

async function writeBlobSiteData(data: SiteData): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return

  const { put } = await import("@vercel/blob")
  await put(BLOB_FILENAME, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    token,
    contentType: "application/json",
  })
}

async function syncPublicCopy(data: SiteData): Promise<void> {
  await mkdir(path.dirname(PUBLIC_PATH), { recursive: true })
  await writeFile(PUBLIC_PATH, JSON.stringify(data, null, 2), "utf-8")
}

export async function getSiteData(): Promise<SiteData> {
  const fromBlob = await readBlobSiteData()
  if (fromBlob) return normalizeSiteData(fromBlob)
  return normalizeSiteData(await readLocalSiteData())
}

export async function saveSiteData(data: SiteData): Promise<void> {
  const normalized = normalizeSiteData(data)
  await mkdir(path.dirname(LOCAL_PATH), { recursive: true })
  await writeFile(LOCAL_PATH, JSON.stringify(normalized, null, 2), "utf-8")
  await syncPublicCopy(normalized)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlobSiteData(normalized)
  }
}
