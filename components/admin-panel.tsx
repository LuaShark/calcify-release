"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { X, Shield, Megaphone, Users, Trash2, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" })
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

  const handleClose = () => {
    setIsOpen(false)
    setNewAnnouncement({ title: "", content: "" })
  }

  if (!isAdmin) return null

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-black border-2 border-red-500 text-white hover:bg-black/90 hover:border-red-400 transition-all duration-300 shadow-lg z-40"
        size="sm"
      >
        <Shield className="h-4 w-4 mr-2" />
        ADMIN
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <Card className="w-full max-w-4xl bg-card border-2 border-red-500 p-6 space-y-6 animate-slide-in my-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
              </div>
              <Button onClick={handleClose} variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <Tabs defaultValue="announcements" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="announcements">
                  <Megaphone className="h-4 w-4 mr-2" />
                  Announcements
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="stats">
                  <Shield className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="announcements" className="space-y-4 mt-4">
                <Card className="p-4 bg-background/50">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Announcement
                  </h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Announcement Title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      className="bg-background"
                    />
                    <Textarea
                      placeholder="Announcement Content"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                      className="bg-background min-h-[100px]"
                    />
                    <Button onClick={handleCreateAnnouncement} className="w-full bg-red-500 hover:bg-red-600">
                      Create Announcement
                    </Button>
                  </div>
                </Card>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {announcements.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No announcements yet</p>
                  ) : (
                    announcements.map((announcement) => (
                      <Card key={announcement.id} className="p-4 bg-background/50">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{announcement.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(announcement.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-4 mt-4">
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {users.map((userProfile) => (
                    <Card key={userProfile.id} className="p-4 bg-background/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{userProfile.username}</p>
                            {userProfile.is_admin && (
                              <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Joined: {new Date(userProfile.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Streak: {userProfile.streak_count || 0} days</p>
                        </div>
                        {!userProfile.is_admin && (
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(userProfile.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4 mt-4">
                <Card className="p-4 bg-background/50">
                  <h3 className="font-semibold text-foreground mb-3">Site Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold text-foreground">{users.length}</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground">Announcements</p>
                      <p className="text-2xl font-bold text-foreground">{announcements.length}</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Games</p>
                      <p className="text-2xl font-bold text-foreground">2</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Proxies</p>
                      <p className="text-2xl font-bold text-foreground">2</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/50">
                  <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        localStorage.removeItem("site_unlocked")
                        toast.success("Site lock reset")
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Reset Site Lock
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.clear()
                        toast.success("Local storage cleared")
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Local Storage
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 bg-background/50">
                  <h3 className="font-semibold text-foreground mb-3">System Info</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Version: 2.0.0</p>
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>
                    <p>Status: Online</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </>
  )
}
