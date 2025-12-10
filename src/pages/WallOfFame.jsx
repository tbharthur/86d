import React from 'react';
import { Link } from 'react-router-dom';
import { ReviewerCard } from '../components/ReviewerCard';
import { ReviewerAvatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { TagBadge, EliteBadge } from '../components/TagBadge';
import { reviewers } from '../data/reviewers';

export function WallOfFame() {
  // Get top-rated reviewers
  const topReviewers = [...reviewers]
    .filter(r => r.aggregateRating >= 4)
    .sort((a, b) => {
      // Sort by rating, then by number of reviews
      if (b.aggregateRating !== a.aggregateRating) {
        return b.aggregateRating - a.aggregateRating;
      }
      return b.totalRestaurantReviews - a.totalRestaurantReviews;
    });

  // Top 3 for the podium
  const podium = topReviewers.slice(0, 3);
  const restOfList = topReviewers.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="font-display text-4xl font-bold mb-4">Wall of Fame</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Celebrating reviewers who do it right. These critics are fair, respectful, and a pleasure to serve.
            We're proud to have them in our restaurants.
          </p>
        </div>
      </div>

      {/* Podium */}
      {podium.length >= 3 && (
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* Second Place */}
            <PodiumCard reviewer={podium[1]} place={2} />
            {/* First Place */}
            <PodiumCard reviewer={podium[0]} place={1} />
            {/* Third Place */}
            <PodiumCard reviewer={podium[2]} place={3} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* What makes a great reviewer */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-brand-navy mb-4">
            What Makes a Great Reviewer?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <QualityCard
              icon="✓"
              title="Fair & Accurate"
              description="Their reviews reflect reality. They notice positives alongside negatives."
            />
            <QualityCard
              icon="💵"
              title="Tips Well"
              description="They understand that servers work hard and compensate accordingly."
            />
            <QualityCard
              icon="🤝"
              title="Treats Staff with Respect"
              description="Polite, patient, and understanding—even when things go wrong."
            />
          </div>
        </div>

        {/* Rest of the list */}
        {restOfList.length > 0 && (
          <>
            <h2 className="font-display text-2xl font-semibold text-brand-navy mb-6">
              More Great Reviewers
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {restOfList.map((reviewer, index) => (
                <Link
                  key={reviewer.id}
                  to={`/reviewer/${reviewer.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-4"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full text-amber-700 font-bold text-sm">
                    #{index + 4}
                  </div>
                  <ReviewerAvatar reviewer={reviewer} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-brand-navy truncate">
                        {reviewer.displayName}
                      </h3>
                      {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reviewer.tags.filter(t =>
                        ['fair-critic', 'great-tipper', 'respectful', 'appreciative', 'polite'].includes(t)
                      ).slice(0, 2).map(tag => (
                        <TagBadge key={tag} tag={tag} size="sm" />
                      ))}
                    </div>
                  </div>
                  <StarRating rating={reviewer.aggregateRating} size="sm" />
                </Link>
              ))}
            </div>
          </>
        )}

        {topReviewers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No highly-rated reviewers yet. Be the first to recognize someone!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PodiumCard({ reviewer, place }) {
  const heights = {
    1: 'pb-16',
    2: 'pb-8',
    3: 'pb-4'
  };

  const medals = {
    1: '🥇',
    2: '🥈',
    3: '🥉'
  };

  const bgColors = {
    1: 'bg-gradient-to-b from-amber-400 to-amber-500',
    2: 'bg-gradient-to-b from-gray-300 to-gray-400',
    3: 'bg-gradient-to-b from-orange-300 to-orange-400'
  };

  return (
    <Link
      to={`/reviewer/${reviewer.id}`}
      className={`${heights[place]} block`}
    >
      <div className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="text-3xl mb-2">{medals[place]}</div>
        <ReviewerAvatar reviewer={reviewer} size={place === 1 ? 'lg' : 'md'} />
        <h3 className="font-semibold text-brand-navy mt-3 truncate">
          {reviewer.displayName}
        </h3>
        <div className="mt-2">
          <StarRating rating={reviewer.aggregateRating} size="sm" />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {reviewer.totalRestaurantReviews} reviews
        </p>
        <div className={`mt-auto pt-3 -mx-4 -mb-4 rounded-b-xl ${bgColors[place]} py-2`}>
          <span className="text-white font-bold text-sm">#{place}</span>
        </div>
      </div>
    </Link>
  );
}

function QualityCard({ icon, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-brand-navy mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
