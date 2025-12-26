import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link, useParams, useLocation } from "wouter";
import { 
  Loader2,
  ArrowLeft,
  ArrowRight,
  User,
  Star,
  Check,
  X,
  AlertCircle,
  Lock,
  Clock,
  Trophy
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  team: string;
  fantasyRole: string;
}

interface SelectedPlayer extends Player {
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

const ROLE_LIMITS = {
  batsman: { min: 3, max: 6 },
  bowler: { min: 3, max: 6 },
  allrounder: { min: 1, max: 4 },
  wicketkeeper: { min: 1, max: 4 },
};

const TEAM_LIMIT = 7; // Max players from one team

export default function CreateTeam() {
  const { matchId, contestId } = useParams<{ matchId: string; contestId: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [step, setStep] = useState<"select" | "captain" | "confirm">("select");
  const [teamName, setTeamName] = useState("My Team 1");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Check if user can play
  const { data: canPlayData, isLoading: canPlayLoading } = trpc.user.canPlay.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Get squad data
  const { data: squadData, isLoading: squadLoading, error: squadError } = trpc.matches.getSquad.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );

  // Get match info
  const { data: matchInfo } = trpc.matches.getDetails.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );

  // Check team creation status (toss check)
  const { data: creationStatus, isLoading: statusLoading } = trpc.matches.getTeamCreationStatus.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId, refetchInterval: 30000 } // Refresh every 30 seconds
  );

  // Create team mutation
  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully!");
      setLocation(`/contest/${contestId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  // Flatten all players from both teams
  const allPlayers = useMemo(() => {
    if (!squadData) return [];
    return squadData.flatMap(team => 
      team.players.map(player => ({
        ...player,
        team: team.teamName,
      }))
    );
  }, [squadData]);

  // Group players by role
  const playersByRole = useMemo(() => {
    const grouped: Record<string, Player[]> = {
      wicketkeeper: [],
      batsman: [],
      allrounder: [],
      bowler: [],
    };
    
    allPlayers.forEach(player => {
      const role = player.fantasyRole?.toLowerCase() || "batsman";
      if (grouped[role]) {
        grouped[role].push(player);
      } else {
        grouped.batsman.push(player);
      }
    });
    
    return grouped;
  }, [allPlayers]);

  // Count selected players by role and team
  const selectionCounts = useMemo(() => {
    const byRole: Record<string, number> = {
      batsman: 0,
      bowler: 0,
      allrounder: 0,
      wicketkeeper: 0,
    };
    const byTeam: Record<string, number> = {};

    selectedPlayers.forEach(player => {
      const role = player.fantasyRole?.toLowerCase() || "batsman";
      byRole[role] = (byRole[role] || 0) + 1;
      byTeam[player.team] = (byTeam[player.team] || 0) + 1;
    });

    return { byRole, byTeam };
  }, [selectedPlayers]);

  const isPlayerSelected = (playerId: string) => {
    return selectedPlayers.some(p => p.id === playerId);
  };

  const canSelectPlayer = (player: Player) => {
    if (selectedPlayers.length >= 11) return false;
    if (isPlayerSelected(player.id)) return true;

    const role = player.fantasyRole?.toLowerCase() || "batsman";
    const roleLimit = ROLE_LIMITS[role as keyof typeof ROLE_LIMITS];
    if (roleLimit && selectionCounts.byRole[role] >= roleLimit.max) return false;

    const teamCount = selectionCounts.byTeam[player.team] || 0;
    if (teamCount >= TEAM_LIMIT) return false;

    return true;
  };

  const togglePlayer = (player: Player) => {
    if (isPlayerSelected(player.id)) {
      setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
    } else if (canSelectPlayer(player)) {
      setSelectedPlayers(prev => [...prev, player]);
    }
  };

  const setCaptain = (playerId: string) => {
    setSelectedPlayers(prev => prev.map(p => ({
      ...p,
      isCaptain: p.id === playerId,
      isViceCaptain: p.id === playerId ? false : p.isViceCaptain,
    })));
  };

  const setViceCaptain = (playerId: string) => {
    setSelectedPlayers(prev => prev.map(p => ({
      ...p,
      isViceCaptain: p.id === playerId,
      isCaptain: p.id === playerId ? false : p.isCaptain,
    })));
  };

  const captain = selectedPlayers.find(p => p.isCaptain);
  const viceCaptain = selectedPlayers.find(p => p.isViceCaptain);

  const isTeamValid = () => {
    if (selectedPlayers.length !== 11) return false;
    
    for (const [role, limits] of Object.entries(ROLE_LIMITS)) {
      const count = selectionCounts.byRole[role] || 0;
      if (count < limits.min || count > limits.max) return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!captain || !viceCaptain) {
      toast.error("Please select both Captain and Vice-Captain");
      return;
    }

    createTeamMutation.mutate({
      contestId: parseInt(contestId || "0"),
      matchId: matchId || "",
      name: teamName,
      captainId: captain.id,
      viceCaptainId: viceCaptain.id,
      players: selectedPlayers.map(p => ({
        id: p.id,
        name: p.name,
        role: p.fantasyRole,
        team: p.team,
      })),
    });
  };

  // Check eligibility
  if (!authLoading && isAuthenticated && canPlayData && !canPlayData.canPlay) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
              <h2 className="text-xl font-bold mb-2">Cannot Create Team</h2>
              <p className="text-muted-foreground mb-4">{canPlayData.reason}</p>
              <Button asChild>
                <Link href="/verify-age">Complete Verification</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (squadLoading || authLoading || canPlayLoading || statusLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Show lock screen if team creation is not allowed (before toss or match started)
  if (creationStatus && !creationStatus.canCreate) {
    return (
      <Layout>
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={`/match/${matchId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Match
            </Link>
          </Button>
          
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-12 text-center">
              {creationStatus.matchStatus === "live" || creationStatus.matchStatus === "completed" ? (
                <>
                  <Lock className="h-16 w-16 mx-auto text-red-500 mb-6" />
                  <h2 className="text-2xl font-bold mb-3">Team Locked</h2>
                  <p className="text-muted-foreground mb-6">
                    {creationStatus.reason}
                  </p>
                </>
              ) : (
                <>
                  <Clock className="h-16 w-16 mx-auto text-amber-500 mb-6 animate-pulse" />
                  <h2 className="text-2xl font-bold mb-3">Waiting for Toss</h2>
                  <p className="text-muted-foreground mb-4">
                    Team creation will open after the toss is completed.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Why wait for toss?</strong><br/>
                      After the toss, you'll know which team is batting/bowling first, helping you make better player selections!
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Checking for toss result...</span>
                  </div>
                </>
              )}
              
              {creationStatus.tossInfo && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Toss Result</span>
                  </div>
                  <p className="text-sm">
                    <strong className="capitalize">{creationStatus.tossInfo.winner}</strong> won the toss and chose to <strong>{creationStatus.tossInfo.choice}</strong>
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 justify-center mt-6">
                <Button asChild variant="outline">
                  <Link href="/matches">Browse Matches</Link>
                </Button>
                <Button asChild>
                  <Link href={`/match/${matchId}`}>View Match Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (squadError || !squadData || squadData.length === 0) {
    return (
      <Layout>
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={`/match/${matchId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Match
            </Link>
          </Button>
          
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-16 w-16 mx-auto text-amber-500 mb-6" />
              <h2 className="text-2xl font-bold mb-3">Squad Not Available Yet</h2>
              <p className="text-muted-foreground mb-6">
                Fantasy squad data for this match is not available yet. This typically happens when:
              </p>
              <ul className="text-sm text-muted-foreground text-left max-w-sm mx-auto space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>The match is too far in the future</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Teams haven't announced their playing XI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>The series doesn't have fantasy data coverage</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mb-6">
                Please check back closer to the match start time, or try another match.
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild variant="outline">
                  <Link href="/matches">Browse Matches</Link>
                </Button>
                <Button asChild>
                  <Link href={`/match/${matchId}`}>View Match Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/match/${matchId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold">
              {step === "select" ? "Select Players" : step === "captain" ? "Choose Captain" : "Confirm Team"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {matchInfo?.teams?.[0]} vs {matchInfo?.teams?.[1]}
            </p>
          </div>
          <div className="w-20" />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 w-20 rounded-full ${step === "select" ? "bg-primary" : "bg-primary"}`} />
          <div className={`h-2 w-20 rounded-full ${step === "captain" || step === "confirm" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-20 rounded-full ${step === "confirm" ? "bg-primary" : "bg-muted"}`} />
        </div>

        {/* Selection Summary */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <span>Players: <strong>{selectedPlayers.length}/11</strong></span>
                <span className="text-muted-foreground">|</span>
                <span>WK: {selectionCounts.byRole.wicketkeeper || 0}</span>
                <span>BAT: {selectionCounts.byRole.batsman || 0}</span>
                <span>AR: {selectionCounts.byRole.allrounder || 0}</span>
                <span>BOWL: {selectionCounts.byRole.bowler || 0}</span>
              </div>
              {step === "select" && (
                <Button 
                  onClick={() => setStep("captain")}
                  disabled={!isTeamValid()}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              {step === "captain" && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep("select")}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep("confirm")}
                    disabled={!captain || !viceCaptain}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
              {step === "confirm" && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep("captain")}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={createTeamMutation.isPending}
                  >
                    {createTeamMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    Create Team
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Player Selection Step */}
        {step === "select" && (
          <Tabs defaultValue="wicketkeeper" className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="wicketkeeper" className="gap-1">
                WK ({selectionCounts.byRole.wicketkeeper || 0})
              </TabsTrigger>
              <TabsTrigger value="batsman" className="gap-1">
                BAT ({selectionCounts.byRole.batsman || 0})
              </TabsTrigger>
              <TabsTrigger value="allrounder" className="gap-1">
                AR ({selectionCounts.byRole.allrounder || 0})
              </TabsTrigger>
              <TabsTrigger value="bowler" className="gap-1">
                BOWL ({selectionCounts.byRole.bowler || 0})
              </TabsTrigger>
            </TabsList>

            {Object.entries(playersByRole).map(([role, players]) => (
              <TabsContent key={role} value={role}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {players.map((player) => {
                    const selected = isPlayerSelected(player.id);
                    const canSelect = canSelectPlayer(player);
                    
                    return (
                      <Card 
                        key={player.id}
                        className={`cursor-pointer transition-all ${
                          selected 
                            ? "border-primary ring-2 ring-primary bg-primary/5" 
                            : canSelect 
                              ? "hover:border-primary/50" 
                              : "opacity-50"
                        }`}
                        onClick={() => canSelect && togglePlayer(player)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                              <User className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.team}</p>
                            </div>
                            {selected && (
                              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                <Check className="h-4 w-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Captain Selection Step */}
        {step === "captain" && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                Captain gets 2x points, Vice-Captain gets 1.5x points
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedPlayers.map((player) => (
                <Card key={player.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.team}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={player.isCaptain ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setCaptain(player.id)}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        C
                      </Button>
                      <Button
                        variant={player.isViceCaptain ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setViceCaptain(player.id)}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        VC
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Step */}
        {step === "confirm" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Captain (2x)</p>
                      <p className="font-bold">{captain?.name}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Vice-Captain (1.5x)</p>
                      <p className="font-bold">{viceCaptain?.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(ROLE_LIMITS).map(([role, limits]) => (
                      <div key={role} className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase">{role}</p>
                        <p className="text-lg font-bold">{selectionCounts.byRole[role] || 0}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Selected Players</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedPlayers.map((player) => (
                        <div 
                          key={player.id}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {player.fantasyRole?.substring(0, 3).toUpperCase()}
                            </Badge>
                            <span className="text-sm">{player.name}</span>
                          </div>
                          {player.isCaptain && <Badge>C</Badge>}
                          {player.isViceCaptain && <Badge variant="secondary">VC</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
