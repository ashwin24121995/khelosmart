import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Supported languages
export type Language = "en" | "hi" | "ta" | "te" | "bn" | "mr";

export const LANGUAGES: Record<Language, { name: string; nativeName: string }> = {
  en: { name: "English", nativeName: "English" },
  hi: { name: "Hindi", nativeName: "हिंदी" },
  ta: { name: "Tamil", nativeName: "தமிழ்" },
  te: { name: "Telugu", nativeName: "తెలుగు" },
  bn: { name: "Bengali", nativeName: "বাংলা" },
  mr: { name: "Marathi", nativeName: "मराठी" },
};

// Translation keys - comprehensive list for entire website
type TranslationKey = 
  // Common
  | "common.home"
  | "common.matches"
  | "common.contests"
  | "common.myTeams"
  | "common.login"
  | "common.logout"
  | "common.profile"
  | "common.settings"
  | "common.loading"
  | "common.error"
  | "common.save"
  | "common.cancel"
  | "common.submit"
  | "common.back"
  | "common.next"
  | "common.search"
  // Match
  | "match.live"
  | "match.upcoming"
  | "match.completed"
  | "match.createTeam"
  | "match.viewDetails"
  | "match.tossWinner"
  | "match.tossChoice"
  | "match.waitingForToss"
  // Team
  | "team.selectPlayers"
  | "team.captain"
  | "team.viceCaptain"
  | "team.wicketkeeper"
  | "team.batsman"
  | "team.allrounder"
  | "team.bowler"
  | "team.credits"
  | "team.playersSelected"
  | "team.saveTeam"
  | "team.editTeam"
  // Contest
  | "contest.joinContest"
  | "contest.entryFee"
  | "contest.prizePool"
  | "contest.spots"
  | "contest.leaderboard"
  // Dashboard
  | "dashboard.totalContests"
  | "dashboard.totalPoints"
  | "dashboard.topFinishes"
  | "dashboard.achievements"
  | "dashboard.welcomeBack"
  | "dashboard.trackJourney"
  | "dashboard.myContests"
  | "dashboard.myTeams"
  | "dashboard.noContests"
  | "dashboard.noTeams"
  | "dashboard.browseMatches"
  | "dashboard.createFirstTeam"
  | "dashboard.players"
  | "dashboard.pts"
  | "dashboard.rank"
  // Offline
  | "offline.youAreOffline"
  | "offline.cachedData"
  // Home page
  | "home.freeToPlay"
  | "home.heroTitle"
  | "home.heroSubtitle"
  | "home.heroDescription"
  | "home.startPlaying"
  | "home.learnHowToPlay"
  | "home.playersPerTeam"
  | "home.buildDreamTeam"
  | "home.buildDreamTeamDesc"
  | "home.feature1"
  | "home.feature2"
  | "home.feature3"
  | "home.createYourTeam"
  | "home.whyChoose"
  | "home.whyChooseDesc"
  | "home.realTimeScoring"
  | "home.realTimeScoringDesc"
  | "home.strategicGameplay"
  | "home.strategicGameplayDesc"
  | "home.freeToPlayTitle"
  | "home.freeToPlayDesc"
  | "home.realTimeUpdates"
  | "home.realTimeUpdatesDesc"
  | "home.competeHaveFun"
  | "home.competeHaveFunDesc"
  | "home.safeSecure"
  | "home.safeSecureDesc"
  | "home.cricketMatches"
  | "home.cricketMatchesDesc"
  | "home.viewAll"
  | "home.failedToLoad"
  | "home.upcoming"
  | "home.live"
  | "home.completed"
  | "home.noUpcoming"
  | "home.noLive"
  | "home.noCompleted"
  | "home.howItWorks"
  | "home.howItWorksDesc"
  | "home.step1Title"
  | "home.step1Desc"
  | "home.step2Title"
  | "home.step2Desc"
  | "home.step3Title"
  | "home.step3Desc"
  | "home.learnMore"
  | "home.ctaTitle"
  | "home.ctaDesc"
  | "home.getStarted";

