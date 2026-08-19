'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Content is visible by default until client JS hydrates — never leaves a blank page.
export function Reveal({
  children,
  delay = 0,
  className = '',
  yOffset = 28,
}) {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <motion.div
      className={className}
      initial={reduce || !mounted ? { opacity: 1 } : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Classic editorial section heading: mono eyebrow + large medium headline,
// with an optional serif-italic accent word via `highlight`.
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) {
  const alignCls =
    align === 'left'
      ? 'items-start text-left'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-center text-center'

  return (
    <div className={`flex flex-col ${alignCls} gap-5 mb-14 ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight leading-[1.08] max-w-3xl">
        {title}
        {highlight ? (
          <>
            {' '}
            <span className="font-serif-accent text-brand-gradient">{highlight}</span>
          </>
        ) : null}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
