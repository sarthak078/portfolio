"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://formspree.io/f/xrbanjda", { // <-- Replace with your Formspree endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        alert("Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            I'm always excited to explore opportunities in AI and data science, collaborate on innovative projects, or discuss the latest trends in cybersecurity, SRE, and DevOps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Whether you're a recruiter looking for fresh talent, a fellow data scientist interested in
                collaboration, or someone curious about my work, I'd love to hear from you!
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-4 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">sarthakpokhrel23@gmail.com</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Linkedin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-muted-foreground">https://www.linkedin.com/in/sarthak-pokhrel-048556206/</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <Github className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">GitHub</div>
                      <div className="text-muted-foreground">https://github.com/sarthak078/</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-chart-1/10 rounded-full">
                      <MapPin className="w-6 h-6 text-chart-1" />
                    </div>
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-muted-foreground">New York,USA</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
