'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    `
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
    `
  }
}

export default function BlogPost() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  const post = mockBlogs[slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/blog')} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Back to Blog
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-semibold">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-semibold border-l border-border pl-4">
              Back to all posts
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="mb-10 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                <Image src={post.authorImage} alt={post.author} width={24} height={24} />
              </div>
              <span className="text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-border/50">
          <Image src={post.image} alt="Blog Cover" fill className="object-cover" />
        </div>

        {/* Markdown Content rendered via ReactMarkdown */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border/50">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-border">
              <Image src={post.authorImage} alt={post.author} width={48} height={48} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Written By</p>
              <p className="font-semibold text-foreground text-lg">{post.author}</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all shadow-md">
            Follow Author
          </button>
        </footer>

      </article>
    </div>
  )
}
