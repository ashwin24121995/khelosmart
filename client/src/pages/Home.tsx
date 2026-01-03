import Layout from "@/components/Layout";
import MatchCard from "@/components/MatchCard";
import { LaunchCountdownBanner } from "@/components/LaunchCountdownBanner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Trophy, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  Loader2,
  Calendar,
  Radio,
  CheckCircle
} from "lucide-react";
import { RestrictedStatesNotice } from "@/components/RestrictedStatesNotice";

export default function Home() {
  const { data: matchData, isLoading, error } = trpc.matches.getLiveScores.useQuery();
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Launch Countdown Banner - Auto-removes after Jan 2, 2026 */}
      <LaunchCountdownBanner />

      {/* Hero Section with Stadium Background */}
      <section className="relative overflow-hidden text-white min-h-[600px]">
        {/* Stadium Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-cricket-stadium.webp')" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-300 text-sm font-medium">{t('home.freeToPlay')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              {t('home.heroTitle')}
              <br />
              <span className="text-green-400">{t('home.heroSubtitle')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg" asChild>
                <Link href="/matches">
                  <Trophy className="h-5 w-5 mr-2" />
                  {t('home.startPlaying')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/how-to-play">
                  {t('home.learnHowToPlay')}
                </Link>
              </Button>
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
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/fantasy-team-creation.webp" 
                  alt="Fantasy Team Selection Interface" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-card border rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">11</p>
                    <p className="text-sm text-muted-foreground">{t('home.playersPerTeam')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('home.buildDreamTeam')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('home.buildDreamTeamDesc')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>{t('home.feature1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>{t('home.feature2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>{t('home.feature3')}</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/matches">
                  {t('home.createYourTeam')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Action Images */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.whyChoose')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.whyChooseDesc')}
            </p>
          </div>
          
          {/* Feature cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Batsman Card */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/images/cricket-action-batsman.webp" 
                alt="Cricket Batsman in Action" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{t('home.realTimeScoring')}</h3>
                <p className="text-gray-200 text-sm">
                  {t('home.realTimeScoringDesc')}
                </p>
              </div>
            </div>

            {/* Bowler Card */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/images/cricket-bowler-action.webp" 
                alt="Cricket Bowler in Action" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{t('home.strategicGameplay')}</h3>
                <p className="text-gray-200 text-sm">
                  {t('home.strategicGameplayDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Feature icons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('home.freeToPlayTitle')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.freeToPlayDesc')}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('home.realTimeUpdates')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.realTimeUpdatesDesc')}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('home.competeHaveFun')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.competeHaveFunDesc')}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('home.safeSecure')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.safeSecureDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('home.cricketMatches')}</h2>
              <p className="text-muted-foreground">{t('home.cricketMatchesDesc')}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/matches">
                {t('home.viewAll')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{t('home.failedToLoad')}</p>
            </div>
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('home.upcoming')} ({matchData?.upcoming.length || 0})
                </TabsTrigger>
                <TabsTrigger value="live" className="gap-2">
                  <Radio className="h-4 w-4" />
                  {t('home.live')} ({matchData?.live.length || 0})
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {t('home.completed')} ({matchData?.completed.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {matchData?.upcoming.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('home.noUpcoming')}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchData?.upcoming.slice(0, 6).map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="live">
                {matchData?.live.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('home.noLive')}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchData?.live.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed">
                {matchData?.completed.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('home.noCompleted')}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchData?.completed.slice(0, 6).map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.howItWorks')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.howItWorksDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('home.step1Title')}</h3>
              <p className="text-muted-foreground">
                {t('home.step1Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('home.step2Title')}</h3>
              <p className="text-muted-foreground">
                {t('home.step2Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('home.step3Title')}</h3>
              <p className="text-muted-foreground">
                {t('home.step3Desc')}
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/how-to-play">
                {t('home.learnMore')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* State Restrictions & Compliance Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Legal Compliance & Eligibility</h2>
              <p className="text-muted-foreground">
                Khelosmart operates in compliance with Indian laws. Please review the eligibility requirements below.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RestrictedStatesNotice variant="card" />
              <div className="bg-card border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">18+</span>
                  </div>
                  <h3 className="text-lg font-semibold">Age Requirement</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  You must be <strong>18 years of age or older</strong> to participate in fantasy sports contests on Khelosmart.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Age verification may be required during registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Fantasy sports is a game of skill recognized by the Supreme Court of India</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>This platform is 100% free to play - no real money involved</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Cricket Updates Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Cricket Updates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with real-time cricket scores, match statistics, and player performances from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <Radio className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Ball-by-Ball Updates</h3>
              <p className="text-muted-foreground text-sm">
                Get instant ball-by-ball commentary and live score updates for all major cricket matches including IPL, T20 World Cup, and international series.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Point Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Watch your fantasy points update in real-time as players score runs, take wickets, and make crucial contributions during live matches.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Leaderboards</h3>
              <p className="text-muted-foreground text-sm">
                Track your position on the leaderboard as the match progresses. See how your team compares against other fantasy players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fantasy Points System Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Fantasy Points System</h2>
              <p className="text-muted-foreground mb-6">
                Our transparent and fair points system rewards smart team selection. Every run, wicket, catch, and stumping counts towards your fantasy score.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Batting Points</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <span>• Run scored: +1 point</span>
                    <span>• Boundary (4s): +1 bonus</span>
                    <span>• Six (6s): +2 bonus</span>
                    <span>• Half-century: +8 bonus</span>
                    <span>• Century: +16 bonus</span>
                    <span>• Strike rate bonus: varies</span>
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Bowling Points</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <span>• Wicket: +25 points</span>
                    <span>• 3-wicket haul: +4 bonus</span>
                    <span>• 4-wicket haul: +8 bonus</span>
                    <span>• 5-wicket haul: +16 bonus</span>
                    <span>• Maiden over: +12 points</span>
                    <span>• Economy bonus: varies</span>
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Fielding Points</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <span>• Catch: +8 points</span>
                    <span>• Stumping: +12 points</span>
                    <span>• Run out (direct): +12 points</span>
                    <span>• Run out (indirect): +6 points</span>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6" asChild>
                <Link href="/how-to-play">
                  View Complete Points System
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-card border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Captain & Vice-Captain Multipliers</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="h-14 w-14 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Captain</h4>
                    <p className="text-sm text-muted-foreground">Earns <strong className="text-yellow-600 dark:text-yellow-400">2x points</strong> for all actions</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">VC</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vice-Captain</h4>
                    <p className="text-sm text-muted-foreground">Earns <strong className="text-blue-600 dark:text-blue-400">1.5x points</strong> for all actions</p>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground mt-4 p-4 bg-muted rounded-lg">
                  <p><strong>Pro Tip:</strong> Choose your Captain wisely! A good Captain selection can make or break your fantasy team's performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Tournaments Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Cricket Tournaments</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create fantasy teams for all major cricket tournaments and leagues from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-card border rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-semibold text-sm">IPL</h4>
              <p className="text-xs text-muted-foreground">Indian Premier League</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🌍</div>
              <h4 className="font-semibold text-sm">T20 World Cup</h4>
              <p className="text-xs text-muted-foreground">ICC T20 World Cup</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🏅</div>
              <h4 className="font-semibold text-sm">ODI World Cup</h4>
              <p className="text-xs text-muted-foreground">ICC Cricket World Cup</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🇦🇺</div>
              <h4 className="font-semibold text-sm">BBL</h4>
              <p className="text-xs text-muted-foreground">Big Bash League</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🇬🇧</div>
              <h4 className="font-semibold text-sm">The Hundred</h4>
              <p className="text-xs text-muted-foreground">England's Premier League</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🇵🇰</div>
              <h4 className="font-semibold text-sm">PSL</h4>
              <p className="text-xs text-muted-foreground">Pakistan Super League</p>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Plus international Test matches, ODIs, T20Is, and many more domestic leagues!
          </p>
        </div>
      </section>

      {/* User Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Players Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied cricket fans who trust Khelosmart for their fantasy cricket experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Khelosmart has made fantasy cricket so much fun! I love that it's completely free to play. The interface is smooth and the live scoring keeps me engaged throughout the match."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-primary">RK</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Rahul K.</p>
                  <p className="text-xs text-muted-foreground">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Finally a fantasy cricket platform that doesn't ask for money! I can enjoy the thrill of building my dream team without any financial risk. Highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-primary">PS</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Priya S.</p>
                  <p className="text-xs text-muted-foreground">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The points system is transparent and fair. I've learned so much about cricket strategy by playing on Khelosmart. It's the perfect way to test your cricket knowledge!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-primary">AM</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Amit M.</p>
                  <p className="text-xs text-muted-foreground">Delhi, NCR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by cricket fans across India for free-to-play fantasy cricket entertainment.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Free to Play</p>
              <p className="text-xs text-muted-foreground mt-1">No hidden charges ever</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Tournaments</p>
              <p className="text-xs text-muted-foreground mt-1">Covered annually</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Live Updates</p>
              <p className="text-xs text-muted-foreground mt-1">Real-time scoring</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Secure</p>
              <p className="text-xs text-muted-foreground mt-1">Data protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Compliance & Game of Skill Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Legal Compliance & Game of Skill</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Khelosmart operates in full compliance with Indian laws and regulations governing fantasy sports.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Supreme Court Recognition
                </h3>
                <p className="text-muted-foreground mb-4">
                  Fantasy sports has been recognized as a "game of skill" by the Supreme Court of India. Unlike gambling, which relies on chance, fantasy sports requires knowledge, research, and strategic decision-making.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Players must analyze player statistics and form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Team selection requires cricket knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Strategic captain/vice-captain choices matter</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Free-to-Play Model
                </h3>
                <p className="text-muted-foreground mb-4">
                  Khelosmart is a 100% free-to-play platform. We do not involve any real money transactions, betting, or gambling of any kind. Our platform is designed purely for entertainment and skill development.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>No entry fees or deposits required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>No real money prizes or withdrawals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Play for fun and bragging rights only</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Company Registration Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground"><strong>Company Name:</strong></p>
                  <p>THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
                </div>
                <div>
                  <p className="text-muted-foreground"><strong>CIN:</strong></p>
                  <p>U80301TN2019OPC130468</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground"><strong>Registered Address:</strong></p>
                  <p>NO 12-F/4C, ANNANAGER RAMANAN STREET, KALLAKURICHI, VILLUPURAM, Tamil Nadu - 606202, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Trophy */}
      <section className="py-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-green" />
        
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.ctaTitle')}
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-xl">
                {t('home.ctaDesc')}
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/matches">
                  <Trophy className="h-5 w-5 mr-2" />
                  {t('home.getStarted')}
                </Link>
              </Button>
            </div>
            
            {/* Trophy Image */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <img 
                  src="/images/trophy-celebration.webp" 
                  alt="Championship Trophy" 
                  className="w-72 h-72 object-contain drop-shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
