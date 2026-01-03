import LayoutSSR from "@/components/LayoutSSR";
import { Link } from "wouter";

export default function MatchesSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Cricket Matches</h1>
        <p className="text-lg text-gray-600 mb-8">
          View all upcoming, live, and completed cricket matches. Create your fantasy team and compete in exciting contests!
        </p>

        {/* Tabs placeholder */}
        <div className="flex gap-4 mb-8 border-b">
          <button className="px-4 py-2 font-semibold text-green-600 border-b-2 border-green-600">Upcoming</button>
          <button className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-700">Live</button>
          <button className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-700">Completed</button>
        </div>

        {/* Matches list placeholder */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-center py-8">
              Loading matches... Please wait while we fetch the latest cricket matches.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-2">How to Play</h3>
          <p className="text-blue-700 mb-4">
            Select a match, create your fantasy team after the toss, and join contests to compete with other cricket fans!
          </p>
          <Link href="/how-to-play" className="text-blue-600 hover:text-blue-800 font-semibold">
            Learn more about how to play →
          </Link>
        </div>
      </div>
    </LayoutSSR>
  );
}
