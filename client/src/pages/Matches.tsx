import Layout from "@/components/Layout";
import MatchCard from "@/components/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { 
  Loader2,
  Calendar,
  Radio,
  CheckCircle,
  Search
} from "lucide-react";
import { useState, useMemo } from "react";

export default function Matches() {
  const { data: matchData, isLoading, error } = trpc.matches.getLiveScores.useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = useMemo(() => {
    if (!matchData) return { upcoming: [], live: [], completed: [] };
    
    const filterBySearch = (matches: typeof matchData.upcoming) => {
      if (!searchQuery.trim()) return matches;
      const query = searchQuery.toLowerCase();
      return matches.filter(match => 
        match.t1.toLowerCase().includes(query) ||
        match.t2.toLowerCase().includes(query) ||
        match.series.toLowerCase().includes(query)
      );
    };

    return {
      upcoming: filterBySearch(matchData.upcoming),
      live: filterBySearch(matchData.live),
      completed: filterBySearch(matchData.completed),
    };
  }, [matchData, searchQuery]);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cricket Matches</h1>
          <p className="text-muted-foreground">
            Browse all upcoming, live, and completed cricket matches
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search matches by team or series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive">Failed to load matches. Please try again later.</p>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming ({filteredMatches.upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="live" className="gap-2">
                <Radio className="h-4 w-4" />
                Live ({filteredMatches.live.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({filteredMatches.completed.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {filteredMatches.upcoming.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  {searchQuery ? "No matches found matching your search." : "No upcoming matches at the moment."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.upcoming.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="live">
              {filteredMatches.live.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  {searchQuery ? "No matches found matching your search." : "No live matches at the moment."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.live.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {filteredMatches.completed.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  {searchQuery ? "No matches found matching your search." : "No completed matches to show."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.completed.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
