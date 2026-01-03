/**
 * SSR-compatible Layout component.
 * Renders static header and footer without client-side features.
 */

import { Link } from "wouter";

interface LayoutSSRProps {
  children: React.ReactNode;
}

export default function LayoutSSR({ children }: LayoutSSRProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Khelosmart" className="h-[52px] w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/matches" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Matches
            </Link>
            <Link href="/contests" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Contests
            </Link>
            <Link href="/how-to-play" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              How to Play
            </Link>
            <Link href="/login" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Khelosmart" className="h-[60px] w-auto" />
              </Link>
              <p className="text-sm text-gray-400">
                India's premier free-to-play fantasy cricket platform. Build your dream team and compete for bragging rights!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/matches" className="hover:text-white">Matches</Link></li>
                <li><Link href="/contests" className="hover:text-white">Contests</Link></li>
                <li><Link href="/how-to-play" className="hover:text-white">How to Play</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-white">Responsible Gaming</Link></li>
                <li><Link href="/fair-play" className="hover:text-white">Fair Play</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                <p className="text-xs text-yellow-400">
                  <strong>18+ Only.</strong> Fantasy sports not available in Telangana, Andhra Pradesh, Assam, and Odisha.
                </p>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
              <div>
                <h4 className="font-semibold text-white mb-2">Registered Company</h4>
                <p className="font-medium">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
                <p className="mt-1">CIN: U80301TN2019OPC130468</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Registered Address</h4>
                <p>NO 12-F/4C, ANNANAGER RAMANAN STREET,</p>
                <p>KALLAKURICHI, VILLUPURAM,</p>
                <p>Tamil Nadu - 606202, India</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-200">
                <strong>Important:</strong> Khelosmart is a FREE-TO-PLAY fantasy sports platform for entertainment purposes only. 
                No real money is involved. This is not gambling. Play responsibly and have fun!
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              © 2025 THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
