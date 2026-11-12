import React from 'react';
import { ShieldCheck, Target, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { BallType } from '../../types';

interface AboutPageProps {
  onRegister: (ballType: BallType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRegister }) => {
  return (
    <div className="py-12 bg-slate-100">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Our Mission & Legacy • 3+ Years of Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Democratizing Professional Cricket for Every Deserving Indian Athlete
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Champion Cricket League (CCL) was established to dismantle the barriers of access, favoritism, and obscurity in Indian grassroots sports. With 3+ years of excellence and 800+ matches played nationwide, we provide a transparent, meritocratic pathway for young cricketers from district nets all the way to state franchises and national recognition.
          </p>
        </div>
      </div>

      {/* Main Image + Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src="/assets/images/four.png"
              alt="CCL Cricket Coaching"
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/one.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Official Scouting</span>
                <h3 className="text-xl font-bold">Turf Wickets & Video Biomechanics Analysis</h3>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-[#1B3E8E] pl-4 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What is Champion Cricket League?</h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
                <p>
                  <strong>Ans – </strong>Champion Cricket League (CCL) is a competitive cricket platform powered by Khel Bharat, created to give aspiring cricketers an opportunity to showcase their talent, compete in organized matches, and progress through a structured cricket journey. CCL conducts cricket trials across multiple cities and states in India, providing players from different age groups and backgrounds a platform to demonstrate their batting, bowling, wicket-keeping, and all-round skills.
                </p>
                <p>
                  The CCL journey begins with registration and trials, followed by performance-based selection. Selected players move forward to competitive matches and further stages of the league, where their performances are evaluated through a structured points system. Players who meet the required performance criteria can progress to subsequent stages and camps. From Trials → Selection → Competitive Matches → Camps → Advanced League Stages, Champion Cricket League aims to create an organized pathway where aspiring players can experience competitive cricket, showcase their performance, and take the next step in their cricket journey.
                </p>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4.5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1B3E8E] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    👁️
                  </div>
                  <h3 className="text-base font-black text-[#1B3E8E]">Our Vision</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  To create an accessible, transparent, and competitive cricket platform that gives aspiring players across India an opportunity to showcase their talent on the field and progress through performance.
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4.5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
                    🎯
                  </div>
                  <h3 className="text-base font-black text-amber-950">Our Mission</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  To identify cricketing talent through organized trials and competitive matches, provide players with quality playing opportunities, and build a structured platform where performance creates opportunity.
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => onRegister('Leather')}
                className="px-6 py-3 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Register for Trials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Athletes Trust CCL</h2>
            <p className="text-sm text-slate-600 mt-2">Built on four foundational pillars of sporting integrity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1B3E8E] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Zero Discrimination</h3>
              <p className="text-xs text-slate-600">Open to any player regardless of background, state, or academy affiliation.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Mathematical Scoring</h3>
              <p className="text-xs text-slate-600">The 100-point formula ensures qualification is mathematically defined on the scorecard.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Media Exposure</h3>
              <p className="text-xs text-slate-600">Every match is broadcast with live commentary, Cricheroes stats, and digital certificates.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Alumni Success</h3>
              <p className="text-xs text-slate-600">Over 100+ CCL stars currently represent state teams, university squads, and A-division clubs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
