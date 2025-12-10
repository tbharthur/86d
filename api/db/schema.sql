-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  initials VARCHAR(10) NOT NULL,
  color VARCHAR(20) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviewers table
CREATE TABLE IF NOT EXISTS reviewers (
  id VARCHAR(50) PRIMARY KEY,
  display_name VARCHAR(255) NOT NULL,
  real_name_initial VARCHAR(5),
  platforms TEXT[], -- Array of platforms
  handles JSONB, -- JSON object for platform handles
  avatar VARCHAR(500),
  location VARCHAR(255),
  public_review_count INTEGER DEFAULT 0,
  member_since VARCHAR(10),
  elite_status BOOLEAN DEFAULT FALSE,
  elite_years TEXT[],
  followers INTEGER,
  aggregate_rating DECIMAL(2,1) DEFAULT 0,
  total_restaurant_reviews INTEGER DEFAULT 0,
  tags TEXT[],
  bio TEXT,
  recent_activity VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews (restaurants reviewing reviewers)
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
  categories JSONB, -- {accuracy, tipping, politeness, staffTreatment, reasonable, disclosed}
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review flags metadata
CREATE TABLE IF NOT EXISTS flag_types (
  flag_key VARCHAR(100) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('positive', 'negative', 'neutral', 'warning'))
);

-- Tag metadata
CREATE TABLE IF NOT EXISTS tag_types (
  tag_key VARCHAR(100) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('positive', 'negative', 'neutral', 'warning'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(date DESC);
CREATE INDEX IF NOT EXISTS idx_reviewers_rating ON reviewers(aggregate_rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviewers_display_name ON reviewers(display_name);
