import { UserPlus, BookOpen, Code2, Trophy, GraduationCap, Rocket } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

// Visual roadmap of a member's growth at Enigma.
const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Join',
    description: 'Complete the onboarding and become part of the community.',
  },
  {
    icon: BookOpen,
    step: '02',
    title: 'Learn',
    description: 'Pick a learning path and attend hands-on workshops.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Build',
    description: 'Ship real projects with teammates and peer reviews.',
  },
  {
    icon: Trophy,
    step: '04',
    title: 'Compete',
    description: 'Take part in hackathons and coding competitions.',
  },
  {
    icon: GraduationCap,
    step: '05',
    title: 'Mentor',
    description: 'Guide newcomers and lead sessions of your own.',
  },
  {
    icon: Rocket,
    step: '06',
    title: 'Launch',
    description: 'Carry your portfolio and network into your career.',
  },
]

export function Journey() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="// Member Journey"
          title="Your growth"
          highlight="roadmap"
          description="From your first commit to an industry-ready professional, here is how Enigma grows with you."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-foreground/15">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={(i % 3) * 0.08} className="h-full">
              <div className="py-10 px-2 md:px-8 border-b border-foreground/15 md:border-r last:md:border-r-0 h-full group">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif-accent text-4xl text-foreground/30">
                    {s.step}
                  </span>
                  <s.icon className="w-5 h-5 text-foreground/50" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
