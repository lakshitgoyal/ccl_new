import React from 'react';
import { 
  Trophy, 
  Tv, 
  ShieldCheck, 
  Video, 
  Award, 
  Flame, 
  ArrowRight,
  Shirt,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { BallType } from '../types';

interface LeagueHighlightsProps {
  onRegister: (ballType: BallType) => void;
  onExploreProcess: () => void;
}

export const LeagueHighlights: React.FC<LeagueHighlightsProps> = ({
  onRegister,
  onExploreProcess
}) => {
  const highlights = [
    {
      icon: Trophy,
      tag: 'Trial Experience',
      title: 'Quality Cricket Grounds',
      desc: 'Trials are conducted at designated cricket grounds across India, providing players with an opportunity to demonstrate their skills in a competitive environment.',
      footer: 'Available at designated trial venues',
      color: 'bg-amber-50/40',
      border: 'border-amber-200/80',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100/70 border-amber-200'
    },
    {
      icon: Tv,
      tag: 'Live Broadcast Coverage',
      title: 'Live YouTube Matches',
      desc: 'Every CCL match across participating states is broadcast live on our official YouTube channel, with live scoring available on CricHeroes. Enjoy live match action, commentary, and scorecards where available, and follow the performances of emerging cricketing talent from across India.',
      footer: 'Every Match. Every State. Live on YouTube!',
      actionLink: {
        label: 'Live Matches on YouTube',
        url: 'https://www.youtube.com/@CricHeroes'
      },
      color: 'bg-rose-50/40',
      border: 'border-rose-200/80',
      badgeColor: 'text-rose-800 bg-rose-50 border-rose-200',
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100/70 border-rose-200'
    },
    {
      icon: Shirt,
      tag: 'Player Kits & Facilities',
      title: 'Player Support',
      desc: 'Each participated players may receive team jerseys, cricket kits, refreshments, and other event facilities as specified for the relevant competition',
      footer: 'Benefits for players',
      color: 'bg-emerald-50/40',
      border: 'border-emerald-200/80',
      badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100/70 border-emerald-200'
    },
    {
      icon: Award,
      tag: 'Awards, Rewards & Sponsorships',
      title: 'Player Achievement',
      desc: 'Exceptional performances can be rewarded with trophies, certificates, sports bike, cricket kits, jerseys, shoes, and sponsorships of up to two years, along with other exciting prizes announced under the competition rules',
      footer: 'Celebrating Talent. Rewarding Excellence.',
      color: 'bg-yellow-50/40',
      border: 'border-yellow-200/80',
      badgeColor: 'text-yellow-800 bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100/70 border-yellow-200'
    },
    {
      icon: Video,
      tag: 'Performance-Based Evaluation',
      title: 'Fair Assessment',
      desc: 'Players are evaluated on their cricketing skills and on-field performance using the applicable selection criteria, with an emphasis on merit and sporting ability.',
      footer: 'Skills. Performance. Merit.',
      color: 'bg-blue-50/40',
      border: 'border-blue-200/80',
      badgeColor: 'text-blue-800 bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100/70 border-blue-200'
    },
    {
      icon: FileCheck,
      tag: 'Easy Registration & Trial Participation',
      title: 'Registration',
      desc: 'Register online, complete the registration formalities, and attend your designated Champion Cricket League (CCL) trial to demonstrate your cricketing skills and be considered for selection based on performance and eligibility criteria.',
      footer: 'Quick and Easy Trial Registration',
      color: 'bg-purple-50/40',
      border: 'border-purple-200/80',
      badgeColor: 'text-purple-800 bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100/70 border-purple-200'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-100 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black tracking-wider uppercase">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-bounce" />
              <span>Why Champion Cricket League</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              India's Premier Stage for <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">Grassroots Talent</span>
            </h2>
            
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
              Designed to give aspiring cricketers across India—including players from Tier-1, Tier-2, and rural areas—a fair, merit-based opportunity to showcase their talent and pursue higher-level cricket.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onRegister('Leather')}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Book Trial Slot</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={onExploreProcess}
              className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm sm:text-base rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Selection Process</span>
            </button>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl p-6 sm:p-7 bg-white border ${item.border} hover:border-amber-400/80 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${item.iconBg} border flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#1B3E8E] transition-colors leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>

                  {'actionLink' in item && item.actionLink && (
                    <div className="mt-4 pt-1">
                      <a
                        href={item.actionLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer group/link"
                      >
                        <Tv className="w-3.5 h-3.5 text-white" />
                        <span>{item.actionLink.label}</span>
                        <ExternalLink className="w-3 h-3 text-white/90 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-bold">
                  <span>{item.footer}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick League Credibility Ribbon */}
        <div className="mt-12 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-300">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900">Registered Sports Promotion Body</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Under Khel Bharat Sports Promotion • Transparent Biomechanical Talent Hunt</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onRegister('Leather')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Leather Ball Trial
            </button>
            <button
              onClick={() => onRegister('Tennis')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              Tennis Ball Trial
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
