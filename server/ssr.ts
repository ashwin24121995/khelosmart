/**
 * Server-Side Rendering (SSR) module for Khelosmart.
 * 
 * This module pre-renders static HTML content for critical pages
 * to ensure Google's crawler sees the same content as users.
 * This fixes the "cloaking" issue where CSR apps show empty content to crawlers.
 */

// Page metadata for SEO
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

/**
 * Get metadata for a specific page path
 */
export function getPageMetadata(path: string) {
  return pageMetadata[path] || pageMetadata["/"];
}

/**
 * Generate pre-rendered HTML content for critical pages.
 * This content is injected into the HTML template so crawlers can see it.
 */
export function getPrerenderedContent(path: string): string {
  const metadata = getPageMetadata(path);
  
  // Common header HTML
  const header = `
    <header class="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div class="container flex h-16 items-center justify-between mx-auto px-4">
        <a href="/" class="flex items-center gap-2">
          <img src="/logo.png" alt="Khelosmart" style="height: 52px; width: auto;" />
        </a>
        <nav class="hidden md:flex items-center gap-6">
          <a href="/matches" class="text-sm font-medium text-gray-300 hover:text-white">Matches</a>
          <a href="/contests" class="text-sm font-medium text-gray-300 hover:text-white">Contests</a>
          <a href="/how-to-play" class="text-sm font-medium text-gray-300 hover:text-white">How to Play</a>
          <a href="/login" class="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Login</a>
        </nav>
      </div>
    </header>
  `;

  // Common footer HTML
  const footer = `
    <footer class="bg-black text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-4">
            <a href="/" class="flex items-center gap-2">
              <img src="/logo.png" alt="Khelosmart" style="height: 60px; width: auto;" />
            </a>
            <p class="text-sm text-gray-400">
              India's premier free-to-play fantasy cricket platform. Build your dream team and compete for bragging rights!
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="/matches" class="hover:text-white">Matches</a></li>
              <li><a href="/contests" class="hover:text-white">Contests</a></li>
              <li><a href="/how-to-play" class="hover:text-white">How to Play</a></li>
              <li><a href="/faq" class="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Company</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="/about" class="hover:text-white">About Us</a></li>
              <li><a href="/contact" class="hover:text-white">Contact</a></li>
              <li><a href="/responsible-gaming" class="hover:text-white">Responsible Gaming</a></li>
              <li><a href="/fair-play" class="hover:text-white">Fair Play</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="/terms" class="hover:text-white">Terms & Conditions</a></li>
              <li><a href="/privacy" class="hover:text-white">Privacy Policy</a></li>
            </ul>
            <div style="margin-top: 16px; padding: 12px; background: rgba(120, 53, 15, 0.3); border: 1px solid rgba(161, 98, 7, 0.5); border-radius: 8px;">
              <p style="font-size: 12px; color: #fcd34d;">
                <strong>18+ Only.</strong> Fantasy sports not available in Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, and Nagaland.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
            <div>
              <h4 class="font-semibold text-white mb-2">Registered Company</h4>
              <p class="font-medium">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
              <p style="margin-top: 4px;">CIN: U80301TN2019OPC130468</p>
            </div>
            <div>
              <h4 class="font-semibold text-white mb-2">Registered Address</h4>
              <p>NO 12-F/4C, ANNANAGER RAMANAN STREET,</p>
              <p>KALLAKURICHI, VILLUPURAM,</p>
              <p>Tamil Nadu - 606202, India</p>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800">
          <div style="background: linear-gradient(to right, rgba(120, 53, 15, 0.4), rgba(146, 64, 14, 0.4)); border: 1px solid rgba(217, 119, 6, 0.5); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); border: 2px solid #f59e0b; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 14px; font-weight: bold; color: #fbbf24;">18+</span>
              </div>
              <div>
                <p style="font-size: 14px; color: #fde68a;">
                  <strong>Age Restriction:</strong> This platform is strictly for users aged 18 years and above.
                </p>
                <p style="font-size: 12px; color: rgba(253, 230, 138, 0.8); margin-top: 4px;">
                  Fantasy sports not available in: <strong>Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, and Nagaland</strong>
                </p>
              </div>
            </div>
          </div>
          <div style="background: rgba(22, 101, 52, 0.3); border: 1px solid rgba(34, 197, 94, 0.5); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 14px; color: #bbf7d0;">
              <strong>Important:</strong> Khelosmart is a FREE-TO-PLAY fantasy sports platform for entertainment purposes only. 
              No real money is involved. This is not gambling. Play responsibly and have fun!
            </p>
          </div>
          <p class="text-sm text-gray-500 text-center">
            © 2025 THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;

  // Page-specific content
  const pageContent = getPageContent(path);

  return `
    <div id="ssr-content" style="min-height: 100vh; display: flex; flex-direction: column;">
      ${header}
      <main style="flex: 1;">
        ${pageContent}
      </main>
      ${footer}
    </div>
  `;
}

function getPageContent(path: string): string {
  switch (path) {
    case "/":
      return getHomePageContent();
    case "/about":
      return getAboutPageContent();
    case "/how-to-play":
      return getHowToPlayPageContent();
    case "/faq":
      return getFAQPageContent();
    case "/terms":
      return getTermsPageContent();
    case "/privacy":
      return getPrivacyPageContent();
    case "/contact":
      return getContactPageContent();
    case "/responsible-gaming":
      return getResponsibleGamingPageContent();
    case "/fair-play":
      return getFairPlayPageContent();
    case "/matches":
      return getMatchesPageContent();
    case "/contests":
      return getContestsPageContent();
    case "/login":
      return getLoginPageContent();
    case "/register":
      return getRegisterPageContent();
    default:
      return getHomePageContent();
  }
}

function getHomePageContent(): string {
  return `
    <section style="position: relative; overflow: hidden; color: white; min-height: 600px; background: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url('/images/hero-cricket-stadium.webp') center/cover no-repeat;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 80px 16px;">
        <div style="max-width: 768px;">
          <span style="display: inline-block; background: rgba(22, 163, 74, 0.2); border: 1px solid rgba(22, 163, 74, 0.3); border-radius: 9999px; padding: 8px 16px; margin-bottom: 24px; color: #86efac; font-size: 14px;">
            100% Free to Play
          </span>
          <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 24px; line-height: 1.2;">
            Play Fantasy Cricket.<br>
            <span style="color: #4ade80;">Test Your Skills.</span>
          </h1>
          <p style="font-size: 20px; color: #e5e7eb; margin-bottom: 32px; max-width: 640px;">
            Build your dream cricket team, compete in exciting contests, and prove your cricket knowledge. Join India's most exciting fantasy cricket platform!
          </p>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="/matches" style="display: inline-flex; align-items: center; justify-content: center; background: #16a34a; color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none;">
              Start Playing
            </a>
            <a href="/how-to-play" style="display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none;">
              Learn How to Play
            </a>
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 64px 16px; background: white;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 16px; color: #111827;">
          Build Your Dream Team
        </h2>
        <p style="text-align: center; color: #6b7280; max-width: 640px; margin: 0 auto 48px;">
          Select 11 players from both teams to create your fantasy squad. Choose wisely based on player form, pitch conditions, and match-ups.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div style="padding: 24px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Pick Your Players</h3>
            <p style="color: #6b7280; font-size: 14px;">Choose from Wicketkeepers, Batsmen, All-rounders & Bowlers</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Select Captain & Vice-Captain</h3>
            <p style="color: #6b7280; font-size: 14px;">Captain earns 2x points, Vice-Captain earns 1.5x points</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Join Contests</h3>
            <p style="color: #6b7280; font-size: 14px;">Compete with other fans and climb the leaderboard</p>
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 64px 16px; background: #f9fafb;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 16px; color: #111827;">
          Why Choose Khelosmart?
        </h2>
        <p style="text-align: center; color: #6b7280; max-width: 640px; margin: 0 auto 48px;">
          Experience the thrill of fantasy cricket with features designed for true cricket enthusiasts.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">100% Free to Play</h3>
            <p style="color: #6b7280; font-size: 14px;">No entry fees, no hidden charges. Play fantasy cricket absolutely free!</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Real-Time Updates</h3>
            <p style="color: #6b7280; font-size: 14px;">Live scores, instant point updates, and real-time leaderboard rankings.</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Compete & Have Fun</h3>
            <p style="color: #6b7280; font-size: 14px;">Join contests, compete with friends, and earn bragging rights!</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Safe & Secure</h3>
            <p style="color: #6b7280; font-size: 14px;">Your data is protected with industry-standard security measures.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Restricted States Notice Section -->
    <section style="padding: 48px 16px; background: #fef3c7; border-top: 4px solid #f59e0b;">
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #f59e0b; color: white; padding: 8px 12px; border-radius: 8px; font-weight: bold; font-size: 18px; flex-shrink: 0;">⚠️</div>
          <div>
            <h3 style="font-size: 20px; font-weight: bold; color: #92400e; margin-bottom: 12px;">Important: Geographic Restrictions</h3>
            <p style="color: #78350f; margin-bottom: 16px;">
              In compliance with state laws and regulations, Khelosmart fantasy sports services are <strong>NOT available</strong> to residents of the following states:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
              <span style="background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">Telangana</span>
              <span style="background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">Andhra Pradesh</span>
              <span style="background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">Assam</span>
              <span style="background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">Odisha</span>
              <span style="background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">Sikkim</span>
              <span style="background: #dc2626; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">Nagaland</span>
            </div>
            <p style="color: #78350f; font-size: 14px;">
              Users from these states are prohibited from creating accounts or participating in any contests. By using this platform, you confirm that you are not a resident of any of the above states.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Cricket Updates Section -->
    <section style="padding: 64px 16px; background: #f9fafb;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 16px; color: #111827;">Live Cricket Updates</h2>
        <p style="text-align: center; color: #6b7280; max-width: 640px; margin: 0 auto 48px;">Stay updated with real-time cricket scores, match statistics, and player performances from around the world.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #dbeafe; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px;">📻</div>
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Ball-by-Ball Updates</h3>
            <p style="color: #6b7280; font-size: 14px;">Get instant ball-by-ball commentary and live score updates for all major cricket matches including IPL, T20 World Cup, and international series.</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px;">⚡</div>
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Instant Point Calculation</h3>
            <p style="color: #6b7280; font-size: 14px;">Watch your fantasy points update in real-time as players score runs, take wickets, and make crucial contributions during live matches.</p>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #f3e8ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px;">🏆</div>
            <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Live Leaderboards</h3>
            <p style="color: #6b7280; font-size: 14px;">Track your position on the leaderboard as the match progresses. See how your team compares against other fantasy players.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fantasy Points System Section -->
    <section style="padding: 64px 16px; background: white;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 16px; color: #111827;">Fantasy Points System</h2>
        <p style="text-align: center; color: #6b7280; max-width: 640px; margin: 0 auto 48px;">Our transparent and fair points system rewards smart team selection. Every run, wicket, catch, and stumping counts towards your fantasy score.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div style="padding: 24px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 12px; color: #111827;">Batting Points</h3>
            <ul style="color: #6b7280; font-size: 14px; list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 4px;">• Run scored: +1 point</li>
              <li style="margin-bottom: 4px;">• Boundary (4s): +1 bonus</li>
              <li style="margin-bottom: 4px;">• Six (6s): +2 bonus</li>
              <li style="margin-bottom: 4px;">• Half-century: +8 bonus</li>
              <li style="margin-bottom: 4px;">• Century: +16 bonus</li>
            </ul>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 12px; color: #111827;">Bowling Points</h3>
            <ul style="color: #6b7280; font-size: 14px; list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 4px;">• Wicket: +25 points</li>
              <li style="margin-bottom: 4px;">• 3-wicket haul: +4 bonus</li>
              <li style="margin-bottom: 4px;">• 4-wicket haul: +8 bonus</li>
              <li style="margin-bottom: 4px;">• 5-wicket haul: +16 bonus</li>
              <li style="margin-bottom: 4px;">• Maiden over: +12 points</li>
            </ul>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 12px; color: #111827;">Fielding Points</h3>
            <ul style="color: #6b7280; font-size: 14px; list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 4px;">• Catch: +8 points</li>
              <li style="margin-bottom: 4px;">• Stumping: +12 points</li>
              <li style="margin-bottom: 4px;">• Run out (direct): +12 points</li>
              <li style="margin-bottom: 4px;">• Run out (indirect): +6 points</li>
            </ul>
          </div>
        </div>
        <div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div style="padding: 24px; border-radius: 12px; background: #fef9c3; border: 1px solid #fde047;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #eab308; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">C</div>
              <div>
                <h4 style="font-weight: 600; color: #854d0e;">Captain</h4>
                <p style="font-size: 14px; color: #a16207;">Earns 2x points for all actions</p>
              </div>
            </div>
          </div>
          <div style="padding: 24px; border-radius: 12px; background: #dbeafe; border: 1px solid #93c5fd;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">VC</div>
              <div>
                <h4 style="font-weight: 600; color: #1e40af;">Vice-Captain</h4>
                <p style="font-size: 14px; color: #1d4ed8;">Earns 1.5x points for all actions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Tournaments Section -->
    <section style="padding: 64px 16px; background: #f9fafb;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 16px; color: #111827;">Supported Cricket Tournaments</h2>
        <p style="text-align: center; color: #6b7280; max-width: 640px; margin: 0 auto 48px;">Create fantasy teams for all major cricket tournaments and leagues from around the world.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
          <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🏆</div>
            <h4 style="font-weight: 600; font-size: 14px; color: #111827;">IPL</h4>
            <p style="font-size: 12px; color: #6b7280;">Indian Premier League</p>
          </div>
          <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🌍</div>
            <h4 style="font-weight: 600; font-size: 14px; color: #111827;">T20 World Cup</h4>
            <p style="font-size: 12px; color: #6b7280;">ICC T20 World Cup</p>
          </div>
          <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🏅</div>
            <h4 style="font-weight: 600; font-size: 14px; color: #111827;">ODI World Cup</h4>
            <p style="font-size: 12px; color: #6b7280;">ICC Cricket World Cup</p>
          </div>
          <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🇦🇺</div>
            <h4 style="font-weight: 600; font-size: 14px; color: #111827;">BBL</h4>
            <p style="font-size: 12px; color: #6b7280;">Big Bash League</p>
          </div>
          <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🇬🇧</div>
            <h4 style="font-weight: 600; font-size: 14px; color: #111827;">The Hundred</h4>
            <p style="font-size: 12px; color: #6b7280;">England's Premier League</p>
          </div>
          <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🇵🇰</div>
            <h4 style="font-weight: 600; font-size: 14px; color: #111827;">PSL</h4>
            <p style="font-size: 12px; color: #6b7280;">Pakistan Super League</p>
          </div>
        </div>
        <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 32px;">Plus international Test matches, ODIs, T20Is, and many more domestic leagues!</p>
      </div>
    </section>

    <section style="padding: 64px 16px; background: #16a34a; color: white; text-align: center;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; margin-bottom: 16px;">
          Ready to Play Fantasy Cricket?
        </h2>
        <p style="font-size: 20px; margin-bottom: 32px; color: #bbf7d0;">
          Join thousands of cricket fans already playing on Khelosmart.
        </p>
        <a href="/register" style="display: inline-flex; align-items: center; justify-content: center; background: white; color: #15803d; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none;">
          Get Started Now
        </a>
      </div>
    </section>
  `;
}

function getAboutPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 32px; color: #111827;">About Khelosmart</h1>
      <p style="font-size: 18px; color: #6b7280; margin-bottom: 24px;">
        Khelosmart is India's premier free-to-play fantasy cricket platform, designed for cricket enthusiasts who want to test their knowledge and skills without any financial risk.
      </p>
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">Our Mission</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">
        We believe that fantasy sports should be accessible to everyone. Our mission is to provide a platform where cricket fans can enjoy the thrill of fantasy sports, compete with friends, and showcase their cricket knowledge - all completely free of charge.
      </p>
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">What We Offer</h2>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">100% free-to-play fantasy cricket contests</li>
        <li style="margin-bottom: 8px;">Real-time scoring and live leaderboards</li>
        <li style="margin-bottom: 8px;">Comprehensive player statistics and analysis</li>
        <li style="margin-bottom: 8px;">Multiple contest formats for every skill level</li>
        <li style="margin-bottom: 8px;">Safe and secure platform with data protection</li>
      </ul>
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">Our Company</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">
        Khelosmart is operated by THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED, committed to providing a fair, transparent, and entertaining fantasy sports experience for all cricket lovers.
      </p>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <h3 style="font-weight: 600; color: #111827; margin-bottom: 12px;">Company Information</h3>
        <p style="color: #6b7280;"><strong>Company Name:</strong> THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
        <p style="color: #6b7280;"><strong>CIN:</strong> U80301TN2019OPC130468</p>
        <p style="color: #6b7280;"><strong>Registered Address:</strong> NO 12-F/4C, ANNANAGER RAMANAN STREET, KALLAKURICHI, VILLUPURAM, Tamil Nadu - 606202, India</p>
      </div>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin-top: 32px;">
        <h3 style="font-weight: 600; color: #166534; margin-bottom: 8px;">Important Notice</h3>
        <p style="color: #15803d;">
          Khelosmart is a FREE-TO-PLAY platform for entertainment purposes only. No real money is involved in any contests. This is not gambling. Play responsibly and have fun!
        </p>
      </div>
    </div>
  `;
}

function getHowToPlayPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 32px; color: #111827;">How to Play Fantasy Cricket</h1>
      <p style="font-size: 18px; color: #6b7280; margin-bottom: 32px;">
        Playing fantasy cricket on Khelosmart is easy and fun! Follow these simple steps to get started.
      </p>
      <div style="display: grid; gap: 24px; margin-bottom: 48px;">
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <div style="width: 48px; height: 48px; background: #16a34a; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; margin-bottom: 16px;">1</div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #111827;">Create Your Account</h3>
          <p style="color: #6b7280;">Sign up for free with your email address. No payment information required!</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <div style="width: 48px; height: 48px; background: #16a34a; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; margin-bottom: 16px;">2</div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #111827;">Select a Match</h3>
          <p style="color: #6b7280;">Browse upcoming cricket matches and choose the one you want to play.</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <div style="width: 48px; height: 48px; background: #16a34a; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; margin-bottom: 16px;">3</div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #111827;">Build Your Team</h3>
          <p style="color: #6b7280;">Select 11 players within the budget. Choose wisely based on form and conditions.</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <div style="width: 48px; height: 48px; background: #16a34a; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; margin-bottom: 16px;">4</div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #111827;">Join Contests</h3>
          <p style="color: #6b7280;">Enter free contests and compete with other players for bragging rights!</p>
        </div>
      </div>
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #111827;">Team Composition Rules</h2>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Select exactly 11 players</li>
        <li style="margin-bottom: 8px;">Minimum 1 Wicketkeeper</li>
        <li style="margin-bottom: 8px;">Minimum 3 Batsmen</li>
        <li style="margin-bottom: 8px;">Minimum 1 All-rounder</li>
        <li style="margin-bottom: 8px;">Minimum 3 Bowlers</li>
        <li style="margin-bottom: 8px;">Maximum 7 players from one team</li>
      </ul>
    </div>
  `;
}

function getFAQPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 32px; color: #111827;">Frequently Asked Questions</h1>
      <div style="display: grid; gap: 16px;">
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Is Khelosmart free to play?</h3>
          <p style="color: #6b7280;">Yes! Khelosmart is 100% free to play. There are no entry fees, no hidden charges, and no real money involved.</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">How do I create a fantasy team?</h3>
          <p style="color: #6b7280;">Select a match, then pick 11 players from both teams within the budget. Choose your Captain and Vice-Captain, then join a contest.</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">When can I create my team?</h3>
          <p style="color: #6b7280;">You can create your team after the toss is completed and before the match starts. Teams are locked once the first ball is bowled.</p>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
          <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Is this gambling?</h3>
          <p style="color: #6b7280;">No! Khelosmart is NOT gambling. It's a free-to-play fantasy sports platform for entertainment only. No real money is involved.</p>
        </div>
      </div>
    </div>
  `;
}

function getTermsPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 16px; color: #111827; text-align: center;">Terms and Conditions</h1>
      <p style="text-align: center; color: #6b7280; margin-bottom: 8px;">Please read these terms carefully before using Khelosmart</p>
      <p style="text-align: center; color: #9ca3af; margin-bottom: 32px; font-size: 14px;">Last Updated: January 2026</p>
      
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <p style="color: #166534; font-weight: 500;">
          Khelosmart is a FREE-TO-PLAY fantasy sports platform designed purely for entertainment purposes. 
          There is NO real money involvement, NO cash prizes, and NO gambling or betting of any kind.
        </p>
      </div>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">1. Introduction</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">Welcome to Khelosmart. These Terms and Conditions govern your use of the Khelosmart website and services operated by THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED, a company registered in India with CIN U80301TN2019OPC130468.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">2. Eligibility</h2>
      <p style="color: #6b7280; margin-bottom: 16px;">To use Khelosmart, you must:</p>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Be at least <strong>18 years of age</strong></li>
        <li style="margin-bottom: 8px;">Be a resident of India</li>
        <li style="margin-bottom: 8px;"><strong>NOT</strong> be a resident of Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, or Nagaland</li>
        <li style="margin-bottom: 8px;">Have the legal capacity to enter into a binding agreement</li>
      </ul>
      
      <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <h3 style="font-weight: 600; color: #92400e; margin-bottom: 12px;">Geographic Restrictions</h3>
        <p style="color: #78350f; margin-bottom: 12px;">Khelosmart services are NOT available in:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">Telangana</span>
          <span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">Andhra Pradesh</span>
          <span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">Assam</span>
          <span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">Odisha</span>
          <span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">Sikkim</span>
          <span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">Nagaland</span>
        </div>
      </div>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">3. Platform Services</h2>
      <p style="color: #6b7280; margin-bottom: 16px;">Khelosmart provides a free-to-play fantasy sports platform where users can:</p>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Create virtual fantasy cricket teams</li>
        <li style="margin-bottom: 8px;">Participate in free contests</li>
        <li style="margin-bottom: 8px;">Track live scores and player performances</li>
        <li style="margin-bottom: 8px;">Compete on leaderboards with other users</li>
      </ul>
      <p style="color: #6b7280; margin-bottom: 24px;"><strong>Important:</strong> All services are provided free of charge. There are no entry fees, no real money prizes, and no monetary rewards.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">4. Fantasy Sports - Game of Skill</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">Fantasy sports, as offered on Khelosmart, is recognized as a game of skill under Indian law. The Supreme Court of India, in K.R. Lakshmanan vs. State of Tamil Nadu (1996), established that games where success depends predominantly on the superior knowledge, training, attention, experience, and adroitness of the player are games of skill.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">5. Governing Law and Jurisdiction</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Villupuram, Tamil Nadu, India.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">6. Dispute Resolution</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">Any dispute or claim arising out of or relating to these Terms shall first be attempted to be resolved through good-faith negotiations. If the dispute cannot be resolved through negotiations within 30 days, either party may pursue legal remedies as provided under applicable law, including arbitration under the Arbitration and Conciliation Act, 1996.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">7. Contact Information</h2>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
        <p style="font-weight: 600; color: #111827; margin-bottom: 12px;">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
        <p style="color: #6b7280;">NO 12-F/4C, ANNANAGER RAMANAN STREET,<br>KALLAKURICHI, VILLUPURAM,<br>Tamil Nadu - 606202, India</p>
        <p style="color: #6b7280; margin-top: 12px;"><strong>CIN:</strong> U80301TN2019OPC130468</p>
        <p style="color: #6b7280;"><strong>Email:</strong> support@khelosmart.com</p>
        <p style="color: #6b7280;"><strong>Website:</strong> www.khelosmart.com</p>
      </div>
    </div>
  `;
}

function getPrivacyPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 16px; color: #111827; text-align: center;">Privacy Policy</h1>
      <p style="text-align: center; color: #6b7280; margin-bottom: 8px;">Your privacy is important to us. Learn how we collect, use, and protect your information.</p>
      <p style="text-align: center; color: #9ca3af; margin-bottom: 32px; font-size: 14px;">Last Updated: January 2026</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">1. Introduction</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED operates the Khelosmart platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">2. Information We Collect</h2>
      <h3 style="font-size: 18px; font-weight: 600; margin-top: 20px; margin-bottom: 12px; color: #374151;">2.1 Personal Information</h3>
      <ul style="color: #6b7280; margin-bottom: 16px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Full name</li>
        <li style="margin-bottom: 8px;">Email address</li>
        <li style="margin-bottom: 8px;">Mobile phone number</li>
        <li style="margin-bottom: 8px;">Date of birth</li>
        <li style="margin-bottom: 8px;">State of residence</li>
      </ul>
      <h3 style="font-size: 18px; font-weight: 600; margin-top: 20px; margin-bottom: 12px; color: #374151;">2.2 Usage Information</h3>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Device information (type, operating system, browser)</li>
        <li style="margin-bottom: 8px;">IP address and location data</li>
        <li style="margin-bottom: 8px;">Pages visited and features used</li>
        <li style="margin-bottom: 8px;">Contest participation and team selections</li>
      </ul>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">3. How We Use Your Information</h2>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">To create and manage your account</li>
        <li style="margin-bottom: 8px;">To verify your identity and eligibility (age and location)</li>
        <li style="margin-bottom: 8px;">To provide and maintain our Platform services</li>
        <li style="margin-bottom: 8px;">To detect and prevent fraud or abuse</li>
        <li style="margin-bottom: 8px;">To comply with legal obligations</li>
      </ul>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">4. Data Security</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">We implement appropriate technical and organizational measures to protect your personal information, including encryption of data in transit and at rest, secure server infrastructure, and regular security assessments.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">5. Your Rights</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h4 style="font-weight: 600; color: #111827; margin-bottom: 8px;">Right to Access</h4>
          <p style="color: #6b7280; font-size: 14px;">Request a copy of your personal information</p>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h4 style="font-weight: 600; color: #111827; margin-bottom: 8px;">Right to Correction</h4>
          <p style="color: #6b7280; font-size: 14px;">Request correction of inaccurate information</p>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h4 style="font-weight: 600; color: #111827; margin-bottom: 8px;">Right to Deletion</h4>
          <p style="color: #6b7280; font-size: 14px;">Request deletion of your personal information</p>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h4 style="font-weight: 600; color: #111827; margin-bottom: 8px;">Right to Withdraw</h4>
          <p style="color: #6b7280; font-size: 14px;">Withdraw your consent at any time</p>
        </div>
      </div>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">6. Children's Privacy</h2>
      <p style="color: #6b7280; margin-bottom: 24px;">Our Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children.</p>
      
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">7. Contact Us</h2>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
        <p style="font-weight: 600; color: #111827; margin-bottom: 12px;">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
        <p style="color: #6b7280;">NO 12-F/4C, ANNANAGER RAMANAN STREET,<br>KALLAKURICHI, VILLUPURAM,<br>Tamil Nadu - 606202, India</p>
        <p style="color: #6b7280; margin-top: 12px;"><strong>CIN:</strong> U80301TN2019OPC130468</p>
        <p style="color: #6b7280;"><strong>Email:</strong> privacy@khelosmart.com</p>
      </div>
    </div>
  `;
}

function getContactPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 32px; color: #111827;">Contact Us</h1>
      <p style="font-size: 18px; color: #6b7280; margin-bottom: 32px;">
        Have questions or feedback? We'd love to hear from you!
      </p>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Email</h3>
        <p style="color: #6b7280;">support@khelosmart.com</p>
      </div>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
        <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827;">Registered Company</h3>
        <p style="color: #6b7280;">
          THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED<br>
          CIN: U80301TN2019OPC130468<br><br>
          NO 12-F/4C, ANNANAGER RAMANAN STREET,<br>
          KALLAKURICHI, VILLUPURAM,<br>
          Tamil Nadu - 606202, India
        </p>
      </div>
    </div>
  `;
}

function getResponsibleGamingPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 32px; color: #111827;">Responsible Gaming</h1>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <h3 style="font-weight: 600; color: #166534; margin-bottom: 8px;">Important Notice</h3>
        <p style="color: #15803d;">
          Khelosmart is a FREE-TO-PLAY platform. No real money is involved. This is not gambling.
        </p>
      </div>
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">Healthy Gaming Tips</h2>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Set time limits for your gaming sessions</li>
        <li style="margin-bottom: 8px;">Take regular breaks during extended play</li>
        <li style="margin-bottom: 8px;">Don't let gaming interfere with work or relationships</li>
        <li style="margin-bottom: 8px;">Play for enjoyment, not as a way to escape problems</li>
      </ul>
    </div>
  `;
}

