"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AdminPanel } from "@/components/admin-panel"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

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
    <div className="min-h-screen px-4 pt-20 pb-12">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Live Now</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent tracking-tight leading-tight">
            Welcome to Calcify
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your premier game portal for Livingston Parish Schools
          </p>

          <div className="pt-2">
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/document/d/1oTcUqxUem1Xe6YlGLiJEbi1kLRTNBZaNBRNvWmMfpJ4/edit?usp=sharing",
                  "_blank",
                )
              }
              className="px-6 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Update Logs
            </Button>
          </div>
        </div>

        <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm shadow-lg animate-slide-in">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Day</p>
              <p className="text-2xl font-bold text-foreground">{scheduleInfo.day}</p>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-accent/5 to-transparent">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Time</p>
              <p className="text-2xl font-bold text-foreground">{scheduleInfo.time}</p>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Expected Hour</p>
              <p className="text-2xl font-bold text-foreground">{scheduleInfo.currentHour || "No Class"}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Recent Updates
          </h2>
          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-semibold text-foreground">New Games Added</h3>
                  <p className="text-sm text-muted-foreground">
                    Check out the latest additions to our game library in the Games tab.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 bg-primary/10 rounded-full">
                  Oct 15, 2025
                </span>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-semibold text-foreground">System Maintenance</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance completed. All systems running smoothly.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 bg-primary/10 rounded-full">
                  Oct 12, 2025
                </span>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-semibold text-foreground">Welcome to Calcify</h3>
                  <p className="text-sm text-muted-foreground">Your new game portal is now live. Explore and enjoy!</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 bg-primary/10 rounded-full">
                  Oct 10, 2025
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Admin Panel */}
        <AdminPanel />
      </div>
    </div>
  )
}
