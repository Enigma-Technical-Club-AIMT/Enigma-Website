'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden">
              <Image
                src="/enigma.jpg"
                alt="Enigma Technical Club Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline group-hover:text-primary transition-colors">
              Enigma
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="#home"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>

            <Link
              href="#events"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors"
            >
              Events
            </Link>

            {/* Members Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors flex items-center space-x-1">
                <span>Members</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link
                  href="/#members"
                  className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Current Team
                </Link>
                <Link
                  href="/alumni"
                  className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Previous Members
                </Link>
                <Link
                  href="/new-members"
                  className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  New Members
                </Link>
              </div>
            </div>

            <Link
              href="#contact"
              className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card border-b border-border/50 rounded-b-lg animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="#home"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                About
              </Link>

              <Link
                href="#events"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                Events
              </Link>

              {/* Mobile Dropdown */}
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === 'members' ? null : 'members'
                  )
                }
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-between"
              >
                <span>Members</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === 'members' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'members' && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/#members"
                    className="block px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  >
                    Current Team
                  </Link>
                  <Link
                    href="/alumni"
                    className="block px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  >
                    Previous Members
                  </Link>
                  <Link
                    href="/new-members"
                    className="block px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  >
                    New Members
                  </Link>
                </div>
              )}

              <Link
                href="#contact"
                className="block px-3 py-2 mt-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
