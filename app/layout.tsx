// app/layout.tsx
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"                    // ← Your auth export
import { Analytics } from "@/components/Analytics" // ← Firebase Analytics

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// PWA: theme color, viewport
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Soccer Tracker PWA",
  description: "Track soccer stats in real-time",
  manifest: "/manifest.json",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get session once (server-side)
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {/* Provide session to all client components */}
        <SessionProvider session={session}>
          {/* Firebase Analytics – only runs in browser */}
          <Analytics />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}