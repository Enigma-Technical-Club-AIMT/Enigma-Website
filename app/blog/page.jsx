'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, Clock, PenTool } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Reveal, SectionHeading } from '@/components/reveal'

// In a real app, you would fetch this from your database or CMS
const mockBlogs = [
  {
    id: 'building-our-own-rag-system',
    title: 'Building a Custom RAG System for Enigma',
    excerpt: 'How we used vector databases and LLMs to create an intelligent knowledge base for our technical club.',
    author: 'Sparsh Mishra',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparsh',
    date: 'July 15, 2026',
    readTime: '8 min read',
    category: 'AI & ML',
    image: '/placeholder.svg',
  },
  {
    id: 'mastering-dynamic-programming',
    title: 'Mastering Dynamic Programming: A Visual Guide',
    excerpt: 'Breaking down complex DP problems into manageable subproblems with interactive visualizations.',
    author: 'Sparsh Mishra',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparsh2',
    date: 'July 2, 2026',
    readTime: '12 min read',
    category: 'Algorithms',
    image: '/placeholder.svg',
  },
  {
    id: 'nextjs-16-turbopack-migration',
    title: 'Migrating the Club Website to Next.js 16',
    excerpt: 'Our experience upgrading to Turbopack and implementing React Server Components for maximum performance.',
    author: 'Sparsh Mishra',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparsh3',
    date: 'June 28, 2026',
    readTime: '6 min read',
    category: 'Web Dev',
    image: '/placeholder.svg',
  },
]

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-20 flex-1 w-full">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-[#2563eb] transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Link>
        </div>

        {/* Header — cinematic display */}
        <div className="relative text-center mb-16 overflow-hidden">
          <div
            className="pointer-events-none absolute -top-20 right-0 w-72 h-72 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #2563eb40 0%, transparent 70%)' }}
          />
          <span className="eyebrow !text-[#2563eb] mb-6">// From the Enigma Desk</span>
          <h1 className="display-xxl-lite mb-5">
            Enigma{' '}
            <span className="font-serif-accent text-gold-gradient">Engineering Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Deep dives, technical tutorials, and project showcases written by the
            core members of the Enigma Technical Club.
          </p>
          <div className="mt-10 overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm">
            <div className="ticker-track">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center shrink-0 px-4 py-3">
                  {['Tutorials', 'Projects', 'AI &amp; ML', 'Web Dev', 'Algorithms', 'Ship It'].map((word) => (
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

        {/* Blog List — flat hairline rows */}
        <div className="border-t border-border">
          {mockBlogs.map((blog, index) => (
            <Reveal key={blog.id} delay={(index % 3) * 0.06} className="h-full">
              <motion.article
                initial={mounted ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-border py-10 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start md:items-center gap-6 group cursor-pointer"
              >
                <Link href={`/blog/${blog.id}`} className="contents">
                  <span className="font-serif-accent text-3xl text-muted-foreground/30 md:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground mb-3">
                      <span className="font-mono-accent uppercase tracking-[0.12em] text-[#2563eb]">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {blog.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-medium text-foreground mb-3 group-hover:text-[#2563eb] transition-colors leading-snug">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-7 h-7 rounded-full bg-muted grayscale"
                        width={28}
                        height={28}
                      />
                      <span className="text-sm text-foreground/80">{blog.author}</span>
                    </div>
                  </div>
                </Link>

                <Link
                  href={`/blog/${blog.id}`}
                  className="hidden md:inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-muted-foreground hover:text-[#2563eb] transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
