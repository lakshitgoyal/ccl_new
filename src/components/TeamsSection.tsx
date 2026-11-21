import React from 'react';
import { Trophy } from 'lucide-react';
import { STATE_TEAMS } from '../data/cclData';

export const TeamsSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1B3E8E] bg-blue-100 mb-3 uppercase tracking-wider">
            State Teams
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Champion Cricket League Teams
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Players selected through state trials are drafted into these prestigious state squads to compete in the five-day tournament.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STATE_TEAMS.map((team) => {
            const isSeasonOneWinner =
              team.id === 'uttarakhand' || team.championships === 'Season 1 Winner';

            return (
              <div
                key={team.id}
                className={`bg-white rounded-2xl overflow-hidden transition-all flex flex-col justify-between group aspect-square ${
                  isSeasonOneWinner
                    ? 'border-2 border-amber-400 shadow-xl shadow-amber-200/50 ring-2 ring-amber-300/60'
                    : 'border border-slate-200 shadow-sm hover:shadow-lg'
                }`}
              >
                {isSeasonOneWinner && (
                  <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs py-2 px-3 flex items-center justify-center gap-1.5 shadow-xs shrink-0 border-b border-amber-600/20">
                    <Trophy className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>Season 1 Winner</span>
                  </div>
                )}

                <div className="flex-1 min-h-0 w-full p-2 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
