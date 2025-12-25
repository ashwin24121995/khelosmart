import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { 
  Loader2,
  ArrowLeft,
  Trophy,
  Medal,
  Star
} from "lucide-react";

export default function Results() {
  const { id } = useParams<{ id: string }>();

  const { data: matchInfo, isLoading: matchLoading } = trpc.matches.getDetails.useQuery(
    { matchId: id || "" },
    { enabled: !!id }
  );

  const { data: fantasyPoints, isLoading: pointsLoading } = trpc.matches.getFantasyPoints.useQuery(
    { matchId: id || "" },
    { enabled: !!id }
  );

  if (matchLoading || pointsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!matchInfo) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <p className="text-muted-foreground">Match not found</p>
          <Button asChild className="mt-4">
            <Link href="/matches">Back to Matches</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get total points for each player
  const playerTotals = fantasyPoints?.totals || [];

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/matches">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Matches
          </Link>
        </Button>

        {/* Match Result Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <Badge variant="secondary" className="mb-2">Match Completed</Badge>
              <h1 className="text-xl font-bold">{matchInfo.name}</h1>
            </div>

            <div className="flex items-center justify-center gap-8 py-6">
              <div className="flex flex-col items-center">
                <img 
                  src={matchInfo.teamInfo?.[0]?.img || "/favicon.png"} 
                  alt={matchInfo.teams?.[0]}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/favicon.png"; }}
                />
                <span className="font-medium">{matchInfo.teams?.[0]}</span>
                {matchInfo.score?.[0] && (
                  <p className="text-2xl font-bold text-primary mt-2">
                    {matchInfo.score[0].r}/{matchInfo.score[0].w}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({matchInfo.score[0].o})
                    </span>
                  </p>
                )}
              </div>

              <span className="text-muted-foreground">vs</span>

              <div className="flex flex-col items-center">
                <img 
                  src={matchInfo.teamInfo?.[1]?.img || "/favicon.png"} 
                  alt={matchInfo.teams?.[1]}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/favicon.png"; }}
                />
                <span className="font-medium">{matchInfo.teams?.[1]}</span>
                {matchInfo.score?.[1] && (
                  <p className="text-2xl font-bold text-primary mt-2">
                    {matchInfo.score[1].r}/{matchInfo.score[1].w}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({matchInfo.score[1].o})
                    </span>
                  </p>
                )}
              </div>
            </div>

            {matchInfo.status && (
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="font-medium text-primary">{matchInfo.status}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fantasy Points Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Fantasy Points Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!fantasyPoints || playerTotals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Fantasy points data not available for this match.
              </div>
            ) : (
              <div className="space-y-2">
                {playerTotals
                  .sort((a, b) => b.points - a.points)
                  .map((player, index) => (
                    <div 
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index < 3 ? "bg-primary/5" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? "bg-yellow-500 text-white" :
                          index === 1 ? "bg-gray-400 text-white" :
                          index === 2 ? "bg-amber-600 text-white" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          {index === 0 && (
                            <div className="flex items-center gap-1 text-xs text-yellow-600">
                              <Star className="h-3 w-3 fill-current" />
                              <span>Top Scorer</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{player.points}</p>
                        <p className="text-xs text-muted-foreground">Points</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Innings Breakdown */}
        {fantasyPoints?.innings && fantasyPoints.innings.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold">Innings Breakdown</h2>
            {fantasyPoints.innings.map((inning, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{inning.inning}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Batting Points */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Medal className="h-4 w-4" />
                        Batting Points
                      </h4>
                      <div className="space-y-2">
                        {inning.batting?.slice(0, 5).map((player, i) => (
                          <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                            <span>{player.name}</span>
                            <span className="font-bold">{player.points}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bowling Points */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Medal className="h-4 w-4" />
                        Bowling Points
                      </h4>
                      <div className="space-y-2">
                        {inning.bowling?.slice(0, 5).map((player, i) => (
                          <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                            <span>{player.name}</span>
                            <span className="font-bold">{player.points}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
