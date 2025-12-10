import { sql } from '@vercel/postgres';

// Seed data - matches existing mock data
const restaurants = [
  { id: "rest-001", name: "Bella Notte", initials: "BN", color: "#8B0000", location: "San Francisco, CA" },
  { id: "rest-002", name: "Sakura Garden", initials: "SG", color: "#DC143C", location: "San Francisco, CA" },
  { id: "rest-003", name: "The Rustic Spoon", initials: "RS", color: "#8B4513", location: "Oakland, CA" },
  { id: "rest-004", name: "Côte d'Azur", initials: "CA", color: "#000080", location: "New York, NY" },
  { id: "rest-005", name: "Taco Libre", initials: "TL", color: "#FF6B35", location: "Los Angeles, CA" },
  { id: "rest-006", name: "The Golden Fork", initials: "GF", color: "#DAA520", location: "Chicago, IL" }
];

const reviewers = [
  {
    id: "rev-001", display_name: "EliteFoodie2019", real_name_initial: "M",
    platforms: ["yelp", "instagram"], handles: { yelp: "EliteFoodie2019", instagram: "@elitefoodie.sf" },
    location: "San Francisco, CA", public_review_count: 847, member_since: "2019",
    elite_status: true, elite_years: ["2020", "2021", "2022", "2023"],
    aggregate_rating: 4.2, total_restaurant_reviews: 23,
    tags: ["fair-critic", "detailed-reviews", "high-standards"],
    bio: "Bay Area native. Yelp Elite '20-'23. I photograph everything.", recent_activity: "2 days ago"
  },
  {
    id: "rev-002", display_name: "HangryHank", real_name_initial: "H",
    platforms: ["google", "yelp"], handles: { google: "Hank M.", yelp: "HangryHank88" },
    location: "Oakland, CA", public_review_count: 234, member_since: "2018",
    elite_status: false, aggregate_rating: 1.8, total_restaurant_reviews: 31,
    tags: ["revenge-reviewer", "exaggerates", "difficult"],
    bio: "Telling it like it is since 2018.", recent_activity: "5 hours ago"
  },
  {
    id: "rev-003", display_name: "BrunchQueen_SF", real_name_initial: "S",
    platforms: ["instagram", "yelp", "tiktok"], handles: { instagram: "@brunchqueen_sf", yelp: "BrunchQueenSF", tiktok: "@brunchqueensf" },
    location: "San Francisco, CA", public_review_count: 156, member_since: "2020",
    elite_status: false, followers: 12400, aggregate_rating: 3.9, total_restaurant_reviews: 18,
    tags: ["influencer", "photographer", "pleasant", "long-visits"],
    bio: "12K followers | Brunch is a lifestyle | DM for collabs 💅", recent_activity: "1 day ago"
  },
  {
    id: "rev-004", display_name: "TheRealCritic", real_name_initial: "R",
    platforms: ["yelp"], handles: { yelp: "TheRealCritic_NYC" },
    location: "New York, NY", public_review_count: 1203, member_since: "2015",
    elite_status: true, elite_years: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregate_rating: 3.5, total_restaurant_reviews: 45,
    tags: ["accurate", "harsh-tone", "knowledgeable", "detailed-reviews"],
    bio: "Former line cook. I know what goes on in kitchens. 8x Elite.", recent_activity: "12 hours ago"
  },
  {
    id: "rev-005", display_name: "FreebieFiona", real_name_initial: "F",
    platforms: ["yelp", "google"], handles: { yelp: "FionaFindsDeals", google: "Fiona T." },
    location: "Los Angeles, CA", public_review_count: 156, member_since: "2019",
    elite_status: false, aggregate_rating: 2.1, total_restaurant_reviews: 27,
    tags: ["freebie-hunter", "threatens-reviews", "complainer"],
    bio: "Looking for the best value in LA!", recent_activity: "3 days ago"
  },
  {
    id: "rev-006", display_name: "GentlemanGourmand", real_name_initial: "W",
    platforms: ["yelp", "opentable"], handles: { yelp: "GentlemanGourmand", opentable: "William R." },
    location: "Chicago, IL", public_review_count: 567, member_since: "2014",
    elite_status: true, elite_years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregate_rating: 4.8, total_restaurant_reviews: 34,
    tags: ["great-tipper", "respectful", "old-school", "fair-critic"],
    bio: "Retired attorney. Dining enthusiast. 25%+ tipper.", recent_activity: "1 week ago"
  },
  {
    id: "rev-007", display_name: "VeganVigilante", real_name_initial: "A",
    platforms: ["google", "happycow"], handles: { google: "Alex P.", happycow: "VeganVigilante" },
    location: "Portland, OR", public_review_count: 89, member_since: "2021",
    elite_status: false, aggregate_rating: 2.9, total_restaurant_reviews: 15,
    tags: ["dietary-militant", "lecture-prone", "specific-requests"],
    bio: "Vegan 7 years. Animals are friends not food. Will ask about your oil.", recent_activity: "4 days ago"
  },
  {
    id: "rev-008", display_name: "DateNightDave", real_name_initial: "D",
    platforms: ["yelp", "google"], handles: { yelp: "DateNightDave", google: "David K." },
    location: "Austin, TX", public_review_count: 45, member_since: "2022",
    elite_status: false, aggregate_rating: 4.5, total_restaurant_reviews: 12,
    tags: ["polite", "celebrates-occasions", "good-tipper", "appreciative"],
    bio: "Taking my wife to nice places one restaurant at a time.", recent_activity: "2 weeks ago"
  },
  {
    id: "rev-009", display_name: "KarenKravings", real_name_initial: "K",
    platforms: ["yelp", "google", "facebook"], handles: { yelp: "Karen_Foodie_Mom", google: "Karen W.", facebook: "Karen's Food Reviews" },
    location: "Scottsdale, AZ", public_review_count: 312, member_since: "2017",
    elite_status: false, aggregate_rating: 1.5, total_restaurant_reviews: 52,
    tags: ["manager-caller", "unreasonable", "loud", "difficult"],
    bio: "I know what good service looks like. Manager on speed dial.", recent_activity: "6 hours ago"
  },
  {
    id: "rev-010", display_name: "SilentSampler", real_name_initial: "J",
    platforms: ["google"], handles: { google: "James L." },
    location: "Seattle, WA", public_review_count: 678, member_since: "2016",
    elite_status: false, aggregate_rating: 3.7, total_restaurant_reviews: 8,
    tags: ["stealth-reviewer", "fair-critic", "no-disclosure"],
    bio: "Local guide. Just sharing my experiences.", recent_activity: "3 days ago"
  },
  {
    id: "rev-011", display_name: "InfluencerIvy", real_name_initial: "I",
    platforms: ["instagram", "tiktok", "yelp"], handles: { instagram: "@ivy.eats.world", tiktok: "@ivyeatsworld", yelp: "IvyEatsWorld" },
    location: "Miami, FL", public_review_count: 89, member_since: "2021",
    followers: 45000, aggregate_rating: 2.3, total_restaurant_reviews: 29,
    tags: ["influencer", "expects-comps", "content-creator", "entitled"],
    bio: "45K | Food & lifestyle | Partnerships: dm@ivyeats.com", recent_activity: "8 hours ago"
  },
  {
    id: "rev-012", display_name: "HonestHarold", real_name_initial: "H",
    platforms: ["yelp", "tripadvisor"], handles: { yelp: "HonestHarold_Reviews", tripadvisor: "HaroldT" },
    location: "Denver, CO", public_review_count: 234, member_since: "2018",
    elite_status: false, aggregate_rating: 4.1, total_restaurant_reviews: 19,
    tags: ["brutally-honest", "fair-critic", "constructive", "detailed-reviews"],
    bio: "I call it like I see it. Fair but honest.", recent_activity: "5 days ago"
  },
  {
    id: "rev-013", display_name: "NitpickNancy", real_name_initial: "N",
    platforms: ["yelp", "google"], handles: { yelp: "NancyNoticesEverything", google: "Nancy R." },
    location: "Boston, MA", public_review_count: 189, member_since: "2019",
    elite_status: false, aggregate_rating: 2.4, total_restaurant_reviews: 33,
    tags: ["nitpicker", "impossible-standards", "complainer"],
    bio: "The devil is in the details. And I find every one.", recent_activity: "1 day ago"
  },
  {
    id: "rev-014", display_name: "RegularRick", real_name_initial: "R",
    platforms: ["google"], handles: { google: "Rick M." },
    location: "Phoenix, AZ", public_review_count: 56, member_since: "2020",
    elite_status: false, aggregate_rating: 4.4, total_restaurant_reviews: 7,
    tags: ["low-key", "reasonable", "fair-critic", "appreciative"],
    bio: "Just a regular guy who likes good food.", recent_activity: "2 weeks ago"
  },
  {
    id: "rev-015", display_name: "ChefChaser", real_name_initial: "C",
    platforms: ["yelp", "instagram", "eater"], handles: { yelp: "ChefChaser", instagram: "@chefchaser", eater: "ChefChaser" },
    location: "San Francisco, CA", public_review_count: 934, member_since: "2013",
    elite_status: true, elite_years: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregate_rating: 4.6, total_restaurant_reviews: 41,
    tags: ["industry-insider", "respectful", "knowledgeable", "fair-critic"],
    bio: "10x Elite. Former BOH. I get it. Here for the food, not the drama.", recent_activity: "4 hours ago"
  }
];

