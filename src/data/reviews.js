// Mock reviews - from restaurants about reviewers
export const reviews = [
  // Reviews about EliteFoodie2019 (rev-001) - generally positive
  {
    id: "review-001",
    reviewerId: "rev-001",
    restaurantId: "rest-001",
    rating: 4,
    date: "2024-01-15",
    content: "Recognized her from her Yelp profile. She was thorough—photographed every course, asked detailed questions about ingredients. Fair review afterward that accurately captured the experience. Tipped 20%.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 4,
      staffTreatment: 4,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 12,
    verified: true
  },
  {
    id: "review-002",
    reviewerId: "rev-001",
    restaurantId: "rest-002",
    rating: 4,
    date: "2023-11-20",
    content: "Elite badge holder, clearly takes reviewing seriously. Spent 2+ hours, ordered extensively. Her review mentioned things we could actually improve. Would welcome back.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 5,
      staffTreatment: 4,
      disclosed: false,
      reasonable: 4
    },
    flags: [],
    helpful: 8,
    verified: true
  },

  // Reviews about HangryHank (rev-002) - negative
  {
    id: "review-003",
    reviewerId: "rev-002",
    restaurantId: "rest-003",
    rating: 1,
    date: "2024-02-01",
    content: "Absolute nightmare. Complained food took too long (15 min on a Saturday night). Demanded discount, threatened '1-star incoming' when we declined. His review claimed 45 minute wait and 'cold food'—completely fabricated.",
    categories: {
      accuracy: 1,
      tipping: 1,
      politeness: 1,
      staffTreatment: 1,
      disclosed: true,
      reasonable: 1
    },
    flags: ["threatened-review", "fabricated-claims", "undertipped"],
    helpful: 34,
    verified: true
  },
  {
    id: "review-004",
    reviewerId: "rev-002",
    restaurantId: "rest-001",
    rating: 2,
    date: "2023-09-14",
    content: "Sent back his pasta twice. Both times nothing was actually wrong—chef tasted it personally. Left 10% tip and a 2-star review complaining about 'attitude' when server remained professional throughout.",
    categories: {
      accuracy: 2,
      tipping: 2,
      politeness: 2,
      staffTreatment: 2,
      disclosed: false,
      reasonable: 1
    },
    flags: ["undertipped", "unreasonable-complaints"],
    helpful: 28,
    verified: true
  },
  {
    id: "review-005",
    reviewerId: "rev-002",
    restaurantId: "rest-005",
    rating: 2,
    date: "2024-01-08",
    content: "Got upset that our casual taco spot doesn't take reservations. Waited 20 min, complained the whole time to other customers. Review said 'disorganized chaos' but we were just busy on a Friday.",
    categories: {
      accuracy: 2,
      tipping: 2,
      politeness: 2,
      staffTreatment: 3,
      disclosed: false,
      reasonable: 2
    },
    flags: ["exaggerated-claims"],
    helpful: 15,
    verified: true
  },

  // Reviews about BrunchQueen_SF (rev-003) - mixed
  {
    id: "review-006",
    reviewerId: "rev-003",
    restaurantId: "rest-001",
    rating: 4,
    date: "2024-01-22",
    content: "Instagram influencer, asked to move tables twice for better lighting. But she was polite about it, her content looked great, and she was genuinely complimentary. Just budget extra time at the table.",
    categories: {
      accuracy: 4,
      tipping: 4,
      politeness: 5,
      staffTreatment: 4,
      disclosed: true,
      reasonable: 4
    },
    flags: ["long-table-time"],
    helpful: 9,
    verified: true
  },
  {
    id: "review-007",
    reviewerId: "rev-003",
    restaurantId: "rest-002",
    rating: 4,
    date: "2023-12-03",
    content: "She photographs beautifully and her review was fair. Occupied table for nearly 3 hours during Sunday brunch rush, which was tough, but she ordered plenty and tipped well.",
    categories: {
      accuracy: 4,
      tipping: 4,
      politeness: 4,
      staffTreatment: 4,
      disclosed: true,
      reasonable: 4
    },
    flags: ["long-table-time"],
    helpful: 7,
    verified: true
  },

  // Reviews about TheRealCritic (rev-004) - mixed/positive
  {
    id: "review-008",
    reviewerId: "rev-004",
    restaurantId: "rest-004",
    rating: 4,
    date: "2024-01-28",
    content: "You can tell he knows food. Ordered strategically to test the kitchen. His review was harsh but accurate—he caught a sauce that was slightly broken. Fair, if intimidating.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 3,
      staffTreatment: 3,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 22,
    verified: true
  },
  {
    id: "review-009",
    reviewerId: "rev-004",
    restaurantId: "rest-006",
    rating: 3,
    date: "2023-10-11",
    content: "Former kitchen worker—he mentioned it. Very exacting, pointed out issues with plating that most wouldn't notice. Review was technical and honest. Not warm, but not unfair either.",
    categories: {
      accuracy: 5,
      tipping: 3,
      politeness: 3,
      staffTreatment: 3,
      disclosed: true,
      reasonable: 4
    },
    flags: [],
    helpful: 18,
    verified: true
  },

  // Reviews about FreebieFiona (rev-005) - negative
  {
    id: "review-010",
    reviewerId: "rev-005",
    restaurantId: "rest-001",
    rating: 1,
    date: "2023-12-20",
    content: "Asked if we 'do anything special for Yelpers.' When we said no, attitude shifted immediately. Complained about portion sizes (they're normal). Review mysteriously focused on 'value' issues.",
    categories: {
      accuracy: 2,
      tipping: 2,
      politeness: 2,
      staffTreatment: 2,
      disclosed: true,
      reasonable: 1
    },
    flags: ["solicited-freebies", "retaliatory-review"],
    helpful: 31,
    verified: true
  },
  {
    id: "review-011",
    reviewerId: "rev-005",
    restaurantId: "rest-005",
    rating: 2,
    date: "2024-02-05",
    content: "Mentioned her Yelp reviews three times. Asked for 'a little extra' in her burrito—which we gave. Still complained portions were small in her review. You can't win with this one.",
    categories: {
      accuracy: 2,
      tipping: 2,
      politeness: 3,
      staffTreatment: 3,
      disclosed: true,
      reasonable: 2
    },
    flags: ["solicited-freebies"],
    helpful: 14,
    verified: true
  },

  // Reviews about GentlemanGourmand (rev-006) - very positive
  {
    id: "review-012",
    reviewerId: "rev-006",
    restaurantId: "rest-004",
    rating: 5,
    date: "2024-01-10",
    content: "An absolute pleasure. Old-school dining etiquette, genuinely interested in the food, asked thoughtful questions. Left 28% tip. His review was gracious even when noting minor issues. This is how it should be.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 45,
    verified: true
  },
  {
    id: "review-013",
    reviewerId: "rev-006",
    restaurantId: "rest-006",
    rating: 5,
    date: "2023-11-15",
    content: "A gentleman in every sense. Thanked each staff member by name. Even when his steak was slightly over, he was gracious about the remake. Rare to see this level of class. 25% tip.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 38,
    verified: true
  },
  {
    id: "review-014",
    reviewerId: "rev-006",
    restaurantId: "rest-001",
    rating: 5,
    date: "2023-08-22",
    content: "10-time Elite who acts nothing like it. Humble, appreciative, engaged with our sommelier beautifully. His review praised specific staff members. We sent him a thank you note.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 29,
    verified: true
  },

  // Reviews about VeganVigilante (rev-007) - mixed
  {
    id: "review-015",
    reviewerId: "rev-007",
    restaurantId: "rest-003",
    rating: 3,
    date: "2024-01-05",
    content: "Asked detailed questions about every ingredient—which is fine, we accommodate allergies. But then lectured our server about factory farming for 10 minutes. Review was fair but wished we had 'more vegan options' at a BBQ joint.",
    categories: {
      accuracy: 3,
      tipping: 3,
      politeness: 2,
      staffTreatment: 2,
      disclosed: false,
      reasonable: 2
    },
    flags: ["lectured-staff"],
    helpful: 11,
    verified: true
  },
  {
    id: "review-016",
    reviewerId: "rev-007",
    restaurantId: "rest-002",
    rating: 3,
    date: "2023-10-28",
    content: "Grilled us on fish sourcing, which we could answer. Seemed satisfied but review dinged us for 'not being transparent enough about sustainability.' We literally have it on the menu.",
    categories: {
      accuracy: 2,
      tipping: 3,
      politeness: 3,
      staffTreatment: 3,
      disclosed: false,
      reasonable: 2
    },
    flags: [],
    helpful: 8,
    verified: true
  },

  // Reviews about DateNightDave (rev-008) - positive
  {
    id: "review-017",
    reviewerId: "rev-008",
    restaurantId: "rest-001",
    rating: 5,
    date: "2024-02-14",
    content: "Valentine's dinner with his wife. Called ahead to arrange flowers at the table. Gracious, patient during the rush, thanked everyone. Left a glowing review that mentioned staff by name. More like him, please.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 21,
    verified: true
  },
  {
    id: "review-018",
    reviewerId: "rev-008",
    restaurantId: "rest-006",
    rating: 5,
    date: "2023-12-23",
    content: "Anniversary dinner. Genuinely nice couple. Small issue with the appetizer, handled it gracefully. Still left 5 stars and specifically mentioned how we fixed it. This is a reviewer who gets it.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 17,
    verified: true
  },

  // Reviews about KarenKravings (rev-009) - very negative
  {
    id: "review-019",
    reviewerId: "rev-009",
    restaurantId: "rest-001",
    rating: 1,
    date: "2024-01-30",
    content: "Asked to speak to manager before even ordering. Complained table was 'too close to kitchen' (it wasn't), then 'too drafty' at new table. Sent back wine twice. Left 1 star because server 'had an attitude'—server was in tears.",
    categories: {
      accuracy: 1,
      tipping: 1,
      politeness: 1,
      staffTreatment: 1,
      disclosed: false,
      reasonable: 1
    },
    flags: ["made-staff-cry", "unreasonable-demands", "manager-demanded"],
    helpful: 67,
    verified: true
  },
  {
    id: "review-020",
    reviewerId: "rev-009",
    restaurantId: "rest-005",
    rating: 1,
    date: "2023-11-12",
    content: "Demanded to know 'who's in charge' at a taco counter. We're a 6-person operation. Complained her carnitas 'didn't look like the picture' (we don't have pictures). Left 1 star review calling us 'unprofessional.'",
    categories: {
      accuracy: 1,
      tipping: 2,
      politeness: 1,
      staffTreatment: 1,
      disclosed: true,
      reasonable: 1
    },
    flags: ["manager-demanded", "unreasonable-demands"],
    helpful: 42,
    verified: true
  },
  {
    id: "review-021",
    reviewerId: "rev-009",
    restaurantId: "rest-006",
    rating: 1,
    date: "2024-02-10",
    content: "Third time she's been here, third time she's demanded a manager. This time it was because her water glass had a 'spot.' Review claims 'dirty restaurant'—we have an A health rating.",
    categories: {
      accuracy: 1,
      tipping: 1,
      politeness: 1,
      staffTreatment: 1,
      disclosed: false,
      reasonable: 1
    },
    flags: ["manager-demanded", "fabricated-claims", "repeat-offender"],
    helpful: 55,
    verified: true
  },

  // Reviews about SilentSampler (rev-010) - neutral
  {
    id: "review-022",
    reviewerId: "rev-010",
    restaurantId: "rest-002",
    rating: 4,
    date: "2023-12-18",
    content: "Didn't realize he was a reviewer until the review popped up. Quiet, unassuming dinner. Review was fair and accurate. No drama. This is honestly ideal—just wish we'd known so we could have answered questions.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 4,
      staffTreatment: 4,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 6,
    verified: true
  },

  // Reviews about InfluencerIvy (rev-011) - negative
  {
    id: "review-023",
    reviewerId: "rev-011",
    restaurantId: "rest-001",
    rating: 2,
    date: "2024-02-08",
    content: "Showed up with ring light and tripod. Asked if meal would be comped 'for the exposure.' When we said no, she ordered one appetizer, photographed it for an hour, and left. Review called us 'not influencer friendly.'",
    categories: {
      accuracy: 2,
      tipping: 1,
      politeness: 2,
      staffTreatment: 3,
      disclosed: true,
      reasonable: 1
    },
    flags: ["demanded-comps", "minimal-order", "retaliatory-review"],
    helpful: 48,
    verified: true
  },
  {
    id: "review-024",
    reviewerId: "rev-011",
    restaurantId: "rest-002",
    rating: 2,
    date: "2023-09-05",
    content: "DM'd us asking for free omakase 'in exchange for exposure to 45K followers.' We politely declined. She came anyway, paid, and left 2 stars citing 'cold fish'—our fish is literally never cold.",
    categories: {
      accuracy: 1,
      tipping: 2,
      politeness: 2,
      staffTreatment: 3,
      disclosed: true,
      reasonable: 1
    },
    flags: ["demanded-comps", "retaliatory-review", "fabricated-claims"],
    helpful: 52,
    verified: true
  },

  // Reviews about HonestHarold (rev-012) - positive
  {
    id: "review-025",
    reviewerId: "rev-012",
    restaurantId: "rest-003",
    rating: 4,
    date: "2024-01-18",
    content: "His review pointed out our fries were underseasoned. He was right. We adjusted the recipe. This is what good criticism looks like—specific, actionable, and fair. He even updated his review when he came back.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 4,
      staffTreatment: 4,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 23,
    verified: true
  },
  {
    id: "review-026",
    reviewerId: "rev-012",
    restaurantId: "rest-006",
    rating: 4,
    date: "2023-11-30",
    content: "Doesn't pull punches but isn't cruel. Noted that our service was slow—it was, we were understaffed. Didn't exaggerate or make it personal. Tipped fairly despite the wait. Respect.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 4,
      staffTreatment: 4,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 19,
    verified: true
  },

  // Reviews about NitpickNancy (rev-013) - negative
  {
    id: "review-027",
    reviewerId: "rev-013",
    restaurantId: "rest-004",
    rating: 2,
    date: "2024-02-03",
    content: "Complained that her napkin was folded incorrectly. Then that the butter was too cold. Then that the bread was too warm. Review was 800 words about minor imperfections in a $200 meal that was, by all accounts, excellent.",
    categories: {
      accuracy: 2,
      tipping: 3,
      politeness: 2,
      staffTreatment: 2,
      disclosed: false,
      reasonable: 1
    },
    flags: ["impossible-standards", "excessive-complaints"],
    helpful: 29,
    verified: true
  },
  {
    id: "review-028",
    reviewerId: "rev-013",
    restaurantId: "rest-001",
    rating: 2,
    date: "2023-10-22",
    content: "Found a complaint for every course. Pasta was 'slightly too al dente.' Wine was 'a touch too cold.' Review reads like a health inspection. She's not wrong about anything specifically, she just... finds things.",
    categories: {
      accuracy: 3,
      tipping: 3,
      politeness: 2,
      staffTreatment: 3,
      disclosed: false,
      reasonable: 2
    },
    flags: ["impossible-standards"],
    helpful: 21,
    verified: true
  },

  // Reviews about RegularRick (rev-014) - positive
  {
    id: "review-029",
    reviewerId: "rev-014",
    restaurantId: "rest-003",
    rating: 5,
    date: "2024-01-25",
    content: "Just a normal guy enjoying dinner. Polite, patient, tipped 20%. His review was 3 sentences: food was good, service was friendly, he'd come back. Sometimes simple is perfect.",
    categories: {
      accuracy: 5,
      tipping: 4,
      politeness: 5,
      staffTreatment: 5,
      disclosed: false,
      reasonable: 5
    },
    flags: [],
    helpful: 12,
    verified: true
  },

  // Reviews about ChefChaser (rev-015) - very positive
  {
    id: "review-030",
    reviewerId: "rev-015",
    restaurantId: "rest-001",
    rating: 5,
    date: "2024-02-12",
    content: "You can tell he's worked in kitchens. Patient during a rush, understanding when something took longer. Even complimented the line cook on his way out. His review mentioned technique and execution—stuff only industry people notice.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: true,
      reasonable: 5
    },
    flags: [],
    helpful: 35,
    verified: true
  },
  {
    id: "review-031",
    reviewerId: "rev-015",
    restaurantId: "rest-002",
    rating: 5,
    date: "2023-12-08",
    content: "10x Elite who treats staff like colleagues, not servants. Asked about knife techniques, fish sourcing. Review praised specific dishes with actual culinary knowledge. Left 25% and thanked the chef personally.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: true,
      reasonable: 5
    },
    flags: [],
    helpful: 31,
    verified: true
  },
  {
    id: "review-032",
    reviewerId: "rev-015",
    restaurantId: "rest-004",
    rating: 4,
    date: "2024-01-02",
    content: "Knows his stuff. Noticed our new sous chef's influence on the menu. His review mentioned one dish was 'uncharacteristically heavy-handed with salt'—and he was right, we'd changed suppliers. Invaluable feedback.",
    categories: {
      accuracy: 5,
      tipping: 5,
      politeness: 5,
      staffTreatment: 5,
      disclosed: true,
      reasonable: 5
    },
    flags: [],
    helpful: 27,
    verified: true
  },

  // Additional reviews for variety
  {
    id: "review-033",
    reviewerId: "rev-002",
    restaurantId: "rest-004",
    rating: 1,
    date: "2024-02-15",
    content: "Walked in without reservation on Valentine's Day, was told it would be a 90-minute wait. Threw a fit in the foyer. Review claims we 'refused service'—we offered the wait time. Classic HangryHank.",
    categories: {
      accuracy: 1,
      tipping: 1,
      politeness: 1,
      staffTreatment: 1,
      disclosed: false,
      reasonable: 1
    },
    flags: ["fabricated-claims", "caused-scene"],
    helpful: 44,
    verified: true
  },
  {
    id: "review-034",
    reviewerId: "rev-009",
    restaurantId: "rest-003",
    rating: 1,
    date: "2024-02-18",
    content: "Her fourth visit, fourth complaint to management. This time: music was too loud (it wasn't), then too quiet, then she didn't like the song. Asked for discount 'for the trouble.' We declined. Review incoming.",
    categories: {
      accuracy: 1,
      tipping: 1,
      politeness: 1,
      staffTreatment: 1,
      disclosed: true,
      reasonable: 1
    },
    flags: ["manager-demanded", "repeat-offender", "solicited-discount"],
    helpful: 38,
    verified: true
  },
  {
    id: "review-035",
    reviewerId: "rev-005",
    restaurantId: "rest-006",
    rating: 2,
    date: "2024-01-12",
    content: "Tried the 'I'm a top reviewer, anything you can do for us?' approach. When that didn't work, she mysteriously found her steak 'overcooked' (ordered medium, delivered medium). Adjusted her tip accordingly too.",
    categories: {
      accuracy: 2,
      tipping: 1,
      politeness: 2,
      staffTreatment: 3,
      disclosed: true,
      reasonable: 2
    },
    flags: ["solicited-freebies", "undertipped"],
    helpful: 26,
    verified: true
  }
];

