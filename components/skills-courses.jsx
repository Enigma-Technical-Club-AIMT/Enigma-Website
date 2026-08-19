'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Code,
  Database,
  Zap,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Wrench,
} from 'lucide-react'
import { SkillsSectionSkeleton } from '@/components/skeletons'
import { Reveal, SectionHeading } from '@/components/reveal'

const skillsData = [
  {
    id: 1,
    title: 'Web Development',
    icon: Code,
    description: 'Master modern web technologies',
    topics: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
    difficulty: 'Beginner to Advanced',
  },
  {
    id: 2,
    title: 'Backend Development',
    icon: Database,
    description: 'Build scalable server solutions',
    topics: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    difficulty: 'Intermediate to Advanced',
  },
  {
    id: 3,
    title: 'Machine Learning',
    icon: Zap,
    description: 'Explore AI and data science',
    topics: ['Python', 'TensorFlow', 'Pandas', 'ML Models'],
    difficulty: 'Advanced',
  },
  {
    id: 4,
    title: 'Cloud Computing',
    icon: Database,
    description: 'Deploy apps on cloud platforms',
    topics: ['AWS', 'Azure', 'Google Cloud', 'Serverless'],
    difficulty: 'Intermediate',
  },
  {
    id: 5,
    title: 'Cybersecurity',
    icon: ShieldCheck,
    description: 'Protect systems and networks',
    topics: ['Ethical Hacking', 'Network Security', 'Kali Linux', 'Cryptography'],
    difficulty: 'Intermediate to Advanced',
  },
  {
    id: 6,
    title: 'Data Analytics',
    icon: Database,
    description: 'Analyze and visualize data',
    topics: ['Python', 'SQL', 'Power BI', 'Tableau'],
    difficulty: 'Beginner to Intermediate',
  },
  {
    id: 7,
    title: 'Mobile App Development',
    icon: Code,
    description: 'Build Android & iOS apps',
    topics: ['Flutter', 'React Native', 'Kotlin', 'Firebase'],
    difficulty: 'Intermediate',
  },
  {
    id: 8,
    title: 'IoT Development',
    icon: Zap,
    description: 'Connect hardware with software',
    topics: ['Arduino', 'Raspberry Pi', 'Sensors', 'NodeMCU'],
    difficulty: 'Intermediate',
  },
  {
    id: 9,
    title: 'DevOps Advanced',
    icon: Database,
    description: 'Automate deployments & scaling',
    topics: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    difficulty: 'Advanced',
  },
  {
    id: 10,
    title: 'Blockchain',
    icon: Zap,
    description: 'Build decentralized apps',
    topics: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3'],
    difficulty: 'Advanced',
  },
  {
    id: 11,
    title: 'UI/UX Design',
    icon: Code,
    description: 'Design beautiful interfaces',
    topics: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    difficulty: 'Beginner to Intermediate',
  },
  {
    id: 12,
    title: 'DevOps & Automation',
    icon: Database,
    description: 'Automate build, testing, and deployment pipelines',
    topics: ['Linux', 'Shell Scripting', 'Jenkins', 'GitHub Actions', 'CI/CD Pipelines'],
    difficulty: 'Intermediate to Advanced',
  },
]

const aimtCourses = [
  {
    id: 1,
    name: 'B.Tech Computer Science',
    duration: '4 Years',
    specializations: ['AI & ML', 'Cloud Computing', 'Cybersecurity'],
  },
  {
    id: 2,
    name: 'B.Tech Information Technology',
    duration: '4 Years',
    specializations: ['Web Development', 'Big Data', 'IoT'],
  },
  {
    id: 3,
    name: 'M.Tech Computer Science',
    duration: '2 Years',
    specializations: ['Advanced Computing', 'Research'],
  },
  {
    id: 4,
    name: 'MBA (Business Technology)',
    duration: '2 Years',
    specializations: ['Tech Management', 'Digital Innovation'],
  },
]

export function SkillsCourses() {
  const [expandedSkill, setExpandedSkill] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <SkillsSectionSkeleton />

  return (
    <section id="skills-courses" className="relative py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// Grow With Us"
          title="Skills &"
          highlight="learning paths"
          description="Explore the technologies taught through Enigma Technical Club and AIMT programs."
        />

        {/* Latest Tech Skills — flat bordered grid with hairlines */}
        <div className="mb-28">
          <h3 className="text-center text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-12">
            Latest Tech Skills
          </h3>

          <div className="border-t border-border">
            {skillsData.map((skill, index) => {
              const IconComponent = skill.icon
              const isExpanded = expandedSkill === skill.id
              return (
                <Reveal key={skill.id} delay={0}>
                  <div
                    className="border-b border-border py-7 px-2 cursor-pointer group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start md:items-center gap-4"
                    onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono-accent text-[11px] text-muted-foreground/50 w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-[#2563eb] transition-colors" strokeWidth={1.5} />
                      <div>
                        <h4 className="text-lg font-medium text-foreground group-hover:text-[#2563eb] transition-colors">
                          {skill.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-0.5">{skill.description}</p>
                      </div>
                    </div>

                    <span className="font-mono-accent text-[11px] uppercase tracking-[0.12em] text-muted-foreground/60 md:justify-self-center">
                      {skill.difficulty}
                    </span>

                    <span className="font-mono-accent text-[11px] text-muted-foreground/50 uppercase tracking-[0.12em]">
                      {isExpanded ? 'Collapse −' : 'Explore +'}
                    </span>
                  </div>

                  {/* Expandable topics */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isExpanded ? 160 : 0, opacity: isExpanded ? 1 : 0 }}
                  >
                    <div className="px-2 pl-[4.25rem] pb-5 flex flex-wrap gap-2">
                      {skill.topics.map((topic) => (
                        <span
                          key={topic}
                          className="font-mono-accent text-[11px] uppercase tracking-[0.1em] text-foreground/70 border border-border px-3 py-1"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* AIMT Programs — flat hairline band */}
        <div className="mb-16">
          <Reveal>
            <div className="border-y border-border py-14">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-10">
                <div className="flex-1">
                  <span className="eyebrow mb-5">// Academic Excellence</span>
                  <h3 className="text-3xl font-medium text-foreground mb-4 font-display">
                    World-class programs at AIMT
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ambalika Institute of Management & Technology offers programs
                    designed to equip students with industry-ready skills.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-end">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                    <span className="text-sm">Industry Partnerships</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wrench className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                    <span className="text-sm">Expert Faculty</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                    <span className="text-sm">Hands-on Projects</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
                {aimtCourses.map((course, index) => (
                  <Reveal key={course.id} delay={index * 0.06} className="h-full">
                    <div className="py-8 md:px-10 border-b md:border-r border-border last:border-b-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-foreground">{course.name}</h4>
                          <p className="font-mono-accent text-[11px] uppercase tracking-[0.12em] text-[#2563eb] mt-1">
                            {course.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="font-mono-accent text-[11px] uppercase tracking-[0.1em] text-foreground/70 border border-border px-3 py-1"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-3xl font-medium text-foreground mb-4 font-display">
              Ready to start your tech journey?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join Enigma Technical Club and explore these skills with a community
              of passionate learners.
            </p>
            <Link
              href="/join"
              className="group inline-flex items-center px-8 py-3.5 bg-[#2563eb] text-[#16202f] text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#7c3aed] transition-colors"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
