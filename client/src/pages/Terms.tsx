import Layout from "@/components/Layout";
import { RestrictedStatesNotice, RESTRICTED_STATES } from "@/components/RestrictedStatesNotice";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Terms() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Terms and Conditions</h1>
          <p className="text-center text-muted-foreground mb-2">
            Please read these terms carefully before using Khelosmart
          </p>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Last Updated: January 2026
          </p>

          {/* Important Notice */}
          <Card className="mb-8 border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-primary font-medium">
                Khelosmart is a FREE-TO-PLAY fantasy sports platform designed purely for entertainment purposes. 
                There is NO real money involvement, NO cash prizes, and NO gambling or betting of any kind.
              </p>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {/* Section 1: Introduction */}
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to Khelosmart. These Terms and Conditions ("Terms") govern your use of the Khelosmart 
              website and services (collectively, the "Platform") operated by THIRUMOOLAR SAPTHAYOGA GRADING 
              (OPC) PRIVATE LIMITED ("Company", "we", "us", or "our"), a company registered in India with 
              CIN U80301TN2019OPC130468.
            </p>
            <p className="text-muted-foreground mb-4">
              By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree 
              to these Terms, please do not use our Platform.
            </p>

            {/* Section 2: Eligibility */}
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground mb-4">To use Khelosmart, you must:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Be at least <strong>18 years of age</strong></li>
              <li>Be a resident of India</li>
              <li><strong>NOT</strong> be a resident of {RESTRICTED_STATES.join(", ")}</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Not be prohibited from using the Platform under applicable laws</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              By using our Platform, you represent and warrant that you meet all eligibility requirements. 
              We reserve the right to verify your eligibility at any time and suspend or terminate accounts 
              that do not meet these requirements.
            </p>
            
            {/* Restricted States Notice */}
            <RestrictedStatesNotice variant="banner" className="my-6" />

            {/* Section 3: Account Registration */}
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Account Registration</h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of the Platform, you must create an account. When registering, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Keep your password secure and confidential</li>
              <li>Not share your account credentials with others</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              You may only create one account. Multiple accounts are prohibited and may result in termination 
              of all associated accounts.
            </p>

            {/* Section 4: Platform Services */}
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Platform Services</h2>
            <p className="text-muted-foreground mb-4">
              Khelosmart provides a free-to-play fantasy sports platform where users can:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Create virtual fantasy cricket teams</li>
              <li>Participate in free contests</li>
              <li>Track live scores and player performances</li>
              <li>Compete on leaderboards with other users</li>
            </ul>
            <Card className="mb-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <p className="text-amber-800 dark:text-amber-300 font-medium">
                  <strong>Important:</strong> All services are provided free of charge. There are no entry fees, 
                  no real money prizes, and no monetary rewards. The Platform is designed solely for entertainment purposes.
                </p>
              </CardContent>
            </Card>

            {/* Section 5: User Conduct */}
            <h2 className="text-2xl font-bold mt-8 mb-4">5. User Conduct</h2>
            <p className="text-muted-foreground mb-4">When using our Platform, you agree NOT to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Create multiple accounts or share accounts</li>
              <li>Use automated tools, bots, or scripts</li>
              <li>Attempt to manipulate contests or leaderboards</li>
              <li>Engage in collusion with other users</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post offensive, defamatory, or inappropriate content</li>
              <li>Attempt to hack, disrupt, or compromise the Platform</li>
              <li>Exploit bugs or vulnerabilities for unfair advantage</li>
              <li>Impersonate others or provide false information</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Violation of these rules may result in warnings, suspension, or permanent termination of your account.
            </p>

            {/* Section 6: Fantasy Sports - Game of Skill */}
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Fantasy Sports - Game of Skill</h2>
            <p className="text-muted-foreground mb-4">
              Fantasy sports, as offered on Khelosmart, is recognized as a game of skill under Indian law. 
              The Supreme Court of India, in the landmark case of <em>K.R. Lakshmanan vs. State of Tamil Nadu (1996)</em>, 
              established that games where success depends predominantly on the superior knowledge, training, attention, 
              experience, and adroitness of the player are games of skill.
            </p>
            <p className="text-muted-foreground mb-4">
              Success in fantasy cricket requires:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Knowledge of cricket rules, formats, and strategies</li>
              <li>Understanding of player statistics and performance patterns</li>
              <li>Analysis of pitch conditions, weather, and venue factors</li>
              <li>Strategic team selection and captain/vice-captain choices</li>
              <li>Continuous learning and adaptation based on match situations</li>
            </ul>

            {/* Section 7: Intellectual Property */}
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              All content on the Platform, including but not limited to text, graphics, logos, images, software, 
              and design, is the property of THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED or its licensors 
              and is protected by intellectual property laws.
            </p>
            <p className="text-muted-foreground mb-4">
              You are granted a limited, non-exclusive, non-transferable license to access and use the Platform 
              for personal, non-commercial purposes. You may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use our trademarks or branding without authorization</li>
              <li>Reverse engineer or decompile our software</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>

            {/* Section 8: Disclaimers */}
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimers</h2>
            <p className="text-muted-foreground mb-4">
              The Platform is provided "as is" and "as available" without warranties of any kind, either express 
              or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>The Platform will be uninterrupted or error-free</li>
              <li>Defects will be corrected in a timely manner</li>
              <li>The Platform is free of viruses or harmful components</li>
              <li>The results obtained from using the Platform will be accurate</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Match data and player statistics are sourced from third-party providers. While we strive for accuracy, 
              we do not guarantee the completeness or accuracy of such data.
            </p>

            {/* Section 9: Limitation of Liability */}
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED and its 
              directors, employees, and affiliates shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Your use or inability to use the Platform</li>
              <li>Any errors or inaccuracies in content</li>
              <li>Unauthorized access to your account</li>
              <li>Any third-party conduct on the Platform</li>
              <li>Any interruption or cessation of services</li>
            </ul>

            {/* Section 10: Indemnification */}
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground mb-4">
              You agree to indemnify, defend, and hold harmless THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED, 
              its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and 
              expenses (including legal fees) arising from your use of the Platform, violation of these Terms, 
              or infringement of any third-party rights.
            </p>

            {/* Section 11: Termination */}
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to suspend or terminate your account and access to the Platform at any time, 
              without prior notice, for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Conduct harmful to other users or the Platform</li>
              <li>Extended periods of inactivity</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              You may also terminate your account at any time by contacting our support team.
            </p>

            {/* Section 12: Modifications to Terms */}
            <h2 className="text-2xl font-bold mt-8 mb-4">12. Modifications to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these Terms at any time. Significant changes will be communicated 
              through the Platform or via email. Your continued use of the Platform after changes constitutes 
              acceptance of the modified Terms. We encourage you to review these Terms periodically.
            </p>

            {/* Section 13: Governing Law and Jurisdiction */}
            <h2 className="text-2xl font-bold mt-8 mb-4">13. Governing Law and Jurisdiction</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
              arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction 
              of the courts in Villupuram, Tamil Nadu, India.
            </p>

            {/* Section 14: Dispute Resolution */}
            <h2 className="text-2xl font-bold mt-8 mb-4">14. Dispute Resolution</h2>
            <p className="text-muted-foreground mb-4">
              Any dispute or claim arising out of or relating to these Terms shall first be attempted to be 
              resolved through good-faith negotiations. If the dispute cannot be resolved through negotiations 
              within 30 days, either party may pursue legal remedies as provided under applicable law, including 
              arbitration under the Arbitration and Conciliation Act, 1996.
            </p>

            {/* Section 15: Severability */}
            <h2 className="text-2xl font-bold mt-8 mb-4">15. Severability</h2>
            <p className="text-muted-foreground mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions 
              shall continue in full force and effect. The invalid provision shall be modified to the minimum 
              extent necessary to make it valid and enforceable.
            </p>

            {/* Section 16: Entire Agreement */}
            <h2 className="text-2xl font-bold mt-8 mb-4">16. Entire Agreement</h2>
            <p className="text-muted-foreground mb-4">
              These Terms, together with our Privacy Policy and any other legal notices published on the Platform, 
              constitute the entire agreement between you and THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED 
              regarding your use of the Platform.
            </p>

            {/* Section 17: Contact Information */}
            <h2 className="text-2xl font-bold mt-8 mb-4">17. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us:
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
                  <p><strong>Email:</strong> support@khelosmart.com</p>
                  <p><strong>Website:</strong> www.khelosmart.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Policies */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Related Policies</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link href="/fair-play" className="text-primary hover:underline">Fair Play Policy</Link>
              <Link href="/responsible-gaming" className="text-primary hover:underline">Responsible Gaming</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
