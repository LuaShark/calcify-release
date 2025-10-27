import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { SiteLock } from "@/components/site-lock"
import { Toaster } from "sonner"
import { NotificationSystem } from "@/components/notification-system"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SiteLock>
          <Navigation />
          <main className="min-h-screen bg-background pt-16">{children}</main>
          <Analytics />
          <NotificationSystem />
          <Toaster position="top-right" theme="dark" richColors />
        </SiteLock>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
