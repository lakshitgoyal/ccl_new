import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, ArrowRight, MapPin, Sparkles, Trophy } from 'lucide-react';
import { BallType } from '../types';

interface HeroBannerProps {
  onRegisterClick: (ballType: BallType) => void;
  onExploreTrials: () => void;
  onOpenArchitecture?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onRegisterClick,
  onExploreTrials,
}) => {
  const slides = [
    {
      id: 1,
      image: '/assets/images/one.png',
      alt: 'Season 2 Registration - Leather and Tennis Ball Cricket Championship League',
      ballType: 'Leather' as BallType
    },
    {
      id: 2,
      image: '/assets/images/two.png',
      alt: 'State League & National Camp - District Nets to National Stadiums',
      ballType: 'Tennis' as BallType
    },
    {
      id: 3,
      image: '/assets/images/three.png',
      alt: '100-Point Merit Selection - Pure Performance Cricket League',
      ballType: 'Leather' as BallType
    },
    {
      id: 4,
      image: '/assets/images/four.png',
      alt: 'BCCI Certified Panel Masterclasses & Sports Science',
      ballType: 'Leather' as BallType
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative w-full bg-slate-950 overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hero Banner Carousel"
    >
      {/* Burnt Orange Top Border Accent Line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#8E320B] via-[#C04A18] to-[#EA580C] shadow-[0_1px_10px_rgba(192,74,24,0.6)]" />

      {/* 16:9 Banner Display Container */}
      <div className="w-full relative aspect-[16/9] max-h-[620px] overflow-hidden flex items-center justify-center bg-black">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => onRegisterClick(slide.ballType)}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-contain sm:object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/t22.jpg';
              }}
            />
          </div>
        ))}

        {/* Burnt Orange Floating Status Pill on Top Left */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex items-center gap-1.5 sm:gap-2 bg-[#C04A18]/90 hover:bg-[#C04A18] text-white px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full shadow-2xl backdrop-blur-md border border-[#FFA07A]/40 transition-all duration-300">
          <Flame className="w-4 h-4 text-amber-200 fill-amber-200 animate-pulse shrink-0" />
          <span className="font-black text-xs sm:text-sm tracking-wider uppercase">Season 2 Trials</span>
          <span className="hidden sm:inline-block text-xs font-black bg-black/45 px-2.5 py-0.5 rounded-full text-orange-200">3+ Years • 800+ Matches</span>
        </div>

        {/* Left Arrow Navigation with Burnt Orange Hover */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/75 hover:bg-[#C04A18] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-[#FFA07A]/60 transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg hover:shadow-[#C04A18]/50"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Navigation with Burnt Orange Hover */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/75 hover:bg-[#C04A18] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-[#FFA07A]/60 transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg hover:shadow-[#C04A18]/50"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Carousel Controls: Dots with Burnt Orange active indicator */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xl">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(i);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide 
                    ? 'w-7 bg-[#C04A18] shadow-[0_0_8px_#C04A18]' 
                    : 'w-2 bg-white/40 hover:bg-white/75'
                }`}
                aria-label={`Go to banner slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Burnt Orange Hero Feature & Quick Action Strip */}
      <div className="w-full bg-gradient-to-r from-neutral-950 via-[#1c0c05] to-neutral-950 border-t border-b border-[#C04A18]/30 py-3.5 sm:py-4 px-4 sm:px-8 shadow-inner relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left Highlights with Burnt Orange Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 text-sm">
            <span className="inline-flex items-center gap-1.5 bg-[#C04A18] text-white font-black px-3.5 py-1.5 rounded-full shadow-xs tracking-wide uppercase text-xs sm:text-sm border border-[#FFA07A]/30">
              <Flame className="w-4 h-4 fill-current" />
              <span>Season 2</span>
            </span>
            <span className="text-orange-100 font-black text-sm sm:text-base">
              All-India Trials Scouting • 16 States Pan-India
            </span>
            <div className="hidden lg:flex items-center gap-3 text-xs sm:text-sm text-orange-200 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C04A18]"></span>
              <span className="text-amber-300 font-black">3+ Years of Excellence</span>
              <span className="w-2 h-2 rounded-full bg-[#C04A18]"></span>
              <span className="text-amber-300 font-black">800+ Matches Played</span>
              <span className="w-2 h-2 rounded-full bg-[#C04A18]"></span>
              <span>100-Point Merit Selection</span>
            </div>
          </div>

          {/* Right Action Buttons with Burnt Orange Palette */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onRegisterClick('Leather')}
              className="inline-flex items-center gap-1.5 bg-[#C04A18] hover:bg-[#a83d0f] active:scale-95 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md hover:shadow-[#C04A18]/50 border border-[#e06322] transition-all cursor-pointer group/cta"
            >
              <span>Book Trial Slot</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={onExploreTrials}
              className="inline-flex items-center gap-1.5 bg-black/50 hover:bg-[#C04A18]/25 text-orange-200 hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-[#C04A18]/50 hover:border-[#C04A18] transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FFA07A]" />
              <span>View 16 State Venues</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

