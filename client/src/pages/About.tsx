import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Shield, Target } from "lucide-react";
import { RestrictedStatesNotice } from "@/components/RestrictedStatesNotice";

export default function About() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Khelosmart</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Khelosmart is a free-to-play fantasy cricket platform operated by THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED. 
              We provide cricket enthusiasts with an exciting way to engage with the sport they love.
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To create an engaging, fair, and responsible fantasy sports platform that brings cricket fans 
                  together and enhances their enjoyment of the game. We believe in providing entertainment 
                  through skill-based gaming while maintaining the highest standards of integrity and user protection.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6">Why Choose Khelosmart?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">100% Free to Play</h3>
                  </div>
                  <p className="text-muted-foreground">
                    No entry fees, no hidden charges. Enjoy fantasy cricket without spending a single rupee.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Real-Time Data</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Live scores, instant point calculations, and real-time leaderboards powered by official cricket data.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Safe & Secure</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Your data is protected with industry-standard security measures and privacy practices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Skill-Based Gaming</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Success depends on your cricket knowledge and strategic team selection abilities.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Company Information</h2>
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">Company Name</p>
                    <p>THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">CIN (Corporate Identification Number)</p>
                    <p>U80301TN2019OPC130468</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Registered Address</p>
                    <p>NO 12-F/4C, ANNANAGER RAMANAN STREET,</p>
                    <p>KALLAKURICHI, VILLUPURAM,</p>
                    <p>Tamil Nadu - 606202, India</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Platform</p>
                    <p>Khelosmart Fantasy Cricket</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Website</p>
                    <p>www.khelosmart.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Legal Compliance</h2>
                <p className="text-muted-foreground mb-4">
                  Khelosmart operates in full compliance with Indian laws regarding online gaming. 
                  Fantasy sports is recognized as a game of skill by the Supreme Court of India 
                  (K.R. Lakshmanan vs. State of Tamil Nadu, 1996).
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">18+</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Age Restriction</p>
                      <p className="text-sm text-muted-foreground">Users must be 18 years of age or older to participate.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <RestrictedStatesNotice variant="banner" className="mb-8" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
