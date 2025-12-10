import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchReviewers } from '../data/reviewers';
import { ReviewerAvatar } from './Avatar';
import { StarRating } from './StarRating';
import { EliteBadge } from './TagBadge';

export function SearchBar({ variant = 'default', placeholder = 'Search by Yelp username, Google profile...' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length >= 2) {
      const found = searchReviewers(query);
      setResults(found.slice(0, 5));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (reviewer) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/reviewer/${reviewer.id}`);
  };

  const variantStyles = {
    default: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20',
    light: 'bg-white border-gray-300 text-clapbac-navy placeholder-gray-400 focus:ring-2 focus:ring-clapbac-gold focus:border-transparent'
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-all ${variantStyles[variant]}`}
        />
        <svg
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
            variant === 'light' ? 'text-gray-400' : 'text-white/50'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
        >
          {results.map((reviewer, index) => (
            <button
              key={reviewer.id}
              onClick={() => handleSelect(reviewer)}
              className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                index === selectedIndex ? 'bg-clapbac-gold/10' : 'hover:bg-gray-50'
              }`}
            >
              <ReviewerAvatar reviewer={reviewer} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-clapbac-navy truncate">
                    {reviewer.displayName}
                  </span>
                  {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {reviewer.location} • {Object.values(reviewer.handles).join(', ')}
                </p>
              </div>
              <StarRating rating={reviewer.aggregateRating} size="sm" />
            </button>
          ))}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(`/browse?q=${encodeURIComponent(query)}`);
              }}
              className="text-sm text-clapbac-gold hover:underline"
            >
              See all results for "{query}"
            </button>
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
        >
          <p className="text-sm text-gray-500 text-center">
            No reviewers found for "{query}"
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            Try searching by Yelp username or location
          </p>
        </div>
      )}
    </div>
  );
}

export function SearchBarLarge() {
  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar
        variant="light"
        placeholder="Search for a reviewer by Yelp username, Google profile, or Instagram handle..."
      />
      <p className="text-center text-sm text-gray-500 mt-2">
        Look up anyone who's reviewed your restaurant
      </p>
    </div>
  );
}
