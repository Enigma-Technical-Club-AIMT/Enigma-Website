'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from '@/components/count-up'

export function Hero() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  }

  const textVariants = {
    hidden: reduce || !mounted ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const stats = [
    { value: 100, suffix: '+', label: 'Active Members' },
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 20, suffix: '+', label: 'Annual Events' },
    { value: 5, suffix: '+', label: 'Domains Explored' },
  ]

  const values = [
    'Innovation',
    'Technology',
    'Community',
    'Growth',
    'Code',
    'Design',
    'Machine Learning',
    'Robotics',
    'Cybersecurity',
  ]

  return (
    <section
      id="home"
      className="hero-band relative min-h-screen flex flex-col justify-between overflow-hidden pt-16"
    >
      {/* Cinematic backdrop: drifting gold-teal orbs + vignette */}
      <div className="absolute inset-0 -z-10 hero-vignette">
        <div className="orb-drift absolute -top-32 -left-32 w-[46rem] h-[46rem] rounded-full bg-[#1f5af2]/[0.30] blur-[140px]" />
        <div className="orb-drift-slow absolute -bottom-40 right-0 w-[52rem] h-[52rem] rounded-full bg-[#8b5cf6]/[0.28] blur-[160px]" />
        <div className="orb-drift absolute top-1/3 right-1/4 w-[26rem] h-[26rem] rounded-full bg-[#c084fc]/[0.16] blur-[120px]" />
      </div>

      {/* Main statement */}
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto w-full px-5 sm:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Mono eyebrow */}
          <motion.div variants={textVariants} className="mb-6">
            <span className="eyebrow">
              The Technical Club of CSE — Ambalika Institute of Management & Technology
            </span>
          </motion.div>

          {/* Giant display statement */}
          <motion.h1
            variants={textVariants}
            className="display-xxl text-foreground mb-8"
          >
            We decode
            <br />
            the <span className="font-serif-accent text-brand-gradient">future.</span>
          </motion.h1>

          {/* Subtitle + CTAs row */}
          <motion.div
            variants={textVariants}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 max-w-5xl"
          >
            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
              A student-driven community building the next generation of
              innovators — since 2023, now rebuilt with a sharper vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className="btn-brand group inline-flex items-center justify-center px-9 py-3.5 rounded-full text-[13px] uppercase tracking-[0.12em] font-semibold"
              >
                Join Enigma
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#story"
                className="inline-flex items-center justify-center px-9 py-3.5 rounded-full border border-white/25 bg-white/5 backdrop-blur text-foreground text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-white/10 hover:border-white/45 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Value ticker strip */}
      <div className="relative border-y border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden py-5 select-none">
        <div className="ticker-track items-center gap-10 pr-10">
          {[...values, ...values].map((v, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-sm uppercase tracking-[0.3em] font-mono-accent text-muted-foreground"
            >
              {v}
              <span className="text-[#8b5cf6]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hairline stat strip */}
      <div className="relative border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-7 grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-1 pl-2 border-l border-border"
            >
              <div className="text-3xl md:text-4xl font-medium font-display text-foreground tabular-nums">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
