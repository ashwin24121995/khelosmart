import { useState, useEffect } from "react";

// Launch date: January 2, 2026 at 00:00:00 IST
// IST is UTC+5:30, so we set the UTC time accordingly
const LAUNCH_DATE = new Date("2026-01-01T18:30:00.000Z"); // This is Jan 2, 2026 00:00:00 IST

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LaunchCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = LAUNCH_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setIsLaunched(true);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render if already launched
  if (isLaunched || !timeLeft) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated sparkles */}
      <div className="absolute top-2 left-[10%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      <div className="absolute top-4 right-[15%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" />
      <div className="absolute bottom-3 left-[30%] w-1 h-1 bg-white rounded-full animate-pulse" />
      <div className="absolute bottom-2 right-[25%] w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />

      <div className="relative container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left side - Launch announcement */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">Coming Soon</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              🚀 We're Launching Soon!
            </h2>
            <p className="text-green-200 text-sm md:text-base max-w-md mx-auto lg:mx-0">
              Get ready for India's most exciting free-to-play fantasy cricket platform. 
              Mark your calendar for <span className="text-yellow-400 font-semibold">January 2, 2026</span>!
            </p>
          </div>

          {/* Right side - Countdown timer */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <span className="text-2xl md:text-4xl font-bold text-white font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-green-300 text-xs md:text-sm mt-2 uppercase tracking-wider">Days</span>
              </div>

              <span className="text-2xl md:text-3xl text-green-400 font-bold animate-pulse">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <span className="text-2xl md:text-4xl font-bold text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-green-300 text-xs md:text-sm mt-2 uppercase tracking-wider">Hours</span>
              </div>

              <span className="text-2xl md:text-3xl text-green-400 font-bold animate-pulse">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <span className="text-2xl md:text-4xl font-bold text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-green-300 text-xs md:text-sm mt-2 uppercase tracking-wider">Mins</span>
              </div>

              <span className="text-2xl md:text-3xl text-green-400 font-bold animate-pulse">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <span className="text-2xl md:text-4xl font-bold text-yellow-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-green-300 text-xs md:text-sm mt-2 uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cricket ball decorative element */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#DC2626" stroke="#991B1B" strokeWidth="4"/>
            <path d="M20 50C20 50 35 30 50 30C65 30 80 50 80 50" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M20 50C20 50 35 70 50 70C65 70 80 50 80 50" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="30" cy="45" r="2" fill="white"/>
            <circle cx="40" cy="35" r="2" fill="white"/>
            <circle cx="60" cy="35" r="2" fill="white"/>
            <circle cx="70" cy="45" r="2" fill="white"/>
            <circle cx="30" cy="55" r="2" fill="white"/>
            <circle cx="40" cy="65" r="2" fill="white"/>
            <circle cx="60" cy="65" r="2" fill="white"/>
            <circle cx="70" cy="55" r="2" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