// Translations for all languages
const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // Common
    "common.home": "Home",
    "common.matches": "Matches",
    "common.contests": "Contests",
    "common.myTeams": "My Teams",
    "common.login": "Login",
    "common.logout": "Logout",
    "common.profile": "Profile",
    "common.settings": "Settings",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.back": "Back",
    "common.next": "Next",
    "common.search": "Search",
    // Match
    "match.live": "Live",
    "match.upcoming": "Upcoming",
    "match.completed": "Completed",
    "match.createTeam": "Create Team",
    "match.viewDetails": "View Details",
    "match.tossWinner": "Toss Winner",
    "match.tossChoice": "Chose to",
    "match.waitingForToss": "Waiting for toss",
    // Team
    "team.selectPlayers": "Select Players",
    "team.captain": "Captain",
    "team.viceCaptain": "Vice Captain",
    "team.wicketkeeper": "Wicketkeeper",
    "team.batsman": "Batsman",
    "team.allrounder": "All-rounder",
    "team.bowler": "Bowler",
    "team.credits": "Credits",
    "team.playersSelected": "Players Selected",
    "team.saveTeam": "Save Team",
    "team.editTeam": "Edit Team",
    // Contest
    "contest.joinContest": "Join Contest",
    "contest.entryFee": "Entry Fee",
    "contest.prizePool": "Prize Pool",
    "contest.spots": "Spots",
    "contest.leaderboard": "Leaderboard",
    // Dashboard
    "dashboard.totalContests": "Total Contests",
    "dashboard.totalPoints": "Total Points",
    "dashboard.topFinishes": "Top Finishes",
    "dashboard.achievements": "Achievements",
    "dashboard.welcomeBack": "Welcome back",
    "dashboard.trackJourney": "Track your fantasy cricket journey",
    "dashboard.myContests": "My Contests",
    "dashboard.myTeams": "My Teams",
    "dashboard.noContests": "You haven't joined any contests yet.",
    "dashboard.noTeams": "You haven't created any teams yet.",
    "dashboard.browseMatches": "Browse Matches",
    "dashboard.createFirstTeam": "Create Your First Team",
    "dashboard.players": "Players",
    "dashboard.pts": "pts",
    "dashboard.rank": "Rank",
    // Offline
    "offline.youAreOffline": "You are offline",
    "offline.cachedData": "Showing cached data",
    // Home page
    "home.freeToPlay": "100% Free to Play",
    "home.heroTitle": "Play Fantasy Cricket.",
    "home.heroSubtitle": "Test Your Skills.",
    "home.heroDescription": "Build your dream cricket team, compete in exciting contests, and prove your cricket knowledge. Join India's most exciting fantasy cricket platform!",
    "home.startPlaying": "Start Playing",
    "home.learnHowToPlay": "Learn How to Play",
    "home.playersPerTeam": "Players per team",
    "home.buildDreamTeam": "Build Your Dream Team",
    "home.buildDreamTeamDesc": "Select players from both teams, pick your captain and vice-captain wisely, and watch your points soar as they perform on the field!",
    "home.feature1": "Choose from real cricket players with detailed stats",
    "home.feature2": "Captain gets 2x points, Vice-Captain gets 1.5x points",
    "home.feature3": "Create multiple teams for the same match",
    "home.createYourTeam": "Create Your Team",
    "home.whyChoose": "Why Choose Khelosmart?",
    "home.whyChooseDesc": "Experience the thrill of fantasy cricket with India's most trusted platform",
    "home.realTimeScoring": "Real-Time Scoring",
    "home.realTimeScoringDesc": "Every run, every boundary, every wicket - watch your points update live as the action unfolds!",
    "home.strategicGameplay": "Strategic Gameplay",
    "home.strategicGameplayDesc": "Pick the right combination of batsmen, bowlers, and all-rounders to maximize your points.",
    "home.freeToPlayTitle": "Free to Play",
    "home.freeToPlayDesc": "No entry fees, no hidden charges. Play fantasy cricket absolutely free!",
    "home.realTimeUpdates": "Real-Time Updates",
    "home.realTimeUpdatesDesc": "Live scores, instant point calculations, and real-time leaderboards.",
    "home.competeHaveFun": "Compete & Have Fun",
    "home.competeHaveFunDesc": "Join contests, compete with other fans, and climb the leaderboard for bragging rights.",
    "home.safeSecure": "Safe & Secure",
    "home.safeSecureDesc": "Your data is protected with industry-standard security measures.",
    "home.cricketMatches": "Cricket Matches",
    "home.cricketMatchesDesc": "Create your fantasy team for upcoming matches",
    "home.viewAll": "View All",
    "home.failedToLoad": "Failed to load matches. Please try again later.",
    "home.upcoming": "Upcoming",
    "home.live": "Live",
    "home.completed": "Completed",
    "home.noUpcoming": "No upcoming matches at the moment.",
    "home.noLive": "No live matches at the moment.",
    "home.noCompleted": "No completed matches to show.",
    "home.howItWorks": "How It Works",
    "home.howItWorksDesc": "Get started with fantasy cricket in just 3 simple steps",
    "home.step1Title": "Select a Match",
    "home.step1Desc": "Choose from upcoming cricket matches across various tournaments and leagues.",
    "home.step2Title": "Create Your Team",
    "home.step2Desc": "Pick 11 players including batsmen, bowlers, all-rounders, and a wicket-keeper.",
    "home.step3Title": "Join & Compete",
    "home.step3Desc": "Join contests, track live scores, and see your team climb the leaderboard!",
    "home.learnMore": "Learn More",
    "home.ctaTitle": "Ready to Play Fantasy Cricket?",
    "home.ctaDesc": "Join thousands of cricket fans already playing on Khelosmart. Create your account and start building your dream team today!",
    "home.getStarted": "Get Started Now",
  },
  hi: {
    // Common
    "common.home": "होम",
    "common.matches": "मैच",
    "common.contests": "प्रतियोगिताएं",
    "common.myTeams": "मेरी टीमें",
    "common.login": "लॉगिन",
    "common.logout": "लॉगआउट",
    "common.profile": "प्रोफाइल",
    "common.settings": "सेटिंग्स",
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हो गया",
    "common.save": "सेव करें",
    "common.cancel": "रद्द करें",
    "common.submit": "जमा करें",
    "common.back": "वापस",
    "common.next": "अगला",
    "common.search": "खोजें",
    // Match
    "match.live": "लाइव",
    "match.upcoming": "आगामी",
    "match.completed": "पूर्ण",
    "match.createTeam": "टीम बनाएं",
    "match.viewDetails": "विवरण देखें",
    "match.tossWinner": "टॉस विजेता",
    "match.tossChoice": "चुना",
    "match.waitingForToss": "टॉस का इंतजार",
    // Team
    "team.selectPlayers": "खिलाड़ी चुनें",
    "team.captain": "कप्तान",
    "team.viceCaptain": "उप-कप्तान",
    "team.wicketkeeper": "विकेटकीपर",
    "team.batsman": "बल्लेबाज",
    "team.allrounder": "ऑलराउंडर",
    "team.bowler": "गेंदबाज",
    "team.credits": "क्रेडिट",
    "team.playersSelected": "खिलाड़ी चुने गए",
    "team.saveTeam": "टीम सेव करें",
    "team.editTeam": "टीम संपादित करें",
    // Contest
    "contest.joinContest": "प्रतियोगिता में शामिल हों",
    "contest.entryFee": "प्रवेश शुल्क",
    "contest.prizePool": "पुरस्कार राशि",
    "contest.spots": "स्थान",
    "contest.leaderboard": "लीडरबोर्ड",
    // Dashboard
    "dashboard.totalContests": "कुल प्रतियोगिताएं",
    "dashboard.totalPoints": "कुल अंक",
    "dashboard.topFinishes": "शीर्ष स्थान",
    "dashboard.achievements": "उपलब्धियां",
    "dashboard.welcomeBack": "वापसी पर स्वागत है",
    "dashboard.trackJourney": "अपनी फैंटसी क्रिकेट यात्रा ट्रैक करें",
    "dashboard.myContests": "मेरी प्रतियोगिताएं",
    "dashboard.myTeams": "मेरी टीमें",
    "dashboard.noContests": "आपने अभी तक किसी प्रतियोगिता में भाग नहीं लिया है।",
    "dashboard.noTeams": "आपने अभी तक कोई टीम नहीं बनाई है।",
    "dashboard.browseMatches": "मैच देखें",
    "dashboard.createFirstTeam": "अपनी पहली टीम बनाएं",
    "dashboard.players": "खिलाड़ी",
    "dashboard.pts": "अंक",
    "dashboard.rank": "रैंक",
    // Offline
    "offline.youAreOffline": "आप ऑफलाइन हैं",
    "offline.cachedData": "कैश्ड डेटा दिखा रहा है",
    // Home page
    "home.freeToPlay": "100% मुफ्त खेलें",
    "home.heroTitle": "फैंटसी क्रिकेट खेलें।",
    "home.heroSubtitle": "अपनी कौशल परखें।",
    "home.heroDescription": "अपनी ड्रीम क्रिकेट टीम बनाएं, रोमांचक प्रतियोगिताओं में भाग लें, और अपने क्रिकेट ज्ञान को साबित करें। भारत के सबसे रोमांचक फैंटसी क्रिकेट प्लेटफॉर्म से जुड़ें!",
    "home.startPlaying": "खेलना शुरू करें",
    "home.learnHowToPlay": "कैसे खेलें सीखें",
    "home.playersPerTeam": "प्रति टीम खिलाड़ी",
    "home.buildDreamTeam": "अपनी ड्रीम टीम बनाएं",
    "home.buildDreamTeamDesc": "दोनों टीमों से खिलाड़ी चुनें, अपने कप्तान और उप-कप्तान को समझदारी से चुनें, और देखें कि मैदान पर उनके प्रदर्शन के साथ आपके अंक कैसे बढ़ते हैं!",
    "home.feature1": "विस्तृत आंकड़ों के साथ असली क्रिकेट खिलाड़ियों में से चुनें",
    "home.feature2": "कप्तान को 2x अंक, उप-कप्तान को 1.5x अंक मिलते हैं",
    "home.feature3": "एक ही मैच के लिए कई टीमें बनाएं",
    "home.createYourTeam": "अपनी टीम बनाएं",
    "home.whyChoose": "खेलोस्मार्ट क्यों चुनें?",
    "home.whyChooseDesc": "भारत के सबसे भरोसेमंद प्लेटफॉर्म के साथ फैंटसी क्रिकेट का रोमांच अनुभव करें",
    "home.realTimeScoring": "रियल-टाइम स्कोरिंग",
    "home.realTimeScoringDesc": "हर रन, हर चौका, हर विकेट - एक्शन के साथ अपने अंक लाइव अपडेट होते देखें!",
    "home.strategicGameplay": "रणनीतिक गेमप्ले",
    "home.strategicGameplayDesc": "अपने अंक अधिकतम करने के लिए बल्लेबाजों, गेंदबाजों और ऑलराउंडरों का सही संयोजन चुनें।",
    "home.freeToPlayTitle": "मुफ्त खेलें",
    "home.freeToPlayDesc": "कोई प्रवेश शुल्क नहीं, कोई छिपे हुए शुल्क नहीं। बिल्कुल मुफ्त फैंटसी क्रिकेट खेलें!",
    "home.realTimeUpdates": "रियल-टाइम अपडेट",
    "home.realTimeUpdatesDesc": "लाइव स्कोर, तुरंत अंक गणना, और रियल-टाइम लीडरबोर्ड।",
    "home.competeHaveFun": "प्रतिस्पर्धा करें और मज़े करें",
    "home.competeHaveFunDesc": "प्रतियोगिताओं में शामिल हों, अन्य प्रशंसकों के साथ प्रतिस्पर्धा करें, और लीडरबोर्ड पर चढ़ें।",
    "home.safeSecure": "सुरक्षित और संरक्षित",
    "home.safeSecureDesc": "आपका डेटा उद्योग-मानक सुरक्षा उपायों से सुरक्षित है।",
    "home.cricketMatches": "क्रिकेट मैच",
    "home.cricketMatchesDesc": "आगामी मैचों के लिए अपनी फैंटसी टीम बनाएं",
    "home.viewAll": "सभी देखें",
    "home.failedToLoad": "मैच लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।",
    "home.upcoming": "आगामी",
    "home.live": "लाइव",
    "home.completed": "पूर्ण",
    "home.noUpcoming": "इस समय कोई आगामी मैच नहीं।",
    "home.noLive": "इस समय कोई लाइव मैच नहीं।",
    "home.noCompleted": "दिखाने के लिए कोई पूर्ण मैच नहीं।",
    "home.howItWorks": "यह कैसे काम करता है",
    "home.howItWorksDesc": "केवल 3 सरल चरणों में फैंटसी क्रिकेट शुरू करें",
    "home.step1Title": "मैच चुनें",
    "home.step1Desc": "विभिन्न टूर्नामेंट और लीग के आगामी क्रिकेट मैचों में से चुनें।",
    "home.step2Title": "अपनी टीम बनाएं",
    "home.step2Desc": "बल्लेबाज, गेंदबाज, ऑलराउंडर और विकेटकीपर सहित 11 खिलाड़ी चुनें।",
    "home.step3Title": "शामिल हों और प्रतिस्पर्धा करें",
    "home.step3Desc": "प्रतियोगिताओं में शामिल हों, लाइव स्कोर ट्रैक करें, और अपनी टीम को लीडरबोर्ड पर चढ़ते देखें!",
    "home.learnMore": "और जानें",
    "home.ctaTitle": "फैंटसी क्रिकेट खेलने के लिए तैयार?",
    "home.ctaDesc": "हजारों क्रिकेट प्रशंसकों से जुड़ें जो पहले से खेलोस्मार्ट पर खेल रहे हैं। आज ही अपना खाता बनाएं और अपनी ड्रीम टीम बनाना शुरू करें!",
    "home.getStarted": "अभी शुरू करें",
  },
  ta: {
    // Common
    "common.home": "முகப்பு",
    "common.matches": "போட்டிகள்",
    "common.contests": "போட்டிகள்",
    "common.myTeams": "என் அணிகள்",
    "common.login": "உள்நுழை",
    "common.logout": "வெளியேறு",
    "common.profile": "சுயவிவரம்",
    "common.settings": "அமைப்புகள்",
    "common.loading": "ஏற்றுகிறது...",
    "common.error": "ஏதோ தவறு நடந்தது",
    "common.save": "சேமி",
    "common.cancel": "ரத்து",
    "common.submit": "சமர்ப்பி",
    "common.back": "பின்",
    "common.next": "அடுத்து",
    "common.search": "தேடு",
    // Match
    "match.live": "நேரலை",
    "match.upcoming": "வரவிருக்கும்",
    "match.completed": "முடிந்தது",
    "match.createTeam": "அணி உருவாக்கு",
    "match.viewDetails": "விவரங்கள்",
    "match.tossWinner": "டாஸ் வெற்றி",
    "match.tossChoice": "தேர்வு",
    "match.waitingForToss": "டாஸ் காத்திருக்கிறது",
    // Team
    "team.selectPlayers": "வீரர்களைத் தேர்வு",
    "team.captain": "கேப்டன்",
    "team.viceCaptain": "துணை கேப்டன்",
    "team.wicketkeeper": "விக்கெட் கீப்பர்",
    "team.batsman": "பேட்ஸ்மேன்",
    "team.allrounder": "ஆல்ரவுண்டர்",
    "team.bowler": "பவுலர்",
    "team.credits": "கிரெடிட்",
    "team.playersSelected": "வீரர்கள் தேர்வு",
    "team.saveTeam": "அணி சேமி",
    "team.editTeam": "அணி திருத்து",
    // Contest
    "contest.joinContest": "போட்டியில் சேர்",
    "contest.entryFee": "நுழைவு கட்டணம்",
    "contest.prizePool": "பரிசு தொகை",
    "contest.spots": "இடங்கள்",
    "contest.leaderboard": "தரவரிசை",
    // Dashboard
    "dashboard.totalContests": "மொத்த போட்டிகள்",
    "dashboard.totalPoints": "மொத்த புள்ளிகள்",
    "dashboard.topFinishes": "சிறந்த முடிவுகள்",
    "dashboard.achievements": "சாதனைகள்",
    "dashboard.welcomeBack": "மீண்டும் வரவேற்கிறோம்",
    "dashboard.trackJourney": "உங்கள் பேண்டசி கிரிக்கெட் பயணத்தை கண்காணியுங்கள்",
    "dashboard.myContests": "என் போட்டிகள்",
    "dashboard.myTeams": "என் அணிகள்",
    "dashboard.noContests": "நீங்கள் இன்னும் எந்த போட்டியிலும் சேரவில்லை.",
    "dashboard.noTeams": "நீங்கள் இன்னும் எந்த அணியும் உருவாக்கவில்லை.",
    "dashboard.browseMatches": "போட்டிகளை பார்க்க",
    "dashboard.createFirstTeam": "உங்கள் முதல் அணியை உருவாக்குங்கள்",
    "dashboard.players": "வீரர்கள்",
    "dashboard.pts": "புள்ளிகள்",
    "dashboard.rank": "தரவரிசை",
    // Offline
    "offline.youAreOffline": "நீங்கள் ஆஃப்லைனில்",
    "offline.cachedData": "தற்காலிக தரவு",
    // Home page
    "home.freeToPlay": "100% இலவசம்",
    "home.heroTitle": "பேண்டசி கிரிக்கெட் விளையாடுங்கள்.",
    "home.heroSubtitle": "உங்கள் திறமையை சோதியுங்கள்.",
    "home.heroDescription": "உங்கள் கனவு கிரிக்கெட் அணியை உருவாக்குங்கள், அற்புதமான போட்டிகளில் பங்கேற்று, உங்கள் கிரிக்கெட் அறிவை நிரூபியுங்கள்!",
    "home.startPlaying": "விளையாட தொடங்கு",
    "home.learnHowToPlay": "எப்படி விளையாடுவது கற்றுக்கொள்",
    "home.playersPerTeam": "அணிக்கு வீரர்கள்",
    "home.buildDreamTeam": "உங்கள் கனவு அணியை உருவாக்குங்கள்",
    "home.buildDreamTeamDesc": "இரு அணிகளிலிருந்தும் வீரர்களைத் தேர்வு செய்து, உங்கள் கேப்டன் மற்றும் துணை கேப்டனை புத்திசாலித்தனமாக தேர்வு செய்யுங்கள்!",
    "home.feature1": "விரிவான புள்ளிவிவரங்களுடன் உண்மையான கிரிக்கெட் வீரர்களிலிருந்து தேர்வு செய்யுங்கள்",
    "home.feature2": "கேப்டனுக்கு 2x புள்ளிகள், துணை கேப்டனுக்கு 1.5x புள்ளிகள்",
    "home.feature3": "ஒரே போட்டிக்கு பல அணிகளை உருவாக்குங்கள்",
    "home.createYourTeam": "உங்கள் அணியை உருவாக்குங்கள்",
    "home.whyChoose": "ஏன் கேலோஸ்மார்ட்?",
    "home.whyChooseDesc": "இந்தியாவின் மிகவும் நம்பகமான தளத்துடன் பேண்டசி கிரிக்கெட்டின் சிலிர்ப்பை அனுபவியுங்கள்",
    "home.realTimeScoring": "நேரடி ஸ்கோரிங்",
    "home.realTimeScoringDesc": "ஒவ்வொரு ரன், ஒவ்வொரு பவுண்டரி, ஒவ்வொரு விக்கெட் - உங்கள் புள்ளிகள் நேரடியாக புதுப்பிக்கப்படுவதைப் பாருங்கள்!",
    "home.strategicGameplay": "உத்தி விளையாட்டு",
    "home.strategicGameplayDesc": "உங்கள் புள்ளிகளை அதிகரிக்க பேட்ஸ்மேன், பவுலர்கள் மற்றும் ஆல்ரவுண்டர்களின் சரியான கலவையைத் தேர்வு செய்யுங்கள்.",
    "home.freeToPlayTitle": "இலவசமாக விளையாடுங்கள்",
    "home.freeToPlayDesc": "நுழைவு கட்டணம் இல்லை, மறைந்த கட்டணங்கள் இல்லை. முற்றிலும் இலவசமாக பேண்டசி கிரிக்கெட் விளையாடுங்கள்!",
    "home.realTimeUpdates": "நேரடி புதுப்பிப்புகள்",
    "home.realTimeUpdatesDesc": "நேரடி ஸ்கோர்கள், உடனடி புள்ளி கணக்கீடுகள், மற்றும் நேரடி தரவரிசைகள்.",
    "home.competeHaveFun": "போட்டியிடுங்கள் & மகிழுங்கள்",
    "home.competeHaveFunDesc": "போட்டிகளில் சேருங்கள், மற்ற ரசிகர்களுடன் போட்டியிடுங்கள், தரவரிசையில் ஏறுங்கள்.",
    "home.safeSecure": "பாதுகாப்பான & சுரக்ஷிதமான",
    "home.safeSecureDesc": "உங்கள் தரவு தொழில்துறை-தரமான பாதுகாப்பு நடவடிக்கைகளால் பாதுகாக்கப்படுகிறது.",
    "home.cricketMatches": "கிரிக்கெட் போட்டிகள்",
    "home.cricketMatchesDesc": "வரவிருக்கும் போட்டிகளுக்கு உங்கள் பேண்டசி அணியை உருவாக்குங்கள்",
    "home.viewAll": "அனைத்தையும் காண்",
    "home.failedToLoad": "போட்டிகளை ஏற்ற முடியவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
    "home.upcoming": "வரவிருக்கும்",
    "home.live": "நேரலை",
    "home.completed": "முடிந்தது",
    "home.noUpcoming": "தற்போது வரவிருக்கும் போட்டிகள் இல்லை.",
    "home.noLive": "தற்போது நேரடி போட்டிகள் இல்லை.",
    "home.noCompleted": "காட்ட முடிந்த போட்டிகள் இல்லை.",
    "home.howItWorks": "இது எப்படி வேலை செய்கிறது",
    "home.howItWorksDesc": "3 எளிய படிகளில் பேண்டசி கிரிக்கெட்டைத் தொடங்குங்கள்",
    "home.step1Title": "போட்டியைத் தேர்வு செய்யுங்கள்",
    "home.step1Desc": "பல்வேறு போட்டிகள் மற்றும் லீக்குகளின் வரவிருக்கும் கிரிக்கெட் போட்டிகளிலிருந்து தேர்வு செய்யுங்கள்.",
    "home.step2Title": "உங்கள் அணியை உருவாக்குங்கள்",
    "home.step2Desc": "பேட்ஸ்மேன், பவுலர்கள், ஆல்ரவுண்டர்கள் மற்றும் விக்கெட் கீப்பர் உட்பட 11 வீரர்களைத் தேர்வு செய்யுங்கள்.",
    "home.step3Title": "சேர்ந்து போட்டியிடுங்கள்",
    "home.step3Desc": "போட்டிகளில் சேருங்கள், நேரடி ஸ்கோர்களைக் கண்காணியுங்கள், உங்கள் அணி தரவரிசையில் ஏறுவதைப் பாருங்கள்!",
    "home.learnMore": "மேலும் அறிய",
    "home.ctaTitle": "பேண்டசி கிரிக்கெட் விளையாட தயாரா?",
    "home.ctaDesc": "ஏற்கனவே கேலோஸ்மார்ட்டில் விளையாடும் ஆயிரக்கணக்கான கிரிக்கெட் ரசிகர்களுடன் சேருங்கள். இன்றே உங்கள் கணக்கை உருவாக்கி உங்கள் கனவு அணியை உருவாக்கத் தொடங்குங்கள்!",
    "home.getStarted": "இப்போதே தொடங்குங்கள்",
  },
  te: {
    // Common
    "common.home": "హోమ్",
    "common.matches": "మ్యాచ్‌లు",
    "common.contests": "పోటీలు",
    "common.myTeams": "నా జట్లు",
    "common.login": "లాగిన్",
    "common.logout": "లాగౌట్",
    "common.profile": "ప్రొఫైల్",
    "common.settings": "సెట్టింగ్‌లు",
    "common.loading": "లోడ్ అవుతోంది...",
    "common.error": "ఏదో తప్పు జరిగింది",
    "common.save": "సేవ్",
    "common.cancel": "రద్దు",
    "common.submit": "సమర్పించు",
    "common.back": "వెనుకకు",
    "common.next": "తదుపరి",
    "common.search": "వెతుకు",
    // Match
    "match.live": "లైవ్",
    "match.upcoming": "రాబోయే",
    "match.completed": "పూర్తయింది",
    "match.createTeam": "జట్టు సృష్టించు",
    "match.viewDetails": "వివరాలు చూడండి",
    "match.tossWinner": "టాస్ విజేత",
    "match.tossChoice": "ఎంపిక",
    "match.waitingForToss": "టాస్ కోసం వేచి",
    // Team
    "team.selectPlayers": "ఆటగాళ్ళను ఎంచుకో",
    "team.captain": "కెప్టెన్",
    "team.viceCaptain": "వైస్ కెప్టెన్",
    "team.wicketkeeper": "వికెట్ కీపర్",
    "team.batsman": "బ్యాట్స్‌మన్",
    "team.allrounder": "ఆల్‌రౌండర్",
    "team.bowler": "బౌలర్",
    "team.credits": "క్రెడిట్స్",
    "team.playersSelected": "ఆటగాళ్ళు ఎంపిక",
    "team.saveTeam": "జట్టు సేవ్",
    "team.editTeam": "జట్టు మార్చు",
    // Contest
    "contest.joinContest": "పోటీలో చేరు",
    "contest.entryFee": "ప్రవేశ రుసుము",
    "contest.prizePool": "బహుమతి మొత్తం",
    "contest.spots": "స్థానాలు",
    "contest.leaderboard": "లీడర్‌బోర్డ్",
    // Dashboard
    "dashboard.totalContests": "మొత్తం పోటీలు",
    "dashboard.totalPoints": "మొత్తం పాయింట్లు",
    "dashboard.topFinishes": "టాప్ ఫినిషెస్",
    "dashboard.achievements": "సాధనలు",
    "dashboard.welcomeBack": "తిరిగి స్వాగతం",
    "dashboard.trackJourney": "మీ ఫాంటసీ క్రికెట్ ప్రయాణాన్ని ట్రాక్ చేయండి",
    "dashboard.myContests": "నా పోటీలు",
    "dashboard.myTeams": "నా జట్లు",
    "dashboard.noContests": "మీరు ఇంకా ఎటువంటి పోటీలో చేరలేదు.",
    "dashboard.noTeams": "మీరు ఇంకా ఎటువంటి జట్లను సృష్టించలేదు.",
    "dashboard.browseMatches": "మ్యాచ్‌లు చూడండి",
    "dashboard.createFirstTeam": "మీ మొదటి జట్టును సృష్టించండి",
    "dashboard.players": "ఆటగాళ్ళు",
    "dashboard.pts": "పాయింట్లు",
    "dashboard.rank": "ర్యాంక్",
    // Offline
    "offline.youAreOffline": "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు",
    "offline.cachedData": "కాష్ చేసిన డేటా",
    // Home page
    "home.freeToPlay": "100% ఉచితం",
    "home.heroTitle": "ఫాంటసీ క్రికెట్ ఆడండి.",
    "home.heroSubtitle": "మీ నైపుణ్యాన్ని పరీక్షించండి.",
    "home.heroDescription": "మీ కలల క్రికెట్ జట్టును నిర్మించండి, ఉత్తేజకరమైన పోటీలలో పాల్గొనండి, మీ క్రికెట్ జ్ఞానాన్ని నిరూపించండి!",
    "home.startPlaying": "ఆడటం ప్రారంభించండి",
    "home.learnHowToPlay": "ఎలా ఆడాలో నేర్చుకోండి",
    "home.playersPerTeam": "జట్టుకు ఆటగాళ్ళు",
    "home.buildDreamTeam": "మీ కలల జట్టును నిర్మించండి",
    "home.buildDreamTeamDesc": "రెండు జట్ల నుండి ఆటగాళ్ళను ఎంచుకోండి, మీ కెప్టెన్ మరియు వైస్ కెప్టెన్‌ను తెలివిగా ఎంచుకోండి!",
    "home.feature1": "వివరమైన గణాంకాలతో నిజమైన క్రికెట్ ఆటగాళ్ళ నుండి ఎంచుకోండి",
    "home.feature2": "కెప్టెన్‌కు 2x పాయింట్లు, వైస్ కెప్టెన్‌కు 1.5x పాయింట్లు",
    "home.feature3": "ఒకే మ్యాచ్‌కు బహుళ జట్లను సృష్టించండి",
    "home.createYourTeam": "మీ జట్టును సృష్టించండి",
    "home.whyChoose": "ఖేలోస్మార్ట్ ఎందుకు?",
    "home.whyChooseDesc": "భారతదేశంలో అత్యంత నమ్మకమైన ప్లాట్‌ఫారమ్‌తో ఫాంటసీ క్రికెట్ థ్రిల్‌ను అనుభవించండి",
    "home.realTimeScoring": "రియల్-టైమ్ స్కోరింగ్",
    "home.realTimeScoringDesc": "ప్రతి రన్, ప్రతి బౌండరీ, ప్రతి వికెట్ - మీ పాయింట్లు లైవ్‌గా అప్‌డేట్ అవడం చూడండి!",
    "home.strategicGameplay": "వ్యూహాత్మక గేమ్‌ప్లే",
    "home.strategicGameplayDesc": "మీ పాయింట్లను గరిష్టం చేయడానికి బ్యాట్స్‌మెన్, బౌలర్లు మరియు ఆల్‌రౌండర్ల సరైన కలయికను ఎంచుకోండి.",
    "home.freeToPlayTitle": "ఉచితంగా ఆడండి",
    "home.freeToPlayDesc": "ప్రవేశ రుసుము లేదు, దాచిన ఛార్జీలు లేవు. పూర్తిగా ఉచితంగా ఫాంటసీ క్రికెట్ ఆడండి!",
    "home.realTimeUpdates": "రియల్-టైమ్ అప్‌డేట్‌లు",
    "home.realTimeUpdatesDesc": "లైవ్ స్కోర్లు, తక్షణ పాయింట్ లెక్కింపులు, మరియు రియల్-టైమ్ లీడర్‌బోర్డ్‌లు.",
    "home.competeHaveFun": "పోటీపడండి & ఆనందించండి",
    "home.competeHaveFunDesc": "పోటీలలో చేరండి, ఇతర అభిమానులతో పోటీపడండి, లీడర్‌బోర్డ్‌లో ఎక్కండి.",
    "home.safeSecure": "సురక్షితమైన & భద్రమైన",
    "home.safeSecureDesc": "మీ డేటా పరిశ్రమ-ప్రమాణ భద్రతా చర్యలతో రక్షించబడింది.",
    "home.cricketMatches": "క్రికెట్ మ్యాచ్‌లు",
    "home.cricketMatchesDesc": "రాబోయే మ్యాచ్‌లకు మీ ఫాంటసీ జట్టును సృష్టించండి",
    "home.viewAll": "అన్నీ చూడండి",
    "home.failedToLoad": "మ్యాచ్‌లను లోడ్ చేయడం విఫలమైంది. దయచేసి తర్వాత మళ్ళీ ప్రయత్నించండి.",
    "home.upcoming": "రాబోయే",
    "home.live": "లైవ్",
    "home.completed": "పూర్తయింది",
    "home.noUpcoming": "ప్రస్తుతం రాబోయే మ్యాచ్‌లు లేవు.",
    "home.noLive": "ప్రస్తుతం లైవ్ మ్యాచ్‌లు లేవు.",
    "home.noCompleted": "చూపించడానికి పూర్తయిన మ్యాచ్‌లు లేవు.",
    "home.howItWorks": "ఇది ఎలా పని చేస్తుంది",
    "home.howItWorksDesc": "కేవలం 3 సులభమైన దశల్లో ఫాంటసీ క్రికెట్ ప్రారంభించండి",
    "home.step1Title": "మ్యాచ్ ఎంచుకోండి",
    "home.step1Desc": "వివిధ టోర్నమెంట్లు మరియు లీగ్‌ల నుండి రాబోయే క్రికెట్ మ్యాచ్‌లలో ఎంచుకోండి.",
    "home.step2Title": "మీ జట్టును సృష్టించండి",
    "home.step2Desc": "బ్యాట్స్‌మెన్, బౌలర్లు, ఆల్‌రౌండర్లు మరియు వికెట్ కీపర్‌తో సహా 11 ఆటగాళ్ళను ఎంచుకోండి.",
    "home.step3Title": "చేరండి & పోటీపడండి",
    "home.step3Desc": "పోటీలలో చేరండి, లైవ్ స్కోర్లను ట్రాక్ చేయండి, మీ జట్టు లీడర్‌బోర్డ్‌లో ఎక్కడం చూడండి!",
    "home.learnMore": "మరింత తెలుసుకోండి",
    "home.ctaTitle": "ఫాంటసీ క్రికెట్ ఆడటానికి సిద్ధంగా ఉన్నారా?",
    "home.ctaDesc": "ఇప్పటికే ఖేలోస్మార్ట్‌లో ఆడుతున్న వేలాది క్రికెట్ అభిమానులతో చేరండి. ఈ రోజే మీ ఖాతాను సృష్టించి మీ కలల జట్టును నిర్మించడం ప్రారంభించండి!",
    "home.getStarted": "ఇప్పుడే ప్రారంభించండి",
  },
  bn: {
    // Common
    "common.home": "হোম",
    "common.matches": "ম্যাচ",
    "common.contests": "প্রতিযোগিতা",
    "common.myTeams": "আমার দল",
    "common.login": "লগইন",
    "common.logout": "লগআউট",
    "common.profile": "প্রোফাইল",
    "common.settings": "সেটিংস",
    "common.loading": "লোড হচ্ছে...",
    "common.error": "কিছু ভুল হয়েছে",
    "common.save": "সংরক্ষণ",
    "common.cancel": "বাতিল",
    "common.submit": "জমা দিন",
    "common.back": "পিছনে",
    "common.next": "পরবর্তী",
    "common.search": "অনুসন্ধান",
    // Match
    "match.live": "লাইভ",
    "match.upcoming": "আসন্ন",
    "match.completed": "সম্পন্ন",
    "match.createTeam": "দল তৈরি করুন",
    "match.viewDetails": "বিস্তারিত দেখুন",
    "match.tossWinner": "টস বিজয়ী",
    "match.tossChoice": "বেছে নিয়েছে",
    "match.waitingForToss": "টসের অপেক্ষায়",
    // Team
    "team.selectPlayers": "খেলোয়াড় নির্বাচন",
    "team.captain": "অধিনায়ক",
    "team.viceCaptain": "সহ-অধিনায়ক",
    "team.wicketkeeper": "উইকেটকিপার",
    "team.batsman": "ব্যাটসম্যান",
    "team.allrounder": "অলরাউন্ডার",
    "team.bowler": "বোলার",
    "team.credits": "ক্রেডিট",
    "team.playersSelected": "খেলোয়াড় নির্বাচিত",
    "team.saveTeam": "দল সংরক্ষণ",
    "team.editTeam": "দল সম্পাদনা",
    // Contest
    "contest.joinContest": "প্রতিযোগিতায় যোগ দিন",
    "contest.entryFee": "প্রবেশ ফি",
    "contest.prizePool": "পুরস্কার পুল",
    "contest.spots": "স্থান",
    "contest.leaderboard": "লিডারবোর্ড",
// Dashboard
    "dashboard.totalContests": "মোট প্রতিযোগিতা",
    "dashboard.totalPoints": "মোট পয়েন্ট",
    "dashboard.topFinishes": "সেরা ফিনিশ",
    "dashboard.achievements": "অর্জন",
    "dashboard.welcomeBack": "ফিরে স্বাগতম",
    "dashboard.trackJourney": "আপনার ফ্যান্টাসি ক্রিকেট যাত্রা ট্র্যাক করুন",
    "dashboard.myContests": "আমার প্রতিযোগিতা",
    "dashboard.myTeams": "আমার দল",
    "dashboard.noContests": "আপনি এখনও কোনও প্রতিযোগিতায় যোগ দেননি।",
    "dashboard.noTeams": "আপনি এখনও কোনও দল তৈরি করেননি।",
    "dashboard.browseMatches": "ম্যাচ দেখুন",
    "dashboard.createFirstTeam": "আপনার প্রথম দল তৈরি করুন",
    "dashboard.players": "খেলোয়াড়",
    "dashboard.pts": "পয়েন্ট",
    "dashboard.rank": "র্যাঙ্ক",
    // Offline
    "offline.youAreOffline": "আপনি অফলাইনে আছেন",
    "offline.cachedData": "ক্যাশড ডেটা দেখাচ্ছে",
    // Home page
    "home.freeToPlay": "100% বিনামূল্যে",
    "home.heroTitle": "ফ্যান্টাসি ক্রিকেট খেলুন।",
    "home.heroSubtitle": "আপনার দক্ষতা পরীক্ষা করুন।",
    "home.heroDescription": "আপনার স্বপ্নের ক্রিকেট দল তৈরি করুন, উত্তেজনাপূর্ণ প্রতিযোগিতায় অংশ নিন, এবং আপনার ক্রিকেট জ্ঞান প্রমাণ করুন!",
    "home.startPlaying": "খেলা শুরু করুন",
    "home.learnHowToPlay": "কীভাবে খেলবেন শিখুন",
    "home.playersPerTeam": "প্রতি দলে খেলোয়াড়",
    "home.buildDreamTeam": "আপনার স্বপ্নের দল তৈরি করুন",
    "home.buildDreamTeamDesc": "উভয় দল থেকে খেলোয়াড় নির্বাচন করুন, আপনার অধিনায়ক এবং সহ-অধিনায়ক বুদ্ধিমানের সাথে বেছে নিন!",
    "home.feature1": "বিস্তারিত পরিসংখ্যান সহ প্রকৃত ক্রিকেট খেলোয়াড়দের থেকে বেছে নিন",
    "home.feature2": "অধিনায়ক 2x পয়েন্ট পান, সহ-অধিনায়ক 1.5x পয়েন্ট পান",
    "home.feature3": "একই ম্যাচের জন্য একাধিক দল তৈরি করুন",
    "home.createYourTeam": "আপনার দল তৈরি করুন",
    "home.whyChoose": "কেন খেলোস্মার্ট?",
    "home.whyChooseDesc": "ভারতের সবচেয়ে বিশ্বস্ত প্ল্যাটফর্মের সাথে ফ্যান্টাসি ক্রিকেটের রোমাঞ্চ অনুভব করুন",
    "home.realTimeScoring": "রিয়েল-টাইম স্কোরিং",
    "home.realTimeScoringDesc": "প্রতিটি রান, প্রতিটি বাউন্ডারি, প্রতিটি উইকেট - আপনার পয়েন্ট লাইভ আপডেট হতে দেখুন!",
    "home.strategicGameplay": "কৌশলগত গেমপ্লে",
    "home.strategicGameplayDesc": "আপনার পয়েন্ট সর্বাধিক করতে ব্যাটসম্যান, বোলার এবং অলরাউন্ডারদের সঠিক সমন্বয় বেছে নিন।",
    "home.freeToPlayTitle": "বিনামূল্যে খেলুন",
    "home.freeToPlayDesc": "কোনো প্রবেশ ফি নেই, কোনো লুকানো চার্জ নেই। সম্পূর্ণ বিনামূল্যে ফ্যান্টাসি ক্রিকেট খেলুন!",
    "home.realTimeUpdates": "রিয়েল-টাইম আপডেট",
    "home.realTimeUpdatesDesc": "লাইভ স্কোর, তাৎক্ষণিক পয়েন্ট গণনা, এবং রিয়েল-টাইম লিডারবোর্ড।",
    "home.competeHaveFun": "প্রতিযোগিতা করুন ও মজা করুন",
    "home.competeHaveFunDesc": "প্রতিযোগিতায় যোগ দিন, অন্যান্য ভক্তদের সাথে প্রতিযোগিতা করুন, লিডারবোর্ডে উঠুন।",
    "home.safeSecure": "নিরাপদ ও সুরক্ষিত",
    "home.safeSecureDesc": "আপনার ডেটা শিল্প-মানের নিরাপত্তা ব্যবস্থা দ্বারা সুরক্ষিত।",
    "home.cricketMatches": "ক্রিকেট ম্যাচ",
    "home.cricketMatchesDesc": "আসন্ন ম্যাচের জন্য আপনার ফ্যান্টাসি দল তৈরি করুন",
    "home.viewAll": "সব দেখুন",
    "home.failedToLoad": "ম্যাচ লোড করতে ব্যর্থ। পরে আবার চেষ্টা করুন।",
    "home.upcoming": "আসন্ন",
    "home.live": "লাইভ",
    "home.completed": "সম্পন্ন",
    "home.noUpcoming": "এই মুহূর্তে কোনো আসন্ন ম্যাচ নেই।",
    "home.noLive": "এই মুহূর্তে কোনো লাইভ ম্যাচ নেই।",
    "home.noCompleted": "দেখানোর জন্য কোনো সম্পন্ন ম্যাচ নেই।",
    "home.howItWorks": "এটি কীভাবে কাজ করে",
    "home.howItWorksDesc": "মাত্র 3টি সহজ ধাপে ফ্যান্টাসি ক্রিকেট শুরু করুন",
    "home.step1Title": "ম্যাচ নির্বাচন করুন",
    "home.step1Desc": "বিভিন্ন টুর্নামেন্ট এবং লিগের আসন্ন ক্রিকেট ম্যাচ থেকে বেছে নিন।",
    "home.step2Title": "আপনার দল তৈরি করুন",
    "home.step2Desc": "ব্যাটসম্যান, বোলার, অলরাউন্ডার এবং উইকেটকিপার সহ 11 জন খেলোয়াড় বেছে নিন।",
    "home.step3Title": "যোগ দিন ও প্রতিযোগিতা করুন",
    "home.step3Desc": "প্রতিযোগিতায় যোগ দিন, লাইভ স্কোর ট্র্যাক করুন, আপনার দল লিডারবোর্ডে উঠতে দেখুন!",
    "home.learnMore": "আরও জানুন",
    "home.ctaTitle": "ফ্যান্টাসি ক্রিকেট খেলতে প্রস্তুত?",
    "home.ctaDesc": "ইতিমধ্যে খেলোস্মার্টে খেলছেন এমন হাজার হাজার ক্রিকেট ভক্তদের সাথে যোগ দিন। আজই আপনার অ্যাকাউন্ট তৈরি করুন এবং আপনার স্বপ্নের দল তৈরি শুরু করুন!",
    "home.getStarted": "এখনই শুরু করুন",
  },
  mr: {
    // Common
    "common.home": "होम",
    "common.matches": "सामने",
    "common.contests": "स्पर्धा",
    "common.myTeams": "माझे संघ",
    "common.login": "लॉगिन",
    "common.logout": "लॉगआउट",
    "common.profile": "प्रोफाइल",
    "common.settings": "सेटिंग्ज",
    "common.loading": "लोड होत आहे...",
    "common.error": "काहीतरी चूक झाली",
    "common.save": "सेव्ह करा",
    "common.cancel": "रद्द करा",
    "common.submit": "सबमिट करा",
    "common.back": "मागे",
    "common.next": "पुढे",
    "common.search": "शोधा",
    // Match
    "match.live": "लाइव्ह",
    "match.upcoming": "आगामी",
    "match.completed": "पूर्ण",
    "match.createTeam": "संघ तयार करा",
    "match.viewDetails": "तपशील पहा",
    "match.tossWinner": "टॉस विजेता",
    "match.tossChoice": "निवडले",
    "match.waitingForToss": "टॉसची वाट पाहत आहे",
    // Team
    "team.selectPlayers": "खेळाडू निवडा",
    "team.captain": "कर्णधार",
    "team.viceCaptain": "उप-कर्णधार",
    "team.wicketkeeper": "विकेटकीपर",
    "team.batsman": "फलंदाज",
    "team.allrounder": "अष्टपैलू",
    "team.bowler": "गोलंदाज",
    "team.credits": "क्रेडिट्स",
    "team.playersSelected": "खेळाडू निवडले",
    "team.saveTeam": "संघ सेव्ह करा",
    "team.editTeam": "संघ संपादित करा",
    // Contest
    "contest.joinContest": "स्पर्धेत सामील व्हा",
    "contest.entryFee": "प्रवेश शुल्क",
    "contest.prizePool": "बक्षीस रक्कम",
    "contest.spots": "जागा",
    "contest.leaderboard": "लीडरबोर्ड",
    // Dashboard
    "dashboard.totalContests": "एकूण स्पर्धा",
    "dashboard.totalPoints": "एकूण गुण",
    "dashboard.topFinishes": "सर्वोत्तम स्थान",
    "dashboard.achievements": "कामगिरी",
    "dashboard.welcomeBack": "पुन्हा स्वागत आहे",
    "dashboard.trackJourney": "तुमच्या फॅन्टसी क्रिकेट प्रवासाचा मागोवा घ्या",
    "dashboard.myContests": "माझ्या स्पर्धा",
    "dashboard.myTeams": "माझे संघ",
    "dashboard.noContests": "तुम्ही अजून कोणत्याही स्पर्धेत सामील झालेला नाही.",
    "dashboard.noTeams": "तुम्ही अजून कोणताही संघ तयार केलेला नाही.",
    "dashboard.browseMatches": "सामने पहा",
    "dashboard.createFirstTeam": "तुमचा पहिला संघ तयार करा",
    "dashboard.players": "खेळाडू",
    "dashboard.pts": "गुण",
    "dashboard.rank": "रँक",
    // Offline
    "offline.youAreOffline": "तुम्ही ऑफलाइन आहात",
    "offline.cachedData": "कॅश केलेला डेटा",
    // Home page
    "home.freeToPlay": "100% मोफत",
    "home.heroTitle": "फॅन्टसी क्रिकेट खेळा.",
    "home.heroSubtitle": "तुमचे कौशल्य तपासा.",
    "home.heroDescription": "तुमचा स्वप्नातील क्रिकेट संघ तयार करा, रोमांचक स्पर्धांमध्ये भाग घ्या, आणि तुमचे क्रिकेट ज्ञान सिद्ध करा!",
    "home.startPlaying": "खेळायला सुरुवात करा",
    "home.learnHowToPlay": "कसे खेळायचे ते शिका",
    "home.playersPerTeam": "प्रति संघ खेळाडू",
    "home.buildDreamTeam": "तुमचा स्वप्नातील संघ तयार करा",
    "home.buildDreamTeamDesc": "दोन्ही संघांमधून खेळाडू निवडा, तुमचा कर्णधार आणि उप-कर्णधार शहाणपणाने निवडा!",
    "home.feature1": "तपशीलवार आकडेवारीसह खऱ्या क्रिकेट खेळाडूंमधून निवडा",
    "home.feature2": "कर्णधाराला 2x गुण, उप-कर्णधाराला 1.5x गुण मिळतात",
    "home.feature3": "एकाच सामन्यासाठी अनेक संघ तयार करा",
    "home.createYourTeam": "तुमचा संघ तयार करा",
    "home.whyChoose": "खेलोस्मार्ट का?",
    "home.whyChooseDesc": "भारतातील सर्वात विश्वासार्ह प्लॅटफॉर्मसह फॅन्टसी क्रिकेटचा थरार अनुभवा",
    "home.realTimeScoring": "रिअल-टाइम स्कोरिंग",
    "home.realTimeScoringDesc": "प्रत्येक धाव, प्रत्येक चौकार, प्रत्येक विकेट - तुमचे गुण लाइव्ह अपडेट होताना पहा!",
    "home.strategicGameplay": "धोरणात्मक गेमप्ले",
    "home.strategicGameplayDesc": "तुमचे गुण जास्तीत जास्त करण्यासाठी फलंदाज, गोलंदाज आणि अष्टपैलूंचे योग्य संयोजन निवडा.",
    "home.freeToPlayTitle": "मोफत खेळा",
    "home.freeToPlayDesc": "प्रवेश शुल्क नाही, लपलेले शुल्क नाही. पूर्णपणे मोफत फॅन्टसी क्रिकेट खेळा!",
    "home.realTimeUpdates": "रिअल-टाइम अपडेट्स",
    "home.realTimeUpdatesDesc": "लाइव्ह स्कोअर, त्वरित गुण गणना, आणि रिअल-टाइम लीडरबोर्ड.",
    "home.competeHaveFun": "स्पर्धा करा आणि मजा करा",
    "home.competeHaveFunDesc": "स्पर्धांमध्ये सामील व्हा, इतर चाहत्यांशी स्पर्धा करा, लीडरबोर्डवर चढा.",
    "home.safeSecure": "सुरक्षित आणि संरक्षित",
    "home.safeSecureDesc": "तुमचा डेटा उद्योग-मानक सुरक्षा उपायांनी संरक्षित आहे.",
    "home.cricketMatches": "क्रिकेट सामने",
    "home.cricketMatchesDesc": "आगामी सामन्यांसाठी तुमचा फॅन्टसी संघ तयार करा",
    "home.viewAll": "सर्व पहा",
    "home.failedToLoad": "सामने लोड करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.",
    "home.upcoming": "आगामी",
    "home.live": "लाइव्ह",
    "home.completed": "पूर्ण",
    "home.noUpcoming": "सध्या कोणतेही आगामी सामने नाहीत.",
    "home.noLive": "सध्या कोणतेही लाइव्ह सामने नाहीत.",
    "home.noCompleted": "दाखवण्यासाठी कोणतेही पूर्ण सामने नाहीत.",
    "home.howItWorks": "हे कसे कार्य करते",
    "home.howItWorksDesc": "फक्त 3 सोप्या चरणांमध्ये फॅन्टसी क्रिकेट सुरू करा",
    "home.step1Title": "सामना निवडा",
    "home.step1Desc": "विविध स्पर्धा आणि लीगमधील आगामी क्रिकेट सामन्यांमधून निवडा.",
    "home.step2Title": "तुमचा संघ तयार करा",
    "home.step2Desc": "फलंदाज, गोलंदाज, अष्टपैलू आणि विकेटकीपरसह 11 खेळाडू निवडा.",
    "home.step3Title": "सामील व्हा आणि स्पर्धा करा",
    "home.step3Desc": "स्पर्धांमध्ये सामील व्हा, लाइव्ह स्कोअर ट्रॅक करा, तुमचा संघ लीडरबोर्डवर चढताना पहा!",
    "home.learnMore": "अधिक जाणून घ्या",
    "home.ctaTitle": "फॅन्टसी क्रिकेट खेळायला तयार?",
    "home.ctaDesc": "आधीच खेलोस्मार्टवर खेळत असलेल्या हजारो क्रिकेट चाहत्यांमध्ये सामील व्हा. आजच तुमचे खाते तयार करा आणि तुमचा स्वप्नातील संघ तयार करायला सुरुवात करा!",
    "home.getStarted": "आत्ताच सुरू करा",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("khelosmart_language");
      if (saved && saved in LANGUAGES) {
        return saved as Language;
      }
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("khelosmart_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Export TranslationKey type for use in other components
export type { TranslationKey };
