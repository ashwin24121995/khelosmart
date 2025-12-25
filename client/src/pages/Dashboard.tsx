import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { 
  Loader2,
  Trophy,
  Users,
  Target,
  TrendingUp,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const { data: stats, isLoading: statsLoading } = trpc.user.getStats.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: myEntries, isLoading: entriesLoading } = trpc.contests.myEntries.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: myTeams, isLoading: teamsLoading } = trpc.teams.myTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "Player"}!</h1>
          <p className="text-muted-foreground">Track your fantasy cricket journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Contests</p>
                  <p className="text-2xl font-bold">{stats?.totalContests || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wins</p>
                  <p className="text-2xl font-bold">{stats?.totalWins || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold">{stats?.totalPoints || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contests" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contests" className="gap-2">
              <Trophy className="h-4 w-4" />
              My Contests
            </TabsTrigger>
            <TabsTrigger value="teams" className="gap-2">
              <Users className="h-4 w-4" />
              My Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contests">
            {entriesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : !myEntries || myEntries.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't joined any contests yet.</p>
                  <Button asChild>
                    <Link href="/matches">Browse Matches</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myEntries.map((entry) => (
                  <Card key={entry.entry.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{entry.contest?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.contest?.team1Name} vs {entry.contest?.team2Name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={
                            entry.contest?.status === "live" ? "destructive" :
                            entry.contest?.status === "upcoming" ? "default" : "secondary"
                          }>
                            {entry.contest?.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-bold">{entry.entry.finalPoints || 0} pts</p>
                            <p className="text-xs text-muted-foreground">Rank #{entry.entry.finalRank || "-"}</p>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/contest/${entry.contest?.id}`}>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams">
            {teamsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : !myTeams || myTeams.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't created any teams yet.</p>
                  <Button asChild>
                    <Link href="/matches">Create Your First Team</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myTeams.map((team) => (
                  <Card key={team.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <Badge variant={team.status === "submitted" ? "default" : "secondary"}>
                          {team.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(team.createdAt), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {(team.players as any[])?.length || 0} Players
                        </span>
                        <span className="font-bold text-primary">
                          {team.totalPoints || 0} pts
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
