'use client'

import {
  Code2,
  Database,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Smartphone,
  Cpu,
  GitBranch,
  Figma,
  Terminal,
  Globe,
  Bot,
} from 'lucide-react'

// Infinitely scrolling strip of tech domains explored at Enigma.
const items = [
  { icon: Code2, label: 'Web Development' },
  { icon: Database, label: 'Backend & Databases' },
  { icon: BrainCircuit, label: 'AI & Machine Learning' },
  { icon: Cloud, label: 'Cloud Computing' },
  { icon: ShieldCheck, label: 'Cybersecurity' },
  { icon: Smartphone, label: 'Mobile Development' },
  { icon: Cpu, label: 'IoT & Hardware' },
  { icon: GitBranch, label: 'DevOps & Git' },
  { icon: Figma, label: 'UI/UX Design' },
  { icon: Terminal, label: 'Open Source' },
  { icon: Globe, label: 'Networking' },
  { icon: Bot, label: 'Generative AI' },
]

export function TechMarquee() {
  const row = (shift) => (
    <div className="flex shrink-0 items-center gap-6 pr-6" style={{ animation: `marquee 30s linear infinite`, animationDelay: `${shift}s` }}>
      {items.map((item, i) => (
        <div
          key={`${i}-${shift}`}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full glass whitespace-nowrap"
        >
          <item.icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="relative py-10 overflow-hidden border-y border-border/30 bg-card/20">
      <div className="flex w-max gap-6 animate-marquee">
        {row(0)}
        {row(0)}
      </div>
    </div>
  )
}
