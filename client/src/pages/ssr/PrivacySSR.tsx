import LayoutSSR from "@/components/LayoutSSR";

export default function PrivacySSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">1. Information We Collect</h2>
          <p>We collect information you provide directly, including:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Name and email address during registration</li>
            <li>Date of birth for age verification</li>
            <li>State of residence for eligibility verification</li>
            <li>Game activity and preferences</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide and improve our services</li>
            <li>Verify your eligibility to use the platform</li>
            <li>Communicate with you about your account</li>
            <li>Ensure fair play and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">4. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with service providers who assist in operating our platform, subject to confidentiality agreements.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">6. Cookies</h2>
          <p>We use cookies to improve your experience on our platform. You can control cookie settings through your browser.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">7. Contact Us</h2>
          <p>For privacy-related inquiries, contact us at privacy@khelosmart.com</p>
        </div>
      </div>
    </LayoutSSR>
  );
}
