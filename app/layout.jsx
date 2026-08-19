import { Instrument_Serif, Archivo, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { EnigmaBot } from '@/components/enigma-bot'
import { ScrollProgress } from '@/components/scroll-progress'
import { BackToTop } from '@/components/back-to-top'

import './globals.css'

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-serif' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-sans' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata = {
  metadataBase: new URL('https://enigma.aimt.edu.in'),
  title: {
    default: 'Enigma Technical Club | AIMT',
    template: '%s | Enigma Tech Club',
  },
  description:
    'Enigma Technical Club at Ambalika Institute of Management & Technology - Empowering students through innovation, collaboration, and hands-on technical learning.',
  generator: 'v0.app',
  keywords: [
    'Enigma Technical Club',
    'Enigma Tech Club',
    'Ambalika Institute of Management & Technology',
    'AIMT',
    'Lucknow Tech Club',
    'Web Development',
    'Machine Learning',
    'Cybersecurity',
    'Coding Workshops',
    'Student Club',
  ],
  authors: [{ name: 'Enigma Tech Club', url: 'https://github.com/Enigma-Technical-Club-AIMT' }],
  creator: 'Enigma Tech Club',
  publisher: 'Ambalika Institute of Management & Technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://enigma.aimt.edu.in',
    title: 'Enigma Technical Club | AIMT',
    description:
      'Empowering students through innovation, collaboration, and cutting-edge technology at Ambalika Institute of Management & Technology.',
    siteName: 'Enigma Technical Club',
    images: [
      {
        url: '/enigma.jpg',
        width: 800,
        height: 800,
        alt: 'Enigma Technical Club Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enigma Technical Club | AIMT',
    description:
      'Empowering students through innovation, collaboration, and cutting-edge technology at Ambalika Institute of Management & Technology.',
    images: ['/enigma.jpg'],
    creator: '@EnigmaAIMT',
  },
  icons: {
    icon: '/enigma.jpg',
    shortcut: '/enigma.jpg',
    apple: '/enigma.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${archivo.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <ScrollProgress />
        <BackToTop />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="enigma-theme"
        >
          {children}
          <EnigmaBot />
        </ThemeProvider>
      </body>
    </html>
  )
}
