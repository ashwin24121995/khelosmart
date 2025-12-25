import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

function createGuestContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const { ctx } = createGuestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createGuestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
    });
  });
});

describe("cricket API integration", () => {
  it("matches.getLiveScores returns categorized matches", async () => {
    const { ctx } = createGuestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getLiveScores();
    
    // The categorizeMatches function returns upcoming, live, completed
    expect(result).toHaveProperty("upcoming");
    expect(result).toHaveProperty("live");
    expect(result).toHaveProperty("completed");
    expect(Array.isArray(result.upcoming)).toBe(true);
    expect(Array.isArray(result.live)).toBe(true);
    expect(Array.isArray(result.completed)).toBe(true);
  }, 30000);
});
