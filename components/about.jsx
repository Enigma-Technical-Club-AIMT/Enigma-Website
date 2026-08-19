import { Zap, Users, Target } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function About() {
  const pillars = [
    {
      icon: Zap,
      title: 'Innovation',
      description:
        'We explore cutting-edge technologies and implement real solutions to real-world problems — not just tutorials, but shipped work.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'A student-driven family. Build meaningful connections with passionate technologists and collaborate on ambitious projects.',
    },
    {
      icon: Target,
      title: 'Growth',
      description:
        'Develop technical skills, leadership, and professional expertise through hands-on experience — from freshman to flagship lead.',
    },
  ]

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Manifesto opening — drop cap mission */}
        <Reveal>
          <div className="max-w-4xl mb-20">
            <span className="eyebrow !text-foreground mb-6">// The Manifesto</span>
            <p className="text-xl md:text-2xl leading-[1.5] text-foreground/80 drop-cap">
              Enigma is the official technical club of the Computer Science & Engineering
              department at Ambalika Institute of Management & Technology — a place where
              students learn by building, teach by sharing, and grow by competing. We are
              student-run, student-built, and student-led.
            </p>
          </div>
        </Reveal>

        {/* Three pillars — editorial columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-foreground/15">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.1} className="h-full">
              <div className="border-b md:border-r border-foreground/15 px-1 md:px-8 py-8 md:py-10 h-full flex flex-col gap-4 group">
                <div className="flex items-center justify-between">
                  <pillar.icon className="w-5 h-5 text-foreground/60" strokeWidth={1.5} />
                  <span className="font-mono-accent text-[11px] tracking-[0.2em] text-foreground/40">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium font-display">
                  {pillar.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed text-sm sm:text-base">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Seriffed statement band */}
        <Reveal delay={0.2}>
          <div className="mt-20 md:mt-28 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-foreground/15 pt-14">
            <span className="font-serif-accent text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground max-w-2xl">
              We exist to turn curiosity into <span className="text-[#2563eb]">craft</span>.
            </span>
            <p className="text-foreground/60 leading-relaxed max-w-md">
              Our members don&apos;t just attend events — they run them. From organizing
              flagship competitions to mentoring newcomers, every student at Enigma finds
              a role that shapes the club and prepares them for industry.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
