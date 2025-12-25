import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  getLiveScores, 
  getMatchInfo, 
  getFantasySquad, 
  getMatchScorecard, 
  getFantasyPoints,
  categorizeMatches,
  mapPlayerRole,
  calculateTotalPlayerPoints,
} from "./cricketApi";
import { 
  contests, 
  fantasyTeams, 
  contestEntries, 
  users 
} from "../drizzle/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { getDb } from "./db";

// Geo-restricted states
const GEO_RESTRICTED_STATES = [
  "telangana",
  "andhra pradesh", 
  "assam",
  "odisha"
];

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // User profile and verification
  user: router({
    // Update user profile with age verification
    updateProfile: protectedProcedure
      .input(z.object({
        dateOfBirth: z.string().optional(),
        state: z.string().optional(),
        phone: z.string().optional(),
        name: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const updates: Record<string, unknown> = {};
        
        if (input.name) updates.name = input.name;
        if (input.phone) updates.phone = input.phone;
        
        // Age verification
        if (input.dateOfBirth) {
          const dob = new Date(input.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          const isOver18 = age > 18 || (age === 18 && monthDiff >= 0);
          
          updates.dateOfBirth = dob;
          updates.isAgeVerified = isOver18;
        }
        
        // Geo-restriction check
        if (input.state) {
          const stateLower = input.state.toLowerCase();
          const isRestricted = GEO_RESTRICTED_STATES.includes(stateLower);
          updates.state = input.state;
          updates.isGeoRestricted = isRestricted;
        }

        await db.update(users)
          .set(updates)
          .where(eq(users.id, ctx.user.id));

        return { success: true };
      }),

    // Check if user can play (age + geo verified)
    canPlay: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return { canPlay: false, reason: "Database not available" };

      const [user] = await db.select()
        .from(users)
        .where(eq(users.id, ctx.user.id))
        .limit(1);

      if (!user) return { canPlay: false, reason: "User not found" };
      if (!user.isAgeVerified) return { canPlay: false, reason: "Age verification required (18+)" };
      if (user.isGeoRestricted) return { canPlay: false, reason: "Fantasy sports not available in your state" };

      return { canPlay: true };
    }),

    // Get user stats
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;

      const [user] = await db.select({
        totalContests: users.totalContests,
        totalWins: users.totalWins,
        totalPoints: users.totalPoints,
      })
        .from(users)
        .where(eq(users.id, ctx.user.id))
        .limit(1);

      return user;
    }),
  }),

  // Cricket matches from API
  matches: router({
    // Get all live scores (categorized)
    getLiveScores: publicProcedure.query(async () => {
      const matches = await getLiveScores();
      return categorizeMatches(matches);
    }),

    // Get all matches as flat list
    getAll: publicProcedure.query(async () => {
      return getLiveScores();
    }),

    // Get match details
    getDetails: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return getMatchInfo(input.matchId);
      }),

    // Get fantasy squad for a match
    getSquad: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        const squads = await getFantasySquad(input.matchId);
        
        // Map player roles to fantasy categories
        return squads.map(team => ({
          ...team,
          players: team.players.map(player => ({
            ...player,
            fantasyRole: mapPlayerRole(player.role),
          })),
        }));
      }),

    // Get live scorecard
    getScorecard: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return getMatchScorecard(input.matchId);
      }),

    // Get fantasy points for a match
    getFantasyPoints: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return getFantasyPoints(input.matchId);
      }),
  }),

  // Contests management
  contests: router({
    // List all contests
    list: publicProcedure
      .input(z.object({
        status: z.enum(["upcoming", "live", "completed", "all"]).optional(),
      }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        let query = db.select().from(contests);
        
        if (input?.status && input.status !== "all") {
          query = query.where(eq(contests.status, input.status)) as typeof query;
        }

        return query.orderBy(desc(contests.matchDateTime));
      }),

    // Get contest by ID
    getById: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;

        const [contest] = await db.select()
          .from(contests)
          .where(eq(contests.id, input.contestId))
          .limit(1);

        return contest;
      }),

    // Create a new contest (admin or auto-generated)
    create: protectedProcedure
      .input(z.object({
        matchId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        maxParticipants: z.number().default(100),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Get match info from API
        const matchInfo = await getMatchInfo(input.matchId);
        if (!matchInfo) throw new Error("Match not found");

        const [result] = await db.insert(contests).values({
          matchId: input.matchId,
          name: input.name,
          description: input.description,
          maxParticipants: input.maxParticipants,
          team1Name: matchInfo.teams?.[0],
          team2Name: matchInfo.teams?.[1],
          team1Logo: matchInfo.teamInfo?.[0]?.img,
          team2Logo: matchInfo.teamInfo?.[1]?.img,
          matchType: matchInfo.matchType,
          matchDateTime: matchInfo.dateTimeGMT ? new Date(matchInfo.dateTimeGMT) : null,
          venue: matchInfo.venue,
          seriesName: matchInfo.name?.split(",")[0],
          status: "upcoming",
        });

        return { success: true, contestId: result.insertId };
      }),

    // Join a contest
    join: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        fantasyTeamId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Check if already joined
        const [existing] = await db.select()
          .from(contestEntries)
          .where(and(
            eq(contestEntries.userId, ctx.user.id),
            eq(contestEntries.contestId, input.contestId)
          ))
          .limit(1);

        if (existing) throw new Error("Already joined this contest");

        // Check contest capacity
        const [contest] = await db.select()
          .from(contests)
          .where(eq(contests.id, input.contestId))
          .limit(1);

        if (!contest) throw new Error("Contest not found");
        if (contest.currentParticipants >= contest.maxParticipants) {
          throw new Error("Contest is full");
        }

        // Create entry
        await db.insert(contestEntries).values({
          userId: ctx.user.id,
          contestId: input.contestId,
          fantasyTeamId: input.fantasyTeamId,
        });

        // Update participant count
        await db.update(contests)
          .set({ currentParticipants: sql`${contests.currentParticipants} + 1` })
          .where(eq(contests.id, input.contestId));

        return { success: true };
      }),

    // Get user's contest entries
    myEntries: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];

      return db.select({
        entry: contestEntries,
        contest: contests,
        team: fantasyTeams,
      })
        .from(contestEntries)
        .leftJoin(contests, eq(contestEntries.contestId, contests.id))
        .leftJoin(fantasyTeams, eq(contestEntries.fantasyTeamId, fantasyTeams.id))
        .where(eq(contestEntries.userId, ctx.user.id))
        .orderBy(desc(contestEntries.createdAt));
    }),

    // Get leaderboard for a contest
    getLeaderboard: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        return db.select({
          entry: contestEntries,
          team: fantasyTeams,
          user: {
            id: users.id,
            name: users.name,
            avatarUrl: users.avatarUrl,
          },
        })
          .from(contestEntries)
          .leftJoin(fantasyTeams, eq(contestEntries.fantasyTeamId, fantasyTeams.id))
          .leftJoin(users, eq(contestEntries.userId, users.id))
          .where(eq(contestEntries.contestId, input.contestId))
          .orderBy(desc(contestEntries.finalPoints));
      }),
  }),

  // Fantasy teams
  teams: router({
    // Create a new fantasy team
    create: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        matchId: z.string(),
        name: z.string(),
        captainId: z.string(),
        viceCaptainId: z.string(),
        players: z.array(z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
          team: z.string(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Validate team composition (11 players)
        if (input.players.length !== 11) {
          throw new Error("Team must have exactly 11 players");
        }

        // Validate captain and vice-captain are in the team
        const playerIds = input.players.map(p => p.id);
        if (!playerIds.includes(input.captainId)) {
          throw new Error("Captain must be in the team");
        }
        if (!playerIds.includes(input.viceCaptainId)) {
          throw new Error("Vice-captain must be in the team");
        }

        const [result] = await db.insert(fantasyTeams).values({
          userId: ctx.user.id,
          contestId: input.contestId,
          matchId: input.matchId,
          name: input.name,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          players: input.players,
          status: "submitted",
        });

        return { success: true, teamId: result.insertId };
      }),

    // Get user's teams
    myTeams: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];

      return db.select()
        .from(fantasyTeams)
        .where(eq(fantasyTeams.userId, ctx.user.id))
        .orderBy(desc(fantasyTeams.createdAt));
    }),

    // Get team by ID
    getById: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return null;

        const [team] = await db.select()
          .from(fantasyTeams)
          .where(and(
            eq(fantasyTeams.id, input.teamId),
            eq(fantasyTeams.userId, ctx.user.id)
          ))
          .limit(1);

        return team;
      }),

    // Calculate and update team points
    calculatePoints: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const [team] = await db.select()
          .from(fantasyTeams)
          .where(and(
            eq(fantasyTeams.id, input.teamId),
            eq(fantasyTeams.userId, ctx.user.id)
          ))
          .limit(1);

        if (!team) throw new Error("Team not found");

        // Get fantasy points from API
        const matchPoints = await getFantasyPoints(team.matchId);
        if (!matchPoints) throw new Error("Points not available yet");

        // Calculate total points for the team
        let totalPoints = 0;
        const players = team.players as Array<{ id: string; name: string; role: string; team: string }>;

        for (const player of players) {
          const isCaptain = player.id === team.captainId;
          const isViceCaptain = player.id === team.viceCaptainId;
          const playerPoints = calculateTotalPlayerPoints(matchPoints, player.id, isCaptain, isViceCaptain);
          totalPoints += playerPoints;
        }

        // Update team points
        await db.update(fantasyTeams)
          .set({ totalPoints: totalPoints.toString() })
          .where(eq(fantasyTeams.id, input.teamId));

        return { success: true, totalPoints };
      }),
  }),
});

export type AppRouter = typeof appRouter;
