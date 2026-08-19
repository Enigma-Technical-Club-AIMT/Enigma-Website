'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Crown, ChevronUp, Code2, Loader2, ArrowLeft, Zap } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionHeading } from '@/components/reveal'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLeaderboard(data.data)
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch leaderboard", err)
        setIsLoading(false)
      })
  }, [])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border border-border bg-[#f2f0ea] p-3 shadow-xl">
          <p className="font-medium text-foreground mb-1">{label}</p>
          <p className="text-[#2563eb] text-sm">
            {payload[0].value} Problems Solved
          </p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-7 h-7 text-[#2563eb] animate-spin mb-4" />
        <p className="text-muted-foreground text-sm animate-pulse">Syncing with LeetCode &amp; Codeforces...</p>
      </div>
    )
  }

  const medalColor = (index) =>
    index === 0 ? 'text-[#e8c85a]' : index === 1 ? 'text-[#b9b9b9]' : 'text-[#b48a4e]'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-16 flex-1 w-full">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-[#2563eb] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header — cinematic display */}
        <div className="relative text-center mb-14 overflow-hidden">
          <div
            className="pointer-events-none absolute -top-20 right-0 w-72 h-72 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #2563eb40 0%, transparent 70%)' }}
          />
          <span className="eyebrow !text-[#2563eb] mb-6">// The Arena</span>
          <h1 className="display-xxl-lite mb-5">
            Club <span className="font-serif-accent text-gold-gradient">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time competitive programming statistics. Compete, rank up, and
            showcase your problem-solving skills to top recruiters.
          </p>
          <div className="mt-10 overflow-hidden border-y border-border bg-background/60 backdrop-blur-sm">
            <div className="ticker-track">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center shrink-0 px-4 py-3">
                  {['LeetCode', 'Codeforces', 'Rank Up', 'Compete', 'Ship It', 'Recruiters'].map((word) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Top 3 — flat hairline rows */}
          <div className="lg:col-span-1">
            <h2 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#e8c85a]" />
              Top Performers
            </h2>
            <div className="border-t border-border">
              {leaderboard.slice(0, 3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={mounted ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border py-5 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{user.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Code2 className="w-3 h-3" /> {user.platform}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-serif-accent ${medalColor(index)}`}>
                        {user.problemsSolved}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Solved</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra stat */}
            <div className="border-t border-border py-5 flex items-center gap-4">
              <Zap className="w-5 h-5 text-[#2563eb]" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-foreground">Keep the streak alive</p>
                <p className="text-xs text-muted-foreground">Daily practice compounds. Small wins every day.</p>
              </div>
            </div>
          </div>

          {/* Full Rankings */}
          <div className="lg:col-span-2">
            {/* Chart */}
            <div className="border-t border-border pt-8 mb-10">
              <h3 className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#2563eb]" /> Solving Velocity
              </h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leaderboard}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      dx={-10}
                    />
                    <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<CustomTooltip />} />
                    <Bar dataKey="problemsSolved" radius={[0, 0, 0, 0]} fill="#2563eb">
                      {leaderboard.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index < 3 ? '#2563eb' : '#2563eb'} fillOpacity={index < 3 ? 1 : 0.4} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table */}
            <div className="border-t border-border overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground border-b border-border">
                    <th className="px-4 py-4 font-normal">#</th>
                    <th className="px-4 py-4 font-normal">Member</th>
                    <th className="px-4 py-4 text-center font-normal">Streak</th>
                    <th className="px-4 py-4 text-right font-normal">Global Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={mounted ? { opacity: 0 } : { opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="border-b border-border last:border-0 hover:bg-[#f2f0ea] transition-colors"
                    >
                      <td className="px-4 py-4 font-mono-accent text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full bg-muted grayscale" />
                          <div>
                            <div className="font-medium text-sm text-foreground flex items-center gap-1.5">
                              {user.name}
                              {user.badge !== 'None' && (
                                <span className="font-mono-accent px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] border border-[#2563eb]/40 text-[#2563eb]">
                                  {user.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono-accent">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 font-mono-accent text-sm text-foreground">
                          <Flame className="w-3.5 h-3.5 text-[#e88a3f]" /> {user.streak}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-mono-accent text-sm text-foreground">
                        {user.globalRank.toLocaleString()}
                        <ChevronUp className="w-4 h-4 text-[#6dbb6d] inline ml-1" />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
