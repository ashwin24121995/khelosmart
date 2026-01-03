import LayoutSSR from "@/components/LayoutSSR";

export default function ContactSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or feedback? We'd love to hear from you! Reach out to us through any of the channels below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@khelosmart.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">THIRUMOOLAR SAPTHAYOGA GRADING<br />India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">Response Time</h3>
              <p className="text-green-700">We typically respond to all inquiries within 24-48 hours.</p>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Send us a Message</h2>
            <p className="text-gray-600 mb-4">
              Please log in to your account to send us a message, or email us directly at support@khelosmart.com
            </p>
            <a href="/login" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Login to Contact
            </a>
          </div>
        </div>
      </div>
    </LayoutSSR>
  );
}
