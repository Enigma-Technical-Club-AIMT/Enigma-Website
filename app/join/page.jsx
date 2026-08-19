import { TerminalOnboarding } from '@/components/terminal-onboarding'
import { Terminal } from 'lucide-react'

export const metadata = {
  title: 'Join Enigma | Interactive Terminal',
  description: 'Initiate the recruitment sequence to join the Enigma Technical Club.',
}

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background vignette */}
      <div className="absolute inset-0 hero-vignette -z-10" />

      <div className="text-center mb-12 z-10">
        <span className="eyebrow mb-6">// Secure Onboarding Channel</span>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 font-display">
          Initiate <span className="font-serif-accent text-[#2563eb]">Recruitment</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Prove your worth. Connect to the Enigma Mainframe and initiate the joining
          sequence to gain access to the club.
        </p>
      </div>

      <div className="w-full z-10 max-w-4xl">
        <TerminalOnboarding />
      </div>
    </div>
  )
}
