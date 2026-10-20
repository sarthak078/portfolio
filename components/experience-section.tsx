"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { SectionHeading } from "@/components/motion/section-heading"
import { SpotlightCard } from "@/components/motion/spotlight-card"
import { easeOut } from "@/lib/motion"

const experiences = [
  {
    title: "AI Intern",
    company: "Shane Smith Law",
    location: "Charlotte, NC (Remote)",
    duration: "Aug 2026 – Present",
    type: "Internship",
    current: true,
    description:
      "Building AI tools for a multi-state personal injury practice, finding the manual, repetitive parts of legal work and automating them so attorneys and case managers can focus on clients.",
    technologies: ["LLMs", "Document AI", "Summarization", "Prompt Engineering", "Workflow Automation", "Python"],
    achievements: [
      "Developing LLM-powered tools that automate document review and summarization of case files and medical records",
      "Building AI-assisted workflows for client intake and case management, streamlining repetitive tasks for attorneys and case managers",
      "Collaborating with the team to design process improvements that reduce turnaround time and improve consistency across daily operations",
    ],
  },
  {
    title: "Graduate Research Assistant, AI & Automation",
    company: "Fordham University · EDM Lab",
    location: "New York, NY",
    duration: "Jan 2026 – Present",
    type: "Research",
    current: true,
    description:
      "Building LLM pipelines that turn raw lecture material into structured course content, with the testing and validation needed to trust the output.",
    technologies: ["LLMs", "Python", "Prompt Engineering", "Automated Testing", "Docker", "CI/CD"],
    achievements: [
      "Built an end-to-end LLM pipeline that ingests 100+ PDF lecture documents and auto-generates structured lessons, summaries and quiz questions, cutting manual preparation time by 80%",
      "Engineered prompt templates and evaluated output quality with automated testing frameworks, iterating on prompt design for accuracy, coherence and coverage",
      "Designed CI/CD-inspired ingestion workflows with output validation and coverage-based quality gates across document types and course domains",
      "Containerized the pipeline with Docker for environment parity and faster onboarding of new contributors",
    ],
  },
  {
    title: "Graduate Teaching Assistant, Data Mining",
    company: "Fordham University",
    location: "New York, NY",
    duration: "Aug 2026 – Present",
    type: "Teaching",
    current: true,
    description:
      "Supporting instruction in core data mining techniques (classification, clustering, association rule mining and model evaluation) for graduate students.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "Model Evaluation"],
    achievements: [
      "Guide students through hands-on Python assignments and projects covering preprocessing, feature engineering and predictive modeling on real-world datasets",
      "Hold weekly office hours and grade assignments, reinforcing core concepts through one-on-one instruction",
      "Support instructors with lecture preparation, assignment design and grading rubrics for consistent, fair evaluation",
    ],
  },
  {
    title: "Teaching Assistant, Database Management Systems",
    company: "Fordham University",
    location: "New York, NY",
    duration: "Aug 2025 – Jan 2026",
    type: "Teaching",
    description:
      "Supported instruction in relational modeling, SQL query optimization, indexing strategies and transaction management for undergraduate and graduate students.",
    technologies: ["SQL", "PostgreSQL", "MySQL", "ER Modeling", "Indexing"],
    achievements: [
      "Held weekly office hours and graded assignments for 50+ students covering SQL optimization, indexing, schema design and transactions",
      "Mentored students through semester-long projects in schema design, query tuning and data modeling, with feedback that improved project outcomes",
    ],
  },
  {
    title: "Cloud Infrastructure Specialist",
    company: "Hitachi Digital Services",
    location: "Bangalore, India (Remote)",
    duration: "Jan 2023 – Jul 2025",
    type: "Industry",
    description:
      "Two and a half years running multi-cloud production infrastructure for enterprise clients including Nokia, as release manager for systems serving millions of users.",
    technologies: [
      "AWS",
      "Azure",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Grafana",
      "Splunk",
      "Prometheus",
      "IAM",
    ],
    achievements: [
      "Served as release manager for Nokia's platform handling millions of concurrent users, sustaining 100% production uptime over 2.5 years with zero critical incidents",
      "Architected multi-cloud (AWS/Azure) environments with Terraform IaC, cutting provisioning time by over 90%, from several hours to under 10 minutes",
      "Managed Kubernetes-orchestrated microservices that provided reliable model-serving infrastructure for data-intensive workloads",
      "Designed and maintained Jenkins CI/CD pipelines across multiple teams, reducing regression cycle time by 40%",
      "Implemented centralized observability with Grafana and Splunk, enabling data-driven incident response and lower MTTR",
      "Enforced cloud security best practices across IAM policies, VPCs and security groups, passing all compliance audits with zero critical findings",
    ],
  },
]

/** Stable pseudo commit hash so each role reads like a git log entry. */
function shortHash(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7)
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          label="experience"
          title="Where I've"
          highlight="shipped."
          description="Applied AI in legal tech, LLM research at the Fordham EDM Lab, two TA roles, and 2.5 years running production cloud at Hitachi."
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-secondary/60 to-transparent md:left-[11px]" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOut }}
                className="relative pl-8 md:pl-14"
              >
                <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-primary bg-background md:h-6 md:w-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary md:h-2 md:w-2" />
                  {exp.current && <span className="animate-ping-soft absolute inset-0 rounded-full border border-primary" />}
                </span>

                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="text-chart-4">commit {shortHash(exp.title + exp.company)}</span>
                  {index === 0 && <span className="text-accent">(HEAD → main)</span>}
                  <span className="text-muted-foreground">· {exp.duration}</span>
                </div>

                <SpotlightCard className="p-6 md:p-8">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">{exp.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{exp.company}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <span className="w-fit shrink-0 rounded-md border border-secondary/40 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] text-secondary">
                      {exp.type}
                    </span>
                  </div>

                  <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">{exp.description}</p>

                  <ul className="mb-6 overflow-hidden rounded-lg border border-border bg-muted/30 font-mono text-[13px]">
                    {exp.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex gap-3 border-b border-border/60 px-4 py-2.5 leading-relaxed last:border-b-0 hover:bg-accent/5"
                      >
                        <span className="select-none text-accent">+</span>
                        <span className="text-foreground/85">{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
