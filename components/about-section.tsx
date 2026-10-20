"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, Trophy } from "lucide-react"
import { SectionHeading } from "@/components/motion/section-heading"
import { TiltCard } from "@/components/motion/tilt-card"
import { slideInLeft, slideInRight } from "@/lib/motion"
import { profile } from "@/lib/profile"

const specs = [
  { key: "education", value: "M.S. Data Science, Fordham University (GPA 3.8/4.0)" },
  { key: "undergrad", value: "B.Tech Computer Science, AI · Jain University (8.6/10)" },
  { key: "research", value: "3 peer-reviewed papers (IJCRT, JASC, ICMLBDA)" },
  { key: "focus", value: "LLMs · multi-agent systems · RAG · MLOps" },
  { key: "location", value: profile.location },
  { key: "off_duty", value: "Piano, hiking" },
]

const achievements = [
  { label: "3 peer-reviewed publications on CNN and NLP diagnostic models", icon: BookOpen },
  { label: "Centennial Scholarship, Fordham University", icon: Trophy },
  { label: "Study in India Government Scholarship, Jain University", icon: Trophy },
  { label: "SIEM & SOC Fundamentals", icon: Award },
  { label: "AWS Generative AI Developer, Professional (in progress)", icon: Award },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" label="about" title="The human" highlight="behind the models." />

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[420px_1fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <TiltCard intensity={8}>
              <div className="hud-corners relative p-3">
                <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                  <img src="/images/sarthak.png" alt={profile.name} className="aspect-[4/5] w-full object-cover" />
                  <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-5 pt-16">
                    <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-wider">
                      <div>
                        <div className="text-muted-foreground">subject</div>
                        <div className="text-sm text-foreground">{profile.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground">status</div>
                        <div className="flex items-center gap-1.5 text-sm text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> online
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="space-y-10"
          >
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p className="text-2xl leading-snug text-foreground md:text-3xl">
                I like the whole lifecycle: the messy dataset, the model that finally converges, and the pipeline that
                ships it without anyone getting paged.
              </p>
              <p>
                I&apos;m pursuing my M.S. in Data Science at Fordham University, building on a B.Tech in Computer Science
                (AI) from Jain University. Before grad school I spent 2.5 years as a Cloud Infrastructure Specialist at
                Hitachi, keeping Nokia&apos;s production systems at 100% uptime, which is where I learned to care as much
                about how models run as how they score.
              </p>
              <p>
                Today I build LLM tools as an AI Intern at Shane Smith Law, research automated LLM pipelines at Fordham&apos;s
                EDM Lab, and TA graduate Data Mining.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card/60 font-mono text-sm backdrop-blur-sm">
              <div className="border-b border-border bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground">
                profile.yaml
              </div>
              <dl>
                {specs.map((s) => (
                  <div key={s.key} className="grid grid-cols-[120px_1fr] gap-4 border-b border-border/60 px-4 py-3 last:border-b-0 sm:grid-cols-[160px_1fr]">
                    <dt className="text-secondary">{s.key}:</dt>
                    <dd className="text-foreground/90">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                // research, awards & certifications
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {achievements.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 first:sm:col-span-2 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm transition-colors hover:border-primary/40"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
