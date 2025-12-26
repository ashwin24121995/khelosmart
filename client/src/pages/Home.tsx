import Layout from "@/components/Layout";
import MatchCard from "@/components/MatchCard";
import { LaunchCountdownBanner } from "@/components/LaunchCountdownBanner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { 
  Trophy, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  Loader2,
  Calendar,
  Radio,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const { data: matchData, isLoading, error } = trpc.matches.getLiveScores.useQuery();

  return (
    <Layout>
      {/* Launch Countdown Banner - Auto-removes after Jan 2, 2026 */}
      <LaunchCountdownBanner />

      {/* Hero Section with Stadium Background */}
      <section className="relative overflow-hidden text-white min-h-[600px]">
        {/* Stadium Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-cricket-stadium.webp')" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-300 text-sm font-medium">100% Free to Play</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Play Fantasy Cricket.
              <br />
              <span className="text-green-400">Test Your Skills.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
              Build your dream cricket team, compete in exciting contests, and prove your cricket knowledge. Join India's most exciting fantasy cricket platform!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg" asChild>
                <Link href="/matches">
                  <Trophy className="h-5 w-5 mr-2" />
                  Start Playing
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/how-to-play">
                  Learn How to Play
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-gray-950"/>
          </svg>
        </div>
      </section>

      {/* Fantasy Team Creation Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/fantasy-team-creation.webp" 
                  alt="Fantasy Team Selection Interface" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-card border rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">11</p>
                    <p className="text-sm text-muted-foreground">Players per team</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Build Your <span className="text-primary">Dream Team</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Select players from both teams, pick your captain and vice-captain wisely, and watch your points soar as they perform on the field!
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>Choose from real cricket players with detailed stats</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>Captain gets 2x points, Vice-Captain gets 1.5x points</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>Create multiple teams for the same match</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/matches">
                  Create Your Team
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Action Images */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Khelosmart?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket with India's most trusted platform
            </p>
          </div>
          
          {/* Feature cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Batsman Card */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/images/cricket-action-batsman.webp" 
                alt="Cricket Batsman in Action" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Real-Time Scoring</h3>
                <p className="text-gray-200 text-sm">
                  Every run, every boundary, every wicket - watch your points update live as the action unfolds!
                </p>
              </div>
            </div>

            {/* Bowler Card */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/images/cricket-bowler-action.webp" 
                alt="Cricket Bowler in Action" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Strategic Gameplay</h3>
                <p className="text-gray-200 text-sm">
                  Pick the right combination of batsmen, bowlers, and all-rounders to maximize your points.
                </p>
              </div>
            </div>
          </div>

          {/* Feature icons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free to Play</h3>
              <p className="text-sm text-muted-foreground">
                No entry fees, no hidden charges. Play fantasy cricket absolutely free!
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-sm text-muted-foreground">
                Live scores, instant point calculations, and real-time leaderboards.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Compete & Have Fun</h3>
              <p className="text-sm text-muted-foreground">
                Join contests, compete with other fans, and climb the leaderboard for bragging rights.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Cricket Matches</h2>
              <p className="text-muted-foreground">Create your fantasy team for upcoming matches</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/matches">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Failed to load matches. Please try again later.</p>
            </div>
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Upcoming ({matchData?.upcoming.length || 0})
                </TabsTrigger>
                <TabsTrigger value="live" className="gap-2">
                  <Radio className="h-4 w-4" />
                  Live ({matchData?.live.length || 0})
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Completed ({matchData?.completed.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {matchData?.upcoming.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No upcoming matches at the moment.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchData?.upcoming.slice(0, 6).map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="live">
                {matchData?.live.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No live matches at the moment.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchData?.live.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed">
                {matchData?.completed.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No completed matches to show.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchData?.completed.slice(0, 6).map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with fantasy cricket in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Select a Match</h3>
              <p className="text-muted-foreground">
                Choose from upcoming cricket matches across various tournaments and leagues.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Create Your Team</h3>
              <p className="text-muted-foreground">
                Pick 11 players including batsmen, bowlers, all-rounders, and a wicket-keeper.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Join & Compete</h3>
              <p className="text-muted-foreground">
                Join contests, track live scores, and see your team climb the leaderboard!
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/how-to-play">
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with Trophy */}
      <section className="py-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-green" />
        
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Play Fantasy Cricket?
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-xl">
                Join thousands of cricket fans already playing on Khelosmart. Create your account and start building your dream team today!
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/matches">
                  <Trophy className="h-5 w-5 mr-2" />
                  Get Started Now
                </Link>
              </Button>
            </div>
            
            {/* Trophy Image */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <img 
                  src="/images/trophy-celebration.webp" 
                  alt="Championship Trophy" 
                  className="w-72 h-72 object-contain drop-shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
