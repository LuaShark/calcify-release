"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function StealthMode() {
  const [isActive, setIsActive] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    // Check if stealth mode is enabled in localStorage
    const enabled = localStorage.getItem("stealthModeEnabled") === "true"
    setIsEnabled(enabled)

    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+Z to toggle stealth mode
      if (e.altKey && e.key === "z") {
        e.preventDefault()
        setIsActive((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isEnabled])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <Image src="/clever-login.png" alt="Clever Login" fill className="object-cover" priority />
    </div>
  )
}
