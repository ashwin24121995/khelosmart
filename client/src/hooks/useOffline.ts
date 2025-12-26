import { useState, useEffect, useCallback } from "react";

interface OfflineState {
  isOnline: boolean;
  isServiceWorkerReady: boolean;
  lastOnlineAt: Date | null;
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isServiceWorkerReady: false,
    lastOnlineAt: null,
  });

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[Offline] Service worker registered:", registration.scope);
          setState(prev => ({ ...prev, isServiceWorkerReady: true }));
        })
        .catch((error) => {
          console.error("[Offline] Service worker registration failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ 
        ...prev, 
        isOnline: true,
        lastOnlineAt: new Date()
      }));
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const cacheMatchData = useCallback((matchId: string) => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CACHE_MATCH_DATA",
        matchId,
      });
    }
  }, []);

  const clearCache = useCallback(async () => {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
  }, []);

  return {
    ...state,
    cacheMatchData,
    clearCache,
  };
}
