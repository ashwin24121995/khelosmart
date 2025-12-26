import { useOffline } from "@/hooks/useOffline";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const { isOnline } = useOffline();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-yellow-500 text-yellow-950 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
      <WifiOff className="w-5 h-5" />
      <span className="font-medium">You are offline</span>
    </div>
  );
}
