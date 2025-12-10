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
        className="reviewer-card block bg-white rounded-2xl border border-slate-100 p-4 shadow-card hover:shadow-card-hover"
      >
        <div className="flex items-center gap-3">
          <ReviewerAvatar reviewer={reviewer} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-brand-navy truncate">{reviewer.displayName}</h3>
              {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={reviewer.aggregateRating} size="sm" />
              <span className="text-xs text-slate-400">
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
      className="reviewer-card group block bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:shadow-card-hover relative overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-start gap-4 relative z-10">
        <ReviewerAvatar reviewer={reviewer} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-xl font-semibold text-brand-navy">
              {reviewer.displayName}
            </h3>
            {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
          </div>

          <p className="text-sm text-slate-400 mt-1">{reviewer.location}</p>

          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={reviewer.aggregateRating} size="md" />
            <span className="text-sm text-slate-500 font-medium">
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
              <span className="text-xs text-slate-400 self-center ml-1">
                +{reviewer.tags.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              {reviewer.publicReviewCount} public reviews written
            </span>
            <span className="text-xs text-slate-400">
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
          <span className="font-medium text-brand-navy truncate">{reviewer.displayName}</span>
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
    <Link
      to={`/reviewer/${reviewer.id}`}
      className={`block rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] ${
        isPositive
          ? 'bg-white/80 hover:bg-white border border-emerald-100/50'
          : 'bg-white/80 hover:bg-white border border-rose-100/50'
      }`}
    >
      {title && (
        <h4 className={`text-sm font-semibold mb-3 ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
          {title}
        </h4>
      )}
      <div className="flex items-center gap-3">
        <ReviewerAvatar reviewer={reviewer} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-brand-navy truncate">{reviewer.displayName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={reviewer.aggregateRating} size="sm" />
          </div>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
        }`}>
          {isPositive ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {reviewer.tags.slice(0, 2).map(tag => (
          <TagBadge key={tag} tag={tag} size="sm" />
        ))}
      </div>
    </Link>
  );
}
