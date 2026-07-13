'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  // Main container variants to stagger the entrance of text and CTA buttons
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  }

  // Text slide-up & fade-in variants
  const textVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
      },
    },
  }

  // Enigma Logo entrance (spring scaling and rotation)
  const logoVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, rotate: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
        delay: 0.1,
      },
    },
  }

  // Floating stats cards stagger variants
  const cardsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.6,
      },
    },
  }

  // Stats cards slide-up variants
  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Core Info Stagger Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Logo with interactive hover rotation */}
          <motion.div
            variants={logoVariants}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 2 }}
            className="flex justify-center mb-6 cursor-pointer"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 animate-glow rounded-2xl overflow-hidden">
              <Image
                src="/enigma.jpg"
                alt="Enigma Technical Club Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Welcome Badge */}
          <motion.div variants={textVariants} className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
              Welcome to Enigma Technical Club
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={textVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Innovation Meets
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Technology
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Discover cutting-edge technology, collaborate with brilliant minds,
            and shape the future of innovation at Enigma Tech Club.
          </motion.p>

          {/* Call to Actions (Interactive Buttons) */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <Link
                href="/explore"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors hover:shadow-lg hover:shadow-primary/50 w-full sm:w-auto"
              >
                Explore More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors w-full sm:w-auto"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating cards with staggered entrance and micro-interactions */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
            className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-primary/50 transition-colors cursor-default"
          >
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <p className="text-muted-foreground">Active Members</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
            className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-secondary/50 transition-colors cursor-default"
          >
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <p className="text-muted-foreground">Projects Completed</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
            className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-accent/50 transition-colors cursor-default"
          >
            <div className="text-3xl font-bold text-accent mb-2">20+</div>
            <p className="text-muted-foreground">Annual Events</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
