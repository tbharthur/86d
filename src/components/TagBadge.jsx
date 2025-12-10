import React from 'react';
import { tagInfo } from '../data/reviewers';
import { flagInfo } from '../data/reviews';

export function TagBadge({ tag, size = 'md' }) {
  const info = tagInfo[tag];
  if (!info) return null;

  const typeStyles = {
    positive: 'bg-green-100 text-green-800 border-green-200',
    negative: 'bg-red-100 text-red-800 border-red-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${typeStyles[info.type]} ${sizeStyles[size]}`}>
      {info.label}
    </span>
  );
}

export function FlagBadge({ flag, size = 'md' }) {
  const info = flagInfo[flag];
  if (!info) return null;

  const severityStyles = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-orange-100 text-orange-800 border-orange-300',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const icons = {
    high: (
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    medium: (
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    low: null
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${severityStyles[info.severity]} ${sizeStyles[size]}`}>
      {icons[info.severity]}
      {info.label}
    </span>
  );
}

export function PlatformBadge({ platform }) {
  const platformStyles = {
    yelp: { bg: 'bg-red-600', text: 'Yelp' },
    google: { bg: 'bg-blue-500', text: 'Google' },
    instagram: { bg: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'Instagram' },
    tiktok: { bg: 'bg-black', text: 'TikTok' },
    tripadvisor: { bg: 'bg-green-600', text: 'TripAdvisor' },
    facebook: { bg: 'bg-blue-600', text: 'Facebook' },
    opentable: { bg: 'bg-red-500', text: 'OpenTable' },
    happycow: { bg: 'bg-green-500', text: 'HappyCow' },
    eater: { bg: 'bg-red-700', text: 'Eater' }
  };

  const style = platformStyles[platform] || { bg: 'bg-gray-500', text: platform };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${style.bg}`}>
      {style.text}
    </span>
  );
}

export function EliteBadge({ years }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 shadow-sm">
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Elite '{years ? years[years.length - 1]?.slice(-2) : ''}
    </span>
  );
}
