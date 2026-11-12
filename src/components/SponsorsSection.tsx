import React, { useRef } from 'react';
import { SPONSORS } from '../data/cclData';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate items twice to ensure a seamless infinite auto-scroll marquee loop
  const marqueeItems = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-100 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1B3E8E] text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-[#1B3E8E]" />
              <span>Official League Partners</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Proud Sponsors & Associates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Champion Cricket League is proudly backed by leading sports brands, equipment manufacturers, and corporate talent associates across India.
            </p>
          </div>

          {/* Manual Scroll Controls for accessibility */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollManual('left')}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollManual('right')}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auto-Scroll Marquee Container with subtle gradient masks */}
        <div className="relative">
          {/* Left & Right Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Wrapper */}
          <div 
            ref={scrollRef}
            className="overflow-x-hidden py-3 cursor-grab active:cursor-grabbing"
            tabIndex={0}
            role="region"
            aria-label="Sponsors carousel"
          >
            <div className="animate-ccl-marquee flex gap-6 sm:gap-8 items-center">
              {marqueeItems.map((sponsor, index) => (
                <div
                  key={`${sponsor.id}-${index}`}
                  className="shrink-0 w-48 sm:w-60 h-28 sm:h-32 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="max-h-16 sm:max-h-20 max-w-[85%] object-contain transform group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
