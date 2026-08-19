'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  Code,
  Database,
  Zap,
  Users,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Reveal, SectionHeading } from '@/components/reveal'

const coordinators = [
  {
    name: 'Aeitbar Haidar',
    post: 'Club Coordinator',
    image: '/coordinator-aehtabr.jpeg',
    description:
      'Leading the Enigma Technical Club with a vision to foster innovation and hands-on technical learning among students.',
  },
  {
    name: 'Alok Mishra',
    post: 'Head of Department (HOD)',
    image: '/hod-alok.jpeg',
    description:
      'Guiding the department with deep expertise and commitment to academic excellence and industry-ready curriculum.',
  },
  {
    name: 'Vipin Rawat',
    post: 'Additional HOD',
    image: '/hod-vipin.jpeg',
    description:
      'Supporting departmental initiatives and mentoring students to achieve their full potential in the technical domain.',
  },
]

const skillsData = [
  {
    id: 1,
    title: 'Web Development',
    icon: Code,
    description: 'Master modern web technologies',
    topics: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 2,
    title: 'Backend Development',
    icon: Database,
    description: 'Build scalable server solutions',
    topics: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    id: 3,
    title: 'Machine Learning & AI',
    icon: Cpu,
    description: 'Explore AI and data science',
    topics: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'NLP', 'Computer Vision'],
  },
  {
    id: 4,
    title: 'Cloud & DevOps',
    icon: Layers,
    description: 'Deploy and manage applications',
    topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
  },
  {
    id: 5,
    title: 'Mobile App Development',
    icon: Zap,
    description: 'Build apps for iOS and Android',
    topics: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    id: 6,
    title: 'Cybersecurity',
    icon: Globe,
    description: 'Protect systems and networks',
    topics: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Penetration Testing'],
  },
]

