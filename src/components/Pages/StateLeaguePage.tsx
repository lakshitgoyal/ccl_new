import React from 'react';
import { Trophy, ShieldCheck, MapPin, Calendar, Users, Coffee, Bed, ArrowRight } from 'lucide-react';
import { BallType } from '../../types';

interface StateLeaguePageProps {
  onRegister: (ballType: BallType) => void;
}

export const StateLeaguePage: React.FC<StateLeaguePageProps> = ({ onRegister }) => {
  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            State Tournament
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Champion Cricket League State Tournament
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Champion Cricket League (CCL) State Tournament brings together selected players and state teams to compete in an organized cricket championship. Players get the opportunity to showcase their skills, compete at a higher level, and gain match experience, with live YouTube broadcasts and commentary for every match. Tournament facilities and player support are provided as per the applicable guidelines.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1B3E8E] flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tournament Match Structure</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Players compete in organised league matches within their designated age categories, including U-14, U-16, and Open Category, following the applicable tournament format. Match schedules, number of overs, and playing conditions are communicated to participants in advance.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Bed className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Accommodation & Player Facilities</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All participating players receive tournament accommodation, Stay, three meals, and an official team jersey for participation.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Nutritious Athlete Diet</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Carefully curated sports diet high in lean proteins, complex carbohydrates, hydration electrolytes, and fresh seasonal fruit suited for strenuous tournament play.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Live Digital Scorecard</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every ball, strike rate, wagon-wheel, and economy figure is uploaded in real-time to Cricheroes so family, friends, and scouts across India can watch your match progress.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Scouting & Talent Contracts</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Corporate club sponsors, sports agents, and district cricket associations scout directly from the CCL State League, offering scholarships and sponsorships.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tournament Duration</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              5 action-packed days starting with the opening ceremony, 4 league match rounds, semifinals, and the prime-time night finale under floodlights.
            </p>
          </div>
        </div>

        {/* Banner with image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img
            src="/assets/images/three.png"
            alt="Cricket Tournament Action"
            className="w-full h-80 object-cover filter brightness-50"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/images/one.png';
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
            <h3 className="text-2xl sm:text-4xl font-black mb-3">Earn Your State Jersey</h3>
            <p className="max-w-xl text-xs sm:text-sm text-slate-200 mb-6">
              Represent Delhi, Gujarat, Punjab, Haryana, or Uttar Pradesh in the championship arena.
            </p>
            <button
              onClick={() => onRegister('Leather')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl shadow-lg transition-all"
            >
              Start Trial Registration Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
