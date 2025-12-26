import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";

import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  getLiveScores, 
  getMatchInfo, 
  getFantasySquad, 
  getMatchScorecard, 
  getFantasyPoints,
  getMatchCommentary,
  categorizeMatches,
  mapPlayerRole,
  calculateTotalPlayerPoints,
} from "./cricketApi";
import { 
  contests, 
  fantasyTeams, 
  contestEntries, 
  users,
  teamTemplates,
  achievements,
  userPreferences
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

    // Check if team creation is allowed for a match
    // Returns: canCreate (boolean), reason (string), tossInfo (object)
    getTeamCreationStatus: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        const matchInfo = await getMatchInfo(input.matchId);
        const matches = await getLiveScores();
        const matchState = matches.find(m => m.id === input.matchId);
        
        if (!matchInfo) {
          return {
            canCreate: false,
            canEdit: false,
            reason: "Match not found",
            tossInfo: null,
            matchStatus: "unknown",
          };
        }

        // Check match state
        const isLive = matchState?.ms === "live";
        const isCompleted = matchState?.ms === "result";
        const isUpcoming = matchState?.ms === "fixture";
        
        // Check if toss has happened
        const tossCompleted = !!matchInfo.tossWinner;
        
        // Determine team creation/edit status
        let canCreate = false;
        let canEdit = false;
        let reason = "";
        
        if (isCompleted) {
          canCreate = false;
          canEdit = false;
          reason = "Match has ended";
        } else if (isLive) {
          canCreate = false;
          canEdit = false;
          reason = "Match has started - team is locked";
        } else if (isUpcoming && !tossCompleted) {
          canCreate = false;
          canEdit = false;
          reason = "Waiting for toss - team creation opens after toss";
        } else if (isUpcoming && tossCompleted) {
          canCreate = true;
          canEdit = true;
          reason = "Toss completed - create your team before the match starts!";
        } else {
          canCreate = false;
          canEdit = false;
          reason = "Unable to determine match status";
        }

        return {
          canCreate,
          canEdit,
          reason,
          tossInfo: tossCompleted ? {
            winner: matchInfo.tossWinner,
            choice: matchInfo.tossChoice,
          } : null,
          matchStatus: isLive ? "live" : isCompleted ? "completed" : "upcoming",
          matchDateTime: matchInfo.dateTimeGMT,
        };
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

    // Get ball-by-ball commentary
    getCommentary: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return getMatchCommentary(input.matchId);
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

        // Check if team creation is allowed (after toss, before match starts)
        const matchInfo = await getMatchInfo(input.matchId);
        const matches = await getLiveScores();
        const matchState = matches.find(m => m.id === input.matchId);
        
        if (!matchInfo) throw new Error("Match not found");
        
        const isLive = matchState?.ms === "live";
        const isCompleted = matchState?.ms === "result";
        const tossCompleted = !!matchInfo.tossWinner;
        
        if (isCompleted) {
          throw new Error("Match has ended - cannot create team");
        }
        if (isLive) {
          throw new Error("Match has started - team creation is locked");
        }
        if (!tossCompleted) {
          throw new Error("Toss not completed yet - team creation opens after toss");
        }

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

    // Update an existing fantasy team (allowed until match starts)
    update: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        name: z.string().optional(),
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

        // Get existing team
        const [team] = await db.select()
          .from(fantasyTeams)
          .where(and(
            eq(fantasyTeams.id, input.teamId),
            eq(fantasyTeams.userId, ctx.user.id)
          ))
          .limit(1);

        if (!team) throw new Error("Team not found");

        // Check if editing is allowed (match not started)
        const matchInfo = await getMatchInfo(team.matchId);
        const matches = await getLiveScores();
        const matchState = matches.find(m => m.id === team.matchId);
        
        if (!matchInfo) throw new Error("Match not found");
        
        const isLive = matchState?.ms === "live";
        const isCompleted = matchState?.ms === "result";
        
        if (isCompleted) {
          throw new Error("Match has ended - cannot edit team");
        }
        if (isLive) {
          throw new Error("Match has started - team is locked");
        }

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

        await db.update(fantasyTeams)
          .set({
            name: input.name || team.name,
            captainId: input.captainId,
            viceCaptainId: input.viceCaptainId,
            players: input.players,
            updatedAt: new Date(),
          })
          .where(eq(fantasyTeams.id, input.teamId));

        return { success: true };
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

  // Team templates
  templates: router({
    // List user's templates
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];

      return db.select()
        .from(teamTemplates)
        .where(eq(teamTemplates.userId, ctx.user.id))
        .orderBy(desc(teamTemplates.updatedAt));
    }),

    // Create a new template
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
        matchType: z.string().optional(),
        captainId: z.string().optional(),
        viceCaptainId: z.string().optional(),
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

        const [result] = await db.insert(teamTemplates).values({
          userId: ctx.user.id,
          name: input.name,
          description: input.description,
          matchType: input.matchType,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          players: input.players,
        });

        return { success: true, templateId: result.insertId };
      }),

    // Update template
    update: protectedProcedure
      .input(z.object({
        templateId: z.number(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().optional(),
        captainId: z.string().optional(),
        viceCaptainId: z.string().optional(),
        players: z.array(z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
          team: z.string(),
        })).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const updates: Record<string, unknown> = {};
        if (input.name) updates.name = input.name;
        if (input.description !== undefined) updates.description = input.description;
        if (input.captainId) updates.captainId = input.captainId;
        if (input.viceCaptainId) updates.viceCaptainId = input.viceCaptainId;
        if (input.players) updates.players = input.players;

        await db.update(teamTemplates)
          .set(updates)
          .where(and(
            eq(teamTemplates.id, input.templateId),
            eq(teamTemplates.userId, ctx.user.id)
          ));

        return { success: true };
      }),

    // Delete template
    delete: protectedProcedure
      .input(z.object({ templateId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.delete(teamTemplates)
          .where(and(
            eq(teamTemplates.id, input.templateId),
            eq(teamTemplates.userId, ctx.user.id)
          ));

        return { success: true };
      }),

    // Use template (increment usage count)
    use: protectedProcedure
      .input(z.object({ templateId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.update(teamTemplates)
          .set({ timesUsed: sql`${teamTemplates.timesUsed} + 1` })
          .where(and(
            eq(teamTemplates.id, input.templateId),
            eq(teamTemplates.userId, ctx.user.id)
          ));

        return { success: true };
      }),
  }),

  // Achievements
  achievements: router({
    // List user's achievements
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];

      return db.select()
        .from(achievements)
        .where(eq(achievements.userId, ctx.user.id))
        .orderBy(desc(achievements.isCompleted), desc(achievements.unlockedAt));
    }),

    // Initialize achievements for new user
    initialize: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if already initialized
      const existing = await db.select()
        .from(achievements)
        .where(eq(achievements.userId, ctx.user.id))
        .limit(1);

      if (existing.length > 0) return { success: true, message: "Already initialized" };

      // Define all achievements
      const achievementDefs = [
        { type: "first_win", name: "First Victory", description: "Win your first contest", icon: "🏆", target: 1 },
        { type: "contests_10", name: "Getting Started", description: "Join 10 contests", icon: "🎯", target: 10 },
        { type: "contests_50", name: "Regular Player", description: "Join 50 contests", icon: "⭐", target: 50 },
        { type: "contests_100", name: "Century Club", description: "Join 100 contests", icon: "💯", target: 100 },
        { type: "top_10_finish", name: "Top 10", description: "Finish in top 10 in a contest", icon: "🥇", target: 1 },
        { type: "top_3_finish", name: "Podium Finish", description: "Finish in top 3 in a contest", icon: "🏅", target: 1 },
        { type: "perfect_captain", name: "Captain Marvel", description: "Your captain scores 100+ points", icon: "👑", target: 1 },
        { type: "streak_3", name: "Hat-trick", description: "Win 3 contests in a row", icon: "🔥", target: 3 },
        { type: "streak_5", name: "On Fire", description: "Win 5 contests in a row", icon: "🔥🔥", target: 5 },
        { type: "century_points", name: "Century", description: "Score 100+ points in a contest", icon: "💪", target: 1 },
        { type: "double_century", name: "Double Century", description: "Score 200+ points in a contest", icon: "🚀", target: 1 },
      ];

      await db.insert(achievements).values(
        achievementDefs.map(def => ({
          userId: ctx.user.id,
          ...def,
        }))
      );

      return { success: true };
    }),

    // Update achievement progress
    updateProgress: protectedProcedure
      .input(z.object({
        type: z.string(),
        increment: z.number().default(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const [achievement] = await db.select()
          .from(achievements)
          .where(and(
            eq(achievements.userId, ctx.user.id),
            eq(achievements.type, input.type)
          ))
          .limit(1);

        if (!achievement) return { success: false, message: "Achievement not found" };
        if (achievement.isCompleted) return { success: true, message: "Already completed" };

        const newProgress = achievement.progress + input.increment;
        const isNowCompleted = newProgress >= achievement.target;

        await db.update(achievements)
          .set({
            progress: newProgress,
            isCompleted: isNowCompleted,
            unlockedAt: isNowCompleted ? new Date() : null,
          })
          .where(eq(achievements.id, achievement.id));

        return { 
          success: true, 
          completed: isNowCompleted,
          achievement: isNowCompleted ? achievement : null 
        };
      }),
  }),

  // User preferences
  preferences: router({
    // Get user preferences
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;

      const [prefs] = await db.select()
        .from(userPreferences)
        .where(eq(userPreferences.userId, ctx.user.id))
        .limit(1);

      return prefs;
    }),

    // Update preferences
    update: protectedProcedure
      .input(z.object({
        theme: z.enum(["light", "dark", "system"]).optional(),
        language: z.string().optional(),
        pushNotifications: z.boolean().optional(),
        emailNotifications: z.boolean().optional(),
        tossAlerts: z.boolean().optional(),
        matchReminders: z.boolean().optional(),
        hasCompletedOnboarding: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Check if preferences exist
        const [existing] = await db.select()
          .from(userPreferences)
          .where(eq(userPreferences.userId, ctx.user.id))
          .limit(1);

        if (existing) {
          await db.update(userPreferences)
            .set(input)
            .where(eq(userPreferences.userId, ctx.user.id));
        } else {
          await db.insert(userPreferences).values({
            userId: ctx.user.id,
            ...input,
          });
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