const tagTypes = [
  { tag_key: "fair-critic", label: "Fair Critic", type: "positive" },
  { tag_key: "detailed-reviews", label: "Detailed Reviews", type: "neutral" },
  { tag_key: "high-standards", label: "High Standards", type: "neutral" },
  { tag_key: "revenge-reviewer", label: "Revenge Reviewer", type: "negative" },
  { tag_key: "exaggerates", label: "Exaggerates", type: "negative" },
  { tag_key: "difficult", label: "Difficult", type: "negative" },
  { tag_key: "influencer", label: "Influencer", type: "neutral" },
  { tag_key: "photographer", label: "Photographs Everything", type: "neutral" },
  { tag_key: "pleasant", label: "Pleasant", type: "positive" },
  { tag_key: "long-visits", label: "Long Visits", type: "warning" },
  { tag_key: "accurate", label: "Accurate Reviews", type: "positive" },
  { tag_key: "harsh-tone", label: "Harsh Tone", type: "warning" },
  { tag_key: "knowledgeable", label: "Knowledgeable", type: "positive" },
  { tag_key: "freebie-hunter", label: "Freebie Hunter", type: "negative" },
  { tag_key: "threatens-reviews", label: "Threatens Bad Reviews", type: "negative" },
  { tag_key: "complainer", label: "Serial Complainer", type: "negative" },
  { tag_key: "great-tipper", label: "Great Tipper", type: "positive" },
  { tag_key: "respectful", label: "Respectful", type: "positive" },
  { tag_key: "old-school", label: "Old School", type: "neutral" },
  { tag_key: "dietary-militant", label: "Dietary Militant", type: "warning" },
  { tag_key: "lecture-prone", label: "Lecture Prone", type: "warning" },
  { tag_key: "specific-requests", label: "Many Special Requests", type: "warning" },
  { tag_key: "polite", label: "Polite", type: "positive" },
  { tag_key: "celebrates-occasions", label: "Celebrates Occasions", type: "positive" },
  { tag_key: "good-tipper", label: "Good Tipper", type: "positive" },
  { tag_key: "appreciative", label: "Appreciative", type: "positive" },
  { tag_key: "manager-caller", label: "Manager Caller", type: "negative" },
  { tag_key: "unreasonable", label: "Unreasonable", type: "negative" },
  { tag_key: "loud", label: "Loud", type: "warning" },
  { tag_key: "stealth-reviewer", label: "Stealth Reviewer", type: "neutral" },
  { tag_key: "no-disclosure", label: "No Disclosure", type: "neutral" },
  { tag_key: "expects-comps", label: "Expects Comps", type: "negative" },
  { tag_key: "content-creator", label: "Content Creator", type: "neutral" },
  { tag_key: "entitled", label: "Entitled", type: "negative" },
  { tag_key: "brutally-honest", label: "Brutally Honest", type: "neutral" },
  { tag_key: "constructive", label: "Constructive", type: "positive" },
  { tag_key: "nitpicker", label: "Nitpicker", type: "negative" },
  { tag_key: "impossible-standards", label: "Impossible Standards", type: "negative" },
  { tag_key: "low-key", label: "Low-Key", type: "positive" },
  { tag_key: "reasonable", label: "Reasonable", type: "positive" },
  { tag_key: "industry-insider", label: "Industry Insider", type: "positive" }
];

