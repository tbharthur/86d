import React from 'react';
import { Link } from 'react-router-dom';
import { ReviewerAvatar } from './Avatar';
import { StarRating, RatingBadge } from './StarRating';
import { TagBadge, PlatformBadge, EliteBadge } from './TagBadge';

export function ReviewerCard({ reviewer, variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <Link
        to={`/reviewer/${reviewer.id}`}
        className="reviewer-card block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <ReviewerAvatar reviewer={reviewer} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-clapbac-navy truncate">{reviewer.displayName}</h3>
              {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={reviewer.aggregateRating} size="sm" />
              <span className="text-xs text-gray-500">
                ({reviewer.totalRestaurantReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/reviewer/${reviewer.id}`}
      className="reviewer-card block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <ReviewerAvatar reviewer={reviewer} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-xl font-semibold text-clapbac-navy">
              {reviewer.displayName}
            </h3>
            {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
          </div>

          <p className="text-sm text-gray-500 mt-1">{reviewer.location}</p>

          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={reviewer.aggregateRating} size="md" />
            <span className="text-sm text-gray-600">
              from {reviewer.totalRestaurantReviews} restaurants
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {reviewer.platforms.map(platform => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {reviewer.tags.slice(0, 3).map(tag => (
              <TagBadge key={tag} tag={tag} size="sm" />
            ))}
            {reviewer.tags.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{reviewer.tags.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {reviewer.publicReviewCount} public reviews written
            </span>
            <span className="text-xs text-gray-500">
              Active {reviewer.recentActivity}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ReviewerListItem({ reviewer, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white hover:bg-gray-50 border-b border-gray-100 p-4 flex items-center gap-4 transition-colors"
    >
      <ReviewerAvatar reviewer={reviewer} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-clapbac-navy truncate">{reviewer.displayName}</span>
          {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{reviewer.location}</span>
          <span>•</span>
          <span>{reviewer.publicReviewCount} reviews</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <RatingBadge rating={reviewer.aggregateRating} size="sm" />
        <span className="text-xs text-gray-500 mt-1">
          {reviewer.totalRestaurantReviews} reports
        </span>
      </div>
    </button>
  );
}

export function ReviewerSpotlight({ reviewer, title }) {
  const isPositive = reviewer.aggregateRating >= 4;

  return (
    <div className={`rounded-xl p-5 ${isPositive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      {title && (
        <h4 className={`text-sm font-semibold mb-3 ${isPositive ? 'text-green-800' : 'text-red-800'}`}>
          {title}
        </h4>
      )}
      <Link to={`/reviewer/${reviewer.id}`} className="block hover:opacity-80 transition-opacity">
        <div className="flex items-center gap-3">
          <ReviewerAvatar reviewer={reviewer} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-clapbac-navy truncate">{reviewer.displayName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={reviewer.aggregateRating} size="sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {reviewer.tags.slice(0, 2).map(tag => (
            <TagBadge key={tag} tag={tag} size="sm" />
          ))}
        </div>
      </Link>
    </div>
  );
}
