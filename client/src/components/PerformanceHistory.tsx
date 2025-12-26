import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Loader2, 
  TrendingUp, 
  TrendingDown, 
  Trophy,
  Target,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";

interface ContestResult {
  id: number;
  contestId: number;
  finalPoints: string | null;
  finalRank: number | null;
  prizeWon: number;
  createdAt: Date;
}

export function PerformanceHistory() {
  const { isAuthenticated } = useAuth();
  
  const { data: teams } = trpc.teams.myTeams.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Calculate performance metrics
  const metrics = useMemo(() => {
    if (!teams || teams.length === 0) return null;

    const completedTeams = teams.filter(t => t.status === "completed" || t.status === "locked");
    const points = completedTeams.map(t => parseFloat(t.totalPoints as string) || 0);
    
    if (points.length === 0) return null;

    const totalPoints = points.reduce((a, b) => a + b, 0);
    const avgPoints = totalPoints / points.length;
    const maxPoints = Math.max(...points);
    const minPoints = Math.min(...points);
    
    // Calculate trend (last 5 vs previous 5)
    const recent5 = points.slice(-5);
    const previous5 = points.slice(-10, -5);
    const recentAvg = recent5.length > 0 ? recent5.reduce((a, b) => a + b, 0) / recent5.length : 0;
    const previousAvg = previous5.length > 0 ? previous5.reduce((a, b) => a + b, 0) / previous5.length : 0;
    const trend = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;

    return {
      totalContests: completedTeams.length,
      totalPoints,
      avgPoints,
      maxPoints,
      minPoints,
      trend,
      recentPoints: points.slice(-10),
    };
  }, [teams]);

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Performance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Log in to view your performance history
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!teams) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Performance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Performance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No contest history yet</p>
            <p className="text-sm">Join contests to see your performance!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Performance History
          </CardTitle>
          <Badge variant="secondary">
            {metrics.totalContests} Contests
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Target className="h-4 w-4" />}
            label="Total Points"
            value={metrics.totalPoints.toFixed(0)}
            color="blue"
          />
          <StatCard
            icon={<BarChart3 className="h-4 w-4" />}
            label="Avg Points"
            value={metrics.avgPoints.toFixed(1)}
            color="green"
          />
          <StatCard
            icon={<Trophy className="h-4 w-4" />}
            label="Best Score"
            value={metrics.maxPoints.toFixed(0)}
            color="yellow"
          />
          <StatCard
            icon={metrics.trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            label="Trend"
            value={`${metrics.trend >= 0 ? "+" : ""}${metrics.trend.toFixed(1)}%`}
            color={metrics.trend >= 0 ? "green" : "red"}
          />
        </div>

        {/* Simple Bar Chart */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Performance</h4>
          <div className="flex items-end gap-1 h-32">
            {metrics.recentPoints.map((points, index) => {
              const height = metrics.maxPoints > 0 
                ? (points / metrics.maxPoints) * 100 
                : 0;
              const isHighest = points === metrics.maxPoints;
              
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-full rounded-t transition-all ${
                      isHighest 
                        ? "bg-yellow-500" 
                        : points >= metrics.avgPoints 
                        ? "bg-green-500" 
                        : "bg-blue-500"
                    }`}
                    style={{ height: `${Math.max(height, 5)}%` }}
                    title={`${points.toFixed(0)} points`}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-yellow-500" /> Best
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500" /> Above Avg
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500" /> Below Avg
            </span>
          </div>
        </div>

        {/* Recent Contests List */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Contests</h4>
          <div className="space-y-2">
            {teams.slice(-5).reverse().map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{team.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(team.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    {parseFloat(team.totalPoints as string).toFixed(0)} pts
                  </p>
                  <Badge 
                    variant={team.status === "completed" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {team.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  color: "blue" | "green" | "yellow" | "red";
}) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    red: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="p-3 rounded-lg bg-muted/30">
      <div className={`inline-flex p-2 rounded-lg ${colorClasses[color]} mb-2`}>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
