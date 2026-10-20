import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth"
import { getSiteData, saveSiteData } from "@/lib/site-store"
import type { SiteData } from "@/lib/types"

export async function GET() {
  const data = await getSiteData()
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as SiteData
    if (!body.resumeUrl || !Array.isArray(body.projects) || !Array.isArray(body.categories)) {
      return NextResponse.json({ error: "Invalid site data" }, { status: 400 })
    }

    await saveSiteData(body)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save site data:", error)
    return NextResponse.json({ error: "Failed to save site data" }, { status: 500 })
  }
}
