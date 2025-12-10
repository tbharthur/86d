import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { id } = req.query;

      if (id) {
        const { rows } = await sql`
          SELECT * FROM restaurants WHERE id = ${id}
        `;
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
        return res.status(200).json(transformRestaurant(rows[0]));
      }

      const { rows } = await sql`SELECT * FROM restaurants ORDER BY name`;
      return res.status(200).json(rows.map(transformRestaurant));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function transformRestaurant(row) {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    color: row.color,
    location: row.location
  };
}
