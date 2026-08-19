import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PageHero({ eyebrow, title, highlight, description, back = '/' }) {
  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 right-0 w-96 h-96 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, #1f5af218 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, #8b5cf618 0%, transparent 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl">
          <Link
            href={back}
            className="eyebrow !no-underline hover:underline inline-flex items-center gap-2 mb-8"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Home
          </Link>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display-xxl-lite mb-6 leading-[1.05] text-balance">
            {title}{' '}
            <span className="font-serif-accent text-brand-gradient">{highlight}</span>
          </h1>
          {description && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Value ticker ribbon */}
        <div className="mt-10 overflow-hidden border-y border-border bg-card/70 backdrop-blur-sm">
          <div className="ticker-track">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center shrink-0 px-4 py-3">
                {[
                  'Innovation',
                  'Technology',
                  'Community',
                  'Craft',
                  'Learning',
                  'Growth',
                ].map((word) => (
                  <span
                    key={`${i}-${word}`}
                    className="flex items-center gap-4 font-mono-accent text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    <span>{word}</span>
                    <span className="text-[#8b5cf6]">&#10022;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
