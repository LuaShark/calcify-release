"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

const CORRECT_PIN = "4311"

export function SiteLock({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(false)
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const checkLockStatus = () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hours + minutes / 60

      // Check if unlocked in localStorage
      const unlocked = localStorage.getItem("site_unlocked")
      if (unlocked === "true") {
        setIsLocked(false)
        return
      }

      let shouldLock = false

      // Weekend (Saturday = 6, Sunday = 0)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        shouldLock = true
      }
      // Monday, Wednesday (after 2:15 PM = 14.25)
      else if ((dayOfWeek === 1 || dayOfWeek === 3) && currentTime >= 14.25) {
        shouldLock = true
      }
      // Tuesday, Thursday (after 2:15 PM = 14.25)
      else if ((dayOfWeek === 2 || dayOfWeek === 4) && currentTime >= 14.25) {
        shouldLock = true
      }
      // Friday (after 2:15 PM = 14.25)
      else if (dayOfWeek === 5 && currentTime >= 14.25) {
        shouldLock = true
      }
      // Before 7:00 AM on weekdays
      else if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentTime < 7) {
        shouldLock = true
      }

      setIsLocked(shouldLock)
    }

    checkLockStatus()
    const interval = setInterval(checkLockStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [mounted])

  const handleUnlock = () => {
    if (pin === CORRECT_PIN) {
      localStorage.setItem("site_unlocked", "true")
      setIsLocked(false)
      setError(false)
      setPin("")
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (!mounted) {
    return null
  }

  if (isLocked) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="flex justify-center">
            <div className="p-4 bg-card rounded-full border-2 border-border">
              <Lock className="w-12 h-12 text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Site Locked</h1>
            <p className="text-muted-foreground">
              Calcify is only accessible during school hours (7:00 AM - 2:15 PM, Monday-Friday)
            </p>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter PIN to unlock"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className={`text-center text-lg ${error ? "border-red-500" : ""}`}
              maxLength={4}
            />
            {error && <p className="text-sm text-red-500">Incorrect PIN</p>}
            <Button onClick={handleUnlock} className="w-full" size="lg">
              Unlock
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
