import LayoutSSR from "@/components/LayoutSSR";

export default function TermsSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms & Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">1. Acceptance of Terms</h2>
          <p>By accessing and using Khelosmart, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our platform.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">2. Platform Description</h2>
          <p>Khelosmart is a FREE-TO-PLAY fantasy cricket platform for entertainment purposes only. No real money is involved in any contests or games. This is not gambling.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">3. Eligibility</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be at least 18 years old to use this platform</li>
            <li>You must not be a resident of states where fantasy sports are restricted (Telangana, Andhra Pradesh, Assam, Odisha)</li>
            <li>You must provide accurate information during registration</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">4. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">5. Fair Play</h2>
          <p>Users must play fairly and not engage in any form of cheating, collusion, or manipulation of the platform. Violation may result in account suspension.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">6. Intellectual Property</h2>
          <p>All content on Khelosmart, including logos, designs, and text, is the property of THIRUMOOLAR SAPTHAYOGA GRADING and protected by intellectual property laws.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">7. Disclaimer</h2>
          <p>Khelosmart is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access to the platform or accuracy of all information.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">8. Contact</h2>
          <p>For questions about these terms, contact us at legal@khelosmart.com</p>
        </div>
      </div>
    </LayoutSSR>
  );
}
