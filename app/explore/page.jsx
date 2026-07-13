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
    color: 'primary',
  },
  {
    id: 2,
    title: 'Backend Development',
    icon: Database,
    description: 'Build scalable server solutions',
    topics: [
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'REST APIs',
      'GraphQL',
    ],
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Machine Learning & AI',
    icon: Cpu,
    description: 'Explore AI and data science',
    topics: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'Data Analysis',
      'NLP',
      'Computer Vision',
    ],
    color: 'accent',
  },
  {
    id: 4,
    title: 'Cloud & DevOps',
    icon: Layers,
    description: 'Deploy and manage applications',
    topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
    color: 'primary',
  },
  {
    id: 5,
    title: 'Mobile App Development',
    icon: Zap,
    description: 'Build apps for iOS and Android',
    topics: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    color: 'secondary',
  },
  {
    id: 6,
    title: 'Cybersecurity',
    icon: Globe,
    description: 'Protect systems and networks',
    topics: [
      'Ethical Hacking',
      'Network Security',
      'Cryptography',
      'Penetration Testing',
    ],
    color: 'accent',
  },
]

const aimtPrograms = [
  {
    name: 'B.Tech Computer Science & Engineering',
    duration: '4 Years',
    icon: Code,
    highlights: [
      'AI & Machine Learning',
      'Cloud Computing',
      'Cybersecurity',
      'Data Science',
      'Full Stack Development',
    ],
  },
  {
    name: 'B.Tech Information Technology',
    duration: '4 Years',
    icon: Globe,
    highlights: [
      'Web Technologies',
      'Big Data Analytics',
      'IoT & Embedded Systems',
      'Software Engineering',
      'Database Management',
    ],
  },
  {
    name: 'M.Tech (Computer Science)',
    duration: '2 Years',
    icon: GraduationCap,
    highlights: [
      'Advanced Computing',
      'Research Methodology',
      'Thesis & Publications',
      'Specialization Tracks',
    ],
  },
  {
    name: 'MBA (Business & Technology)',
    duration: '2 Years',
    icon: Briefcase,
    highlights: [
      'Tech Management',
      'Digital Innovation',
      'Entrepreneurship',
      'Business Analytics',
    ],
  },
  {
    name: 'B.Tech Mechanical Engineering',
    duration: '4 Years',
    icon: Layers,
    highlights: [
      'CAD/CAM',
      'Robotics',
      'Manufacturing Tech',
      'Thermodynamics',
      'Material Science',
    ],
  },
  {
    name: 'B.Tech Electronics & Communication',
    duration: '4 Years',
    icon: Cpu,
    highlights: [
      'VLSI Design',
      'Signal Processing',
      'Wireless Communication',
      'Embedded Systems',
    ],
  },
]

