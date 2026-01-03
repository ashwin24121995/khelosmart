import LayoutSSR from "@/components/LayoutSSR";

export default function FAQSSR() {
  const faqs = [
    {
      question: "Is Khelosmart free to play?",
      answer: "Yes! Khelosmart is 100% free to play. There are no entry fees, no hidden charges, and no real money involved. It's purely for entertainment and bragging rights."
    },
    {
      question: "How do I create a fantasy team?",
      answer: "Select a match, then pick 11 players from both teams within the budget. Choose your Captain (2x points) and Vice-Captain (1.5x points), then join a contest."
    },
    {
      question: "When can I create my team?",
      answer: "You can create your team after the toss is completed and before the match starts. Teams are locked once the first ball is bowled."
    },
    {
      question: "How are points calculated?",
      answer: "Points are awarded based on player performance - runs, wickets, catches, etc. Your Captain earns 2x points and Vice-Captain earns 1.5x points."
    },
    {
      question: "Can I edit my team after creating it?",
      answer: "Yes, you can edit your team until the match starts (first ball is bowled). After that, teams are locked."
    },
    {
      question: "Is this gambling?",
      answer: "No! Khelosmart is NOT gambling. It's a free-to-play fantasy sports platform for entertainment only. No real money is involved."
    },
    {
      question: "What is the leaderboard for?",
      answer: "The leaderboard shows rankings based on fantasy points. It's for entertainment and bragging rights only - there are no monetary prizes."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach us through our Contact page or email us at support@khelosmart.com. We're here to help!"
    }
  ];

  return (
    <LayoutSSR>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Still have questions?</h3>
          <p className="text-green-700">
            Contact our support team at support@khelosmart.com and we'll be happy to help!
          </p>
        </div>
      </div>
    </LayoutSSR>
  );
}
