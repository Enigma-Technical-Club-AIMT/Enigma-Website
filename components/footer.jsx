import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About Us', href: '/#about' },
    { label: 'Events', href: '/#events' },
    { label: 'Explore', href: '/explore' },
  ]

  const memberLinks = [
    { label: 'Current Team', href: '/#members' },
    { label: 'Previous Members', href: '/alumni' },
    { label: 'New Members', href: '/new-members' },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Enigma-Technical-Club-AIMT',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/school/ambalika-institute-of-management-&-technology/',
      label: 'LinkedIn',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/ambalika_group/',
      label: 'Instagram',
    },
  ]

  return (
    <footer className="footer-band relative border-t border-border">
      {/* CTA band */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
        <div className="max-w-xl">
          <span className="eyebrow mb-5">// Join Us</span>
          <h3 className="text-4xl md:text-5xl font-medium leading-[1.08] font-display">
            Ready to decode the <span className="font-serif-accent text-[#2563eb]">Enigma</span>?
          </h3>
          <p className="text-muted-foreground mt-4">
            Join a community where your curiosity meets opportunity.
          </p>
        </div>
        <Link
          href="/join"
          className="btn-brand group inline-flex items-center px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.12em] font-semibold shrink-0"
        >
          Join Today
          <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 border-t border-border">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 overflow-hidden">
                <Image
                  src="/enigma.jpg"
                  alt="Enigma Technical Club Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif-accent text-xl text-foreground">Enigma</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students to innovate, collaborate, and excel in
              technology at Ambalika Institute of Management &amp; Technology.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5 font-mono-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Members Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5 font-mono-accent">
              Team
            </h4>
            <ul className="space-y-3">
              {memberLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5 font-mono-accent">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:enigma@ambalika.co.in"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#2563eb] shrink-0" />
                  enigma@ambalika.co.in
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                <span>
                  AIMT Campus,
                  <br />
                  Lucknow, Uttar Pradesh,
                  <br />
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-muted-foreground text-xs font-mono-accent tracking-[0.1em]">
            &copy; {currentYear} Enigma Technical Club. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">Made with care at AIMT</p>
        </div>

        {/* Institute Attribution */}
        <div className="pb-10 pt-4 text-center">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Enigma Technical Club is an official student body of{' '}
            <a
              href="https://aimt.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-[#2563eb] transition-colors"
            >
              Ambalika Institute of Management &amp; Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
