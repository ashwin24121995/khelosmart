import { useState, useEffect, useRef } from "react";

// Launch date: January 2, 2026 at 00:00:00 IST
// IST is UTC+5:30, so we set the UTC time accordingly
const LAUNCH_DATE = new Date("2026-01-01T18:30:00.000Z"); // This is Jan 2, 2026 00:00:00 IST

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface AnimatedDigitProps {
  value: number;
  label: string;
  isSeconds?: boolean;
}

function AnimatedDigit({ value, label, isSeconds = false }: AnimatedDigitProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsFlipping(true);
      
      // After flip animation starts, update the value
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 150);

      prevValueRef.current = value;
      return () => clearTimeout(timeout);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Glow effect behind the card */}
        <div 
          className={`absolute inset-0 rounded-xl blur-lg transition-opacity duration-300 ${
            isSeconds 
              ? 'bg-yellow-500/40 animate-pulse' 
              : 'bg-green-500/30'
          }`}
        />
        
        {/* Main card */}
        <div 
          className={`
            relative bg-black/50 backdrop-blur-md border rounded-xl 
            p-3 md:p-4 min-w-[60px] md:min-w-[85px]
            transition-all duration-300 ease-out
            ${isSeconds ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' : 'border-green-500/40'}
            ${isFlipping ? 'scale-95' : 'scale-100'}
          `}
          style={{
            perspective: '500px',
          }}
        >
          {/* Flip container */}
          <div 
            className={`
              relative transition-transform duration-150 ease-in-out
              ${isFlipping ? 'transform rotateX-90' : ''}
            `}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
            }}
          >
            <span 
              className={`
                text-2xl md:text-4xl lg:text-5xl font-bold font-mono
                transition-all duration-150
                ${isSeconds ? 'text-yellow-400' : 'text-white'}
                ${isFlipping ? 'opacity-0' : 'opacity-100'}
              `}
              style={{
                textShadow: isSeconds 
                  ? '0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(250, 204, 21, 0.3)' 
                  : '0 0 10px rgba(255, 255, 255, 0.3)',
              }}
            >
              {String(displayValue).padStart(2, '0')}
            </span>
          </div>

          {/* Shine effect */}
          <div 
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
          >
            <div 
              className={`
                absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent
                ${isFlipping ? 'opacity-50' : 'opacity-20'}
                transition-opacity duration-150
              `}
            />
          </div>
        </div>

        {/* Particle effects for seconds */}
        {isSeconds && isFlipping && (
          <>
            <div className="absolute -top-1 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -top-2 right-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
            <div className="absolute -bottom-1 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          </>
        )}
      </div>
      
      <span 
        className={`
          text-xs md:text-sm mt-2 uppercase tracking-wider font-semibold
          ${isSeconds ? 'text-yellow-300' : 'text-green-300'}
        `}
      >
        {label}
      </span>
    </div>
  );
}

function AnimatedColon() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-1">
      <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
      <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" style={{ animationDelay: '0.5s' }} />
    </div>
  );
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
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'pulse 4s ease-in-out infinite',
          }} 
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-[5%] w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
        <div className="absolute top-6 left-[15%] w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        <div className="absolute top-3 right-[10%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-4 left-[25%] w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.7s' }} />
        <div className="absolute bottom-3 right-[20%] w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '1.9s', animationDelay: '0.2s' }} />
        <div className="absolute top-1/2 left-[8%] w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-[5%] w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      <div className="relative container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left side - Launch announcement */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-3 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">Coming Soon</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              <span className="inline-block animate-bounce" style={{ animationDuration: '2s' }}>🚀</span>{' '}
              We're Launching Soon!
            </h2>
            <p className="text-green-200 text-sm md:text-base max-w-md mx-auto lg:mx-0">
              Get ready for India's most exciting free-to-play fantasy cricket platform. 
              Mark your calendar for <span className="text-yellow-400 font-semibold animate-pulse">January 2, 2026</span>!
            </p>
          </div>

          {/* Right side - Animated Countdown timer */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              <AnimatedDigit value={timeLeft.days} label="Days" />
              <AnimatedColon />
              <AnimatedDigit value={timeLeft.hours} label="Hours" />
              <AnimatedColon />
              <AnimatedDigit value={timeLeft.minutes} label="Mins" />
              <AnimatedColon />
              <AnimatedDigit value={timeLeft.seconds} label="Secs" isSeconds />
            </div>
          </div>
        </div>

        {/* Cricket ball decorative element with rotation */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
          <div className="animate-spin" style={{ animationDuration: '10s' }}>
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

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
    </div>
  );
}
