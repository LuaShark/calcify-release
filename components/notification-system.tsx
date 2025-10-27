"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

export function NotificationSystem() {
  const [lastHour, setLastHour] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Initialize with current hour
    const now = new Date()
    setLastHour(now.getHours())

    // Check for hour changes every minute
    const hourInterval = setInterval(() => {
      const currentHour = new Date().getHours()
      if (lastHour !== null && currentHour !== lastHour) {
        const period = currentHour >= 12 ? "PM" : "AM"
        const displayHour = currentHour % 12 || 12
        toast.info(`It's now ${displayHour}:00 ${period}`, {
          duration: 4000,
        })
        setLastHour(currentHour)
      }
    }, 60000) // Check every minute

    // Listen for visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false)
      } else if (!isVisible) {
        toast.info("Welcome back to Calcify!", {
          duration: 3000,
        })
        setIsVisible(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(hourInterval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [lastHour, isVisible])

  return null
}
