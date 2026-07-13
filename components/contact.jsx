'use client'

import { useState, useCallback } from 'react'
import { Mail, MapPin, Send, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

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

// ── Input class helper ────────────────────────────────────────────────────────

function inputClass(touched, error) {
  const base =
    'w-full px-4 py-3 rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors'
  if (touched && error)
    return `${base} border border-destructive focus:border-destructive focus:ring-destructive/30`
  if (touched && !error)
    return `${base} border border-green-500/70 focus:border-green-500 focus:ring-green-500/20`
  return `${base} border border-border/50 focus:border-primary focus:ring-primary/30`
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
    messageLength > 1800 ? 'text-destructive' : messageLength > 1400 ? 'text-accent' : 'text-muted-foreground'

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {"Have questions? Want to join us? Let's connect!"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-in-left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">
                  Contact Information
                </h3>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 pt-1">
                  <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:enigmatech@aimt.co.in"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    enigma@ambalika.co.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 pt-1">
                  <MapPin className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Location
                  </h4>
                  <p className="text-muted-foreground">
                    Ambalika Institute of Management &amp; Technology
                    <br />
                    Lucknow, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-card/30 border border-border/30 rounded-xl p-6 mt-8">
                <h4 className="font-semibold text-foreground mb-4">
                  Office Hours
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 4:00 PM</p>
                  <p>Saturday: 10:00 AM - 3:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15"
            >
              {/* Success banner */}
              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/40 flex items-start gap-3 animate-fade-in-up">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-500">Message sent successfully!</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {"We'll get back to you as soon as possible."}
                    </p>
                  </div>
                </div>
              )}

              {/* Error banner */}
              {submitError && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/40 flex items-start gap-3 animate-fade-in-up">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive">Oops! Something went wrong.</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
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
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <span className={`text-xs ${messageLimitColor}`}>
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
                    rows={5}
                    maxLength={2000}
                    className={`${inputClass(touched.message, errors.message)} resize-none`}
                  />
                  <FieldError message={touched.message && errors.message} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-primary/50 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
