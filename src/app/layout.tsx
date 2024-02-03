import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import Navbar from './navbar/navbar'
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata: Metadata = {
  title: 'Pratyay Mitra Mustafi',
  description: 'This is portfollio website of Pratyay Mustafi',
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Analytics/>
        </body>
    </html>
  )
}
