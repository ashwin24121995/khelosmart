/**
 * Cricket Data API Integration Layer
 * Provides real-time cricket data from cricketdata.org
 */

const CRICKET_API_KEY = process.env.CRICKET_API_KEY || "";
const CRICKET_API_BASE_URL = "https://api.cricapi.com/v1";

interface ApiResponse<T> {
  apikey: string;
  status: string;
  data: T;
  info?: {
    totalRows: number;
    hitsToday: number;
    hitsLimit: number;
  };
}

// Match types from eCricScore API
export interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string;
  status: string;
  ms: "fixture" | "live" | "result"; // Match state
  t1: string; // Team 1 name
  t2: string; // Team 2 name
  t1s: string; // Team 1 score
  t2s: string; // Team 2 score
  t1img: string; // Team 1 logo
  t2img: string; // Team 2 logo
  series: string;
}

// Match info types
export interface MatchInfo {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: Array<{
    name: string;
    shortname: string;
    img: string;
  }>;
  score: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
  tossWinner?: string;
  tossChoice?: string;
  matchWinner?: string;
  series_id: string;
  fantasyEnabled?: boolean;
}

// Squad types
export interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  playerImg?: string;
}

export interface TeamSquad {
  teamName: string;
  shortname: string;
  img: string;
  players: Player[];
}

// Scorecard types
export interface BattingEntry {
  batsman: { id: string; name: string };
  dismissal: string;
  bowler?: { id: string; name: string };
  catcher?: { id: string; name: string };
  "dismissal-text": string;
  r: number;
  b: number;
  "4s": number;
  "6s": number;
  sr: number;
}

export interface BowlingEntry {
  bowler: { id: string; name: string };
  o: number;
  m: number;
  r: number;
  w: number;
  nb: number;
  wd: number;
  eco: number;
}

export interface ScorecardInning {
  inning: string;
  batting: BattingEntry[];
  bowling: BowlingEntry[];
  catching?: Array<{ catcher: { id: string; name: string }; catches: number }>;
  extras?: { r: number; b: number };
  totals?: { r: number; w: number; o: number };
}

export interface MatchScorecard {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score: Array<{ r: number; w: number; o: number; inning: string }>;
  tossWinner?: string;
  tossChoice?: string;
  matchWinner?: string;
  series_id: string;
  scorecard: ScorecardInning[];
}

// Fantasy points types
export interface PlayerPointsEntry {
  id: string;
  name: string;
  altnames?: string[];
  points: number;
}

export interface InningPoints {
  inning: string;
  batting: PlayerPointsEntry[];
  bowling: PlayerPointsEntry[];
  catching?: PlayerPointsEntry[];
}

export interface MatchPoints {
  innings: InningPoints[];
  totals?: Array<{
    id: string;
    name: string;
    points: number;
  }>;
}

// Player info types
export interface PlayerInfo {
  id: string;
  name: string;
  country: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  playerImg?: string;
  stats?: {
    batting?: Record<string, unknown>;
    bowling?: Record<string, unknown>;
  };
}

/**
 * Generic API fetch function with error handling
 */
