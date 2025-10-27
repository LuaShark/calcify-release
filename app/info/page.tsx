import { Card } from "@/components/ui/card"
import { Clock, Calendar, Lock, Info, Gamepad2 } from "lucide-react"

export default function InfoPage() {
  return (
    <div className="min-h-screen px-4 pt-20 pb-12">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent tracking-tight">
            About Calcify
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the game portal
          </p>
        </div>

        <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm animate-slide-in">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="text-xl font-bold text-foreground">What is Calcify?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Calcify is a game portal designed specifically for Livingston Parish Schools students. It provides
                access to educational and recreational games during appropriate school hours.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-bold text-foreground">How It Works</h2>

          <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">Time-Based Access</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Calcify automatically detects the current school hour and day. Games are only accessible during school
                  hours (7:00 AM - 2:15 PM on weekdays).
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">School Schedule Integration</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The system follows the Livingston Parish Schools schedule, including different hour structures for
                  Monday/Wednesday, Tuesday/Thursday, and Friday.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">PIN Protection</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When the site is locked outside school hours, authorized users can unlock it using a 4-digit PIN.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">Curated Game Library</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All games are carefully selected to be educational, age-appropriate, and safe.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold text-foreground">School Schedule</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monday & Wednesday</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">1st Hour</span>
                  <span className="text-foreground font-semibold">7:00 - 9:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">3rd Hour</span>
                  <span className="text-foreground font-semibold">9:00 - 10:30</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">5th Hour</span>
                  <span className="text-foreground font-semibold">11:00 - 12:30</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">7th Hour</span>
                  <span className="text-foreground font-semibold">12:40 - 2:15</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tuesday & Thursday</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">2nd Hour</span>
                  <span className="text-foreground font-semibold">7:00 - 9:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">4th Hour</span>
                  <span className="text-foreground font-semibold">9:00 - 11:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">6th Hour</span>
                  <span className="text-foreground font-semibold">11:00 - 12:40</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">8th Hour</span>
                  <span className="text-foreground font-semibold">12:40 - 2:15</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Friday</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">1st Hour</span>
                  <span className="text-foreground font-semibold">7:00 - 8:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">2nd Hour</span>
                  <span className="text-foreground font-semibold">8:00 - 9:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">3rd Hour</span>
                  <span className="text-foreground font-semibold">9:00 - 10:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">4th Hour</span>
                  <span className="text-foreground font-semibold">10:00 - 11:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">5th Hour</span>
                  <span className="text-foreground font-semibold">11:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">6th Hour</span>
                  <span className="text-foreground font-semibold">12:00 - 1:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/5 rounded-md">
                  <span className="text-muted-foreground font-medium">7th Hour</span>
                  <span className="text-foreground font-semibold">1:00 - 2:15</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
