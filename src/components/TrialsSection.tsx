import React, { useState } from 'react';
import { Search, MapPin, Clock, Calendar, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { TRIAL_VENUES, CCL_TRIAL_STATES } from '../data/cclData';
import { BallType } from '../types';

interface TrialsSectionProps {
  onRegisterVenue: (ballType: BallType, state: string, city: string) => void;
}

export const TrialsSection: React.FC<TrialsSectionProps> = ({ onRegisterVenue }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredVenues = TRIAL_VENUES.filter((venue) => {
    const matchesState = selectedState === 'All' || venue.state.toLowerCase() === selectedState.toLowerCase() || (selectedState === 'Delhi NCR' && venue.state.toLowerCase().includes('delhi'));
    const matchesSearch = 
      venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1B3E8E] bg-blue-50 mb-2 uppercase tracking-wider">
              Nationwide Talent Scouting
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Upcoming Trial Locations & Schedules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Select your nearest trial venue to view reporting guidelines, available net slots, and dates.
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
                placeholder="Search city or venue..."
                className="pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] w-48 sm:w-56"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="py-2 px-3 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-700"
            >
              <option value="All">All States (15 States)</option>
              {CCL_TRIAL_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between bg-white relative"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-[#1B3E8E]">
                    {venue.state}
                  </span>
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                      venue.status === 'Filling Fast'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {venue.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {venue.venueName}
                </h3>
                
                <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{venue.address}</span>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      Trial Date:
                    </span>
                    <span className="font-bold text-slate-900">{venue.upcomingDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Reporting Time:
                    </span>
                    <span className="font-bold text-slate-900">{venue.reportingTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Chief Selector:
                    </span>
                    <span className="font-semibold text-slate-800">{venue.chiefSelector}</span>
                  </div>
                </div>

                {/* Remaining slot meters */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-red-50 p-2 rounded-lg border border-red-100 text-center">
                    <div className="text-red-700 font-bold text-sm">{venue.leatherSlotsAvailable}</div>
                    <div className="text-red-900/70 text-[11px]">Leather Slots Left</div>
                  </div>
                  <div className="bg-amber-50 p-2 rounded-lg border border-amber-100 text-center">
                    <div className="text-amber-700 font-bold text-sm">{venue.tennisSlotsAvailable}</div>
                    <div className="text-amber-900/70 text-[11px]">Tennis Slots Left</div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onRegisterVenue('Leather', venue.state, venue.city)}
                  className="w-full py-2 bg-[#1B3E8E] hover:bg-[#142e6b] text-white text-xs font-bold rounded-lg transition-colors text-center"
                >
                  Leather Ball
                </button>
                <button
                  onClick={() => onRegisterVenue('Tennis', venue.state, venue.city)}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors text-center"
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
