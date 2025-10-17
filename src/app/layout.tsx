import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import Navbar from '@/app/navbar/navbar'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import type { Viewport } from 'next' // Import Viewport type

export const metadata: Metadata = {
  title: 'Pratyay Mitra Mustafi - Full Stack Developer',
  description: 'Portfolio of Pratyay Mitra Mustafi - Full Stack Developer specializing in Next.js, React, and modern web technologies. View projects, skills, and experience.',
  authors: [{ name: 'Pratyay Mitra Mustafi' }],
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Portfolio', 'Web Development'],
  openGraph: {
    title: 'Pratyay Mitra Mustafi - Full Stack Developer',
    description: 'Portfolio showcasing projects and skills in modern web development',
    url: 'https://pratyay.vercel.app',
    siteName: 'Pratyay Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratyay Mitra Mustafi - Full Stack Developer',
    description: 'Portfolio showcasing projects and skills in modern web development',
  },
  verification: {
    google: 'googleb8a9572b6ecfc15f',
    other: {
      "msvalidate.01": "C348576BB92261CC55029F04F308DB94"
    }
  }
}

// Add generateViewport function
export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export const runtime = "edge";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <div>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      <Toaster richColors closeButton position="bottom-right" expand={true} />
      </div>
      </body>
    </html>
  )
}
