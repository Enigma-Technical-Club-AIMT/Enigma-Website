'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, Code, GraduationCap, Sparkles } from 'lucide-react'

const newMembers = [
  {
    id: 1,
    name: 'Adarsh Kumar',
    branch: 'Computer Science',
    post: 'Core Member',
    specialty: 'React & Frontend',
    image:
      '/adarsh1.jpeg',
  },
  {
    id: 2,
    name: 'Ansuman kumar',
    branch: 'Information Technology',
    post: 'Design Lead',
    specialty: 'UI/UX & Figma',
    image:
      '/anshu.jpeg',
  },
  {
    id: 3,
    name: 'Lokesh Kumar',
    branch: 'Computer Science',
    post: 'Tech Lead',
    specialty: 'Python & Machine Learning',
    image:
      '/lok.jpeg',
  },
  {
    id: 4,
    name: 'Raj kumar',
    branch: 'Information Technology',
    post: 'Content Head',
    specialty: 'Technical Writing',
    image:
      '/raj.jpeg',
  },
  {
    id: 5,
    name: 'Shreya kumari',
    branch: 'Computer Science',
    post: 'Event Coordinator',
    specialty: 'Cloud & DevOps',
    image:
      '/shreya.jpeg',
  },
  {
    id: 6,
    name: 'Tusar Kumar',
    branch: 'Information Technology',
    post: 'Social Media Manager',
    specialty: 'Digital Marketing',
    image:
      '/tushar1.jpeg',
  },
  {
    id: 7,
    name: 'Vaishnavi kumari',
    branch: 'Computer Science',
    post: 'Core Member',
    specialty: 'Backend & APIs',
    image:
      '/v1.jpeg',
  },
  {
    id: 8,
    name: 'Sachin kumar',
    branch: 'Information Technology',
    post: 'Core Member',
    specialty: 'Data Analytics',
    image:
      '/sachin1.jpeg',
  },
   {
    id: 9,
    name: 'Diya Talvar',
    branch: 'Information Technology',
    post: 'Core Member',
    specialty: 'Data Analytics',
    image:
      '/Diya.jpeg',
  },
   {
    id: 10,
    name: 'Krishna kumar',
    branch: 'Information Technology',
    post: 'Core Member',
    specialty: 'Data Analytics',
    image:
      '/krishna.jpeg',
  },
]

function MemberModal({ member, isOpen, onClose }) {
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
            <h2 className="text-xl font-bold text-foreground">Member Profile</h2>
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
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 to-secondary/20">
            <Image
              src={member.image || '/placeholder.svg'}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-3xl font-bold text-foreground mb-3">{member.name}</h3>

          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              {member.branch}
            </span>
            <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {member.post}
            </span>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Specialty
                </p>
                <p className="text-foreground font-semibold text-lg">{member.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewMembersPage() {
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
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow"
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
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
            Welcome to Enigma
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Our{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              New Members
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet the fresh talent driving Enigma Technical Club forward. These passionate students bring new energy, skills, and ideas to our community.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newMembers.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div
                  onClick={() => setSelectedMember(member)}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full hover:shadow-lg hover:shadow-primary/20"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Post Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 bg-primary/80 text-primary-foreground text-xs font-bold rounded-md backdrop-blur-sm">
                        {member.post}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {member.branch}
                    </p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      {member.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-card/30 border border-border/30 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Want to join Enigma?
          </h2>
          <p className="text-muted-foreground mb-6">
            We are always looking for passionate students who love technology. No prior experience needed, just bring your curiosity and enthusiasm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Apply to Join
            </Link>
            <Link
              href="/alumni"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary hover:text-primary bg-transparent transition-colors"
            >
              View Alumni
            </Link>
          </div>
        </div>
      </section>

      <MemberModal
        member={selectedMember}
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}