const aimtPrograms = [
  {
    name: 'B.Tech Computer Science & Engineering',
    duration: '4 Years',
    icon: Code,
    highlights: ['AI & Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Data Science', 'Full Stack Development'],
  },
  {
    name: 'B.Tech Information Technology',
    duration: '4 Years',
    icon: Globe,
    highlights: ['Web Technologies', 'Big Data Analytics', 'IoT & Embedded Systems', 'Software Engineering', 'Database Management'],
  },
  {
    name: 'M.Tech (Computer Science)',
    duration: '2 Years',
    icon: GraduationCap,
    highlights: ['Advanced Computing', 'Research Methodology', 'Thesis & Publications', 'Specialization Tracks'],
  },
  {
    name: 'MBA (Business & Technology)',
    duration: '2 Years',
    icon: Briefcase,
    highlights: ['Tech Management', 'Digital Innovation', 'Entrepreneurship', 'Business Analytics'],
  },
  {
    name: 'B.Tech Mechanical Engineering',
    duration: '4 Years',
    icon: Layers,
    highlights: ['CAD/CAM', 'Robotics', 'Manufacturing Tech', 'Thermodynamics', 'Material Science'],
  },
  {
    name: 'B.Tech Electronics & Communication',
    duration: '4 Years',
    icon: Cpu,
    highlights: ['VLSI Design', 'Signal Processing', 'Wireless Communication', 'Embedded Systems'],
  },
]

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner — vignette cinematic hero */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden hero-vignette grain">
        <div
          className="pointer-events-none absolute -top-32 right-0 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #2563eb40 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #2a9d8f40 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Logo */}
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <Image
                src="/aimt.jpeg"
                alt="Enigma Technical Club"
                fill
                className="object-contain"
              />
            </div>

            {/* Text */}
            <div className="text-center lg:text-left">
              <span className="eyebrow !text-[#2563eb] mb-6">// Explore Enigma</span>
              <h1 className="display-xxl-lite mb-6">
                Ambalika Institute of{' '}
                <span className="font-serif-accent text-gold-gradient">
                  Management &amp; Technology
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {"Discover AIMT's programs, meet the minds behind Enigma Technical Club, and explore the skills that shape the future of tech."}
              </p>
            </div>
          </div>

          {/* Value ticker ribbon */}
          <div className="mt-12 overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm">
            <div className="ticker-track">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center shrink-0 px-4 py-3">
                  {['Web Development', 'Machine Learning', 'Cloud &amp; DevOps', 'Cybersecurity', 'AIMT', 'CSE Department'].map((word) => (
                    <span key={`${i}-${word}`} className="flex items-center gap-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{word}</span>
                      <span className="text-[#2563eb]">&#10022;</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About AIMT */}
      <section className="py-24 md:py-32 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="// The Institution"
            title="About"
            highlight="AIMT"
            description="Ambalika Institute of Management & Technology is a premier institution committed to shaping the next generation of leaders and innovators. With state-of-the-art infrastructure, experienced faculty, and a strong industry network, AIMT provides students with holistic education that bridges theory and practice."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-border">
            {[
              { icon: Users, label: '2000+', desc: 'Active Learners' },
              { icon: Award, label: '50+', desc: 'Awards Won' },
              { icon: GraduationCap, label: '95%', desc: 'Placements' },
              { icon: BookOpen, label: '6+', desc: 'Programs Offered' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="h-full">
                <div className="py-10 border-b border-border px-2 md:px-8">
                  <stat.icon className="w-4 h-4 text-[#2563eb] mb-4" strokeWidth={1.5} />
                  <p className="text-3xl font-serif-accent text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Enigma Club */}
      <section className="py-24 md:py-32 bg-[#ffffff] text-[#16202f] px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="// The Community"
            title="About"
            highlight="Enigma Technical Club"
            description="Enigma Technical Club is the flagship technology community of AIMT, founded with the mission to bridge the gap between academics and industry. Through hackathons, workshops, guest lectures, and project-based learning, Enigma empowers students to become creators, problem-solvers, and future tech leaders."
          />

          {/* Coordinators */}
          <div className="mb-8">
            <h3 className="text-center text-[13px] uppercase tracking-[0.2em] text-[#16202f]/60 mb-12">
              Meet the Leadership
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#16202f]/15">
              {coordinators.map((person, index) => (
                <Reveal key={person.name} delay={index * 0.08} className="h-full">
                  <div className="py-10 px-2 md:px-8 border-b md:border-r border-[#16202f]/15 last:md:border-r-0 h-full">
                    <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 grayscale">
                      <Image
                        src={person.image || '/placeholder.svg'}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-medium text-[#16202f] mb-1">{person.name}</h4>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#2563eb] mb-3 font-mono-accent">
                      {person.post}
                    </p>
                    <p className="text-sm text-[#16202f]/60 leading-relaxed">{person.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Skills & Courses */}
      <section className="py-24 md:py-32 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative w-14 h-14">
                <Image src="/enigma.jpg" alt="Enigma Logo" fill className="object-cover" />
              </div>
            </div>
            <SectionHeading
              eyebrow="// Level Up"
              title="Latest"
              highlight="skills & courses"
              description="Stay ahead of the curve with in-demand skills taught at Enigma workshops and AIMT classrooms."
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border mb-28">
            {skillsData.map((skill, index) => {
              const IconComp = skill.icon
              return (
                <Reveal key={skill.id} delay={(index % 3) * 0.06} className="h-full">
                  <div className="py-8 px-2 md:px-8 border-b border-border md:border-r md:[&:nth-child(3n)]:border-r-0 h-full group">
                    <IconComp className="w-5 h-5 text-muted-foreground group-hover:text-[#2563eb] transition-colors mb-5" strokeWidth={1.5} />
                    <h4 className="text-lg font-medium text-foreground mb-1 group-hover:text-[#2563eb] transition-colors">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.topics.map((topic) => (
                        <span
                          key={topic}
                          className="font-mono-accent text-[10px] uppercase tracking-[0.1em] text-foreground/70 border border-border px-2.5 py-1"
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

          {/* AIMT Programs */}
          <div className="border-t border-border pt-14">
            <div className="flex flex-col lg:flex-row items-center gap-10 mb-12">
              <div className="flex-1 text-center lg:text-left">
                <span className="eyebrow mb-5">// Admissions Open</span>
                <h3 className="text-3xl sm:text-4xl font-medium text-foreground mb-4 text-balance font-display">
                  Courses at Ambalika Institute of Management &amp; Technology
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  AIMT offers undergraduate and postgraduate programs designed to prepare
                  students for successful careers in engineering, technology, and management.
                </p>
              </div>
              <div className="relative w-36 h-36 lg:w-44 lg:h-44 flex-shrink-0">
                <Image src="/enigma.jpg" alt="AIMT Programs" fill className="object-contain" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
              {aimtPrograms.map((program, index) => {
                const PIcon = program.icon
                return (
                  <Reveal key={program.name} delay={(index % 3) * 0.06} className="h-full">
                    <div className="py-8 px-2 md:px-8 border-b md:border-r border-border last:border-b lg:[&:nth-child(3n)]:border-r-0 h-full group">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-medium text-foreground leading-snug group-hover:text-[#2563eb] transition-colors">
                            {program.name}
                          </h4>
                          <p className="text-[11px] uppercase tracking-[0.14em] text-[#2563eb] mt-1 font-mono-accent">
                            {program.duration}
                          </p>
                        </div>
                        <PIcon className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {program.highlights.map((h) => (
                          <span
                            key={h}
                            className="font-mono-accent text-[10px] uppercase tracking-[0.1em] text-foreground/70 flex items-center gap-1 px-2 py-0.5 border border-border"
                          >
                            <ChevronRight className="w-2.5 h-2.5 text-[#2563eb]" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center">
              <p className="text-muted-foreground mb-6 text-sm">
                Shape your future with AIMT. Apply now for the upcoming academic session.
              </p>
              <Link
                href="/#contact"
                className="group inline-flex items-center px-8 py-3 bg-[#2563eb] text-[#16202f] text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#7c3aed] transition-colors"
              >
                Get in Touch
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
