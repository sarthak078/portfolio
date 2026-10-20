"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import defaultSiteData from "@/data/site.json"
import { fetchSiteData } from "@/lib/site-client"
import type { SiteData } from "@/lib/types"

type SiteDataContextValue = {
  data: SiteData
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData as SiteData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const site = await fetchSiteData()
      setData(site)
    } catch {
      setError("Failed to load site content")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  return (
    <SiteDataContext.Provider value={{ data, loading, error, refresh }}>{children}</SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (!context) {
    throw new Error("useSiteData must be used within SiteDataProvider")
  }
  return context
}
