import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReviewerAvatar } from '../components/Avatar';
import { StarRating, RatingBadge } from '../components/StarRating';
import { TagBadge, FlagBadge, EliteBadge } from '../components/TagBadge';
import { reviewers, tagInfo } from '../data/reviewers';
import { reviews, flagInfo } from '../data/reviews';

export function HeadsUp() {
  const [filterTag, setFilterTag] = useState('all');

  // Get problematic reviewers (rating below 3)
  const problematicReviewers = [...reviewers]
    .filter(r => r.aggregateRating < 3)
    .sort((a, b) => a.aggregateRating - b.aggregateRating);

  // Get flag counts per reviewer
  const getReviewerFlags = (reviewerId) => {
    const reviewerReviews = reviews.filter(r => r.reviewerId === reviewerId);
    const allFlags = reviewerReviews.flatMap(r => r.flags || []);
    return allFlags.reduce((acc, flag) => {
      acc[flag] = (acc[flag] || 0) + 1;
      return acc;
    }, {});
  };

  // Negative tags for filtering
  const negativeTags = Object.entries(tagInfo)
    .filter(([_, v]) => v.type === 'negative')
    .map(([k]) => k);

  // Filter by tag if selected
  const filteredReviewers = filterTag === 'all'
    ? problematicReviewers
    : problematicReviewers.filter(r => r.tags.includes(filterTag));

  // Most common flags across all problematic reviewers
  const allFlagCounts = {};
  problematicReviewers.forEach(r => {
    const flags = getReviewerFlags(r.id);
    Object.entries(flags).forEach(([flag, count]) => {
      allFlagCounts[flag] = (allFlagCounts[flag] || 0) + count;
    });
  });

  const topFlags = Object.entries(allFlagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="font-display text-4xl font-bold mb-4">Heads Up</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Know before they're seated. These reviewers have patterns of problematic behavior
            reported by multiple restaurants.
          </p>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{problematicReviewers.length}</p>
            <p className="text-sm text-gray-600">Flagged Reviewers</p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p className="text-3xl font-bold text-red-600">
              {Object.values(allFlagCounts).reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Red Flags</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">
              {topFlags[0] ? topFlags[0][1] : 0}
            </p>
            <p className="text-sm text-gray-600">
              Most Common: {topFlags[0] ? topFlags[0][0].replace(/-/g, ' ') : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <h3 className="font-semibold text-clapbac-navy mb-4">Filter by Behavior</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterTag('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filterTag === 'all'
                      ? 'bg-red-100 text-red-800'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  All Flagged ({problematicReviewers.length})
                </button>
                {negativeTags.map(tag => {
                  const count = problematicReviewers.filter(r => r.tags.includes(tag)).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(tag)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterTag === tag
                          ? 'bg-red-100 text-red-800'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tagInfo[tag].label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Top Flags */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-clapbac-navy mb-3">Most Reported Issues</h3>
                <div className="space-y-2">
                  {topFlags.map(([flag, count]) => (
                    <div key={flag} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 capitalize">{flag.replace(/-/g, ' ')}</span>
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-clapbac-navy">
                {filterTag === 'all' ? 'All Flagged Reviewers' : `${tagInfo[filterTag]?.label}`}
              </h2>
              <span className="text-sm text-gray-500">{filteredReviewers.length} reviewers</span>
            </div>

            {filteredReviewers.length > 0 ? (
              <div className="space-y-4">
                {filteredReviewers.map(reviewer => {
                  const flags = getReviewerFlags(reviewer.id);
                  return (
                    <HeadsUpCard
                      key={reviewer.id}
                      reviewer={reviewer}
                      flags={flags}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">No reviewers match this filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            A Note on Fairness
          </h3>
          <p className="text-sm text-amber-700">
            These reports come from restaurant experiences and reflect patterns across multiple establishments.
            We encourage fair treatment of all guests and do not condone discrimination.
            Reviewers can dispute reports through our appeals process.
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadsUpCard({ reviewer, flags }) {
  const flagEntries = Object.entries(flags).sort((a, b) => b[1] - a[1]);

  return (
    <Link
      to={`/reviewer/${reviewer.id}`}
      className="block bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <ReviewerAvatar reviewer={reviewer} size="lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-clapbac-navy">{reviewer.displayName}</h3>
              {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
            </div>
            <p className="text-sm text-gray-500">{reviewer.location}</p>

            <div className="flex items-center gap-3 mt-2">
              <RatingBadge rating={reviewer.aggregateRating} size="sm" />
              <span className="text-sm text-gray-600">
                from {reviewer.totalRestaurantReviews} restaurants
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {reviewer.tags
                .filter(t => tagInfo[t]?.type === 'negative')
                .slice(0, 4)
                .map(tag => (
                  <TagBadge key={tag} tag={tag} size="sm" />
                ))}
            </div>
          </div>

          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Flags footer */}
      {flagEntries.length > 0 && (
        <div className="bg-red-50 px-5 py-3 border-t border-red-100">
          <p className="text-xs text-red-600 font-medium mb-2">Reported Issues:</p>
          <div className="flex flex-wrap gap-2">
            {flagEntries.slice(0, 3).map(([flag, count]) => (
              <span key={flag} className="inline-flex items-center text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                {flag.replace(/-/g, ' ')}
                {count > 1 && <span className="ml-1 font-semibold">×{count}</span>}
              </span>
            ))}
            {flagEntries.length > 3 && (
              <span className="text-xs text-red-600">
                +{flagEntries.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
