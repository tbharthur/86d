import React, { useState, useEffect } from 'react';
import { reviewers, tagInfo } from '../data/reviewers';
import { currentRestaurant } from '../data/restaurants';
import { ReviewerAvatar } from './Avatar';
import { StarRating } from './StarRating';
import { EliteBadge, PlatformBadge } from './TagBadge';

export function WriteReviewModal({ isOpen, onClose, preselectedReviewer = null }) {
  const [step, setStep] = useState(preselectedReviewer ? 2 : 1);
  const [selectedReviewer, setSelectedReviewer] = useState(preselectedReviewer);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    rating: 0,
    content: '',
    accuracy: 3,
    tipping: 3,
    politeness: 3,
    staffTreatment: 3,
    reasonable: 3,
    disclosed: false,
    flags: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedReviewer) {
      setSelectedReviewer(preselectedReviewer);
      setStep(2);
    }
  }, [preselectedReviewer]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setStep(preselectedReviewer ? 2 : 1);
        setSelectedReviewer(preselectedReviewer);
        setSearchQuery('');
        setFormData({
          rating: 0,
          content: '',
          accuracy: 3,
          tipping: 3,
          politeness: 3,
          staffTreatment: 3,
          reasonable: 3,
          disclosed: false,
          flags: []
        });
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen, preselectedReviewer]);

  if (!isOpen) return null;

  const filteredReviewers = searchQuery.length >= 2
    ? reviewers.filter(r =>
        r.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(r.handles).some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : reviewers.slice(0, 8);

  const handleSelectReviewer = (reviewer) => {
    setSelectedReviewer(reviewer);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Auto-close after showing success
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const flagOptions = [
    { id: 'threatened-review', label: 'Threatened bad review' },
    { id: 'solicited-freebies', label: 'Solicited freebies/comps' },
    { id: 'fabricated-claims', label: 'Made fabricated claims' },
    { id: 'caused-scene', label: 'Caused a scene' },
    { id: 'undertipped', label: 'Significantly undertipped' },
    { id: 'made-staff-cry', label: 'Made staff cry' },
  ];

  const toggleFlag = (flagId) => {
    setFormData(prev => ({
      ...prev,
      flags: prev.flags.includes(flagId)
        ? prev.flags.filter(f => f !== flagId)
        : [...prev.flags, flagId]
    }));
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in mx-4">
        {/* Header */}
        <div className="bg-clapbac-navy text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Write a Review</h2>
            <p className="text-sm text-white/70">
              Posting as {currentRestaurant.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Success State */}
          {submitted && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-clapbac-navy mb-2">Review Submitted!</h3>
              <p className="text-gray-600">
                Your review of {selectedReviewer?.displayName} has been posted.
              </p>
            </div>
          )}

          {/* Step 1: Select Reviewer */}
          {!submitted && step === 1 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-clapbac-navy mb-4">
                Who are you reviewing?
              </h3>

              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Yelp username, handle, etc."
                  className="input-field pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredReviewers.map(reviewer => (
                  <button
                    key={reviewer.id}
                    onClick={() => handleSelectReviewer(reviewer)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-clapbac-gold hover:bg-clapbac-gold/5 transition-colors flex items-center gap-3"
                  >
                    <ReviewerAvatar reviewer={reviewer} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-clapbac-navy">{reviewer.displayName}</span>
                        {reviewer.eliteStatus && <EliteBadge years={reviewer.eliteYears} />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {reviewer.platforms.slice(0, 2).map(p => (
                          <PlatformBadge key={p} platform={p} />
                        ))}
                        <span className="text-xs text-gray-500">{reviewer.location}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Can't find them? They may not be in our system yet.
                </p>
                <button className="w-full mt-2 btn-outline text-sm">
                  Add New Reviewer
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Write Review */}
          {!submitted && step === 2 && selectedReviewer && (
            <form onSubmit={handleSubmit} className="p-6">
              {/* Selected Reviewer */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-6">
                <ReviewerAvatar reviewer={selectedReviewer} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-clapbac-navy">{selectedReviewer.displayName}</span>
                    {selectedReviewer.eliteStatus && <EliteBadge years={selectedReviewer.eliteYears} />}
                  </div>
                  <p className="text-sm text-gray-500">{selectedReviewer.location}</p>
                </div>
                {!preselectedReviewer && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-clapbac-gold hover:underline"
                  >
                    Change
                  </button>
                )}
              </div>

              {/* Overall Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-clapbac-navy mb-2">
                  Overall Rating *
                </label>
                <StarRating
                  rating={formData.rating}
                  size="xl"
                  showNumber={false}
                  interactive={true}
                  onChange={(r) => setFormData(prev => ({ ...prev, rating: r }))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.rating === 0 && 'Click to rate'}
                  {formData.rating === 1 && 'Terrible experience'}
                  {formData.rating === 2 && 'Poor experience'}
                  {formData.rating === 3 && 'Average experience'}
                  {formData.rating === 4 && 'Good experience'}
                  {formData.rating === 5 && 'Excellent experience'}
                </p>
              </div>

              {/* Review Content */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-clapbac-navy mb-2">
                  Your Experience *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Describe your experience with this reviewer. Was their review fair? How did they treat your staff? Any notable behavior?"
                  rows={4}
                  className="input-field resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.content.length}/1000 characters
                </p>
              </div>

              {/* Category Ratings */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-clapbac-navy mb-3">
                  Category Ratings
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CategorySlider
                    label="Review Accuracy"
                    value={formData.accuracy}
                    onChange={(v) => setFormData(prev => ({ ...prev, accuracy: v }))}
                  />
                  <CategorySlider
                    label="Tipping"
                    value={formData.tipping}
                    onChange={(v) => setFormData(prev => ({ ...prev, tipping: v }))}
                  />
                  <CategorySlider
                    label="Politeness"
                    value={formData.politeness}
                    onChange={(v) => setFormData(prev => ({ ...prev, politeness: v }))}
                  />
                  <CategorySlider
                    label="Staff Treatment"
                    value={formData.staffTreatment}
                    onChange={(v) => setFormData(prev => ({ ...prev, staffTreatment: v }))}
                  />
                  <CategorySlider
                    label="Reasonableness"
                    value={formData.reasonable}
                    onChange={(v) => setFormData(prev => ({ ...prev, reasonable: v }))}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Disclosed they were reviewing?</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, disclosed: !prev.disclosed }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.disclosed ? 'bg-clapbac-gold' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.disclosed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-clapbac-navy mb-3">
                  Red Flags (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {flagOptions.map(flag => (
                    <button
                      key={flag.id}
                      type="button"
                      onClick={() => toggleFlag(flag.id)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        formData.flags.includes(flag.id)
                          ? 'bg-red-100 border-red-300 text-red-800'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {formData.flags.includes(flag.id) && (
                        <span className="mr-1">✓</span>
                      )}
                      {flag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  By submitting, you confirm this review is accurate and based on a real visit.
                </p>
                <button
                  type="submit"
                  disabled={formData.rating === 0 || !formData.content.trim() || isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function CategorySlider({ label, value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-clapbac-navy">{value}/5</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-clapbac-gold"
      />
    </div>
  );
}
