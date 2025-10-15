"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

type ScheduleInfo = {
  day: string
  time: string
  currentHour: string | null
}

export default function HomePage() {
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>({
    day: "",
    time: "",
    currentHour: null,
  })

  useEffect(() => {
    const updateSchedule = () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hours + minutes / 60

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const dayName = days[dayOfWeek]
      const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

      let currentHour: string | null = null

      // Monday and Wednesday schedule
      if (dayOfWeek === 1 || dayOfWeek === 3) {
        if (currentTime >= 7 && currentTime < 9) {
          currentHour = "1st Hour"
        } else if (currentTime >= 9 && currentTime < 10.5) {
          currentHour = "3rd Hour"
        } else if (currentTime >= 11 && currentTime < 12.5) {
          currentHour = "5th Hour"
        } else if (currentTime >= 12.67 && currentTime < 14.25) {
          currentHour = "7th Hour"
        }
      }
      // Tuesday and Thursday schedule
      else if (dayOfWeek === 2 || dayOfWeek === 4) {
        if (currentTime >= 7 && currentTime < 9) {
          currentHour = "2nd Hour"
        } else if (currentTime >= 9 && currentTime < 11) {
          currentHour = "4th Hour"
        } else if (currentTime >= 11 && currentTime < 12.67) {
          currentHour = "6th Hour"
        } else if (currentTime >= 12.67 && currentTime < 14.25) {
          currentHour = "8th Hour"
        }
      }
      // Friday schedule
      else if (dayOfWeek === 5) {
        if (currentTime >= 7 && currentTime < 8) {
          currentHour = "1st Hour"
        } else if (currentTime >= 8 && currentTime < 9) {
          currentHour = "2nd Hour"
        } else if (currentTime >= 9 && currentTime < 10) {
          currentHour = "3rd Hour"
        } else if (currentTime >= 10 && currentTime < 11) {
          currentHour = "4th Hour"
        } else if (currentTime >= 11 && currentTime < 12) {
          currentHour = "5th Hour"
        } else if (currentTime >= 12 && currentTime < 13) {
          currentHour = "6th Hour"
        } else if (currentTime >= 13 && currentTime < 14.25) {
          currentHour = "7th Hour"
        }
      }

      setScheduleInfo({
        day: dayName,
        time: timeString,
        currentHour,
      })
    }

    updateSchedule()
    const interval = setInterval(updateSchedule, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Welcome to Calcify</h1>
          <p className="text-xl text-muted-foreground">Your Livingston Parish Schools Game Portal</p>
        </div>

        {/* Time and Schedule Info */}
        <Card className="p-6 bg-card border-border animate-slide-in">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Current Day</p>
              <p className="text-2xl font-bold text-foreground">{scheduleInfo.day}</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Current Time</p>
              <p className="text-2xl font-bold text-foreground">{scheduleInfo.time}</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Expected Hour</p>
              <p className="text-2xl font-bold text-foreground">{scheduleInfo.currentHour || "No Class"}</p>
            </div>
          </div>
        </Card>

        {/* Recent Updates */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold text-foreground">Recent Updates</h2>
          <div className="space-y-3">
            <Card className="p-4 bg-card border-border hover:border-muted-foreground transition-colors duration-300">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">New Games Added</h3>
                  <p className="text-sm text-muted-foreground">
                    Check out the latest additions to our game library in the Games tab.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">Oct 15, 2025</span>
              </div>
            </Card>

            <Card className="p-4 bg-card border-border hover:border-muted-foreground transition-colors duration-300">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">System Maintenance</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance completed. All systems running smoothly.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">Oct 12, 2025</span>
              </div>
            </Card>

            <Card className="p-4 bg-card border-border hover:border-muted-foreground transition-colors duration-300">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">Welcome to Calcify</h3>
                  <p className="text-sm text-muted-foreground">Your new game portal is now live. Explore and enjoy!</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">Oct 10, 2025</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
