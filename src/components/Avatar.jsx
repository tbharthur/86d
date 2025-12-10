import React from 'react';

export function ReviewerAvatar({ reviewer, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-4xl'
  };

  // Generate a consistent color based on the reviewer's name
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];

  const colorIndex = reviewer.displayName.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className={`${sizes[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
      {reviewer.realNameInitial || reviewer.displayName.charAt(0).toUpperCase()}
    </div>
  );
}

export function RestaurantAvatar({ restaurant, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  return (
    <div
      className={`${sizes[size]} rounded-lg flex items-center justify-center text-white font-bold shadow-md`}
      style={{ backgroundColor: restaurant.color }}
    >
      {restaurant.initials}
    </div>
  );
}