export default function ExplorePage() {
  const colorMap = {
    primary: 'border-primary/50 hover:shadow-primary/20',
    secondary: 'border-secondary/50 hover:shadow-secondary/20',
    accent: 'border-accent/50 hover:shadow-accent/20',
  }
  const badgeMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  }
  const iconBg = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Top Bar */}
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

      {/* Hero Banner */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1.5s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Logo */}
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 animate-fade-in-up">
              <Image
                src="/aimt.jpeg"
                alt="Enigma Technical Club"
                fill
                className="object-contain rounded-2xl animate-glow"
              />
            </div>

            {/* Text */}
            <div
              className="text-center lg:text-left animate-fade-in-up"
              style={{ animationDelay: '0.15s' }}
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
                Explore Enigma
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
                Ambalika Institute of{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Management & Technology
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {"Discover AIMT's world-class programs, meet the brilliant minds behind Enigma Technical Club, and explore the latest skills that shape the future of tech."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About AIMT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AIMT
              </span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Ambalika Institute of Management & Technology is a premier
              institution committed to shaping the next generation of leaders and
              innovators. With state-of-the-art infrastructure, experienced
              faculty, and a strong industry network, AIMT provides students
              with holistic education that bridges theory and practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: '2000+ Students', desc: 'Active Learners' },
              {
                icon: Award,
                label: '50+ Awards',
                desc: 'National Recognition',
              },
              {
                icon: GraduationCap,
                label: '95% Placement',
                desc: 'Career Success',
              },
              {
                icon: BookOpen,
                label: '6+ Programs',
                desc: 'Diverse Courses',
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.label}
                </p>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Enigma Club */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Enigma Technical Club
              </span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Enigma Technical Club is the flagship technology community of
              AIMT, founded with the mission to bridge the gap between academics
              and industry. Through hackathons, workshops, guest lectures, and
              project-based learning, Enigma empowers students to become
              creators, problem-solvers, and future tech leaders.
            </p>
          </div>

          {/* Coordinators Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
              Meet the Leadership
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coordinators.map((person, index) => (
                <div
                  key={person.name}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
                    {/* Image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Image
                        src={person.image || '/placeholder.svg'}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {/* Enigma Logo Badge */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-lg overflow-hidden border-2 border-primary/50">
                        <Image
                          src="/enigma.jpg"
                          alt="Enigma"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h4 className="text-2xl font-bold text-foreground mb-1">
                        {person.name}
                      </h4>
                      <p className="text-primary font-semibold text-base mb-3">
                        {person.post}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {person.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Skills & Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/enigma.jpg"
                  alt="Enigma Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Latest{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Skills & Courses
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Stay ahead of the curve with in-demand skills taught at Enigma
              workshops and AIMT classrooms
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {skillsData.map((skill, index) => {
              const IconComp = skill.icon
              return (
                <div
                  key={skill.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div
                    className={`bg-card/50 backdrop-blur-sm border rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 ${colorMap[skill.color]}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBg[skill.color]}`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h4 className="text-lg font-bold text-foreground mb-1">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skill.topics.map((topic) => (
                        <span
                          key={topic}
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${badgeMap[skill.color]}`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* AIMT Programs Advertisement */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card/50 to-secondary/5">
            {/* Decorative Blurs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 p-8 lg:p-12">
              {/* Banner Header */}
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
                <div className="flex-1 text-center lg:text-left">
                  <span className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
                    Admissions Open
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                    Courses at Ambalika Institute of Management & Technology
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                    AIMT offers a wide range of undergraduate and postgraduate
                    programs designed to prepare students for successful careers
                    in engineering, technology, and management.
                  </p>
                </div>
                <div className="relative w-40 h-40 lg:w-56 lg:h-56 flex-shrink-0">
                  <Image
                    src="/enigma.jpg"
                    alt="AIMT Programs"
                    fill
                    className="object-contain animate-pulse-slow"
                  />
                </div>
              </div>

              {/* Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aimtPrograms.map((program, index) => {
                  const PIcon = program.icon
                  return (
                    <div
                      key={program.name}
                      className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-foreground mb-1 leading-snug">
                            {program.name}
                          </h4>
                          <p className="text-sm text-accent font-semibold">
                            {program.duration}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-primary transition-colors">
                          <PIcon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {program.highlights.map((h) => (
                          <span
                            key={h}
                            className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            <ChevronRight className="w-3 h-3" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              <div
                className="mt-12 text-center animate-fade-in-up"
                style={{ animationDelay: '0.5s' }}
              >
                <p className="text-muted-foreground mb-4 text-sm">
                  Shape your future with AIMT. Apply now for the upcoming
                  academic session.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors hover:shadow-lg hover:shadow-primary/40"
                >
                  Get in Touch
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded overflow-hidden">
              <Image
                src="/aimt.jpeg"
                alt="Enigma"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              Enigma Technical Club &mdash;{' '}
              <span className="font-semibold text-foreground">
                Ambalika Institute of Management & Technology
              </span>
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-primary hover:text-secondary transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}
