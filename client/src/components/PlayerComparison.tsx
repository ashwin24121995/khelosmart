import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GitCompare, User, Trophy, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  role: string;
  team: string;
  battingStyle?: string;
  bowlingStyle?: string;
  playerImg?: string;
  // Stats (can be extended)
  matches?: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
  economy?: number;
  fantasyPoints?: number;
}

interface PlayerComparisonProps {
  players: Player[];
  matchType?: string;
}

export function PlayerComparison({ players, matchType }: PlayerComparisonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [player1Id, setPlayer1Id] = useState<string>("");
  const [player2Id, setPlayer2Id] = useState<string>("");

  const player1 = players.find(p => p.id === player1Id);
  const player2 = players.find(p => p.id === player2Id);

  // Generate mock stats for comparison (in real app, fetch from API)
  const generateStats = (player: Player) => {
    // Use player id as seed for consistent random stats
    const seed = player.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const random = (min: number, max: number) => {
      const x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    const isBatsman = player.role.toLowerCase().includes('bat') || player.role.toLowerCase().includes('keeper');
    const isBowler = player.role.toLowerCase().includes('bowl');
    const isAllrounder = player.role.toLowerCase().includes('all');

    return {
      matches: random(20, 100),
      runs: isBatsman || isAllrounder ? random(500, 3000) : random(50, 300),
      wickets: isBowler || isAllrounder ? random(20, 150) : random(0, 10),
      average: isBatsman || isAllrounder ? random(25, 55) : random(10, 25),
      strikeRate: isBatsman || isAllrounder ? random(100, 180) : random(80, 120),
      economy: isBowler || isAllrounder ? (random(60, 100) / 10) : (random(80, 120) / 10),
      fantasyPoints: random(500, 2000),
      recentForm: random(60, 100),
    };
  };

  const stats1 = player1 ? generateStats(player1) : null;
  const stats2 = player2 ? generateStats(player2) : null;

  const compareValue = (val1: number, val2: number, higherBetter = true) => {
    if (higherBetter) {
      return val1 > val2 ? "better" : val1 < val2 ? "worse" : "equal";
    }
    return val1 < val2 ? "better" : val1 > val2 ? "worse" : "equal";
  };

  const StatRow = ({ 
    label, 
    value1, 
    value2, 
    higherBetter = true,
    format = (v: number) => v.toString()
  }: { 
    label: string; 
    value1: number; 
    value2: number; 
    higherBetter?: boolean;
    format?: (v: number) => string;
  }) => {
    const comparison = compareValue(value1, value2, higherBetter);
    const comparison2 = compareValue(value2, value1, higherBetter);
    
    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-border last:border-0">
        <div className={cn(
          "text-right font-medium",
          comparison === "better" && "text-green-500",
          comparison === "worse" && "text-red-500"
        )}>
          {format(value1)}
        </div>
        <div className="text-center text-muted-foreground text-sm">
          {label}
        </div>
        <div className={cn(
          "text-left font-medium",
          comparison2 === "better" && "text-green-500",
          comparison2 === "worse" && "text-red-500"
        )}>
          {format(value2)}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <GitCompare className="h-4 w-4" />
          Compare Players
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Player Comparison
          </DialogTitle>
          <DialogDescription>
            Compare stats between two players to make better team decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Player Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Player 1</label>
              <Select value={player1Id} onValueChange={setPlayer1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players
                    .filter(p => p.id !== player2Id)
                    .map(player => (
                      <SelectItem key={player.id} value={player.id}>
                        <div className="flex items-center gap-2">
                          <span>{player.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {player.team}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Player 2</label>
              <Select value={player2Id} onValueChange={setPlayer2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players
                    .filter(p => p.id !== player1Id)
                    .map(player => (
                      <SelectItem key={player.id} value={player.id}>
                        <div className="flex items-center gap-2">
                          <span>{player.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {player.team}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison View */}
          {player1 && player2 && stats1 && stats2 ? (
            <Card>
              <CardContent className="pt-6">
                {/* Player Headers */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold">{player1.name}</h4>
                    <p className="text-xs text-muted-foreground">{player1.role}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {player1.team}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-2xl font-bold text-muted-foreground">VS</div>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold">{player2.name}</h4>
                    <p className="text-xs text-muted-foreground">{player2.role}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {player2.team}
                    </Badge>
                  </div>
                </div>

                {/* Stats Comparison */}
                <div className="space-y-1">
                  <StatRow label="Matches" value1={stats1.matches} value2={stats2.matches} />
                  <StatRow label="Runs" value1={stats1.runs} value2={stats2.runs} />
                  <StatRow label="Wickets" value1={stats1.wickets} value2={stats2.wickets} />
                  <StatRow label="Average" value1={stats1.average} value2={stats2.average} format={v => v.toFixed(1)} />
                  <StatRow label="Strike Rate" value1={stats1.strikeRate} value2={stats2.strikeRate} format={v => v.toFixed(1)} />
                  <StatRow label="Economy" value1={stats1.economy} value2={stats2.economy} higherBetter={false} format={v => v.toFixed(2)} />
                  <StatRow label="Fantasy Points" value1={stats1.fantasyPoints} value2={stats2.fantasyPoints} />
                </div>

                {/* Recent Form */}
                <div className="mt-6 pt-4 border-t">
                  <h5 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Recent Form
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{player1.name}</span>
                        <span className="font-medium">{stats1.recentForm}%</span>
                      </div>
                      <Progress value={stats1.recentForm} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{player2.name}</span>
                        <span className="font-medium">{stats2.recentForm}%</span>
                      </div>
                      <Progress value={stats2.recentForm} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Recommendation
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {stats1.fantasyPoints > stats2.fantasyPoints
                      ? `${player1.name} has higher fantasy points and might be a better pick for your team.`
                      : stats2.fantasyPoints > stats1.fantasyPoints
                      ? `${player2.name} has higher fantasy points and might be a better pick for your team.`
                      : "Both players have similar fantasy points. Consider their roles and match conditions."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <GitCompare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Select two players to compare their stats</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
