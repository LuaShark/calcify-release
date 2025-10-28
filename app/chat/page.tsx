"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  user_id: string
  username: string
  message: string
  created_at: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check authentication
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      // Get user profile
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }) => setProfile(data))
    })

    // Load initial messages
    loadMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel("chat_messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message])
        scrollToBottom()
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100)

    if (error) {
      toast.error("Failed to load messages")
      return
    }

    setMessages(data || [])
    setTimeout(scrollToBottom, 100)
  }

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user || !profile) return

    setIsLoading(true)

    const { error } = await supabase.from("chat_messages").insert({
      user_id: user.id,
      username: profile.username,
      message: newMessage.trim(),
    })

    if (error) {
      toast.error("Failed to send message")
    } else {
      setNewMessage("")
    }

    setIsLoading(false)
  }

  const handleDeleteMessage = async (messageId: string) => {
    const { error } = await supabase.from("chat_messages").delete().eq("id", messageId)

    if (error) {
      toast.error("Failed to delete message")
    } else {
      toast.success("Message deleted", { duration: 2000 })
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-6 px-4">
      <div className="container mx-auto max-w-5xl h-[calc(100vh-8rem)]">
        <Card className="h-full flex flex-col bg-gradient-to-br from-card/80 to-card/40 border-border/50 backdrop-blur-xl">
          {/* Chat Header */}
          <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Global Chat
                </h1>
                <p className="text-xs text-muted-foreground">
                  {messages.length} message{messages.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-3">
              {messages.map((msg) => {
                const isOwnMessage = user && msg.user_id === user.id
                const isAdmin = profile?.is_admin

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} animate-fade-in group`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isOwnMessage
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold">{msg.username}</span>
                        {(isOwnMessage || isAdmin) && (
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3 hover:text-red-400" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm break-words">{msg.message}</p>
                      <span className="text-[10px] opacity-70 mt-1 block">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-border/50 bg-gradient-to-r from-primary/5 to-transparent"
          >
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-background/50 border-border/50"
                maxLength={500}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !newMessage.trim()} className="px-4">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
