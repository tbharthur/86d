import React, { useState, useEffect } from 'react';

const CORRECT_PASSWORD = 'NICOLO DEAN';
const STORAGE_KEY = 'eightysixd_authenticated';

export function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toUpperCase().trim() === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-2xl flex items-center justify-center shadow-glow mb-4">
              <span className="text-3xl">🚫</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">
              86<span className="text-brand-gold">'d</span>
            </h1>
            <span className="text-xs text-white/40 font-accent tracking-widest mt-1">TURN THE TABLES</span>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all duration-200"
                placeholder="Enter access password"
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/30 rounded-xl">
                <p className="text-sm text-rose-300 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg"
            >
              Access Site
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-6">
            This is a private prototype. Authorized access only.
          </p>
        </div>
      </div>
    </div>
  );
}
