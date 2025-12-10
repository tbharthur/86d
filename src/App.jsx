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
    <div className="min-h-screen bg-clapbac-cream">
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
    <footer className="bg-clapbac-navy text-white py-12 px-4 mt-auto">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-clapbac-gold rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-clapbac-navy text-lg">CB</span>
              </div>
              <span className="font-display text-xl font-bold">CLAPBAC</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Turning the tables on restaurant reviewers. Built by hospitality workers,
              for hospitality workers. Know who's walking through your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/browse" className="hover:text-clapbac-gold transition-colors">Browse Reviewers</a></li>
              <li><a href="/wall-of-fame" className="hover:text-clapbac-gold transition-colors">Wall of Fame</a></li>
              <li><a href="/heads-up" className="hover:text-clapbac-gold transition-colors">Heads Up</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-clapbac-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-clapbac-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-clapbac-gold transition-colors">Dispute a Review</a></li>
              <li><a href="#" className="hover:text-clapbac-gold transition-colors">Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © 2024 CLAPBAC. All rights reserved. This is a prototype.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">
              🍽️ Made with love by restaurant people
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
