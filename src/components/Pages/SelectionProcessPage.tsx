import React from 'react';
import { 
  ClipboardCheck, 
  Target, 
  Flame, 
  Calculator, 
  Trophy, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { BallType } from '../../types';

interface SelectionProcessPageProps {
  onOpenCalculator: () => void;
  onRegister: (ballType: BallType) => void;
}

export const SelectionProcessPage: React.FC<SelectionProcessPageProps> = ({
  onOpenCalculator,
  onRegister
}) => {
  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Official Evaluation Framework
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            How Selection Works in Champion Cricket League
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            The Champion Cricket League selection policy is governed by an objective mathematical merit matrix. There are no confidential recommendations or closed-door selections. Every run scored, wicket claimed, and ball fielded earns direct points.
          </p>
        </div>

        {/* The 5-Step Deep Dive */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                1
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Step 1: State Trial Net Sessions</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Registered candidates must report to their selected state trial venue at 8:00 AM, wearing proper cricket sportswear, including a white jersey and sports shoes. The cricket kit and other required playing equipment will be provided by the CCL team on ground. During the trial, each player will have the opportunity to face 3–4 overs against a combination of pace and spin bowling. Players will be evaluated based on their batting skills, technique, shot selection, and overall cricketing performance.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-semibold">
                    Leather Ball Category
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-semibold">
                    Tennis Ball Category
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    Includes Official League Jersey & Video Recording
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                2
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Step 2: State League Match Qualification</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Shortlisted players from Phase 1 will advance to the next stage, where they must achieve 100 points to qualify for the knockout matches. Each team will play two matches to earn points, with the following match format:
                </p>
                <ol className="list-[lower-alpha] list-inside text-xs sm:text-sm text-slate-700 space-y-1.5 pl-1">
                  <li><strong>Under-14 &amp; Under-16:</strong> Two 25-over matches per team.</li>
                  <li><strong>Open / Senior, Leather &amp; Tennis:</strong> Two 20-over matches per team.</li>
                  <li>Full accommodation, refreshments, and lunch during the match schedule.</li>
                  <li>Colorful, personalized match jerseys will be provided.</li>
                  <li>Ball-by-ball digital scoring through Cric Heroes, with individual player performance profiles.</li>
                  <li>Live streaming on the official CCL YouTube channel.</li>
                  <li>Live match commentary for an enhanced match-day experience.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-amber-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                3
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Step 3: High Performance State Camp</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Top performers enter an intensive conditioning camp. Includes bowling biomechanics screening by PhysicCare, mental toughness drills, match strategy sessions, and guest masterclasses from celebrated ex-Indian cricketers.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Points Rule */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-indigo-700/50 shadow-xl">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                4
              </span>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-black text-white">Step 4: The 100-Point Selection Rule</h3>
                  <p className="text-xs sm:text-sm text-indigo-200 mt-1">
                    The bedrock of CCL fairness. No selectors' discretion can override your points tally.
                  </p>
                </div>

                {/* Score breakdown table */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-xs text-indigo-200 block">1 Run Scored</span>
                    <strong className="text-xl text-white font-black">1 Point</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-xs text-indigo-200 block">1 Wicket Taken</span>
                    <strong className="text-xl text-amber-300 font-black">20 Points</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-xs text-indigo-200 block">1 Catch Taken</span>
                    <strong className="text-xl text-white font-black">5 Points</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-xs text-indigo-200 block">1 Stumping (WK)</span>
                    <strong className="text-xl text-white font-black">10 Points</strong>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-xs text-indigo-200 block">1 Direct Run-Out</span>
                    <strong className="text-xl text-white font-black">5 Points</strong>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-xl border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm text-slate-200">
                    <strong>Rule Mandate:</strong> Any player who achieves <span className="text-amber-300 font-black">100 or more points</span> across their two league matches automatically advances directly to the National High-Performance Squad.
                  </div>
                  <button
                    onClick={onOpenCalculator}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Open Points Simulator</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-rose-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                5
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Step 5: National Semi-Finals & Grand Finale</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The tournament culminates in a grand finale hosted at prominent stadiums in Delhi NCR / Noida Stadium. 
                  Streamed live on YouTube and sports channels with multi-angle HD cameras, third umpire reviews, celebrity commentary, player awards, and scholarship contracts for exceptional talent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1B3E8E] text-white rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-black">Claim Your Trial Slot Today</h3>
          <p className="text-xs sm:text-sm text-blue-100">
            Seats in each state trial venue are strictly capped to ensure every player receives sufficient net time before the selectors.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onRegister('Leather')}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm transition-all"
            >
              Leather Ball Registration
            </button>
            <button
              onClick={() => onRegister('Tennis')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
            >
              Tennis Ball Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
