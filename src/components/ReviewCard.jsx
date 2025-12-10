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
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {showRestaurant && restaurant && (
            <RestaurantAvatar restaurant={restaurant} size="md" />
          )}
          <div>
            {showRestaurant && restaurant && (
              <h4 className="font-semibold text-brand-navy">{restaurant.name}</h4>
            )}
            <p className="text-sm text-slate-400">
              {formatDate(review.date)}
              {review.verified && (
                <span className="ml-2 inline-flex items-center text-emerald-600">
                  <svg className="w-3.5 h-3.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Verified</span>
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
          className="flex items-center gap-3 mt-4 p-3 -mx-1 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
        >
          <ReviewerAvatar reviewer={reviewer} size="sm" />
          <span className="text-sm font-medium text-brand-navy group-hover:text-brand-gold transition-colors">
            About: {reviewer.displayName}
          </span>
          <svg className="w-4 h-4 text-slate-400 ml-auto group-hover:text-brand-gold group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {/* Review content */}
      <p className="mt-4 text-slate-600 leading-relaxed">{review.content}</p>

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
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <CategoryRating label="Accuracy" rating={review.categories.accuracy} />
            <CategoryRating label="Tipping" rating={review.categories.tipping} />
            <CategoryRating label="Politeness" rating={review.categories.politeness} />
            <CategoryRating label="Staff Treatment" rating={review.categories.staffTreatment} />
            <CategoryRating label="Reasonable" rating={review.categories.reasonable} />
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Disclosed:</span>
              <span className={`font-medium ${review.categories.disclosed ? 'text-emerald-600' : 'text-slate-400'}`}>
                {review.categories.disclosed ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors group">
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Helpful ({review.helpful})</span>
        </button>
        <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}

function CategoryRating({ label, rating }) {
  const getColor = (r) => {
    if (r >= 4) return 'text-emerald-600';
    if (r >= 3) return 'text-amber-500';
    if (r >= 2) return 'text-orange-500';
    return 'text-rose-500';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-500">{label}:</span>
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
    <div className="group bg-white rounded-2xl border border-slate-100 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {restaurant && <RestaurantAvatar restaurant={restaurant} size="sm" />}
          <div>
            <p className="text-sm font-semibold text-brand-navy">{restaurant?.name}</p>
            <p className="text-xs text-slate-400">{formatDate(review.date)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" showNumber={false} />
      </div>

      {reviewer && (
        <Link
          to={`/reviewer/${reviewer.id}`}
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-slate-500 hover:text-brand-gold transition-colors group/link"
        >
          <span className="text-slate-400">Re:</span> {reviewer.displayName}
          <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">{review.content}</p>

      {review.flags && review.flags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {review.flags.slice(0, 2).map(flag => (
            <FlagBadge key={flag} flag={flag} size="sm" />
          ))}
        </div>
      )}
    </div>
  );
}
