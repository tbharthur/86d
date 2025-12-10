import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { reviewerId, restaurantId, recent, limit = 50 } = req.query;

      if (reviewerId) {
        // Get reviews for a specific reviewer
        const { rows } = await sql`
          SELECT r.*, rest.name as restaurant_name, rest.initials as restaurant_initials, rest.color as restaurant_color
          FROM reviews r
          JOIN restaurants rest ON r.restaurant_id = rest.id
          WHERE r.reviewer_id = ${reviewerId}
          ORDER BY r.date DESC
        `;
        return res.status(200).json(rows.map(transformReview));
      }

      if (restaurantId) {
        // Get reviews by a specific restaurant
        const { rows } = await sql`
          SELECT r.*, rev.display_name as reviewer_name
          FROM reviews r
          JOIN reviewers rev ON r.reviewer_id = rev.id
          WHERE r.restaurant_id = ${restaurantId}
          ORDER BY r.date DESC
        `;
        return res.status(200).json(rows.map(transformReview));
      }

      if (recent) {
        // Get recent reviews
        const limitNum = Math.min(parseInt(limit) || 10, 50);
        const { rows } = await sql`
          SELECT r.*,
                 rest.name as restaurant_name,
                 rest.initials as restaurant_initials,
                 rest.color as restaurant_color,
                 rev.display_name as reviewer_name
          FROM reviews r
          JOIN restaurants rest ON r.restaurant_id = rest.id
          JOIN reviewers rev ON r.reviewer_id = rev.id
          ORDER BY r.date DESC
          LIMIT ${limitNum}
        `;
        return res.status(200).json(rows.map(transformReview));
      }

      // Get all reviews
      const { rows } = await sql`
        SELECT r.*,
               rest.name as restaurant_name,
               rest.initials as restaurant_initials,
               rest.color as restaurant_color,
               rev.display_name as reviewer_name
        FROM reviews r
        JOIN restaurants rest ON r.restaurant_id = rest.id
        JOIN reviewers rev ON r.reviewer_id = rev.id
        ORDER BY r.date DESC
        LIMIT 100
      `;
      return res.status(200).json(rows.map(transformReview));
    }

    if (req.method === 'POST') {
      // Create a new review
      const { reviewerId, restaurantId, rating, content, flags, categories } = req.body;

      if (!reviewerId || !restaurantId || !rating || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const id = `rev-${Date.now()}`;
      const date = new Date().toISOString().split('T')[0];

      await sql`
        INSERT INTO reviews (id, reviewer_id, restaurant_id, rating, content, date, flags, categories)
        VALUES (${id}, ${reviewerId}, ${restaurantId}, ${rating}, ${content}, ${date}, ${flags || []}, ${JSON.stringify(categories || {})})
      `;

      // Update reviewer's aggregate rating and review count
      await sql`
        UPDATE reviewers SET
          total_restaurant_reviews = total_restaurant_reviews + 1,
          aggregate_rating = (
            SELECT AVG(rating) FROM reviews WHERE reviewer_id = ${reviewerId}
          ),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${reviewerId}
      `;

      return res.status(201).json({ id, message: 'Review created successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function transformReview(row) {
  return {
    id: row.id,
    reviewerId: row.reviewer_id,
    restaurantId: row.restaurant_id,
    rating: row.rating,
    content: row.content,
    date: row.date,
    verified: row.verified,
    helpful: row.helpful,
    flags: row.flags || [],
    categories: row.categories || {},
    // Joined fields
    restaurantName: row.restaurant_name,
    restaurantInitials: row.restaurant_initials,
    restaurantColor: row.restaurant_color,
    reviewerName: row.reviewer_name
  };
}
