import LayoutSSR from "@/components/LayoutSSR";
import { Link } from "wouter";

export default function NotFoundSSR() {
  return (
    <LayoutSSR>
      <div className="container py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Go Home
          </Link>
          <Link href="/matches" className="inline-flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors">
            View Matches
          </Link>
        </div>
      </div>
    </LayoutSSR>
  );
}
