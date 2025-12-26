import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  role: string;
  team: string;
  playerImg?: string;
}

interface MostPickedPlayersProps {
  players: Player[];
  totalTeams?: number;
  contestId?: number;
}

// Generate mock pick percentages (in real app, calculate from database)
function generatePickPercentages(players: Player[]): Map<string, { pickPercent: number; captainPercent: number; vcPercent: number }> {
  const percentages = new Map();
  
  players.forEach(player => {
    // Use player id as seed for consistent random percentages
    const seed = player.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const random = (min: number, max: number, offset: number = 0) => {
      const x = Math.sin(seed + offset) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    // Popular players (based on role) get higher percentages
    const isPopularRole = player.role.toLowerCase().includes('bat') || 
                          player.role.toLowerCase().includes('all');
    const basePercent = isPopularRole ? random(40, 85) : random(15, 60);
    
    percentages.set(player.id, {
      pickPercent: basePercent,
      captainPercent: random(5, 25, 1),
      vcPercent: random(5, 20, 2),
    });
  });

  return percentages;
}

export function MostPickedPlayers({ players, totalTeams = 100, contestId }: MostPickedPlayersProps) {
  const pickPercentages = generatePickPercentages(players);
  
  // Sort players by pick percentage
  const sortedPlayers = [...players].sort((a, b) => {
    const aPercent = pickPercentages.get(a.id)?.pickPercent || 0;
    const bPercent = pickPercentages.get(b.id)?.pickPercent || 0;
    return bPercent - aPercent;
  });

  // Get top 10 most picked
  const topPicked = sortedPlayers.slice(0, 10);

  // Get top captain and vice-captain choices
  const topCaptain = [...players].sort((a, b) => {
    const aPercent = pickPercentages.get(a.id)?.captainPercent || 0;
    const bPercent = pickPercentages.get(b.id)?.captainPercent || 0;
    return bPercent - aPercent;
  })[0];

  const topVC = [...players].sort((a, b) => {
    const aPercent = pickPercentages.get(a.id)?.vcPercent || 0;
    const bPercent = pickPercentages.get(b.id)?.vcPercent || 0;
    return bPercent - aPercent;
  })[0];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Most Picked Players
          </CardTitle>
          <Badge variant="secondary">
            {totalTeams} Teams
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Captain & VC */}
        <div className="grid grid-cols-2 gap-4">
          {topCaptain && (
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  Top Captain
                </span>
              </div>
              <p className="font-semibold truncate">{topCaptain.name}</p>
              <p className="text-xs text-muted-foreground">{topCaptain.team}</p>
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                {pickPercentages.get(topCaptain.id)?.captainPercent}%
              </p>
            </div>
          )}
          {topVC && (
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-purple-500" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                  Top Vice-Captain
                </span>
              </div>
              <p className="font-semibold truncate">{topVC.name}</p>
              <p className="text-xs text-muted-foreground">{topVC.team}</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1">
                {pickPercentages.get(topVC.id)?.vcPercent}%
              </p>
            </div>
          )}
        </div>

        {/* Top 10 Picked Players */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Selection Percentage
          </h4>
          <div className="space-y-3">
            {topPicked.map((player, index) => {
              const stats = pickPercentages.get(player.id);
              const pickPercent = stats?.pickPercent || 0;
              
              return (
                <div key={player.id} className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    index === 0 && "bg-yellow-500 text-yellow-950",
                    index === 1 && "bg-gray-300 text-gray-700",
                    index === 2 && "bg-amber-600 text-amber-50",
                    index > 2 && "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium truncate">{player.name}</span>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {player.team}
                        </Badge>
                      </div>
                      <span className="font-semibold text-primary ml-2">
                        {pickPercent}%
                      </span>
                    </div>
                    <Progress 
                      value={pickPercent} 
                      className="h-1.5"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Differential Picks */}
        <div>
          <h4 className="text-sm font-medium mb-3">
            💎 Differential Picks (Under 20%)
          </h4>
          <div className="flex flex-wrap gap-2">
            {sortedPlayers
              .filter(p => (pickPercentages.get(p.id)?.pickPercent || 0) < 20)
              .slice(0, 5)
              .map(player => (
                <Badge 
                  key={player.id} 
                  variant="outline"
                  className="py-1.5"
                >
                  {player.name} ({pickPercentages.get(player.id)?.pickPercent}%)
                </Badge>
              ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Low-owned players that could help you stand out from the crowd
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
