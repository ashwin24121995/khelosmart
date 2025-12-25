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
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Medal
} from "lucide-react";
import { format } from "date-fns";

export default function ContestDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: contest, isLoading: contestLoading } = trpc.contests.getById.useQuery(
    { contestId: parseInt(id || "0") },
    { enabled: !!id }
  );

  const { data: leaderboard, isLoading: leaderboardLoading } = trpc.contests.getLeaderboard.useQuery(
    { contestId: parseInt(id || "0") },
    { enabled: !!id }
  );

  const handleJoinContest = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (contest) {
      setLocation(`/create-team/${contest.matchId}/${contest.id}`);
    }
  };

  if (contestLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!contest) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <p className="text-muted-foreground">Contest not found</p>
          <Button asChild className="mt-4">
            <Link href="/contests">Back to Contests</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/contests">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contests
          </Link>
        </Button>

        {/* Contest Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{contest.name}</h1>
              <Badge variant={contest.status === "live" ? "destructive" : contest.status === "upcoming" ? "default" : "secondary"}>
                {contest.status}
              </Badge>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-center gap-8 py-6">
              <div className="flex flex-col items-center">
                <img 
                  src={contest.team1Logo || "/favicon.png"} 
                  alt={contest.team1Name || "Team 1"}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/favicon.png"; }}
                />
                <span className="font-medium">{contest.team1Name}</span>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-2">VS</Badge>
                {contest.matchType && (
                  <p className="text-sm text-muted-foreground mt-2">{contest.matchType}</p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src={contest.team2Logo || "/favicon.png"} 
                  alt={contest.team2Name || "Team 2"}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/favicon.png"; }}
                />
                <span className="font-medium">{contest.team2Name}</span>
              </div>
            </div>

            {/* Contest Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{contest.currentParticipants}/{contest.maxParticipants} Joined</span>
              </div>
              {contest.matchDateTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(contest.matchDateTime), "MMM d, h:mm a")}</span>
                </div>
              )}
              {contest.venue && (
                <div className="flex items-center gap-2 text-sm col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{contest.venue}</span>
                </div>
              )}
            </div>

            {/* Join Button */}
            {contest.status === "upcoming" && (
              <div className="mt-6">
                <Button className="w-full" size="lg" onClick={handleJoinContest}>
                  <Trophy className="h-5 w-5 mr-2" />
                  Join Contest & Create Team
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="h-5 w-5" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboardLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : !leaderboard || leaderboard.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No participants yet. Be the first to join!
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.entry.id}
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
                        <p className="font-medium">{entry.user?.name || "Anonymous"}</p>
                        <p className="text-sm text-muted-foreground">{entry.team?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{entry.entry.finalPoints || 0}</p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
