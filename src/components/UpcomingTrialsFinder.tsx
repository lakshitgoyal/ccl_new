import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Trophy,
  ChevronRight,
  Flame,
  Info,
  Building,
  Target
} from 'lucide-react';
import { CCL_TRIAL_HUBS_BY_STATE, CCL_TRIAL_STATES } from '../data/cclData';
import { BallType } from '../types';

interface UpcomingTrialsFinderProps {
  onRegister: (ballType: BallType, state: string, city: string) => void;
}

export const UpcomingTrialsFinder: React.FC<UpcomingTrialsFinderProps> = ({ onRegister }) => {
  const [selectedState, setSelectedState] = useState<string>('Delhi NCR');
  const availableCities = CCL_TRIAL_HUBS_BY_STATE[selectedState] || [];
  const [selectedCity, setSelectedCity] = useState<string>(availableCities[0] || 'Noida/Ghaziabad');

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    const cities = CCL_TRIAL_HUBS_BY_STATE[state] || [];
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
    }
  };

  return (
    <section id="upcoming-trials" className="py-16 sm:py-20 bg-slate-100 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black tracking-wider uppercase mb-3">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
            <span>Season 2 State Trials • Nationwide Hubs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Upcoming Trials
          </h2>

          <p className="mt-3 text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed">
            Find your nearest trial ground across India. Use the interactive 3-step selector below to lock in your preferred trial hub.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 shadow-2xs">
            <span className="text-[#1B3E8E]">Concept:</span>
            <span>Select Your State</span>
            <span>➔</span>
            <span>Select Your Preferred Trial City</span>
            <span>➔</span>
            <span className="text-emerald-700 font-extrabold">Nearest Available Trial</span>
          </div>
        </div>

        {/* 3-Column Interactive Finder Concept */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMN 1: SELECT YOUR STATE */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#1B3E8E] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Select Your State
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                15 States
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Choose your home or nearest neighboring state where trials are conducted:
            </p>

            {/* Scrollable State List */}
            <div className="space-y-1.5 overflow-y-auto max-h-[380px] sm:max-h-[420px] pr-1">
              {CCL_TRIAL_STATES.map((state) => {
                const isSelected = selectedState === state;
                const hubCount = CCL_TRIAL_HUBS_BY_STATE[state]?.length || 0;
                return (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleStateClick(state)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B3E8E] text-white shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 ring-2 ring-amber-300' : 'bg-slate-300'}`} />
                      <span>{state}</span>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {hubCount} {hubCount === 1 ? 'Hub' : 'Hubs'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: SELECT YOUR PREFERRED TRIAL CITY */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Select Preferred City
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#1B3E8E] bg-blue-50 px-2 py-0.5 rounded">
                {selectedState}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Recommended practical trial hubs for <strong className="text-slate-800">{selectedState}</strong>:
            </p>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[380px] sm:max-h-[420px] pr-1">
              {availableCities.map((city) => {
                const isCitySelected = selectedCity === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                      isCitySelected
                        ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-sm ring-2 ring-amber-400/40'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-extrabold flex items-center gap-2">
                        <MapPin className={`w-4 h-4 ${isCitySelected ? 'text-amber-600' : 'text-slate-400'}`} />
                        {city}
                      </span>
                      {isCitySelected && (
                        <span className="text-[10px] uppercase font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                          Active Choice
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block pl-6">
                      Official CCL Trial Hub • Turf conditions
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 3: NEAREST AVAILABLE TRIAL */}
          <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 via-[#0a1e3f] to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-black text-sm sm:text-base text-white uppercase tracking-wide">
                    Nearest Available Trial
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Pre-Booking Open
                </span>
              </div>

              {/* Selected Hub Highlight */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 mb-4 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block mb-1">
                  Selected State & Hub Location:
                </span>
                <h4 className="text-xl font-black text-white">
                  {selectedCity}
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  {selectedState} Region • Season 2 Trials
                </p>
              </div>

              {/* UPCOMING TRIAL DATE ALONG WITH STATE AND VENUE (ONCE FINALISED) */}
              <div className="bg-amber-500/10 border border-amber-400/40 rounded-2xl p-4 mb-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wide block">
                      Upcoming Trial Schedule & Venue:
                    </span>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-semibold">
                      Will share the upcoming trial date along with state and venue (once finalised).
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Reporting: <strong>08:00 AM IST</strong> (Morning Batches)</span>
                </div>
              </div>

              {/* Trial Feature Highlights */}
              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>BCCI standard curated turf wickets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>BCCI certified coaches & video biomechanics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Leather Ball & Tennis Ball trial slots</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => onRegister('Leather', selectedState, selectedCity)}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Trial Slot in {selectedCity}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-slate-400">
                Official Admit Card with exact venue & date dispatched to your email within 24 hours.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
