import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface MatchCountdownProps {
  matchDateTime: string | null | undefined;
  onMatchStart?: () => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function MatchCountdown({ matchDateTime, onMatchStart, className = "" }: MatchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!matchDateTime) return;

    const calculateTimeLeft = () => {
      const matchTime = new Date(matchDateTime).getTime();
      const now = new Date().getTime();
      const difference = matchTime - now;

      if (difference <= 0) {
        onMatchStart?.();
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        total: difference,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [matchDateTime, onMatchStart]);

  if (!matchDateTime || !timeLeft) {
    return null;
  }

  // Determine urgency level
  const isUrgent = timeLeft.total < 15 * 60 * 1000; // Less than 15 minutes
  const isWarning = timeLeft.total < 60 * 60 * 1000; // Less than 1 hour

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={`${className}`}>
      <div className={`rounded-lg p-4 ${
        isUrgent 
          ? "bg-red-500/10 border border-red-500/30" 
          : isWarning 
            ? "bg-amber-500/10 border border-amber-500/30" 
            : "bg-primary/10 border border-primary/30"
      }`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {isUrgent ? (
            <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
          ) : (
            <Clock className={`h-5 w-5 ${isWarning ? "text-amber-500" : "text-primary"}`} />
          )}
          <span className={`font-semibold text-sm ${
            isUrgent ? "text-red-500" : isWarning ? "text-amber-500" : "text-primary"
          }`}>
            {isUrgent ? "HURRY! Team locks soon" : "Time until match starts"}
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          {timeLeft.days > 0 && (
            <>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isUrgent ? "text-red-500" : isWarning ? "text-amber-500" : ""
                }`}>
                  {formatNumber(timeLeft.days)}
                </div>
                <div className="text-xs text-muted-foreground">DAYS</div>
              </div>
              <span className="text-xl font-bold text-muted-foreground">:</span>
            </>
          )}
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              isUrgent ? "text-red-500" : isWarning ? "text-amber-500" : ""
            }`}>
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-xs text-muted-foreground">HRS</div>
          </div>
          
          <span className="text-xl font-bold text-muted-foreground">:</span>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              isUrgent ? "text-red-500" : isWarning ? "text-amber-500" : ""
            }`}>
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-xs text-muted-foreground">MIN</div>
          </div>
          
          <span className="text-xl font-bold text-muted-foreground">:</span>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              isUrgent ? "text-red-500 animate-pulse" : isWarning ? "text-amber-500" : ""
            }`}>
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-xs text-muted-foreground">SEC</div>
          </div>
        </div>

        {isUrgent && (
          <p className="text-center text-xs text-red-500 mt-2 font-medium">
            Complete your team selection now!
          </p>
        )}
      </div>
    </div>
  );
}
