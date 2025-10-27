"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, Shield } from "lucide-react"
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
    <div className="min-h-screen px-4 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-to-br from-card/90 to-card/50 border border-primary/20 shadow-2xl max-w-md w-full mx-4 backdrop-blur-xl">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
              <Image
                src="/xenos-logo.png"
                alt="XenOS Logo"
                width={96}
                height={96}
                className="object-contain mix-blend-lighten animate-pulse relative z-10"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Launching Xen Proxy
              </h2>
              <p className="text-muted-foreground">Establishing secure connection...</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm font-medium text-foreground">{loadingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Secure Browsing</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight animate-gradient bg-[length:200%_auto]">
            Proxys
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access secure web proxies for unrestricted browsing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 border-border/50 hover:border-primary/50 transition-all duration-500 backdrop-blur-sm">
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

            <div className="relative p-8 flex flex-col items-center gap-6 text-center">
              {/* Enhanced proxy icon with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 scale-75 group-hover:scale-100" />
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-background/80 to-background/40 flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Image
                    src="/xenos-logo.png"
                    alt="XenOS Logo"
                    width={88}
                    height={88}
                    className="object-contain mix-blend-lighten group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Enhanced proxy name with gradient */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-500">
                  Xen Proxy
                </h3>
                <p className="text-sm text-muted-foreground">Fast & Secure</p>
              </div>

              {/* Enhanced launch button */}
              <Button
                onClick={() => handleLaunchProxy("https://xen-os.dev")}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <ExternalLink className="mr-2 h-4 w-4 relative z-10" />
                <span className="relative z-10">Launch</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
