import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Matches = lazy(() => import("./pages/Matches"));
const MatchDetail = lazy(() => import("./pages/MatchDetail"));
const CreateTeam = lazy(() => import("./pages/CreateTeam"));
const Contests = lazy(() => import("./pages/Contests"));
const ContestDetail = lazy(() => import("./pages/ContestDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Scorecard = lazy(() => import("./pages/Scorecard"));
const Results = lazy(() => import("./pages/Results"));
const About = lazy(() => import("./pages/About"));
const HowToPlay = lazy(() => import("./pages/HowToPlay"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const ResponsibleGaming = lazy(() => import("./pages/ResponsibleGaming"));
const FairPlay = lazy(() => import("./pages/FairPlay"));
const FAQ = lazy(() => import("./pages/FAQ"));
const AgeVerification = lazy(() => import("./pages/AgeVerification"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Public pages */}
        <Route path="/" component={Home} />
        <Route path="/matches" component={Matches} />
        <Route path="/match/:id" component={MatchDetail} />
        <Route path="/scorecard/:id" component={Scorecard} />
        <Route path="/results/:id" component={Results} />
        <Route path="/contests" component={Contests} />
        <Route path="/contest/:id" component={ContestDetail} />
        
        {/* Auth pages */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        
        {/* Protected pages */}
        <Route path="/create-team/:matchId/:contestId" component={CreateTeam} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/verify-age" component={AgeVerification} />
        
        {/* Static pages */}
        <Route path="/about" component={About} />
        <Route path="/how-to-play" component={HowToPlay} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/contact" component={Contact} />
        <Route path="/responsible-gaming" component={ResponsibleGaming} />
        <Route path="/fair-play" component={FairPlay} />
        <Route path="/faq" component={FAQ} />
        
        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
