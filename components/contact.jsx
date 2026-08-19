'use client'

import { useState, useCallback } from 'react'
import { Mail, MapPin, Send, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Reveal, SectionHeading } from '@/components/reveal'

// ── Validation helpers ────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Full name is required.'
      if (value.trim().length < 2) return 'Name must be at least 2 characters.'
      if (value.trim().length > 80) return 'Name must be under 80 characters.'
      return ''
    case 'email':
      if (!value.trim()) return 'Email address is required.'
      if (!EMAIL_RE.test(value)) return 'Please enter a valid email address.'
      return ''
    case 'subject':
      if (!value.trim()) return 'Subject is required.'
      if (value.trim().length < 3) return 'Subject must be at least 3 characters.'
      if (value.trim().length > 120) return 'Subject must be under 120 characters.'
      return ''
    case 'message':
      if (!value.trim()) return 'Message is required.'
      if (value.trim().length < 20) return 'Message must be at least 20 characters.'
      if (value.trim().length > 2000) return 'Message must be under 2000 characters.'
      return ''
    default:
      return ''
  }
}

function validateAll(formData) {
  const errors = {}
  for (const key of Object.keys(formData)) {
    const err = validateField(key, formData[key])
    if (err) errors[key] = err
  }
  return errors
}

// ── Inline error message ──────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive animate-fade-in-up">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  )
}

// ── Input class helper (flat underline style) ────────────────────────────────

function inputClass(touched, error) {
  const base =
    'w-full px-0 pt-2.5 pb-1.5 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none border-b transition-colors'
  if (touched && error)
    return `${base} border-b-destructive`
  if (touched && !error)
    return `${base} border-[#2563eb]`
  return `${base} border-border focus:border-[#2563eb]`
}

// ── Main component ────────────────────────────────────────────────────────────

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }
const INITIAL_TOUCHED = { name: false, email: false, subject: false, message: false }

export function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState(INITIAL_TOUCHED)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate a single field on change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }, [touched])

  // Mark field touched on blur and immediately validate
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields touched and validate all
    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)
    const allErrors = validateAll(formData)
    setErrors(allErrors)

    if (Object.values(allErrors).some(Boolean)) return // stop if validation fails

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'default_service',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'default_template',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'default_public_key'
      )
      setSubmitted(true)
      setFormData(INITIAL_FORM)
      setTouched(INITIAL_TOUCHED)
      setErrors({})
      // Auto-reset success state after 8 seconds
      setTimeout(() => setSubmitted(false), 8000)
    } catch (err) {
      console.error('Failed to send email:', err)
      setSubmitError('Failed to send your message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const messageLength = formData.message.length
  const messageLimitColor =
    messageLength > 1800 ? 'text-destructive' : messageLength > 1400 ? 'text-[#2563eb]' : 'text-muted-foreground'

  return (
    <section id="contact" className="relative py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// Say Hello"
          title="Let&apos;s"
          highlight="connect"
          description="Have questions? Want to join us? Drop us a line."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Contact Information */}
          <Reveal>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-medium text-foreground">Contact Information</h3>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="w-4 h-4 text-[#2563eb] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1 font-mono-accent">
                    Email
                  </h4>
                  <a
                    href="mailto:enigmatech@aimt.co.in"
                    className="text-foreground hover:text-[#2563eb] transition-colors"
                  >
                    enigma@ambalika.co.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <MapPin className="w-4 h-4 text-[#2563eb] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1 font-mono-accent">
                    Location
                  </h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Ambalika Institute of Management &amp; Technology
                    <br />
                    Lucknow, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="border-t border-border pt-8">
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4 font-mono-accent">
                  Office Hours
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-foreground">10:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-destructive">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={0.12}>
            <form onSubmit={handleSubmit} noValidate>
              {/* Success banner */}
              {submitted && (
                <div className="mb-6 p-4 border border-green-500/40 flex items-start gap-3 animate-fade-in-up">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-500">Message sent successfully!</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {"We'll get back to you as soon as possible."}
                    </p>
                  </div>
                </div>
              )}

              {/* Error banner */}
              {submitError && (
                <div className="mb-6 p-4 border border-destructive/40 flex items-start gap-3 animate-fade-in-up">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Oops! Something went wrong.</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono-accent">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass(touched.name, errors.name)}
                  />
                  <FieldError message={touched.name && errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono-accent">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={inputClass(touched.email, errors.email)}
                  />
                  <FieldError message={touched.email && errors.email} />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono-accent">
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What is this about?"
                    className={inputClass(touched.subject, errors.subject)}
                  />
                  <FieldError message={touched.subject && errors.subject} />
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-mono-accent">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <span className={`text-xs font-mono-accent ${messageLimitColor}`}>
                      {messageLength}/2000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us more about your inquiry... (min. 20 characters)"
                    rows={4}
                    maxLength={2000}
                    className={`${inputClass(touched.message, errors.message)} resize-none`}
                  />
                  <FieldError message={touched.message && errors.message} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center px-9 py-3.5 bg-[#2563eb] text-[#16202f] text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#7c3aed] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
