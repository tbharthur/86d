import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReviewerAvatar } from '../components/Avatar';
import { StarRating, RatingBadge } from '../components/StarRating';
import { TagBadge, PlatformBadge, EliteBadge } from '../components/TagBadge';
import { ReviewCard } from '../components/ReviewCard';
import { getReviewerById } from '../data/reviewers';
import { getReviewsForReviewer } from '../data/reviews';

export function ReviewerProfile({ onWriteReview }) {
  const { id } = useParams();
  const reviewer = getReviewerById(id);
  const reviews = getReviewsForReviewer(id);

  const [sortBy, setSortBy] = useState('recent');
  const [showAllTags, setShowAllTags] = useState(false);

  if (!reviewer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Reviewer Not Found</h1>
          <p className="text-gray-600 mb-4">This reviewer doesn't exist in our system.</p>
          <Link to="/browse" className="btn-primary">Browse Reviewers</Link>
        </div>
      </div>
    );
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Calculate category averages
  const categoryAverages = reviews.reduce((acc, r) => {
    if (r.categories) {
      acc.accuracy += r.categories.accuracy;
      acc.tipping += r.categories.tipping;
      acc.politeness += r.categories.politeness;
      acc.staffTreatment += r.categories.staffTreatment;
      acc.reasonable += r.categories.reasonable;
      acc.disclosed += r.categories.disclosed ? 1 : 0;
    }
    return acc;
  }, { accuracy: 0, tipping: 0, politeness: 0, staffTreatment: 0, reasonable: 0, disclosed: 0 });

  const count = reviews.length || 1;
  Object.keys(categoryAverages).forEach(key => {
    if (key !== 'disclosed') {
      categoryAverages[key] = (categoryAverages[key] / count).toFixed(1);
    }
  });
  const disclosureRate = Math.round((categoryAverages.disclosed / count) * 100);

  // Rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    ratingDistribution[r.rating - 1]++;
  });

  // Collect all flags
  const allFlags = reviews.flatMap(r => r.flags || []);
  const flagCounts = allFlags.reduce((acc, flag) => {
    acc[flag] = (acc[flag] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link
            to="/browse"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white mb-4 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Browse
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <ReviewerAvatar reviewer={reviewer} size="xl" />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-3xl font-bold">{reviewer.displayName}</h1>
                {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
              </div>

              <p className="text-white/70 mb-3">{reviewer.location}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {reviewer.platforms.map(platform => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>

              <p className="text-white/80 text-sm mb-4">{reviewer.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span>{reviewer.publicReviewCount} public reviews</span>
                <span>•</span>
                <span>Member since {reviewer.memberSince}</span>
                <span>•</span>
                <span>Active {reviewer.recentActivity}</span>
              </div>
            </div>

            <div className="flex flex-col items-center bg-white/10 rounded-xl p-4 min-w-[140px]">
              <RatingBadge rating={reviewer.aggregateRating} size="xl" />
              <p className="text-sm text-white/70 mt-2 text-center">
                from {reviewer.totalRestaurantReviews} restaurants
              </p>
              <button
                onClick={() => onWriteReview(reviewer)}
                className="btn-primary mt-3 text-sm w-full"
              >
                Write Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <h2 className="font-semibold text-brand-navy mb-3">Community Tags</h2>
              <div className="flex flex-wrap gap-2">
                {(showAllTags ? reviewer.tags : reviewer.tags.slice(0, 5)).map(tag => (
                  <TagBadge key={tag} tag={tag} size="md" />
                ))}
                {reviewer.tags.length > 5 && !showAllTags && (
                  <button
                    onClick={() => setShowAllTags(true)}
                    className="text-sm text-brand-gold hover:underline"
                  >
                    +{reviewer.tags.length - 5} more
                  </button>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-brand-navy">
                  Reviews from Restaurants ({reviews.length})
                </h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              {sortedReviews.length > 0 ? (
                <div className="space-y-4">
                  {sortedReviews.map(review => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      showReviewer={false}
                      showRestaurant={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No reviews yet for this reviewer.</p>
                  <button
                    onClick={() => onWriteReview(reviewer)}
                    className="btn-primary"
                  >
                    Be the first to review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-brand-navy mb-4">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map(stars => {
                const count = ratingDistribution[stars - 1];
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600 w-6">{stars}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-6">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Category Averages */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-brand-navy mb-4">Category Ratings</h3>
              <div className="space-y-3">
                <CategoryBar label="Accuracy" value={categoryAverages.accuracy} />
                <CategoryBar label="Tipping" value={categoryAverages.tipping} />
                <CategoryBar label="Politeness" value={categoryAverages.politeness} />
                <CategoryBar label="Staff Treatment" value={categoryAverages.staffTreatment} />
                <CategoryBar label="Reasonableness" value={categoryAverages.reasonable} />
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Disclosure Rate</span>
                    <span className="font-semibold text-brand-navy">{disclosureRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Flags */}
            {Object.keys(flagCounts).length > 0 && (
              <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Red Flags Reported
                </h3>
                <div className="space-y-2">
                  {Object.entries(flagCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([flag, count]) => (
                      <div key={flag} className="flex items-center justify-between text-sm">
                        <span className="text-red-700 capitalize">
                          {flag.replace(/-/g, ' ')}
                        </span>
                        <span className="text-red-600 font-medium">{count}x</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Handles */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-brand-navy mb-3">Platform Profiles</h3>
              <div className="space-y-2">
                {Object.entries(reviewer.handles).map(([platform, handle]) => (
                  <div key={platform} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 capitalize">{platform}</span>
                    <span className="font-medium text-brand-navy">{handle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryBar({ label, value }) {
  const numValue = parseFloat(value);
  const percentage = (numValue / 5) * 100;

  const getColor = () => {
    if (numValue >= 4) return 'bg-green-500';
    if (numValue >= 3) return 'bg-yellow-500';
    if (numValue >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-brand-navy">{value}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
