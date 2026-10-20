import { cookies } from "next/headers"

export const SESSION_COOKIE = "portfolio_admin_session"
const SESSION_PREFIX = "authenticated"

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error("ADMIN_PASSWORD is not configured")
  }
  return secret
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString()
  const payload = `${SESSION_PREFIX}:${issuedAt}`
  const signature = await sign(payload, getSecret())
  return `${payload}.${signature}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  try {
    const secret = process.env.ADMIN_PASSWORD
    if (!secret) return false

    const [payload, signature] = token.split(".")
    if (!payload || !signature) return false
    if (!payload.startsWith(`${SESSION_PREFIX}:`)) return false

    const expected = await sign(payload, secret)
    if (signature.length !== expected.length) return false

    let mismatch = 0
    for (let i = 0; i < signature.length; i += 1) {
      mismatch |= signature.charCodeAt(i) ^ expected.charCodeAt(i)
    }
    return mismatch === 0
  } catch {
    return false
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}
