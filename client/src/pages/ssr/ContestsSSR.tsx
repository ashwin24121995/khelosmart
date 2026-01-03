import LayoutSSR from "@/components/LayoutSSR";
import { Link } from "wouter";

export default function ContestsSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Fantasy Cricket Contests</h1>
        <p className="text-lg text-gray-600 mb-8">
          Join free fantasy cricket contests and compete with other cricket fans. Show off your cricket knowledge and climb the leaderboard!
        </p>

        {/* Contests list placeholder */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-center py-8">
              Loading contests... Please wait while we fetch available contests.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-2">100% Free to Play</h3>
            <p className="text-green-700">
              All contests on Khelosmart are completely free. No entry fees, no hidden charges!
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-2">Compete for Bragging Rights</h3>
            <p className="text-blue-700">
              Climb the leaderboard and prove your cricket knowledge to friends and fellow fans!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/matches" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Browse Matches
          </Link>
        </div>
      </div>
    </LayoutSSR>
  );
}
