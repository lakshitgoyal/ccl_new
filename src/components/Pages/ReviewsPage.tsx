import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { TESTIMONIALS } from '../../data/cclData';
import { Testimonial } from '../../types';

export const ReviewsPage: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [userReview, setUserReview] = useState({
    name: '',
    role: 'Batsman',
    state: 'Delhi NCR',
    rating: 5,
    comment: '',
    achievement: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReview.name || !userReview.comment) return;

    const newRev: Testimonial = {
      id: `user_${Date.now()}`,
      name: userReview.name,
      role: userReview.role,
      state: userReview.state,
      rating: userReview.rating,
      comment: userReview.comment,
      achievement: userReview.achievement || 'Verified CCL Trial Attendee',
      avatarInitial: userReview.name[0].toUpperCase()
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setUserReview({
      name: '',
      role: 'Batsman',
      state: 'Delhi NCR',
      rating: 5,
      comment: '',
      achievement: ''
    });
  };

  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Voices of Cricket
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Player, Parent & Coach Testimonials
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Read firsthand accounts from athletes, parents, and BCCI selectors who have experienced the transparent merit scoring and high-performance environment of Champion Cricket League.
          </p>
        </div>

        {/* Rating Breakdown Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 mb-12 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <div className="text-5xl font-black text-white mb-2">4.9 / 5</div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-400">Based on 12,480+ player and parent surveys</p>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">5 Star</span>
              <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[94%]" />
              </div>
              <span className="w-10 text-right text-slate-300 font-bold">94%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">4 Star</span>
              <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[5%]" />
              </div>
              <span className="w-10 text-right text-slate-300 font-bold">5%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">3 Star</span>
              <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[1%]" />
              </div>
              <span className="w-10 text-right text-slate-300 font-bold">1%</span>
            </div>
          </div>
        </div>

        {/* Reviews List & Submission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Verified Reviews ({reviewsList.length})
            </h3>

            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1B3E8E] text-white flex items-center justify-center font-bold text-sm">
                      {rev.avatarInitial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                      <p className="text-xs text-slate-500">{rev.role} • {rev.state}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.achievement && (
                  <div className="pt-2 border-t border-slate-200 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{rev.achievement}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submission Form */}
          <div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Share Your Experience
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Are you a current or past CCL trialist? Leave your honest review.
              </p>

              {submitted && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  ✓ Review submitted and added to public reviews!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={userReview.name}
                    onChange={(e) => setUserReview({ ...userReview, name: e.target.value })}
                    placeholder="e.g. Gaurav Sharma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Role / Relation</label>
                  <select
                    value={userReview.role}
                    onChange={(e) => setUserReview({ ...userReview, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All Rounder">All Rounder</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                    <option value="Parent">Parent / Guardian</option>
                    <option value="Coach">Academy Coach</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">State</label>
                  <input
                    type="text"
                    value={userReview.state}
                    onChange={(e) => setUserReview({ ...userReview, state: e.target.value })}
                    placeholder="e.g. Delhi NCR"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Rating</label>
                  <select
                    value={userReview.rating}
                    onChange={(e) => setUserReview({ ...userReview, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 / 5) - Outstanding</option>
                    <option value="4">⭐⭐⭐⭐ (4 / 5) - Very Good</option>
                    <option value="3">⭐⭐⭐ (3 / 5) - Average</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={userReview.comment}
                    onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                    placeholder="Tell us about your experience at the trials or state league..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
