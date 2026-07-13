'use client'

import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton loader for a single member card
 */
export function MemberCardSkeleton() {
  return (
    <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton loader for the Members section grid
 */
export function MembersSectionSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-8 w-48 mx-auto rounded-md" />
          <Skeleton className="h-4 w-80 mx-auto rounded-md" />
        </div>
        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Skeleton loader for a single event card
 */
export function EventCardSkeleton() {
  return (
    <div className="bg-card/50 border border-border/50 rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-2/3 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-4 w-1/4 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg mt-2" />
    </div>
  )
}

/**
 * Skeleton loader for the Events section grid
 */
export function EventsSectionSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-8 w-40 mx-auto rounded-md" />
          <Skeleton className="h-4 w-72 mx-auto rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Skeleton loader for a single skill/course card
 */
export function SkillCardSkeleton() {
  return (
    <div className="bg-card/50 border border-border/50 rounded-2xl p-6 space-y-4">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <Skeleton className="h-5 w-2/3 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-4/5 rounded-md" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

/**
 * Skeleton loader for the Skills / Courses section grid
 */
export function SkillsSectionSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-8 w-56 mx-auto rounded-md" />
          <Skeleton className="h-4 w-80 mx-auto rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
