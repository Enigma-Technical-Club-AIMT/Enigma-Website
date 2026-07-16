'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'
import Image from 'next/image'

export default function BlogPage() {
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
      image: '/placeholder.svg'
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
      image: '/placeholder.svg'
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
      image: '/placeholder.svg'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Link>
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 border border-primary/20"
          >
            <BookOpen className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Enigma <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Engineering Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Deep dives, technical tutorials, and project showcases written by the core members of the Enigma Technical Club.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mockBlogs.map((blog) => (
            <motion.article 
              key={blog.id}
              variants={itemVariants}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Cover Image Placeholder */}
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                      <Image src={blog.authorImage} alt={blog.author} width={32} height={32} className="object-cover bg-muted" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{blog.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${blog.id}`}
                    className="flex items-center gap-1 text-sm font-bold text-primary hover:text-secondary transition-colors"
                  >
                    Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
