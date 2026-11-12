import React from 'react';
import { Flame, Bell, ChevronRight } from 'lucide-react';
import { BallType } from '../types';

interface SportsTickerProps {
  onRegister: (ballType: BallType) => void;
}

export const SportsTicker: React.FC<SportsTickerProps> = ({ onRegister }) => {
  const tickerItems = [
    '⚡ REGISTRATIONS LIVE: Season 2 Trials across 16 States & Union Territories',
    '🏆 Mega Prizes & Honours for State League Champions: Sports Bike, Kit Bags, Shoes & Trophies',
    '🏏 Both Leather Ball & Tennis Ball Divisions Available',
    '📺 Multi-Camera HD Digital Telecast for All State League Stadium Matches',
    '👕 Selected State Players get Free Custom Colored Kits & Hotel Boarding',
    '🎯 Transparent 100-Point Biomechanical Video Scoring Panel',
    '📋 Instant QR-Verified Admit Card generated immediately upon booking'
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#8E320B] via-[#C04A18] to-[#993A0B] text-white text-xs border-b border-[#C04A18]/40 overflow-hidden relative shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Left Fixed Badge */}
        <div className="shrink-0 bg-neutral-950 text-amber-300 px-3.5 py-1.5 font-black flex items-center gap-1.5 uppercase text-[11px] tracking-wider z-10 border-r border-[#C04A18]/50 shadow-md">
          <Flame className="w-3.5 h-3.5 text-[#FF7A33] fill-[#FF7A33] animate-pulse" />
          <span>LATEST UPDATES</span>
        </div>

        {/* Scrolling Ticker Line */}
        <div className="flex-1 overflow-hidden py-1.5 relative whitespace-nowrap">
          <div className="animate-ccl-marquee flex items-center gap-8 text-[11px] font-bold tracking-wide">
            {tickerItems.concat(tickerItems).map((text, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>{text}</span>
                <span className="text-amber-300 font-black">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA Pill */}
        <div className="shrink-0 hidden sm:flex items-center pr-3 z-10">
          <button
            onClick={() => onRegister('Leather')}
            className="text-[11px] font-black uppercase tracking-wider bg-black/60 hover:bg-[#8E320B] text-amber-200 hover:text-white px-3 py-1 rounded-md transition-all border border-amber-400/40 flex items-center gap-1 cursor-pointer"
          >
            <span>Register Now</span>
            <ChevronRight className="w-3 h-3 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
