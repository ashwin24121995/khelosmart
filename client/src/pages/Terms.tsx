import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          
          <Card>
            <CardContent className="p-6 prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: December 2024
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using Khelosmart ("the Platform"), you accept and agree to be bound by these 
                Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">2. Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                To use Khelosmart, you must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Not be a resident of Telangana, Andhra Pradesh, Assam, or Odisha</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited from using the Platform under applicable laws</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                You agree to provide accurate, current, and complete information during registration. 
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">4. Nature of Service</h2>
              <p className="text-muted-foreground mb-4">
                Khelosmart is a free-to-play fantasy sports platform. The Platform does not involve 
                any real money transactions, betting, or gambling. Fantasy sports is a game of skill 
                as recognized by the Supreme Court of India.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">5. User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Create multiple accounts</li>
                <li>Use bots, scripts, or automated tools</li>
                <li>Collude with other users</li>
                <li>Exploit bugs or vulnerabilities</li>
                <li>Share account credentials</li>
                <li>Engage in any fraudulent or illegal activity</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on the Platform, including logos, designs, text, and graphics, is the 
                property of THIRUMOOLAR SAPTHAYOGA GRADING and is protected by intellectual property laws.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">7. Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                The Platform is provided "as is" without warranties of any kind. We do not guarantee 
                uninterrupted or error-free service. Match data is sourced from third-party providers 
                and we are not responsible for any inaccuracies.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, THIRUMOOLAR SAPTHAYOGA GRADING shall not be 
                liable for any indirect, incidental, special, or consequential damages arising from 
                your use of the Platform.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">9. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to suspend or terminate your account at any time for violation 
                of these terms or for any other reason at our sole discretion.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these Terms at any time. Continued use of the Platform 
                after changes constitutes acceptance of the modified Terms.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">12. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us through our Contact Us page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
