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
      <section className="relative text-white py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-brand-gold/10 to-transparent rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-xl">🚫</span>
            <span className="text-sm font-medium text-white/90">The restaurant industry's secret weapon</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Turn the Tables on
            <span className="block gradient-text">Restaurant Reviewers</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Know who's walking through your door. See what other restaurants say about Yelpers, Google reviewers, and food critics <span className="text-white font-medium">before they review you</span>.
          </p>

          <SearchBarLarge />

          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-mint rounded-full animate-pulse"></span>
              <span>15+ reviewers tracked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
              <span>35+ restaurant reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-slate-100 py-8 px-4 -mt-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-14">
            <StatCard label="Reviewers Tracked" value={stats.totalReviewers} icon="users" />
            <StatCard label="Restaurant Reviews" value={stats.totalReviews} icon="clipboard" />
            <StatCard label="Avg Rating" value={stats.avgRating} icon="star" />
            <StatCard label="Active Alerts" value={stats.recentAlerts} icon="alert" highlight />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Reviews Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm font-semibold text-brand-gold uppercase tracking-wider">Latest Activity</span>
                <h2 className="font-display text-2xl font-bold text-brand-navy">
                  Recent Reviews
                </h2>
              </div>
              <Link to="/browse" className="btn-ghost text-sm">
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
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-5 border border-emerald-100 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-brand-navy flex items-center gap-2">
                  <span className="text-2xl">🏆</span> Wall of Fame
                </h3>
                <Link to="/wall-of-fame" className="text-sm font-medium text-brand-mint hover:text-brand-mint-light transition-colors">
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
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-5 border border-rose-100 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-brand-navy flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> Heads Up
                </h3>
                <Link to="/heads-up" className="text-sm font-medium text-brand-coral hover:text-brand-coral-light transition-colors">
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
            <div className="relative bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div className="relative z-10">
                <h3 className="font-display font-semibold text-white mb-2 text-lg">
                  Had a notable experience?
                </h3>
                <p className="text-sm text-white/70 mb-5 leading-relaxed">
                  Help other restaurants by sharing your experience with a reviewer.
                </p>
                <button onClick={onWriteReview} className="w-full btn-primary">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-mint/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">Simple Process</span>
            <h2 className="font-display text-3xl font-bold text-brand-navy">
              How 86'd Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
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
    <div className={`p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 ${
      highlight ? 'bg-gradient-to-br from-rose-50 to-white border border-rose-100' : 'bg-white border border-slate-100'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${
          highlight
            ? 'bg-gradient-to-br from-brand-coral to-brand-coral-light text-white shadow-glow-coral'
            : 'bg-gradient-to-br from-brand-gold to-brand-gold-light text-white shadow-glow'
        }`}>
          {icons[icon]}
        </div>
        <div>
          <p className={`text-3xl font-bold font-display ${highlight ? 'text-brand-coral' : 'text-brand-navy'}`}>
            {value}
          </p>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksCard({ step, title, description }) {
  return (
    <div className="text-center group">
      <div className="relative w-16 h-16 mx-auto mb-5">
        <div className="absolute inset-0 bg-brand-gold/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
        <div className="relative w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-gold-light text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-glow group-hover:scale-105 transition-transform duration-300">
          {step}
        </div>
      </div>
      <h3 className="font-display font-semibold text-brand-navy mb-2 text-lg">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
