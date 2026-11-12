import React from 'react';
import { HeartPulse, Activity, ShieldCheck, UserCheck, Stethoscope, ArrowRight } from 'lucide-react';
import { BallType } from '../../types';

interface PhysicCarePageProps {
  onRegister: (ballType: BallType) => void;
}

export const PhysicCarePage: React.FC<PhysicCarePageProps> = ({ onRegister }) => {
  const services = [
    {
      title: 'Fast Bowling Biomechanics',
      desc: 'High-speed video capture analysis of front-foot impact, trunk flexion, and shoulder alignment to prevent lumbar stress fractures in teenage fast bowlers.'
    },
    {
      title: 'Rotator Cuff & Shoulder Conditioning',
      desc: 'Targeted strengthening protocols for throwers and fielders to improve throwing velocity while protecting shoulder joints.'
    },
    {
      title: 'On-Ground Acute Injury Care',
      desc: 'Certified sports physiotherapists stationed boundary-side during all state matches with cold-spray, taping, and concussive screening.'
    },
    {
      title: 'Pre-Match Mobility & Warmup Drills',
      desc: 'Dynamic neuromuscular activation sequences designed specifically for cricketers before entering the field.'
    }
  ];

  return (
    <div className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Sports Science & Player Wellness
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            PhysicCare Sports Physiotherapy & Rehabilitation
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Champion Cricket League partners with PhysicCare to provide comprehensive athletic screening, injury mitigation, and recovery protocols. We ensure our players compete at their peak physical capacity without long-term injury risks.
          </p>
        </div>

        {/* Feature Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4">
                Protecting Young Cricketing Careers
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Modern cricket places tremendous demands on developing joints and tendons. From back stress in pacers to hamstring strains in batsmen, PhysicCare brings elite sports medical care directly to grassroots tournaments.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="font-black text-lg text-emerald-400">100%</div>
                  <div className="text-slate-400">Match Physio Coverage</div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="font-black text-lg text-blue-400">5,000+</div>
                  <div className="text-slate-400">Athletes Screened</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {services.map((s, i) => (
                <div key={i} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span>{s.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Join the Safest Grassroots League in India
          </h3>
          <p className="text-xs text-slate-600 mb-6">
            Every registered trial participant receives access to PhysicCare's warm-up and conditioning guide.
          </p>
          <button
            onClick={() => onRegister('Leather')}
            className="px-8 py-3 bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-bold rounded-xl text-xs transition-all shadow-md"
          >
            Register for League Trials
          </button>
        </div>
      </div>
    </div>
  );
};
