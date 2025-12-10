// Mock reviewer data - the people who write Yelp/Google reviews
export const reviewers = [
  {
    id: "rev-001",
    displayName: "EliteFoodie2019",
    realNameInitial: "M",
    platforms: ["yelp", "instagram"],
    handles: {
      yelp: "EliteFoodie2019",
      instagram: "@elitefoodie.sf"
    },
    avatar: null, // Will use initials
    location: "San Francisco, CA",
    publicReviewCount: 847,
    memberSince: "2019",
    eliteStatus: true,
    eliteYears: ["2020", "2021", "2022", "2023"],
    aggregateRating: 4.2,
    totalRestaurantReviews: 23,
    tags: ["fair-critic", "detailed-reviews", "high-standards"],
    bio: "Bay Area native. Yelp Elite '20-'23. I photograph everything.",
    recentActivity: "2 days ago"
  },
  {
    id: "rev-002",
    displayName: "HangryHank",
    realNameInitial: "H",
    platforms: ["google", "yelp"],
    handles: {
      google: "Hank M.",
      yelp: "HangryHank88"
    },
    avatar: null,
    location: "Oakland, CA",
    publicReviewCount: 234,
    memberSince: "2018",
    eliteStatus: false,
    aggregateRating: 1.8,
    totalRestaurantReviews: 31,
    tags: ["revenge-reviewer", "exaggerates", "difficult"],
    bio: "Telling it like it is since 2018.",
    recentActivity: "5 hours ago"
  },
  {
    id: "rev-003",
    displayName: "BrunchQueen_SF",
    realNameInitial: "S",
    platforms: ["instagram", "yelp", "tiktok"],
    handles: {
      instagram: "@brunchqueen_sf",
      yelp: "BrunchQueenSF",
      tiktok: "@brunchqueensf"
    },
    avatar: null,
    location: "San Francisco, CA",
    publicReviewCount: 156,
    memberSince: "2020",
    eliteStatus: false,
    followers: 12400,
    aggregateRating: 3.9,
    totalRestaurantReviews: 18,
    tags: ["influencer", "photographer", "pleasant", "long-visits"],
    bio: "12K followers | Brunch is a lifestyle | DM for collabs 💅",
    recentActivity: "1 day ago"
  },
  {
    id: "rev-004",
    displayName: "TheRealCritic",
    realNameInitial: "R",
    platforms: ["yelp"],
    handles: {
      yelp: "TheRealCritic_NYC"
    },
    avatar: null,
    location: "New York, NY",
    publicReviewCount: 1203,
    memberSince: "2015",
    eliteStatus: true,
    eliteYears: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregateRating: 3.5,
    totalRestaurantReviews: 45,
    tags: ["accurate", "harsh-tone", "knowledgeable", "detailed-reviews"],
    bio: "Former line cook. I know what goes on in kitchens. 8x Elite.",
    recentActivity: "12 hours ago"
  },
  {
    id: "rev-005",
    displayName: "FreebieFiona",
    realNameInitial: "F",
    platforms: ["yelp", "google"],
    handles: {
      yelp: "FionaFindsDeals",
      google: "Fiona T."
    },
    avatar: null,
    location: "Los Angeles, CA",
    publicReviewCount: 156,
    memberSince: "2019",
    eliteStatus: false,
    aggregateRating: 2.1,
    totalRestaurantReviews: 27,
    tags: ["freebie-hunter", "threatens-reviews", "complainer"],
    bio: "Looking for the best value in LA!",
    recentActivity: "3 days ago"
  },
  {
    id: "rev-006",
    displayName: "GentlemanGourmand",
    realNameInitial: "W",
    platforms: ["yelp", "opentable"],
    handles: {
      yelp: "GentlemanGourmand",
      opentable: "William R."
    },
    avatar: null,
    location: "Chicago, IL",
    publicReviewCount: 567,
    memberSince: "2014",
    eliteStatus: true,
    eliteYears: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregateRating: 4.8,
    totalRestaurantReviews: 34,
    tags: ["great-tipper", "respectful", "old-school", "fair-critic"],
    bio: "Retired attorney. Dining enthusiast. 25%+ tipper.",
    recentActivity: "1 week ago"
  },
  {
    id: "rev-007",
    displayName: "VeganVigilante",
    realNameInitial: "A",
    platforms: ["google", "happycow"],
    handles: {
      google: "Alex P.",
      happycow: "VeganVigilante"
    },
    avatar: null,
    location: "Portland, OR",
    publicReviewCount: 89,
    memberSince: "2021",
    eliteStatus: false,
    aggregateRating: 2.9,
    totalRestaurantReviews: 15,
    tags: ["dietary-militant", "lecture-prone", "specific-requests"],
    bio: "Vegan 7 years. Animals are friends not food. Will ask about your oil.",
    recentActivity: "4 days ago"
  },
  {
    id: "rev-008",
    displayName: "DateNightDave",
    realNameInitial: "D",
    platforms: ["yelp", "google"],
    handles: {
      yelp: "DateNightDave",
      google: "David K."
    },
    avatar: null,
    location: "Austin, TX",
    publicReviewCount: 45,
    memberSince: "2022",
    eliteStatus: false,
    aggregateRating: 4.5,
    totalRestaurantReviews: 12,
    tags: ["polite", "celebrates-occasions", "good-tipper", "appreciative"],
    bio: "Taking my wife to nice places one restaurant at a time.",
    recentActivity: "2 weeks ago"
  },
  {
    id: "rev-009",
    displayName: "KarenKravings",
    realNameInitial: "K",
    platforms: ["yelp", "google", "facebook"],
    handles: {
      yelp: "Karen_Foodie_Mom",
      google: "Karen W.",
      facebook: "Karen's Food Reviews"
    },
    avatar: null,
    location: "Scottsdale, AZ",
    publicReviewCount: 312,
    memberSince: "2017",
    eliteStatus: false,
    aggregateRating: 1.5,
    totalRestaurantReviews: 52,
    tags: ["manager-caller", "unreasonable", "loud", "difficult"],
    bio: "I know what good service looks like. Manager on speed dial.",
    recentActivity: "6 hours ago"
  },
  {
    id: "rev-010",
    displayName: "SilentSampler",
    realNameInitial: "J",
    platforms: ["google"],
    handles: {
      google: "James L."
    },
    avatar: null,
    location: "Seattle, WA",
    publicReviewCount: 678,
    memberSince: "2016",
    eliteStatus: false,
    aggregateRating: 3.7,
    totalRestaurantReviews: 8,
    tags: ["stealth-reviewer", "fair-critic", "no-disclosure"],
    bio: "Local guide. Just sharing my experiences.",
    recentActivity: "3 days ago"
  },
  {
    id: "rev-011",
    displayName: "InfluencerIvy",
    realNameInitial: "I",
    platforms: ["instagram", "tiktok", "yelp"],
    handles: {
      instagram: "@ivy.eats.world",
      tiktok: "@ivyeatsworld",
      yelp: "IvyEatsWorld"
    },
    avatar: null,
    location: "Miami, FL",
    publicReviewCount: 89,
    memberSince: "2021",
    followers: 45000,
    aggregateRating: 2.3,
    totalRestaurantReviews: 29,
    tags: ["influencer", "expects-comps", "content-creator", "entitled"],
    bio: "45K | Food & lifestyle | Partnerships: dm@ivyeats.com",
    recentActivity: "8 hours ago"
  },
  {
    id: "rev-012",
    displayName: "HonestHarold",
    realNameInitial: "H",
    platforms: ["yelp", "tripadvisor"],
    handles: {
      yelp: "HonestHarold_Reviews",
      tripadvisor: "HaroldT"
    },
    avatar: null,
    location: "Denver, CO",
    publicReviewCount: 234,
    memberSince: "2018",
    eliteStatus: false,
    aggregateRating: 4.1,
    totalRestaurantReviews: 19,
    tags: ["brutally-honest", "fair-critic", "constructive", "detailed-reviews"],
    bio: "I call it like I see it. Fair but honest.",
    recentActivity: "5 days ago"
  },
  {
    id: "rev-013",
    displayName: "NitpickNancy",
    realNameInitial: "N",
    platforms: ["yelp", "google"],
    handles: {
      yelp: "NancyNoticesEverything",
      google: "Nancy R."
    },
    avatar: null,
    location: "Boston, MA",
    publicReviewCount: 189,
    memberSince: "2019",
    eliteStatus: false,
    aggregateRating: 2.4,
    totalRestaurantReviews: 33,
    tags: ["nitpicker", "impossible-standards", "complainer"],
    bio: "The devil is in the details. And I find every one.",
    recentActivity: "1 day ago"
  },
  {
    id: "rev-014",
    displayName: "RegularRick",
    realNameInitial: "R",
    platforms: ["google"],
    handles: {
      google: "Rick M."
    },
    avatar: null,
    location: "Phoenix, AZ",
    publicReviewCount: 56,
    memberSince: "2020",
    eliteStatus: false,
    aggregateRating: 4.4,
    totalRestaurantReviews: 7,
    tags: ["low-key", "reasonable", "fair-critic", "appreciative"],
    bio: "Just a regular guy who likes good food.",
    recentActivity: "2 weeks ago"
  },
  {
    id: "rev-015",
    displayName: "ChefChaser",
    realNameInitial: "C",
    platforms: ["yelp", "instagram", "eater"],
    handles: {
      yelp: "ChefChaser",
      instagram: "@chefchaser",
      eater: "ChefChaser"
    },
    avatar: null,
    location: "San Francisco, CA",
    publicReviewCount: 934,
    memberSince: "2013",
    eliteStatus: true,
    eliteYears: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregateRating: 4.6,
    totalRestaurantReviews: 41,
    tags: ["industry-insider", "respectful", "knowledgeable", "fair-critic"],
    bio: "10x Elite. Former BOH. I get it. Here for the food, not the drama.",
    recentActivity: "4 hours ago"
  }
];

