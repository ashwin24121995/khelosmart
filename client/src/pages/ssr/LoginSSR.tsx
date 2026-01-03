import LayoutSSR from "@/components/LayoutSSR";
import { Link } from "wouter";

export default function LoginSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Welcome Back</h1>
          <p className="text-gray-600 mb-8 text-center">
            Login to your Khelosmart account to access your fantasy teams and contests.
          </p>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <form className="space-y-4">
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
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                  Forgot password?
                </Link>
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutSSR>
  );
}
