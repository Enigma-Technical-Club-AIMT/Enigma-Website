'use client'

import Image from 'next/image'
import { Reveal, SectionHeading } from '@/components/reveal'

const patrons = [
  {
    name: 'Prof. Vipin Kumar',
    role: 'Head of Department — CSE',
    quote: 'Technical clubs are where classroom knowledge turns into capability.',
    image: '/hod-vipin.jpeg',
  },
  {
    name: 'Prof. Alok Kumar',
    role: 'Deputy Head of Department — CSE',
    quote: 'We encourage every student to question, build, and lead.',
    image: '/hod-alok.jpeg',
  },
  {
    name: 'Prof. Atehrabr',
    role: 'Club Coordinator — Enigma',
    quote: 'Enigma is the heartbeat of innovation in our department.',
    image: '/coordinator-aehtabr.jpeg',
  },
]

export function Leadership() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-[#eef1fc] to-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="// The Guiding Force"
          title="Mentored by the"
          highlight="department"
          description="Enigma runs under the guidance of the Computer Science & Engineering department — faculty who open the doors, and students who walk through them."
        />

        {/* Patrons row */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
          {patrons.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <figure className="h-full flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover object-top grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="border-t border-border pt-5">
                  <p className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#2563eb] mb-2">
                    {p.role}
                  </p>
                  <h3 className="text-2xl font-medium font-display text-foreground mb-3">
                    {p.name}
                  </h3>
                  <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{p.quote}&rdquo;
                  </blockquote>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Founders band */}
        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-border pt-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow mb-4">// Rebuilt By</span>
                <h3 className="text-2xl md:text-3xl font-medium font-display text-foreground">
                  A student-led rebirth — driven by its <span className="font-serif-accent text-gold-gradient">co-founders</span>
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                After the club&apos;s quiet season, a new wave of co-founders stepped
                forward — re-proposing Enigma to the CSE department with a renewed
                vision of innovation and adapting to every shift in technology.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
