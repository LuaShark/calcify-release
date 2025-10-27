"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Shield } from "lucide-react"

const ADMIN_PIN = "admin1"

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)

  const handleAuth = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true)
      setError(false)
      setPin("")
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsAuthenticated(false)
    setPin("")
    setError(false)
  }

  return (
    <>
      {/* Admin Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-black border-2 border-red-500 text-white hover:bg-black/90 hover:border-red-400 transition-all duration-300 shadow-lg"
        size="sm"
      >
        ADMIN
      </Button>

      {/* Admin Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-2xl bg-card border-2 border-red-500 p-6 space-y-6 animate-slide-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
              </div>
              <Button onClick={handleClose} variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {!isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">Enter admin PIN to access the panel</p>
                <div className="space-y-3">
                  <Input
                    type="password"
                    placeholder="Enter Admin PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                    className={`text-center ${error ? "border-red-500" : ""}`}
                  />
                  {error && <p className="text-sm text-red-500">Incorrect PIN</p>}
                  <Button onClick={handleAuth} className="w-full bg-red-500 hover:bg-red-600">
                    Authenticate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Site Statistics</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Games</p>
                      <p className="text-xl font-bold text-foreground">2</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Proxies</p>
                      <p className="text-xl font-bold text-foreground">1</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        localStorage.removeItem("site_unlocked")
                        alert("Site lock reset. Page will reload.")
                        window.location.reload()
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Reset Site Lock
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.clear()
                        alert("All local data cleared.")
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Local Storage
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">System Info</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Version: 1.0.0</p>
                    <p>Last Updated: Oct 16, 2025</p>
                    <p>Status: Online</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
