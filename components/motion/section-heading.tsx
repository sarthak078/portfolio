"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/motion"

type SectionHeadingProps = {
  index: string
  label: string
  title: string
  highlight: string
  description?: string
}

export function SectionHeading({ index, label, title, highlight, description }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-14 md:mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span className="text-muted-foreground">[{index}]</span>
        <span>{label}</span>
        <span className="h-px max-w-40 flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <motion.h2
          variants={fadeInUp}
          className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
        >
          {title} <span className="text-gradient">{highlight}</span>
        </motion.h2>
        {description ? (
          <motion.p variants={fadeInUp} className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </motion.p>
        ) : null}
      </div>
    </motion.div>
  )
}
