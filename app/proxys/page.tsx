"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ProxysPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleLaunchProxy = (url: string) => {
    setIsLoading(true)
    setLoadingProgress(0)

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          window.open(url, "_blank", "noopener,noreferrer")
          setTimeout(() => {
            setIsLoading(false)
            setLoadingProgress(0)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="text-center space-y-6 p-8 rounded-2xl bg-card border border-border shadow-2xl max-w-md w-full mx-4">
            <div className="relative w-20 h-20 mx-auto">
              <Image
                src="/xenos-logo.png"
                alt="XenOS Logo"
                width={80}
                height={80}
                className="object-contain mix-blend-lighten animate-pulse"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Launching Xen Proxy</h2>
              <p className="text-muted-foreground">Establishing secure connection...</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm font-medium text-foreground">{loadingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Proxys</h1>
          <p className="text-xl text-muted-foreground">Access web proxies for browsing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Proxy Icon */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-background/50 flex items-center justify-center">
                <Image
                  src="/xenos-logo.png"
                  alt="XenOS Logo"
                  width={80}
                  height={80}
                  className="object-contain mix-blend-lighten"
                />
              </div>

              {/* Proxy Name */}
              <h3 className="text-2xl font-bold text-foreground">Xen Proxy</h3>

              <Button
                onClick={() => handleLaunchProxy("https://xen-os.dev")}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Launch
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
