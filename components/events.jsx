'use client'

import { useState, useEffect, useMemo } from 'react'
import { Calendar, MapPin, Users, ArrowRight, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EventsSectionSkeleton } from '@/components/skeletons'

import { getEvents } from '@/app/actions/admin'

// Map date ranges (e.g. "April 5-7, 2026") into a parsed Date object
function parseEventDate(dateString) {
  const cleanDate = dateString.replace(/-[0-9]+/, '')
  return new Date(cleanDate)
}

export function Events() {
  const [isLoading, setIsLoading] = useState(true)
  const [eventsList, setEventsList] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('soonest') // soonest, latest

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    getEvents().then((data) => {
      setEventsList(data)
      setIsLoading(false)
    })
  }, [])

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return eventsList
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
  }, [activeCategory, searchQuery, sortBy])

  const handleResetFilters = () => {
    setActiveCategory('All')
    setSearchQuery('')
    setSortBy('soonest')
  }

  if (isLoading) return <EventsSectionSkeleton />

  return (
    <section
      id="events"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for exciting workshops, hackathons, and networking
            opportunities
          </p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4 p-4 rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, tags, or topics..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
            />
          </div>

          {/* Sorting and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Order */}
            <div className="flex items-center gap-2 text-sm">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="soonest">Soonest First</option>
                <option value="latest">Latest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['All', 'Hackathons', 'Workshops', 'Seminars & Talks'].map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'bg-card/65 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Events Grid with Motion Animations */}
        <motion.div
          layout={!shouldReduceMotion}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 group"
              >
                {/* Top gradient bar */}
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                <div className="p-6 sm:p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-border/30">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {event.date}
                        </p>
                        <p className="text-xs">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <p className="text-sm font-semibold text-foreground">
                        {event.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="w-5 h-5 text-accent" />
                      <p className="text-sm font-semibold text-foreground">
                        {event.attendees} Expected Attendees
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={event.formlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Register Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-4 border border-dashed border-border/50 rounded-2xl bg-card/10 backdrop-blur-sm max-w-lg mx-auto"
          >
            <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find any events matching your selected filter or search keyword.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Reset Filters &amp; Search
            </button>
          </motion.div>
        )}

        {/* Event Highlight Banner */}
        <div
          className="mt-16 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 rounded-2xl p-8 sm:p-12 text-center animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {"Don't Miss Our Annual Hackathon!"}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your ideas into reality. Compete for amazing prizes, get
            mentored by industry experts, and build connections with tech
            enthusiasts across the region.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors hover:shadow-lg hover:shadow-primary/50"
          >
            Learn More
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
