import { AlertTriangle, MapPin } from "lucide-react";

interface RestrictedStatesNoticeProps {
  variant?: "banner" | "card" | "inline";
  className?: string;
}

const RESTRICTED_STATES = [
  "Telangana",
  "Andhra Pradesh", 
  "Assam",
  "Odisha",
  "Sikkim",
  "Nagaland"
];

export function RestrictedStatesNotice({ variant = "card", className = "" }: RestrictedStatesNoticeProps) {
  if (variant === "banner") {
    return (
      <div className={`bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">State Restrictions Apply</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Fantasy sports services are <strong>not available</strong> to residents of the following states due to local regulations:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {RESTRICTED_STATES.map((state) => (
                <span 
                  key={state}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-medium rounded"
                >
                  <MapPin className="h-3 w-3" />
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-sm text-muted-foreground ${className}`}>
        <strong>Restricted States:</strong> {RESTRICTED_STATES.join(", ")}
      </p>
    );
  }

  // Default card variant
  return (
    <div className={`bg-card border rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
        </div>
        <h3 className="text-lg font-semibold">State Restrictions</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        In compliance with local laws and regulations, fantasy sports services are <strong>not available</strong> to residents of the following states:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {RESTRICTED_STATES.map((state) => (
          <div 
            key={state}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{state}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        If you are a resident of any of these states, you are not permitted to participate in fantasy sports contests on this platform.
      </p>
    </div>
  );
}

export { RESTRICTED_STATES };
