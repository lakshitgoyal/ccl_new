import React, { useState } from 'react';
import { X, Trophy, CheckCircle, AlertCircle, RefreshCw, Calculator, Sparkles } from 'lucide-react';
import { SelectionScoreInput } from '../types';

interface PointsCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PointsCalculator: React.FC<PointsCalculatorProps> = ({ isOpen, onClose }) => {
  const [scores, setScores] = useState<SelectionScoreInput>({
    runs: 45,
    wickets: 3,
    catches: 2,
    stumpings: 0,
    runOuts: 1
  });

  if (!isOpen) return null;

  // Formula:
  // Runs: 1 pt each
  // Wickets: 20 pts each
  // Catches: 5 pts each
  // Stumpings: 10 pts each
  // Runouts: 5 pts each
  const runsPoints = (scores.runs || 0) * 1;
  const wicketsPoints = (scores.wickets || 0) * 20;
  const catchesPoints = (scores.catches || 0) * 5;
  const stumpingsPoints = (scores.stumpings || 0) * 10;
  const runOutsPoints = (scores.runOuts || 0) * 5;

  const totalPoints = runsPoints + wicketsPoints + catchesPoints + stumpingsPoints + runOutsPoints;
  const qualified = totalPoints >= 100;
  const percentage = Math.min(100, Math.round((totalPoints / 100) * 100));

  const applyPreset = (preset: Partial<SelectionScoreInput>) => {
    setScores({
      runs: 0,
      wickets: 0,
      catches: 0,
      stumpings: 0,
      runOuts: 0,
      ...preset
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-[#1B3E8E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-amber-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">CCL Selection Points Calculator</h3>
              <p className="text-xs text-blue-200">100-Point Rule Simulation across 2 Matches</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Official 100-Point Merit Calculator Formula Basis */}
          <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-black text-[#1B3E8E] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Official 100-Point Merit Score Calculation Basis</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              <div className="bg-white p-2 rounded-xl border border-blue-100 shadow-2xs">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">1 Run</span>
                <span className="text-sm font-black text-[#1B3E8E]">1 Point</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-2xs">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">1 Wicket</span>
                <span className="text-sm font-black text-emerald-700">20 Points</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-100 shadow-2xs">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">1 Runout</span>
                <span className="text-sm font-black text-amber-700">5 Points</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-indigo-100 shadow-2xs">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">1 Catch</span>
                <span className="text-sm font-black text-indigo-700">5 Points</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-purple-100 shadow-2xs col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">1 Stumping</span>
                <span className="text-sm font-black text-purple-700">10 Points</span>
              </div>
            </div>
          </div>

          {/* Presets */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Quick Role Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset({ runs: 85, catches: 3, wickets: 0, stumpings: 0, runOuts: 1 })}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
              >
                🏏 Pure Batsman (85 Runs, 3 Catches)
              </button>
              <button
                onClick={() => applyPreset({ runs: 12, wickets: 5, catches: 1, stumpings: 0, runOuts: 0 })}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium"
              >
                ⚡ Strike Bowler (5 Wickets, 12 Runs)
              </button>
              <button
                onClick={() => applyPreset({ runs: 45, wickets: 3, catches: 2, stumpings: 0, runOuts: 0 })}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium"
              >
                ⭐ All-Rounder (45 Runs, 3 Wickets)
              </button>
              <button
                onClick={() => applyPreset({ runs: 60, catches: 4, stumpings: 3, wickets: 0, runOuts: 1 })}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium"
              >
                🧤 Wicketkeeper (60 Runs, 4 Ct, 3 St)
              </button>
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Runs */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Runs Scored (1 pt)
              </label>
              <input
                type="number"
                min="0"
                value={scores.runs}
                onChange={(e) => setScores({ ...scores, runs: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-lg font-bold text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Points: {runsPoints}</span>
            </div>

            {/* Wickets */}
            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
              <label className="block text-xs font-bold text-emerald-800 mb-1">
                Wickets Taken (20 pts)
              </label>
              <input
                type="number"
                min="0"
                value={scores.wickets}
                onChange={(e) => setScores({ ...scores, wickets: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-lg font-bold text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-300 bg-white"
              />
              <span className="text-[11px] text-emerald-700 mt-1 block">Points: {wicketsPoints}</span>
            </div>

            {/* Catches */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catches (5 pts)
              </label>
              <input
                type="number"
                min="0"
                value={scores.catches}
                onChange={(e) => setScores({ ...scores, catches: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-lg font-bold text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Points: {catchesPoints}</span>
            </div>

            {/* Stumpings */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stumpings (10 pts)
              </label>
              <input
                type="number"
                min="0"
                value={scores.stumpings}
                onChange={(e) => setScores({ ...scores, stumpings: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-lg font-bold text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Points: {stumpingsPoints}</span>
            </div>

            {/* Run Outs */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Run Outs (5 pts)
              </label>
              <input
                type="number"
                min="0"
                value={scores.runOuts}
                onChange={(e) => setScores({ ...scores, runOuts: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-lg font-bold text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Points: {runOutsPoints}</span>
            </div>

            {/* Reset Button */}
            <div className="flex items-center justify-center p-3">
              <button
                onClick={() => setScores({ runs: 0, wickets: 0, catches: 0, stumpings: 0, runOuts: 0 })}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold p-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Values</span>
              </button>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className={`p-5 rounded-2xl border ${
            qualified ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Total Calculated Points
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Required Benchmark: 100 Pts
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-4xl font-black text-slate-900">
                {totalPoints}
              </span>
              <span className="text-sm font-bold text-slate-500">
                / 100 Points
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-500 ${
                  qualified ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Verdict */}
            {qualified ? (
              <div className="flex items-start gap-2 text-emerald-800 text-xs sm:text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>🎉 Target Met for National Camp Selection!</strong> With {totalPoints} points, you exceed the 100-point threshold to advance into the State High-Performance Squad.
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-amber-800 text-xs sm:text-sm font-medium">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{100 - totalPoints} more points needed.</strong> E.g., take 1 more wicket (+20 pts) or score {100 - totalPoints} runs in match two to reach the benchmark!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
