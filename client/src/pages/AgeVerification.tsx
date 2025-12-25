import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { 
  Loader2,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const RESTRICTED_STATES = ["Telangana", "Andhra Pradesh", "Assam", "Odisha"];

export default function AgeVerification() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    state: "",
  });

  const { data: canPlayData, refetch: refetchCanPlay } = trpc.user.canPlay.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const updateProfileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Verification complete!");
      refetchCanPlay();
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  // Redirect if already verified
  useEffect(() => {
    if (canPlayData?.canPlay) {
      setLocation("/dashboard");
    }
  }, [canPlayData, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dateOfBirth) {
      toast.error("Please enter your date of birth");
      return;
    }

    if (!formData.state) {
      toast.error("Please select your state");
      return;
    }

    // Check age
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      toast.error("You must be 18 years or older to play fantasy cricket");
      return;
    }

    // Check restricted states
    if (RESTRICTED_STATES.includes(formData.state)) {
      toast.error(`Fantasy sports is not available in ${formData.state}`);
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  const isRestrictedState = RESTRICTED_STATES.includes(formData.state);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Age & Location Verification</CardTitle>
              <p className="text-muted-foreground mt-2">
                Please verify your eligibility to play fantasy cricket
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    You must be 18 years or older to play
                  </p>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label>State of Residence</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                          {RESTRICTED_STATES.includes(state) && " (Restricted)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Restricted State Warning */}
                {isRestrictedState && (
                  <div className="p-4 bg-destructive/10 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Restricted Region</p>
                      <p className="text-sm text-muted-foreground">
                        Fantasy sports is not available in {formData.state} due to state regulations.
                      </p>
                    </div>
                  </div>
                )}

                {/* Legal Notice */}
                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-primary" />
                    <span>
                      By proceeding, I confirm that I am 18 years or older and not a resident of 
                      Telangana, Andhra Pradesh, Assam, or Odisha.
                    </span>
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={updateProfileMutation.isPending || isRestrictedState}
                >
                  {updateProfileMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Verify & Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
