import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the cricket API module
vi.mock("./cricketApi", () => ({
  getLiveScores: vi.fn().mockResolvedValue([
    {
      id: "test-match-1",
      dateTimeGMT: new Date().toISOString(),
      matchType: "T20",
      status: "Match live",
      ms: "live",
      t1: "India",
      t2: "Australia",
      t1s: "150/3",
      t2s: "",
      t1img: "https://example.com/india.png",
      t2img: "https://example.com/australia.png",
      series: "Test Series 2024",
    },
  ]),
  getMatchInfo: vi.fn().mockResolvedValue({
    id: "test-match-1",
    name: "India vs Australia, 1st T20I",
    matchType: "T20",
    status: "Match live",
    venue: "Mumbai",
    date: "2024-12-26",
    dateTimeGMT: new Date().toISOString(),
    teams: ["India", "Australia"],
    teamInfo: [
      { name: "India", shortname: "IND", img: "https://example.com/india.png" },
      { name: "Australia", shortname: "AUS", img: "https://example.com/australia.png" },
    ],
    score: [{ r: 150, w: 3, o: 15, inning: "India Inning 1" }],
    series_id: "test-series-1",
  }),
  getFantasySquad: vi.fn().mockResolvedValue([
    {
      teamName: "India",
      shortname: "IND",
      img: "https://example.com/india.png",
      players: [
        { id: "player-1", name: "Virat Kohli", role: "Batsman" },
        { id: "player-2", name: "Rohit Sharma", role: "Batsman" },
        { id: "player-3", name: "Jasprit Bumrah", role: "Bowler" },
      ],
    },
  ]),
  getMatchScorecard: vi.fn().mockResolvedValue({
    id: "test-match-1",
    name: "India vs Australia",
    matchType: "T20",
    status: "Match live",
    venue: "Mumbai",
    date: "2024-12-26",
    dateTimeGMT: new Date().toISOString(),
    teams: ["India", "Australia"],
    score: [{ r: 150, w: 3, o: 15, inning: "India Inning 1" }],
    scorecard: [
      {
        inning: "India Inning 1",
        batting: [
          {
            batsman: { id: "player-1", name: "Virat Kohli" },
            dismissal: "not out",
            "dismissal-text": "not out",
            r: 75,
            b: 50,
            "4s": 8,
            "6s": 2,
            sr: 150,
          },
        ],
        bowling: [
          {
            bowler: { id: "player-4", name: "Pat Cummins" },
            o: 4,
            m: 0,
            r: 35,
            w: 1,
            nb: 0,
            wd: 2,
            eco: 8.75,
          },
        ],
      },
    ],
  }),
  getFantasyPoints: vi.fn().mockResolvedValue({
    innings: [
      {
        inning: "India Inning 1",
        batting: [{ id: "player-1", name: "Virat Kohli", points: 95 }],
        bowling: [{ id: "player-4", name: "Pat Cummins", points: 30 }],
      },
    ],
    totals: [
      { id: "player-1", name: "Virat Kohli", points: 95 },
      { id: "player-4", name: "Pat Cummins", points: 30 },
    ],
  }),
  categorizeMatches: vi.fn().mockImplementation((matches) => ({
    upcoming: [],
    live: matches,
    completed: [],
  })),
  mapPlayerRole: vi.fn().mockImplementation((role) => {
    const roleMap: Record<string, string> = {
      Batsman: "BAT",
      Bowler: "BOWL",
      "All-rounder": "AR",
      "WK-Batsman": "WK",
    };
    return roleMap[role] || "BAT";
  }),
  calculateTotalPlayerPoints: vi.fn().mockReturnValue(95),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("Cricket Matches API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return live scores from the API", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getLiveScores();

    expect(result).toBeDefined();
    expect(result.live).toBeDefined();
    expect(Array.isArray(result.live)).toBe(true);
  });

  it("should return match details for a valid match ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getDetails({ matchId: "test-match-1" });

    expect(result).toBeDefined();
    expect(result?.id).toBe("test-match-1");
    expect(result?.teams).toContain("India");
    expect(result?.teams).toContain("Australia");
  });

  it("should return fantasy squad for a match", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getSquad({ matchId: "test-match-1" });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result && result.length > 0) {
      expect(result[0].teamName).toBe("India");
      expect(result[0].players.length).toBeGreaterThan(0);
    }
  });

  it("should return scorecard for a match", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getScorecard({ matchId: "test-match-1" });

    expect(result).toBeDefined();
    expect(result?.scorecard).toBeDefined();
    expect(Array.isArray(result?.scorecard)).toBe(true);
  });

  it("should return fantasy points for a match", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getFantasyPoints({ matchId: "test-match-1" });

    expect(result).toBeDefined();
    expect(result?.innings).toBeDefined();
    expect(result?.totals).toBeDefined();
  });
});

describe("User Profile API", () => {
  it("should check if user can play (requires authentication)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // This will return canPlay: false because the mock user doesn't have age/geo verification
    const result = await caller.user.canPlay();

    expect(result).toBeDefined();
    expect(typeof result.canPlay).toBe("boolean");
  }, 15000); // Increase timeout for database operation
});

describe("Auth API", () => {
  it("should return null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeNull();
  });

  it("should return user data for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeDefined();
    expect(result?.email).toBe("test@example.com");
    expect(result?.name).toBe("Test User");
  });

  it("should logout successfully", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
  });
});
