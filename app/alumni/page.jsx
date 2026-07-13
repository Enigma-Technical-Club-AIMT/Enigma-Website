'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, Briefcase, GraduationCap } from 'lucide-react'

const previousMembers = [
  {
    id: 1,
    name: 'Rahul Verma',
    branch: 'Computer Science',
    post: 'Software Engineer at Google',
    batch: '2019-2023',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Anjali Singh',
    branch: 'Information Technology',
    post: 'Product Manager at Microsoft',
    batch: '2018-2022',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Vikram Patel',
    branch: 'Computer Science',
    post: 'AI Researcher at OpenAI',
    batch: '2019-2023',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Neha Gupta',
    branch: 'Information Technology',
    post: 'Startup Founder - FinTech',
    batch: '2017-2021',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Aditya Kumar',
    branch: 'Computer Science',
    post: 'Backend Developer at Amazon',
    batch: '2018-2022',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Sonia Mehra',
    branch: 'Information Technology',
    post: 'Data Scientist at Netflix',
    batch: '2019-2023',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Rohan Tiwari',
    branch: 'Computer Science',
    post: 'DevOps Lead at Flipkart',
    batch: '2017-2021',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Kavita Reddy',
    branch: 'Information Technology',
    post: 'UX Designer at Adobe',
    batch: '2018-2022',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  },
]

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
