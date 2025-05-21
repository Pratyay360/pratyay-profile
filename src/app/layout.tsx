import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import Navbar from './navbar/navbar'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })
import { ThemeProvider } from "@/components/theme-provider"
export const metadata: Metadata = {
  title: 'Pratyay Mitra Mustafi',
  description: 'This is portfollio website of Pratyay Mustafi',
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
      <div >
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
      </div>
      </body>
    </html>
  )
}
