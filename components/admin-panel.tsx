"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Shield, Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" })
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [pin, setPin] = useState("")
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            setIsAdmin(data?.is_admin || false)
          })
      }
    })
  }, [])

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadAnnouncements()
      loadUsers()
    }
  }, [isOpen, isAdmin])

  const loadAnnouncements = async () => {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false })
    setAnnouncements(data || [])
  }

  const loadUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
    setUsers(data || [])
  }

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    const { error } = await supabase.from("announcements").insert({
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      author_id: user?.id,
    })

    if (error) {
      toast.error("Failed to create announcement")
    } else {
      toast.success("Announcement created")
      setNewAnnouncement({ title: "", content: "" })
      loadAnnouncements()
    }
  }

  const handleDeleteAnnouncement = async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete announcement")
    } else {
      toast.success("Announcement deleted")
      loadAnnouncements()
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    const { error } = await supabase.from("profiles").delete().eq("id", userId)

    if (error) {
      toast.error("Failed to delete user")
    } else {
      toast.success("User deleted")
      loadUsers()
    }
  }

  const handleUnlock = () => {
    if (pin === "admin1") {
      setIsUnlocked(true)
      setPin("")
      toast.success("Admin panel unlocked", { duration: 2000 })
    } else {
      toast.error("Invalid PIN", { duration: 2000 })
      setPin("")
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsUnlocked(false)
    setPin("")
  }

  if (!isAdmin) return null

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-black border-2 border-red-500 text-white hover:bg-black/90 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-red-500/20 z-40 animated-text"
        size="sm"
      >
        <Shield className="h-4 w-4 mr-2" />
        ADMIN
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md bg-card/90 backdrop-blur-xl border-2 border-red-500 p-6 space-y-6 animate-slide-in shadow-2xl shadow-red-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
              </div>
              <Button onClick={handleClose} variant="ghost" size="icon" className="hover:bg-red-500/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {!isUnlocked ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <div className="p-4 bg-red-500/10 rounded-full">
                    <Lock className="w-12 h-12 text-red-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Enter Admin PIN</label>
                  <Input
                    type="password"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    className="bg-background/50 border-border text-center text-lg tracking-widest"
                    maxLength={10}
                    autoFocus
                  />
                </div>
                <Button onClick={handleUnlock} className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Unlock
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Card className="p-4 bg-background/50 border-border/50">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        localStorage.removeItem("site_unlocked")
                        toast.success("Site lock reset", { duration: 2000 })
                      }}
                      variant="outline"
                      className="w-full justify-start hover:bg-accent"
                    >
                      Reset Site Lock
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("stealthModeEnabled")
                        toast.success("Stealth mode disabled", { duration: 2000 })
                      }}
                      variant="outline"
                      className="w-full justify-start hover:bg-accent"
                    >
                      Disable Stealth Mode
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("calcify-favorites")
                        toast.success("Favorites cleared", { duration: 2000 })
                      }}
                      variant="outline"
                      className="w-full justify-start hover:bg-accent"
                    >
                      Clear Favorites
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.clear()
                        toast.success("All local data cleared", { duration: 2000 })
                      }}
                      variant="outline"
                      className="w-full justify-start hover:bg-accent text-red-500 hover:text-red-600"
                    >
                      Clear All Local Storage
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 bg-background/50 border-border/50">
                  <h3 className="font-semibold text-foreground mb-3">Site Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground">Total Games</p>
                      <p className="text-2xl font-bold text-foreground">4</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground">Total Proxies</p>
                      <p className="text-2xl font-bold text-foreground">2</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/50 border-border/50">
                  <h3 className="font-semibold text-foreground mb-3">System Info</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Version: 2.0.0</p>
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>
                    <p>Status: ✓ Online</p>
                  </div>
                </Card>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
