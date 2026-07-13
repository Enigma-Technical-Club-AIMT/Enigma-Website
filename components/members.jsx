'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Mail, X } from 'lucide-react'

const membersList = [
  {
    id: 1,
    name: 'Yogesh Prajapati',
    role: 'Club Lead',
    specialty: 'AI & Machine Learning',
    branch: 'Computer Science',
    image:
      '/yogu.jpeg',
    social: { github: '#', linkedin: '#', email: '#' },
  },
  {
    id: 2,
    name: 'Vishal kumar',
    role: 'Club Lead',
    specialty: 'Web Development',
    branch: 'Information Technology',
    image:
      '/vishal1.jpeg',
    social: { github: 'https://github.com/Vishal202-rgb', linkedin: 'https://www.linkedin.com/in/vishal202-rgb/', email: 'vishal.devx.tech@gmail.com' },
  },
  {
    id: 3,
    name: 'Sparsh Mishra',
    role: 'Club Lead',
    specialty: 'Cloud Infrastructure',
    branch: 'Computer Science',
    image:
      '/sparsh.jpeg',
    social: { github: 'https://github.com/SparshM8', linkedin: 'https://www.linkedin.com/in/sparshm8/', email: 'callmesamay8@gmail.com' },
  },
]

function MemberDetailModal({ member, isOpen, onClose }) {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="bg-card border border-border/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border/30">
          <div className="flex items-center gap-4">
            <Image
              src="/enigma.jpg"
              alt="Enigma Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-bold text-foreground">
              Member Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-border/30 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 to-secondary/20">
            <Image
              src={member.image || '/placeholder.svg'}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-4xl font-bold text-foreground mb-2">
                {member.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
                  {member.branch}
                </span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold">
                  {member.role}
                </span>
              </div>
            </div>

            <div className="bg-border/20 rounded-lg p-4">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Specialty:
                </span>{' '}
                {member.specialty}
              </p>
            </div>

            {member.social && (
              <div className="flex gap-3 pt-4">
                <a
                  href={member.social.github}
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={member.social.linkedin}
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 hover:bg-secondary text-secondary hover:text-secondary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={member.social.email}
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Members() {
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <section id="members" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate minds behind Enigma Tech Club
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {membersList.map((member, index) => (
            <div
              key={member.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full hover:shadow-lg hover:shadow-primary/20"
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {member.specialty}
                  </p>

                  <div
                    className={`flex gap-3 transition-all duration-300 ${
                      hoveredId === member.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a
                      href={member.social.github}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 hover:bg-secondary text-secondary hover:text-secondary-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.email}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div
            id="previous-members"
            className="bg-card/30 border border-border/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Previous Members
            </h3>
            <p className="text-muted-foreground mb-4">
              Our alumni have gone on to incredible careers in tech companies
              worldwide, including Google, Microsoft, Amazon, and innovative
              startups. They remain valuable mentors to our current community.
            </p>
            <Link
              href="/alumni"
              className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              {'Explore Alumni \u2192'}
            </Link>
          </div>

          <div
            id="new-members"
            className="bg-card/30 border border-border/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">
              New Members Welcome
            </h3>
            <p className="text-muted-foreground mb-4">
              Are you passionate about technology? Join our thriving community!
              No prior experience needed, just enthusiasm and a desire to learn.
              Membership is open year-round.
            </p>
            <Link
              href="/new-members"
              className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              {'Join Us Today \u2192'}
            </Link>
          </div>
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
