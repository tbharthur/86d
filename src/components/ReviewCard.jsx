import React from 'react';
import { Link } from 'react-router-dom';
import { RestaurantAvatar, ReviewerAvatar } from './Avatar';
import { StarRating } from './StarRating';
import { FlagBadge } from './TagBadge';
import { getRestaurantById } from '../data/restaurants';
import { getReviewerById } from '../data/reviewers';

export function ReviewCard({ review, showReviewer = true, showRestaurant = true }) {
  const restaurant = getRestaurantById(review.restaurantId);
  const reviewer = getReviewerById(review.reviewerId);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {showRestaurant && restaurant && (
            <RestaurantAvatar restaurant={restaurant} size="md" />
          )}
          <div>
            {showRestaurant && restaurant && (
              <h4 className="font-semibold text-clapbac-navy">{restaurant.name}</h4>
            )}
            <p className="text-sm text-gray-500">
              {formatDate(review.date)}
              {review.verified && (
                <span className="ml-2 inline-flex items-center text-green-600">
                  <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Verified</span>
                </span>
              )}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} size="md" />
      </div>

      {/* Reviewer info (if showing) */}
      {showReviewer && reviewer && (
        <Link
          to={`/reviewer/${reviewer.id}`}
          className="flex items-center gap-2 mt-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ReviewerAvatar reviewer={reviewer} size="sm" />
          <span className="text-sm font-medium text-clapbac-navy hover:underline">
            About: {reviewer.displayName}
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {/* Review content */}
      <p className="mt-3 text-gray-700 leading-relaxed">{review.content}</p>

      {/* Flags */}
      {review.flags && review.flags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {review.flags.map(flag => (
            <FlagBadge key={flag} flag={flag} size="sm" />
          ))}
        </div>
      )}

      {/* Category ratings */}
      {review.categories && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <CategoryRating label="Accuracy" rating={review.categories.accuracy} />
            <CategoryRating label="Tipping" rating={review.categories.tipping} />
            <CategoryRating label="Politeness" rating={review.categories.politeness} />
            <CategoryRating label="Staff Treatment" rating={review.categories.staffTreatment} />
            <CategoryRating label="Reasonable" rating={review.categories.reasonable} />
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Disclosed:</span>
              <span className={review.categories.disclosed ? 'text-green-600' : 'text-gray-400'}>
                {review.categories.disclosed ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-clapbac-gold transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Helpful ({review.helpful})</span>
        </button>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}

function CategoryRating({ label, rating }) {
  const getColor = (r) => {
    if (r >= 4) return 'text-green-600';
    if (r >= 3) return 'text-yellow-600';
    if (r >= 2) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600">{label}:</span>
      <span className={`font-semibold ${getColor(rating)}`}>{rating}/5</span>
    </div>
  );
}

export function ReviewCardCompact({ review }) {
  const restaurant = getRestaurantById(review.restaurantId);
  const reviewer = getReviewerById(review.reviewerId);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {restaurant && <RestaurantAvatar restaurant={restaurant} size="sm" />}
          <div>
            <p className="text-sm font-medium text-clapbac-navy">{restaurant?.name}</p>
            <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" showNumber={false} />
      </div>

      {reviewer && (
        <Link
          to={`/reviewer/${reviewer.id}`}
          className="inline-flex items-center gap-1 mt-2 text-sm text-gray-600 hover:text-clapbac-gold"
        >
          Re: {reviewer.displayName}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      <p className="mt-2 text-sm text-gray-700 line-clamp-2">{review.content}</p>

      {review.flags && review.flags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {review.flags.slice(0, 2).map(flag => (
            <FlagBadge key={flag} flag={flag} size="sm" />
          ))}
        </div>
      )}
    </div>
  );
}
