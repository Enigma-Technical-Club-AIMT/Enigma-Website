'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // Close menu when clicking outside the nav
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false)
        setOpenDropdown(null)
      }
    }

    // Close menu on Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setOpenDropdown(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
    setOpenDropdown(null)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMenu}>
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
            <Link href="/#home" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/#about" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="/#events" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">Events</Link>
            <Link href="/resources" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">Resources</Link>

            {/* Members Dropdown */}
            <div className="relative group">
              <button
                className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors flex items-center space-x-1"
                aria-haspopup="true"
              >
                <span>Members</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link href="/#members" className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">Current Team</Link>
                <Link href="/alumni" className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">Previous Members</Link>
                <Link href="/new-members" className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">New Members</Link>
              </div>
            </div>

            <Link
              href="/#contact"
              className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Contact
            </Link>

            <ThemeToggle />
          </div>

          {/* Mobile hamburger button + theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation — smooth slide-down/fade transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-card border-b border-border/50 rounded-b-lg px-2 pt-2 pb-3 space-y-1">
            <Link href="/#home" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">Home</Link>
            <Link href="/#about" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">About</Link>
            <Link href="/#events" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">Events</Link>
            <Link href="/resources" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">Resources</Link>

            {/* Mobile Members Dropdown */}
            <button
              onClick={() => setOpenDropdown(openDropdown === 'members' ? null : 'members')}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-between"
              aria-expanded={openDropdown === 'members'}
            >
              <span>Members</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openDropdown === 'members' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Mobile Members sub-menu — smooth slide */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                openDropdown === 'members' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 space-y-1 pb-1">
                <Link href="/#members" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">Current Team</Link>
                <Link href="/alumni" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">Previous Members</Link>
                <Link href="/new-members" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">New Members</Link>
              </div>
            </div>

            <Link
              href="/#contact"
              onClick={closeMenu}
              className="block px-3 py-2 mt-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
