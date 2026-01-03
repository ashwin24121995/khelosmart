import LayoutSSR from "@/components/LayoutSSR";
import { Link } from "wouter";

export default function RegisterSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Create Your Account</h1>
          <p className="text-gray-600 mb-8 text-center">
            Join Khelosmart and start playing fantasy cricket for free!
          </p>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">You must be 18 years or older to register</p>
              </div>
              <div>
                <label className="flex items-start">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1" />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the <Link href="/terms" className="text-green-600 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-sm text-green-700">
              <strong>100% Free to Play</strong> - No payment information required!
            </p>
          </div>
        </div>
      </div>
    </LayoutSSR>
  );
}
