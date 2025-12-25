import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  AlertTriangle, 
  Phone,
  Heart,
  Users,
  Ban,
  CheckCircle
} from "lucide-react";

export default function ResponsibleGaming() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Responsible Gaming</h1>
            <p className="text-xl text-muted-foreground">
              At Khelosmart, we are committed to promoting responsible gaming practices
            </p>
          </div>

          <Card className="mb-8 border-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Our Commitment</h2>
              </div>
              <p className="text-muted-foreground">
                Khelosmart is a free-to-play fantasy sports platform. We do not involve any real money 
                transactions, betting, or gambling. Our platform is designed purely for entertainment 
                and to enhance your cricket viewing experience.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ban className="h-5 w-5 text-destructive" />
                  Age Restriction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Users must be 18 years or older to use Khelosmart. We implement strict age 
                  verification measures to ensure compliance with this requirement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Geo-Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Users from Telangana, Andhra Pradesh, Assam, and Odisha are restricted from 
                  participating due to state-specific regulations on online gaming.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Time Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We encourage users to maintain a healthy balance between gaming and other 
                  activities. Set time limits for yourself and take regular breaks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Mental Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gaming should be fun and entertaining. If you feel stressed or anxious about 
                  your gaming habits, please take a break and seek support if needed.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Tips for Responsible Gaming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Play for entertainment, not as a source of income</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Set time limits for your gaming sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Don't let gaming interfere with your work, studies, or relationships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Take regular breaks during gaming sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Never share your account credentials with others</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>If you feel your gaming habits are becoming problematic, seek help</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you or someone you know is struggling with gaming-related issues, 
                please reach out to professional support services:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>iCall:</strong> 9152987821</p>
                <p><strong>Vandrevala Foundation:</strong> 1860-2662-345</p>
                <p><strong>NIMHANS:</strong> 080-46110007</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
