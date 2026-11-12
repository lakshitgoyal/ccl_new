import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ActiveView, BallType } from '../types';

interface HeaderProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenRegister?: (ballType?: BallType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenRegister
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navItems: { label: string; view: ActiveView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Selection Process', view: 'selection-process' },
    { label: 'Trial Venues', view: 'trials' },
    { label: 'State League', view: 'state-league' },
    { label: 'State Teams', view: 'teams' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'PhysicCare', view: 'physiccare' },
    { label: 'Contact Us', view: 'contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-40 bg-neutral-950 border-b border-neutral-800 shadow-xl backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#1955a0] text-white text-xs py-2 px-4 sm:px-8 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 bg-[#1955a0]">
          {/* Social & Contact Links */}
          <div className="flex items-center gap-4 order-2 md:order-1">
            <a 
              href="https://wa.me/918800763536" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition-colors font-semibold text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp: +91 8800763536</span>
            </a>
            <span className="hidden md:inline text-neutral-700">|</span>
            <a 
              href="tel:01169311383" 
              className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Helpline: 011 69311383</span>
            </a>
          </div>

          {/* TOP CENTER: Registrations closing soon – Register Now */}
          <div className="order-1 md:order-2 flex justify-center py-0.5">
            <button
              onClick={() => onOpenRegister?.('Leather')}
              className="group inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs shadow-md border border-red-300/40 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0"></span>
              <span className="tracking-wide">Registrations closing soon – Register Now</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>

          {/* Status ticker */}
          <div className="flex items-center gap-2 order-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping mr-1.5"></span>
              ⚡ Season 2 Registration Open
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
        >
          <div className="p-0.5 bg-white/10 rounded-lg border border-neutral-700 group-hover:border-amber-400 transition-all">
            <img 
              src="/assets/images/logo.jpg" 
              alt="Champion Cricket League Logo" 
              className="h-10 sm:h-11 w-auto object-contain rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dxk6wjttq/image/upload/v1753861659/cricket_mrbkep.png';
              }}
            />
          </div>
          <div>
            <span className="block text-base sm:text-lg font-black tracking-wider text-white leading-none group-hover:text-amber-400 transition-colors">
              CHAMPION
            </span>
            <span className="block text-[9px] sm:text-[10px] font-extrabold tracking-widest text-amber-400 uppercase mt-0.5">
              Cricket League
            </span>
          </div>
        </button>

        {/* Desktop Direct Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 font-medium text-xs xl:text-[13px]">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap font-bold ${
                  isActive 
                    ? 'text-amber-400 bg-white/10 shadow-inner border border-amber-400/30' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/90'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Register CTA Button */}
        <div className="hidden lg:flex items-center shrink-0 pl-2">
          {onOpenRegister && (
            <button
              onClick={() => onOpenRegister('Leather')}
              className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white font-extrabold px-4 xl:px-5 py-2 rounded-xl text-xs xl:text-sm transition-all shadow-lg shadow-red-600/30 hover:shadow-red-500/50 flex items-center gap-1.5 cursor-pointer border border-red-500/40"
              aria-label="Register for Trials"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>Register Now</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle & register */}
        <div className="lg:hidden flex items-center gap-2">
          {onOpenRegister && (
            <button
              onClick={() => onOpenRegister('Leather')}
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-md cursor-pointer border border-red-500/30"
            >
              <span>Register</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none cursor-pointer rounded-lg hover:bg-neutral-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-8 space-y-2 max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Quick Register CTA */}
          {onOpenRegister && (
            <div className="pb-2">
              <button
                onClick={() => {
                  onOpenRegister('Leather');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-xl text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>Register Now - Season 2 Trials</span>
              </button>
            </div>
          )}

          {/* Direct Nav Items for Mobile */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-amber-400 font-bold border-l-4 border-amber-400'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Policies Quick Links on Mobile */}
          <div className="pt-3 border-t border-neutral-800">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Policies</span>
            </div>
            <div className="grid grid-cols-2 gap-1 px-1">
              <button
                onClick={() => handleNav('registration-policy')}
                className="text-left px-2.5 py-1.5 rounded text-xs text-neutral-400 hover:text-white hover:bg-neutral-900"
              >
                Registration Policy
              </button>
              <button
                onClick={() => handleNav('refund-policy')}
                className="text-left px-2.5 py-1.5 rounded text-xs text-neutral-400 hover:text-white hover:bg-neutral-900"
              >
                Refund Policy
              </button>
              <button
                onClick={() => handleNav('privacy-policy')}
                className="text-left px-2.5 py-1.5 rounded text-xs text-neutral-400 hover:text-white hover:bg-neutral-900"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNav('terms-conditions')}
                className="text-left px-2.5 py-1.5 rounded text-xs text-neutral-400 hover:text-white hover:bg-neutral-900"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
