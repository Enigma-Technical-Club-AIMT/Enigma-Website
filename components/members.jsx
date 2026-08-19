'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Mail, X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MembersSectionSkeleton } from '@/components/skeletons'
import { Reveal, SectionHeading } from '@/components/reveal'
import { getMembers } from '@/app/actions/admin'

function MemberDetailModal({ member, isOpen, onClose }) {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-medium text-foreground">Member Spotlight</h3>
                <p className="text-xs text-muted-foreground font-mono-accent mt-1 tracking-[0.15em] uppercase">
                  Enigma Technical Club
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="relative w-40 h-40 overflow-hidden bg-muted shrink-0">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-3xl font-medium text-foreground">{member.name}</h4>
                    <p className="text-[#2563eb] text-base mt-1 font-mono-accent uppercase tracking-[0.1em] text-[13px]">
                      {member.role}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 border-t border-border pt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-[11px] uppercase tracking-[0.15em]">Specialty</p>
                      <p className="font-medium text-foreground mt-1">{member.specialty}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[11px] uppercase tracking-[0.15em]">Branch</p>
                      <p className="font-medium text-foreground mt-1">{member.branch}</p>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start gap-3 pt-1">
                    {member.social?.github && member.social.github !== '#' && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.social?.linkedin && member.social.linkedin !== '#' && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social?.email && member.social.email !== '#' && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
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

export function Members() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [membersList, setMembersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let done = false
    const timeout = setTimeout(() => {
      if (!done) {
        done = true
        setIsLoading(false)
      }
    }, 5000)
    getMembers()
      .then((data) => {
        if (!done) {
          done = true
          clearTimeout(timeout)
          setMembersList(data)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!done) {
          done = true
          clearTimeout(timeout)
          setIsLoading(false)
        }
      })
    return () => {
      clearTimeout(timeout)
      done = true
    }
  }, [])

  if (isLoading) return <MembersSectionSkeleton />

  return (
    <section id="members" className="relative py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// The Team"
          title="The minds behind"
          highlight="Enigma"
          description="Meet the builders and creators behind Enigma Technical Club."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {membersList.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.06} className="h-full">
              <div
                className="group cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                  />
                </div>
                <div className="pt-4 flex items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-[#2563eb] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mt-1 font-mono-accent">
                      {member.role}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground/50 font-mono-accent">
                    {member.specialty}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Hairline info cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 border-t border-border">
          <Reveal delay={0.1} className="h-full">
            <div id="previous-members" className="border-b md:border-r border-border py-10 md:pr-10 h-full flex flex-col gap-3">
              <span className="eyebrow">// Alumni</span>
              <h3 className="text-2xl font-medium">Previous Members</h3>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                Our alumni have gone on to careers at Google, Microsoft, Amazon,
                and innovative startups — and remain mentors to this community.
              </p>
              <Link
                href="/alumni"
                className="inline-flex items-center text-[#2563eb] text-sm uppercase tracking-[0.12em] hover:text-foreground transition-colors"
              >
                Explore Alumni →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="h-full">
            <div id="new-members" className="py-10 md:pl-10 h-full flex flex-col gap-3">
              <span className="eyebrow">// Join</span>
              <h3 className="text-2xl font-medium">New Members Welcome</h3>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                Passionate about technology? Join our community. No prior
                experience needed — just enthusiasm and a desire to learn.
                Membership is open year-round.
              </p>
              <Link
                href="/new-members"
                className="inline-flex items-center text-[#2563eb] text-sm uppercase tracking-[0.12em] hover:text-foreground transition-colors"
              >
                Join Us Today →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <MemberDetailModal
        member={selectedMember}
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  )
}
