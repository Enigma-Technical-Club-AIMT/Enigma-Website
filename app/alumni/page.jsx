'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, Briefcase, GraduationCap, Users } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const previousMembers = []

function AlumniModal({ member, isOpen, onClose }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#f2f0ea] border border-border max-w-lg w-full overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <Image src="/enigma.jpg" alt="Enigma Logo" width={36} height={36} />
                <h2 className="text-lg font-medium text-foreground">Alumni Profile</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:text-[#2563eb] transition-colors" aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 grayscale">
                <Image
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl font-medium text-foreground mb-3">{member.name}</h3>

              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                  {member.branch}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                  Batch {member.batch}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-[#2563eb] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Current Position</p>
                    <p className="text-foreground text-lg font-medium">{member.post}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function AlumniPage() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-6 overflow-hidden hero-vignette grain">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 text-center">
          <span className="eyebrow !text-[#2563eb] mb-6">// Enigma Alumni Network</span>
          <h1 className="display-xxl-lite mb-4">
            Our <span className="font-serif-accent text-gold-gradient">Previous Members</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The brilliant minds who shaped Enigma and went on to build remarkable
            careers across the tech industry worldwide.
          </p>
          <div className="mt-10 overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm">
            <div className="ticker-track">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center shrink-0 px-4 py-3">
                  {['Engineering', 'Design', 'Product', 'Startups', 'Mentorship', 'Legacy'].map((word) => (
                    <span key={`${i}-${word}`} className="flex items-center gap-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{word}</span>
                      <span className="text-[#2563eb]">&#10022;</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="pb-16 px-5 sm:px-8 flex-1">
        <div className="max-w-6xl mx-auto">
          {previousMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {previousMembers.map((member, index) => (
                <div
                  key={member.id}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div
                    onClick={() => setSelectedMember(member)}
                    className="glass rounded-xl overflow-hidden glass-hover group cursor-pointer h-full"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20">
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 bg-accent/90 text-accent-foreground text-xs font-bold rounded-md backdrop-blur-sm">
                          {member.batch}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-1 font-display">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-semibold text-sm mb-2 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {member.post}
                      </p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {member.branch}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 border border-border max-w-lg mx-auto">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-5" strokeWidth={1.5} />
              <h3 className="text-2xl font-medium text-foreground mb-2 font-display">Coming Soon</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Our first batch of members is still writing their Enigma story.
                {' This page will showcase the alumni who went on to remarkable careers.'}
              </p>
              <Link
                href="/new-members"
                className="inline-flex items-center px-6 py-2.5 border border-[#2563eb] text-[#2563eb] text-[12px] uppercase tracking-[0.12em] hover:bg-[#2563eb] hover:text-[#16202f] transition-colors"
              >
                Be the First to Shine
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto border-t border-border pt-14 text-center">
          <h2 className="text-3xl font-medium text-foreground mb-4 font-display">
            Want to be part of <span className="font-serif-accent text-[#2563eb]">this legacy</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Join Enigma Technical Club today and start your journey toward
            becoming the next success story.
          </p>
          <Link
            href="/new-members"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#2563eb] text-[#16202f] text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#7c3aed] transition-colors"
          >
            Join Enigma Now
          </Link>
        </div>
      </section>

      <Footer />

      <AlumniModal
        member={selectedMember}
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}
