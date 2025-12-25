import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { 
  Loader2,
  Trophy,
  Users,
  Calendar,
  Radio,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";

export default function Contests() {
  const { data: contests, isLoading } = trpc.contests.list.useQuery();

  const upcomingContests = contests?.filter(c => c.status === "upcoming") || [];
  const liveContests = contests?.filter(c => c.status === "live") || [];
  const completedContests = contests?.filter(c => c.status === "completed") || [];

  const ContestCard = ({ contest }: { contest: typeof contests extends (infer T)[] | undefined ? T : never }) => (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg line-clamp-1">{contest.name}</CardTitle>
          <Badge variant={contest.status === "live" ? "destructive" : contest.status === "upcoming" ? "default" : "secondary"}>
            {contest.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <img 
              src={contest.team1Logo || "/favicon.png"} 
              alt={contest.team1Name || "Team 1"}
              className="w-8 h-8 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = "/favicon.png"; }}
            />
            <span className="text-sm font-medium">{contest.team1Name}</span>
          </div>
          <span className="text-muted-foreground">vs</span>
          <div className="flex items-center gap-2">
            <img 
              src={contest.team2Logo || "/favicon.png"} 
              alt={contest.team2Name || "Team 2"}
              className="w-8 h-8 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = "/favicon.png"; }}
            />
            <span className="text-sm font-medium">{contest.team2Name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{contest.currentParticipants}/{contest.maxParticipants}</span>
          </div>
          {contest.matchDateTime && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(contest.matchDateTime), "MMM d, h:mm a")}</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(contest.currentParticipants / contest.maxParticipants) * 100}%` }}
          />
        </div>

        <Button asChild className="w-full">
          <Link href={`/contest/${contest.id}`}>
            {contest.status === "upcoming" ? "Join Contest" : "View Details"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Contests</h1>
          <p className="text-muted-foreground">Join contests and compete with other fantasy cricket fans</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !contests || contests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No contests available at the moment.</p>
              <Button asChild>
                <Link href="/matches">Browse Matches</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming ({upcomingContests.length})
              </TabsTrigger>
              <TabsTrigger value="live" className="gap-2">
                <Radio className="h-4 w-4" />
                Live ({liveContests.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({completedContests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingContests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No upcoming contests. Check back later!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="live">
              {liveContests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No live contests at the moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {completedContests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No completed contests yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
