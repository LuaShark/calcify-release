"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, UserMinus, Search } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Friend = {
  id: string
  friend_id: string
  status: string
  friend: {
    username: string
    display_name: string
  }
}

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
      loadFriends(user.id)
    })
  }, [])

  const loadFriends = async (userId: string) => {
    const { data, error } = await supabase
      .from("friends")
      .select(
        `
        id,
        friend_id,
        status,
        friend:profiles!friends_friend_id_fkey(username, display_name)
      `,
      )
      .eq("user_id", userId)
      .eq("status", "accepted")

    if (!error && data) {
      setFriends(data as Friend[])
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, display_name")
      .ilike("username", `%${searchQuery}%`)
      .limit(10)

    if (!error && data) {
      setSearchResults(data.filter((p) => p.id !== user?.id))
    }
  }

  const handleAddFriend = async (friendId: string) => {
    if (!user) return

    const { error } = await supabase.from("friends").insert({
      user_id: user.id,
      friend_id: friendId,
      status: "pending",
    })

    if (error) {
      toast.error("Failed to send friend request")
    } else {
      toast.success("Friend request sent")
      setSearchResults([])
      setSearchQuery("")
    }
  }

  const handleRemoveFriend = async (friendshipId: string) => {
    const { error } = await supabase.from("friends").delete().eq("id", friendshipId)

    if (error) {
      toast.error("Failed to remove friend")
    } else {
      toast.success("Friend removed")
      if (user) loadFriends(user.id)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Friends
          </h1>
          <p className="text-muted-foreground">Connect with other Calcify users</p>
        </div>

        {/* Search */}
        <Card className="p-4 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search users..."
                className="pl-10 bg-background/50"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-background/30 rounded-lg hover:bg-background/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{result.display_name || result.username}</p>
                    <p className="text-sm text-muted-foreground">@{result.username}</p>
                  </div>
                  <Button size="sm" onClick={() => handleAddFriend(result.id)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Friends List */}
        <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Your Friends ({friends.length})</h2>
          </div>

          {friends.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No friends yet. Search for users to add them!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {friends.map((friendship) => (
                <div
                  key={friendship.id}
                  className="flex items-center justify-between p-3 bg-background/30 rounded-lg hover:bg-background/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {friendship.friend.display_name || friendship.friend.username}
                    </p>
                    <p className="text-sm text-muted-foreground">@{friendship.friend.username}</p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => handleRemoveFriend(friendship.id)}>
                    <UserMinus className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
