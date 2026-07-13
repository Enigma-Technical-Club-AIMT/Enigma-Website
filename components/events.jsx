import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'AI & Machine Learning Workshop',
    date: 'March 15, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'Tech Lab, AIMT',
    attendees: 45,
    description:
      'Deep dive into machine learning concepts, neural networks, and practical implementations using TensorFlow.',
    tags: ['AI', 'ML', 'Workshop'],
    formlink: 'https://forms.gle/U8icoTvH381og5ss5',
  },
  {
    id: 2,
    title: 'Annual Hackathon 2026',
    date: 'April 5-7, 2026',
    time: 'Full Weekend Event',
    location: 'Main Campus, AIMT',
    attendees: 200,
    description:
      '24-hour hackathon where teams compete to build innovative solutions. Prizes, mentorship, and networking.',
    tags: ['Hackathon', 'Competition', 'Innovation'],
    formlink:'https://forms.gle/sF8XZiEsxSXFctGNA',
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    date: 'March 22, 2026',
    time: '3:00 PM - 6:00 PM',
    location: 'Computer Lab 2, AIMT',
    attendees: 60,
    description:
      'Master modern web development with React, Node.js, and cloud deployment. Perfect for beginners and intermediates.',
    tags: ['Web Dev', 'React', 'Bootcamp'],
    formlink:'https://forms.gle/xKRDibhRTZWUxyH89',
  },
  {
    id: 4,
    title: 'Cloud Architecture Masterclass',
    date: 'April 12, 2026',
    time: '1:00 PM - 4:00 PM',
    location: 'Tech Lab, AIMT',
    attendees: 50,
    description:
      'Learn cloud architecture best practices with AWS, Azure, and GCP. Industry experts will share real-world insights.',
    tags: ['Cloud', 'Architecture', 'Masterclass'],
    formlink:'https://forms.gle/FXLmeoLhtjrvyxGD8',
  },
  {
    id: 5,
    title: 'Cybersecurity Awareness Session',
    date: 'March 29, 2026',
    time: '2:30 PM - 4:00 PM',
    location: 'Auditorium, AIMT',
    attendees: 150,
    description:
      'Essential cybersecurity practices and how to protect your digital presence. Interactive Q&A with security experts.',
    tags: ['Security', 'Awareness', 'Seminar'],
    formlink:'https://forms.gle/c3HzcWsVSC4zsJ3f6',
  },
  {
    id: 6,
    title: 'Startup Networking Night',
    date: 'May 3, 2026',
    time: '6:00 PM - 8:00 PM',
    location: 'Club Lounge, AIMT',
    attendees: 100,
    description:
      'Connect with entrepreneurs, investors, and startup founders. Perfect for aspiring tech entrepreneurs.',
    tags: ['Startup', 'Networking', 'Event'],
    formlink:'https://forms.gle/GhJ4qJUJQAsrcz8W9',
  },
]

export function Events() {
  return (
    <section
      id="events"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for exciting workshops, hackathons, and networking
            opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Top gradient bar */}
              <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

              <div className="p-6 sm:p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border/30">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {event.date}
                      </p>
                      <p className="text-xs">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <p className="text-sm font-semibold text-foreground">
                      {event.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-accent" />
                    <p className="text-sm font-semibold text-foreground">
                      {event.attendees} Expected Attendees
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                {/* <button className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  Register Now
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button> */}
                <a
  href={event.formlink}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2"
>
  Register Now
  <ArrowRight className="w-5 h-5" />
</a>

              </div>
            </div>
          ))}
        </div>

        {/* Event Highlight Banner */}
        <div
          className="mt-16 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 rounded-2xl p-8 sm:p-12 text-center animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {"Don't Miss Our Annual Hackathon!"}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your ideas into reality. Compete for amazing prizes, get
            mentored by industry experts, and build connections with tech
            enthusiasts across the region.
          </p>
          <a href="#contact" className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors hover:shadow-lg hover:shadow-primary/50">
            Learn More
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