// Flag metadata for display
export const flagInfo = {
  "threatened-review": { label: "Threatened Bad Review", severity: "high" },
  "fabricated-claims": { label: "Fabricated Claims", severity: "high" },
  "undertipped": { label: "Undertipped", severity: "medium" },
  "unreasonable-complaints": { label: "Unreasonable Complaints", severity: "medium" },
  "exaggerated-claims": { label: "Exaggerated Claims", severity: "medium" },
  "solicited-freebies": { label: "Solicited Freebies", severity: "medium" },
  "retaliatory-review": { label: "Retaliatory Review", severity: "high" },
  "long-table-time": { label: "Long Table Time", severity: "low" },
  "lectured-staff": { label: "Lectured Staff", severity: "medium" },
  "made-staff-cry": { label: "Made Staff Cry", severity: "high" },
  "unreasonable-demands": { label: "Unreasonable Demands", severity: "medium" },
  "manager-demanded": { label: "Demanded Manager", severity: "medium" },
  "repeat-offender": { label: "Repeat Offender", severity: "high" },
  "demanded-comps": { label: "Demanded Comps", severity: "medium" },
  "minimal-order": { label: "Minimal Order", severity: "low" },
  "impossible-standards": { label: "Impossible Standards", severity: "medium" },
  "excessive-complaints": { label: "Excessive Complaints", severity: "medium" },
  "caused-scene": { label: "Caused a Scene", severity: "high" },
  "solicited-discount": { label: "Solicited Discount", severity: "medium" },
};

export const getReviewsForReviewer = (reviewerId) =>
  reviews.filter(r => r.reviewerId === reviewerId);

export const getReviewsFromRestaurant = (restaurantId) =>
  reviews.filter(r => r.restaurantId === restaurantId);

export const getRecentReviews = (limit = 10) =>
  [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
