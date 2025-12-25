import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <Card>
            <CardContent className="p-6 prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: December 2024
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                THIRUMOOLAR SAPTHAYOGA GRADING ("we", "us", "our") operates Khelosmart. This Privacy 
                Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our platform.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information that you provide directly to us:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Name and email address</li>
                <li>Date of birth (for age verification)</li>
                <li>State of residence (for geo-restriction compliance)</li>
                <li>Phone number (optional)</li>
                <li>Account preferences and settings</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">3. Automatically Collected Information</h2>
              <p className="text-muted-foreground mb-4">
                When you use our platform, we automatically collect:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Usage data (pages visited, time spent, actions taken)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">4. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Verify your eligibility (age and location)</li>
                <li>Process your fantasy team entries</li>
                <li>Send you updates about matches and contests</li>
                <li>Improve our platform and user experience</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">5. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Service providers who assist in operating our platform</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">6. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your personal information for as long as your account is active or as 
                needed to provide you services. We may retain certain information as required by 
                law or for legitimate business purposes.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">8. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">9. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your experience. 
                You can control cookies through your browser settings, but disabling cookies 
                may affect the functionality of our platform.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our platform is not intended for users under 18 years of age. We do not knowingly 
                collect personal information from children under 18.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last 
                updated" date.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us through 
                our Contact Us page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