function getFairPlayPageContent(): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 32px; color: #111827;">Fair Play Policy</h1>
      <p style="font-size: 18px; color: #6b7280; margin-bottom: 32px;">
        At Khelosmart, we are committed to maintaining a fair and enjoyable environment for all users.
      </p>
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">Our Principles</h2>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Equal opportunity for all players</li>
        <li style="margin-bottom: 8px;">Transparent scoring and ranking systems</li>
        <li style="margin-bottom: 8px;">Zero tolerance for cheating or manipulation</li>
        <li style="margin-bottom: 8px;">Protection against collusion and fraud</li>
      </ul>
      <h2 style="font-size: 24px; font-weight: bold; margin-top: 32px; margin-bottom: 16px; color: #111827;">Prohibited Activities</h2>
      <ul style="color: #6b7280; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 8px;">Creating multiple accounts</li>
        <li style="margin-bottom: 8px;">Colluding with other users</li>
        <li style="margin-bottom: 8px;">Using automated tools or bots</li>
        <li style="margin-bottom: 8px;">Exploiting bugs or vulnerabilities</li>
      </ul>
    </div>
  `;
}

function getMatchesPageContent(): string {
  return `
    <div style="max-width: 1200px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 16px; color: #111827;">Cricket Matches</h1>
      <p style="font-size: 18px; color: #6b7280; margin-bottom: 32px;">
        View all upcoming, live, and completed cricket matches. Create your fantasy team and compete in exciting contests!
      </p>
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 24px;">
        <h3 style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">How to Play</h3>
        <p style="color: #1d4ed8;">
          Select a match, create your fantasy team after the toss, and join contests to compete with other cricket fans!
        </p>
      </div>
    </div>
  `;
}

function getContestsPageContent(): string {
  return `
    <div style="max-width: 1200px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 16px; color: #111827;">Fantasy Cricket Contests</h1>
      <p style="font-size: 18px; color: #6b7280; margin-bottom: 32px;">
        Join free fantasy cricket contests and compete with other cricket fans. Show off your cricket knowledge!
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px;">
          <h3 style="font-weight: 600; color: #166534; margin-bottom: 8px;">100% Free to Play</h3>
          <p style="color: #15803d;">All contests on Khelosmart are completely free. No entry fees!</p>
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 24px;">
          <h3 style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">Compete for Bragging Rights</h3>
          <p style="color: #1d4ed8;">Climb the leaderboard and prove your cricket knowledge!</p>
        </div>
      </div>
    </div>
  `;
}

function getLoginPageContent(): string {
  return `
    <div style="max-width: 400px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 30px; font-weight: bold; margin-bottom: 8px; color: #111827; text-align: center;">Welcome Back</h1>
      <p style="color: #6b7280; margin-bottom: 32px; text-align: center;">
        Login to your Khelosmart account to access your fantasy teams and contests.
      </p>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
        <form>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px;">Email</label>
            <input type="email" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter your email" />
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px;">Password</label>
            <input type="password" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter your password" />
          </div>
          <button type="submit" style="width: 100%; background: #16a34a; color: white; font-weight: 600; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;">
            Login
          </button>
        </form>
        <p style="text-align: center; margin-top: 24px; color: #6b7280;">
          Don't have an account? <a href="/register" style="color: #16a34a; font-weight: 600;">Register</a>
        </p>
      </div>
    </div>
  `;
}

function getRegisterPageContent(): string {
  return `
    <div style="max-width: 400px; margin: 0 auto; padding: 48px 16px;">
      <h1 style="font-size: 30px; font-weight: bold; margin-bottom: 8px; color: #111827; text-align: center;">Create Your Account</h1>
      <p style="color: #6b7280; margin-bottom: 32px; text-align: center;">
        Join Khelosmart and start playing fantasy cricket for free!
      </p>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
        <form>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px;">Full Name</label>
            <input type="text" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter your name" />
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px;">Email</label>
            <input type="email" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter your email" />
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px;">Password</label>
            <input type="password" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Create a password" />
          </div>
          <button type="submit" style="width: 100%; background: #16a34a; color: white; font-weight: 600; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;">
            Create Account
          </button>
        </form>
        <p style="text-align: center; margin-top: 24px; color: #6b7280;">
          Already have an account? <a href="/login" style="color: #16a34a; font-weight: 600;">Login</a>
        </p>
      </div>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-top: 24px; text-align: center;">
        <p style="font-size: 14px; color: #15803d;">
          <strong>100% Free to Play</strong> - No payment information required!
        </p>
      </div>
    </div>
  `;
}
