import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { 
  Radio, 
  RefreshCw, 
  Volume2, 
  VolumeX,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveCommentaryProps {
  matchId: string;
  isLive?: boolean;
}

interface CommentaryBall {
  over: number;
  ball: number;
  score: string;
  commentary: string;
  batsman?: string;
  bowler?: string;
  runs?: number;
  isWicket?: boolean;
  isBoundary?: boolean;
  isSix?: boolean;
}

export function LiveCommentary({ matchId, isLive = false }: LiveCommentaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevCommentaryLength = useRef(0);

  const { data: commentary, isLoading, refetch, isRefetching } = trpc.matches.getCommentary.useQuery(
    { matchId },
    {
      enabled: !!matchId,
      refetchInterval: isLive ? 10000 : false, // Refresh every 10 seconds for live matches
      staleTime: 5000,
    }
  );

  // Play sound on new ball (wicket, boundary, six)
  useEffect(() => {
    if (!soundEnabled || !commentary?.commentary) return;
    
    const currentLength = commentary.commentary.length;
    if (currentLength > prevCommentaryLength.current) {
      const newBalls = commentary.commentary.slice(prevCommentaryLength.current);
      for (const ball of newBalls) {
        if (ball.isWicket) {
          // Play wicket sound
          playSound("wicket");
        } else if (ball.isSix) {
          // Play six sound
          playSound("six");
        } else if (ball.isBoundary) {
          // Play boundary sound
          playSound("four");
        }
      }
    }
    prevCommentaryLength.current = currentLength;
  }, [commentary, soundEnabled]);

  // Auto-scroll to latest
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [commentary, autoScroll]);

  const playSound = (type: "wicket" | "six" | "four") => {
    // Simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case "wicket":
        oscillator.frequency.value = 200;
        oscillator.type = "square";
        break;
      case "six":
        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        break;
      case "four":
        oscillator.frequency.value = 600;
        oscillator.type = "sine";
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const getBallBadge = (ball: CommentaryBall) => {
    if (ball.isWicket) {
      return <Badge variant="destructive" className="text-xs">W</Badge>;
    }
    if (ball.isSix) {
      return <Badge className="bg-purple-600 text-xs">6</Badge>;
    }
    if (ball.isBoundary) {
      return <Badge className="bg-green-600 text-xs">4</Badge>;
    }
    if (ball.runs === 0) {
      return <Badge variant="secondary" className="text-xs">•</Badge>;
    }
    return <Badge variant="outline" className="text-xs">{ball.runs}</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Radio className="h-4 w-4" />
            Ball-by-Ball Commentary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const commentaryList = commentary?.commentary || [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Radio className={cn("h-4 w-4", isLive && "text-red-500 animate-pulse")} />
            Ball-by-Ball Commentary
            {isLive && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                LIVE
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => refetch()}
              disabled={isRefetching}
              title="Refresh"
            >
              <RefreshCw className={cn("h-4 w-4", isRefetching && "animate-spin")} />
            </Button>
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
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          {commentaryList.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Radio className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Commentary not available yet</p>
              <p className="text-sm">Check back when the match starts</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
              <div className="space-y-4">
                {commentaryList.slice().reverse().map((ball: CommentaryBall, index: number) => (
                  <div
                    key={`${ball.over}.${ball.ball}-${index}`}
                    className={cn(
                      "flex gap-3 p-3 rounded-lg transition-colors",
                      ball.isWicket && "bg-red-500/10 border border-red-500/20",
                      ball.isSix && "bg-purple-500/10 border border-purple-500/20",
                      ball.isBoundary && !ball.isSix && "bg-green-500/10 border border-green-500/20",
                      !ball.isWicket && !ball.isBoundary && "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 min-w-[50px]">
                      <span className="text-sm font-medium text-muted-foreground">
                        {ball.over}.{ball.ball}
                      </span>
                      {getBallBadge(ball)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{ball.commentary}</p>
                      {(ball.batsman || ball.bowler) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {ball.bowler && <span>🎳 {ball.bowler}</span>}
                          {ball.bowler && ball.batsman && " to "}
                          {ball.batsman && <span>🏏 {ball.batsman}</span>}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      )}
    </Card>
  );
}
