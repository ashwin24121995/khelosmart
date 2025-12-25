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
import { HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is Khelosmart?",
        a: "Khelosmart is a free-to-play fantasy cricket platform where you can create your dream cricket team, join contests, and compete with other cricket fans based on real match performances."
      },
      {
        q: "Is Khelosmart free to use?",
        a: "Yes! Khelosmart is 100% free to play. There are no entry fees, no hidden charges, and no real money transactions involved."
      },
      {
        q: "How do I create an account?",
        a: "Click on the 'Login' button and sign up using your email. You'll need to verify your age (18+) and provide your state of residence to complete registration."
      },
      {
        q: "What are the eligibility requirements?",
        a: "You must be 18 years or older and not a resident of Telangana, Andhra Pradesh, Assam, or Odisha to play on Khelosmart."
      }
    ]
  },
  {
    category: "Creating Teams",
    questions: [
      {
        q: "How do I create a fantasy team?",
        a: "Select a match, choose 11 players from both teams (following the composition rules), select your Captain and Vice-Captain, and submit your team before the match starts."
      },
      {
        q: "What is the team composition rule?",
        a: "Your team must have: 1-4 Wicket-keepers, 3-6 Batsmen, 1-4 All-rounders, and 3-6 Bowlers. Maximum 7 players can be from one team."
      },
      {
        q: "What is the role of Captain and Vice-Captain?",
        a: "Captain earns 2x points and Vice-Captain earns 1.5x points for all their actions during the match. Choose wisely!"
      },
      {
        q: "Can I edit my team after creating it?",
        a: "You can edit your team until the match starts. Once the match begins, no changes can be made."
      }
    ]
  },
  {
    category: "Contests & Points",
    questions: [
      {
        q: "How do I join a contest?",
        a: "Go to a match page, view available contests, and click 'Join Contest'. You'll need to create a team if you haven't already."
      },
      {
        q: "How are fantasy points calculated?",
        a: "Points are calculated based on real match performances - runs scored, wickets taken, catches, etc. Visit our 'How to Play' page for the detailed points system."
      },
      {
        q: "When are points updated?",
        a: "Points are updated in real-time as the match progresses. You can track your team's performance on the live leaderboard."
      },
      {
        q: "How is the leaderboard ranking determined?",
        a: "The user with the highest total fantasy points at the end of the match tops the leaderboard. This is purely for entertainment and bragging rights - no real money or prizes are involved."
      }
    ]
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I update my profile?",
        a: "Go to your Dashboard and click on 'Profile' to update your personal information including name, phone number, and state."
      },
      {
        q: "Is my personal information secure?",
        a: "Yes, we use industry-standard security measures to protect your data. Read our Privacy Policy for more details."
      },
      {
        q: "Can I have multiple accounts?",
        a: "No, each user is allowed only one account. Multiple accounts are against our Fair Play policy and may result in permanent ban."
      },
      {
        q: "How do I delete my account?",
        a: "Contact our support team through the Contact Us page to request account deletion."
      }
    ]
  },
  {
    category: "Technical Issues",
    questions: [
      {
        q: "The app is not loading properly. What should I do?",
        a: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, contact our support team."
      },
      {
        q: "My team wasn't saved. What happened?",
        a: "Ensure you have a stable internet connection and click the 'Create Team' button to confirm. If you see a success message, your team is saved."
      },
      {
        q: "Points are not updating. Is there a problem?",
        a: "Points are updated in real-time but may have a slight delay. If points haven't updated for more than 5 minutes during a live match, please contact support."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Khelosmart
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <Card className="mt-12">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