async function fetchCricketApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!CRICKET_API_KEY) {
    console.error("[CricketAPI] API key not configured");
    return null;
  }

  const url = new URL(`${CRICKET_API_BASE_URL}/${endpoint}`);
  url.searchParams.append("apikey", CRICKET_API_KEY);
  
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  try {
    const response = await fetch(url.toString());
    const data: ApiResponse<T> = await response.json();

    if (data.status !== "success") {
      console.error(`[CricketAPI] API error for ${endpoint}:`, data);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(`[CricketAPI] Fetch error for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Get current/upcoming matches with live scores
 * Uses eCricScore API - most efficient for match listing
 */
export async function getLiveScores(): Promise<CricScoreMatch[]> {
  const data = await fetchCricketApi<CricScoreMatch[]>("cricScore");
  return data || [];
}

/**
 * Get detailed match information
 */
export async function getMatchInfo(matchId: string): Promise<MatchInfo | null> {
  return fetchCricketApi<MatchInfo>("match_info", { id: matchId });
}

/**
 * Get fantasy squad for a match
 * Returns player list for both teams
 */
export async function getFantasySquad(matchId: string): Promise<TeamSquad[]> {
  const data = await fetchCricketApi<TeamSquad[]>("match_squad", { id: matchId });
  return data || [];
}

/**
 * Get detailed scorecard for a match
 */
export async function getMatchScorecard(matchId: string): Promise<MatchScorecard | null> {
  return fetchCricketApi<MatchScorecard>("match_scorecard", { id: matchId });
}

/**
 * Get fantasy points for a match
 * @param ruleset - Custom ruleset ID (0 for default)
 */
export async function getFantasyPoints(matchId: string, ruleset: number = 0): Promise<MatchPoints | null> {
  return fetchCricketApi<MatchPoints>("match_points", { 
    id: matchId, 
    ruleset: ruleset.toString() 
  });
}

/**
 * Get player information
 */
export async function getPlayerInfo(playerId: string): Promise<PlayerInfo | null> {
  return fetchCricketApi<PlayerInfo>("players_info", { id: playerId });
}

/**
 * Get matches list with more details
 */
export async function getMatchesList(offset: number = 0): Promise<MatchInfo[]> {
  const data = await fetchCricketApi<MatchInfo[]>("matches", { offset: offset.toString() });
  return data || [];
}

/**
 * Get current matches (alternative to cricScore with more details)
 */
export async function getCurrentMatches(offset: number = 0): Promise<MatchInfo[]> {
  const data = await fetchCricketApi<MatchInfo[]>("currentMatches", { offset: offset.toString() });
  return data || [];
}

/**
 * Categorize matches by state
 */
export function categorizeMatches(matches: CricScoreMatch[]) {
  return {
    upcoming: matches.filter(m => m.ms === "fixture"),
    live: matches.filter(m => m.ms === "live"),
    completed: matches.filter(m => m.ms === "result"),
  };
}

/**
 * Map player role to fantasy category
 */
export function mapPlayerRole(role: string): "batsman" | "bowler" | "allrounder" | "wicketkeeper" {
  const roleLower = role.toLowerCase();
  
  if (roleLower.includes("wk") || roleLower.includes("wicket")) {
    return "wicketkeeper";
  }
  if (roleLower.includes("allrounder") || roleLower.includes("all-rounder")) {
    return "allrounder";
  }
  if (roleLower.includes("bowl")) {
    return "bowler";
  }
  return "batsman";
}

/**
 * Calculate total fantasy points for a player across innings
 */
export function calculateTotalPlayerPoints(
  matchPoints: MatchPoints,
  playerId: string,
  isCaptain: boolean = false,
  isViceCaptain: boolean = false
): number {
  let totalPoints = 0;

  // Sum points from all innings
  for (const inning of matchPoints.innings) {
    // Batting points
    const battingEntry = inning.batting.find(p => p.id === playerId);
    if (battingEntry) {
      totalPoints += battingEntry.points;
    }

    // Bowling points
    const bowlingEntry = inning.bowling.find(p => p.id === playerId);
    if (bowlingEntry) {
      totalPoints += bowlingEntry.points;
    }

    // Catching points (if available)
    if (inning.catching) {
      const catchingEntry = inning.catching.find(p => p.id === playerId);
      if (catchingEntry) {
        totalPoints += catchingEntry.points;
      }
    }
  }

  // Apply captain/vice-captain multipliers
  if (isCaptain) {
    totalPoints *= 2;
  } else if (isViceCaptain) {
    totalPoints *= 1.5;
  }

  return totalPoints;
}


// Ball-by-ball commentary types
export interface BallCommentary {
  over: number;
  ball: number;
  score: string;
  commentary: string;
  batsman?: string;
  bowler?: string;
  runs?: number;
  isWicket?: boolean;
  isBoundary?: boolean;
  isSix?: boolean;
}

export interface MatchCommentary {
  id: string;
  name: string;
  status: string;
  commentary: BallCommentary[];
}

/**
 * Get ball-by-ball commentary for a match
 * Note: This uses the match_bbb endpoint from cricapi
 */
export async function getMatchCommentary(matchId: string): Promise<MatchCommentary | null> {
  const data = await fetchCricketApi<MatchCommentary>("match_bbb", { id: matchId });
  return data;
}
