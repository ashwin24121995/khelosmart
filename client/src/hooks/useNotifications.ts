import { useState, useEffect, useCallback } from "react";

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
  onClick?: () => void;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback(
    ({ title, body, icon, tag, requireInteraction, onClick }: NotificationOptions) => {
      if (!isSupported || permission !== "granted") {
        console.log("Notifications not available or not permitted");
        return null;
      }

      try {
        const notification = new Notification(title, {
          body,
          icon: icon || "/favicon.png",
          tag,
          requireInteraction,
        });

        if (onClick) {
          notification.onclick = () => {
            window.focus();
            onClick();
            notification.close();
          };
        }

        return notification;
      } catch (error) {
        console.error("Error sending notification:", error);
        return null;
      }
    },
    [isSupported, permission]
  );

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    isEnabled: permission === "granted",
  };
}
