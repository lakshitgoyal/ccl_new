import React, { useState } from 'react';
import { Search, MapPin, Calendar, AlertCircle, ArrowRight } from 'lucide-react';
import { TRIAL_VENUES } from '../data/cclData';
import { BallType } from '../types';

interface TrialsSectionProps {
  onRegisterVenue: (ballType: BallType, state: string, city: string) => void;
}

export const TrialsSection: React.FC<TrialsSectionProps> = ({ onRegisterVenue }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const availableStates = Array.from(new Set(TRIAL_VENUES.map((v) => v.state)));

  const filteredVenues = TRIAL_VENUES.filter((venue) => {
    const matchesState = selectedState === 'All' || venue.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch = 
      venue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <section className="pt-4 pb-16 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1B3E8E] bg-blue-50 mb-2 uppercase tracking-wider">
              Nationwide Talent Scouting
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Upcoming State Trial Locations &amp; Schedules
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Select your nearest trial venue to view trial dates and ground locations.
            </p>
          </div>

          {/* Search & State Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ground or location..."
                className="pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] w-48 sm:w-56 bg-white"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="py-2 px-3 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-700"
            >
              <option value="All">All Upcoming States</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Venues Grid - Only Ground, Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between bg-white relative"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Ground
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {venue.venueName}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 bg-blue-50/70 border border-blue-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm">
                  <Calendar className="w-4 h-4 text-[#1B3E8E] shrink-0" />
                  <span className="text-slate-500 font-semibold">Date:</span>
                  <span className="font-black text-slate-900">{venue.upcomingDate}</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 pt-1">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Location: </span>
                    <span className="leading-relaxed text-slate-600">{venue.address}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-5 mt-5 border-t border-slate-100">
                <button
                  onClick={() => onRegisterVenue('Leather', venue.state, venue.city)}
                  className="w-full py-2.5 bg-[#1B3E8E] hover:bg-[#142e6b] text-white text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
                >
                  Leather Ball
                </button>
                <button
                  onClick={() => onRegisterVenue('Tennis', venue.state, venue.city)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
                >
                  Tennis Ball
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Trials note */}
        <div className="mt-8 bg-blue-50/60 border border-blue-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#1B3E8E] shrink-0" />
            <span>
              <strong>Living outside listed states or remote regions?</strong> Virtual Video Trials are also conducted by submitting your certified match/net footage!
            </span>
          </div>
          <button
            onClick={() => onRegisterVenue('Leather', 'Other', 'Virtual Video Trial')}
            className="text-[#1B3E8E] font-bold hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Register for Virtual Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
