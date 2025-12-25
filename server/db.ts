import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, User, users } from "../drizzle/schema";
import * as bcrypt from "bcryptjs";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Blocked states for geo-restriction
const BLOCKED_STATES = ["telangana", "andhra pradesh", "assam", "odisha"];

/**
 * Create a new user with email/password
 */
export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
  dateOfBirth?: Date;
  state?: string;
}): Promise<User | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create user: database not available");
    return null;
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    // Check if state is geo-restricted
    const isGeoRestricted = data.state 
      ? BLOCKED_STATES.includes(data.state.toLowerCase())
      : false;
    
    // Check age verification (must be 18+)
    let isAgeVerified = false;
    if (data.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(data.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      isAgeVerified = age >= 18;
    }

    const values: InsertUser = {
      email: data.email,
      password: hashedPassword,
      name: data.name || null,
      dateOfBirth: data.dateOfBirth || null,
      state: data.state || null,
      isAgeVerified,
      isGeoRestricted,
      lastSignedIn: new Date(),
    };

    await db.insert(users).values(values);
    
    // Return the created user
    return await getUserByEmail(data.email) || null;
  } catch (error) {
    console.error("[Database] Failed to create user:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Verify user password
 */
export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  // Update last signed in
  const db = await getDb();
  if (db) {
    await db.update(users)
      .set({ lastSignedIn: new Date() })
      .where(eq(users.id, user.id));
  }

  return user;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: number, data: {
  name?: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  state?: string;
}): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user: database not available");
    return undefined;
  }

  const updateData: Partial<InsertUser> = {};
  
  if (data.name !== undefined) updateData.name = data.name;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl;
  if (data.dateOfBirth !== undefined) {
    updateData.dateOfBirth = data.dateOfBirth;
    // Recalculate age verification
    const today = new Date();
    const birthDate = new Date(data.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    updateData.isAgeVerified = age >= 18;
  }
  if (data.state !== undefined) {
    updateData.state = data.state;
    updateData.isGeoRestricted = BLOCKED_STATES.includes(data.state.toLowerCase());
  }

  if (Object.keys(updateData).length === 0) {
    return await getUserById(userId);
  }

  await db.update(users)
    .set(updateData)
    .where(eq(users.id, userId));

  return await getUserById(userId);
}

/**
 * Update user password
 */
export async function updateUserPassword(userId: number, newPassword: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update password: database not available");
    return false;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  
  await db.update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, userId));

  return true;
}

/**
 * Set password reset token
 */
export async function setPasswordResetToken(email: string, token: string, expires: Date): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const user = await getUserByEmail(email);
  if (!user) return false;

  await db.update(users)
    .set({ 
      passwordResetToken: token,
      passwordResetExpires: expires
    })
    .where(eq(users.id, user.id));

  return true;
}

/**
 * Verify and use password reset token
 */
export async function verifyPasswordResetToken(token: string): Promise<User | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(users)
    .where(eq(users.passwordResetToken, token))
    .limit(1);

  if (result.length === 0) return null;

  const user = result[0];
  
  // Check if token is expired
  if (user.passwordResetExpires && new Date() > user.passwordResetExpires) {
    return null;
  }

  return user;
}

/**
 * Clear password reset token
 */
export async function clearPasswordResetToken(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(users)
    .set({ 
      passwordResetToken: null,
      passwordResetExpires: null
    })
    .where(eq(users.id, userId));
}
