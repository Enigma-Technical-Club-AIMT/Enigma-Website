'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Search, BookOpen, Code, Database, Globe,
  FileText, ExternalLink, Star, Award, Compass, Target, Briefcase
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const CATEGORIES = [
  { id: 'all', name: 'All Resources', icon: Compass },
  { id: 'dsa', name: 'DSA & Coding', icon: Code },
  { id: 'core', name: 'Core CS Subjects', icon: Database },
  { id: 'dev', name: 'Development & Projects', icon: Globe },
  { id: 'interview', name: 'Resume & Interview', icon: FileText },
]

const RESOURCES = [
  // DSA
  {
    id: 1, title: "Striver's SDE Sheet",
    description: "The most popular 180+ DSA questions list frequently asked in top tech companies like product-based startups, FAANG, and service providers.",
    category: "dsa", tags: ["DSA", "LeetCode", "Interview Prep"], difficulty: "Medium to Hard",
    link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    isFeatured: true, type: "Coding Sheet",
  },
  {
    id: 2, title: "LeetCode curated 75 (Blind 75)",
    description: "A subset of 75 essential LeetCode questions selected to help developers build pattern-recognition skills for technical screening rounds.",
    category: "dsa", tags: ["DSA", "LeetCode", "Patterns"], difficulty: "Medium",
    link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    isFeatured: false, type: "Practice Problems",
  },
  {
    id: 3, title: "NeetCode Roadmap",
    description: "An interactive visualization map of DSA topics categorized into Trees, Heaps, Graphs, Dynamic Programming with free video solutions.",
    category: "dsa", tags: ["DSA", "Visualization", "Video Guides"], difficulty: "Beginner to Advanced",
    link: "https://neetcode.io/roadmap", isFeatured: true, type: "Roadmap & Video",
  },
  // Core CS
  {
    id: 4, title: "Gate Smashers OS & DBMS Playlists",
    description: "Extremely simple, clear, and exam/interview-oriented lectures explaining Operating Systems, Databases, and Computer Networks.",
    category: "core", tags: ["Operating Systems", "DBMS", "Computer Networks", "Placement Prep"], difficulty: "Beginner",
    link: "https://www.youtube.com/@GateSmashers", isFeatured: false, type: "YouTube Course",
  },
  {
    id: 5, title: "DBMS Cheat Sheet for Interviews",
    description: "Quick summary notes on SQL Queries, Normalization, ACID Properties, Transactions, Indexing, and Joins for placement rounds.",
    category: "core", tags: ["DBMS", "SQL", "Notes"], difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/dbms-cheat-sheet-for-interview-preparation/",
    isFeatured: false, type: "Notes / Reference",
  },
  {
    id: 6, title: "System Design Primer",
    description: "A massive, widely acclaimed GitHub repository for learning how to design large-scale distributed systems. Includes mock interview scenarios.",
    category: "core", tags: ["System Design", "Distributed Systems", "Architecture"], difficulty: "Advanced",
    link: "https://github.com/donnemartin/system-design-primer", isFeatured: true, type: "GitHub Repo",
  },
  // Dev
  {
    id: 7, title: "Developer Roadmaps (roadmap.sh)",
    description: "Interactive visual guides, learning paths, and recommended tools to become a Frontend, Backend, DevOps, or Fullstack Developer.",
    category: "dev", tags: ["Roadmaps", "Web Dev", "DevOps"], difficulty: "All Levels",
    link: "https://roadmap.sh", isFeatured: true, type: "Learning Path",
  },
  {
    id: 8, title: "Full Stack Open - University of Helsinki",
    description: "A comprehensive react, node.js, graphQL, typescript, and docker course with rigorous project submissions and industry-standard practices.",
    category: "dev", tags: ["React", "NodeJS", "TypeScript", "Web Dev"], difficulty: "Intermediate",
    link: "https://fullstackopen.com/en/", isFeatured: false, type: "Interactive Course",
  },
  {
    id: 9, title: "Build Space - Project Cohorts",
    description: "Learn web3, AI agents, UI engineering, and production building by shipping actual products alongside thousands of developers.",
    category: "dev", tags: ["AI", "Web3", "Hackathons", "Projects"], difficulty: "Intermediate",
    link: "https://buildspace.so/", isFeatured: false, type: "Build Community",
  },
  // Resumes
  {
    id: 10, title: "Jake's Resume Template (Overleaf)",
    description: "The gold-standard LaTeX resume template used by thousands of engineering students to pass ATS scanners for tech roles.",
    category: "interview", tags: ["Resume Template", "LaTeX", "ATS-Friendly"], difficulty: "Easy",
    link: "https://www.overleaf.com/latex/templates/jakes-resume/ptebnqykvnrs",
    isFeatured: true, type: "LaTeX Template",
  },
  {
    id: 11, title: "STAR Method Interview Prep Guide",
    description: "A framework guide on structuring behavioral and HR round interview answers (Situation, Task, Action, Result) with real examples.",
    category: "interview", tags: ["Behavioral Prep", "HR Round", "STAR Method"], difficulty: "Easy",
    link: "https://www.levels.fyi/blog/star-method-behavioral-interviews.html",
    isFeatured: false, type: "Guide / Article",
  },
  {
    id: 12, title: "Pramp - Mock Technical Interviews",
    description: "Free peer-to-peer live coding interviews where you take turns interviewing and getting interviewed by other software developers.",
    category: "interview", tags: ["Mock Interviews", "Peer Practice", "Live Coding"], difficulty: "Medium to Hard",
    link: "https://www.pramp.com/", isFeatured: false, type: "Interactive Platform",
  },
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestedResource, setSuggestedResource] = useState({ title: '', link: '', desc: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const filteredResources = RESOURCES.filter(resource => {
    const matchesTab = activeTab === 'all' || resource.category === activeTab
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const featuredResources = RESOURCES.filter(
    r => r.isFeatured && (activeTab === 'all' || r.category === activeTab)
  )

  const handleSuggestionSubmit = (e) => {
    e.preventDefault()
    if (!suggestedResource.title || !suggestedResource.link) return
    console.log("Suggested:", suggestedResource)
    setFormSubmitted(true)
    setTimeout(() => {
      setSuggestedResource({ title: '', link: '', desc: '' })
      setFormSubmitted(false)
    }, 4000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-16 flex-1 w-full">
        <div className="relative text-center max-w-3xl mx-auto mb-12 overflow-hidden">
          <div
            className="pointer-events-none absolute -top-20 right-0 w-72 h-72 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #2563eb40 0%, transparent 70%)' }}
          />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2563eb] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className="eyebrow !text-[#2563eb] mb-6">// Curated by Enigma</span>
          <h1 className="display-xxl-lite mb-5">
            Placement &amp; Upskilling{' '}
            <span className="font-serif-accent text-gold-gradient">Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Curated preparation paths, learning roadmaps, and core CS resources
            handpicked by the Enigma Technical Club to propel your tech career.
          </p>
          <div className="mt-10 overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm">
            <div className="ticker-track">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center shrink-0 px-4 py-3">
                  {['DSA &amp; Coding', 'Core CS', 'Development', 'Resume Prep', 'Interviews', 'Ship It'].map((word) => (
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

        {/* Filter bar — hairline style */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 border-y border-border py-4">
          <div className="flex flex-wrap gap-1 justify-center md:justify-start w-full md:w-auto">
            {CATEGORIES.map(category => {
              const Icon = category.icon
              const active = activeTab === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? 'text-[#2563eb] border-b-2 border-[#2563eb] rounded-none'
                      : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {category.name}
                </button>
              )
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search resources, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-border focus:border-[#2563eb] outline-none transition-colors text-sm placeholder:text-muted-foreground/80"
            />
          </div>
        </div>

        {/* Featured */}
        {featuredResources.length > 0 && searchQuery === '' && (
          <div className="mb-16">
            <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#e8c85a]" strokeWidth={1.5} />
              Must-Have Essentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
              {featuredResources.map(resource => (
                <motion.div
                  key={`featured-${resource.id}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative border-b border-border py-8 px-2 md:px-8 md:border-r md:[&:nth-child(3n)]:border-r-0 hover:bg-[#f2f0ea] transition-colors"
                >
                  <span className="font-mono-accent text-[10px] uppercase tracking-[0.12em] text-[#2563eb] mb-3 block">
                    {resource.type}
                  </span>
                  <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-[#2563eb] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resource.tags.map(tag => (
                      <span key={tag} className="font-mono-accent text-[10px] uppercase tracking-[0.1em] text-foreground/60 border border-border px-2.5 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-[#2563eb] group-hover:gap-3 transition-all"
                  >
                    Access Resource
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All resources */}
        <div>
          <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
            Curated Knowledge Items
          </h2>

          <AnimatePresence mode="popLayout">
            {filteredResources.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 border border-dashed border-border"
              >
                <Compass className="w-10 h-10 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-medium">No resources found</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Try resetting your category filters or search keywords.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border"
              >
                {filteredResources.map(resource => (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-border py-8 px-2 md:px-8 md:border-r lg:[&:nth-child(3n)]:border-r-0 hover:bg-[#f2f0ea] transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2 mb-4">
                      <span className="font-mono-accent text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border px-2.5 py-1">
                        {resource.type}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-[#2563eb] font-mono-accent">
                        {resource.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-[#2563eb] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {resource.tags.map(tag => (
                        <span key={tag} className="font-mono-accent text-[10px] uppercase tracking-[0.1em] text-foreground/60 border border-border px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-[#2563eb] hover:gap-3 transition-all"
                    >
                      Explore Link
                      <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Company Target Preparation — Coming Soon */}
        <div className="mt-20 border-t border-border pt-14">
          <div className="max-w-3xl text-center mx-auto">
            <span className="eyebrow mb-6">// Coming Soon</span>
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 flex items-center justify-center gap-3 font-display">
              <Target className="w-7 h-7 text-[#2563eb]" strokeWidth={1.5} />
              Company Target Preparation
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              We are working on dedicated preparation kits for top tech companies.
              You will soon have access to company-specific syllabuses, notes,
              lectures, interview questions, video guides, and step-by-step
              application procedures.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Syllabus & Notes', 'Video Lectures', 'Question Sets', 'Interview Prep', 'Application Steps'].map((item) => (
                <div key={item} className="flex items-center gap-2 px-4 py-2 border border-border text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-[#2563eb]" strokeWidth={1.5} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enigma's Strategy */}
        <div className="mt-20 bg-[#ffffff] text-[#16202f] px-5 sm:px-10 py-16">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono-accent text-[11px] uppercase tracking-[0.15em] text-[#2563eb] mb-4 block">
              Club Advice
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium mb-10 text-center">
              Enigma&apos;s Strategy for <span className="font-serif-accent">Placement Prep</span>
            </h2>
            <ol className="space-y-6">
              {[
                {
                  bold: 'Master 1 OOP Language:',
                  text: 'Choose C++ (highly recommended for DSA), Java, or Python and learn all standard libraries (STL, Collections).',
                },
                {
                  bold: 'Consistently Practice DSA:',
                  text: 'Aim for 2 problems daily on LeetCode. Focus on Arrays, HashMaps, Two-Pointers, Trees, and Recursion.',
                },
                {
                  bold: 'Build 2 Strong Projects:',
                  text: 'Avoid template basic projects. Build deployment-ready full stack web/app solutions and link active GitHub URLs.',
                },
                {
                  bold: 'Revise Core Subjects:',
                  text: 'Spend the final 2 weeks reviewing DBMS queries, OS process scheduling, and SDLC models.',
                },
              ].map((step, i) => (
                <li key={step.bold} className="flex items-start gap-5 border-b border-[#16202f]/15 pb-6 last:border-0">
                  <span className="font-serif-accent text-3xl text-[#2563eb] leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="text-[#16202f]/80">
                    <strong className="text-[#16202f]">{step.bold}</strong>{' '}
                    {step.text}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Suggestion form */}
        <div className="mt-20 max-w-xl mx-auto border-t border-border pt-14">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium flex items-center justify-center gap-2 font-display">
              <Award className="w-5 h-5 text-[#2563eb]" strokeWidth={1.5} />
              Found a Great Resource?
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Submit links to playlists, sheets, or roadmaps so we can share
              them with AIMT students.
            </p>
          </div>

          <form onSubmit={handleSuggestionSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono-accent">
                Resource Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Love Babbar DSA Sheet"
                value={suggestedResource.title}
                onChange={(e) => setSuggestedResource({ ...suggestedResource, title: e.target.value })}
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border focus:border-[#2563eb] outline-none text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono-accent">
                Resource Link
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={suggestedResource.link}
                onChange={(e) => setSuggestedResource({ ...suggestedResource, link: e.target.value })}
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border focus:border-[#2563eb] outline-none text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono-accent">
                Short Description
              </label>
              <textarea
                placeholder="Why should students use this?"
                rows={3}
                value={suggestedResource.desc}
                onChange={(e) => setSuggestedResource({ ...suggestedResource, desc: e.target.value })}
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border focus:border-[#2563eb] outline-none text-sm resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitted}
              className={`w-full py-3.5 text-[13px] uppercase tracking-[0.12em] font-medium transition-colors ${
                formSubmitted
                  ? 'bg-[#2563eb] text-[#16202f]'
                  : 'border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-[#16202f]'
              }`}
            >
              {formSubmitted ? 'Thank you for contributing!' : 'Submit Resource for Verification'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