const flagTypes = [
  { flag_key: "threatened-review", label: "Threatened Bad Review", type: "negative" },
  { flag_key: "fabricated-claims", label: "Fabricated Claims", type: "negative" },
  { flag_key: "undertipped", label: "Undertipped", type: "warning" },
  { flag_key: "unreasonable-complaints", label: "Unreasonable Complaints", type: "warning" },
  { flag_key: "exaggerated-claims", label: "Exaggerated Claims", type: "warning" },
  { flag_key: "solicited-freebies", label: "Solicited Freebies", type: "warning" },
  { flag_key: "retaliatory-review", label: "Retaliatory Review", type: "negative" },
  { flag_key: "long-table-time", label: "Long Table Time", type: "neutral" },
  { flag_key: "lectured-staff", label: "Lectured Staff", type: "warning" },
  { flag_key: "made-staff-cry", label: "Made Staff Cry", type: "negative" },
  { flag_key: "unreasonable-demands", label: "Unreasonable Demands", type: "warning" },
  { flag_key: "manager-demanded", label: "Demanded Manager", type: "warning" },
  { flag_key: "repeat-offender", label: "Repeat Offender", type: "negative" },
  { flag_key: "demanded-comps", label: "Demanded Comps", type: "warning" },
  { flag_key: "minimal-order", label: "Minimal Order", type: "neutral" },
  { flag_key: "impossible-standards", label: "Impossible Standards", type: "warning" },
  { flag_key: "excessive-complaints", label: "Excessive Complaints", type: "warning" },
  { flag_key: "caused-scene", label: "Caused a Scene", type: "negative" },
  { flag_key: "solicited-discount", label: "Solicited Discount", type: "warning" }
];

