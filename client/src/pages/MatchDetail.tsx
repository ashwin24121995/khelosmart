import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link, useParams, useLocation } from "wouter";
import { 
  Loader2,
  Calendar,
  MapPin,
  Trophy,
  Users,
  ArrowLeft,
  Clock,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: matchInfo, isLoading: matchLoading } = trpc.matches.getDetails.useQuery(
    { matchId: id || "" },
    { enabled: !!id }
  );

  // Check if squad data is available for this match
  const { data: squadData, isLoading: squadLoading } = trpc.matches.getSquad.useQuery(
    { matchId: id || "" },
    { enabled: !!id }
  );

  const hasSquadData = squadData && squadData.length > 0 && squadData.some(team => team.players.length > 0);

  const { data: contests, isLoading: contestsLoading } = trpc.contests.list.useQuery(
    { status: "upcoming" }
  );

  const createContestMutation = trpc.contests.create.useMutation({
    onSuccess: (data) => {
      toast.success("Contest created! Redirecting to team creation...");
      setLocation(`/create-team/${id}/${data.contestId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Filter contests for this match
  const matchContests = contests?.filter(c => c.matchId === id) || [];

  const handleJoinContest = (contestId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setLocation(`/create-team/${id}/${contestId}`);
  };

  const handleCreateContest = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!id || !matchInfo) return;

    createContestMutation.mutate({
      matchId: id,
      name: `${matchInfo.teams?.[0]} vs ${matchInfo.teams?.[1]} - Free Contest`,
      description: "Free-to-play fantasy contest",
      maxParticipants: 100,
    });
  };

  if (matchLoading) {
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

  const matchDate = matchInfo.dateTimeGMT ? new Date(matchInfo.dateTimeGMT) : null;
  const isUpcoming = matchInfo.status?.toLowerCase().includes('match not started') || (matchDate && matchDate > new Date());

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/matches">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Matches
          </Link>
        </Button>

        {/* Match Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Team 1 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <img 
                  src={matchInfo.teamInfo?.[0]?.img || "/favicon.png"} 
                  alt={matchInfo.teams?.[0]}
                  className="w-20 h-20 object-contain mb-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/favicon.png";
                  }}
                />
                <h2 className="text-xl font-bold">{matchInfo.teams?.[0]}</h2>
                {matchInfo.score?.[0] && (
                  <p className="text-2xl font-bold text-primary mt-2">
                    {matchInfo.score[0].r}/{matchInfo.score[0].w} ({matchInfo.score[0].o})
                  </p>
                )}
              </div>

              {/* VS */}
              <div className="flex flex-col items-center">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  VS
                </Badge>
                {matchInfo.matchType && (
                  <Badge className="mt-2">{matchInfo.matchType.toUpperCase()}</Badge>
                )}
              </div>

              {/* Team 2 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <img 
                  src={matchInfo.teamInfo?.[1]?.img || "/favicon.png"} 
                  alt={matchInfo.teams?.[1]}
                  className="w-20 h-20 object-contain mb-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/favicon.png";
                  }}
                />
                <h2 className="text-xl font-bold">{matchInfo.teams?.[1]}</h2>
                {matchInfo.score?.[1] && (
                  <p className="text-2xl font-bold text-primary mt-2">
                    {matchInfo.score[1].r}/{matchInfo.score[1].w} ({matchInfo.score[1].o})
                  </p>
                )}
              </div>
            </div>

            {/* Match Info */}
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {matchDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(matchDate, "EEEE, MMMM d, yyyy")}</span>
                </div>
              )}
              {matchDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{format(matchDate, "h:mm a")}</span>
                </div>
              )}
              {matchInfo.venue && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{matchInfo.venue}</span>
                </div>
              )}
            </div>

            {/* Match Status */}
            {matchInfo.status && (
              <div className="mt-4 p-3 bg-muted rounded-lg text-center">
                <p className="text-sm">{matchInfo.status}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Squad Availability Notice */}
        {!squadLoading && !hasSquadData && isUpcoming && (
          <Card className="mb-6 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-700 dark:text-amber-400">Squad data not available yet</p>
                  <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
                    Fantasy team creation will be available once the playing squads are announced. Please check back closer to match time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contests Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Contests</h2>
              <p className="text-muted-foreground">Join a contest and create your fantasy team</p>
            </div>
            {isUpcoming && (
              <Button 
                onClick={handleCreateContest}
                disabled={createContestMutation.isPending}
              >
                {createContestMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trophy className="h-4 w-4 mr-2" />
                )}
                Create Contest
              </Button>
            )}
          </div>

          {contestsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : matchContests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No contests available for this match yet.</p>
                {isUpcoming && (
                  <Button onClick={handleCreateContest} disabled={createContestMutation.isPending}>
                    Create First Contest
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchContests.map((contest) => (
                <Card key={contest.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{contest.name}</CardTitle>
                      <Badge variant={contest.status === "live" ? "destructive" : "default"}>
                        {contest.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{contest.currentParticipants}/{contest.maxParticipants}</span>
                      </div>
                      <Badge variant="secondary">Free Entry</Badge>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(contest.currentParticipants / contest.maxParticipants) * 100}%` 
                        }}
                      />
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => handleJoinContest(contest.id)}
                      disabled={contest.status !== "upcoming"}
                    >
                      {contest.status === "upcoming" ? "Join Contest" : "View Contest"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
