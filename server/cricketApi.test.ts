import { describe, expect, it } from "vitest";

const CRICKET_API_KEY = process.env.CRICKET_API_KEY || "";
const CRICKET_API_BASE_URL = "https://api.cricapi.com/v1";

describe("Cricket API Key Validation", () => {
  it("should have a valid API key configured", () => {
    expect(CRICKET_API_KEY).toBeTruthy();
    expect(CRICKET_API_KEY.length).toBeGreaterThan(10);
  });

  it("should successfully fetch data from Cricket API", async () => {
    // Use cricScore endpoint as it's lightweight and available on all plans
    const url = `${CRICKET_API_BASE_URL}/cricScore?apikey=${CRICKET_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Check that the API responds with success status
    expect(data.status).toBe("success");
    
    // Check that we have data array (even if empty)
    expect(data).toHaveProperty("data");
    expect(Array.isArray(data.data)).toBe(true);
  }, 15000); // 15 second timeout

  it("should have access to Fantasy API endpoints", async () => {
    // First get a match ID from cricScore
    const scoresUrl = `${CRICKET_API_BASE_URL}/cricScore?apikey=${CRICKET_API_KEY}`;
    const scoresResponse = await fetch(scoresUrl);
    const scoresData = await scoresResponse.json();
    
    expect(scoresData.status).toBe("success");
    
    // If there are matches available, test fantasy squad endpoint
    if (scoresData.data && scoresData.data.length > 0) {
      const matchId = scoresData.data[0].id;
      const squadUrl = `${CRICKET_API_BASE_URL}/match_squad?apikey=${CRICKET_API_KEY}&id=${matchId}`;
      
      const squadResponse = await fetch(squadUrl);
      const squadData = await squadResponse.json();
      
      // Fantasy API should respond (may fail if match doesn't have fantasy data, but should not be auth error)
      expect(squadData).toHaveProperty("status");
      // If it fails, it should be because fantasy is not available for this match, not auth
      if (squadData.status !== "success") {
        expect(squadData.reason || squadData.message).not.toContain("Invalid API Key");
        expect(squadData.reason || squadData.message).not.toContain("Unauthorized");
      }
    }
  }, 15000); // 15 second timeout
});
