import LayoutSSR from "@/components/LayoutSSR";

export default function FairPlaySSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Fair Play Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-lg mb-8">
            At Khelosmart, we are committed to maintaining a fair and enjoyable environment for all users. Our Fair Play Policy ensures that everyone has an equal opportunity to compete.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Our Principles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Equal opportunity for all players</li>
            <li>Transparent scoring and ranking systems</li>
            <li>Zero tolerance for cheating or manipulation</li>
            <li>Protection against collusion and fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Prohibited Activities</h2>
          <p>The following activities are strictly prohibited:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Creating multiple accounts</li>
            <li>Colluding with other users</li>
            <li>Using automated tools or bots</li>
            <li>Exploiting bugs or vulnerabilities</li>
            <li>Sharing account credentials</li>
            <li>Any form of match-fixing or manipulation</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Enforcement</h2>
          <p>Violations of our Fair Play Policy may result in:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Warning or temporary suspension</li>
            <li>Permanent account ban</li>
            <li>Disqualification from contests</li>
            <li>Legal action in severe cases</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Reporting</h2>
          <p>If you suspect any unfair play or violations, please report to us at fairplay@khelosmart.com. All reports are treated confidentially.</p>
        </div>
      </div>
    </LayoutSSR>
  );
}
