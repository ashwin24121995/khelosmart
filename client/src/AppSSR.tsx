/**
 * SSR-compatible version of the App component.
 * This version renders static content without client-side features like
 * tRPC queries, localStorage, or browser APIs.
 */

import { Route, Switch } from "wouter";

// Static page components for SSR
import HomeSSR from "./pages/ssr/HomeSSR";
import AboutSSR from "./pages/ssr/AboutSSR";
import HowToPlaySSR from "./pages/ssr/HowToPlaySSR";
import FAQSSR from "./pages/ssr/FAQSSR";
import TermsSSR from "./pages/ssr/TermsSSR";
import PrivacySSR from "./pages/ssr/PrivacySSR";
import ContactSSR from "./pages/ssr/ContactSSR";
import ResponsibleGamingSSR from "./pages/ssr/ResponsibleGamingSSR";
import FairPlaySSR from "./pages/ssr/FairPlaySSR";
import MatchesSSR from "./pages/ssr/MatchesSSR";
import ContestsSSR from "./pages/ssr/ContestsSSR";
import LoginSSR from "./pages/ssr/LoginSSR";
import RegisterSSR from "./pages/ssr/RegisterSSR";
import NotFoundSSR from "./pages/ssr/NotFoundSSR";

function AppSSR() {
  return (
    <Switch>
      {/* Public pages */}
      <Route path="/" component={HomeSSR} />
      <Route path="/matches" component={MatchesSSR} />
      <Route path="/contests" component={ContestsSSR} />
      
      {/* Auth pages */}
      <Route path="/login" component={LoginSSR} />
      <Route path="/register" component={RegisterSSR} />
      
      {/* Static pages */}
      <Route path="/about" component={AboutSSR} />
      <Route path="/how-to-play" component={HowToPlaySSR} />
      <Route path="/terms" component={TermsSSR} />
      <Route path="/privacy" component={PrivacySSR} />
      <Route path="/contact" component={ContactSSR} />
      <Route path="/responsible-gaming" component={ResponsibleGamingSSR} />
      <Route path="/fair-play" component={FairPlaySSR} />
      <Route path="/faq" component={FAQSSR} />
      
      {/* 404 */}
      <Route component={NotFoundSSR} />
    </Switch>
  );
}

export default AppSSR;
