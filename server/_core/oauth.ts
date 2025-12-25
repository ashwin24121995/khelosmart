import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

/**
 * Register authentication routes for email/password login
 */
export function registerOAuthRoutes(app: Express) {
  // Register new user
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name, dateOfBirth, state } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      // Check if email already exists
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ error: "Email already registered" });
        return;
      }

      // Validate password strength
      if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
      }

      // Parse date of birth if provided
      let dob: Date | undefined;
      if (dateOfBirth) {
        dob = new Date(dateOfBirth);
        if (isNaN(dob.getTime())) {
          res.status(400).json({ error: "Invalid date of birth" });
          return;
        }
      }

      // Create user
      const user = await db.createUser({
        email,
        password,
        name,
        dateOfBirth: dob,
        state,
      });

      if (!user) {
        res.status(500).json({ error: "Failed to create user" });
        return;
      }

      // Check geo-restriction
      if (user.isGeoRestricted) {
        res.status(403).json({ 
          error: "Fantasy sports is not available in your state",
          geoRestricted: true 
        });
        return;
      }

      // Check age verification
      if (!user.isAgeVerified) {
        res.status(403).json({ 
          error: "You must be 18 years or older to use this platform",
          ageRestricted: true 
        });
        return;
      }

      // Create session token
      const sessionToken = await sdk.createSessionToken(user, {
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAgeVerified: user.isAgeVerified,
          isGeoRestricted: user.isGeoRestricted,
        }
      });
    } catch (error) {
      console.error("[Auth] Registration failed", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Login with email/password
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      // Verify credentials
      const user = await db.verifyPassword(email, password);
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Check geo-restriction
      if (user.isGeoRestricted) {
        res.status(403).json({ 
          error: "Fantasy sports is not available in your state",
          geoRestricted: true 
        });
        return;
      }

      // Check age verification
      if (!user.isAgeVerified) {
        res.status(403).json({ 
          error: "You must be 18 years or older to use this platform",
          ageRestricted: true 
        });
        return;
      }

      // Create session token
      const sessionToken = await sdk.createSessionToken(user, {
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAgeVerified: user.isAgeVerified,
          isGeoRestricted: user.isGeoRestricted,
        }
      });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Forgot password - request reset
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }

      // Generate reset token
      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 3600000); // 1 hour

      const success = await db.setPasswordResetToken(email, token, expires);
      
      // Always return success to prevent email enumeration
      res.json({ 
        success: true, 
        message: "If an account exists with this email, a password reset link will be sent" 
      });

      // In production, you would send an email here with the reset link
      if (success) {
        console.log(`[Auth] Password reset token for ${email}: ${token}`);
      }
    } catch (error) {
      console.error("[Auth] Forgot password failed", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  // Reset password with token
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        res.status(400).json({ error: "Token and new password are required" });
        return;
      }

      if (newPassword.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
      }

      // Verify token
      const user = await db.verifyPasswordResetToken(token);
      if (!user) {
        res.status(400).json({ error: "Invalid or expired reset token" });
        return;
      }

      // Update password
      await db.updateUserPassword(user.id, newPassword);
      await db.clearPasswordResetToken(user.id);

      res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      console.error("[Auth] Reset password failed", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });
}
