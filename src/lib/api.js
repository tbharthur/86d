// API client for 86'd backend

const API_BASE = '/api';

// Helper to handle API responses
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

// Reviewers API
export const reviewersAPI = {
  getAll: () => fetchAPI('/reviewers'),
  getById: (id) => fetchAPI(`/reviewers?id=${id}`),
  search: (query) => fetchAPI(`/reviewers?search=${encodeURIComponent(query)}`),
};

// Reviews API
export const reviewsAPI = {
  getAll: () => fetchAPI('/reviews'),
  getRecent: (limit = 10) => fetchAPI(`/reviews?recent=true&limit=${limit}`),
  getForReviewer: (reviewerId) => fetchAPI(`/reviews?reviewerId=${reviewerId}`),
  getFromRestaurant: (restaurantId) => fetchAPI(`/reviews?restaurantId=${restaurantId}`),
  create: (review) => fetchAPI('/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  }),
};

// Restaurants API
export const restaurantsAPI = {
  getAll: () => fetchAPI('/restaurants'),
  getById: (id) => fetchAPI(`/restaurants?id=${id}`),
};

// Tags API
export const tagsAPI = {
  getAll: () => fetchAPI('/tags'),
};
