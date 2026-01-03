import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  MessageSquare,
  Clock,
  MapPin,
  Send,
  Loader2,
  Phone,
  HelpCircle,
  Shield,
  AlertTriangle,
  FileText,
  Users,
  Building2,
  Globe,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We'll get back to you within 24-48 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions, feedback, or need assistance? Our dedicated support team is here to help you. 
              We're committed to providing prompt and helpful responses to all inquiries.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">General Inquiries</h3>
                <p className="text-sm text-muted-foreground mb-2">For general questions</p>
                <p className="text-sm font-medium text-primary">support@khelosmart.com</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-1">Technical Support</h3>
                <p className="text-sm text-muted-foreground mb-2">For technical issues</p>
                <p className="text-sm font-medium text-primary">tech@khelosmart.com</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-1">Fair Play Reports</h3>
                <p className="text-sm text-muted-foreground mb-2">Report violations</p>
                <p className="text-sm font-medium text-primary">fairplay@khelosmart.com</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1">Business Inquiries</h3>
                <p className="text-sm text-muted-foreground mb-2">For partnerships</p>
                <p className="text-sm font-medium text-primary">business@khelosmart.com</p>
              </CardContent>
            </Card>
          </div>

          {/* Support Hours & Response Times */}
          <Card className="mb-12 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Support Hours & Response Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Support Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday - Saturday</p>
                  <p className="text-lg font-bold text-primary">9:00 AM - 6:00 PM IST</p>
                  <p className="text-xs text-muted-foreground mt-1">Closed on Sundays & Public Holidays</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Response</h3>
                  <p className="text-sm text-muted-foreground">Standard queries</p>
                  <p className="text-lg font-bold text-primary">24-48 Hours</p>
                  <p className="text-xs text-muted-foreground mt-1">During business days</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Urgent Issues</h3>
                  <p className="text-sm text-muted-foreground">Account security, etc.</p>
                  <p className="text-lg font-bold text-amber-500">Within 12 Hours</p>
                  <p className="text-xs text-muted-foreground mt-1">Priority handling</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="bug">Report a Bug</SelectItem>
                        <SelectItem value="fairplay">Fair Play Concern</SelectItem>
                        <SelectItem value="privacy">Privacy & Data Request</SelectItem>
                        <SelectItem value="business">Business Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your inquiry in detail. Include any relevant information such as your username, match details, or screenshots if applicable."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Quick Help & Company Info */}
            <div className="space-y-6">
              {/* Quick Help Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Quick Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Before contacting us, you might find your answer in these resources:
                  </p>
                  <div className="space-y-3">
                    <Link href="/faq" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">FAQ</p>
                        <p className="text-xs text-muted-foreground">Answers to common questions</p>
                      </div>
                    </Link>
                    <Link href="/how-to-play" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">How to Play</p>
                        <p className="text-xs text-muted-foreground">Learn fantasy cricket basics</p>
                      </div>
                    </Link>
                    <Link href="/fair-play" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Fair Play Policy</p>
                        <p className="text-xs text-muted-foreground">Rules and guidelines</p>
                      </div>
                    </Link>
                    <Link href="/responsible-gaming" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Responsible Gaming</p>
                        <p className="text-xs text-muted-foreground">Gaming responsibly</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Office Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Registered Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold mb-2">THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</p>
                      <p className="text-sm text-muted-foreground">
                        NO 12-F/4C, ANNANAGER RAMANAN STREET,<br />
                        KALLAKURICHI, VILLUPURAM,<br />
                        Tamil Nadu - 606202, India
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-muted-foreground">CIN</p>
                        <p className="font-mono text-xs">U80301TN2019OPC130468</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">Website</p>
                        <p>www.khelosmart.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What to Include */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Tips for Faster Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                To help us assist you better and faster, please include the following information in your message:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Account Information</p>
                    <p className="text-xs text-muted-foreground">Your registered email address or username</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Detailed Description</p>
                    <p className="text-xs text-muted-foreground">Clear explanation of your issue or question</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Match/Contest Details</p>
                    <p className="text-xs text-muted-foreground">If related to a specific match or contest</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Screenshots</p>
                    <p className="text-xs text-muted-foreground">Visual evidence of any errors or issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Device & Browser</p>
                    <p className="text-xs text-muted-foreground">For technical issues, mention your device and browser</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Date & Time</p>
                    <p className="text-xs text-muted-foreground">When the issue occurred</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grievance Officer */}
          <Card className="mb-12 border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
              <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-5 w-5" />
                Grievance Redressal
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                In accordance with the Information Technology Act, 2000 and rules made thereunder, 
                the name and contact details of the Grievance Officer are provided below:
              </p>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold mb-2">Grievance Officer</p>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Name:</strong> Grievance Officer, Khelosmart
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Email:</strong> grievance@khelosmart.com
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time:</strong> Within 30 days of receipt of complaint
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                The Grievance Officer shall acknowledge receipt of any complaint within 24 hours and 
                resolve the complaint within 30 days from the date of receipt of the complaint.
              </p>
            </CardContent>
          </Card>

          {/* Company Info Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>THIRUMOOLAR SAPTHAYOGA GRADING (OPC) PRIVATE LIMITED</strong>
            </p>
            <p>
              CIN: U80301TN2019OPC130468 | Villupuram, Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
