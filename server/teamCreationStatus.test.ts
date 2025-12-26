import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the cricket API functions
vi.mock("./cricketApi", () => ({
  getLiveScores: vi.fn(),
  getMatchInfo: vi.fn(),
  getFantasySquad: vi.fn(),
  getMatchScorecard: vi.fn(),
  getFantasyPoints: vi.fn(),
  categorizeMatches: vi.fn((matches) => ({
    upcoming: matches.filter((m: { ms: string }) => m.ms === "fixture"),
    live: matches.filter((m: { ms: string }) => m.ms === "live"),
    completed: matches.filter((m: { ms: string }) => m.ms === "result"),
  })),
  mapPlayerRole: vi.fn((role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes("wk") || roleLower.includes("wicket")) return "wicketkeeper";
    if (roleLower.includes("allrounder")) return "allrounder";
    if (roleLower.includes("bowl")) return "bowler";
    return "batsman";
  }),
  calculateTotalPlayerPoints: vi.fn(() => 0),
}));

import * as cricketApi from "./cricketApi";

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

describe("matches.getTeamCreationStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns canCreate=false when match is not found", async () => {
    vi.mocked(cricketApi.getMatchInfo).mockResolvedValue(null);
    vi.mocked(cricketApi.getLiveScores).mockResolvedValue([]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getTeamCreationStatus({ matchId: "invalid-id" });

    expect(result.canCreate).toBe(false);
    expect(result.canEdit).toBe(false);
    expect(result.reason).toBe("Match not found");
  });

  it("returns canCreate=false when toss has not happened (upcoming match)", async () => {
    vi.mocked(cricketApi.getMatchInfo).mockResolvedValue({
      id: "match-1",
      name: "Team A vs Team B",
      matchType: "T20",
      status: "Match not started",
      venue: "Stadium",
      date: "2026-01-02",
      dateTimeGMT: "2026-01-02T10:00:00",
      teams: ["Team A", "Team B"],
      teamInfo: [],
      score: [],
      series_id: "series-1",
      // No tossWinner - toss hasn't happened
    });
    vi.mocked(cricketApi.getLiveScores).mockResolvedValue([
      {
        id: "match-1",
        ms: "fixture",
        t1: "Team A",
        t2: "Team B",
        t1s: "",
        t2s: "",
        t1img: "",
        t2img: "",
        dateTimeGMT: "2026-01-02T10:00:00",
        matchType: "T20",
        status: "Match not started",
        series: "Test Series",
      },
    ]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getTeamCreationStatus({ matchId: "match-1" });

    expect(result.canCreate).toBe(false);
    expect(result.canEdit).toBe(false);
    expect(result.reason).toBe("Waiting for toss - team creation opens after toss");
    expect(result.tossInfo).toBeNull();
    expect(result.matchStatus).toBe("upcoming");
  });

  it("returns canCreate=true when toss is completed and match not started", async () => {
    vi.mocked(cricketApi.getMatchInfo).mockResolvedValue({
      id: "match-1",
      name: "Team A vs Team B",
      matchType: "T20",
      status: "Team A won the toss",
      venue: "Stadium",
      date: "2026-01-02",
      dateTimeGMT: "2026-01-02T10:00:00",
      teams: ["Team A", "Team B"],
      teamInfo: [],
      score: [],
      series_id: "series-1",
      tossWinner: "Team A",
      tossChoice: "bat",
    });
    vi.mocked(cricketApi.getLiveScores).mockResolvedValue([
      {
        id: "match-1",
        ms: "fixture",
        t1: "Team A",
        t2: "Team B",
        t1s: "",
        t2s: "",
        t1img: "",
        t2img: "",
        dateTimeGMT: "2026-01-02T10:00:00",
        matchType: "T20",
        status: "Team A won the toss",
        series: "Test Series",
      },
    ]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getTeamCreationStatus({ matchId: "match-1" });

    expect(result.canCreate).toBe(true);
    expect(result.canEdit).toBe(true);
    expect(result.reason).toBe("Toss completed - create your team before the match starts!");
    expect(result.tossInfo).toEqual({
      winner: "Team A",
      choice: "bat",
    });
    expect(result.matchStatus).toBe("upcoming");
  });

  it("returns canCreate=false when match is live", async () => {
    vi.mocked(cricketApi.getMatchInfo).mockResolvedValue({
      id: "match-1",
      name: "Team A vs Team B",
      matchType: "T20",
      status: "Team A 50/2 (10 ov)",
      venue: "Stadium",
      date: "2026-01-02",
      dateTimeGMT: "2026-01-02T10:00:00",
      teams: ["Team A", "Team B"],
      teamInfo: [],
      score: [{ r: 50, w: 2, o: 10, inning: "Team A Inning 1" }],
      series_id: "series-1",
      tossWinner: "Team A",
      tossChoice: "bat",
    });
    vi.mocked(cricketApi.getLiveScores).mockResolvedValue([
      {
        id: "match-1",
        ms: "live",
        t1: "Team A",
        t2: "Team B",
        t1s: "50/2",
        t2s: "",
        t1img: "",
        t2img: "",
        dateTimeGMT: "2026-01-02T10:00:00",
        matchType: "T20",
        status: "Team A 50/2 (10 ov)",
        series: "Test Series",
      },
    ]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getTeamCreationStatus({ matchId: "match-1" });

    expect(result.canCreate).toBe(false);
    expect(result.canEdit).toBe(false);
    expect(result.reason).toBe("Match has started - team is locked");
    expect(result.matchStatus).toBe("live");
  });

  it("returns canCreate=false when match is completed", async () => {
    vi.mocked(cricketApi.getMatchInfo).mockResolvedValue({
      id: "match-1",
      name: "Team A vs Team B",
      matchType: "T20",
      status: "Team A won by 5 wickets",
      venue: "Stadium",
      date: "2026-01-02",
      dateTimeGMT: "2026-01-02T10:00:00",
      teams: ["Team A", "Team B"],
      teamInfo: [],
      score: [],
      series_id: "series-1",
      tossWinner: "Team A",
      tossChoice: "bat",
      matchWinner: "Team A",
    });
    vi.mocked(cricketApi.getLiveScores).mockResolvedValue([
      {
        id: "match-1",
        ms: "result",
        t1: "Team A",
        t2: "Team B",
        t1s: "150/5",
        t2s: "145/10",
        t1img: "",
        t2img: "",
        dateTimeGMT: "2026-01-02T10:00:00",
        matchType: "T20",
        status: "Team A won by 5 wickets",
        series: "Test Series",
      },
    ]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getTeamCreationStatus({ matchId: "match-1" });

    expect(result.canCreate).toBe(false);
    expect(result.canEdit).toBe(false);
    expect(result.reason).toBe("Match has ended");
    expect(result.matchStatus).toBe("completed");
  });
});
