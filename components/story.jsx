'use client'

import { Reveal } from '@/components/reveal'

const chapters = [
  {
    num: '01',
    year: '2023',
    title: 'The Beginning',
    text: 'Enigma Technical Club was born from a simple idea: give the CSE students of Ambalika Institute of Management & Technology a place to build, break, and learn together. Founded and run entirely by students, it set out to revive the institute\'s technical culture.',
    tone: 'dark',
  },
  {
    num: '02',
    year: '2024',
    title: 'The Dormant Season',
    text: 'Six months in, momentum faded. Events slowed, participation dropped, and the club drifted into a neutral state. It was a quiet reminder that ideas need more than initiative — they need a vision worth returning to.',
    tone: 'dark',
  },
  {
    num: '03',
    year: 'Rebirth',
    title: 'Rebuilt With Vision',
    text: 'A new wave of co-founders took the initiative — with a sharper vision of innovation and adapting to every change in technology. With the backing of our department and coordinators, Enigma was rebuilt from the ground up: new structure, new events, new energy.',
    tone: 'teal',
  },
  {
    num: '04',
    year: 'Today',
    title: 'Innovation Meets Technology',
    text: 'Today Enigma runs workshops, hackathons, and learning paths across Web Development, AI, Cybersecurity, and more. Every member — from first-year juniors to senior leads — writes the next chapter of the club\'s story.',
    tone: 'dark',
  },
]

export function Story() {
  return (
    <section id="story" className="relative py-28 md:py-36 overflow-hidden bg-card/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="mb-20">
            <span className="eyebrow mb-6">// Our Story</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-display text-foreground max-w-3xl">
              From dormant to <span className="font-serif-accent text-brand-gradient">defiant</span>
            </h2>
            <div className="grad-divider w-32 mt-6" />
          </div>
        </Reveal>

        <div className="border-t border-border">
          {chapters.map((ch, i) => (
            <Reveal key={ch.num} delay={i * 0.06}>
              <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-14 md:py-16 border-b border-border">
                <div className="md:col-span-3 flex items-start gap-4">
                  <span className="chapter-num shrink-0">{ch.num}</span>
                  <span className="font-mono-accent text-xs uppercase tracking-[0.2em] text-[#2563eb] pt-4">
                    {ch.year}
                  </span>
                </div>
                <div className="md:col-span-9 max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-medium font-display text-foreground mb-4">
                    {ch.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground drop-cap">
                    {ch.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
