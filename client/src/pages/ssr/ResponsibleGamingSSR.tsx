import LayoutSSR from "@/components/LayoutSSR";

export default function ResponsibleGamingSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Responsible Gaming</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Important Notice</h3>
            <p className="text-green-700">
              Khelosmart is a FREE-TO-PLAY platform. No real money is involved. This is not gambling. We promote healthy gaming habits for entertainment purposes only.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Our Commitment</h2>
          <p>At Khelosmart, we are committed to providing a safe and enjoyable gaming experience. We encourage all users to play responsibly and maintain a healthy balance between gaming and other activities.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Healthy Gaming Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Set time limits for your gaming sessions</li>
            <li>Take regular breaks during extended play</li>
            <li>Don't let gaming interfere with work, studies, or relationships</li>
            <li>Remember that fantasy sports is meant to be fun and entertaining</li>
            <li>Play for enjoyment, not as a way to escape problems</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Age Restriction</h2>
          <p>Khelosmart is only available to users who are 18 years or older. We have age verification measures in place to ensure compliance.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Self-Exclusion</h2>
          <p>If you feel you need a break from the platform, you can request temporary or permanent account suspension by contacting our support team.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Support Resources</h2>
          <p>If you or someone you know needs help with gaming-related issues, please reach out to professional support services in your area.</p>
        </div>
      </div>
    </LayoutSSR>
  );
}
