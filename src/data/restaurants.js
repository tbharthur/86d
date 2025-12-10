// Mock restaurant data - the establishments writing reviews about reviewers
export const restaurants = [
  {
    id: "rest-001",
    name: "Bella Notte",
    type: "Italian",
    cuisine: "Italian Fine Dining",
    priceRange: "$$$$",
    location: "San Francisco, CA",
    neighborhood: "North Beach",
    initials: "BN",
    color: "#8B0000", // Dark red
    yearEstablished: 2008,
    totalReviewsWritten: 47
  },
  {
    id: "rest-002",
    name: "Sakura Garden",
    type: "Japanese",
    cuisine: "Japanese / Sushi",
    priceRange: "$$$",
    location: "San Francisco, CA",
    neighborhood: "Japantown",
    initials: "SG",
    color: "#DC143C", // Crimson
    yearEstablished: 2015,
    totalReviewsWritten: 32
  },
  {
    id: "rest-003",
    name: "The Rustic Spoon",
    type: "American",
    cuisine: "American Comfort",
    priceRange: "$$",
    location: "Oakland, CA",
    neighborhood: "Temescal",
    initials: "RS",
    color: "#8B4513", // Saddle brown
    yearEstablished: 2019,
    totalReviewsWritten: 28
  },
  {
    id: "rest-004",
    name: "Côte d'Azur",
    type: "French",
    cuisine: "French Fine Dining",
    priceRange: "$$$$",
    location: "New York, NY",
    neighborhood: "Upper East Side",
    initials: "CA",
    color: "#000080", // Navy
    yearEstablished: 1998,
    totalReviewsWritten: 89
  },
  {
    id: "rest-005",
    name: "Taco Libre",
    type: "Mexican",
    cuisine: "Mexican Street Food",
    priceRange: "$",
    location: "Los Angeles, CA",
    neighborhood: "Silver Lake",
    initials: "TL",
    color: "#FF6B35", // Orange
    yearEstablished: 2020,
    totalReviewsWritten: 19
  },
  {
    id: "rest-006",
    name: "The Golden Fork",
    type: "American",
    cuisine: "New American",
    priceRange: "$$$",
    location: "Chicago, IL",
    neighborhood: "River North",
    initials: "GF",
    color: "#DAA520", // Goldenrod
    yearEstablished: 2012,
    totalReviewsWritten: 56
  }
];

// The "logged in" restaurant for the prototype
export const currentRestaurant = restaurants[0]; // Bella Notte

export const getRestaurantById = (id) => restaurants.find(r => r.id === id);
