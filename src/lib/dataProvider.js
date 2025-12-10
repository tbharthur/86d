// Data provider that uses API when available, falls back to mock data
import { reviewersAPI, reviewsAPI, restaurantsAPI, tagsAPI } from './api';
import { reviewers as mockReviewers, tagInfo as mockTagInfo, searchReviewers as mockSearchReviewers, getReviewerById as mockGetReviewerById } from '../data/reviewers';
import { reviews as mockReviews, flagInfo as mockFlagInfo, getReviewsForReviewer as mockGetReviewsForReviewer, getRecentReviews as mockGetRecentReviews } from '../data/reviews';
import { restaurants as mockRestaurants, currentRestaurant as mockCurrentRestaurant, getRestaurantById as mockGetRestaurantById } from '../data/restaurants';

// Check if we're in production (API available)
const isProduction = import.meta.env.PROD;

// Cache for API data
let cache = {
  reviewers: null,
  reviews: null,
  restaurants: null,
  tags: null,
  lastFetch: null,
};

const CACHE_DURATION = 60000; // 1 minute

function isCacheValid() {
  return cache.lastFetch && (Date.now() - cache.lastFetch) < CACHE_DURATION;
}

// Reviewers
export async function getAllReviewers() {
  if (!isProduction) return mockReviewers;

  try {
    if (cache.reviewers && isCacheValid()) return cache.reviewers;
    cache.reviewers = await reviewersAPI.getAll();
    cache.lastFetch = Date.now();
    return cache.reviewers;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockReviewers;
  }
}

export async function getReviewerById(id) {
  if (!isProduction) return mockGetReviewerById(id);

  try {
    return await reviewersAPI.getById(id);
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockGetReviewerById(id);
  }
}

export async function searchReviewers(query) {
  if (!isProduction) return mockSearchReviewers(query);

  try {
    return await reviewersAPI.search(query);
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockSearchReviewers(query);
  }
}

// Reviews
export async function getAllReviews() {
  if (!isProduction) return mockReviews;

  try {
    return await reviewsAPI.getAll();
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockReviews;
  }
}

export async function getRecentReviews(limit = 10) {
  if (!isProduction) return mockGetRecentReviews(limit);

  try {
    return await reviewsAPI.getRecent(limit);
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockGetRecentReviews(limit);
  }
}

export async function getReviewsForReviewer(reviewerId) {
  if (!isProduction) return mockGetReviewsForReviewer(reviewerId);

  try {
    return await reviewsAPI.getForReviewer(reviewerId);
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockGetReviewsForReviewer(reviewerId);
  }
}

export async function createReview(review) {
  if (!isProduction) {
    // Mock: just return success
    console.log('Mock create review:', review);
    return { id: `mock-${Date.now()}`, ...review };
  }

  return await reviewsAPI.create(review);
}

// Restaurants
export async function getAllRestaurants() {
  if (!isProduction) return mockRestaurants;

  try {
    return await restaurantsAPI.getAll();
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockRestaurants;
  }
}

export async function getRestaurantById(id) {
  if (!isProduction) return mockGetRestaurantById(id);

  try {
    return await restaurantsAPI.getById(id);
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockGetRestaurantById(id);
  }
}

export function getCurrentRestaurant() {
  // For now, always return the mock current restaurant
  // In a real app, this would come from auth/session
  return mockCurrentRestaurant;
}

// Tags & Flags
export async function getTagInfo() {
  if (!isProduction) return mockTagInfo;

  try {
    return await tagsAPI.getAll();
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockTagInfo;
  }
}

export function getFlagInfo() {
  // Flag info is static, use mock
  return mockFlagInfo;
}

// Export synchronous versions for components that need immediate data
// These use mock data directly - useful for initial render
export const syncData = {
  reviewers: mockReviewers,
  reviews: mockReviews,
  restaurants: mockRestaurants,
  currentRestaurant: mockCurrentRestaurant,
  tagInfo: mockTagInfo,
  flagInfo: mockFlagInfo,
  getReviewerById: mockGetReviewerById,
  getRestaurantById: mockGetRestaurantById,
  searchReviewers: mockSearchReviewers,
  getReviewsForReviewer: mockGetReviewsForReviewer,
  getRecentReviews: mockGetRecentReviews,
};
