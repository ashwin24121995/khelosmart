import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Trophy, 
  Users, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function HowToPlay() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How to Play Fantasy Cricket</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to create your dream team and compete with other cricket fans
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <CardTitle className="text-2xl">Select a Match</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse through upcoming cricket matches from various tournaments and leagues. 
                  Choose a match you want to play and click on it to view details and available contests.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>View upcoming, live, and completed matches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Check match details including venue and timing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Join existing contests or create your own</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <CardTitle className="text-2xl">Create Your Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Build your fantasy team by selecting 11 players from both teams. 
                  You need to follow these team composition rules:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-bold text-lg">WK</p>
                    <p className="text-sm text-muted-foreground">1-4 Players</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-bold text-lg">BAT</p>
                    <p className="text-sm text-muted-foreground">3-6 Players</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-bold text-lg">AR</p>
                    <p className="text-sm text-muted-foreground">1-4 Players</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-bold text-lg">BOWL</p>
                    <p className="text-sm text-muted-foreground">3-6 Players</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Maximum 7 players can be selected from one team.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <CardTitle className="text-2xl">Choose Captain & Vice-Captain</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Select your Captain and Vice-Captain wisely as they earn bonus points:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="font-bold">Captain (C)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Earns <strong>2x points</strong> for all actions during the match
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="font-bold">Vice-Captain (VC)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Earns <strong>1.5x points</strong> for all actions during the match
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <CardTitle className="text-2xl">Join Contest & Compete</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Once your team is ready, join a contest and compete with other players. 
                  Track your team's performance in real-time as the match progresses.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Watch live scores and point updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Track your rank on the leaderboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>View detailed player statistics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Points System */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6" />
                Fantasy Points System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">Batting Points</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Run</td>
                        <td className="py-2 text-right font-medium">+1</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Boundary (4)</td>
                        <td className="py-2 text-right font-medium">+1</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Six</td>
                        <td className="py-2 text-right font-medium">+2</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Half Century</td>
                        <td className="py-2 text-right font-medium">+8</td>
                      </tr>
                      <tr>
                        <td className="py-2">Century</td>
                        <td className="py-2 text-right font-medium">+16</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Bowling Points</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Wicket</td>
                        <td className="py-2 text-right font-medium">+25</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Maiden Over</td>
                        <td className="py-2 text-right font-medium">+8</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">3 Wicket Haul</td>
                        <td className="py-2 text-right font-medium">+4</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">4 Wicket Haul</td>
                        <td className="py-2 text-right font-medium">+8</td>
                      </tr>
                      <tr>
                        <td className="py-2">5 Wicket Haul</td>
                        <td className="py-2 text-right font-medium">+16</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/matches">
                <Trophy className="h-5 w-5 mr-2" />
                Start Playing Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
