"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Maximize2 } from "lucide-react"
import Image from "next/image"

type Game = {
  id: string
  name: string
  url: string
  category: string
  description: string
  image?: string
}

const games: Game[] = [
  {
    id: "minecraft",
    name: "Minecraft 1.8.8",
    url: "https://eaglercraft-unblocked.neocities.org/152/",
    category: "Survival",
    description: "The classic Minecraft 1.8.8 experience in your browser. Build, explore, and survive!",
    image: "/games/minecraft.png",
  },
  {
    id: "snow",
    name: "Snow Rider 3D",
    url: "/games/snow.html",
    category: "Survival",
    description: "Snow Rider 3D | master the snowy slopes on your sled.",
    image: "/games/snow.png",
  },
  {
   id: "arc",
    name: "ARC",
    url: "/games/arc.html",
    category: "Survival",
    description: "Ragdoll Archers | aim, shoot, and defeat enemies with ragdoll physics.",
    image: "/games/arc.png",
    },
]

const categories = ["All", "Survival"]

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [fullscreenGame, setFullscreenGame] = useState<Game | null>(null)

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const launchGame = (game: Game) => {
    setFullscreenGame(game)
  }

  const closeFullscreen = () => {
    setFullscreenGame(null)
  }

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      {fullscreenGame && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Game header */}
            <div className="flex items-center justify-between p-4 bg-card border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">{fullscreenGame.name}</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={closeFullscreen}
                  className="border-border hover:bg-accent bg-transparent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {/* Game iframe */}
            <iframe
              src={fullscreenGame.url}
              className="flex-1 w-full border-0"
              title={fullscreenGame.name}
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Games Library</h1>
          <p className="text-xl text-muted-foreground">Browse and play games</p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 animate-slide-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border text-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "border-border text-foreground hover:bg-accent"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        {games.length > 0 ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {filteredGames.map((game) => (
              <Card
                key={game.id}
                className="p-6 bg-card border-border hover:border-muted-foreground transition-all duration-300 hover:shadow-lg group"
              >
                <div className="space-y-4">
                  {game.image && (
                    <div className="w-full h-40 bg-accent rounded overflow-hidden">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        width={300}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {game.name}
                      </h3>
                      <Maximize2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
                  <Button
                    onClick={() => launchGame(game)}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
                  >
                    Launch
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <Card className="p-12 bg-card border-border">
              <p className="text-xl text-muted-foreground">No games available yet. Check back soon!</p>
            </Card>
          </div>
        )}

        {filteredGames.length === 0 && games.length > 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No games found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
