import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { format } from "date-fns";

interface MatchCardProps {
  match: {
    id: string;
    dateTimeGMT: string;
    matchType: string;
    status: string;
    ms: "fixture" | "live" | "result";
    t1: string;
    t2: string;
    t1s: string;
    t2s: string;
    t1img: string;
    t2img: string;
    series: string;
  };
}

export default function MatchCard({ match }: MatchCardProps) {
  const matchDate = new Date(match.dateTimeGMT);
  const isUpcoming = match.ms === "fixture";
  const isLive = match.ms === "live";
  const isCompleted = match.ms === "result";

  // Extract team names without abbreviations
  const team1Name = match.t1.split("[")[0].trim();
  const team2Name = match.t2.split("[")[0].trim();

  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-0">
        {/* Match Header */}
        <div className="px-4 py-2 bg-muted/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground truncate flex-1">
            {match.series}
          </span>
          <Badge 
            variant={isLive ? "destructive" : isUpcoming ? "default" : "secondary"}
            className={isLive ? "animate-pulse" : ""}
          >
            {isLive ? "LIVE" : isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
        </div>

        {/* Teams */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Team 1 */}
            <div className="flex-1 flex flex-col items-center text-center">
              <img 
                src={match.t1img || "/placeholder-team.png"} 
                alt={team1Name}
                className="w-12 h-12 object-contain mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/favicon.png";
                }}
              />
              <span className="text-sm font-medium line-clamp-2">{team1Name}</span>
              {(isLive || isCompleted) && match.t1s && (
                <span className="text-lg font-bold text-primary mt-1">{match.t1s}</span>
              )}
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground font-medium">VS</span>
              {match.matchType && (
                <Badge variant="outline" className="mt-1 text-xs">
                  {match.matchType.toUpperCase()}
                </Badge>
              )}
            </div>

            {/* Team 2 */}
            <div className="flex-1 flex flex-col items-center text-center">
              <img 
                src={match.t2img || "/placeholder-team.png"} 
                alt={team2Name}
                className="w-12 h-12 object-contain mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/favicon.png";
                }}
              />
              <span className="text-sm font-medium line-clamp-2">{team2Name}</span>
              {(isLive || isCompleted) && match.t2s && (
                <span className="text-lg font-bold text-primary mt-1">{match.t2s}</span>
              )}
            </div>
          </div>

          {/* Match Status/Time */}
          <div className="mt-4 pt-4 border-t">
            {isUpcoming ? (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(matchDate, "MMM d, yyyy 'at' h:mm a")}</span>
              </div>
            ) : (
              <p className="text-sm text-center text-muted-foreground line-clamp-1">
                {match.status}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            {isUpcoming && (
              <Button asChild className="flex-1">
                <Link href={`/match/${match.id}`}>
                  <Trophy className="h-4 w-4 mr-2" />
                  Create Team
                </Link>
              </Button>
            )}
            {isLive && (
              <>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/scorecard/${match.id}`}>
                    Live Score
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/match/${match.id}`}>
                    View Contest
                  </Link>
                </Button>
              </>
            )}
            {isCompleted && (
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/results/${match.id}`}>
                  View Results
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
