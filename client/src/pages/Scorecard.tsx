import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { 
  Loader2,
  ArrowLeft,
  RefreshCw
} from "lucide-react";

export default function Scorecard() {
  const { id } = useParams<{ id: string }>();

  const { data: matchInfo, isLoading: matchLoading } = trpc.matches.getDetails.useQuery(
    { matchId: id || "" },
    { enabled: !!id }
  );

  const { data: scorecard, isLoading: scorecardLoading, refetch } = trpc.matches.getScorecard.useQuery(
    { matchId: id || "" },
    { enabled: !!id, refetchInterval: 30000 } // Refresh every 30 seconds
  );

  if (matchLoading || scorecardLoading) {
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

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/matches">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Match Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">{matchInfo.name}</h1>
              <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
            </div>

            <div className="flex items-center justify-center gap-8 py-4">
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
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm">{matchInfo.status}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scorecard */}
        {scorecard && (
          <Tabs defaultValue="batting" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="batting">Batting</TabsTrigger>
              <TabsTrigger value="bowling">Bowling</TabsTrigger>
            </TabsList>

            <TabsContent value="batting">
              {scorecard.scorecard && scorecard.scorecard.length > 0 ? (
                <div className="space-y-6">
                  {scorecard.scorecard.map((inning: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{inning.inning || `Innings ${index + 1}`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-3">Batsman</th>
                                <th className="text-center py-2 px-3">R</th>
                                <th className="text-center py-2 px-3">B</th>
                                <th className="text-center py-2 px-3">4s</th>
                                <th className="text-center py-2 px-3">6s</th>
                                <th className="text-center py-2 px-3">SR</th>
                              </tr>
                            </thead>
                            <tbody>
                              {inning.batting?.map((batsman: any, i: number) => (
                                <tr key={i} className="border-b last:border-0">
                                  <td className="py-2 px-3">
                                    <p className="font-medium">{batsman.batsman?.name}</p>
                                    <p className="text-xs text-muted-foreground">{batsman["dismissal-text"]}</p>
                                  </td>
                                  <td className="text-center py-2 px-3 font-bold">{batsman.r}</td>
                                  <td className="text-center py-2 px-3">{batsman.b}</td>
                                  <td className="text-center py-2 px-3">{batsman["4s"]}</td>
                                  <td className="text-center py-2 px-3">{batsman["6s"]}</td>
                                  <td className="text-center py-2 px-3">{batsman.sr}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    Batting scorecard not available yet.
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bowling">
              {scorecard.scorecard && scorecard.scorecard.length > 0 ? (
                <div className="space-y-6">
                  {scorecard.scorecard.map((inning: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{inning.inning || `Innings ${index + 1}`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-3">Bowler</th>
                                <th className="text-center py-2 px-3">O</th>
                                <th className="text-center py-2 px-3">M</th>
                                <th className="text-center py-2 px-3">R</th>
                                <th className="text-center py-2 px-3">W</th>
                                <th className="text-center py-2 px-3">Econ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {inning.bowling?.map((bowler: any, i: number) => (
                                <tr key={i} className="border-b last:border-0">
                                  <td className="py-2 px-3 font-medium">{bowler.bowler?.name}</td>
                                  <td className="text-center py-2 px-3">{bowler.o}</td>
                                  <td className="text-center py-2 px-3">{bowler.m}</td>
                                  <td className="text-center py-2 px-3">{bowler.r}</td>
                                  <td className="text-center py-2 px-3 font-bold">{bowler.w}</td>
                                  <td className="text-center py-2 px-3">{bowler.eco}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    Bowling scorecard not available yet.
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
