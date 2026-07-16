'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, BookOpen, Code, Database, Globe, 
  Terminal, Shield, FileText, Cpu, ExternalLink, Star,
  Award, Compass, Sparkles, Target, Briefcase
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const CATEGORIES = [
  { id: 'all', name: 'All Resources', icon: Compass },
  { id: 'dsa', name: 'DSA & Coding', icon: Code },
  { id: 'core', name: 'Core CS Subjects', icon: Database },
  { id: 'dev', name: 'Development & Projects', icon: Globe },
  { id: 'interview', name: 'Resume & Interview', icon: FileText }
]

const RESOURCES = [
  // DSA
  {
    id: 1,
    title: "Striver's SDE Sheet",
    description: "The most popular 180+ DSA questions list frequently asked in top tech companies like product-based startups, FAANG, and service providers.",
    category: "dsa",
    tags: ["DSA", "LeetCode", "Interview Prep"],
    difficulty: "Medium to Hard",
    link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    isFeatured: true,
    type: "Coding Sheet"
  },
  {
    id: 2,
    title: "LeetCode curated 75 (Blind 75)",
    description: "A subset of 75 essential LeetCode questions selected to help developers build pattern-recognition skills for technical screening rounds.",
    category: "dsa",
    tags: ["DSA", "LeetCode", "Patterns"],
    difficulty: "Medium",
    link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    isFeatured: false,
    type: "Practice Problems"
  },
  {
    id: 3,
    title: "NeetCode Roadmap",
    description: "An interactive visualization map of DSA topics categorized into Trees, Heaps, Graphs, Dynamic Programming with free video solutions.",
    category: "dsa",
    tags: ["DSA", "Visualization", "Video Guides"],
    difficulty: "Beginner to Advanced",
    link: "https://neetcode.io/roadmap",
    isFeatured: true,
    type: "Roadmap & Video"
  },
  // Core CS
  {
    id: 4,
    title: "Gate Smashers OS & DBMS Playlists",
    description: "Extremely simple, clear, and exam/interview-oriented lectures explaining Operating Systems, Databases, and Computer Networks.",
    category: "core",
    tags: ["Operating Systems", "DBMS", "Computer Networks", "Placement Prep"],
    difficulty: "Beginner",
    link: "https://www.youtube.com/@GateSmashers",
    isFeatured: false,
    type: "YouTube Course"
  },
  {
    id: 5,
    title: "DBMS Cheat Sheet for Interviews",
    description: "Quick summary notes on SQL Queries, Normalization, ACID Properties, Transactions, Indexing, and Joins for placement rounds.",
    category: "core",
    tags: ["DBMS", "SQL", "Notes"],
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/dbms-cheat-sheet-for-interview-preparation/",
    isFeatured: false,
    type: "Notes / Reference"
  },
  {
    id: 6,
    title: "System Design Primer",
    description: "A massive, widely acclaimed GitHub repository for learning how to design large-scale distributed systems. Includes mock interview scenarios.",
    category: "core",
    tags: ["System Design", "Distributed Systems", "Architecture"],
    difficulty: "Advanced",
    link: "https://github.com/donnemartin/system-design-primer",
    isFeatured: true,
    type: "GitHub Repo"
  },
  // Dev
  {
    id: 7,
    title: "Developer Roadmaps (roadmap.sh)",
    description: "Interactive visual guides, learning paths, and recommended tools to become a Frontend, Backend, DevOps, or Fullstack Developer.",
    category: "dev",
    tags: ["Roadmaps", "Web Dev", "DevOps"],
    difficulty: "All Levels",
    link: "https://roadmap.sh",
    isFeatured: true,
    type: "Learning Path"
  },
  {
    id: 8,
    title: "Full Stack Open - University of Helsinki",
    description: "A comprehensive react, node.js, graphQL, typescript, and docker course with rigorous project submissions and industry-standard practices.",
    category: "dev",
    tags: ["React", "NodeJS", "TypeScript", "Web Dev"],
    difficulty: "Intermediate",
    link: "https://fullstackopen.com/en/",
    isFeatured: false,
    type: "Interactive Course"
  },
  {
    id: 9,
    title: "Build Space - Project Cohorts",
    description: "Learn web3, AI agents, UI engineering, and production building by shipping actual products alongside thousands of developers.",
    category: "dev",
    tags: ["AI", "Web3", "Hackathons", "Projects"],
    difficulty: "Intermediate",
    link: "https://buildspace.so/",
    isFeatured: false,
    type: "Build Community"
  },
  // Resumes
  {
    id: 10,
    title: "Jake's Resume Template (Overleaf)",
    description: "The gold-standard LaTeX resume template used by thousands of engineering students to pass ATS scanners for tech roles.",
    category: "interview",
    tags: ["Resume Template", "LaTeX", "ATS-Friendly"],
    difficulty: "Easy",
    link: "https://www.overleaf.com/latex/templates/jakes-resume/ptebnqykvnrs",
    isFeatured: true,
    type: "LaTeX Template"
  },
  {
    id: 11,
    title: "STAR Method Interview Prep Guide",
    description: "A framework guide on structuring behavioral and HR round interview answers (Situation, Task, Action, Result) with real examples.",
    category: "interview",
    tags: ["Behavioral Prep", "HR Round", "STAR Method"],
    difficulty: "Easy",
    link: "https://www.levels.fyi/blog/star-method-behavioral-interviews.html",
    isFeatured: false,
    type: "Guide / Article"
  },
  {
    id: 12,
    title: "Pramp - Mock Technical Interviews",
    description: "Free peer-to-peer live coding interviews where you take turns interviewing and getting interviewed by other software developers.",
    category: "interview",
    tags: ["Mock Interviews", "Peer Practice", "Live Coding"],
    difficulty: "Medium to Hard",
    link: "https://www.pramp.com/",
    isFeatured: false,
    type: "Interactive Platform"
  }
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestedResource, setSuggestedResource] = useState({ title: '', link: '', desc: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const filteredResources = RESOURCES.filter(resource => {
    const matchesTab = activeTab === 'all' || resource.category === activeTab
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const featuredResources = RESOURCES.filter(r => r.isFeatured && (activeTab === 'all' || r.category === activeTab))

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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 flex items-center justify-center gap-2">
            Placement & Upskilling <span className="text-primary font-extrabold flex items-center"><Sparkles className="w-8 h-8 text-yellow-500 inline mr-1 animate-pulse" />Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Curated preparation paths, learning roadmaps, and core CS resources handpicked by the Enigma Technical Club to propel your tech career.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-card/40 border border-border/40 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {CATEGORIES.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]'
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/40 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground/80"
            />
          </div>
        </div>

        {featuredResources.length > 0 && searchQuery === '' && (
          <div className="mb-12">
            <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2 text-foreground">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              Must-Have Essentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <motion.div
                  key={`featured-${resource.id}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative bg-gradient-to-br from-primary/10 via-card/50 to-card border border-primary/20 hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10 transition-transform group-hover:scale-150 duration-500" />
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {resource.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {resource.tags.map(tag => (
                        <span key={tag} className="text-xs bg-secondary/50 border border-border/40 text-muted-foreground px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform"
                    >
                      Access Resource
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Curated Knowledge Items
          </h2>

          <AnimatePresence mode="popLayout">
            {filteredResources.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-card/20 border border-dashed border-border rounded-2xl"
              >
                <Compass className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold">No resources found</h3>
                <p className="text-muted-foreground text-sm mt-1">Try resetting your category filters or search keywords.</p>
              </motion.div>
            ) : (
              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredResources.map(resource => (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-card hover:bg-card/70 border border-border/40 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <span className="text-xs font-semibold text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-lg">
                          {resource.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {resource.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {resource.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {resource.tags.map(tag => (
                          <span key={tag} className="text-[11px] bg-secondary/30 text-muted-foreground px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Explore link
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Company Target Preparation - Coming Soon */}
        <div className="mt-16 bg-card border border-border/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
          <div className="max-w-3xl text-center mx-auto">
            <span className="px-3.5 py-1 bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-6">
              Coming Soon
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-6 flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              Company Target Preparation
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We are working on dedicated preparation kits for top tech companies. You will soon have access to company-specific syllabuses, notes, lectures, interview questions, video guides, and step-by-step application procedures.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Syllabus & Notes', 'Video Lectures', 'Question Sets', 'Interview Prep', 'Application Steps'].map((item) => (
                <div key={item} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border text-sm font-medium text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-primary/70" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-violet-600/10 via-primary/10 to-indigo-600/10 border border-primary/25 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="max-w-2xl">
            <span className="px-3.5 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-4">
              Club Advice
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4">Enigma's Strategy for Placement Prep</h2>
            <ul className="space-y-3.5 text-muted-foreground text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">1</div>
                <div><strong className="text-foreground">Master 1 OOP Language:</strong> Choose C++ (highly recommended for DSA), Java, or Python and learn all standard libraries (STL, Collections).</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">2</div>
                <div><strong className="text-foreground">Consistently Practice DSA:</strong> Aim for 2 problems daily on LeetCode. Focus on Arrays, HashMaps, Two-Pointers, Trees, and Recursion.</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">3</div>
                <div><strong className="text-foreground">Build 2 Strong Projects:</strong> Avoid template basic projects. Build deployment-ready full stack web/app solutions and link active GitHub URLs.</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">4</div>
                <div><strong className="text-foreground">Revise Core Subjects:</strong> Spend the final 2 weeks reviewing DBMS queries, OS process scheduling, and SDLC models.</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 max-w-xl mx-auto bg-card border border-border/40 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Found a Great Resource?
            </h3>
            <p className="text-muted-foreground text-sm mt-1">Submit links to playlists, sheets, or roadmaps so we can share them with AIMT students.</p>
          </div>

          <form onSubmit={handleSuggestionSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Resource Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Love Babbar DSA Sheet"
                value={suggestedResource.title}
                onChange={(e) => setSuggestedResource({...suggestedResource, title: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Resource Link</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={suggestedResource.link}
                onChange={(e) => setSuggestedResource({...suggestedResource, link: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Short Description</label>
              <textarea
                placeholder="Why should students use this?"
                rows={3}
                value={suggestedResource.desc}
                onChange={(e) => setSuggestedResource({...suggestedResource, desc: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitted}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                formSubmitted 
                  ? 'bg-green-600 text-white' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/20'
              }`}
            >
              {formSubmitted ? '✔ Thank you for contributing!' : 'Submit Resource for Verification'}
            </button>
          </form>
        </div>

      </main>

      <Footer />
    </div>
  )
}
