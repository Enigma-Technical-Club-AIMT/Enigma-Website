'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// Floating back-to-top button that appears after scrolling down.
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(document.documentElement.scrollTop > 500)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={scrollUp}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-[#16202f] transition-colors focus:outline-none focus:ring-1 focus:ring-[#2563eb]/50"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
