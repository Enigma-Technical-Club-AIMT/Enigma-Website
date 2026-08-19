'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal, SectionHeading } from '@/components/reveal'

const faqs = [
  {
    question: 'Do I need prior coding experience to join?',
    answer:
      "Not at all. Enigma is open to students of every skill level. Our onboarding program starts from the basics, and our seniors mentor newcomers every step of the way.",
  },
  {
    question: 'How do I become a member?',
    answer:
      "Visit our Join page, complete the short onboarding walkthrough, and submit the registration form. Membership is free and open year-round for AIMT students.",
  },
  {
    question: 'What activities does Enigma host?',
    answer:
      "We organize workshops, hackathons, project-building sprints, tech talks, coding competitions, and community events throughout the academic year.",
  },
  {
    question: 'Can I lead a workshop or propose an event?',
    answer:
      "Absolutely. We encourage members to propose ideas and take ownership of events. Many of our best workshops were first suggested by first-year members.",
  },
  {
    question: 'Are there any benefits or certifications?',
    answer:
      "Active members receive certificates for workshops and projects, recognition on our leaderboard, and strong project portfolios that help with placements.",
  },
]

export function Faq() {
  return (
    <section className="relative py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="// FAQ"
            title="The questions,"
            highlight="answered"
            description="Everything you need to know about joining and growing with Enigma."
          />
        </div>
        <Reveal>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-[#2563eb] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
