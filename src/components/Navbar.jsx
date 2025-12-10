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
    <nav className="bg-gradient-to-r from-clapbac-navy via-clapbac-navy to-clapbac-navy-light text-white sticky top-0 z-50 shadow-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-clapbac-gold to-clapbac-gold-light rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-xl">👏</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-clapbac-coral rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold tracking-tight">CLAP<span className="text-clapbac-gold">BAC</span></span>
              <span className="block text-[10px] text-white/50 -mt-1 font-accent tracking-widest">TURN THE TABLES</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive(link.path)
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-clapbac-gold rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Write Review Button & Restaurant Badge */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onWriteReview}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write Review
            </button>

            {/* Current Restaurant Badge */}
            <div className="flex items-center gap-2 glass-dark rounded-xl px-3 py-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: currentRestaurant.color }}
              >
                {currentRestaurant.initials}
              </div>
              <div className="text-left">
                <span className="block text-xs text-white/50">Logged in as</span>
                <span className="block text-sm font-medium text-white/90 -mt-0.5">{currentRestaurant.name}</span>
              </div>
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
        <div className="md:hidden border-t border-white/10 animate-fade-in">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
          <div className="px-3 pb-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-clapbac-gold to-clapbac-gold-light text-clapbac-navy shadow-glow'
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
              className="w-full mt-3 btn-primary flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write Review
            </button>
          </div>
          {/* Current Restaurant in Mobile */}
          <div className="px-4 py-4 border-t border-white/10 glass-dark mx-3 mb-3 rounded-xl">
            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Logged in as</p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-md"
                style={{ backgroundColor: currentRestaurant.color }}
              >
                {currentRestaurant.initials}
              </div>
              <span className="text-sm font-medium text-white">{currentRestaurant.name}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
