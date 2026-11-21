import React, { useState, useEffect } from 'react';
import { X, Images, ChevronLeft, ChevronRight, ArrowLeft, Maximize2 } from 'lucide-react';
import { UTTARAKHAND_TRIAL_IMAGES } from '../data/cclData';

interface StateTrialsGallerySectionProps {
  title?: string;
  images?: string[];
}

export const StateTrialsGallerySection: React.FC<StateTrialsGallerySectionProps> = ({
  title = 'Uttarakhand State Match',
  images = UTTARAKHAND_TRIAL_IMAGES
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const validImages = images.filter((url) => typeof url === 'string' && url.trim().length > 0);
  const previewImages = validImages.slice(0, 5);

  useEffect(() => {
    if (!popupOpen || validImages.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedIndex !== null) {
          setSelectedIndex(null);
        } else {
          setPopupOpen(false);
        }
      } else if (selectedIndex !== null && e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % validImages.length));
      } else if (selectedIndex !== null && e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + validImages.length) % validImages.length));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [popupOpen, selectedIndex, validImages.length]);

  const handleOpenPopup = (startIndex: number | null = null) => {
    setSelectedIndex(startIndex);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedIndex(null);
    setPopupOpen(false);
  };

  if (validImages.length === 0) return null;

  return (
    <div className="mb-12 pb-10 border-b border-slate-200">
      {/* Centered Section Heading */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-black text-[#1B3E8E] uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-2">
          State Match Highlights
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-center">
          {title}
        </h2>
      </div>

      {/* Single Row Preview (5 Images on Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {previewImages.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => handleOpenPopup(idx)}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-[4/3] bg-slate-900 border border-slate-200"
          >
            <img
              src={imgUrl}
              alt={`${title} Photo ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 text-white">
              <span className="text-[11px] font-bold">Photo #{idx + 1}</span>
              <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Centered "Show-all" Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => handleOpenPopup(null)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3E8E] hover:bg-[#142e6b] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Images className="w-4 h-4 text-amber-400" />
          <span>Show-all</span>
        </button>
      </div>

      {/* Large Pop-up Modal (~80% Viewport Area) */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={handleClosePopup}
        >
          <div
            className="w-[92vw] sm:w-[84vw] h-[84vh] max-w-7xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pop-up Header */}
            <div className="bg-[#0f172a] text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {selectedIndex !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>All Photos</span>
                  </button>
                )}
                <div className="truncate">
                  <h3 className="text-base sm:text-xl font-black text-white truncate">
                    {title}
                  </h3>
                  <p className="text-[11px] text-amber-400 font-bold">
                    {selectedIndex !== null
                      ? `Photo #${selectedIndex + 1}`
                      : 'State Trial Gallery'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClosePopup}
                aria-label="Close popup"
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pop-up Body */}
            {selectedIndex === null ? (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {validImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer aspect-[4/3]"
                    >
                      <img
                        src={imgUrl}
                        alt={`${title} Photo ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/65 text-white text-[10px] font-bold font-mono">
                        #{String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2 rounded-full bg-white/90 text-slate-900 shadow">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Enlarged Single Photo View inside the 80% Pop-up */
              <div className="flex-1 bg-slate-950 relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelectedIndex((selectedIndex - 1 + validImages.length) % validImages.length)}
                  aria-label="Previous photo"
                  className="absolute left-3 sm:left-5 p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <img
                  src={validImages[selectedIndex] || '/assets/images/logo.jpg'}
                  alt={`${title} Photo ${selectedIndex + 1}`}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                  }}
                />

                <button
                  type="button"
                  onClick={() => setSelectedIndex((selectedIndex + 1) % validImages.length)}
                  aria-label="Next photo"
                  className="absolute right-3 sm:right-5 p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
