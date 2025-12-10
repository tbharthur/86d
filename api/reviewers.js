import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { id, search, sort } = req.query;

      if (id) {
        // Get single reviewer by ID
        const { rows } = await sql`
          SELECT * FROM reviewers WHERE id = ${id}
        `;
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Reviewer not found' });
        }
        return res.status(200).json(transformReviewer(rows[0]));
      }

      if (search) {
        // Search reviewers
        const searchTerm = `%${search.toLowerCase()}%`;
        const { rows } = await sql`
          SELECT * FROM reviewers
          WHERE LOWER(display_name) LIKE ${searchTerm}
             OR LOWER(location) LIKE ${searchTerm}
             OR handles::text ILIKE ${searchTerm}
          ORDER BY aggregate_rating DESC
          LIMIT 20
        `;
        return res.status(200).json(rows.map(transformReviewer));
      }

      // Get all reviewers with optional sorting
      let orderBy = 'aggregate_rating DESC';
      if (sort === 'rating_asc') orderBy = 'aggregate_rating ASC';
      if (sort === 'recent') orderBy = 'updated_at DESC';
      if (sort === 'reviews') orderBy = 'total_restaurant_reviews DESC';

      const { rows } = await sql`
        SELECT * FROM reviewers ORDER BY aggregate_rating DESC
      `;
      return res.status(200).json(rows.map(transformReviewer));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Transform database row to match frontend expected format
function transformReviewer(row) {
  return {
    id: row.id,
    displayName: row.display_name,
    realNameInitial: row.real_name_initial,
    platforms: row.platforms || [],
    handles: row.handles || {},
    avatar: row.avatar,
    location: row.location,
    publicReviewCount: row.public_review_count,
    memberSince: row.member_since,
    eliteStatus: row.elite_status,
    eliteYears: row.elite_years || [],
    followers: row.followers,
    aggregateRating: parseFloat(row.aggregate_rating),
    totalRestaurantReviews: row.total_restaurant_reviews,
    tags: row.tags || [],
    bio: row.bio,
    recentActivity: row.recent_activity
  };
}
