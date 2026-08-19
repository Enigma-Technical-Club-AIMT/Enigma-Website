'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, Code, GraduationCap, Sparkles } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Reveal, SectionHeading } from '@/components/reveal'

const newMembers = [
  { id: 1, name: 'Adarsh Kumar', branch: 'Computer Science', post: 'Core Member', specialty: 'React & Frontend', image: '/adarsh1.jpeg' },
  { id: 2, name: 'Ansuman kumar', branch: 'Information Technology', post: 'Design Lead', specialty: 'UI/UX & Figma', image: '/anshu.jpeg' },
  { id: 3, name: 'Lokesh Kumar', branch: 'Computer Science', post: 'Tech Lead', specialty: 'Python & Machine Learning', image: '/lok.jpeg' },
  { id: 4, name: 'Raj kumar', branch: 'Information Technology', post: 'Content Head', specialty: 'Technical Writing', image: '/raj.jpeg' },
  { id: 5, name: 'Shreya kumari', branch: 'Computer Science', post: 'Event Coordinator', specialty: 'Cloud & DevOps', image: '/shreya.jpeg' },
  { id: 6, name: 'Tusar Kumar', branch: 'Information Technology', post: 'Social Media Manager', specialty: 'Digital Marketing', image: '/tushar1.jpeg' },
  { id: 7, name: 'Vaishnavi kumari', branch: 'Computer Science', post: 'Core Member', specialty: 'Backend & APIs', image: '/v1.jpeg' },
  { id: 8, name: 'Sachin kumar', branch: 'Information Technology', post: 'Core Member', specialty: 'Data Analytics', image: '/sachin1.jpeg' },
  { id: 9, name: 'Diya Talvar', branch: 'Information Technology', post: 'Core Member', specialty: 'Data Analytics', image: '/Diya.jpeg' },
  { id: 10, name: 'Krishna kumar', branch: 'Information Technology', post: 'Core Member', specialty: 'Data Analytics', image: '/krishna.jpeg' },
]

function MemberModal({ member, isOpen, onClose }) {
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
                <h2 className="text-lg font-medium text-foreground">Member Profile</h2>
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
                  <Sparkles className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                  {member.post}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-[#2563eb] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Specialty</p>
                    <p className="text-foreground text-lg font-medium">{member.specialty}</p>
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

export default function NewMembersPage() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-6 overflow-hidden hero-vignette grain">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 text-center">
          <span className="eyebrow !text-[#2563eb] mb-6">// Welcome to Enigma</span>
          <h1 className="display-xxl-lite mb-4">
            Our <span className="font-serif-accent text-gold-gradient">New Members</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet the fresh talent driving Enigma Technical Club forward. These
            passionate students bring new energy, skills, and ideas to our community.
          </p>
          <div className="mt-10 overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm">
            <div className="ticker-track">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center shrink-0 px-4 py-3">
                  {['React &amp; Frontend', 'Python &amp; ML', 'UI/UX Design', 'Cloud &amp; DevOps', 'Data Analytics', 'New Energy'].map((word) => (
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

      {/* Members Grid */}
      <section className="pb-16 px-5 sm:px-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-border">
            {newMembers.map((member, index) => (
              <Reveal key={member.id} delay={(index % 4) * 0.06} className="h-full">
                <div
                  onClick={() => setSelectedMember(member)}
                  className="py-6 px-3 md:px-6 border-b border-border md:border-r md:[&:nth-child(4n)]:border-r-0 cursor-pointer group h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden mb-5 grayscale">
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-[#2563eb] transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-mono-accent text-[11px] uppercase tracking-[0.12em] text-[#2563eb] mb-2">
                      {member.post}
                    </p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {member.branch}
                    </p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1.5 mt-1">
                      <Code className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {member.specialty}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto border-t border-border pt-14 text-center">
          <h2 className="text-3xl font-medium text-foreground mb-4 font-display">
            Want to join <span className="font-serif-accent text-[#2563eb]">Enigma</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            We are always looking for passionate students who love technology.
            No prior experience needed, just bring your curiosity and enthusiasm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#2563eb] text-[#16202f] text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#7c3aed] transition-colors"
            >
              Apply to Join
            </Link>
            <Link
              href="/alumni"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-sm text-muted-foreground hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
            >
              View Alumni
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <MemberModal
        member={selectedMember}
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}
