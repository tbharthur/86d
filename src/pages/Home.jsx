import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBarLarge } from '../components/SearchBar';
import { ReviewerCard, ReviewerSpotlight } from '../components/ReviewerCard';
import { ReviewCardCompact } from '../components/ReviewCard';
import { reviewers } from '../data/reviewers';
import { getRecentReviews } from '../data/reviews';

export function Home({ onWriteReview }) {
  const recentReviews = getRecentReviews(6);

  // Get top rated reviewers (Wall of Fame preview)
  const topReviewers = [...reviewers]
    .sort((a, b) => b.aggregateRating - a.aggregateRating)
    .slice(0, 3);

  // Get problematic reviewers (Heads Up preview)
  const problematicReviewers = [...reviewers]
    .sort((a, b) => a.aggregateRating - b.aggregateRating)
    .slice(0, 3);

  // Stats for the dashboard
  const stats = {
    totalReviewers: reviewers.length,
    totalReviews: 35,
    avgRating: (reviewers.reduce((acc, r) => acc + r.aggregateRating, 0) / reviewers.length).toFixed(1),
    recentAlerts: problematicReviewers.filter(r => r.aggregateRating < 2.5).length
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-clapbac-navy to-clapbac-navy-light text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Turn the Tables on Reviewers
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Know who's walking through your door. See what other restaurants say about Yelpers, Google reviewers, and food critics before they review you.
          </p>
          <SearchBarLarge />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Reviewers Tracked" value={stats.totalReviewers} icon="users" />
            <StatCard label="Restaurant Reviews" value={stats.totalReviews} icon="clipboard" />
            <StatCard label="Avg Rating" value={stats.avgRating} icon="star" />
            <StatCard label="Active Alerts" value={stats.recentAlerts} icon="alert" highlight />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Reviews Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold text-clapbac-navy">
                Recent Reviews
              </h2>
              <Link to="/browse" className="text-sm text-clapbac-gold hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recentReviews.map(review => (
                <ReviewCardCompact key={review.id} review={review} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wall of Fame Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-semibold text-clapbac-navy flex items-center gap-2">
                  <span className="text-2xl">🏆</span> Wall of Fame
                </h3>
                <Link to="/wall-of-fame" className="text-sm text-clapbac-gold hover:underline">
                  See all →
                </Link>
              </div>
              <div className="space-y-3">
                {topReviewers.map(reviewer => (
                  <ReviewerSpotlight
                    key={reviewer.id}
                    reviewer={reviewer}
                  />
                ))}
              </div>
            </div>

            {/* Heads Up Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-semibold text-clapbac-navy flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> Heads Up
                </h3>
                <Link to="/heads-up" className="text-sm text-clapbac-gold hover:underline">
                  See all →
                </Link>
              </div>
              <div className="space-y-3">
                {problematicReviewers.map(reviewer => (
                  <ReviewerSpotlight
                    key={reviewer.id}
                    reviewer={reviewer}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-clapbac-gold/10 rounded-xl p-5 border border-clapbac-gold/20">
              <h3 className="font-semibold text-clapbac-navy mb-2">
                Had a notable experience?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Help other restaurants by sharing your experience with a reviewer.
              </p>
              <button onClick={onWriteReview} className="w-full btn-primary">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-clapbac-navy text-center mb-8">
            How CLAPBAC Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <HowItWorksCard
              step={1}
              title="Look Up a Reviewer"
              description="Search by Yelp username, Google profile, or Instagram handle to see their track record."
            />
            <HowItWorksCard
              step={2}
              title="See What Others Say"
              description="Read reviews from other restaurants about their actual experience with this person."
            />
            <HowItWorksCard
              step={3}
              title="Share Your Experience"
              description="After serving a reviewer, add your own rating to help the community."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon, highlight = false }) {
  const icons = {
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    clipboard: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    star: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    alert: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  };

  return (
    <div className={`p-4 rounded-lg ${highlight ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${highlight ? 'bg-red-100 text-red-600' : 'bg-clapbac-gold/10 text-clapbac-gold'}`}>
          {icons[icon]}
        </div>
        <div>
          <p className={`text-2xl font-bold ${highlight ? 'text-red-600' : 'text-clapbac-navy'}`}>
            {value}
          </p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksCard({ step, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-clapbac-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="font-semibold text-clapbac-navy mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
