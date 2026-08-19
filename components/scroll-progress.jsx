'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Slim gradient progress bar pinned to the top of the viewport.
export function ScrollProgress() {
  const [visible, setVisible] = useState(false)
  const [pct, setPct] = useState(0)
  const raw = useMotionValue(0)
  const smooth = useSpring(raw, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? Math.min((doc.scrollTop / max) * 100, 100) : 0
      raw.set(p)
      setPct(p)
      setVisible(doc.scrollTop > 60)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [raw, setPct])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-[#2563eb]"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
