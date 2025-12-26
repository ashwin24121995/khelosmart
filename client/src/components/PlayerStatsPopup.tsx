import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Zap,
  Award,
  BarChart3
} from "lucide-react";

interface PlayerStats {
  recentForm: number[]; // Last 5 match points
  avgPoints: number;
  highestScore: number;
  matchesPlayed: number;
  selectionPercentage?: number;
  // Batting stats
  battingAvg?: number;
  strikeRate?: number;
  totalRuns?: number;
  // Bowling stats
  bowlingAvg?: number;
  economyRate?: number;
  totalWickets?: number;
}

interface PlayerStatsPopupProps {
  children: React.ReactNode;
  playerName: string;
  playerRole: string;
  team: string;
  stats?: PlayerStats;
}

// Generate mock stats based on player role (in production, fetch from API)
function generateMockStats(role: string): PlayerStats {
  const isBatsman = role.toLowerCase().includes("bat") || role.toLowerCase().includes("wk");
  const isBowler = role.toLowerCase().includes("bowl");
  const isAllrounder = role.toLowerCase().includes("all");

  const basePoints = isBatsman ? 45 : isBowler ? 35 : 40;
  const variance = 20;

  return {
    recentForm: Array.from({ length: 5 }, () => 
      Math.floor(basePoints + (Math.random() - 0.5) * variance * 2)
    ),
    avgPoints: basePoints + Math.floor(Math.random() * 15),
    highestScore: basePoints + 30 + Math.floor(Math.random() * 40),
    matchesPlayed: 10 + Math.floor(Math.random() * 40),
    selectionPercentage: 10 + Math.floor(Math.random() * 80),
    ...(isBatsman || isAllrounder ? {
      battingAvg: 25 + Math.floor(Math.random() * 30),
      strikeRate: 110 + Math.floor(Math.random() * 50),
      totalRuns: 500 + Math.floor(Math.random() * 2000),
    } : {}),
    ...(isBowler || isAllrounder ? {
      bowlingAvg: 20 + Math.floor(Math.random() * 15),
      economyRate: 6 + Math.random() * 3,
      totalWickets: 20 + Math.floor(Math.random() * 80),
    } : {}),
  };
}

function FormIndicator({ form }: { form: number[] }) {
  const avg = form.reduce((a, b) => a + b, 0) / form.length;
  const trend = form[form.length - 1] - form[0];
  
  return (
    <div className="flex items-center gap-1">
      {form.map((points, i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
            points >= 50 
              ? "bg-green-500/20 text-green-500" 
              : points >= 30 
                ? "bg-amber-500/20 text-amber-500" 
                : "bg-red-500/20 text-red-500"
          }`}
        >
          {points}
        </div>
      ))}
      <div className="ml-2">
        {trend > 5 ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : trend < -5 ? (
          <TrendingDown className="h-4 w-4 text-red-500" />
        ) : (
          <Minus className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

export function PlayerStatsPopup({ 
  children, 
  playerName, 
  playerRole, 
  team,
  stats: providedStats 
}: PlayerStatsPopupProps) {
  const [stats] = useState<PlayerStats>(() => providedStats || generateMockStats(playerRole));

  const roleColor = {
    wicketkeeper: "bg-purple-500",
    batsman: "bg-blue-500",
    allrounder: "bg-green-500",
    bowler: "bg-red-500",
  }[playerRole.toLowerCase()] || "bg-gray-500";

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="right" align="start">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{playerName}</h4>
              <p className="text-sm text-muted-foreground">{team}</p>
            </div>
            <Badge className={`${roleColor} text-white`}>
              {playerRole.toUpperCase()}
            </Badge>
          </div>

          {/* Recent Form */}
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Recent Form (Last 5 matches)
            </p>
            <FormIndicator form={stats.recentForm} />
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-muted/50 rounded p-2">
              <p className="text-lg font-bold text-primary">{stats.avgPoints}</p>
              <p className="text-xs text-muted-foreground">Avg Pts</p>
            </div>
            <div className="bg-muted/50 rounded p-2">
              <p className="text-lg font-bold text-green-500">{stats.highestScore}</p>
              <p className="text-xs text-muted-foreground">Highest</p>
            </div>
            <div className="bg-muted/50 rounded p-2">
              <p className="text-lg font-bold">{stats.matchesPlayed}</p>
              <p className="text-xs text-muted-foreground">Matches</p>
            </div>
          </div>

          {/* Selection Percentage */}
          {stats.selectionPercentage !== undefined && (
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Selection Rate
                </span>
                <span className="font-medium">{stats.selectionPercentage}%</span>
              </div>
              <Progress value={stats.selectionPercentage} className="h-1.5" />
            </div>
          )}

          {/* Batting Stats */}
          {stats.battingAvg !== undefined && (
            <div className="border-t pt-2">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Batting Stats
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Avg: </span>
                  <span className="font-medium">{stats.battingAvg}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">SR: </span>
                  <span className="font-medium">{stats.strikeRate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Runs: </span>
                  <span className="font-medium">{stats.totalRuns}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bowling Stats */}
          {stats.bowlingAvg !== undefined && (
            <div className="border-t pt-2">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Award className="h-3 w-3" />
                Bowling Stats
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Avg: </span>
                  <span className="font-medium">{stats.bowlingAvg}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Eco: </span>
                  <span className="font-medium">{stats.economyRate?.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Wkts: </span>
                  <span className="font-medium">{stats.totalWickets}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
