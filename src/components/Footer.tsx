import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  ExternalLink,
  Sparkles,
  Map,
  Compass,
  ChevronRight,
  ShieldCheck,
  Calculator,
  Trophy,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube
} from 'lucide-react';
import { ActiveView, BallType } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
  onOpenRegister?: (ballType: BallType) => void;
  onOpenCalculator?: () => void;
  onOpenCompanyDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCalculator,
  onOpenCompanyDashboard
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Comprehensive Site-Map Section */}
      <div className="border-b border-slate-800/80 bg-slate-950/90 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Sitemap Col 1: About & Info */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Organization</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigate('home')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Home Page</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('about')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>What is CCL (About Us)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('teams')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>State Teams & Franchises</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('contact')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Contact Support Desk</span>
                  </button>
                </li>
                {onOpenCompanyDashboard && (
                  <li>
                    <button 
                      onClick={onOpenCompanyDashboard} 
                      className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-bold"
                    >
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>Company Dashboard &amp; SMTP Console</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Sitemap Col 2: Selection & Trials */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-blue-400" />
                <span>Selection & Trials</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigate('selection-process')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>5-Step Selection Process</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('trials')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Upcoming Trial Venues & Dates</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('state-league')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>State League Tournament Format</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('mandatory-docs')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Mandatory Trial Documents</span>
                  </button>
                </li>
                {onOpenCalculator && (
                  <li>
                    <button 
                      onClick={onOpenCalculator} 
                      className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-semibold"
                    >
                      <Calculator className="w-3 h-3 text-amber-400" />
                      <span>Merit Points Calculator (100-Point Rule)</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Sitemap Col 3: Media & Health */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Media & Sports Science</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigate('gallery')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Match & Nets Photo Archive</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('reviews')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Player & Parent Testimonials</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('physiccare')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>PhysicCare Sports Science</span>
                  </button>
                </li>
                <li>
                  <a 
                    href="https://youtube.com/@champion_cricket_league_ccl?si=IrIeZfoINayHkbXN" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Live Matches on YouTube</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Sitemap Col 4: Official Policies */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Official Policies</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigate('registration-policy')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Registration Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('refund-policy')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Refund & Cancellation Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('privacy-policy')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('terms-conditions')} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>Terms & Conditions</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Col 1: About CCL & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logo.jpg"
                alt="CCL Logo"
                className="h-11 w-auto object-contain rounded bg-white p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/one.png';
                }}
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block">CHAMPION</span>
                <span className="text-xs font-bold text-blue-400 tracking-widest uppercase block">Cricket League</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
              Champion Cricket League (CCL), powered by Khel Bharat, is a grassroots cricket talent platform providing aspiring cricketers across India with opportunities to showcase their skills through structured trials, transparent merit-based performance evaluation, and competitive leagues. With a growing presence across India, CCL aims to create a fair and accessible platform where players can demonstrate their talent, gain valuable competitive exposure, and progress through a structured  cricket journey supported by BCC certificated coaches and professional sporting environments.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a 
                href="mailto:support@khelbharatofficial.com" 
                className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="break-all">Email: support@khelbharatofficial.com</span>
              </a>
              <a 
                href="https://wa.me/918800763536" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <span>WhatsApp: +91 8800763536</span>
              </a>
              <a 
                href="tel:01169311383" 
                className="flex items-center gap-2 text-slate-300 hover:text-blue-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Helpline: 011 69311383</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400 sm:col-span-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Head Office: Building no. 13 Suraj vihar 1st floor beside Triumph Dwarka (New Delhi -110078)</span>
              </div>
            </div>

            {/* Official Social Media Links */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Follow Champion Cricket League
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.instagram.com/official_khel_bharat?igsh=MTN3Zml0bmtkbjkxdQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-pink-500 hover:text-pink-400 text-slate-300 text-xs font-semibold transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://x.com/CCL_IND"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 hover:text-sky-300 text-slate-300 text-xs font-semibold transition-all group"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Twitter / X</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/champion-cricket-league"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 hover:text-blue-400 text-slate-300 text-xs font-semibold transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://www.facebook.com/share/ZcPYAj9NXQmknsGj/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-600 hover:text-blue-400 text-slate-300 text-xs font-semibold transition-all group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://youtube.com/@champion_cricket_league_ccl?si=IrIeZfoINayHkbXN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-red-500 hover:text-red-400 text-slate-300 text-xs font-semibold transition-all group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Tournament Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tournament Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Champion Cricket League
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('selection-process')} className="hover:text-white transition-colors cursor-pointer text-left">
                  5-Step Selection Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trials')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Upcoming State Trials & Venues
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('state-league')} className="hover:text-white transition-colors cursor-pointer text-left">
                  State League Format & Rules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teams')} className="hover:text-white transition-colors cursor-pointer text-left">
                  State Franchises & Teams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('physiccare')} className="hover:text-white transition-colors cursor-pointer text-left">
                  PhysicCare Athlete Science
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Helpdesk & Support Center
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar without duplicate registration buttons */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Champion Cricket League (CCL). All rights reserved. Registered under Khel Bharat Sports Promotion.
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('privacy-policy')} 
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => onNavigate('refund-policy')} 
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => onNavigate('terms-conditions')} 
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            {onOpenCompanyDashboard && (
              <>
                <span>•</span>
                <button 
                  onClick={onOpenCompanyDashboard} 
                  className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                  title="View registered player leads, emails, and SMTP tests"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Console</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
