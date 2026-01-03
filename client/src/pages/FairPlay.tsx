import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Scale, 
  Shield, 
  Eye, 
  Ban,
  CheckCircle,
  AlertTriangle,
  Lock,
  Users,
  Search,
  FileCheck,
  AlertCircle,
  MessageCircle,
  Fingerprint,
  Server,
  Activity,
  UserCheck,
  ShieldCheck,
  Gavel
} from "lucide-react";

export default function FairPlay() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fair Play Policy</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Khelosmart, we are committed to maintaining a fair, transparent, and secure gaming 
              environment where every user has an equal opportunity to enjoy fantasy cricket.
            </p>
          </div>

          {/* Core Commitment Banner */}
          <Card className="mb-12 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Scale className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Fair Play Commitment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe that every user deserves a level playing field. Our comprehensive fair play 
                    measures ensure that success on Khelosmart is determined purely by cricket knowledge, 
                    strategic thinking, and skill—not by unfair advantages or manipulation. We invest 
                    significantly in technology and processes to detect and prevent any form of cheating.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fair Play Pillars */}
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Our Fair Play Framework
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <Fingerprint className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Identity Verification</h3>
                <p className="text-sm text-muted-foreground">One account per user policy with verification</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">24/7 automated fraud detection systems</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                  <Server className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Data Integrity</h3>
                <p className="text-sm text-muted-foreground">Official data sources with audit trails</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
                  <Gavel className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Strict Enforcement</h3>
                <p className="text-sm text-muted-foreground">Zero tolerance for policy violations</p>
              </CardContent>
            </Card>
          </div>

          {/* Detection & Prevention */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-primary" />
                  Detection Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We employ sophisticated technology to detect and prevent unfair practices:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Search className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Pattern Analysis</h4>
                      <p className="text-xs text-muted-foreground">AI-powered algorithms analyze user behavior to detect anomalies and suspicious patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Multi-Account Detection</h4>
                      <p className="text-xs text-muted-foreground">Advanced systems identify users attempting to create or operate multiple accounts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Activity className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Collusion Detection</h4>
                      <p className="text-xs text-muted-foreground">Mechanisms to identify coordinated activities between users</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Regular Audits</h4>
                      <p className="text-xs text-muted-foreground">Periodic reviews of contest results and user activities</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-primary" />
                  Verification Processes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We verify user identity and eligibility through multiple checkpoints:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Email Verification</h4>
                      <p className="text-xs text-muted-foreground">All accounts require verified email addresses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Age Verification</h4>
                      <p className="text-xs text-muted-foreground">Date of birth confirmation to ensure 18+ compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">State Verification</h4>
                      <p className="text-xs text-muted-foreground">Location checks to enforce state restrictions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Device Fingerprinting</h4>
                      <p className="text-xs text-muted-foreground">Track device signatures to prevent multi-accounting</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prohibited Activities */}
          <Card className="mb-12 border-red-200 dark:border-red-800">
            <CardHeader className="bg-red-50 dark:bg-red-900/20">
              <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-300">
                <Ban className="h-6 w-6" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                The following activities are strictly prohibited on Khelosmart. Engaging in any of these 
                activities will result in immediate action, including permanent account termination:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Multiple Accounts</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Creating, operating, or accessing more than one account per person</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Collusion</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Coordinating with other users to gain unfair advantage in contests</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Automation & Bots</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Using bots, scripts, or automated tools to interact with the platform</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Bug Exploitation</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Exploiting bugs, glitches, or vulnerabilities instead of reporting them</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Account Sharing</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Sharing login credentials or allowing others to access your account</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Insider Information</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Using non-public information about matches or players</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">False Information</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Providing false personal information during registration or verification</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Harassment</h4>
                    <p className="text-xs text-red-700 dark:text-red-400">Harassing, threatening, or abusing other users or staff</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consequences */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Consequences of Violations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We take fair play violations very seriously. Depending on the severity and nature of 
                the violation, users may face one or more of the following consequences:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-amber-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300">Warning</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400">First-time minor violations may result in a formal warning and reminder of our policies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-orange-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300">Temporary Suspension</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-400">Account access may be suspended for a period ranging from 7 to 90 days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-300">Contest Disqualification</h4>
                    <p className="text-sm text-red-700 dark:text-red-400">Removal from specific contests where violations occurred</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border-l-4 border-red-700">
                  <div className="h-8 w-8 rounded-full bg-red-200 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-700">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-200">Permanent Ban</h4>
                    <p className="text-sm text-red-800 dark:text-red-300">Severe or repeated violations result in permanent account termination with no possibility of reinstatement</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> All decisions regarding fair play violations are made after thorough 
                  investigation. Users have the right to appeal decisions through our support channel, but 
                  the final decision rests with Khelosmart's fair play committee.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Integrity */}
          <Card className="mb-12 border-green-200 dark:border-green-800">
            <CardHeader className="bg-green-50 dark:bg-green-900/20">
              <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-300">
                <Lock className="h-6 w-6" />
                Data Integrity & Transparency
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                We ensure complete transparency and integrity in all aspects of our platform:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Server className="h-4 w-4 text-green-600" />
                    Official Data Sources
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Match data sourced from official cricket data providers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Real-time score updates from verified sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Player statistics verified against official records</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-green-600" />
                    Transparent Scoring
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Clear points system published on How to Play page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Detailed breakdown of points for each player action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Audit trails for all point calculations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Section */}
          <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Report Suspicious Activity</h3>
                  <p className="text-muted-foreground mb-4">
                    If you notice any suspicious activity, unfair practices, or believe someone is violating 
                    our fair play policy, please report it immediately. All reports are treated confidentially 
                    and investigated thoroughly by our fair play team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button asChild>
                      <Link href="/contact">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Report Violation
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:fairplay@khelosmart.com">
                        Email: fairplay@khelosmart.com
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Fair Play FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Q: Can family members use the same device?</h4>
                  <p className="text-sm text-muted-foreground">
                    A: Yes, but each person must have their own separate account with unique email addresses. 
                    However, if we detect coordinated activities between accounts on the same device, they 
                    may be flagged for review.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Q: What if I accidentally created two accounts?</h4>
                  <p className="text-sm text-muted-foreground">
                    A: Contact our support team immediately to report the duplicate account. We will help 
                    you close the extra account. Proactive disclosure is always treated more favorably 
                    than detection through our systems.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Q: How can I appeal a fair play decision?</h4>
                  <p className="text-sm text-muted-foreground">
                    A: If you believe a decision was made in error, you can submit an appeal through our 
                    Contact Us page within 7 days of the decision. Include your account details and any 
                    relevant information. Our fair play committee will review your case.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Q: Is using VPN allowed?</h4>
                  <p className="text-sm text-muted-foreground">
                    A: Using VPN to bypass state restrictions is strictly prohibited and will result in 
                    account termination. If you're using VPN for privacy reasons while in an allowed state, 
                    please contact support to discuss your situation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</strong>
            </p>
            <p className="mb-4">
              CIN: U80301TN2019OPC130468 | Villupuram, Tamil Nadu, India
            </p>
            <p className="text-xs">
              This Fair Play Policy is effective as of January 2024 and may be updated periodically. 
              Users will be notified of significant changes.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
