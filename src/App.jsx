import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { WriteReviewModal } from './components/WriteReviewModal';
import { Home } from './pages/Home';
import { BrowseReviewers } from './pages/BrowseReviewers';
import { ReviewerProfile } from './pages/ReviewerProfile';
import { WallOfFame } from './pages/WallOfFame';
import { HeadsUp } from './pages/HeadsUp';

function App() {
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [preselectedReviewer, setPreselectedReviewer] = useState(null);

  const handleOpenWriteReview = (reviewer = null) => {
    setPreselectedReviewer(reviewer);
    setIsWriteReviewOpen(true);
  };

  const handleCloseWriteReview = () => {
    setIsWriteReviewOpen(false);
    setPreselectedReviewer(null);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar onWriteReview={() => handleOpenWriteReview()} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home onWriteReview={() => handleOpenWriteReview()} />}
          />
          <Route
            path="/browse"
            element={<BrowseReviewers />}
          />
          <Route
            path="/reviewer/:id"
            element={<ReviewerProfile onWriteReview={handleOpenWriteReview} />}
          />
          <Route
            path="/wall-of-fame"
            element={<WallOfFame />}
          />
          <Route
            path="/heads-up"
            element={<HeadsUp />}
          />
        </Routes>
      </main>

      <Footer />

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={handleCloseWriteReview}
        preselectedReviewer={preselectedReviewer}
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-light text-white py-16 px-4 mt-auto overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-coral/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-2xl">🚫</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-tight">86<span className="text-brand-gold">'d</span></span>
                <span className="block text-xs text-white/40 -mt-0.5 font-accent tracking-widest">TURN THE TABLES</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Turning the tables on restaurant reviewers. Built by hospitality workers,
              for hospitality workers. Know who's walking through your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white/90">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/browse" className="text-white/60 hover:text-brand-gold transition-colors">Browse Reviewers</a></li>
              <li><a href="/wall-of-fame" className="text-white/60 hover:text-brand-gold transition-colors">Wall of Fame</a></li>
              <li><a href="/heads-up" className="text-white/60 hover:text-brand-gold transition-colors">Heads Up</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white/90">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/60 hover:text-brand-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-brand-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/60 hover:text-brand-gold transition-colors">Dispute a Review</a></li>
              <li><a href="#" className="text-white/60 hover:text-brand-gold transition-colors">Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2024 86'd. All rights reserved. This is a prototype.
          </p>
          <div className="flex items-center gap-2 text-white/30">
            <span className="text-lg">🍽️</span>
            <span className="text-xs font-medium">Made with love by restaurant people</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
