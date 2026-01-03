import { renderToString } from "react-dom/server";
import AppSSR from "./AppSSR";

export function render(url: string) {
  // Simple SSR render without router hooks
  const html = renderToString(<AppSSR />);
  return html;
}

// Export page metadata for SEO
export const pageMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  "/": {
    title: "Khelosmart - Play Fantasy Cricket | Free to Play",
    description: "Khelosmart is India's premier free-to-play fantasy cricket platform. Build your dream team, compete in exciting contests, and prove your cricket knowledge. 100% free to play!",
    keywords: "fantasy cricket, fantasy sports, cricket, IPL fantasy, T20 fantasy, free fantasy cricket, Khelosmart, dream team, cricket contests"
  },
  "/matches": {
    title: "Live Cricket Matches | Khelosmart Fantasy Cricket",
    description: "View all upcoming, live, and completed cricket matches. Create your fantasy team and compete in exciting contests. 100% free to play!",
    keywords: "live cricket matches, upcoming matches, cricket fixtures, fantasy cricket matches, IPL matches, T20 matches"
  },
  "/contests": {
    title: "Fantasy Cricket Contests | Khelosmart",
    description: "Join free fantasy cricket contests and compete with other cricket fans. Show off your cricket knowledge and climb the leaderboard!",
    keywords: "fantasy cricket contests, free contests, cricket competitions, fantasy leagues, cricket leaderboard"
  },
  "/about": {
    title: "About Us | Khelosmart Fantasy Cricket",
    description: "Learn about Khelosmart, India's premier free-to-play fantasy cricket platform. Our mission is to bring cricket fans together through exciting fantasy sports.",
    keywords: "about Khelosmart, fantasy cricket platform, cricket fans, fantasy sports India"
  },
  "/how-to-play": {
    title: "How to Play Fantasy Cricket | Khelosmart Guide",
    description: "Learn how to play fantasy cricket on Khelosmart. Step-by-step guide to creating your dream team, joining contests, and earning points.",
    keywords: "how to play fantasy cricket, fantasy cricket guide, create fantasy team, fantasy points, cricket rules"
  },
  "/faq": {
    title: "Frequently Asked Questions | Khelosmart",
    description: "Find answers to common questions about Khelosmart fantasy cricket. Learn about team creation, contests, points system, and more.",
    keywords: "fantasy cricket FAQ, Khelosmart help, fantasy cricket questions, how to play FAQ"
  },
  "/terms": {
    title: "Terms & Conditions | Khelosmart",
    description: "Read the terms and conditions for using Khelosmart fantasy cricket platform. Understand your rights and responsibilities as a user.",
    keywords: "terms and conditions, Khelosmart terms, user agreement, fantasy cricket rules"
  },
  "/privacy": {
    title: "Privacy Policy | Khelosmart",
    description: "Learn how Khelosmart protects your privacy and handles your personal data. Our commitment to data security and user privacy.",
    keywords: "privacy policy, data protection, user privacy, Khelosmart privacy"
  },
  "/contact": {
    title: "Contact Us | Khelosmart",
    description: "Get in touch with Khelosmart team. We're here to help with any questions about our fantasy cricket platform.",
    keywords: "contact Khelosmart, customer support, fantasy cricket help, get in touch"
  },
  "/responsible-gaming": {
    title: "Responsible Gaming | Khelosmart",
    description: "Learn about responsible gaming practices at Khelosmart. We promote healthy gaming habits and provide resources for support.",
    keywords: "responsible gaming, healthy gaming, gaming support, Khelosmart responsibility"
  },
  "/fair-play": {
    title: "Fair Play Policy | Khelosmart",
    description: "Understand Khelosmart's fair play policy. We ensure a level playing field for all users with strict anti-cheating measures.",
    keywords: "fair play, anti-cheating, gaming integrity, Khelosmart policy"
  },
  "/login": {
    title: "Login | Khelosmart Fantasy Cricket",
    description: "Login to your Khelosmart account to access your fantasy teams, contests, and dashboard.",
    keywords: "login, sign in, Khelosmart account, fantasy cricket login"
  },
  "/register": {
    title: "Register | Khelosmart Fantasy Cricket",
    description: "Create your free Khelosmart account and start playing fantasy cricket today. Join thousands of cricket fans!",
    keywords: "register, sign up, create account, Khelosmart registration, free fantasy cricket"
  }
};
