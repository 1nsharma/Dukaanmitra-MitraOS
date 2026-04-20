export interface KeywordCategory {
  title: string;
  intent: 'High (Money)' | 'Medium (Comparison)' | 'Low (Educational)' | 'Local (Growth)';
  difficulty: 'Low' | 'Medium' | 'High';
  estimatedVolume: number;
  seedKeywords: string[];
  generatedCount: number;
}

export const seoBlueprintMatrix: Record<string, KeywordCategory> = {
  udhaar_management: {
    title: "Udhaar & Bahi-Khata (Core Action)",
    intent: 'High (Money)',
    difficulty: 'Low',
    estimatedVolume: 45000,
    seedKeywords: [
      "udhaar app", "bahi khata app", "digital khata", "udhaar book app", 
      "credit ledger app", "udhaar hisaab software", "best app for udhaar"
    ],
    generatedCount: 156
  },
  whatsapp_commerce: {
    title: "WhatsApp First Commerce (Differentiator)",
    intent: 'High (Money)',
    difficulty: 'Low',
    estimatedVolume: 32000,
    seedKeywords: [
      "manage shop on whatsapp", "whatsapp billing software", "whatsapp order system", 
      "whatsapp base kirana app", "sell offline via whatsapp"
    ],
    generatedCount: 89
  },
  local_gmb_growth: {
    title: "Google Reviews & GMB (Growth Loop)",
    intent: 'Local (Growth)',
    difficulty: 'Medium',
    estimatedVolume: 28000,
    seedKeywords: [
      "get more google reviews", "how to increase gmb rating", "google maps ranking for shop", 
      "automated review link generator", "local seo for kirana"
    ],
    generatedCount: 120
  },
  competitor_alternatives: {
    title: "Competitor Alternatives (Siphon Traffic)",
    intent: 'Medium (Comparison)',
    difficulty: 'Medium',
    estimatedVolume: 65000,
    seedKeywords: [
      "khatabook alternative", "okcredit similar app", "vyapar app replacement", 
      "better than khatabook", "dukaanmitra vs vyapar"
    ],
    generatedCount: 45
  },
  hinglish_vernacular: {
    title: "Hinglish Queries (Fastest Ranking)",
    intent: 'Low (Educational)',
    difficulty: 'Low',
    estimatedVolume: 85000,
    seedKeywords: [
      "udhaar ka hisaab kaise rakhe", "dukaan online kaise laye", "bina app ke hisaab", 
      "whatsapp se saman kaise beche", "kirana store ka hisaab kitab"
    ],
    generatedCount: 215
  },
  programmatic_cities: {
    title: "Programmatic City Pages (Mass Local)",
    intent: 'Local (Growth)',
    difficulty: 'Low',
    estimatedVolume: 120000,
    seedKeywords: [
      "[software/app] in [city]", 
      "ex: kirana software in lucknow",
      "ex: best billing app in kanpur"
    ],
    generatedCount: 400 // Assuming base 4 tools * 100 cities
  }
};

export const generateSampleKeywords = () => {
  return [
    { term: "udhaar ka hisaab kaise rakhe", difficulty: 12, volume: 4500, intent: "Educational / Problem" },
    { term: "khatabook alternative for pc", difficulty: 24, volume: 2100, intent: "Comparison / Switch" },
    { term: "whatsapp billing software india", difficulty: 15, volume: 1800, intent: "Transactional / Buy" },
    { term: "kirana store software in lucknow", difficulty: 8, volume: 850, intent: "Local / Buy" },
    { term: "how to get google reviews automatically", difficulty: 18, volume: 3200, intent: "Educational / Growth" },
    { term: "bina app ke dukaan kaise manage kare", difficulty: 5, volume: 5600, intent: "Vernacular / Problem" },
    { term: "best udhaar app india 2026", difficulty: 21, volume: 1200, intent: "Transactional / Buy" },
    { term: "google business profile suspend fix hindi", difficulty: 14, volume: 900, intent: "Educational / Problem" },
  ];
};
