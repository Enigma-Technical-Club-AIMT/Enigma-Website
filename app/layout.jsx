import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Enigma Tech Club | AIMT',
  description:
    'Enigma Tech Club at Ambalika Institute of Management & Technology - Empowering students through innovation, collaboration, and cutting-edge technology',
  generator: 'v0.app',
  keywords: [
    'tech club',
    'innovation',
    'hackathon',
    'web development',
    'AIMT',
    'Lucknow',
  ],
  authors: [{ name: 'Enigma Tech Club' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="enigma-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
