import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReviewerCard } from '../components/ReviewerCard';
import { SearchBar } from '../components/SearchBar';
import { reviewers, tagInfo } from '../data/reviewers';

export function BrowseReviewers() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('rating-desc');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterTags, setFilterTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const platforms = ['yelp', 'google', 'instagram', 'tiktok', 'tripadvisor', 'facebook'];

  const tagCategories = {
    positive: Object.entries(tagInfo).filter(([_, v]) => v.type === 'positive').map(([k]) => k),
    negative: Object.entries(tagInfo).filter(([_, v]) => v.type === 'negative').map(([k]) => k),
    warning: Object.entries(tagInfo).filter(([_, v]) => v.type === 'warning').map(([k]) => k),
  };

  const filteredReviewers = useMemo(() => {
    let result = [...reviewers];

    // Search filter
    if (query.length >= 2) {
      const q = query.toLowerCase();
      result = result.filter(r =>
        r.displayName.toLowerCase().includes(q) ||
        Object.values(r.handles).some(h => h.toLowerCase().includes(q)) ||
        r.location.toLowerCase().includes(q)
      );
    }

    // Platform filter
    if (filterPlatform !== 'all') {
      result = result.filter(r => r.platforms.includes(filterPlatform));
    }

    // Rating filter
    if (filterRating !== 'all') {
      switch (filterRating) {
        case 'high':
          result = result.filter(r => r.aggregateRating >= 4);
          break;
        case 'medium':
          result = result.filter(r => r.aggregateRating >= 2.5 && r.aggregateRating < 4);
          break;
        case 'low':
          result = result.filter(r => r.aggregateRating < 2.5);
          break;
      }
    }

    // Tag filter
    if (filterTags.length > 0) {
      result = result.filter(r =>
        filterTags.some(tag => r.tags.includes(tag))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'rating-desc':
        result.sort((a, b) => b.aggregateRating - a.aggregateRating);
        break;
      case 'rating-asc':
        result.sort((a, b) => a.aggregateRating - b.aggregateRating);
        break;
      case 'reviews-desc':
        result.sort((a, b) => b.totalRestaurantReviews - a.totalRestaurantReviews);
        break;
      case 'name':
        result.sort((a, b) => a.displayName.localeCompare(b.displayName));
        break;
    }

    return result;
  }, [query, sortBy, filterPlatform, filterRating, filterTags]);

  const toggleTag = (tag) => {
    setFilterTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSortBy('rating-desc');
    setFilterPlatform('all');
    setFilterRating('all');
    setFilterTags([]);
  };

  const hasActiveFilters = query || filterPlatform !== 'all' || filterRating !== 'all' || filterTags.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search reviewers..."
                  className="input-field pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="reviews-desc">Most Reviewed</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-outline text-sm flex items-center gap-2 ${showFilters ? 'bg-clapbac-navy text-white' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {hasActiveFilters && (
                <span className="bg-clapbac-gold text-white text-xs px-1.5 py-0.5 rounded-full">
                  {[filterPlatform !== 'all', filterRating !== 'all', filterTags.length > 0].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Platform Filter */}
                <div>
                  <label className="block text-sm font-medium text-clapbac-navy mb-2">Platform</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterPlatform('all')}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        filterPlatform === 'all'
                          ? 'bg-clapbac-navy border-clapbac-navy text-white'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      All
                    </button>
                    {platforms.map(platform => (
                      <button
                        key={platform}
                        onClick={() => setFilterPlatform(platform)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors capitalize ${
                          filterPlatform === platform
                            ? 'bg-clapbac-navy border-clapbac-navy text-white'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-clapbac-navy mb-2">Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Ratings' },
                      { value: 'high', label: '4+ Stars' },
                      { value: 'medium', label: '2.5-4 Stars' },
                      { value: 'low', label: 'Below 2.5' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFilterRating(option.value)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          filterRating === option.value
                            ? 'bg-clapbac-navy border-clapbac-navy text-white'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>

              {/* Tag Filters */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-clapbac-navy mb-2">Tags</label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {tagCategories.positive.slice(0, 6).map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                          filterTags.includes(tag)
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-green-50 border-green-200 text-green-700 hover:border-green-300'
                        }`}
                      >
                        {tagInfo[tag].label}
                      </button>
                    ))}
                    {tagCategories.negative.slice(0, 6).map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                          filterTags.includes(tag)
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-red-50 border-red-200 text-red-700 hover:border-red-300'
                        }`}
                      >
                        {tagInfo[tag].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredReviewers.length} of {reviewers.length} reviewers
          {query && <span> matching "<strong>{query}</strong>"</span>}
        </p>

        {filteredReviewers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReviewers.map(reviewer => (
              <ReviewerCard key={reviewer.id} reviewer={reviewer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-clapbac-navy mb-2">No reviewers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-outline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
