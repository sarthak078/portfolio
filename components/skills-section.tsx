"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Cloud, Code2, Database, ShieldCheck, Sparkles } from "lucide-react"
import { SectionHeading } from "@/components/motion/section-heading"
import { fadeInUp } from "@/lib/motion"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    id: "genai",
    file: "genai.py",
    title: "Generative AI & MLOps",
    icon: Sparkles,
    skills: [
      { name: "Amazon Bedrock", description: "Foundation models, Nova Vision and serverless GenAI apps on AWS" },
      { name: "LangChain", description: "Chains, tools and retrieval for LLM applications" },
      { name: "CrewAI", description: "Role-based multi-agent systems for end-to-end automation" },
      { name: "AutoGen", description: "Conversational orchestration of collaborating agents" },
      { name: "RAG Pipelines", description: "Grounding LLM output in retrieved, current sources" },
      { name: "Vector Databases", description: "Embedding storage and semantic search (e.g. Pinecone)" },
      { name: "Prompt Engineering", description: "Template design with automated evaluation of output quality" },
      { name: "Fine-tuning", description: "Adapting pretrained models to domain-specific tasks" },
    ],
  },
  {
    id: "ml",
    file: "models.ipynb",
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "PyTorch", description: "Custom architectures such as CNNs on log-mel spectrograms" },
      { name: "TensorFlow / Keras", description: "Building, training and deploying deep learning models" },
      { name: "Scikit-learn", description: "Classical ML algorithms, pipelines and model evaluation" },
      { name: "CNNs", description: "Image and audio classification for medical and speech data" },
      { name: "NLP", description: "Text classification, summarization and sentiment analysis" },
      { name: "Hugging Face", description: "Transformer models for summarization, detection and sentiment" },
    ],
  },
  {
    id: "data",
    file: "pipeline.sql",
    title: "Data, Big Data & Databases",
    icon: Database,
    skills: [
      { name: "Apache Spark (PySpark)", description: "Distributed processing of large-scale datasets" },
      { name: "Hadoop (HDFS)", description: "Distributed storage for big data workloads" },
      { name: "Pandas / NumPy", description: "Data wrangling, feature engineering and analysis" },
      { name: "PostgreSQL", description: "Relational modeling, query tuning and indexing" },
      { name: "MongoDB", description: "Document data modeling for flexible schemas" },
      { name: "DynamoDB", description: "Serverless key-value storage for AWS applications" },
      { name: "Supabase", description: "Postgres backend with auth and real-time subscriptions" },
      { name: "Matplotlib / Plotly / Tableau", description: "Static, interactive and BI visualizations" },
    ],
  },
  {
    id: "cloud",
    file: "infra.tf",
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "AWS", description: "Lambda, EKS, EC2, S3, API Gateway, SageMaker, CloudWatch, IAM, VPC" },
      { name: "Microsoft Azure", description: "AKS and Azure DevOps across multi-cloud environments" },
      { name: "Terraform", description: "Infrastructure as Code: provisioning cut from hours to minutes" },
      { name: "Kubernetes", description: "EKS/AKS orchestration for production microservices" },
      { name: "Docker", description: "Containerization for environment parity across stages" },
    ],
  },
  {
    id: "devops",
    file: "ci.yaml",
    title: "DevOps, Observability & Security",
    icon: ShieldCheck,
    skills: [
      { name: "Jenkins", description: "Multi-team CI/CD pipelines for build, test and deploy" },
      { name: "GitHub Actions", description: "Automated workflows and CI/CD from the repository" },
      { name: "Grafana / Prometheus", description: "Metrics, dashboards and alerting" },
      { name: "Splunk", description: "Centralized logging, SIEM and incident investigation" },
      { name: "Cloud Security", description: "IAM least privilege, VPC design and compliance audits" },
      { name: "Jira / Git", description: "Agile delivery and version control" },
    ],
  },
  {
    id: "languages",
    file: "languages.sh",
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", description: "Primary language for ML, data and automation" },
      { name: "SQL", description: "Complex queries, optimization and schema design" },
      { name: "TypeScript / JavaScript", description: "Next.js and React front ends" },
      { name: "Bash", description: "Automation and system scripting" },
      { name: "YAML", description: "Pipelines, configuration and infrastructure definitions" },
      { name: "R", description: "Statistical modeling and visualization" },
    ],
  },
]

