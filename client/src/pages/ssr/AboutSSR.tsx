import LayoutSSR from "@/components/LayoutSSR";

export default function AboutSSR() {
  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">About Khelosmart</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Khelosmart is India's premier free-to-play fantasy cricket platform, designed for cricket enthusiasts who want to test their knowledge and skills without any financial risk.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We believe that fantasy sports should be accessible to everyone. Our mission is to provide a platform where cricket fans can enjoy the thrill of fantasy sports, compete with friends, and showcase their cricket knowledge - all completely free of charge.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>100% free-to-play fantasy cricket contests</li>
            <li>Real-time scoring and live leaderboards</li>
            <li>Comprehensive player statistics and analysis</li>
            <li>Multiple contest formats for every skill level</li>
            <li>Safe and secure platform with data protection</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Our Company</h2>
          <p className="text-gray-600 mb-6">
            Khelosmart is operated by THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED, committed to providing a fair, transparent, and entertaining fantasy sports experience for all cricket lovers.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Company Information</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Company Name:</strong> THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
              <p><strong>CIN:</strong> U80301TN2019OPC130468</p>
              <p><strong>Registered Address:</strong> NO 12-F/4C, ANNANAGER RAMANAN STREET, KALLAKURICHI, VILLUPURAM, Tamil Nadu - 606202, India</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Important Notice</h3>
            <p className="text-green-700">
              Khelosmart is a FREE-TO-PLAY platform for entertainment purposes only. No real money is involved in any contests. This is not gambling. Play responsibly and have fun!
            </p>
          </div>
        </div>
      </div>
    </LayoutSSR>
  );
}
