import LayoutSSR from "@/components/LayoutSSR";

export default function HowToPlaySSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">How to Play Fantasy Cricket</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Playing fantasy cricket on Khelosmart is easy and fun! Follow these simple steps to get started.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Create Your Account</h3>
              <p className="text-gray-600">Sign up for free with your email address. No payment information required!</p>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Select a Match</h3>
              <p className="text-gray-600">Browse upcoming cricket matches and choose the one you want to play.</p>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Build Your Team</h3>
              <p className="text-gray-600">Select 11 players within the budget. Choose wisely based on form and conditions.</p>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Join Contests</h3>
              <p className="text-gray-600">Enter free contests and compete with other players for bragging rights!</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Team Composition Rules</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Select exactly 11 players</li>
            <li>Minimum 1 Wicketkeeper</li>
            <li>Minimum 3 Batsmen</li>
            <li>Minimum 1 All-rounder</li>
            <li>Minimum 3 Bowlers</li>
            <li>Maximum 7 players from one team</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Captain & Vice-Captain</h2>
          <p className="text-gray-600 mb-6">
            Choose your Captain and Vice-Captain wisely! Your Captain earns 2x points, while your Vice-Captain earns 1.5x points. Pick players you expect to perform well in the match.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Points System</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-6 py-3 text-gray-600">Run scored</td><td className="px-6 py-3 text-gray-600">+1</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Boundary (4)</td><td className="px-6 py-3 text-gray-600">+1</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Six</td><td className="px-6 py-3 text-gray-600">+2</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Half-century</td><td className="px-6 py-3 text-gray-600">+8</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Century</td><td className="px-6 py-3 text-gray-600">+16</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Wicket</td><td className="px-6 py-3 text-gray-600">+25</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Maiden over</td><td className="px-6 py-3 text-gray-600">+8</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Catch</td><td className="px-6 py-3 text-gray-600">+8</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Stumping</td><td className="px-6 py-3 text-gray-600">+12</td></tr>
                <tr><td className="px-6 py-3 text-gray-600">Run out</td><td className="px-6 py-3 text-gray-600">+6</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutSSR>
  );
}
