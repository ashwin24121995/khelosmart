import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Trophy, 
  Users, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Award,
  BarChart3
} from "lucide-react";

export default function HowToPlay() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Play Fantasy Cricket</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to create your dream team, understand the points system, and compete with other cricket fans. 
              Our comprehensive guide will help you become a fantasy cricket expert!
            </p>
          </div>

          {/* Quick Overview */}
          <Card className="mb-12 bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Quick Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                  <p className="font-semibold">Select Match</p>
                  <p className="text-sm text-muted-foreground">Choose from upcoming matches</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                  <p className="font-semibold">Build Team</p>
                  <p className="text-sm text-muted-foreground">Select 11 players</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                  <p className="font-semibold">Pick C & VC</p>
                  <p className="text-sm text-muted-foreground">Choose wisely for bonus</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                  <p className="font-semibold">Join Contest</p>
                  <p className="text-sm text-muted-foreground">Compete & track live</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Steps */}
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Step-by-Step Guide</h2>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Select a Match</CardTitle>
                    <p className="text-muted-foreground">Choose from various tournaments and leagues</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Browse through upcoming cricket matches from various tournaments and leagues around the world. 
                  We cover all major cricket events including IPL, T20 World Cup, ODI World Cup, BBL, PSL, 
                  The Hundred, and international bilateral series.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Match Categories
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span><strong>Upcoming:</strong> Matches you can create teams for</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-500" />
                        <span><strong>Live:</strong> Ongoing matches with real-time scoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span><strong>Completed:</strong> Past matches with final results</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Check the match venue - pitch conditions affect player performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Consider weather forecasts - rain can impact match outcomes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Review team news for injury updates and playing XI announcements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Create Your Fantasy Team</CardTitle>
                    <p className="text-muted-foreground">Build your dream XI following the rules</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Build your fantasy team by selecting 11 players from both teams participating in the match. 
                  Each player has a credit value, and you must stay within the 100 credit budget while following 
                  the team composition rules.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Team Composition Rules</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mx-auto mb-2">WK</div>
                      <p className="font-bold text-lg">Wicket-Keeper</p>
                      <p className="text-sm text-muted-foreground">1-4 Players</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                      <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mx-auto mb-2">BAT</div>
                      <p className="font-bold text-lg">Batsmen</p>
                      <p className="text-sm text-muted-foreground">3-6 Players</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
                      <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold mx-auto mb-2">AR</div>
                      <p className="font-bold text-lg">All-Rounders</p>
                      <p className="text-sm text-muted-foreground">1-4 Players</p>
                    </div>
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                      <div className="h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold mx-auto mb-2">BOWL</div>
                      <p className="font-bold text-lg">Bowlers</p>
                      <p className="text-sm text-muted-foreground">3-6 Players</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-800 dark:text-amber-300">
                      <AlertTriangle className="h-4 w-4" />
                      Important Rules
                    </h4>
                    <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400">
                      <li>• Maximum 7 players from one team</li>
                      <li>• Total 11 players must be selected</li>
                      <li>• Stay within 100 credit budget</li>
                      <li>• At least 1 player from each category</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-800 dark:text-green-300">
                      <Lightbulb className="h-4 w-4" />
                      Selection Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                      <li>• Check recent form and performance stats</li>
                      <li>• Consider head-to-head records vs opponent</li>
                      <li>• Look at venue-specific performance</li>
                      <li>• Balance your team with consistent performers</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Choose Captain & Vice-Captain</CardTitle>
                    <p className="text-muted-foreground">The most crucial decision for your team</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Your Captain and Vice-Captain selections are the most important decisions you'll make. 
                  These players earn bonus points, so choose wisely based on form, matchups, and conditions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-xl">C</div>
                      <div>
                        <h4 className="font-bold text-lg">Captain</h4>
                        <p className="text-sm text-muted-foreground">Your star performer</p>
                      </div>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2x Points</p>
                      <p className="text-sm text-muted-foreground">For all actions during the match</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Choose a player who is in excellent form and has a good track record against the opposition. 
                      The Captain's performance can make or break your fantasy score.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">VC</div>
                      <div>
                        <h4 className="font-bold text-lg">Vice-Captain</h4>
                        <p className="text-sm text-muted-foreground">Your backup star</p>
                      </div>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1.5x Points</p>
                      <p className="text-sm text-muted-foreground">For all actions during the match</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Select a reliable performer who can deliver consistently. The Vice-Captain provides 
                      insurance in case your Captain doesn't perform as expected.
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Captain Selection Strategy
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span><strong>All-rounders:</strong> Can earn points from both batting and bowling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span><strong>Opening batsmen:</strong> Get more balls to face and scoring opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span><strong>Strike bowlers:</strong> Likely to take wickets in favorable conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span><strong>In-form players:</strong> Recent performance is a strong indicator</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Join Contest & Track Live</CardTitle>
                    <p className="text-muted-foreground">Compete and watch your points grow</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Once your team is ready, join a contest and compete with other players. 
                  Our platform provides real-time updates so you can track your team's performance 
                  ball-by-ball as the match progresses.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Live Scoring</h4>
                    <p className="text-sm text-muted-foreground">Points update ball-by-ball</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Live Leaderboard</h4>
                    <p className="text-sm text-muted-foreground">Track your rank in real-time</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Player Stats</h4>
                    <p className="text-sm text-muted-foreground">Detailed performance breakdown</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-800 dark:text-blue-300">
                    <Shield className="h-4 w-4" />
                    Remember: It's Free to Play!
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Khelosmart is 100% free to play. There are no entry fees, no deposits, and no real money involved. 
                    Compete for fun, bragging rights, and the satisfaction of proving your cricket knowledge!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comprehensive Points System */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6" />
                Complete Fantasy Points System
              </CardTitle>
              <p className="text-muted-foreground">
                Understand how points are calculated for every action on the field
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Batting Points */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-bold mb-4 text-green-800 dark:text-green-300 flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-green-500 text-white flex items-center justify-center text-xs font-bold">BAT</div>
                    Batting Points
                  </h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-green-200 dark:border-green-800">
                        <td className="py-2">Run scored</td>
                        <td className="py-2 text-right font-medium text-green-600 dark:text-green-400">+1</td>
                      </tr>
                      <tr className="border-b border-green-200 dark:border-green-800">
                        <td className="py-2">Boundary bonus (4s)</td>
                        <td className="py-2 text-right font-medium text-green-600 dark:text-green-400">+1</td>
                      </tr>
                      <tr className="border-b border-green-200 dark:border-green-800">
                        <td className="py-2">Six bonus</td>
                        <td className="py-2 text-right font-medium text-green-600 dark:text-green-400">+2</td>
                      </tr>
                      <tr className="border-b border-green-200 dark:border-green-800">
                        <td className="py-2">30 runs bonus</td>
                        <td className="py-2 text-right font-medium text-green-600 dark:text-green-400">+4</td>
                      </tr>
                      <tr className="border-b border-green-200 dark:border-green-800">
                        <td className="py-2">Half-century bonus</td>
                        <td className="py-2 text-right font-medium text-green-600 dark:text-green-400">+8</td>
                      </tr>
                      <tr className="border-b border-green-200 dark:border-green-800">
                        <td className="py-2">Century bonus</td>
                        <td className="py-2 text-right font-medium text-green-600 dark:text-green-400">+16</td>
                      </tr>
                      <tr>
                        <td className="py-2">Duck (batsmen only)</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">-2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bowling Points */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-bold mb-4 text-red-800 dark:text-red-300 flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-red-500 text-white flex items-center justify-center text-xs font-bold">BOWL</div>
                    Bowling Points
                  </h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-red-200 dark:border-red-800">
                        <td className="py-2">Wicket (excl. run out)</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">+25</td>
                      </tr>
                      <tr className="border-b border-red-200 dark:border-red-800">
                        <td className="py-2">Bonus (LBW/Bowled)</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">+8</td>
                      </tr>
                      <tr className="border-b border-red-200 dark:border-red-800">
                        <td className="py-2">3 wicket haul</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">+4</td>
                      </tr>
                      <tr className="border-b border-red-200 dark:border-red-800">
                        <td className="py-2">4 wicket haul</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">+8</td>
                      </tr>
                      <tr className="border-b border-red-200 dark:border-red-800">
                        <td className="py-2">5 wicket haul</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">+16</td>
                      </tr>
                      <tr>
                        <td className="py-2">Maiden over</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">+12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Fielding Points */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-bold mb-4 text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">FLD</div>
                    Fielding Points
                  </h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-blue-200 dark:border-blue-800">
                        <td className="py-2">Catch</td>
                        <td className="py-2 text-right font-medium text-blue-600 dark:text-blue-400">+8</td>
                      </tr>
                      <tr className="border-b border-blue-200 dark:border-blue-800">
                        <td className="py-2">Stumping</td>
                        <td className="py-2 text-right font-medium text-blue-600 dark:text-blue-400">+12</td>
                      </tr>
                      <tr className="border-b border-blue-200 dark:border-blue-800">
                        <td className="py-2">Run out (direct hit)</td>
                        <td className="py-2 text-right font-medium text-blue-600 dark:text-blue-400">+12</td>
                      </tr>
                      <tr className="border-b border-blue-200 dark:border-blue-800">
                        <td className="py-2">Run out (indirect)</td>
                        <td className="py-2 text-right font-medium text-blue-600 dark:text-blue-400">+6</td>
                      </tr>
                      <tr>
                        <td className="py-2">3 catch bonus</td>
                        <td className="py-2 text-right font-medium text-blue-600 dark:text-blue-400">+4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Economy & Strike Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-bold mb-4 text-purple-800 dark:text-purple-300">Economy Rate Bonus (Min 2 overs)</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-purple-200 dark:border-purple-800">
                        <td className="py-2">Below 5 runs/over</td>
                        <td className="py-2 text-right font-medium text-purple-600 dark:text-purple-400">+6</td>
                      </tr>
                      <tr className="border-b border-purple-200 dark:border-purple-800">
                        <td className="py-2">5-5.99 runs/over</td>
                        <td className="py-2 text-right font-medium text-purple-600 dark:text-purple-400">+4</td>
                      </tr>
                      <tr className="border-b border-purple-200 dark:border-purple-800">
                        <td className="py-2">6-7 runs/over</td>
                        <td className="py-2 text-right font-medium text-purple-600 dark:text-purple-400">+2</td>
                      </tr>
                      <tr className="border-b border-purple-200 dark:border-purple-800">
                        <td className="py-2">10-11 runs/over</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">-2</td>
                      </tr>
                      <tr>
                        <td className="py-2">Above 11 runs/over</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">-4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                  <h4 className="font-bold mb-4 text-amber-800 dark:text-amber-300">Strike Rate Bonus (Min 10 balls)</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-amber-200 dark:border-amber-800">
                        <td className="py-2">Above 170 SR</td>
                        <td className="py-2 text-right font-medium text-amber-600 dark:text-amber-400">+6</td>
                      </tr>
                      <tr className="border-b border-amber-200 dark:border-amber-800">
                        <td className="py-2">150-170 SR</td>
                        <td className="py-2 text-right font-medium text-amber-600 dark:text-amber-400">+4</td>
                      </tr>
                      <tr className="border-b border-amber-200 dark:border-amber-800">
                        <td className="py-2">130-150 SR</td>
                        <td className="py-2 text-right font-medium text-amber-600 dark:text-amber-400">+2</td>
                      </tr>
                      <tr className="border-b border-amber-200 dark:border-amber-800">
                        <td className="py-2">60-70 SR</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">-2</td>
                      </tr>
                      <tr>
                        <td className="py-2">Below 60 SR</td>
                        <td className="py-2 text-right font-medium text-red-600 dark:text-red-400">-4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expert Tips Section */}
          <Card className="mb-12 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lightbulb className="h-6 w-6" />
                Expert Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Research Player Form</h4>
                      <p className="text-sm text-muted-foreground">Check recent performances, not just overall stats. A player's last 5-10 matches are more relevant than career averages.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Consider Venue & Conditions</h4>
                      <p className="text-sm text-muted-foreground">Some players perform better at specific venues. Check pitch reports and weather conditions before selecting.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Balance Your Team</h4>
                      <p className="text-sm text-muted-foreground">Don't put all your credits on star players. A balanced team with consistent performers often outperforms star-heavy teams.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Pick All-Rounders Wisely</h4>
                      <p className="text-sm text-muted-foreground">All-rounders can earn points from both batting and bowling. They're often great captain choices.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Wait for Playing XI</h4>
                      <p className="text-sm text-muted-foreground">If possible, wait for the official playing XI announcement before finalizing your team to avoid selecting benched players.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Trust Your Cricket Knowledge</h4>
                      <p className="text-sm text-muted-foreground">Fantasy cricket rewards cricket knowledge. Use your understanding of the game to make informed decisions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Test Your Cricket Knowledge?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of cricket fans on Khelosmart. Create your fantasy team, compete in contests, 
              and prove you're the ultimate cricket expert - all for free!
            </p>
            <Button size="lg" asChild>
              <Link href="/matches">
                <Trophy className="h-5 w-5 mr-2" />
                Start Playing Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
