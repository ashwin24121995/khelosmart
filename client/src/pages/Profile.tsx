import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { 
  Loader2,
  Trophy,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Award,
  FileText,
  Settings,
  Mail,
  MapPin,
  Clock,
  Star,
  BarChart3,
  ChevronRight,
  User,
  Phone,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { AchievementBadges, AchievementBadgesMini } from "@/components/AchievementBadges";
import { PerformanceHistory } from "@/components/PerformanceHistory";
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

export default function Profile() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    state: "",
  });

  const { data: stats, isLoading: statsLoading } = trpc.user.getStats.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: templates, isLoading: templatesLoading } = trpc.templates.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: myTeams, isLoading: teamsLoading } = trpc.teams.myTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: canPlayData, refetch: refetchCanPlay } = trpc.user.canPlay.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const updateProfileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      refetchCanPlay();
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

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: "",
        dateOfBirth: "",
        state: "",
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <Layout>
      <div className="container py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
          <CardContent className="relative pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
              {/* Avatar */}
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name || undefined} />
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{user?.name || "Player"}</h1>
                  <AchievementBadgesMini />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {user?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </span>
                  )}
                  {user?.state && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.state}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Joined {user?.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : "Recently"}
                  </span>
                </div>
                {/* Verification Status Badge */}
                <div className="pt-2">
                  {canPlayData?.canPlay ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Player
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-amber-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Profile Incomplete
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">{stats?.totalContests || 0}</p>
              <p className="text-xs text-muted-foreground">Contests Played</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{stats?.totalWins || 0}</p>
              <p className="text-xs text-muted-foreground">Top Finishes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{stats?.totalPoints || 0}</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{myTeams?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Teams Created</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex-wrap h-auto gap-2">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="h-4 w-4" />
              Team Templates
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {teamsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : myTeams && myTeams.length > 0 ? (
                    <div className="space-y-3">
                      {myTeams.slice(0, 5).map((team) => (
                        <div key={team.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{team.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(team.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                          <Badge variant={team.status === "submitted" ? "default" : "secondary"}>
                            {team.totalPoints || 0} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No recent activity</p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span className="font-bold">
                      {stats?.totalContests 
                        ? ((stats.totalWins / stats.totalContests) * 100).toFixed(1) 
                        : 0}%
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Points/Contest</span>
                    <span className="font-bold">
                      {stats?.totalContests 
                        ? (stats.totalPoints / stats.totalContests).toFixed(1) 
                        : 0}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Team Templates</span>
                    <span className="font-bold">{templates?.length || 0}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Best Finish</span>
                    <span className="font-bold text-yellow-500">
                      {(stats?.totalWins ?? 0) > 0 ? "#1" : "-"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* View All Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 justify-between" onClick={() => setActiveTab("achievements")}>
                <span className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  View All Achievements
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-between" onClick={() => setActiveTab("performance")}>
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  View Performance History
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-between" onClick={() => setActiveTab("templates")}>
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  View Team Templates
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <AchievementBadges />
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <PerformanceHistory />
          </TabsContent>

          {/* Team Templates Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Saved Team Templates
                </CardTitle>
                <CardDescription>
                  Reuse your favorite team compositions for similar matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : templates && templates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {template.matchType || "General"}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {(template.players as any[])?.length || 0} players
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Created {format(new Date(template.createdAt), "MMM d, yyyy")}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No team templates saved yet</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Save your team compositions while creating teams to reuse them later
                    </p>
                    <Button asChild>
                      <Link href="/matches">Create a Team</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {canPlayData?.canPlay ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>You are verified and can play fantasy cricket!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-600">
                        <AlertCircle className="h-5 w-5" />
                        <span>{canPlayData?.reason || "Please complete your profile to play"}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="lg:row-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email (read-only) */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input value={user?.email || ""} disabled />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                      />
                      <p className="text-xs text-muted-foreground">You must be 18 years or older to play</p>
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        State
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
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
                      {isRestrictedState && (
                        <p className="text-xs text-destructive">
                          Fantasy sports is not available in {formData.state}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
