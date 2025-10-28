"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loadingPath, setLoadingPath] = useState<string | null>(null)

  const links = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/proxys", label: "Proxys" },
    { href: "/info", label: "Info" },
    { href: "/settings", label: "Settings" },
  ]

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) return

    e.preventDefault()
    setLoadingPath(href)
    startTransition(() => {
      router.push(href)
      setTimeout(() => setLoadingPath(null), 300)
    })
  }

  return (
    <>
      {loadingPath && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/50 backdrop-blur-sm animate-fade-in pointer-events-none">
          <div className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm font-medium text-foreground">Loading...</span>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              onClick={(e) => handleNavigation(e, "/")}
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 animated-text"
            >
              CALCIFY
            </Link>

            <div className="flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group animated-text",
                    pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
