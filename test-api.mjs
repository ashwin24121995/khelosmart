import 'dotenv/config';

const CRICKET_API_KEY = process.env.CRICKET_API_KEY;
const BASE_URL = "https://api.cricapi.com/v1";

async function testApi() {
  // First get live matches
  console.log("=== Getting Live/Current Matches ===\n");
  
  const matchesRes = await fetch(`${BASE_URL}/cricScore?apikey=${CRICKET_API_KEY}`);
  const matchesData = await matchesRes.json();
  
  // Find a live match
  const liveMatch = matchesData.data?.find(m => m.ms === "live");
  const recentMatch = matchesData.data?.find(m => m.ms === "result");
  
  const testMatch = liveMatch || recentMatch;
  
  if (testMatch) {
    console.log(`Testing with match: ${testMatch.t1} vs ${testMatch.t2}`);
    console.log(`Match ID: ${testMatch.id}`);
    console.log(`Status: ${testMatch.ms}\n`);
    
    // Get match info (includes toss)
    console.log("=== Match Info (Toss Data) ===\n");
    const infoRes = await fetch(`${BASE_URL}/match_info?apikey=${CRICKET_API_KEY}&id=${testMatch.id}`);
    const infoData = await infoRes.json();
    
    if (infoData.data) {
      console.log(`Toss Winner: ${infoData.data.tossWinner || 'Not available'}`);
      console.log(`Toss Choice: ${infoData.data.tossChoice || 'Not available'}`);
      console.log(`Match Status: ${infoData.data.status}\n`);
    }
    
    // Get squad data
    console.log("=== Squad Data ===\n");
    const squadRes = await fetch(`${BASE_URL}/match_squad?apikey=${CRICKET_API_KEY}&id=${testMatch.id}`);
    const squadData = await squadRes.json();
    
    if (squadData.data && squadData.data.length > 0) {
      for (const team of squadData.data) {
        console.log(`\n${team.teamName} (${team.players?.length || 0} players):`);
        if (team.players) {
          team.players.forEach((p, i) => {
            console.log(`  ${i+1}. ${p.name} - ${p.role} ${p.playingxi ? '✅ PLAYING XI' : ''}`);
          });
        }
      }
    } else {
      console.log("No squad data available");
    }
  } else {
    console.log("No live or recent matches found");
    console.log("Available matches:", matchesData.data?.slice(0, 3).map(m => `${m.t1} vs ${m.t2} (${m.ms})`));
  }
}

testApi().catch(console.error);
