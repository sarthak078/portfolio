import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sarthak Pokhrel | AI/ML Engineer · LLMs, Agents & Cloud",
  description:
    "AI/ML engineer and Data Science graduate student building LLM pipelines, multi-agent systems and RAG applications, deployed on scalable cloud infrastructure.",
  openGraph: {
    title: "Sarthak Pokhrel | AI/ML Engineer",
    description: "LLM pipelines, multi-agent systems and cloud infrastructure, from model to production.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d14" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