const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => s.name))
const half = Math.ceil(allSkills.length / 2)

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group/marquee mask-fade-x flex overflow-hidden">
      <div
        className={cn("flex w-max shrink-0 gap-3 pr-3", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ ["--duration" as string]: "50s" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-lg border border-border bg-card/50 px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const [activeId, setActiveId] = useState(skillCategories[0].id)
  const active = skillCategories.find((cat) => cat.id === activeId) ?? skillCategories[0]

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          label="tech stack"
          title="The tools behind"
          highlight="the work."
          description="Across the full pipeline: data wrangling, modelling, agent orchestration, and the infrastructure, observability and security it all runs on."
        />
      </div>

      <div className="mb-14 space-y-3">
        <Marquee items={allSkills.slice(0, half)} />
        <Marquee items={allSkills.slice(half)} reverse />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="overflow-hidden rounded-xl border border-border bg-card/60 shadow-2xl shadow-black/5 backdrop-blur-sm dark:shadow-black/30"
        >
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/stack/{active.file}</span>
          </div>

          <div className="flex overflow-x-auto border-b border-border" role="tablist">
            {skillCategories.map((cat) => {
              const Icon = cat.icon
              const isActive = cat.id === activeId
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 border-r border-border px-4 py-3 font-mono text-xs transition-colors",
                    isActive ? "bg-card text-foreground" : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", isActive && "text-primary")} />
                  {cat.file}
                  {isActive && (
                    <motion.span layoutId="skill-tab" className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_280px]">
            <div className="min-h-[420px] py-4 font-mono text-[13px] leading-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CodeLine n={1}>
                    <span className="text-muted-foreground"># {active.title}</span>
                  </CodeLine>
                  <CodeLine n={2}>
                    <span className="text-secondary">stack</span> <span className="text-muted-foreground">=</span> {"{"}
                  </CodeLine>
                  {active.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <CodeLine n={i + 3} hover>
                        <span className="pl-6 text-primary">&quot;{skill.name}&quot;</span>
                        <span className="text-muted-foreground">: </span>
                        <span className="text-foreground/70">&quot;{skill.description}&quot;</span>
                        <span className="text-muted-foreground">,</span>
                      </CodeLine>
                    </motion.div>
                  ))}
                  <CodeLine n={active.skills.length + 3}>{"}"}</CodeLine>
                  <CodeLine n={active.skills.length + 4}>
                    <span className="caret" aria-hidden />
                  </CodeLine>
                </motion.div>
              </AnimatePresence>
            </div>

            <aside className="hidden border-l border-border p-6 lg:block">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">// explorer</div>
              <ul className="space-y-1">
                {skillCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveId(cat.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        cat.id === activeId ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="truncate">{cat.title}</span>
                      <span className="ml-2 font-mono text-xs opacity-60">{cat.skills.length}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-lg border border-border bg-muted/40 p-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">total tools</div>
                <div className="mt-1 text-3xl font-semibold text-gradient">{allSkills.length}</div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CodeLine({ n, children, hover = false }: { n: number; children: React.ReactNode; hover?: boolean }) {
  return (
    <div className={cn("flex px-2", hover && "transition-colors hover:bg-primary/5")}>
      <span className="w-10 shrink-0 select-none pr-4 text-right text-muted-foreground/50">{n}</span>
      <span className="min-w-0 flex-1 break-words">{children}</span>
    </div>
  )
}
