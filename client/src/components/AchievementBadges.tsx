import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Trophy, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Achievement {
  id: number;
  type: string;
  name: string;
  description: string | null;
  icon: string | null;
  progress: number;
  target: number;
  isCompleted: boolean;
  unlockedAt: Date | null;
}

export function AchievementBadges() {
  const { isAuthenticated } = useAuth();
  
  const { data: achievements, isLoading } = trpc.achievements.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const initializeMutation = trpc.achievements.initialize.useMutation();

  // Initialize achievements for new users
  useEffect(() => {
    if (isAuthenticated && achievements && achievements.length === 0) {
      initializeMutation.mutate();
    }
  }, [isAuthenticated, achievements, initializeMutation]);

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Log in to track your achievements
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
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

  const completedCount = achievements?.filter(a => a.isCompleted).length || 0;
  const totalCount = achievements?.length || 0;

  return (
    <Card id="achievements">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
          <Badge variant="secondary">
            {completedCount}/{totalCount} Unlocked
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {achievements && achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement: Achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No achievements yet</p>
            <p className="text-sm">Start playing to earn badges!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const progressPercent = Math.min((achievement.progress / achievement.target) * 100, 100);
  
  return (
    <div
      className={cn(
        "relative p-4 rounded-lg border transition-all",
        achievement.isCompleted
          ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
          : "bg-muted/30 border-border hover:border-muted-foreground/30"
      )}
    >
      {/* Badge Icon */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "text-3xl p-2 rounded-full",
            achievement.isCompleted
              ? "bg-yellow-500/20"
              : "bg-muted grayscale opacity-50"
          )}
        >
          {achievement.icon || "🏆"}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={cn(
              "font-medium truncate",
              !achievement.isCompleted && "text-muted-foreground"
            )}>
              {achievement.name}
            </h4>
            {achievement.isCompleted ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {achievement.description}
          </p>
          
          {/* Progress */}
          {!achievement.isCompleted && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {achievement.progress}/{achievement.target}
                </span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}
          
          {/* Unlocked date */}
          {achievement.isCompleted && achievement.unlockedAt && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              Unlocked {format(new Date(achievement.unlockedAt), "MMM d, yyyy")}
            </p>
          )}
        </div>
      </div>
      
      {/* Completed overlay effect */}
      {achievement.isCompleted && (
        <div className="absolute top-2 right-2">
          <span className="text-yellow-500 text-lg">✨</span>
        </div>
      )}
    </div>
  );
}

// Mini version for dashboard sidebar
export function AchievementBadgesMini() {
  const { isAuthenticated } = useAuth();
  
  const { data: achievements } = trpc.achievements.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated || !achievements) return null;

  const recentUnlocked = achievements
    .filter(a => a.isCompleted)
    .sort((a, b) => {
      if (!a.unlockedAt || !b.unlockedAt) return 0;
      return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
    })
    .slice(0, 3);

  if (recentUnlocked.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {recentUnlocked.map((achievement: Achievement) => (
        <span
          key={achievement.id}
          className="text-lg cursor-help"
          title={achievement.name}
        >
          {achievement.icon || "🏆"}
        </span>
      ))}
    </div>
  );
}
