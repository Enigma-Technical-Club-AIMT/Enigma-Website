import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Members', href: '#members' },
    { label: 'Events', href: '#events' },
  ]

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'Tutorials', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'FAQs', href: '#' },
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gradient-to-t from-card to-background border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden">
                <Image
                  src="/enigma.jpg"
                  alt="Enigma Technical Club Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg text-foreground">Enigma</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students to innovate, collaborate, and excel in the
              world of technology at Ambalika Institute of Management &
              Technology.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <h4 className="font-bold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    href={resource.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:enigmatech@aimt.ac.in"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  enigma@ambalika.co.in
                </a>
              </li>
              <li className="text-muted-foreground">
                <p>Lucknow, Uttar Pradesh</p>
                <p>India</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {'\u00A9'} {currentYear} Enigma Tech Club. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
          </div>
          <p className="text-muted-foreground text-sm">
            Made with love at AIMT
          </p>
        </div>

        {/* Institute Attribution */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs">
            Enigma Tech Club is a student organization of{' '}
            <span className="font-semibold text-foreground">
              Ambalika Institute of Management & Technology
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
