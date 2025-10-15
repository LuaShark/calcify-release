import { Card } from "@/components/ui/card"
import { Clock, Calendar, Lock, Info, Gamepad2 } from "lucide-react"

export default function InfoPage() {
  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">About Calcify</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about the game portal</p>
        </div>

        {/* What is Calcify */}
        <Card className="p-6 bg-card border-border animate-slide-in">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl font-bold text-foreground">What is Calcify?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Calcify is a game portal designed specifically for Livingston Parish Schools students. It provides
                access to educational and recreational games during appropriate school hours, helping students take
                productive breaks while maintaining a safe and controlled environment.
              </p>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl font-bold text-foreground">How It Works</h2>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-foreground">Time-Based Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Calcify automatically detects the current school hour and day. Games are only accessible during school
                  hours (7:00 AM - 2:15 PM on weekdays). Outside these hours, the site is locked to ensure students
                  focus on their studies and personal time.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-foreground">School Schedule Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The system follows the Livingston Parish Schools schedule, including different hour structures for
                  Monday/Wednesday, Tuesday/Thursday, and Friday. The home page displays your current expected hour so
                  you always know where you should be.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-foreground">PIN Protection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When the site is locked outside school hours, authorized users can unlock it using a 4-digit PIN. This
                  ensures that only approved individuals can access the games during restricted times.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-foreground">Curated Game Library</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All games are carefully selected to be educational, age-appropriate, and safe. The library includes
                  puzzle games, strategy games, and classic arcade games that help develop problem-solving skills and
                  provide healthy entertainment.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* School Schedule */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold text-foreground">School Schedule</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monday & Wednesday</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1st Hour</span>
                  <span className="text-foreground font-medium">7:00 - 9:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3rd Hour</span>
                  <span className="text-foreground font-medium">9:00 - 10:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">5th Hour</span>
                  <span className="text-foreground font-medium">11:00 - 12:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">7th Hour</span>
                  <span className="text-foreground font-medium">12:40 - 2:15</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tuesday & Thursday</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">2nd Hour</span>
                  <span className="text-foreground font-medium">7:00 - 9:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4th Hour</span>
                  <span className="text-foreground font-medium">9:00 - 11:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">6th Hour</span>
                  <span className="text-foreground font-medium">11:00 - 12:40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">8th Hour</span>
                  <span className="text-foreground font-medium">12:40 - 2:15</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Friday</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1st Hour</span>
                  <span className="text-foreground font-medium">7:00 - 8:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">2nd Hour</span>
                  <span className="text-foreground font-medium">8:00 - 9:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3rd Hour</span>
                  <span className="text-foreground font-medium">9:00 - 10:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4th Hour</span>
                  <span className="text-foreground font-medium">10:00 - 11:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">5th Hour</span>
                  <span className="text-foreground font-medium">11:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">6th Hour</span>
                  <span className="text-foreground font-medium">12:00 - 1:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">7th Hour</span>
                  <span className="text-foreground font-medium">1:00 - 2:15</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
