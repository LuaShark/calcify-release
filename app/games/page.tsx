"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Maximize2, AlertCircle, Heart, Sparkles } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

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
    id: "br",
    name: "Basket Random",
    url: "/games/br.html",
    category: "Sports",
    description: "Basket Random | Crazy one-on-one basketball with wacky physics and random moves!",
    image: "/games/br.png",
  },
  {
    id: "cookie",
    name: "Cookie Clicker",
    url: "/games/cc.html",
    category: "Idle",
    description: "Cookie Clicker | Bake endless cookies, upgrade your bakery, and build a cookie empire!",
    image: "/games/cc.png",
  },
]

const categories = ["All", "Favorites", "Survival", "Sports", "Idle"]

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [fullscreenGame, setFullscreenGame] = useState<Game | null>(null)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedFavorites = localStorage.getItem("calcify-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("calcify-favorites", JSON.stringify(favorites))
    }
  }, [favorites, mounted])

  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId)
      } else {
        return [...prev, gameId]
      }
    })
  }

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Favorites" && favorites.includes(game.id)) ||
      game.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const launchGame = (game: Game) => {
    toast.loading("Launching...", {
      duration: 2000,
    })
    setFullscreenGame(game)
    setIsGameLoading(true)
  }

  const closeFullscreen = () => {
    setFullscreenGame(null)
    setIsGameLoading(false)
  }

  return (
    <div className="min-h-screen px-6 pt-20 pb-16 relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        ></div>
      </div>

      {fullscreenGame && (
        <div className="fixed inset-0 z-[9999] bg-background">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-[10000] w-10 h-10 flex items-center justify-center bg-black border-2 border-red-500 rounded-full hover:bg-red-500/10 transition-all duration-300 group"
            style={{
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)",
            }}
          >
            <X className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
          </button>

          {isGameLoading && (
            <div className="absolute inset-0 z-[9998] bg-background flex flex-col items-center justify-center gap-6">
              <h2 className="text-4xl font-bold text-foreground tracking-wider">CALCIFY</h2>
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                <div
                  className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"
                  style={{ animationDuration: "1s" }}
                ></div>
              </div>
              <p className="text-muted-foreground">Loading game...</p>
            </div>
          )}

          <iframe
            src={fullscreenGame.url}
            className="absolute inset-0 w-full h-full border-0 m-0 p-0"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              margin: 0,
              padding: 0,
              overflow: "hidden",
            }}
            title={fullscreenGame.name}
            allowFullScreen
            onLoad={() => setIsGameLoading(false)}
          />
        </div>
      )}

      <div className="container mx-auto max-w-7xl space-y-8">
        <div className="text-center space-y-3 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent tracking-tight">
              Games Library
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-base text-muted-foreground font-light">Discover and play amazing games</p>
        </div>

        <Card className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 border-l-4 border-l-yellow-500 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-yellow-500/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-foreground text-base">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                Some games may display advertisements. Please disregard any ads that appear during gameplay.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-3 animate-slide-in">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search for your favorite games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 bg-card/50 backdrop-blur-sm border border-border focus:border-primary text-foreground rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/25 scale-105"
                    : "border border-border text-foreground hover:bg-accent hover:border-primary/50 hover:scale-105"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {games.length > 0 ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {filteredGames.map((game, index) => (
              <Card
                key={game.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 rounded-xl"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-5 space-y-4">
                  {game.image && (
                    <div className="w-full h-44 bg-accent/20 rounded-lg overflow-hidden relative ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        width={300}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(game.id)
                        }}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-full hover:bg-black/90 transition-all duration-300 group/fav ring-2 ring-white/20 hover:ring-red-500/50 hover:scale-110"
                        aria-label={favorites.includes(game.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          className={`h-4 w-4 transition-all duration-300 ${
                            favorites.includes(game.id)
                              ? "fill-red-500 text-red-500 scale-110"
                              : "text-white group-hover/fav:text-red-500 group-hover/fav:scale-110"
                          }`}
                        />
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {game.name}
                      </h3>
                      <Maximize2 className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all flex-shrink-0" />
                    </div>

                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-gradient-to-r from-primary/20 to-accent/20 text-foreground rounded-full border border-primary/30">
                      {game.category}
                    </span>

                    <p className="text-xs text-muted-foreground line-clamp-2">{game.description}</p>

                    <Button
                      onClick={() => launchGame(game)}
                      className="w-full h-10 text-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-lg shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                    >
                      Launch Game
                    </Button>
                  </div>
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
          <div className="text-center py-16">
            <Card className="p-12 bg-card/50 backdrop-blur-sm border-2 border-border rounded-2xl">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground font-medium">
                  {selectedCategory === "Favorites"
                    ? "No favorite games yet. Click the heart icon on games to add them to your favorites!"
                    : "No games found matching your criteria."}
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
