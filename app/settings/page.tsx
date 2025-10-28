"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Moon, Sun, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  const [stealthMode, setStealthMode] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light" | "blue" | "purple">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load settings from localStorage
    const savedStealthMode = localStorage.getItem("stealthModeEnabled") === "true"
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light" | "blue" | "purple") || "dark"
    setStealthMode(savedStealthMode)
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: "dark" | "light" | "blue" | "purple") => {
    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove("theme-dark", "theme-light", "theme-blue", "theme-purple")

    // Add new theme class
    root.classList.add(`theme-${newTheme}`)

    // Apply theme colors
    switch (newTheme) {
      case "light":
        root.style.setProperty("--background", "255 255 255")
        root.style.setProperty("--foreground", "0 0 0")
        root.style.setProperty("--card", "250 250 250")
        root.style.setProperty("--card-foreground", "0 0 0")
        root.style.setProperty("--border", "229 229 229")
        root.style.setProperty("--muted", "245 245 245")
        root.style.setProperty("--muted-foreground", "115 115 115")
        break
      case "blue":
        root.style.setProperty("--background", "15 23 42")
        root.style.setProperty("--foreground", "226 232 240")
        root.style.setProperty("--card", "30 41 59")
        root.style.setProperty("--card-foreground", "226 232 240")
        root.style.setProperty("--border", "51 65 85")
        root.style.setProperty("--primary", "59 130 246")
        break
      case "purple":
        root.style.setProperty("--background", "24 24 27")
        root.style.setProperty("--foreground", "250 250 250")
        root.style.setProperty("--card", "39 39 42")
        root.style.setProperty("--card-foreground", "250 250 250")
        root.style.setProperty("--border", "63 63 70")
        root.style.setProperty("--primary", "168 85 247")
        break
      default: // dark
        root.style.setProperty("--background", "0 0 0")
        root.style.setProperty("--foreground", "255 255 255")
        root.style.setProperty("--card", "23 23 23")
        root.style.setProperty("--card-foreground", "255 255 255")
        root.style.setProperty("--border", "39 39 42")
        root.style.setProperty("--muted", "39 39 42")
        root.style.setProperty("--muted-foreground", "161 161 170")
    }
  }

  const handleStealthModeToggle = (enabled: boolean) => {
    setStealthMode(enabled)
    localStorage.setItem("stealthModeEnabled", enabled.toString())
    toast.success(enabled ? "Stealth mode enabled (Alt+Z)" : "Stealth mode disabled", {
      duration: 2000,
    })
  }

  const handleThemeChange = (newTheme: "dark" | "light" | "blue" | "purple") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
    toast.success(`Theme changed to ${newTheme}`, {
      duration: 2000,
    })
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground">Customize your Calcify experience</p>
        </div>

        {/* Theme Settings */}
        <Card className="border-border bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme
            </CardTitle>
            <CardDescription>Choose your preferred color scheme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="h-20 flex-col gap-2"
                onClick={() => handleThemeChange("dark")}
              >
                <Moon className="h-6 w-6" />
                <span>Dark</span>
              </Button>
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="h-20 flex-col gap-2"
                onClick={() => handleThemeChange("light")}
              >
                <Sun className="h-6 w-6" />
                <span>Light</span>
              </Button>
              <Button
                variant={theme === "blue" ? "default" : "outline"}
                className="h-20 flex-col gap-2"
                onClick={() => handleThemeChange("blue")}
              >
                <div className="h-6 w-6 rounded-full bg-blue-500" />
                <span>Blue</span>
              </Button>
              <Button
                variant={theme === "purple" ? "default" : "outline"}
                className="h-20 flex-col gap-2"
                onClick={() => handleThemeChange("purple")}
              >
                <div className="h-6 w-6 rounded-full bg-purple-500" />
                <span>Purple</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stealth Mode */}
        <Card className="border-border bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Stealth Mode
            </CardTitle>
            <CardDescription>Press Alt+Z to quickly hide Calcify with a fake login screen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="stealth-mode" className="text-base">
                  Enable Stealth Mode
                </Label>
                <p className="text-sm text-muted-foreground">Panic button (Alt+Z) to show Clever login</p>
              </div>
              <Switch id="stealth-mode" checked={stealthMode} onCheckedChange={handleStealthModeToggle} />
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card className="border-border bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Keyboard Shortcuts</CardTitle>
            <CardDescription>Quick actions to enhance your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm">Toggle Stealth Mode</span>
                <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border">Alt + Z</kbd>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm">Exit Fullscreen Game</span>
                <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border">ESC</kbd>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
