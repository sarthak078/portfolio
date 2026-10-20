"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project, SiteData } from "@/lib/types"
import { ExternalLink, LogOut, Plus, Save, Trash2 } from "lucide-react"

const emptyProject = (): Project => ({
  id: Date.now(),
  title: "",
  description: "",
  longDescription: "",
  image: "",
  technologies: [],
  github: "",
  demo: "",
  category: "Machine Learning & Deep Learning",
})

export function AdminDashboard() {
  const router = useRouter()
  const [siteData, setSiteData] = useState<SiteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/site")
      .then((res) => res.json())
      .then((data: SiteData) => setSiteData(data))
      .catch(() => setError("Failed to load site data"))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const updateProject = (id: number, patch: Partial<Project>) => {
    if (!siteData) return
    setSiteData({
      ...siteData,
      projects: siteData.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })
  }

  const addProject = () => {
    if (!siteData) return
    setSiteData({ ...siteData, projects: [...siteData.projects, emptyProject()] })
  }

  const removeProject = (id: number) => {
    if (!siteData) return
    setSiteData({ ...siteData, projects: siteData.projects.filter((p) => p.id !== id) })
  }

  const handleSave = async () => {
    if (!siteData) return
    setSaving(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData),
      })

      if (!response.ok) {
        const body = (await response.json()) as { error?: string }
        setError(body.error ?? "Save failed")
        return
      }

      setMessage("Changes saved successfully.")
    } catch {
      setError("Could not save changes")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>
  }

  if (!siteData) {
    return <div className="min-h-screen flex items-center justify-center text-destructive">{error}</div>
  }

  const filterCategories = siteData.categories.filter((c) => c !== "All")

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold text-transparent">
              Portfolio Admin
            </h1>
            <p className="text-sm text-muted-foreground">Manage resume link and projects</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/">
                <ExternalLink className="mr-2 h-4 w-4" />
                View site
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
            <Button className="shine-button bg-primary" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save all"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {message && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>
              This URL powers the &quot;View Resume&quot; button on your homepage and navigation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label htmlFor="resumeUrl" className="text-sm font-medium">
              Resume URL
            </label>
            <Input
              id="resumeUrl"
              className="mt-2"
              value={siteData.resumeUrl}
              onChange={(e) => setSiteData({ ...siteData, resumeUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projects ({siteData.projects.length})</h2>
          <Button variant="outline" onClick={addProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add project
          </Button>
        </div>

        {siteData.projects.map((project, index) => (
          <Card key={project.id} className="border-primary/10 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <CardTitle className="text-base">Project {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={project.category}
                    onChange={(e) => updateProject(project.id, { category: e.target.value })}
                  >
                    {filterCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-sm font-medium">Short description (shown on the card)</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    rows={2}
                    placeholder="Brief summary under the project title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Long description (shown when the card is clicked)</label>
                  <Textarea
                    value={project.longDescription}
                    onChange={(e) => updateProject(project.id, { longDescription: e.target.value })}
                    rows={4}
                    placeholder="Optional extra detail"
                  />
                </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image path (optional)</label>
                  <Input
                    value={project.image}
                    onChange={(e) => updateProject(project.id, { image: e.target.value })}
                    placeholder="Leave empty for no image, e.g. /images/my-project.png"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Technologies (comma-separated)</label>
                  <Input
                    value={project.technologies.join(", ")}
                    onChange={(e) =>
                      updateProject(project.id, {
                        technologies: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub URL</label>
                  <Input
                    value={project.github}
                    onChange={(e) => updateProject(project.id, { github: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Demo URL</label>
                  <Input
                    value={project.demo}
                    onChange={(e) => updateProject(project.id, { demo: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}
