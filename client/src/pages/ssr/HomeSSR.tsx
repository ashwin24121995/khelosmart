/**
 * SSR-compatible Home page.
 * Contains all static content that crawlers need to see.
 */

import LayoutSSR from "@/components/LayoutSSR";
import { Link } from "wouter";

export default function HomeSSR() {
  return (
    <LayoutSSR>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-cricket-stadium.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-300 text-sm font-medium">100% Free to Play</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Play Fantasy Cricket.
              <br />
              <span className="text-green-400">Test Your Skills.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
              Build your dream cricket team, compete in exciting contests, and prove your cricket knowledge. Join India's most exciting fantasy cricket platform!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/matches" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors">
                Start Playing
              </Link>
              <Link href="/how-to-play" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-3 rounded-lg transition-colors">
                Learn How to Play
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-gray-950"/>
          </svg>
        </div>
      </section>

      {/* Fantasy Team Creation Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/fantasy-team-creation.webp" 
                  alt="Fantasy Team Selection Interface" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Build Your Dream Team
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Select 11 players from both teams to create your fantasy squad. Choose wisely based on player form, pitch conditions, and match-ups.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Pick players from Wicketkeepers, Batsmen, All-rounders & Bowlers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Choose Captain (2x points) and Vice-Captain (1.5x points)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Edit your team until the match starts</span>
                </li>
              </ul>
              <Link href="/matches" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Create Your Team
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Khelosmart?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket with features designed for true cricket enthusiasts.
            </p>
          </div>
          
          {/* Feature cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/images/cricket-action-batsman.webp" 
                alt="Cricket Batsman in Action" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Real-Time Scoring</h3>
                <p className="text-gray-200 text-sm">
                  Every run, every boundary, every wicket - watch your points update live as the action unfolds!
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/images/cricket-bowler-action.webp" 
                alt="Cricket Bowler in Action" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Strategic Gameplay</h3>
                <p className="text-gray-200 text-sm">
                  Analyze player stats, study pitch conditions, and make strategic decisions to outsmart your opponents.
                </p>
              </div>
            </div>
          </div>

          {/* Feature icons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">100% Free to Play</h3>
              <p className="text-sm text-gray-600">
                No entry fees, no hidden charges. Play fantasy cricket absolutely free!
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Real-Time Updates</h3>
              <p className="text-sm text-gray-600">
                Live scores, instant point updates, and real-time leaderboard rankings.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Compete & Have Fun</h3>
              <p className="text-sm text-gray-600">
                Join contests, compete with friends, and earn bragging rights!
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Safe & Secure</h3>
              <p className="text-sm text-gray-600">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with fantasy cricket in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Select a Match</h3>
              <p className="text-gray-600">
                Choose from upcoming cricket matches across various tournaments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Create Your Team</h3>
              <p className="text-gray-600">
                Pick 11 players including batsmen, bowlers, and all-rounders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Join & Compete</h3>
              <p className="text-gray-600">
                Join contests and see your team climb the leaderboard!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Play Fantasy Cricket?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of cricket fans already playing on Khelosmart.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center bg-white text-green-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
            Get Started Now
          </Link>
        </div>
      </section>
    </LayoutSSR>
  );
}
