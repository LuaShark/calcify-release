"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Calendar, Flame, Users, MessageSquare, Edit2, Save } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setProfile(data)
          setDisplayName(data?.display_name || "")
          setBio(data?.bio || "")
        })
    })
  }, [])

  const handleSaveProfile = async () => {
    if (!user) return

    setIsLoading(true)

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio: bio,
      })
      .eq("id", user.id)

    if (error) {
      toast.error("Failed to update profile")
    } else {
      toast.success("Profile updated successfully")
      setIsEditing(false)
      setProfile({ ...profile, display_name: displayName, bio: bio })
    }

    setIsLoading(false)
  }

  if (!profile) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {profile.display_name || profile.username}
                </h1>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
                {profile.is_admin && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                    ADMIN
                  </span>
                )}
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
              disabled={isLoading}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your display name"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="bg-background/50 min-h-[100px]"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/200</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{profile.bio || "No bio yet"}</p>
            </div>
          )}
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl text-center hover:border-primary/30 transition-all duration-300 glow-on-hover">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{profile.streak_count || 0}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl text-center hover:border-primary/30 transition-all duration-300 glow-on-hover">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Friends</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl text-center hover:border-primary/30 transition-all duration-300 glow-on-hover">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-purple-500/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Messages</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl text-center hover:border-primary/30 transition-all duration-300 glow-on-hover">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-green-500/10 rounded-full">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
                <p className="text-xs text-muted-foreground">Joined</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl">
          <h2 className="text-lg font-bold mb-4 text-foreground">Account Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{user?.email || "Not available"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Username</p>
                <p className="text-sm font-medium text-foreground">{profile.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(profile.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
