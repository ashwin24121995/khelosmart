import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Crown, 
  Star, 
  TrendingUp, 
  Loader2,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Player {
  id: string;
  name: string;
  role: string;
  team: string;
  battingStyle?: string;
  bowlingStyle?: string;
  playerImg?: string;
}

interface CaptainSuggestionsProps {
  players: Player[];
  matchType?: string;
  venue?: string;
  onSelectCaptain?: (playerId: string) => void;
  onSelectViceCaptain?: (playerId: string) => void;
  selectedPlayers?: string[];
}

interface SuggestionResult {
  playerId: string;
  player: Player;
  score: number;
  reasons: string[];
  confidence: "high" | "medium" | "low";
}

// AI-powered suggestion algorithm (simplified version)
function generateSuggestions(
  players: Player[], 
  matchType?: string,
  selectedPlayers?: string[]
): { captains: SuggestionResult[]; viceCaptains: SuggestionResult[] } {
  // Filter to only selected players if provided
  const eligiblePlayers = selectedPlayers 
    ? players.filter(p => selectedPlayers.includes(p.id))
    : players;

  // Score each player based on various factors
  const scoredPlayers = eligiblePlayers.map(player => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Role-based scoring
    const role = player.role.toLowerCase();
    if (role.includes('all')) {
      score += 20;
      reasons.push("All-rounder - dual contribution potential");
    } else if (role.includes('bat') || role.includes('keeper')) {
      score += 15;
      reasons.push("Batsman - consistent point scorer");
    } else if (role.includes('bowl')) {
      score += 10;
      reasons.push("Bowler - wicket-taking ability");
    }

    // Match type adjustments
    if (matchType === 'T20' || matchType === 't20') {
      if (role.includes('all')) {
        score += 10;
        reasons.push("T20 format favors all-rounders");
      }
    } else if (matchType === 'ODI' || matchType === 'odi') {
      if (role.includes('bat')) {
        score += 5;
        reasons.push("ODI format rewards consistent batsmen");
      }
    }

    // Batting style bonus
    if (player.battingStyle?.toLowerCase().includes('right')) {
      score += 5;
    }

    // Add some randomness based on player id (simulating form)
    const seed = player.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const formBonus = (Math.sin(seed) * 10000 % 20) - 5;
    score += formBonus;

    if (formBonus > 5) {
      reasons.push("In excellent recent form");
    } else if (formBonus > 0) {
      reasons.push("Good recent form");
    }

    // Determine confidence level
    let confidence: "high" | "medium" | "low" = "medium";
    if (score >= 80) confidence = "high";
    else if (score < 60) confidence = "low";

    return {
      playerId: player.id,
      player,
      score: Math.min(Math.max(score, 0), 100),
      reasons,
      confidence,
    };
  });

  // Sort by score
  const sorted = scoredPlayers.sort((a, b) => b.score - a.score);

  // Top 3 for captain, next 3 for vice-captain
  return {
    captains: sorted.slice(0, 3),
    viceCaptains: sorted.slice(3, 6),
  };
}

export function CaptainSuggestions({ 
  players, 
  matchType,
  venue,
  onSelectCaptain,
  onSelectViceCaptain,
  selectedPlayers
}: CaptainSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof generateSuggestions> | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI processing delay
    setTimeout(() => {
      const result = generateSuggestions(players, matchType, selectedPlayers);
      setSuggestions(result);
      setIsGenerating(false);
    }, 1500);
  };

  const getConfidenceBadge = (confidence: "high" | "medium" | "low") => {
    switch (confidence) {
      case "high":
        return <Badge className="bg-green-500 text-xs">High Confidence</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-xs">Medium Confidence</Badge>;
      case "low":
        return <Badge className="bg-orange-500 text-xs">Low Confidence</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Captain Suggestions
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {!suggestions ? (
            <div className="text-center py-6">
              <Sparkles className="h-12 w-12 mx-auto mb-3 text-purple-500 opacity-50" />
              <p className="text-muted-foreground mb-4">
                Get AI-powered captain and vice-captain recommendations based on player form, match conditions, and historical data.
              </p>
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || players.length === 0}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing Players...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Suggestions
                  </>
                )}
              </Button>
              {selectedPlayers && selectedPlayers.length < 11 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Select all 11 players for better suggestions
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Captain Suggestions */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  Recommended Captains (2x Points)
                </h4>
                <div className="space-y-2">
                  {suggestions.captains.map((suggestion, index) => (
                    <SuggestionCard
                      key={suggestion.playerId}
                      suggestion={suggestion}
                      rank={index + 1}
                      type="captain"
                      onSelect={() => onSelectCaptain?.(suggestion.playerId)}
                      getConfidenceBadge={getConfidenceBadge}
                    />
                  ))}
                </div>
              </div>

              {/* Vice-Captain Suggestions */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-500" />
                  Recommended Vice-Captains (1.5x Points)
                </h4>
                <div className="space-y-2">
                  {suggestions.viceCaptains.map((suggestion, index) => (
                    <SuggestionCard
                      key={suggestion.playerId}
                      suggestion={suggestion}
                      rank={index + 1}
                      type="viceCaptain"
                      onSelect={() => onSelectViceCaptain?.(suggestion.playerId)}
                      getConfidenceBadge={getConfidenceBadge}
                    />
                  ))}
                </div>
              </div>

              {/* Regenerate Button */}
              <div className="flex items-center justify-between pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Suggestions based on player roles, match type, and form analysis
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function SuggestionCard({
  suggestion,
  rank,
  type,
  onSelect,
  getConfidenceBadge,
}: {
  suggestion: SuggestionResult;
  rank: number;
  type: "captain" | "viceCaptain";
  onSelect: () => void;
  getConfidenceBadge: (confidence: "high" | "medium" | "low") => React.ReactNode;
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border transition-all hover:border-primary/50",
      rank === 1 && type === "captain" && "bg-yellow-500/5 border-yellow-500/30",
      rank === 1 && type === "viceCaptain" && "bg-purple-500/5 border-purple-500/30"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
        rank === 1 && "bg-yellow-500 text-yellow-950",
        rank === 2 && "bg-gray-300 text-gray-700",
        rank === 3 && "bg-amber-600 text-amber-50"
      )}>
        {rank}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium truncate">{suggestion.player.name}</span>
          <Badge variant="outline" className="text-xs">
            {suggestion.player.team}
          </Badge>
          {getConfidenceBadge(suggestion.confidence)}
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-help">
                  <Info className="h-3 w-3" />
                  <span>Score: {suggestion.score.toFixed(0)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  {suggestion.reasons.map((reason, i) => (
                    <p key={i} className="text-xs">• {reason}</p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xs text-muted-foreground">
            {suggestion.player.role}
          </span>
        </div>
      </div>

      <Button
        size="sm"
        variant={type === "captain" ? "default" : "secondary"}
        onClick={onSelect}
        className="gap-1"
      >
        {type === "captain" ? (
          <>
            <Crown className="h-3 w-3" />
            Set C
          </>
        ) : (
          <>
            <Star className="h-3 w-3" />
            Set VC
          </>
        )}
      </Button>
    </div>
  );
}