// Tag metadata for display
export const tagInfo = {
  "fair-critic": { label: "Fair Critic", type: "positive" },
  "detailed-reviews": { label: "Detailed Reviews", type: "neutral" },
  "high-standards": { label: "High Standards", type: "neutral" },
  "revenge-reviewer": { label: "Revenge Reviewer", type: "negative" },
  "exaggerates": { label: "Exaggerates", type: "negative" },
  "difficult": { label: "Difficult", type: "negative" },
  "influencer": { label: "Influencer", type: "neutral" },
  "photographer": { label: "Photographs Everything", type: "neutral" },
  "pleasant": { label: "Pleasant", type: "positive" },
  "long-visits": { label: "Long Visits", type: "warning" },
  "accurate": { label: "Accurate Reviews", type: "positive" },
  "harsh-tone": { label: "Harsh Tone", type: "warning" },
  "knowledgeable": { label: "Knowledgeable", type: "positive" },
  "freebie-hunter": { label: "Freebie Hunter", type: "negative" },
  "threatens-reviews": { label: "Threatens Bad Reviews", type: "negative" },
  "complainer": { label: "Serial Complainer", type: "negative" },
  "great-tipper": { label: "Great Tipper", type: "positive" },
  "respectful": { label: "Respectful", type: "positive" },
  "old-school": { label: "Old School", type: "neutral" },
  "dietary-militant": { label: "Dietary Militant", type: "warning" },
  "lecture-prone": { label: "Lecture Prone", type: "warning" },
  "specific-requests": { label: "Many Special Requests", type: "warning" },
  "polite": { label: "Polite", type: "positive" },
  "celebrates-occasions": { label: "Celebrates Occasions", type: "positive" },
  "good-tipper": { label: "Good Tipper", type: "positive" },
  "appreciative": { label: "Appreciative", type: "positive" },
  "manager-caller": { label: "Manager Caller", type: "negative" },
  "unreasonable": { label: "Unreasonable", type: "negative" },
  "loud": { label: "Loud", type: "warning" },
  "stealth-reviewer": { label: "Stealth Reviewer", type: "neutral" },
  "no-disclosure": { label: "No Disclosure", type: "neutral" },
  "expects-comps": { label: "Expects Comps", type: "negative" },
  "content-creator": { label: "Content Creator", type: "neutral" },
  "entitled": { label: "Entitled", type: "negative" },
  "brutally-honest": { label: "Brutally Honest", type: "neutral" },
  "constructive": { label: "Constructive", type: "positive" },
  "nitpicker": { label: "Nitpicker", type: "negative" },
  "impossible-standards": { label: "Impossible Standards", type: "negative" },
  "low-key": { label: "Low-Key", type: "positive" },
  "reasonable": { label: "Reasonable", type: "positive" },
  "industry-insider": { label: "Industry Insider", type: "positive" },
};

export const getReviewerById = (id) => reviewers.find(r => r.id === id);

export const searchReviewers = (query) => {
  const q = query.toLowerCase();
  return reviewers.filter(r =>
    r.displayName.toLowerCase().includes(q) ||
    Object.values(r.handles).some(h => h.toLowerCase().includes(q)) ||
    r.location.toLowerCase().includes(q)
  );
};
