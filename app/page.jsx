import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Story } from '@/components/story'
import { Leadership } from '@/components/leadership'
import { About } from '@/components/about'
import { Members } from '@/components/members'
import { Events } from '@/components/events'
import { SkillsCourses } from '@/components/skills-courses'
import { Journey } from '@/components/journey'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Story />
      <About />
      <Members />
      <Events />
      <Leadership />
      <SkillsCourses />
      <Journey />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}
