'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, Medal, Flame, Star, Crown, ChevronUp, Code2, Loader2, ArrowUpRight, ArrowLeft
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import Image from 'next/image'
import Link from 'next/link'

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

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl">
          <p className="font-bold text-foreground mb-1">{label}</p>
          <p className="text-primary font-semibold text-sm">
            {payload[0].value} Problems Solved
          </p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Syncing with LeetCode & Codeforces...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
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
            <Trophy className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Leaderboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Real-time competitive programming statistics. Compete, rank up, and showcase your problem-solving skills to top recruiters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Top 3 Podium (Left Column) */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Top Performers
            </h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {leaderboard.slice(0, 3).map((user, index) => (
                <motion.div 
                  key={user.id}
                  variants={itemVariants}
                  className="relative p-5 rounded-2xl bg-card border border-border/50 shadow-lg overflow-hidden group hover:border-primary/50 transition-colors"
                >
                  {/* Rank Indicator */}
                  <div className={`absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45 ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                  } opacity-20 group-hover:scale-110 transition-transform duration-500`} />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                      <div className={`absolute -inset-1 rounded-full blur opacity-40 ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      }`} />
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-background relative">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-background font-bold text-xs ${
                        index === 0 ? 'bg-yellow-500 text-yellow-950' : 
                        index === 1 ? 'bg-gray-300 text-gray-900' : 
                        'bg-amber-600 text-amber-950'
                      }`}>
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{user.name}</h3>
                      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Code2 className="w-3 h-3" /> {user.platform}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-black text-primary">{user.problemsSolved}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Solved</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Full Rankings Table (Middle & Right Column) */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden flex flex-col h-full">
              
              {/* Chart Section */}
              <div className="p-6 border-b border-border/50 bg-muted/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
                  <BarChart className="w-4 h-4" /> Solving Velocity
                </h3>
                <div className="h-48 w-full">
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
                      <Bar dataKey="problemsSolved" radius={[4, 4, 0, 0]}>
                        {leaderboard.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Table Section */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground font-bold border-b border-border/50">
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">Member</th>
                      <th className="px-6 py-4 text-center">Streak</th>
                      <th className="px-6 py-4 text-right">Global Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, index) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        key={user.id} 
                        className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-muted-foreground">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full bg-muted" />
                            <div>
                              <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                                {user.name}
                                {user.badge !== 'None' && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold bg-primary/10 text-primary border border-primary/20">
                                    {user.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-500/20">
                            <Flame className="w-3.5 h-3.5" /> {user.streak}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-foreground">
                          {user.globalRank.toLocaleString()}
                          <ChevronUp className="w-4 h-4 text-green-500 inline ml-1" />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
