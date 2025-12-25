import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Scale, 
  Shield, 
  Eye, 
  Ban,
  CheckCircle,
  AlertTriangle,
  Lock
} from "lucide-react";

export default function FairPlay() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Fair Play Policy</h1>
            <p className="text-xl text-muted-foreground">
              Ensuring a level playing field for all Khelosmart users
            </p>
          </div>

          <Card className="mb-8 border-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Scale className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Our Fair Play Commitment</h2>
              </div>
              <p className="text-muted-foreground">
                At Khelosmart, we are committed to providing a fair and transparent gaming environment. 
                We employ various measures to detect and prevent any form of cheating, collusion, or 
                unfair practices on our platform.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Monitoring & Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We continuously monitor all activities on our platform to ensure fair play:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Advanced algorithms to detect suspicious patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Multi-account detection systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Collusion detection mechanisms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Regular audits of contest results</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ban className="h-5 w-5 text-destructive" />
                  Prohibited Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The following activities are strictly prohibited on Khelosmart:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <span>Creating or operating multiple accounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <span>Colluding with other users to gain unfair advantage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <span>Using bots, scripts, or automated tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <span>Exploiting bugs or vulnerabilities in the system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <span>Sharing account credentials with others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <span>Using insider information to gain advantage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Consequences of Violations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Users found violating our fair play policy may face:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Warning and temporary suspension</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Disqualification from contests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Permanent account termination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Legal action in severe cases</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Data Integrity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All match data, scores, and fantasy points are sourced from official cricket data 
                  providers. We ensure complete transparency in how points are calculated and 
                  leaderboards are determined. Our systems are designed to prevent any manipulation 
                  of results.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Report Suspicious Activity</h3>
              <p className="text-muted-foreground">
                If you notice any suspicious activity or believe someone is violating our fair play 
                policy, please report it immediately through our Contact Us page. All reports are 
                treated confidentially and investigated thoroughly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
