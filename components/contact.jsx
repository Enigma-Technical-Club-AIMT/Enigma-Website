'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

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
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Failed to send email:', err)
      setError('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                {/* <div className="flex-shrink-0 pt-1">
                  <Phone className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                </div> */}
                {/* <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:+918765432109"
                    className="text-muted-foreground hover:text-secondary transition-colors"
                  >
                    +91 8765 432 109
                  </a>
                </div> */}
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
                    Ambalika Institute of Management & Technology
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
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15"
            >
              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-accent/20 border border-accent/50 text-accent animate-fade-in-up">
                  <p className="font-semibold">
                    Thank you for your message!
                  </p>
                  <p className="text-sm">
                    {"We'll get back to you as soon as possible."}
                  </p>
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/20 border border-destructive text-destructive animate-fade-in-up">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 className="w-5 h-5 animate-spin" />
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
