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

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-green text-white">
        <div className="absolute inset-0 bg-[url('/cricket-pattern.svg')] opacity-10" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Play Fantasy Cricket.
              <br />
              <span className="text-green-200">Test Your Skills.</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl">
              Build your dream cricket team, compete in exciting contests, and prove your cricket knowledge. 100% free to play!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/matches">
                  <Trophy className="h-5 w-5 mr-2" />
                  Start Playing
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
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
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Khelosmart?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket with India's most trusted platform
            </p>
          </div>
          
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
      <section className="py-16 bg-muted/30">
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
      <section className="py-16 bg-background">
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

      {/* CTA Section */}
      <section className="py-16 gradient-green text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Play Fantasy Cricket?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans already playing on Khelosmart. Create your account and start building your dream team today!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/matches">
              <Trophy className="h-5 w-5 mr-2" />
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
