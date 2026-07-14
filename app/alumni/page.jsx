'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, Briefcase, GraduationCap } from 'lucide-react'

const previousMembers = []

function AlumniModal({ member, isOpen, onClose }) {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/50 rounded-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center p-5 border-b border-border/30">
          <div className="flex items-center gap-3">
            <Image
              src="/enigma.jpg"
              alt="Enigma Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold text-foreground">Alumni Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-border/30 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-secondary/20 to-accent/20">
            <Image
              src={member.image || '/placeholder.svg'}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-3xl font-bold text-foreground mb-3">{member.name}</h3>

          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm">
              {member.branch}
            </span>
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-semibold text-sm">
              Batch {member.batch}
            </span>
          </div>

          <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-secondary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Current Position
                </p>
                <p className="text-foreground font-semibold text-lg">{member.post}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AlumniPage() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden">
              <Image
                src="/enigma.jpg"
                alt="Enigma Technical Club Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              Enigma
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1.5s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden animate-glow">
              <Image
                src="/enigma.jpg"
                alt="Enigma Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-semibold">
            Enigma Alumni Network
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Our{' '}
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Previous Members
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The brilliant minds who shaped Enigma and went on to build remarkable careers across the tech industry worldwide.
          </p>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {previousMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {previousMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div
                    onClick={() => setSelectedMember(member)}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-secondary/50 transition-all duration-300 group cursor-pointer h-full hover:shadow-lg hover:shadow-secondary/20"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20">
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {/* Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 bg-accent/80 text-accent-foreground text-xs font-bold rounded-md backdrop-blur-sm">
                          {member.batch}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-1">
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
            <div className="text-center py-16 px-4 border border-dashed border-border/50 rounded-2xl bg-card/10 backdrop-blur-sm max-w-lg mx-auto">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Alumni Found</h3>
              <p className="text-muted-foreground text-sm">
                There are currently no previous members registered in our alumni network database.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-card/30 border border-border/30 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Want to be part of this legacy?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join Enigma Technical Club today and start your journey toward becoming the next success story.
          </p>
          <Link
            href="/new-members"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            Join Enigma Now
          </Link>
        </div>
      </section>

      <AlumniModal
        member={selectedMember}
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}
