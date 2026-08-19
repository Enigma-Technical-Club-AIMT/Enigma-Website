'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// Mock Data Store (In production, fetch from database or CMS using slug)
const mockBlogs = {
  'building-our-own-rag-system': {
    title: 'Building a Custom RAG System for Enigma',
    author: 'Sparsh Mishra',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparsh3',
    date: 'July 15, 2026',
    readTime: '8 min read',
    category: 'AI & ML',
    image: '/placeholder.svg',
    content: `
# Introduction to RAG

Retrieval-Augmented Generation (RAG) is transforming how we interact with large knowledge bases. For the Enigma Technical Club, we had a massive repository of past event details, project documentation, and technical roadmaps. 

Instead of forcing students to dig through Google Drive folders, we decided to build a custom RAG pipeline!

## The Architecture

Our pipeline consists of three main stages:
1. **Document Ingestion**: Parsing PDFs and Markdown files.
2. **Vectorization**: Using OpenAI embeddings to convert text into vector space.
3. **Retrieval**: Querying Pinecone DB to find the most relevant context before passing it to the LLM.

### Code Example

Here is a quick snippet of how we generate embeddings:

\`\`\`javascript
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}
\`\`\`

## Conclusion
Building this RAG system taught our members vital skills in AI infrastructure and scalable backend engineering. Stay tuned for part 2 where we dive into the deployment process!
    `,
  },
  'mastering-dynamic-programming': {
    title: 'Mastering Dynamic Programming: A Visual Guide',
    author: 'Sparsh Mishra',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparsh2',
    date: 'July 2, 2026',
    readTime: '12 min read',
    category: 'Algorithms',
    image: '/placeholder.svg',
    content: `
# Demystifying Dynamic Programming

Dynamic Programming (DP) is often the most feared topic in competitive programming. However, once you learn to visualize the state transitions, it becomes incredibly intuitive.

## Top-Down vs Bottom-Up

There are two primary ways to approach a DP problem:
* **Memoization (Top-Down)**: Starting from the main problem and recursively solving subproblems while caching the results.
* **Tabulation (Bottom-Up)**: Solving the smallest subproblems first and building up to the main problem using an array or matrix.

> "Those who cannot remember the past are condemned to repeat it." - Dynamic Programming in a nutshell.

Let's look at the classic Fibonacci sequence:

\`\`\`javascript
// Bottom-up Tabulation
function fibonacci(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}
\`\`\`

## The 5-Step Framework
1. Define the objective function.
2. Identify base cases.
3. Write down a recurrence relation.
4. Decide on execution order (Top-down or Bottom-up).
5. Optimize space complexity if possible.
    `,
  },
}

export default function BlogPost() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  const post = mockBlogs[slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Navbar />
        <div className="border border-border p-10 text-center max-w-md mt-16">
          <p className="font-mono-accent text-[#2563eb] text-sm mb-3">404 // Post Not Found</p>
          <h1 className="text-3xl font-medium mb-3 font-display">Lost in the Signal</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-2.5 border border-[#2563eb] text-[#2563eb] text-[13px] uppercase tracking-[0.12em] hover:bg-[#2563eb] hover:text-[#16202f] transition-colors"
          >
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-28 pb-20 flex-1">
        <article className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-10 text-sm">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-[#2563eb] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span className="text-border">|</span>
            <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-[#2563eb] transition-colors">
              Back to all posts
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <span className="font-mono-accent text-[11px] uppercase tracking-[0.14em] text-[#2563eb] mb-5 block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.15] font-display">
              {post.title}
            </h1>
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full bg-muted grayscale" width={24} height={24} />
                <span className="text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</div>
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</div>
            </div>
          </header>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-medium prose-headings:font-display prose-a:text-[#2563eb] hover:prose-a:text-[#2563eb]/80 prose-pre:bg-[#16202f] prose-pre:border prose-pre:border-border">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full bg-muted grayscale" width={48} height={48} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Written By</p>
                <p className="font-medium text-foreground text-lg">{post.author}</p>
              </div>
            </div>
            <Link
              href="/blog"
              className="px-6 py-2.5 border border-border text-sm text-muted-foreground hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
            >
              More Articles
            </Link>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  )
}
