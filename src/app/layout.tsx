import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Find Your Perfect Prop Firm | Futures Prop Tool',
  description: 'Take our 2-minute quiz and discover which futures prop trading firm matches your trading style, budget, and goals.',
  keywords: ['prop firm', 'futures trading', 'funded trader', 'prop trading quiz'],
  openGraph: {
    title: 'Find Your Perfect Prop Firm | Futures Prop Tool',
    description: 'Take our 2-minute quiz and discover which futures prop trading firm matches your trading style.',
    url: 'https://futuresproptool.com',
    siteName: 'Futures Prop Tool',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Perfect Prop Firm',
    description: 'Take our 2-minute quiz and discover your perfect prop firm match.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
