import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-center text-muted-foreground mb-2">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Last Updated: January 2026
          </p>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {/* Section 1: Introduction */}
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED ("Company", "we", "us", or "our") operates 
              the Khelosmart platform (the "Platform"). This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our Platform.
            </p>
            <p className="text-muted-foreground mb-4">
              By using our Platform, you consent to the data practices described in this Privacy Policy. 
              If you do not agree with the terms of this Privacy Policy, please do not access or use our Platform.
            </p>

            {/* Section 2: Information We Collect */}
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Information</h3>
            <p className="text-muted-foreground mb-4">
              When you register for an account, we may collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Mobile phone number</li>
              <li>Date of birth</li>
              <li>State of residence</li>
              <li>Username and password</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Usage Information</h3>
            <p className="text-muted-foreground mb-4">
              We automatically collect certain information when you use our Platform:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and location data</li>
              <li>Pages visited and features used</li>
              <li>Time spent on the Platform</li>
              <li>Referring URLs</li>
              <li>Contest participation and team selections</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, 
              and improve our services. You can control cookie settings through your browser, but disabling cookies 
              may affect Platform functionality.
            </p>
            <Card className="mb-4 bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1 text-sm">
                  <li><strong>Essential Cookies:</strong> Required for basic Platform functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Platform</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Session Cookies:</strong> Maintain your login state during your visit</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3: How We Use Your Information */}
            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>To create and manage your account</li>
              <li>To provide and maintain our Platform services</li>
              <li>To verify your identity and eligibility (age and location)</li>
              <li>To communicate with you about your account and updates</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve our Platform and user experience</li>
              <li>To analyze usage patterns and trends</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To enforce our Terms and Conditions</li>
              <li>To comply with legal obligations</li>
            </ul>

            {/* Section 4: Information Sharing and Disclosure */}
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your 
              information only in the following circumstances:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Service Providers</h3>
            <p className="text-muted-foreground mb-4">
              We may share information with trusted third-party service providers who assist us in operating 
              our Platform, such as hosting providers, analytics services, and customer support tools. 
              These providers are bound by confidentiality agreements.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Legal Requirements</h3>
            <p className="text-muted-foreground mb-4">
              We may disclose your information if required by law, court order, or government request, 
              or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Business Transfers</h3>
            <p className="text-muted-foreground mb-4">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred 
              to the acquiring entity. We will notify you of any such change.
            </p>

            {/* Section 5: Data Security */}
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Encryption of data in transit (SSL/TLS) and at rest</li>
              <li>Secure server infrastructure with regular security updates</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection best practices</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. 
              While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            {/* Section 6: Data Retention */}
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as your account is active or as needed to 
              provide you services. We may also retain information as necessary to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
              <li>Maintain business records as required by law</li>
            </ul>

            {/* Section 7: Your Rights */}
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Right to Access</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request a copy of the personal information we hold about you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Right to Correction</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request correction of inaccurate or incomplete information.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Right to Deletion</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request deletion of your personal information, subject to legal requirements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Right to Withdraw Consent</h4>
                  <p className="text-sm text-muted-foreground">
                    You can withdraw your consent for data processing at any time.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground mb-4">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>

            {/* Section 8: Children's Privacy */}
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground mb-4">
              Our Platform is not intended for users under 18 years of age. We do not knowingly collect 
              personal information from children. If we discover that we have collected information from 
              a minor, we will delete it immediately. If you believe we have inadvertently collected 
              information from a minor, please contact us.
            </p>

            {/* Section 9: Third-Party Links */}
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Third-Party Links</h2>
            <p className="text-muted-foreground mb-4">
              Our Platform may contain links to third-party websites or services. We are not responsible 
              for the privacy practices of these third parties. We encourage you to read the privacy 
              policies of any third-party sites you visit.
            </p>

            {/* Section 10: International Data Transfers */}
            <h2 className="text-2xl font-bold mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground mb-4">
              Your information may be transferred to and processed in countries other than India where 
              our service providers are located. We ensure that appropriate safeguards are in place to 
              protect your information in accordance with this Privacy Policy.
            </p>

            {/* Section 11: Changes to This Privacy Policy */}
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              We encourage you to review this Privacy Policy periodically.
            </p>

            {/* Section 12: Grievance Officer */}
            <h2 className="text-2xl font-bold mt-8 mb-4">12. Grievance Officer</h2>
            <p className="text-muted-foreground mb-4">
              In accordance with the Information Technology Act, 2000 and rules made thereunder, 
              the name and contact details of the Grievance Officer are provided below:
            </p>
            <Card className="mb-4">
              <CardContent className="p-6">
                <p className="font-semibold text-foreground mb-2">Grievance Officer</p>
                <p className="text-muted-foreground">
                  THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED<br />
                  NO 12-F/4C, ANNANAGER RAMANAN STREET,<br />
                  KALLAKURICHI, VILLUPURAM,<br />
                  Tamil Nadu - 606202, India<br /><br />
                  <strong>Email:</strong> grievance@khelosmart.com<br />
                  <strong>Time:</strong> Monday to Friday, 10:00 AM to 6:00 PM IST
                </p>
              </CardContent>
            </Card>

            {/* Section 13: Contact Us */}
            <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-3 text-muted-foreground">
                  <p className="font-semibold text-foreground text-lg">
                    THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED
                  </p>
                  <p>
                    <strong>Registered Address:</strong><br />
                    NO 12-F/4C, ANNANAGER RAMANAN STREET,<br />
                    KALLAKURICHI, VILLUPURAM,<br />
                    Tamil Nadu - 606202, India
                  </p>
                  <p><strong>CIN:</strong> U80301TN2019OPC130468</p>
                  <p><strong>Email:</strong> privacy@khelosmart.com</p>
                  <p><strong>Website:</strong> www.khelosmart.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Policies */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Related Policies</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link>
              <Link href="/fair-play" className="text-primary hover:underline">Fair Play Policy</Link>
              <Link href="/responsible-gaming" className="text-primary hover:underline">Responsible Gaming</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
