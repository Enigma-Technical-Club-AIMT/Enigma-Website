'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BookOpen, Code, Database, Zap } from 'lucide-react'

// const skillsData = [
//   {
//     id: 1,
//     title: 'Web Development',
//     icon: Code,
//     description: 'Master modern web technologies',
//     topics: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
//     difficulty: 'Beginner to Advanced',
//   },
//   {
//     id: 2,
//     title: 'Backend Development',
//     icon: Database,
//     description: 'Build scalable server solutions',
//     topics: ['Node.js', 'Express', 'Databases', 'APIs'],
//     difficulty: 'Intermediate to Advanced',
//   },
//   {
//     id: 3,
//     title: 'Machine Learning',
//     icon: Zap,
//     description: 'Explore AI and data science',
//     topics: ['Python', 'TensorFlow', 'Data Analysis', 'ML Models'],
//     difficulty: 'Advanced',
//   },
//   {
//     id: 4,
//     title: 'Cloud & DevOps',
//     icon: Zap,
//     description: 'Deploy and manage applications',
//     topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
//     difficulty: 'Intermediate to Advanced',
//   },
// ]
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

  // ✅ NEW TECHNOLOGIES

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
    icon: Zap,
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

  return (
    <section
      id="skills-courses"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-card/30 to-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Enigma Logo */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image
                src="/aimt.jpeg"
                alt="Enigma Logo"
                fill
                className="object-contain animate-glow"
              />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Skills & Learning Paths
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the latest technologies and skills taught through Enigma
            Tech Club and AIMT programs
          </p>
        </div>

        {/* Latest Skills Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Latest Tech Skills
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div
                  key={skill.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
                    onClick={() =>
                      setExpandedSkill(
                        expandedSkill === skill.id ? null : skill.id
                      )
                    }
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {skill.description}
                    </p>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                        {skill.difficulty}
                      </span>
                    </div>

                    {/* Expandable Topics */}
                    {expandedSkill === skill.id && (
                      <div className="border-t border-border/30 pt-4 mt-4 animate-fade-in-up">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          KEY TOPICS
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skill.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* AIMT Programs Advertisement */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 p-12 bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    World-Class Programs at AIMT
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Ambalika Institute of Management & Technology offers
                    comprehensive programs designed to equip students with
                    industry-ready skills and cutting-edge knowledge.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-foreground font-semibold">
                        Industry Partnerships
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-foreground font-semibold">
                        Expert Faculty
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-foreground font-semibold">
                        Hands-on Projects
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full aspect-video lg:w-96 lg:h-48 relative overflow-hidden rounded-xl">
                  <Image
                    src="/aimt.jpeg"
                    alt="AIMT"
                    fill
                    className="object-contain animate-pulse-slow"
                  />
                </div>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aimtCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">
                          {course.name}
                        </h4>
                        <p className="text-sm text-accent font-semibold">
                          {course.duration}
                        </p>
                      </div>
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">
                        SPECIALIZATIONS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {course.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Tech Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join Enigma Tech Club and explore these cutting-edge skills with our
            community of passionate learners.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors hover:shadow-lg hover:shadow-primary/40"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}
