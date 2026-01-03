import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle, MessageCircle, Shield, AlertTriangle } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is Khelosmart?",
        a: "Khelosmart is a free-to-play fantasy cricket platform operated by THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED. It allows cricket fans to create virtual teams of real cricket players and earn points based on their actual performance in live matches. Our platform is designed purely for entertainment and skill development, with no real money involved."
      },
      {
        q: "Is Khelosmart completely free to use?",
        a: "Yes, Khelosmart is 100% free to play. There are absolutely no entry fees, no deposits, no hidden charges, and no real money transactions of any kind. You can create unlimited teams, join unlimited contests, and enjoy all features without spending a single rupee. We are a free-to-play platform focused on entertainment and skill-based gaming."
      },
      {
        q: "How do I create an account on Khelosmart?",
        a: "Creating an account is simple: Click on the 'Sign Up' button on our homepage, enter your email address and create a password, verify your email through the link sent to you, complete your profile by providing your name, date of birth (must be 18+), and state of residence. Once verified, you can start playing immediately!"
      },
      {
        q: "What are the eligibility requirements to play?",
        a: "To play on Khelosmart, you must: Be at least 18 years of age, not be a resident of Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, or Nagaland (where fantasy sports is restricted), have a valid email address for account verification, and agree to our Terms & Conditions and Privacy Policy."
      },
      {
        q: "Why is fantasy sports restricted in some states?",
        a: "Fantasy sports regulations vary by state in India. Some states like Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, and Nagaland have specific laws that restrict or prohibit fantasy sports platforms. We comply with all applicable laws and do not offer our services in these states to ensure legal compliance."
      },
      {
        q: "Is fantasy cricket legal in India?",
        a: "Yes, fantasy cricket is legal in most parts of India. The Supreme Court of India, in the landmark case of K.R. Lakshmanan vs. State of Tamil Nadu (1996), recognized games involving substantial skill as legal. Fantasy sports requires analysis, research, and strategic decision-making, making it a game of skill rather than chance. However, some states have their own regulations, which is why we don't operate in certain states."
      }
    ]
  },
  {
    category: "Creating Teams",
    questions: [
      {
        q: "How do I create a fantasy cricket team?",
        a: "To create a team: Go to the 'Matches' section and select an upcoming match, click 'Create Team' to enter the team creation page, select 11 players from both teams within your 100 credit budget, ensure you follow the team composition rules (1-4 WK, 3-6 BAT, 1-4 AR, 3-6 BOWL), choose your Captain (2x points) and Vice-Captain (1.5x points), and submit your team before the match deadline."
      },
      {
        q: "What are the team composition rules?",
        a: "Your fantasy team must consist of exactly 11 players with the following composition: Wicket-keepers (WK): Minimum 1, Maximum 4; Batsmen (BAT): Minimum 3, Maximum 6; All-rounders (AR): Minimum 1, Maximum 4; Bowlers (BOWL): Minimum 3, Maximum 6. Additionally, you can select a maximum of 7 players from any single team."
      },
      {
        q: "What is the credit system?",
        a: "Each player is assigned a credit value based on their skill level, recent form, and popularity. You have a total budget of 100 credits to build your team of 11 players. Higher-rated players cost more credits, so you need to balance star players with value picks to create a competitive team within the budget."
      },
      {
        q: "What is the role of Captain and Vice-Captain?",
        a: "The Captain and Vice-Captain are your most important selections: Captain (C) earns 2x (double) points for all their actions during the match; Vice-Captain (VC) earns 1.5x (one and a half times) points for all their actions. Choose players who are in good form and likely to perform well. All-rounders are often good choices as they can earn points from both batting and bowling."
      },
      {
        q: "Can I edit my team after creating it?",
        a: "Yes, you can edit your team any number of times until the match deadline (usually when the match starts or the toss happens). After the deadline, no changes can be made. We recommend finalizing your team after the playing XI is announced for best results."
      },
      {
        q: "Can I create multiple teams for the same match?",
        a: "Yes, you can create multiple teams for the same match. This allows you to try different strategies and combinations. Each team can have a different Captain and Vice-Captain selection, giving you more chances to maximize your points."
      }
    ]
  },
  {
    category: "Points System",
    questions: [
      {
        q: "How are fantasy points calculated?",
        a: "Points are calculated based on real match performances. Batting points include runs scored (+1 per run), boundaries (+1 bonus for 4s, +2 for 6s), and milestone bonuses (half-century +8, century +16). Bowling points include wickets (+25 per wicket), maiden overs (+12), and haul bonuses. Fielding points include catches (+8), stumpings (+12), and run outs (+6 to +12). Additional bonuses/penalties apply for economy rate and strike rate."
      },
      {
        q: "When are points updated during a match?",
        a: "Points are updated in real-time as the match progresses. Every run, wicket, catch, and other action is reflected in your fantasy score within seconds of it happening on the field. You can track your team's performance and leaderboard position throughout the match."
      },
      {
        q: "What happens if a player in my team doesn't play?",
        a: "If a player in your team is not part of the playing XI and doesn't take the field, they will score 0 points. This is why we recommend waiting for the official playing XI announcement before finalizing your team, if possible."
      },
      {
        q: "Are there negative points in fantasy cricket?",
        a: "Yes, there are some scenarios where players can lose points: Batsmen (not WK/AR/BOWL) get -2 points for a duck (getting out on 0); Poor economy rate in bowling can result in -2 to -4 points; Poor strike rate in batting (below 60) can result in -2 to -4 points. These negative points encourage balanced team selection."
      }
    ]
  },
  {
    category: "Contests & Leaderboards",
    questions: [
      {
        q: "How do I join a contest?",
        a: "To join a contest: Select a match from the 'Matches' section, view available contests for that match, click 'Join Contest' on the contest you want to enter, select or create a team for the contest, and confirm your entry. Since Khelosmart is free to play, there are no entry fees for any contest."
      },
      {
        q: "What types of contests are available?",
        a: "We offer various contest types: Public Contests - Open to all users, compete with the entire Khelosmart community; Private Contests - Create your own contest and invite friends using a unique code; Head-to-Head - Compete directly against another player. All contests are free to join with no entry fees."
      },
      {
        q: "How is the leaderboard ranking determined?",
        a: "The leaderboard is ranked based on total fantasy points scored by each team. The user with the highest points at the end of the match tops the leaderboard. In case of a tie, the rank is shared. Remember, this is purely for entertainment and bragging rights - there are no real money prizes."
      },
      {
        q: "Can I see other players' teams?",
        a: "Before the match deadline, all teams are hidden to ensure fair play. Once the match starts and the deadline passes, you can view other players' teams in the contest, including their Captain and Vice-Captain selections."
      }
    ]
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I update my profile information?",
        a: "To update your profile: Log in to your account, go to your Dashboard, click on 'Profile' or the settings icon, update your information (name, phone number, etc.), and save your changes. Note that some information like email and date of birth may require verification to change."
      },
      {
        q: "Is my personal information secure on Khelosmart?",
        a: "Yes, we take data security very seriously. We use industry-standard SSL encryption for all data transmission, store data securely with access controls, never share your personal information with third parties without consent, and comply with applicable data protection regulations. Read our Privacy Policy for complete details."
      },
      {
        q: "Can I have multiple accounts?",
        a: "No, each user is allowed only one account on Khelosmart. Creating multiple accounts is a violation of our Fair Play policy and Terms & Conditions. If we detect multiple accounts, all associated accounts may be permanently suspended."
      },
      {
        q: "How do I reset my password?",
        a: "If you've forgotten your password: Click on 'Login' and then 'Forgot Password', enter your registered email address, check your email for the password reset link, click the link and create a new password. If you don't receive the email, check your spam folder or contact support."
      },
      {
        q: "How do I delete my account?",
        a: "To delete your account, please contact our support team through the Contact Us page. Provide your registered email address and reason for deletion. Our team will process your request within 7 business days. Note that account deletion is permanent and all your data will be removed."
      }
    ]
  },
  {
    category: "Legal & Compliance",
    questions: [
      {
        q: "Is Khelosmart a gambling platform?",
        a: "No, Khelosmart is NOT a gambling platform. We are a free-to-play fantasy sports platform with no real money involved. There are no entry fees, no deposits, no withdrawals, and no real money prizes. Fantasy sports is recognized as a game of skill by the Supreme Court of India, which is fundamentally different from gambling that relies on chance."
      },
      {
        q: "Who operates Khelosmart?",
        a: "Khelosmart is operated by THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED, a company registered with the Ministry of Corporate Affairs, Government of India. CIN: U80301TN2019OPC130468. Registered Address: NO 12-F/4C, ANNANAGER RAMANAN STREET, KALLAKURICHI, VILLUPURAM, Tamil Nadu - 606202, India."
      },
      {
        q: "What jurisdiction governs Khelosmart?",
        a: "Khelosmart is governed by the laws of India, with exclusive jurisdiction in the courts of Villupuram, Tamil Nadu. By using our platform, you agree to submit to this jurisdiction for any disputes arising from your use of our services."
      },
      {
        q: "How does Khelosmart ensure fair play?",
        a: "We have strict fair play policies including: One account per user policy, automated systems to detect suspicious activity, prohibition of collusion and cheating, regular audits of contest results, and transparent points calculation system. Any violation of fair play policies results in immediate account suspension."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        q: "The website is not loading properly. What should I do?",
        a: "Try these troubleshooting steps: Refresh the page (Ctrl+F5 for hard refresh), clear your browser cache and cookies, try using a different browser (Chrome, Firefox, Safari), check your internet connection, disable any ad blockers or VPNs. If the issue persists, contact our support team with details about the problem."
      },
      {
        q: "My team wasn't saved. What happened?",
        a: "If your team wasn't saved: Ensure you clicked the 'Create Team' or 'Save Team' button, check for any error messages on the screen, verify you have a stable internet connection, make sure you submitted before the match deadline. If you saw a success message but the team isn't showing, contact support immediately."
      },
      {
        q: "Points are not updating during a live match. Is there a problem?",
        a: "Points are updated in real-time but may occasionally have a slight delay (1-2 minutes) due to data feed processing. If points haven't updated for more than 5 minutes during a live match, try refreshing the page. If the issue persists, contact our support team."
      },
      {
        q: "How do I contact customer support?",
        a: "You can reach our support team through: Email: support@khelosmart.com, Contact form on our Contact Us page, Response time: Within 24-48 hours on business days. Please provide your registered email, detailed description of the issue, and any relevant screenshots for faster resolution."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find comprehensive answers to all your questions about Khelosmart fantasy cricket platform. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">100% Free</div>
                <p className="text-sm text-green-700 dark:text-green-300">No entry fees or charges</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">18+ Only</div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Age verification required</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">Game of Skill</div>
                <p className="text-sm text-purple-700 dark:text-purple-300">Legally recognized in India</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-10">
            {faqs.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  {section.category}
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {section.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`} className="border-b last:border-b-0">
                          <AccordionTrigger className="text-left px-6 hover:no-underline">
                            <span className="font-medium">{faq.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Restricted States Notice */}
          <Card className="mt-12 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">State Restrictions</h3>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    Khelosmart services are not available to residents of Telangana, Andhra Pradesh, Assam, Odisha, Sikkim, and Nagaland 
                    due to state-specific regulations on fantasy sports. If you are a resident of these states, please do not 
                    create an account or use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support Card */}
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Can't find the answer you're looking for? Our dedicated support team is here to help you 
                with any questions or concerns about Khelosmart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/how-to-play">Learn How to Play</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Operated by:</strong> THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED
            </p>
            <p>
              CIN: U80301TN2019OPC130468 | Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
