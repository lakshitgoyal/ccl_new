import React from 'react';
import { Shield, MapPin, User, Award } from 'lucide-react';
import { STATE_TEAMS } from '../data/cclData';

export const TeamsSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1B3E8E] bg-blue-100 mb-3 uppercase tracking-wider">
            State Franchises
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Champion Cricket League Teams
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Players selected through state trials are drafted into these prestigious state squads to compete in the five-day tournament.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {STATE_TEAMS.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="p-5 text-center">
                <div className="w-20 h-20 mx-auto rounded-full p-1 bg-slate-50 border border-slate-200 shadow-inner mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                    }}
                  />
                </div>

                <span className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-1 block">
                  {team.state}
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-3 leading-tight">
                  {team.name}
                </h3>

                {team.championships && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>{team.championships}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-left text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex items-start gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">Coach: {team.headCoach}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">Star: {team.starPlayer}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{team.homeGround}</span>
                  </div>
                </div>
              </div>

              <div 
                className="h-1.5 w-full"
                style={{ backgroundColor: team.primaryColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
