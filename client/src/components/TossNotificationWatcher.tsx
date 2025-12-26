import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, BellRing } from "lucide-react";
import { toast } from "sonner";

interface TossNotificationWatcherProps {
  matchId: string;
  team1?: string;
  team2?: string;
  onTossComplete?: () => void;
}

export function TossNotificationWatcher({ 
  matchId, 
  team1, 
  team2,
  onTossComplete 
}: TossNotificationWatcherProps) {
  const { isSupported, permission, requestPermission, sendNotification, isEnabled } = useNotifications();
  const [isWatching, setIsWatching] = useState(false);
  const previousTossState = useRef<boolean | null>(null);

  // Poll for toss status
  const { data: creationStatus } = trpc.matches.getTeamCreationStatus.useQuery(
    { matchId },
    { 
      enabled: isWatching,
      refetchInterval: isWatching ? 15000 : false, // Poll every 15 seconds when watching
    }
  );

  // Watch for toss completion
  useEffect(() => {
    if (!isWatching || !creationStatus) return;

    const tossCompleted = !!creationStatus.tossInfo;
    
    // Only trigger notification when toss state changes from false to true
    if (previousTossState.current === false && tossCompleted) {
      // Send browser notification
      sendNotification({
        title: "🏏 Toss Completed!",
        body: `${creationStatus.tossInfo?.winner} won the toss and chose to ${creationStatus.tossInfo?.choice}. Create your team now!`,
        tag: `toss-${matchId}`,
        requireInteraction: true,
        onClick: () => {
          // Focus the window when notification is clicked
          window.focus();
        },
      });

      // Also show in-app toast
      toast.success(
        `Toss completed! ${creationStatus.tossInfo?.winner} chose to ${creationStatus.tossInfo?.choice}`,
        {
          duration: 10000,
          action: {
            label: "Create Team",
            onClick: () => onTossComplete?.(),
          },
        }
      );

      onTossComplete?.();
    }

    previousTossState.current = tossCompleted;
  }, [creationStatus, isWatching, matchId, sendNotification, onTossComplete]);

  const handleEnableNotifications = async () => {
    if (permission === "denied") {
      toast.error("Notifications are blocked. Please enable them in your browser settings.");
      return;
    }

    if (permission === "default") {
      const granted = await requestPermission();
      if (!granted) {
        toast.error("Please allow notifications to get toss alerts");
        return;
      }
    }

    setIsWatching(true);
    previousTossState.current = !!creationStatus?.tossInfo;
    toast.success("You'll be notified when the toss happens!");
  };

  const handleDisableNotifications = () => {
    setIsWatching(false);
    toast.info("Toss notifications disabled");
  };

  if (!isSupported) {
    return null;
  }

  // If toss already happened, don't show the watcher
  if (creationStatus?.tossInfo) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {isWatching ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisableNotifications}
          className="gap-2"
        >
          <BellRing className="h-4 w-4 text-primary animate-pulse" />
          <span className="hidden sm:inline">Watching for Toss</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEnableNotifications}
          className="gap-2"
        >
          {permission === "denied" ? (
            <>
              <BellOff className="h-4 w-4 text-muted-foreground" />
              <span className="hidden sm:inline">Notifications Blocked</span>
            </>
          ) : (
            <>
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notify me when toss happens</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
