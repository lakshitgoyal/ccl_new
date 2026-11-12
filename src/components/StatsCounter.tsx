import React from 'react';
import { Calendar, Trophy, MapPin, Users, Award, Star } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      icon: Calendar,
      number: '3+',
      label: 'Years of Excellence',
      detail: 'Pioneering grassroots cricket across India',
      badge: 'Proven Legacy'
    },
    {
      icon: Trophy,
      number: '800+',
      label: 'Matches Played',
      detail: 'State, regional & national tournaments',
      badge: 'High Action'
    },
    {
      icon: MapPin,
      number: '16+',
      label: 'States Covered',
      detail: 'Pan-India scouting across tier-1, 2 & 3 cities',
      badge: 'Pan-India'
    },
    {
      icon: Users,
      number: '50,000+',
      label: 'Cricketers Scouted',
      detail: 'U-16, U-19 & Open division aspirants',
      badge: 'Grassroots Talent'
    },
    {
      icon: Star,
      number: '4.9 / 5',
      label: 'Trust Rating',
      detail: 'Over 12,000+ verified player reviews',
      badge: 'Top Rated'
    }
  ];

  return (
    <section className="bg-slate-100 text-slate-900 py-12 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="group relative bg-white hover:bg-slate-50/80 p-5 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {stat.badge}
                  </span>
                </div>
                
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 group-hover:text-[#1B3E8E] transition-colors">
                  {stat.number}
                </div>
                
                <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-1.5">
                  {stat.label}
                </div>
                
                <div className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-normal">
                  {stat.detail}
                </div>

                {/* Subtle bottom accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/60 transition-all"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
