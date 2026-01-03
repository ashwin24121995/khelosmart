import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export function AgeRestrictionBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 border-2 border-white">
              <span className="text-lg font-bold">18+</span>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base font-medium">
                <strong>Age Restriction:</strong> This platform is strictly for users aged 18 years and above.
              </p>
              <p className="text-xs md:text-sm text-red-100 mt-0.5">
                Fantasy sports is not available in: <strong>Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, and Nagaland</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
