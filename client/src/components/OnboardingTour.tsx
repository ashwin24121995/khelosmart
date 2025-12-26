import { useEffect, useState } from "react";
import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

// Define tour steps for different pages
const homeTourSteps: DriveStep[] = [
  {
    element: "#matches-section",
    popover: {
      title: "🏏 Live Matches",
      description: "View all upcoming and live cricket matches. Click on any match to see details and create your fantasy team!",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#how-it-works",
    popover: {
      title: "📖 How It Works",
      description: "New to fantasy cricket? Learn how to play, create teams, and compete with others!",
      side: "top",
      align: "center",
    },
  },
];

const createTeamTourSteps: DriveStep[] = [
  {
    element: "#player-selection",
    popover: {
      title: "👥 Select Players",
      description: "Choose 11 players for your team. You need at least 1 wicketkeeper, 3 batsmen, 1 all-rounder, and 3 bowlers.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#player-stats-hover",
    popover: {
      title: "📊 Player Stats",
      description: "Hover over any player to see their detailed statistics and recent form!",
      side: "right",
      align: "center",
    },
  },
  {
    element: "#templates-button",
    popover: {
      title: "💾 Save Templates",
      description: "Save your team as a template to quickly reuse it for similar matches!",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#captain-selection",
    popover: {
      title: "👑 Captain & Vice-Captain",
      description: "Your captain earns 2x points and vice-captain earns 1.5x points. Choose wisely!",
      side: "bottom",
      align: "center",
    },
  },
];

const dashboardTourSteps: DriveStep[] = [
  {
    element: "#my-contests",
    popover: {
      title: "🏆 My Contests",
      description: "View all the contests you've joined and track your performance!",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#my-teams",
    popover: {
      title: "👥 My Teams",
      description: "Manage all your fantasy teams here. Edit them before the match starts!",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#achievements",
    popover: {
      title: "🎖️ Achievements",
      description: "Earn badges by completing milestones. Check your progress here!",
      side: "left",
      align: "center",
    },
  },
];

interface OnboardingTourProps {
  page: "home" | "createTeam" | "dashboard";
}

export function OnboardingTour({ page }: OnboardingTourProps) {
  const { isAuthenticated } = useAuth();
  const [hasShownTour, setHasShownTour] = useState(false);
  
  const { data: preferences } = trpc.preferences.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const updatePreferences = trpc.preferences.update.useMutation();

  useEffect(() => {
    // Don't show tour if already completed or not authenticated
    if (!isAuthenticated || hasShownTour) return;
    
    // Check localStorage for non-authenticated tour status
    const localTourStatus = localStorage.getItem(`tour_${page}_completed`);
    if (localTourStatus === "true") return;
    
    // Check if user has completed onboarding
    if (preferences?.hasCompletedOnboarding) return;

    // Select appropriate steps based on page
    let steps: DriveStep[];
    switch (page) {
      case "home":
        steps = homeTourSteps;
        break;
      case "createTeam":
        steps = createTeamTourSteps;
        break;
      case "dashboard":
        steps = dashboardTourSteps;
        break;
      default:
        return;
    }

    // Filter out steps for elements that don't exist
    const availableSteps = steps.filter(step => {
      if (typeof step.element === "string") {
        return document.querySelector(step.element) !== null;
      }
      return true;
    });

    if (availableSteps.length === 0) return;

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const driverObj = driver({
        showProgress: true,
        showButtons: ["next", "previous", "close"],
        steps: availableSteps,
        nextBtnText: "Next →",
        prevBtnText: "← Back",
        doneBtnText: "Got it! ✓",
        progressText: "{{current}} of {{total}}",
        popoverClass: "khelosmart-tour-popover",
        onDestroyStarted: () => {
          // Mark tour as completed
          localStorage.setItem(`tour_${page}_completed`, "true");
          setHasShownTour(true);
          
          // If all tours completed, mark onboarding as done
          const homeDone = localStorage.getItem("tour_home_completed") === "true";
          const createTeamDone = localStorage.getItem("tour_createTeam_completed") === "true";
          const dashboardDone = localStorage.getItem("tour_dashboard_completed") === "true";
          
          if (homeDone && createTeamDone && dashboardDone && isAuthenticated) {
            updatePreferences.mutate({ hasCompletedOnboarding: true });
          }
          
          driverObj.destroy();
        },
      });

      driverObj.drive();
    }, 1000);

    return () => clearTimeout(timer);
  }, [page, isAuthenticated, preferences, hasShownTour, updatePreferences]);

  return null;
}

// Button to manually trigger tour
export function StartTourButton({ page }: { page: "home" | "createTeam" | "dashboard" }) {
  const handleStartTour = () => {
    // Clear the completed status to allow re-running
    localStorage.removeItem(`tour_${page}_completed`);
    
    // Reload to trigger the tour
    window.location.reload();
  };

  return (
    <button
      onClick={handleStartTour}
      className="text-sm text-muted-foreground hover:text-primary underline"
    >
      Take a tour
    </button>
  );
}
