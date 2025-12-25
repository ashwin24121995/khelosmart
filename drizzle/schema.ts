import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table with email/password authentication.
 * No external OAuth dependencies.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  
  // Authentication - email/password based
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // bcrypt hashed
  
  // Profile
  name: text("name"),
  phone: varchar("phone", { length: 20 }),
  avatarUrl: text("avatarUrl"),
  
  // Role
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Age verification (18+ required)
  dateOfBirth: timestamp("dateOfBirth"),
  isAgeVerified: boolean("isAgeVerified").default(false).notNull(),
  
  // Geo-restriction (blocked states: Telangana, Andhra Pradesh, Assam, Odisha)
  state: varchar("state", { length: 100 }),
  isGeoRestricted: boolean("isGeoRestricted").default(false).notNull(),
  
  // Stats
  totalContests: int("totalContests").default(0).notNull(),
  totalWins: int("totalWins").default(0).notNull(),
  totalPoints: int("totalPoints").default(0).notNull(),
  
  // Email verification
  isEmailVerified: boolean("isEmailVerified").default(false).notNull(),
  emailVerificationToken: varchar("emailVerificationToken", { length: 255 }),
  
  // Password reset
  passwordResetToken: varchar("passwordResetToken", { length: 255 }),
  passwordResetExpires: timestamp("passwordResetExpires"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contests table - stores contest information
 */
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 64 }).notNull(), // Cricket API match ID
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Contest details
  entryFee: int("entryFee").default(0).notNull(), // 0 for free contests
  prizePool: int("prizePool").default(0).notNull(),
  maxParticipants: int("maxParticipants").default(100).notNull(),
  currentParticipants: int("currentParticipants").default(0).notNull(),
  
  // Match info (cached from API)
  team1Name: varchar("team1Name", { length: 255 }),
  team2Name: varchar("team2Name", { length: 255 }),
  team1Logo: text("team1Logo"),
  team2Logo: text("team2Logo"),
  matchType: varchar("matchType", { length: 20 }), // t20, odi, test
  matchDateTime: timestamp("matchDateTime"),
  venue: text("venue"),
  seriesName: varchar("seriesName", { length: 255 }),
  
  // Status
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

/**
 * Fantasy teams created by users
 */
export const fantasyTeams = mysqlTable("fantasyTeams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  matchId: varchar("matchId", { length: 64 }).notNull(),
  
  name: varchar("name", { length: 100 }).notNull(),
  
  // Captain and Vice Captain (player IDs from API)
  captainId: varchar("captainId", { length: 64 }).notNull(),
  viceCaptainId: varchar("viceCaptainId", { length: 64 }).notNull(),
  
  // Selected players (JSON array of player IDs)
  players: json("players").notNull(), // Array of player objects with id, name, role, team
  
  // Points
  totalPoints: decimal("totalPoints", { precision: 10, scale: 2 }).default("0").notNull(),
  rank: int("rank"),
  
  // Status
  status: mysqlEnum("status", ["draft", "submitted", "locked", "completed"]).default("draft").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FantasyTeam = typeof fantasyTeams.$inferSelect;
export type InsertFantasyTeam = typeof fantasyTeams.$inferInsert;

/**
 * Contest entries - links users to contests
 */
export const contestEntries = mysqlTable("contestEntries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  fantasyTeamId: int("fantasyTeamId").notNull(),
  
  // Results
  finalPoints: decimal("finalPoints", { precision: 10, scale: 2 }).default("0"),
  finalRank: int("finalRank"),
  prizeWon: int("prizeWon").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContestEntry = typeof contestEntries.$inferSelect;
export type InsertContestEntry = typeof contestEntries.$inferInsert;

/**
 * Match cache - stores match data from API to reduce API calls
 */
export const matchCache = mysqlTable("matchCache", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 64 }).notNull().unique(),
  
  // Basic info
  name: varchar("name", { length: 255 }),
  matchType: varchar("matchType", { length: 20 }),
  status: varchar("status", { length: 100 }),
  matchState: varchar("matchState", { length: 20 }), // fixture, live, result
  
  // Teams
  team1Name: varchar("team1Name", { length: 255 }),
  team2Name: varchar("team2Name", { length: 255 }),
  team1Logo: text("team1Logo"),
  team2Logo: text("team2Logo"),
  team1Score: varchar("team1Score", { length: 100 }),
  team2Score: varchar("team2Score", { length: 100 }),
  
  // Match details
  venue: text("venue"),
  dateTimeGMT: timestamp("dateTimeGMT"),
  seriesName: varchar("seriesName", { length: 255 }),
  seriesId: varchar("seriesId", { length: 64 }),
  
  // Fantasy enabled
  fantasyEnabled: boolean("fantasyEnabled").default(false),
  
  // Full API response (for detailed data)
  apiResponse: json("apiResponse"),
  
  // Cache management
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MatchCache = typeof matchCache.$inferSelect;
export type InsertMatchCache = typeof matchCache.$inferInsert;

/**
 * Player points cache - stores calculated fantasy points per match
 */
export const playerPoints = mysqlTable("playerPoints", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 64 }).notNull(),
  playerId: varchar("playerId", { length: 64 }).notNull(),
  playerName: varchar("playerName", { length: 255 }),
  
  // Points breakdown
  battingPoints: decimal("battingPoints", { precision: 10, scale: 2 }).default("0"),
  bowlingPoints: decimal("bowlingPoints", { precision: 10, scale: 2 }).default("0"),
  fieldingPoints: decimal("fieldingPoints", { precision: 10, scale: 2 }).default("0"),
  totalPoints: decimal("totalPoints", { precision: 10, scale: 2 }).default("0"),
  
  // Performance stats (cached)
  runs: int("runs").default(0),
  balls: int("balls").default(0),
  fours: int("fours").default(0),
  sixes: int("sixes").default(0),
  wickets: int("wickets").default(0),
  overs: varchar("overs", { length: 10 }),
  runsConceded: int("runsConceded").default(0),
  catches: int("catches").default(0),
  
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PlayerPoints = typeof playerPoints.$inferSelect;
export type InsertPlayerPoints = typeof playerPoints.$inferInsert;
