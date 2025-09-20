"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, Brain, Database, TrendingUp } from "lucide-react"

export function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { icon: Brain, label: "ML Models Built", value: 15, color: "text-chart-1" },
    { icon: Database, label: "Datasets Analyzed", value: 50, color: "text-chart-2" },
    { icon: TrendingUp, label: "Accuracy Achieved", value: 94, color: "text-chart-3", suffix: "%" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const CurrentIcon = stats[currentStat].icon
  const CurrentSuffix = stats[currentStat].suffix || ""

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Transforming <span className="text-primary">AI & Data</span> into
            <br />
            <span className="text-secondary">Scalable Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Data Science professional with hands-on expertise in <span className="font-semibold">Machine Learning, 
                Generative AI, and Cloud DevOps</span>. Skilled at building intelligent systems, deploying
                data-driven applications at scale, and driving real-world impact through innovation.
              </p>
        </div>

        {/* Interactive Stats Card */}
        <Card className="max-w-md mx-auto mb-12 p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20 animate-pulse-glow">
          <div className="flex items-center justify-center space-x-4">
            <div className={`p-3 rounded-full bg-primary/10 ${stats[currentStat].color}`}>
              <CurrentIcon className="w-8 h-8" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-primary">
                {stats[currentStat].value}
                {CurrentSuffix}
              </div>
              <div className="text-sm text-muted-foreground">{stats[currentStat].label}</div>
            </div>
          </div>
        </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          onClick={scrollToProjects}
        >
          View My Projects
        </Button>

        <a 
          href="https://drive.google.com/file/d/1PtoLGtAcvIPVsPCrUo9_n2T6aNgGW4A9/view" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent"
          >
            View Resume
          </Button>
        </a>
      </div>


        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 mx-auto text-muted-foreground" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Brain className="w-10 h-10 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
          <Database className="w-8 h-8 text-secondary" />
        </div>
      </div>
    </section>
  )
}
