import React from 'react';
import { 
  ClipboardCheck, 
  Target, 
  Flame, 
  Calculator, 
  Trophy, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { BallType } from '../types';

interface SelectionRoadmapProps {
  onOpenCalculator: () => void;
  onRegister: (ballType: BallType) => void;
}

export const SelectionRoadmap: React.FC<SelectionRoadmapProps> = ({
  onOpenCalculator,
  onRegister
}) => {
  const steps = [
    {
      number: '01',
      title: 'State Trials',
      icon: ClipboardCheck,
      color: 'bg-blue-600',
      description: 'Physical nets trial across 16 states. Batsmen face 4-5 overs against pace & spin; bowlers bowl 4-5 overs under speed-radar & video analysis. Keepers receive 30 min specialized agility drill.',
      highlight: 'Leather ball or Tennis ball with official jersey included.'
    },
    {
      number: '02',
      title: 'State League Matches',
      icon: Target,
      color: 'bg-emerald-600',
      description: 'Every shortlisted player plays guaranteed matches: Two 25-over matches for U16 and Two 20-over matches for Open league. All scores and wickets tracked live on Cricheroes.',
      highlight: 'Custom named jersey, full kit, stay & nutritious meals provided by Khel Bharat.'
    },
    {
      number: '03',
      title: 'High-Performance Camp',
      icon: Flame,
      color: 'bg-amber-600',
      description: 'Intensive conditioning camp overseen by BCCI Level-2 and ICC accredited coaching faculty. Biomechanics review by PhysicCare plus masterclasses with celebrity guest cricketers.',
      highlight: 'Tactical awareness, mental conditioning & pressure-scenario training.'
    },
    {
      number: '04',
      title: '100-Point Selection Rule',
      icon: Calculator,
      color: 'bg-indigo-600',
      description: 'Zero bias, zero subjective politics. Score points based strictly on performance: 1 Run = 1 Pt, 1 Wicket = 20 Pts, 1 Catch = 5 Pts, 1 Stumping = 10 Pts, 1 Runout = 5 Pts.',
      highlight: 'Score minimum 100 points in 2 matches to advance directly to the National Squad.'
    },
    {
      number: '05',
      title: 'National Semi-Finals',
      icon: Trophy,
      color: 'bg-rose-600',
      description: 'Grand final knockout stage played at premier sports stadiums in Delhi NCR and Noida. Broadcast live with multi-camera setup, television commentary, trophies, and scholarship awards.',
      highlight: 'Trophy, certificate, national media spotlight & club scouting opportunities.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1B3E8E] bg-blue-100 mb-3 uppercase tracking-wider">
            Clear • Merit-Based • Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            The 5-Step Selection Pathway
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Unlike traditional closed-door academies, Champion Cricket League operates on an open-merit points formula. See exactly how every young cricketer progresses from local trials to national stadium finals.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50/80 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}

          {/* Interactive Calculator Callout Card */}
          <div className="bg-gradient-to-br from-[#1B3E8E] to-slate-950 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between border border-blue-400/30">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
                Interactive Tool
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                Simulate Your Selection Points
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6">
                Calculate if your planned runs, wickets, catches, and stumpings reach the mandatory 100-point qualifying benchmark for the National Camp.
              </p>

              <div className="space-y-1.5 text-xs text-blue-200 mb-6 bg-white/10 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span>1 Run:</span>
                  <span className="font-bold text-white">1 Point</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Wicket:</span>
                  <span className="font-bold text-amber-300">20 Points</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Catch / Runout:</span>
                  <span className="font-bold text-white">5 Points</span>
                </div>
                <div className="flex justify-between">
                  <span>1 Stumping (WK):</span>
                  <span className="font-bold text-white">10 Points</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCalculator}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Selection Calculator</span>
            </button>
          </div>
        </div>

        {/* Quick CTA Bottom */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              Ready to take the first step towards national cricket?
            </h4>
            <p className="text-sm text-slate-500 mt-1">
              Select your ball preference (Leather or Tennis) and secure your trial net slot before registrations close.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onRegister('Leather')}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-lg text-sm transition-all"
            >
              Register Leather Ball
            </button>
            <button
              onClick={() => onRegister('Tennis')}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-sm transition-all"
            >
              Register Tennis Ball
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
