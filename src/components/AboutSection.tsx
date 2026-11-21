import React from 'react';
import { ArrowRight, CheckCircle2, Trophy, Users, Shield, Target } from 'lucide-react';
import { BallType } from '../types';

interface AboutSectionProps {
  onLearnMore: () => void;
  onRegister: (ballType: BallType) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onRegister }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Row: Evenly balanced Image Card + Intro & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Image with Accent Footer */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full flex flex-col">
              {/* Background Accent Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-amber-500/20 rounded-3xl blur-xl opacity-70 pointer-events-none"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-[#00247d] flex flex-col flex-1 justify-between">
                <div className="w-full flex-1 flex items-center justify-center bg-[#00247d] overflow-hidden">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-16_at_17.14.56_6fae8abb.jpeg"
                    alt="Champion Cricket League Tournament Journey - Only 5 Simple Steps"
                    className="w-full h-auto object-contain block transition-transform duration-500 hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/four.png';
                    }}
                  />
                </div>
                
                {/* Clean Footer Strip below graphic so no text is obscured */}
                <div className="bg-slate-950/95 px-4 py-3 sm:px-5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 text-white border-t border-white/10">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        Grassroots to Professional Cricket
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      Recognized Talent Scouting Across 16 States
                    </h4>
                  </div>

                  <div className="bg-white rounded-xl px-3 py-1.5 shadow-md border border-slate-100 flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B3E8E] flex items-center justify-center font-black shrink-0">
                      <Trophy className="w-4 h-4 text-[#1B3E8E]" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 leading-tight">10,000+</div>
                      <div className="text-[10px] font-medium text-slate-500 leading-tight">Cricketers Scouted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Intro & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-100 border border-amber-300 px-3 py-1 rounded-full inline-block mb-2.5">
                ⭐ About Champion Cricket League
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                India's Most Transparent Grassroots Cricket Championship
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Organized under the patronage of <strong className="text-slate-900 font-semibold">Khel Bharat Sports Promotion</strong>, 
              Champion Cricket League (CCL) is committed to discovering raw cricketing talent from every district of India. 
              With over 3+ years of excellence and 500+ matches played across the country, we provide passionate young cricketers with an uncompromised, meritocratic platform evaluated exclusively by 
              certified BCCI coaches and former Ranji Trophy players.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onRegister('Leather')}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-red-600/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Register for Trials</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLearnMore}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold rounded-xl text-sm border border-slate-300 transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <span>Read Full Mission & Story</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Full-Width 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-colors">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-slate-900 mb-1">Turf Wicket Trials</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Trials conducted at designated cricket grounds across participating states, giving players the opportunity to demonstrate their batting, bowling, and all-round abilities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-colors">
            <CheckCircle2 className="w-4.5 h-4.5 text-[#1B3E8E] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-slate-900 mb-1">Performance-Based Evaluation</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Players are evaluated by certified BCCI/ICC selectors based on their cricketing skills, on-field performance, and the established selection criteria.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-colors">
            <CheckCircle2 className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-slate-900 mb-1">Pan-India Cricket Trials</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Champion Cricket League (CCL) conducts cricket trials across participating states, giving players an opportunity to showcase their talent and compete for selection. The top 5 players from each trial will receive CCL sponsorship for the entire tournament, with all tournament-related expenses covered by CCL, excluding travel expenses to and from the venue
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-colors">
            <CheckCircle2 className="w-4.5 h-4.5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-slate-900 mb-1">Player Support & Rewards</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Eligible players may receive cricket kits, jerseys, awards, sponsorships, and other announced benefits, subject to the applicable competition rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
