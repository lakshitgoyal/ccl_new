import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/cclData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Trials', 'State League', 'Matches', 'Camp', 'Awards'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const currentItem = filteredItems[currentIndex] || filteredItems[0] || GALLERY_ITEMS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="max-w-5xl w-full flex flex-col h-[90vh] justify-between">
        {/* Top Controls */}
        <div className="flex items-center justify-between text-white p-2">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1B3E8E] text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Image Display */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-3">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
            }}
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption & Counter */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-white text-xs">
          <div>
            <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider block">
              {currentItem.category}
            </span>
            <h4 className="text-sm font-bold text-slate-100">{currentItem.title}</h4>
          </div>
          <div className="text-slate-400 font-mono">
            {currentIndex + 1} / {filteredItems.length}
          </div>
        </div>
      </div>
    </div>
  );
};
