import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { currentRestaurant } from '../data/restaurants';

export function Navbar({ onWriteReview }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse Reviewers' },
    { path: '/wall-of-fame', label: 'Wall of Fame' },
    { path: '/heads-up', label: 'Heads Up' },
  ];

  return (
    <nav className="bg-clapbac-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-clapbac-gold rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-clapbac-navy text-lg">CB</span>
            </div>
            <span className="font-display text-xl font-bold hidden sm:block">CLAPBAC</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-clapbac-gold ${
                  isActive(link.path) ? 'text-clapbac-gold' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Write Review Button & Restaurant Badge */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onWriteReview}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write Review
            </button>

            {/* Current Restaurant Badge */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: currentRestaurant.color }}
              >
                {currentRestaurant.initials}
              </div>
              <span className="text-sm text-white/80">{currentRestaurant.name}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
          <div className="px-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-clapbac-gold text-clapbac-navy'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWriteReview();
              }}
              className="w-full mt-2 btn-primary flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write Review
            </button>
          </div>
          {/* Current Restaurant in Mobile */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/5">
            <p className="text-xs text-white/60 mb-1">Logged in as:</p>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: currentRestaurant.color }}
              >
                {currentRestaurant.initials}
              </div>
              <span className="text-sm text-white">{currentRestaurant.name}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
