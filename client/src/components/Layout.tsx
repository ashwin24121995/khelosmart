import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard,
  Trophy,
  Calendar,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/matches", label: "Matches", icon: Calendar },
    { href: "/contests", label: "Contests", icon: Trophy },
    { href: "/how-to-play", label: "How to Play" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Khelosmart" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-20 bg-gray-700 animate-pulse rounded" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-white hover:bg-gray-800 hover:text-white">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline text-white">{user?.name || "User"}</span>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="flex items-center gap-2 text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-white hover:bg-gray-800 hover:text-white">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black">
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black text-white">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Khelosmart" className="h-10 w-auto" />
              </Link>
              <p className="text-sm text-gray-400">
                India's premier free-to-play fantasy cricket entertainment platform. No real money involved - play for fun and bragging rights!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/matches" className="text-gray-400 hover:text-primary">Matches</Link></li>
                <li><Link href="/contests" className="text-gray-400 hover:text-primary">Contests</Link></li>
                <li><Link href="/how-to-play" className="text-gray-400 hover:text-primary">How to Play</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-primary">FAQ</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-gray-400 hover:text-primary">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="text-gray-400 hover:text-primary">Responsible Gaming</Link></li>
                <li><Link href="/fair-play" className="text-gray-400 hover:text-primary">Fair Play</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-primary">Contact Us</Link></li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                <p className="text-xs text-yellow-400">
                  <strong>18+ Only.</strong> Fantasy sports not available in Telangana, Andhra Pradesh, Assam, and Odisha.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Khelosmart. Operated by THIRUMOOLAR SAPTHAYOGA GRADING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