const reviews = [
  { id: "review-001", reviewer_id: "rev-001", restaurant_id: "rest-001", rating: 4, date: "2024-01-15", content: "Recognized her from her Yelp profile. She was thorough—photographed every course, asked detailed questions about ingredients. Fair review afterward that accurately captured the experience. Tipped 20%.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 12, verified: true },
  { id: "review-002", reviewer_id: "rev-001", restaurant_id: "rest-002", rating: 4, date: "2023-11-20", content: "Elite badge holder, clearly takes reviewing seriously. Spent 2+ hours, ordered extensively. Her review mentioned things we could actually improve. Would welcome back.", categories: { accuracy: 5, tipping: 4, politeness: 5, staffTreatment: 4, disclosed: false, reasonable: 4 }, flags: [], helpful: 8, verified: true },
  { id: "review-003", reviewer_id: "rev-002", restaurant_id: "rest-003", rating: 1, date: "2024-02-01", content: "Absolute nightmare. Complained food took too long (15 min on a Saturday night). Demanded discount, threatened '1-star incoming' when we declined. His review claimed 45 minute wait and 'cold food'—completely fabricated.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: true, reasonable: 1 }, flags: ["threatened-review", "fabricated-claims", "undertipped"], helpful: 34, verified: true },
  { id: "review-004", reviewer_id: "rev-002", restaurant_id: "rest-001", rating: 2, date: "2023-09-14", content: "Sent back his pasta twice. Both times nothing was actually wrong—chef tasted it personally. Left 10% tip and a 2-star review complaining about 'attitude' when server remained professional throughout.", categories: { accuracy: 2, tipping: 2, politeness: 2, staffTreatment: 2, disclosed: false, reasonable: 1 }, flags: ["undertipped", "unreasonable-complaints"], helpful: 28, verified: true },
  { id: "review-005", reviewer_id: "rev-002", restaurant_id: "rest-005", rating: 2, date: "2024-01-08", content: "Got upset that our casual taco spot doesn't take reservations. Waited 20 min, complained the whole time to other customers. Review said 'disorganized chaos' but we were just busy on a Friday.", categories: { accuracy: 2, tipping: 2, politeness: 2, staffTreatment: 3, disclosed: false, reasonable: 2 }, flags: ["exaggerated-claims"], helpful: 15, verified: true },
  { id: "review-006", reviewer_id: "rev-003", restaurant_id: "rest-001", rating: 4, date: "2024-01-22", content: "Instagram influencer, asked to move tables twice for better lighting. But she was polite about it, her content looked great, and she was genuinely complimentary. Just budget extra time at the table.", categories: { accuracy: 4, tipping: 4, politeness: 5, staffTreatment: 4, disclosed: true, reasonable: 4 }, flags: ["long-table-time"], helpful: 9, verified: true },
  { id: "review-007", reviewer_id: "rev-003", restaurant_id: "rest-002", rating: 4, date: "2023-12-03", content: "She photographs beautifully and her review was fair. Occupied table for nearly 3 hours during Sunday brunch rush, which was tough, but she ordered plenty and tipped well.", categories: { accuracy: 4, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: true, reasonable: 4 }, flags: ["long-table-time"], helpful: 7, verified: true },
  { id: "review-008", reviewer_id: "rev-004", restaurant_id: "rest-004", rating: 4, date: "2024-01-28", content: "You can tell he knows food. Ordered strategically to test the kitchen. His review was harsh but accurate—he caught a sauce that was slightly broken. Fair, if intimidating.", categories: { accuracy: 5, tipping: 4, politeness: 3, staffTreatment: 3, disclosed: false, reasonable: 5 }, flags: [], helpful: 22, verified: true },
  { id: "review-009", reviewer_id: "rev-004", restaurant_id: "rest-006", rating: 3, date: "2023-10-11", content: "Former kitchen worker—he mentioned it. Very exacting, pointed out issues with plating that most wouldn't notice. Review was technical and honest. Not warm, but not unfair either.", categories: { accuracy: 5, tipping: 3, politeness: 3, staffTreatment: 3, disclosed: true, reasonable: 4 }, flags: [], helpful: 18, verified: true },
  { id: "review-010", reviewer_id: "rev-005", restaurant_id: "rest-001", rating: 1, date: "2023-12-20", content: "Asked if we 'do anything special for Yelpers.' When we said no, attitude shifted immediately. Complained about portion sizes (they're normal). Review mysteriously focused on 'value' issues.", categories: { accuracy: 2, tipping: 2, politeness: 2, staffTreatment: 2, disclosed: true, reasonable: 1 }, flags: ["solicited-freebies", "retaliatory-review"], helpful: 31, verified: true },
  { id: "review-011", reviewer_id: "rev-005", restaurant_id: "rest-005", rating: 2, date: "2024-02-05", content: "Mentioned her Yelp reviews three times. Asked for 'a little extra' in her burrito—which we gave. Still complained portions were small in her review. You can't win with this one.", categories: { accuracy: 2, tipping: 2, politeness: 3, staffTreatment: 3, disclosed: true, reasonable: 2 }, flags: ["solicited-freebies"], helpful: 14, verified: true },
  { id: "review-012", reviewer_id: "rev-006", restaurant_id: "rest-004", rating: 5, date: "2024-01-10", content: "An absolute pleasure. Old-school dining etiquette, genuinely interested in the food, asked thoughtful questions. Left 28% tip. His review was gracious even when noting minor issues. This is how it should be.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 45, verified: true },
  { id: "review-013", reviewer_id: "rev-006", restaurant_id: "rest-006", rating: 5, date: "2023-11-15", content: "A gentleman in every sense. Thanked each staff member by name. Even when his steak was slightly over, he was gracious about the remake. Rare to see this level of class. 25% tip.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 38, verified: true },
  { id: "review-014", reviewer_id: "rev-006", restaurant_id: "rest-001", rating: 5, date: "2023-08-22", content: "10-time Elite who acts nothing like it. Humble, appreciative, engaged with our sommelier beautifully. His review praised specific staff members. We sent him a thank you note.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 29, verified: true },
  { id: "review-015", reviewer_id: "rev-007", restaurant_id: "rest-003", rating: 3, date: "2024-01-05", content: "Asked detailed questions about every ingredient—which is fine, we accommodate allergies. But then lectured our server about factory farming for 10 minutes. Review was fair but wished we had 'more vegan options' at a BBQ joint.", categories: { accuracy: 3, tipping: 3, politeness: 2, staffTreatment: 2, disclosed: false, reasonable: 2 }, flags: ["lectured-staff"], helpful: 11, verified: true },
  { id: "review-016", reviewer_id: "rev-007", restaurant_id: "rest-002", rating: 3, date: "2023-10-28", content: "Grilled us on fish sourcing, which we could answer. Seemed satisfied but review dinged us for 'not being transparent enough about sustainability.' We literally have it on the menu.", categories: { accuracy: 2, tipping: 3, politeness: 3, staffTreatment: 3, disclosed: false, reasonable: 2 }, flags: [], helpful: 8, verified: true },
  { id: "review-017", reviewer_id: "rev-008", restaurant_id: "rest-001", rating: 5, date: "2024-02-13", content: "Valentine's dinner with his wife. Called ahead to arrange flowers at the table. Gracious, patient during the rush, thanked everyone. Left a glowing review that mentioned staff by name. More like him, please.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 21, verified: true },
  { id: "review-018", reviewer_id: "rev-008", restaurant_id: "rest-006", rating: 5, date: "2023-12-23", content: "Anniversary dinner. Genuinely nice couple. Small issue with the appetizer, handled it gracefully. Still left 5 stars and specifically mentioned how we fixed it. This is a reviewer who gets it.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 17, verified: true },
  { id: "review-019", reviewer_id: "rev-009", restaurant_id: "rest-001", rating: 1, date: "2024-01-30", content: "Asked to speak to manager before even ordering. Complained table was 'too close to kitchen' (it wasn't), then 'too drafty' at new table. Sent back wine twice. Left 1 star because server 'had an attitude'—server was in tears.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: false, reasonable: 1 }, flags: ["made-staff-cry", "unreasonable-demands", "manager-demanded"], helpful: 67, verified: true },
  { id: "review-020", reviewer_id: "rev-009", restaurant_id: "rest-005", rating: 1, date: "2023-11-12", content: "Demanded to know 'who's in charge' at a taco counter. We're a 6-person operation. Complained her carnitas 'didn't look like the picture' (we don't have pictures). Left 1 star review calling us 'unprofessional.'", categories: { accuracy: 1, tipping: 2, politeness: 1, staffTreatment: 1, disclosed: true, reasonable: 1 }, flags: ["manager-demanded", "unreasonable-demands"], helpful: 42, verified: true },
  { id: "review-021", reviewer_id: "rev-009", restaurant_id: "rest-006", rating: 1, date: "2024-02-09", content: "Third time she's been here, third time she's demanded a manager. This time it was because her water glass had a 'spot.' Review claims 'dirty restaurant'—we have an A health rating.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: false, reasonable: 1 }, flags: ["manager-demanded", "fabricated-claims", "repeat-offender"], helpful: 55, verified: true },
  { id: "review-022", reviewer_id: "rev-010", restaurant_id: "rest-002", rating: 4, date: "2023-12-18", content: "Didn't realize he was a reviewer until the review popped up. Quiet, unassuming dinner. Review was fair and accurate. No drama. This is honestly ideal—just wish we'd known so we could have answered questions.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 6, verified: true },
  { id: "review-023", reviewer_id: "rev-011", restaurant_id: "rest-001", rating: 2, date: "2024-02-07", content: "Showed up with ring light and tripod. Asked if meal would be comped 'for the exposure.' When we said no, she ordered one appetizer, photographed it for an hour, and left. Review called us 'not influencer friendly.'", categories: { accuracy: 2, tipping: 1, politeness: 2, staffTreatment: 3, disclosed: true, reasonable: 1 }, flags: ["demanded-comps", "minimal-order", "retaliatory-review"], helpful: 48, verified: true },
  { id: "review-024", reviewer_id: "rev-011", restaurant_id: "rest-002", rating: 2, date: "2023-09-05", content: "DM'd us asking for free omakase 'in exchange for exposure to 45K followers.' We politely declined. She came anyway, paid, and left 2 stars citing 'cold fish'—our fish is literally never cold.", categories: { accuracy: 1, tipping: 2, politeness: 2, staffTreatment: 3, disclosed: true, reasonable: 1 }, flags: ["demanded-comps", "retaliatory-review", "fabricated-claims"], helpful: 52, verified: true },
  { id: "review-025", reviewer_id: "rev-012", restaurant_id: "rest-003", rating: 4, date: "2024-01-18", content: "His review pointed out our fries were underseasoned. He was right. We adjusted the recipe. This is what good criticism looks like—specific, actionable, and fair. He even updated his review when he came back.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 23, verified: true },
  { id: "review-026", reviewer_id: "rev-012", restaurant_id: "rest-006", rating: 4, date: "2023-11-30", content: "Doesn't pull punches but isn't cruel. Noted that our service was slow—it was, we were understaffed. Didn't exaggerate or make it personal. Tipped fairly despite the wait. Respect.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 19, verified: true },
  { id: "review-027", reviewer_id: "rev-013", restaurant_id: "rest-004", rating: 2, date: "2024-02-03", content: "Complained that her napkin was folded incorrectly. Then that the butter was too cold. Then that the bread was too warm. Review was 800 words about minor imperfections in a $200 meal that was, by all accounts, excellent.", categories: { accuracy: 2, tipping: 3, politeness: 2, staffTreatment: 2, disclosed: false, reasonable: 1 }, flags: ["impossible-standards", "excessive-complaints"], helpful: 29, verified: true },
  { id: "review-028", reviewer_id: "rev-013", restaurant_id: "rest-001", rating: 2, date: "2023-10-22", content: "Found a complaint for every course. Pasta was 'slightly too al dente.' Wine was 'a touch too cold.' Review reads like a health inspection. She's not wrong about anything specifically, she just... finds things.", categories: { accuracy: 3, tipping: 3, politeness: 2, staffTreatment: 3, disclosed: false, reasonable: 2 }, flags: ["impossible-standards"], helpful: 21, verified: true },
  { id: "review-029", reviewer_id: "rev-014", restaurant_id: "rest-003", rating: 5, date: "2024-01-25", content: "Just a normal guy enjoying dinner. Polite, patient, tipped 20%. His review was 3 sentences: food was good, service was friendly, he'd come back. Sometimes simple is perfect.", categories: { accuracy: 5, tipping: 4, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 12, verified: true },
  { id: "review-030", reviewer_id: "rev-015", restaurant_id: "rest-001", rating: 5, date: "2024-02-11", content: "You can tell he's worked in kitchens. Patient during a rush, understanding when something took longer. Even complimented the line cook on his way out. His review mentioned technique and execution—stuff only industry people notice.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: true, reasonable: 5 }, flags: [], helpful: 35, verified: true },
  { id: "review-031", reviewer_id: "rev-015", restaurant_id: "rest-002", rating: 5, date: "2023-12-08", content: "10x Elite who treats staff like colleagues, not servants. Asked about knife techniques, fish sourcing. Review praised specific dishes with actual culinary knowledge. Left 25% and thanked the chef personally.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: true, reasonable: 5 }, flags: [], helpful: 31, verified: true },
  { id: "review-032", reviewer_id: "rev-015", restaurant_id: "rest-004", rating: 4, date: "2024-01-02", content: "Knows his stuff. Noticed our new sous chef's influence on the menu. His review mentioned one dish was 'uncharacteristically heavy-handed with salt'—and he was right, we'd changed suppliers. Invaluable feedback.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: true, reasonable: 5 }, flags: [], helpful: 27, verified: true },
  { id: "review-033", reviewer_id: "rev-002", restaurant_id: "rest-004", rating: 1, date: "2024-02-14", content: "Walked in without reservation on Valentine's Day, was told it would be a 90-minute wait. Threw a fit in the foyer. Review claims we 'refused service'—we offered the wait time. Classic HangryHank.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: false, reasonable: 1 }, flags: ["fabricated-claims", "caused-scene"], helpful: 44, verified: true },
  { id: "review-034", reviewer_id: "rev-009", restaurant_id: "rest-003", rating: 1, date: "2024-02-17", content: "Her fourth visit, fourth complaint to management. This time: music was too loud (it wasn't), then too quiet, then she didn't like the song. Asked for discount 'for the trouble.' We declined. Review incoming.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: true, reasonable: 1 }, flags: ["manager-demanded", "repeat-offender", "solicited-discount"], helpful: 38, verified: true },
  { id: "review-035", reviewer_id: "rev-005", restaurant_id: "rest-006", rating: 2, date: "2024-01-12", content: "Tried the 'I'm a top reviewer, anything you can do for us?' approach. When that didn't work, she mysteriously found her steak 'overcooked' (ordered medium, delivered medium). Adjusted her tip accordingly too.", categories: { accuracy: 2, tipping: 1, politeness: 2, staffTreatment: 3, disclosed: true, reasonable: 2 }, flags: ["solicited-freebies", "undertipped"], helpful: 26, verified: true }
];

export default async function handler(req, res) {
  // Only allow POST with a secret key for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.body;
  if (secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting database seed...');

    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        initials VARCHAR(10) NOT NULL,
        color VARCHAR(20) NOT NULL,
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS reviewers (
        id VARCHAR(50) PRIMARY KEY,
        display_name VARCHAR(255) NOT NULL,
        real_name_initial VARCHAR(5),
        platforms TEXT[],
        handles JSONB,
        avatar VARCHAR(500),
        location VARCHAR(255),
        public_review_count INTEGER DEFAULT 0,
        member_since VARCHAR(10),
        elite_status BOOLEAN DEFAULT FALSE,
        elite_years TEXT[],
        followers INTEGER,
        aggregate_rating DECIMAL(3,1) DEFAULT 0,
        total_restaurant_reviews INTEGER DEFAULT 0,
        tags TEXT[],
        bio TEXT,
        recent_activity VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(50) PRIMARY KEY,
        reviewer_id VARCHAR(50) REFERENCES reviewers(id) ON DELETE CASCADE,
        restaurant_id VARCHAR(50) REFERENCES restaurants(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        content TEXT NOT NULL,
        date DATE NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        helpful INTEGER DEFAULT 0,
        flags TEXT[],
        categories JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS tag_types (
        tag_key VARCHAR(100) PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        type VARCHAR(20) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS flag_types (
        flag_key VARCHAR(100) PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        type VARCHAR(20) NOT NULL
      )
    `;

    // Clear existing data
    await sql`DELETE FROM reviews`;
    await sql`DELETE FROM reviewers`;
    await sql`DELETE FROM restaurants`;
    await sql`DELETE FROM tag_types`;
    await sql`DELETE FROM flag_types`;

    // Insert restaurants
    for (const r of restaurants) {
      await sql`
        INSERT INTO restaurants (id, name, initials, color, location)
        VALUES (${r.id}, ${r.name}, ${r.initials}, ${r.color}, ${r.location})
      `;
    }
    console.log(`Inserted ${restaurants.length} restaurants`);

    // Insert reviewers
    for (const r of reviewers) {
      await sql`
        INSERT INTO reviewers (id, display_name, real_name_initial, platforms, handles, location, public_review_count, member_since, elite_status, elite_years, followers, aggregate_rating, total_restaurant_reviews, tags, bio, recent_activity)
        VALUES (${r.id}, ${r.display_name}, ${r.real_name_initial}, ${r.platforms}, ${JSON.stringify(r.handles)}, ${r.location}, ${r.public_review_count}, ${r.member_since}, ${r.elite_status}, ${r.elite_years || []}, ${r.followers || null}, ${r.aggregate_rating}, ${r.total_restaurant_reviews}, ${r.tags}, ${r.bio}, ${r.recent_activity})
      `;
    }
    console.log(`Inserted ${reviewers.length} reviewers`);

    // Insert reviews
    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (id, reviewer_id, restaurant_id, rating, content, date, verified, helpful, flags, categories)
        VALUES (${r.id}, ${r.reviewer_id}, ${r.restaurant_id}, ${r.rating}, ${r.content}, ${r.date}, ${r.verified}, ${r.helpful}, ${r.flags}, ${JSON.stringify(r.categories)})
      `;
    }
    console.log(`Inserted ${reviews.length} reviews`);

    // Insert tag types
    for (const t of tagTypes) {
      await sql`
        INSERT INTO tag_types (tag_key, label, type)
        VALUES (${t.tag_key}, ${t.label}, ${t.type})
      `;
    }
    console.log(`Inserted ${tagTypes.length} tag types`);

    // Insert flag types
    for (const f of flagTypes) {
      await sql`
        INSERT INTO flag_types (flag_key, label, type)
        VALUES (${f.flag_key}, ${f.label}, ${f.type})
      `;
    }
    console.log(`Inserted ${flagTypes.length} flag types`);

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_reviewer ON reviews(reviewer_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON reviews(restaurant_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(date DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviewers_rating ON reviewers(aggregate_rating DESC)`;

    return res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      counts: {
        restaurants: restaurants.length,
        reviewers: reviewers.length,
        reviews: reviews.length,
        tagTypes: tagTypes.length,
        flagTypes: flagTypes.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ error: error.message });
  }
}
