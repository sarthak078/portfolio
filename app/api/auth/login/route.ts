import { NextResponse } from "next/server"
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth"

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin is not configured. Set ADMIN_PASSWORD in your environment." },
      { status: 500 },
    )
  }

  const { password } = (await request.json()) as { password?: string }
  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
