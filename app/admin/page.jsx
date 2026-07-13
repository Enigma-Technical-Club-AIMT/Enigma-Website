'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Lock,
  User,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Users,
  MapPin,
  Mail,
  Globe,
  Loader2,
  ArrowLeft,
  X,
  FileText,
  CheckCircle,
} from 'lucide-react'
import {
  verifyAuth,
  login,
  logout,
  getMembers,
  saveMember,
  deleteMember,
  getEvents,
  saveEvent,
  deleteEvent,
} from '@/app/actions/admin'

export default function AdminPage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [activeTab, setActiveTab] = useState('events') // 'events', 'members'
  const [members, setMembers] = useState([])
  const [events, setEvents] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(false)

  // Edit/Add Modals
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null) // null for Add New
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: '',
    specialty: '',
    branch: '',
    image: '',
    social: { github: '', linkedin: '', email: '' },
  })

  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null) // null for Add New
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    attendees: 0,
    description: '',
    tags: '',
    formlink: '',
  })

  const router = useRouter()

  useEffect(() => {
    // Verify auth status on load
    verifyAuth().then((authStatus) => {
      setIsAuthenticated(authStatus)
      setIsCheckingAuth(false)
      if (authStatus) {
        loadDashboardData()
      }
    })
  }, [])

  const loadDashboardData = async () => {
    setIsDataLoading(true)
    try {
      const [membersData, eventsData] = await Promise.all([
        getMembers(),
        getEvents(),
      ])
      setMembers(membersData)
      setEvents(eventsData)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsDataLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)
    try {
      const res = await login(username, password)
      if (res.success) {
        setIsAuthenticated(true)
        loadDashboardData()
      } else {
        setLoginError(res.error || 'Authentication failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setLoginError('An error occurred. Please try again.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setIsAuthenticated(false)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  // --- Member Operations ---
  const openMemberModal = (member = null) => {
    if (member) {
      setEditingMember(member)
      setMemberForm({
        id: member.id,
        name: member.name || '',
        role: member.role || '',
        specialty: member.specialty || '',
        branch: member.branch || '',
        image: member.image || '',
        social: {
          github: member.social?.github || '',
          linkedin: member.social?.linkedin || '',
          email: member.social?.email || '',
        },
      })
    } else {
      setEditingMember(null)
      setMemberForm({
        name: '',
        role: '',
        specialty: '',
        branch: '',
        image: '',
        social: { github: '', linkedin: '', email: '' },
      })
    }
    setIsMemberModalOpen(true)
  }

  const handleSaveMember = async (e) => {
    e.preventDefault()
    try {
      await saveMember(memberForm)
      setIsMemberModalOpen(false)
      loadDashboardData()
    } catch (err) {
      console.error('Failed to save member:', err)
    }
  }

  const handleDeleteMember = async (id) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id)
        loadDashboardData()
      } catch (err) {
        console.error('Failed to delete member:', err)
      }
    }
  }

  // --- Event Operations ---
  const openEventModal = (event = null) => {
    if (event) {
      setEditingEvent(event)
      setEventForm({
        id: event.id,
        title: event.title || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        attendees: event.attendees || 0,
        description: event.description || '',
        tags: event.tags ? event.tags.join(', ') : '',
        formlink: event.formlink || '',
      })
    } else {
      setEditingEvent(null)
      setEventForm({
        title: '',
        date: '',
        time: '',
        location: '',
        attendees: 0,
        description: '',
        tags: '',
        formlink: '',
      })
    }
    setIsEventModalOpen(true)
  }

  const handleSaveEvent = async (e) => {
    e.preventDefault()
    try {
      const formattedEvent = {
        ...eventForm,
        tags: eventForm.tags
          ? eventForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        attendees: parseInt(eventForm.attendees) || 0,
      }
      await saveEvent(formattedEvent)
      setIsEventModalOpen(false)
      loadDashboardData()
    } catch (err) {
      console.error('Failed to save event:', err)
    }
  }

  const handleDeleteEvent = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id)
        loadDashboardData()
      } catch (err) {
        console.error('Failed to delete event:', err)
      }
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Verifying administrator credentials...</p>
      </div>
    )
  }

  // --- Render Login View ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        {/* Sticky back to home button */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>

        <div className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="relative w-16 h-16 mx-auto rounded-xl overflow-hidden border border-border">
                <Image
                  src="/enigma.jpg"
                  alt="Enigma Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Admin Portal</h2>
              <p className="text-muted-foreground text-sm">
                Login with admin credentials to manage content
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg text-center font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-primary/50 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // --- Render Dashboard View ---
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="relative w-8 h-8 rounded-lg overflow-hidden border border-border">
              <Image
                src="/enigma.jpg"
                alt="Enigma Logo"
                fill
                className="object-cover"
              />
            </Link>
            <span className="font-bold text-lg hidden sm:inline">Enigma Control Center</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium hidden md:inline"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10 transition-all font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toggle Switch Tabs */}
        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
          <div className="flex gap-2 bg-card border border-border/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'events'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Manage Events
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'members'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Manage Members
            </button>
          </div>

          {activeTab === 'events' ? (
            <button
              onClick={() => openEventModal()}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          ) : (
            <button
              onClick={() => openMemberModal()}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          )}
        </div>

        {isDataLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-muted-foreground text-sm">Loading dynamic records...</p>
          </div>
        ) : activeTab === 'events' ? (
          /* Events Admin List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border/50 rounded-xl overflow-hidden flex flex-col"
              >
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {event.tags &&
                        event.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{event.date} ({event.time})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-accent" />
                      <span>{event.attendees} Expected</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => openEventModal(event)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border hover:border-primary/40 hover:bg-primary/5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border hover:border-destructive/40 hover:bg-destructive/5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Members Admin List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-card border border-border/50 rounded-xl overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border bg-muted flex-shrink-0">
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                      <p className="text-primary text-sm font-semibold">{member.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-muted/20 border border-border/30 rounded-lg p-3">
                    <div>
                      <span className="text-muted-foreground block">Branch</span>
                      <span className="font-semibold text-foreground">{member.branch}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Specialty</span>
                      <span className="font-semibold text-foreground">{member.specialty}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => openMemberModal(member)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border hover:border-primary/40 hover:bg-primary/5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border hover:border-destructive/40 hover:bg-destructive/5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- Member Add/Edit Overlay Modal --- */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border/50 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in-up">
            <div className="flex justify-between items-center p-5 border-b border-border/50">
              <h3 className="font-bold text-lg text-foreground">
                {editingMember ? 'Edit Team Member' : 'Add New Member'}
              </h3>
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Club Role
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Specialty / Tech Stack
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.specialty}
                    onChange={(e) => setMemberForm({ ...memberForm, specialty: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Academic Branch
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.branch}
                    onChange={(e) => setMemberForm({ ...memberForm, branch: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Profile Photo URL (Local asset or remote link)
                </label>
                <input
                  type="text"
                  required
                  value={memberForm.image}
                  onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                  placeholder="/images/member.jpeg"
                  className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              <div className="border-t border-border/30 pt-4 mt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Social Links
                </h4>
                <div className="space-y-3">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={memberForm.social.github}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          social: { ...memberForm.social, github: e.target.value },
                        })
                      }
                      placeholder="GitHub profile URL"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={memberForm.social.linkedin}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          social: { ...memberForm.social, linkedin: e.target.value },
                        })
                      }
                      placeholder="LinkedIn profile URL"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={memberForm.social.email}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          social: { ...memberForm.social, email: e.target.value },
                        })
                      }
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 border border-border hover:bg-secondary rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors text-sm shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Event Add/Edit Overlay Modal --- */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border/50 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in-up">
            <div className="flex justify-between items-center p-5 border-b border-border/50">
              <h3 className="font-bold text-lg text-foreground">
                {editingEvent ? 'Edit Event Record' : 'Add New Event'}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. AI &amp; ML Workshop"
                  className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    placeholder="e.g. March 15, 2026"
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Time Range
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    placeholder="e.g. 2:00 PM - 5:00 PM"
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="e.g. Tech Lab, AIMT"
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Expected Attendees
                  </label>
                  <input
                    type="number"
                    required
                    value={eventForm.attendees}
                    onChange={(e) => setEventForm({ ...eventForm, attendees: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={eventForm.tags}
                  onChange={(e) => setEventForm({ ...eventForm, tags: e.target.value })}
                  placeholder="e.g. AI, ML, Workshop"
                  className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Registration Google Form Link
                </label>
                <input
                  type="url"
                  required
                  value={eventForm.formlink}
                  onChange={(e) => setEventForm({ ...eventForm, formlink: e.target.value })}
                  placeholder="https://forms.gle/..."
                  className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  rows={4}
                  placeholder="Enter detailed description of the event..."
                  className="w-full px-3.5 py-2 rounded-lg bg-background border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="border-t border-border/50 pt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 border border-border hover:bg-secondary rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors text-sm shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
