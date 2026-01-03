import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Clock, 
  AlertTriangle, 
  Phone,
  Heart,
  Users,
  Ban,
  CheckCircle,
  Eye,
  Lock,
  UserX,
  MessageCircle,
  BookOpen,
  Target,
  Lightbulb,
  AlertCircle
} from "lucide-react";

export default function ResponsibleGaming() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Responsible Gaming</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Khelosmart, we are deeply committed to promoting responsible gaming practices. 
              While our platform is free to play with no real money involved, we believe in 
              fostering healthy gaming habits for all our users.
            </p>
          </div>

          {/* Key Commitment Banner */}
          <Card className="mb-12 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Core Commitment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Khelosmart is a <strong>100% free-to-play</strong> fantasy sports platform. We do not involve any real money 
                    transactions, betting, gambling, or cash prizes. Our platform is designed purely for entertainment, 
                    skill development, and to enhance your cricket viewing experience. We are committed to providing 
                    a safe, fair, and enjoyable environment for all cricket enthusiasts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Age and Geo Restrictions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="bg-red-50 dark:bg-red-900/20">
                <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-300">
                  <Ban className="h-6 w-6" />
                  18+ Age Restriction
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Khelosmart is strictly for users who are 18 years of age or older. We implement 
                  robust age verification measures to ensure compliance:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Date of birth verification during registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Age confirmation prompts at key touchpoints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Account suspension for underage users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Parental controls awareness information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
                <CardTitle className="flex items-center gap-3 text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="h-6 w-6" />
                  State Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Due to state-specific regulations on fantasy sports, Khelosmart services are 
                  NOT available to residents of the following states:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                    <Ban className="h-4 w-4 text-amber-600" />
                    <span>Telangana</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                    <Ban className="h-4 w-4 text-amber-600" />
                    <span>Andhra Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                    <Ban className="h-4 w-4 text-amber-600" />
                    <span>Assam</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                    <Ban className="h-4 w-4 text-amber-600" />
                    <span>Odisha</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                    <Ban className="h-4 w-4 text-amber-600" />
                    <span>Sikkim</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded">
                    <Ban className="h-4 w-4 text-amber-600" />
                    <span>Nagaland</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Responsible Gaming Principles */}
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            Our Responsible Gaming Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5 text-primary" />
                  Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We maintain complete transparency about our platform being free-to-play. All rules, 
                  points systems, and contest mechanics are clearly explained. No hidden terms or conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  User Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We protect our users through secure data handling, privacy controls, and account 
                  security features. Your personal information is never sold or shared without consent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Fair Play
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We ensure fair competition through anti-fraud measures, one-account policy, and 
                  transparent scoring. Everyone has an equal opportunity to enjoy the platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Time Awareness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We encourage healthy time management. Gaming should complement your life, not 
                  dominate it. Take breaks, set limits, and maintain balance in your activities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-red-500" />
                  Well-being Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your mental and emotional well-being matters to us. Gaming should be enjoyable 
                  and stress-free. If it's not fun anymore, it's time to take a break.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We provide resources and information to help users understand responsible gaming 
                  practices and recognize signs of problematic behavior.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Self-Exclusion Section */}
          <Card className="mb-12 border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
              <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-300">
                <UserX className="h-6 w-6" />
                Self-Exclusion & Account Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                We believe users should have control over their gaming experience. If you feel you need 
                a break from the platform, we offer the following options:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Temporary Break
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Take a short break from the platform. Your account will be temporarily suspended 
                    for a period of your choosing (7 days, 30 days, or 90 days).
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Account automatically reactivates after the period</li>
                    <li>• All your data and teams are preserved</li>
                    <li>• Contact support to request a temporary break</li>
                  </ul>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Ban className="h-4 w-4 text-red-500" />
                    Permanent Self-Exclusion
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you wish to permanently stop using Khelosmart, you can request complete 
                    account deletion and self-exclusion.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Account and all data permanently deleted</li>
                    <li>• Cannot create new accounts with same details</li>
                    <li>• Contact support with your request</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>To request self-exclusion:</strong> Email us at support@khelosmart.com with 
                  the subject "Self-Exclusion Request" and include your registered email address and 
                  preferred exclusion period. We will process your request within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips for Responsible Gaming */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-amber-500" />
                Tips for Healthy Gaming Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Play for Fun</h4>
                      <p className="text-sm text-muted-foreground">Treat fantasy cricket as entertainment, not a competitive obligation. Enjoy the experience!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Set Time Limits</h4>
                      <p className="text-sm text-muted-foreground">Decide how much time you want to spend on the platform and stick to it. Use phone timers if needed.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Take Regular Breaks</h4>
                      <p className="text-sm text-muted-foreground">Step away from the screen regularly. Use the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Maintain Balance</h4>
                      <p className="text-sm text-muted-foreground">Don't let gaming interfere with work, studies, relationships, or other important activities.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Stay Social</h4>
                      <p className="text-sm text-muted-foreground">Use fantasy cricket as a way to connect with friends, not isolate yourself. Share the experience!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Keep Perspective</h4>
                      <p className="text-sm text-muted-foreground">Remember it's just a game. Wins and losses don't define you. Don't take results too seriously.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Protect Your Account</h4>
                      <p className="text-sm text-muted-foreground">Never share your login credentials. Use strong passwords and enable security features.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Seek Help if Needed</h4>
                      <p className="text-sm text-muted-foreground">If gaming is causing stress or affecting your life negatively, don't hesitate to reach out for support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning Signs */}
          <Card className="mb-12 border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
              <CardTitle className="flex items-center gap-3 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-6 w-6" />
                Recognizing Problematic Gaming Behavior
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                While Khelosmart is free to play, we want our users to be aware of signs that may indicate 
                unhealthy gaming habits. If you notice any of these signs, consider taking a break:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Spending excessive time on the platform, neglecting other activities</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Feeling restless or irritable when not playing</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Neglecting work, studies, or personal relationships</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Lying to others about time spent gaming</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Using gaming to escape from problems or negative feelings</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Continuing to play despite negative consequences</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Resources */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                Professional Support Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                If you or someone you know is struggling with gaming-related issues or mental health concerns, 
                please reach out to these professional support services. Help is available 24/7.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">iCall</h4>
                  <p className="text-sm text-muted-foreground mb-2">Psychosocial helpline by TISS</p>
                  <p className="text-lg font-bold text-primary">9152987821</p>
                  <p className="text-xs text-muted-foreground">Mon-Sat, 8am-10pm</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Vandrevala Foundation</h4>
                  <p className="text-sm text-muted-foreground mb-2">Mental health support</p>
                  <p className="text-lg font-bold text-primary">1860-2662-345</p>
                  <p className="text-xs text-muted-foreground">24/7 Available</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">NIMHANS</h4>
                  <p className="text-sm text-muted-foreground mb-2">National mental health institute</p>
                  <p className="text-lg font-bold text-primary">080-46110007</p>
                  <p className="text-xs text-muted-foreground">Mon-Sat, 9am-5pm</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Snehi</h4>
                  <p className="text-sm text-muted-foreground mb-2">Emotional support helpline</p>
                  <p className="text-lg font-bold text-primary">044-24640050</p>
                  <p className="text-xs text-muted-foreground">24/7 Available</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">AASRA</h4>
                  <p className="text-sm text-muted-foreground mb-2">Crisis intervention center</p>
                  <p className="text-lg font-bold text-primary">9820466726</p>
                  <p className="text-xs text-muted-foreground">24/7 Available</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Khelosmart Support</h4>
                  <p className="text-sm text-muted-foreground mb-2">Platform-specific help</p>
                  <p className="text-lg font-bold text-primary">support@khelosmart.com</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">We're Here to Help</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                If you have any questions about our responsible gaming policies or need assistance, 
                our support team is always ready to help you.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Company Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</strong>
            </p>
            <p>
              CIN: U80301TN2019OPC130468 | Villupuram, Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
