import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Instagram, Mail, MapPin } from 'lucide-react'

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
      hoverColor: 'hover:text-primary hover:border-primary/50 hover:bg-primary/10',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/school/ambalika-institute-of-management-&-technology/',
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/ambalika_group/',
      label: 'Instagram',
      hoverColor: 'hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10',
    },
  ]

  return (
    <footer className="bg-gradient-to-t from-card/80 to-background border-t border-border/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-border/50">
                <Image
                  src="/enigma.jpg"
                  alt="Enigma Technical Club Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg text-foreground hover:text-primary transition-colors cursor-default">
                Enigma
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students to innovate, collaborate, and excel in the
              world of technology at Ambalika Institute of Management &amp;
              Technology.
            </p>
            <div className="flex gap-2.5 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-9 h-9 rounded-lg border border-border/50 text-muted-foreground transition-all duration-200 ${social.hoverColor}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Members Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
              Team
            </h4>
            <ul className="space-y-2.5">
              {memberLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href="mailto:enigma@ambalika.co.in"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  enigma@ambalika.co.in
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground font-medium">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
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

        {/* Divider */}
        <div className="border-t border-border/30 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Enigma Technical Club. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            Made with 💜 at AIMT
          </p>
        </div>

        {/* Institute Attribution */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Enigma Technical Club is an official student body of{' '}
            <a
              href="https://aimt.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Ambalika Institute of Management &amp; Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
