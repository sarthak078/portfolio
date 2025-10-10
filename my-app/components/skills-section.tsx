"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Brain, BarChart3 } from "lucide-react"


const skillCategories = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: Code,
    color: "text-chart-1",
    skills: [
      { name: "Python", description: "Advanced proficiency with data science, ML, and automation libraries" },
      { name: "R", description: "Strong foundation in statistical modeling and visualization" },
      { name: "SQL", description: "Expertise in complex queries, optimization, and database management" },
      { name: "Bash Scripting", description: "Automating workflows and system administration tasks" },
    ],
  },
  {
    id: "ml",
    title: "Artificial Intelligenc(Gen AI & Agentic AI)  & Machine Learning",
    icon: Brain,
    color: "text-chart-2",
    skills: [
      { name: "Scikit-learn", description: "Implementation of classical ML algorithms and pipelines" },
      { name: "TensorFlow", description: "Building and deploying deep learning models" },
      { name: "PyTorch", description: "Research and experimentation with neural networks" },
      { name: "XGBoost", description: "High-performance gradient boosting for structured data" },
      { name: "Keras", description: "Rapid prototyping with a high-level deep learning API" },
      { name: "AWS Bedrock", description: "Developing and deploying foundation models on AWS" },
      { name: "Crew AI", description: "Orchestrating collaborative AI agents for tasks and workflows" },
      { name: "Auto Gen", description: "Framework for building autonomous, multi-agent AI systems" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Computing and DevOps",
    icon: Database,
    color: "text-chart-3",
    skills: [
      { name: "AWS", description: "Cloud infrastructure, storage, compute, and ML services" },
      { name: "Azure DevOps", description: "CI/CD pipelines, project tracking, and release automation" },
      { name: "Terraform", description: "Infrastructure as Code for multi-cloud environments" },
      { name: "Docker", description: "Containerization and portable application deployment" },
      { name: "Kubernetes", description: "Orchestration of containerized applications at scale" },
      { name: "Jenkins", description: "Automated CI/CD pipelines for software delivery" },
      { name: "Pantheon", description: "Cloud-based platform for web hosting and DevOps workflows" },
    ],
  },
  {
    id: "visualization",
    title: "Data Visualization",
    icon: BarChart3,
    color: "text-chart-4",
    skills: [
      { name: "Matplotlib", description: "Creating static, publication-quality charts and plots" },
      { name: "Seaborn", description: "High-level statistical visualizations built on Matplotlib" },
      { name: "Plotly", description: "Interactive dashboards and web-based data visualizations" },
      { name: "Tableau", description: "Business intelligence dashboards and reporting" },
    ],
  },
  {
    id: "sre-security",
    title: "SRE & Cybersecurity",
    icon: Code, // You can swap with Shield icon if preferred
    color: "text-chart-5",
    skills: [
      { name: "Prometheus", description: "Monitoring, alerting, and metrics collection for systems" },
      { name: "Grafana", description: "Real-time visualization of system metrics and performance" },
      { name: "ELK Stack", description: "Centralized logging, search, and analytics (Elasticsearch, Logstash, Kibana)" },
      { name: "Kubernetes Security", description: "RBAC, secrets management, and cluster hardening" },
      { name: "AWS Security", description: "IAM, KMS, and securing workloads in AWS" },
      { name: "Vulnerability Assessment", description: "Identifying and remediating security risks" },
      { name: "Incident Response", description: "Managing and mitigating security breaches and outages" },
    ],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("programming")

  const activeSkills = skillCategories.find((cat) => cat.id === activeCategory)?.skills || []

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive expertise across the data science pipeline, from data collection and processing to machine
            learning and visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Selector */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {skillCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      activeCategory === category.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {(() => {
                    const activeCategory_obj = skillCategories.find((cat) => cat.id === activeCategory)
                    const Icon = activeCategory_obj?.icon || Code
                    return (
                      <>
                        <Icon className={`w-6 h-6 ${activeCategory_obj?.color}`} />
                        {activeCategory_obj?.title}
                      </>
                    )
                  })()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-medium">
                        {skill.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
