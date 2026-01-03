import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Shield, Target, Heart, Eye, Lightbulb, Award, CheckCircle, Building2, MapPin, Globe, Mail, Phone } from "lucide-react";
import { RestrictedStatesNotice } from "@/components/RestrictedStatesNotice";

export default function About() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Khelosmart</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              India's trusted free-to-play fantasy cricket platform, bringing the excitement of cricket strategy 
              to fans across the nation without any financial risk.
            </p>
          </div>

          {/* Company Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Who We Are</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Khelosmart is a fantasy cricket platform operated by <strong className="text-foreground">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</strong>, 
                  a company registered under the Ministry of Corporate Affairs, Government of India. We are headquartered in Tamil Nadu 
                  and serve cricket enthusiasts across India through our innovative free-to-play platform.
                </p>
                <p>
                  Founded with a vision to democratize fantasy sports, Khelosmart was created to provide cricket fans with an 
                  engaging way to test their cricket knowledge and strategic thinking abilities without the pressure of financial stakes. 
                  We believe that the joy of fantasy cricket should be accessible to everyone, regardless of their financial situation.
                </p>
                <p>
                  Our platform combines cutting-edge technology with a deep understanding of cricket to deliver an immersive 
                  fantasy sports experience. We use real-time data feeds to ensure accurate scoring and provide instant updates 
                  during live matches, making every ball count in your fantasy journey.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To create an engaging, fair, and responsible fantasy sports platform that brings cricket fans 
                  together and enhances their enjoyment of the game through skill-based entertainment, 
                  while maintaining the highest standards of integrity and user protection.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become India's most trusted and loved free-to-play fantasy cricket platform, 
                  where millions of cricket fans can showcase their knowledge, compete with friends, 
                  and experience the thrill of cricket in a completely risk-free environment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/5 border-amber-500/20">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <p className="text-muted-foreground">
                  Transparency, fairness, and user safety are at the core of everything we do. 
                  We are committed to responsible gaming practices, data privacy, and providing 
                  an inclusive platform for all cricket enthusiasts aged 18 and above.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Khelosmart */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Khelosmart?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-lg">100% Free to Play</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Khelosmart is completely free to use. There are no entry fees, no hidden charges, and no premium 
                    subscriptions required. Every feature on our platform is accessible to all users at no cost.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No registration fees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No contest entry fees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No in-app purchases required</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-lg">Real-Time Live Data</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Experience the excitement of live cricket with our real-time data integration. 
                    Watch your fantasy points update ball-by-ball as the action unfolds on the field.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Ball-by-ball score updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Instant fantasy point calculation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Live leaderboard rankings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="font-semibold text-lg">Safe & Secure Platform</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Your privacy and security are our top priorities. We employ industry-standard 
                    security measures to protect your personal information and ensure a safe gaming environment.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>SSL encrypted connections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>Secure data storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>Privacy-first approach</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-lg">Skill-Based Gaming</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Fantasy cricket is a game of skill, not chance. Your success depends on your cricket knowledge, 
                    research abilities, and strategic decision-making skills.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                      <span>Analyze player statistics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                      <span>Study pitch and weather conditions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                      <span>Make strategic captain choices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Legal Compliance Section */}
          <Card className="mb-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Legal Compliance & Game of Skill</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Khelosmart operates in full compliance with Indian laws regarding online gaming and fantasy sports. 
                  Fantasy sports has been recognized as a "game of skill" by the Supreme Court of India in the landmark 
                  case of <strong className="text-foreground">K.R. Lakshmanan vs. State of Tamil Nadu (1996)</strong>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Why Fantasy Sports is a Game of Skill</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Requires analysis of player statistics, form, and historical performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Involves strategic decision-making for team composition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Demands knowledge of cricket rules, formats, and conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Success depends on skill, not random chance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Our Commitment to Compliance</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Registered company with Ministry of Corporate Affairs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Strict 18+ age verification policy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Services restricted in states where fantasy sports is prohibited</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Transparent terms and conditions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Company Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Company Name</p>
                      <p className="text-muted-foreground">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">CIN (Corporate Identification Number)</p>
                      <p className="text-muted-foreground">U80301TN2019OPC130468</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Platform</p>
                      <p className="text-muted-foreground">Khelosmart Fantasy Cricket</p>
                      <p className="text-muted-foreground">www.khelosmart.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Registered Address</p>
                      <p className="text-muted-foreground">NO 12-F/4C, ANNANAGER RAMANAN STREET,</p>
                      <p className="text-muted-foreground">KALLAKURICHI, VILLUPURAM,</p>
                      <p className="text-muted-foreground">Tamil Nadu - 606202, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Contact Email</p>
                      <p className="text-muted-foreground">support@khelosmart.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Age Restriction Notice */}
          <Card className="mb-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">18+</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Age Restriction</h3>
                  <p className="text-red-700 dark:text-red-400">
                    Khelosmart is strictly for users aged 18 years and above. By using our platform, you confirm that 
                    you are at least 18 years old and legally eligible to participate in fantasy sports in your jurisdiction. 
                    We reserve the right to verify your age and may request identity documents for verification purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <RestrictedStatesNotice variant="banner" className="mb-8" />

          {/* Commitment Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                At Khelosmart, we are committed to providing a safe, fair, and enjoyable fantasy cricket experience. 
                We continuously work to improve our platform, add new features, and ensure that every cricket fan 
                can participate in the excitement of fantasy sports without any barriers.
              </p>
              <p className="text-sm text-muted-foreground">
                Thank you for choosing Khelosmart. Play smart, play free, play responsibly!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
