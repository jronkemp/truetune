// components/Analytics.tsx
"use client"

import { useEffect } from "react"
import { getAnalytics, isSupported } from "firebase/analytics"
import { app } from "@/lib/firebase"

export function Analytics() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    isSupported().then((supported) => {
      if (supported) {
        getAnalytics(app)
        console.log("Firebase Analytics loaded (PWA)")
      }
    })
  }, [])

  return null
}