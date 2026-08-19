'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, ArrowRight, Search, ArrowUpDown, Clock } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EventsSectionSkeleton } from '@/components/skeletons'
import { Reveal, SectionHeading } from '@/components/reveal'

import { getEvents } from '@/app/actions/admin'

// Map date ranges (e.g. "April 5-7, 2026") into a parsed Date object
function parseEventDate(dateString) {
  const cleanDate = dateString.replace(/-[0-9]+/, '')
  return new Date(cleanDate)
}

// Human-readable countdown: e.g. "in 45 days"
function countdownTo(dateString) {
  const target = parseEventDate(dateString).getTime()
  const diff = target - Date.now()
  if (isNaN(target) || diff <= 0) return null
  const days = Math.floor(diff / 86400000)
  if (days > 365) return `in ${Math.floor(days / 365)}y`
  if (days > 30) return `in ${Math.floor(days / 30)}mo`
  if (days > 0) return `in ${days}d`
  return 'this week'
}

const categories = ['All', 'Hackathons', 'Workshops', 'Seminars & Talks']

export function Events() {
  const [isLoading, setIsLoading] = useState(true)
  const [eventsList, setEventsList] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('soonest') // soonest, latest
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    let done = false
    const timeout = setTimeout(() => {
      if (!done) {
        done = true
        setIsLoading(false)
      }
    }, 5000)
    getEvents()
      .then((data) => {
        if (!done) {
          done = true
          clearTimeout(timeout)
          setEventsList(data)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!done) {
          done = true
          clearTimeout(timeout)
          setIsLoading(false)
        }
      })
    return () => {
      clearTimeout(timeout)
      done = true
    }
  }, [])

  // Filter and sort events (plain computation; useMemo caching was stale after
  // SSR hydration in React 19 / Next 16 dev)
  const filteredEvents = eventsList
      .filter((event) => {
        // Category matching
        if (activeCategory !== 'All') {
          const lowerTags = event.tags.map((t) => t.toLowerCase())
          if (activeCategory === 'Hackathons') {
            if (!lowerTags.includes('hackathon') && !lowerTags.includes('competition')) {
              return false
            }
          } else if (activeCategory === 'Workshops') {
            if (
              !lowerTags.includes('workshop') &&
              !lowerTags.includes('bootcamp') &&
              !lowerTags.includes('masterclass')
            ) {
              return false
            }
          } else if (activeCategory === 'Seminars & Talks') {
            if (
              !lowerTags.includes('seminar') &&
              !lowerTags.includes('networking') &&
              !lowerTags.includes('event') &&
              !lowerTags.includes('awareness')
            ) {
              return false
            }
          }
        }

        // Search Query matching
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase()
          const matchesTitle = event.title.toLowerCase().includes(query)
          const matchesDesc = event.description.toLowerCase().includes(query)
          const matchesTags = event.tags.some((t) => t.toLowerCase().includes(query))
          return matchesTitle || matchesDesc || matchesTags
        }

        return true
      })
      .sort((a, b) => {
        const dateA = parseEventDate(a.date)
        const dateB = parseEventDate(b.date)
        return sortBy === 'soonest' ? dateA - dateB : dateB - dateA
      })

  const handleResetFilters = () => {
    setActiveCategory('All')
    setSearchQuery('')
    setSortBy('soonest')
  }

  if (isLoading) return <EventsSectionSkeleton />

  return (
    <section id="events" className="relative py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// What's Happening"
          title="The"
          highlight="calendar"
          description="Workshops, hackathons, and conversations worth your time."
        />

        {/* Search, Filter & Sort — flat hairline bar */}
        <Reveal>
          <div className="mb-10 border-y border-border py-4 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, tags, or topics..."
                className="w-full pl-7 pr-4 py-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:border-b focus:border-[#2563eb] text-sm border-b border-border transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent px-2 py-2 text-sm text-foreground focus:outline-none cursor-pointer border-b border-border focus:border-[#2563eb] transition-colors"
              >
                <option value="soonest">Soonest First</option>
                <option value="latest">Latest First</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* Category Tabs — text links with gold underline when active */}
        <Reveal delay={0.08}>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-14">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[13px] uppercase tracking-[0.14em] pb-1 transition-colors duration-200 border-b-2 ${
                    isActive
                      ? 'border-[#2563eb] text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Events Grid */}
        <motion.div
          layout={!shouldReduceMotion}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-14"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => {
              const cd = countdownTo(event.date)
              return (
                <motion.div
                  key={event.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion || !mounted ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col h-full"
                >
                  <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-border">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="font-mono-accent text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {cd && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 font-mono-accent text-[11px] text-[#2563eb]">
                        <Clock className="w-3.5 h-3.5" />
                        {cd}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-medium text-foreground mt-4 mb-3 group-hover:text-[#2563eb] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-muted-foreground mb-5 leading-relaxed text-sm sm:text-base">
                    {event.description}
                  </p>

                  <div className="space-y-2.5 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#2563eb]" />
                      <span>
                        <span className="text-foreground">{event.date}</span>
                        {' — '}
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#2563eb]" />
                      <span className="text-foreground">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#2563eb]" />
                      <span className="text-foreground">{event.attendees} Expected Attendees</span>
                    </div>
                  </div>

                  <a
                    href={event.formlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center w-fit text-[13px] uppercase tracking-[0.12em] text-foreground border-b border-foreground/30 hover:border-[#2563eb] hover:text-[#2563eb] pb-1 transition-colors group/link"
                  >
                    Register Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={mounted ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-4 max-w-lg mx-auto"
          >
            <h3 className="text-xl font-medium text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find any events matching your selected filter or search keyword.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 border border-border text-sm uppercase tracking-[0.1em] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
            >
              Reset Filters &amp; Search
            </button>
          </motion.div>
        )}

        {/* Event Highlight — flat hairline band */}
        <Reveal delay={0.1}>
          <div className="mt-20 border-y border-border py-12 text-center">
            <span className="eyebrow mb-5">// Flagship</span>
            <h3 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-display">
              Don&apos;t miss our annual hackathon
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Transform your ideas into reality. Compete for prizes, get mentored
              by industry experts, and build lasting connections.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 border border-[#2563eb] text-[#2563eb] text-[13px] uppercase tracking-[0.12em] hover:bg-[#2563eb] hover:text-[#16202f] transition-colors"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
