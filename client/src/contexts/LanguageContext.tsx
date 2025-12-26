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

// Translation keys
type TranslationKey = 
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
  | "match.live"
  | "match.upcoming"
  | "match.completed"
  | "match.createTeam"
  | "match.viewDetails"
  | "match.tossWinner"
  | "match.tossChoice"
  | "match.waitingForToss"
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
  | "contest.joinContest"
  | "contest.entryFee"
  | "contest.prizePool"
  | "contest.spots"
  | "contest.leaderboard"
  | "dashboard.totalContests"
  | "dashboard.totalPoints"
  | "dashboard.topFinishes"
  | "dashboard.achievements"
  | "offline.youAreOffline"
  | "offline.cachedData";

// Translations
const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
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
    "match.live": "Live",
    "match.upcoming": "Upcoming",
    "match.completed": "Completed",
    "match.createTeam": "Create Team",
    "match.viewDetails": "View Details",
    "match.tossWinner": "Toss Winner",
    "match.tossChoice": "Chose to",
    "match.waitingForToss": "Waiting for toss",
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
    "contest.joinContest": "Join Contest",
    "contest.entryFee": "Entry Fee",
    "contest.prizePool": "Prize Pool",
    "contest.spots": "Spots",
    "contest.leaderboard": "Leaderboard",
    "dashboard.totalContests": "Total Contests",
    "dashboard.totalPoints": "Total Points",
    "dashboard.topFinishes": "Top Finishes",
    "dashboard.achievements": "Achievements",
    "offline.youAreOffline": "You are offline",
    "offline.cachedData": "Showing cached data",
  },
  hi: {
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
    "match.live": "लाइव",
    "match.upcoming": "आगामी",
    "match.completed": "पूर्ण",
    "match.createTeam": "टीम बनाएं",
    "match.viewDetails": "विवरण देखें",
    "match.tossWinner": "टॉस विजेता",
    "match.tossChoice": "चुना",
    "match.waitingForToss": "टॉस का इंतजार",
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
    "contest.joinContest": "प्रतियोगिता में शामिल हों",
    "contest.entryFee": "प्रवेश शुल्क",
    "contest.prizePool": "पुरस्कार राशि",
    "contest.spots": "स्थान",
    "contest.leaderboard": "लीडरबोर्ड",
    "dashboard.totalContests": "कुल प्रतियोगिताएं",
    "dashboard.totalPoints": "कुल अंक",
    "dashboard.topFinishes": "शीर्ष स्थान",
    "dashboard.achievements": "उपलब्धियां",
    "offline.youAreOffline": "आप ऑफलाइन हैं",
    "offline.cachedData": "कैश्ड डेटा दिखा रहा है",
  },
  ta: {
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
    "match.live": "நேரலை",
    "match.upcoming": "வரவிருக்கும்",
    "match.completed": "முடிந்தது",
    "match.createTeam": "அணி உருவாக்கு",
    "match.viewDetails": "விவரங்கள்",
    "match.tossWinner": "டாஸ் வெற்றி",
    "match.tossChoice": "தேர்வு",
    "match.waitingForToss": "டாஸ் காத்திருக்கிறது",
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
    "contest.joinContest": "போட்டியில் சேர்",
    "contest.entryFee": "நுழைவு கட்டணம்",
    "contest.prizePool": "பரிசு தொகை",
    "contest.spots": "இடங்கள்",
    "contest.leaderboard": "தரவரிசை",
    "dashboard.totalContests": "மொத்த போட்டிகள்",
    "dashboard.totalPoints": "மொத்த புள்ளிகள்",
    "dashboard.topFinishes": "சிறந்த முடிவுகள்",
    "dashboard.achievements": "சாதனைகள்",
    "offline.youAreOffline": "நீங்கள் ஆஃப்லைனில்",
    "offline.cachedData": "தற்காலிக தரவு",
  },
  te: {
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
    "match.live": "లైవ్",
    "match.upcoming": "రాబోయే",
    "match.completed": "పూర్తయింది",
    "match.createTeam": "జట్టు సృష్టించు",
    "match.viewDetails": "వివరాలు చూడండి",
    "match.tossWinner": "టాస్ విజేత",
    "match.tossChoice": "ఎంపిక",
    "match.waitingForToss": "టాస్ కోసం వేచి",
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
    "contest.joinContest": "పోటీలో చేరు",
    "contest.entryFee": "ప్రవేశ రుసుము",
    "contest.prizePool": "బహుమతి మొత్తం",
    "contest.spots": "స్థానాలు",
    "contest.leaderboard": "లీడర్‌బోర్డ్",
    "dashboard.totalContests": "మొత్తం పోటీలు",
    "dashboard.totalPoints": "మొత్తం పాయింట్లు",
    "dashboard.topFinishes": "టాప్ ఫినిషెస్",
    "dashboard.achievements": "సాధనలు",
    "offline.youAreOffline": "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు",
    "offline.cachedData": "కాష్ చేసిన డేటా",
  },
  bn: {
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
    "match.live": "লাইভ",
    "match.upcoming": "আসন্ন",
    "match.completed": "সম্পন্ন",
    "match.createTeam": "দল তৈরি করুন",
    "match.viewDetails": "বিস্তারিত দেখুন",
    "match.tossWinner": "টস বিজয়ী",
    "match.tossChoice": "বেছে নিয়েছে",
    "match.waitingForToss": "টসের অপেক্ষায়",
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
    "contest.joinContest": "প্রতিযোগিতায় যোগ দিন",
    "contest.entryFee": "প্রবেশ ফি",
    "contest.prizePool": "পুরস্কার পুল",
    "contest.spots": "স্থান",
    "contest.leaderboard": "লিডারবোর্ড",
    "dashboard.totalContests": "মোট প্রতিযোগিতা",
    "dashboard.totalPoints": "মোট পয়েন্ট",
    "dashboard.topFinishes": "সেরা ফিনিশ",
    "dashboard.achievements": "অর্জন",
    "offline.youAreOffline": "আপনি অফলাইনে আছেন",
    "offline.cachedData": "ক্যাশড ডেটা দেখাচ্ছে",
  },
  mr: {
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
    "match.live": "लाइव्ह",
    "match.upcoming": "आगामी",
    "match.completed": "पूर्ण",
    "match.createTeam": "संघ तयार करा",
    "match.viewDetails": "तपशील पहा",
    "match.tossWinner": "टॉस विजेता",
    "match.tossChoice": "निवडले",
    "match.waitingForToss": "टॉसची वाट पाहत आहे",
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
    "contest.joinContest": "स्पर्धेत सामील व्हा",
    "contest.entryFee": "प्रवेश शुल्क",
    "contest.prizePool": "बक्षीस रक्कम",
    "contest.spots": "जागा",
    "contest.leaderboard": "लीडरबोर्ड",
    "dashboard.totalContests": "एकूण स्पर्धा",
    "dashboard.totalPoints": "एकूण गुण",
    "dashboard.topFinishes": "सर्वोत्तम स्थान",
    "dashboard.achievements": "कामगिरी",
    "offline.youAreOffline": "तुम्ही ऑफलाइन आहात",
    "offline.cachedData": "कॅश केलेला डेटा",
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
