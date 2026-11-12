import React from 'react';
import { ArrowRight, CheckCircle2, Trophy, Users, Shield, Target } from 'lucide-react';
import { BallType } from '../types';

interface AboutSectionProps {
  onLearnMore: () => void;
  onRegister: (ballType: BallType) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onRegister }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Image with Accent Badge */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background Accent Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-amber-500/20 rounded-3xl blur-xl opacity-70"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-[4/3] sm:aspect-[4/3]">
                <img
                  src="/assets/images/two.png"
                  alt="Champion Cricket League Ground Action"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/four.png';
                  }}
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Grassroots to Professional Cricket
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Recognized Talent Scouting Across 16 States
                  </h4>
                </div>
              </div>

              {/* Floating Stat Pill */}
              <div className="absolute -bottom-5 right-4 sm:right-6 bg-white rounded-xl p-3 shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1B3E8E] flex items-center justify-center font-black">
                  <Trophy className="w-5 h-5 text-[#1B3E8E]" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">50,000+</div>
                  <div className="text-[11px] font-medium text-slate-500">Athletes Evaluated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs sm:text-sm font-black text-amber-800 uppercase tracking-wider bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full inline-block mb-3">
                ⭐ About Champion Cricket League
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                India's Most Transparent Grassroots Cricket Championship
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Organized under the patronage of <strong className="text-slate-900 font-semibold">Khel Bharat Sports Promotion</strong>, 
              Champion Cricket League (CCL) is committed to discovering raw cricketing talent from every district of India. 
              With over 3+ years of excellence and 800+ matches played across the country, we provide passionate young cricketers with an uncompromised, meritocratic platform evaluated exclusively by 
              certified BCCI coaches and former Ranji Trophy players.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Turf Wicket Trials</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Trials conducted at designated cricket grounds across participating states, giving players the opportunity to demonstrate their batting, bowling, and all-round abilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#1B3E8E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Performance-Based Evaluation</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Players are evaluated by certified BCCI/ICC selectors based on their cricketing skills, on-field performance, and the established selection criteria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Pan-India Cricket Trials</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Champion Cricket League (CCL) conducts cricket trials across participating states, giving players an opportunity to showcase their talent and compete for selection. The top 5 players from each trial will receive CCL sponsorship for the entire tournament, with all tournament-related expenses covered by CCL, excluding travel expenses to and from the venue
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Player Support & Rewards</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Eligible players may receive cricket kits, jerseys, awards, sponsorships, and other announced benefits, subject to the applicable competition rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onRegister('Leather')}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black rounded-xl text-sm sm:text-base transition-all shadow-lg shadow-red-600/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Register for Trials</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={onLearnMore}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-extrabold rounded-xl text-sm sm:text-base border border-slate-300 transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <span>Read Full Mission & Story</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
