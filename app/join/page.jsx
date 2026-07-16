import { TerminalOnboarding } from '@/components/terminal-onboarding'
import { Terminal } from 'lucide-react'

export const metadata = {
  title: 'Join Enigma | Interactive Terminal',
  description: 'Initiate the recruitment sequence to join the Enigma Technical Club.',
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="text-center mb-12 space-y-4 z-10">
        <div className="inline-flex items-center justify-center p-3 bg-secondary/30 rounded-2xl border border-secondary/50 mb-2">
          <Terminal className="w-8 h-8 text-secondary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Recruitment</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Prove your worth. Connect to the Enigma Mainframe and initiate the joining sequence to gain access to the club.
        </p>
      </div>

      <div className="w-full z-10">
        <TerminalOnboarding />
      </div>

    </div>
  )
}
