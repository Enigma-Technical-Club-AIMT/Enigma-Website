'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/leaderboard', label: 'Leaderboard' },
]

const memberLinks = [
  { href: '/#members', label: 'Current Team' },
  { href: '/alumni', label: 'Previous Members' },
  { href: '/join', label: 'Join Us (Terminal)', primary: true },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false)
        setOpenDropdown(null)
      }
    }

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
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative w-9 h-9 overflow-hidden">
              <Image
                src="/enigma.jpg"
                alt="Enigma Technical Club Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-serif-accent text-xl text-foreground hidden sm:inline">
              Enigma
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}

            {/* Members Dropdown */}
            <div className="relative group">
              <button className="text-[13px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
                <span>Members</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-card border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1.5 shadow-lg">
                {memberLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-2 text-sm ${
                      l.primary
                        ? 'text-[#2563eb]'
                        : 'text-muted-foreground hover:text-foreground'
                    } hover:text-foreground transition-colors`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/join"
              className="btn-brand inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] px-5 py-2.5 rounded-full font-semibold"
            >
              Join Enigma
            </Link>
          </div>

          {/* Mobile hamburger + theme toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground transition-colors p-1 focus:outline-none"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-card border border-border mt-2 px-3 pt-2 pb-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="block px-3 py-2.5 text-[13px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setOpenDropdown(openDropdown === 'members' ? null : 'members')}
              className="w-full text-left px-3 py-2.5 text-[13px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between"
              aria-expanded={openDropdown === 'members'}
            >
              <span>Members</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openDropdown === 'members' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                openDropdown === 'members' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 space-y-1 pb-1">
                {memberLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    className={`block px-3 py-2 text-sm ${
                      l.primary ? 'text-[#2563eb]' : 'text-muted-foreground'
                    } hover:text-foreground transition-colors`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/join"
              onClick={closeMenu}
              className="block px-3 py-3 mt-2 btn-brand rounded-xl text-[13px] uppercase tracking-[0.14em] font-semibold text-center"
            >
              Join Enigma
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
