/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ActiveView, 
  BallType 
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { StatsCounter } from './components/StatsCounter';
import { SportsTicker } from './components/SportsTicker';
import { LeagueHighlights } from './components/LeagueHighlights';
import { AboutSection } from './components/AboutSection';
import { SponsorsSection } from './components/SponsorsSection';
import { TrialsSection } from './components/TrialsSection';
import { UpcomingTrialsFinder } from './components/UpcomingTrialsFinder';
import { TeamsSection } from './components/TeamsSection';
import { RegistrationModal } from './components/RegistrationModal';
import { PointsCalculator } from './components/PointsCalculator';
import { GalleryModal } from './components/GalleryModal';
import { CompanyDashboardModal } from './components/CompanyDashboardModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AboutPage } from './components/Pages/AboutPage';
import { SelectionProcessPage } from './components/Pages/SelectionProcessPage';
import { StateLeaguePage } from './components/Pages/StateLeaguePage';
import { MandatoryDocsPage } from './components/Pages/MandatoryDocsPage';
import { ContactPage } from './components/Pages/ContactPage';
import { PoliciesPage } from './components/Pages/PoliciesPage';
import { PhysicCarePage } from './components/Pages/PhysicCarePage';
import { ReviewsPage } from './components/Pages/ReviewsPage';
import { GALLERY_ITEMS, TESTIMONIALS, TRIAL_VENUES, STATE_TEAMS } from './data/cclData';
import { 
  Camera, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  MapPin,
  Calendar,
  Clock,
  Trophy,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>(() => {
    try {
      const validViews: ActiveView[] = [
        'home', 'about', 'selection-process', 'trials', 'state-league', 
        'teams', 'gallery', 'videos', 'reviews', 'contact', 'physiccare', 
        'mandatory-docs', 'registration-policy', 'privacy-policy', 
        'refund-policy', 'terms-conditions'
      ];

      // Check session storage first (what page the user was actively on in this tab)
      const saved = sessionStorage.getItem('ccl_current_view') as ActiveView;
      if (saved && validViews.includes(saved)) {
        return saved;
      }

      // Check hash if valid and not empty
      const rawHash = window.location.hash.replace(/^#\/?/, '') as ActiveView;
      if (rawHash && validViews.includes(rawHash)) {
        return rawHash;
      }
    } catch (e) {
      // ignore
    }
    return 'home';
  });

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedBallType, setSelectedBallType] = useState<BallType>('Leather');
  const [selectedStateForReg, setSelectedStateForReg] = useState('');
  const [selectedCityForReg, setSelectedCityForReg] = useState('');
  
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);

  // Sync state with URL hash and sessionStorage for reliable multi-page routing
  useEffect(() => {
    // Check initial query or hash for admin console modal
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || window.location.hash === '#admin' || window.location.hash === '#company') {
      setCompanyModalOpen(true);
    }

    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '') as ActiveView | 'admin' | 'company';
      if (rawHash === 'admin' || rawHash === 'company') {
        setCompanyModalOpen(true);
        return;
      }
      const validViews: ActiveView[] = [
        'home', 'about', 'selection-process', 'trials', 'state-league', 
        'teams', 'gallery', 'videos', 'reviews', 'contact', 'physiccare', 
        'mandatory-docs', 'registration-policy', 'privacy-policy', 
        'refund-policy', 'terms-conditions'
      ];
      if (rawHash && (validViews as string[]).includes(rawHash)) {
        setCurrentView(rawHash as ActiveView);
        try {
          sessionStorage.setItem('ccl_current_view', rawHash);
        } catch (e) {}
      } else if (!rawHash || rawHash === 'home') {
        setCurrentView('home');
        try {
          sessionStorage.setItem('ccl_current_view', 'home');
        } catch (e) {}
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: ActiveView, sectionId?: string) => {
    setCurrentView(view);
    try {
      sessionStorage.setItem('ccl_current_view', view);
    } catch (e) {}

    // Explicitly update hash for all views so reloading stays on the exact active page
    if (view === 'home') {
      window.location.hash = sectionId ? `#${sectionId}` : '#home';
    } else {
      window.location.hash = `#${view}`;
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenRegister = (ballType: BallType = 'Leather', state = '', city = '') => {
    setSelectedBallType(ballType);
    setSelectedStateForReg(state);
    setSelectedCityForReg(city);
    setRegisterModalOpen(true);
  };

  const handleOpenGallery = (index: number = 0) => {
    setSelectedGalleryIndex(index);
    setGalleryModalOpen(true);
  };

  // Spotlights for the homepage to avoid duplicating the massive 16-state tables
  const upcomingFeaturedTrials = TRIAL_VENUES.slice(0, 3);
  const featuredTeams = STATE_TEAMS.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-[#1B3E8E] selection:text-white">
      {/* Header Navigation with direct navigation panel */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
      />

      {/* Dynamic Flash News Sports Ticker directly under Header */}
      <SportsTicker onRegister={handleOpenRegister} />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* Hero Slider Banner */}
            <HeroBanner
              onRegisterClick={handleOpenRegister}
              onExploreTrials={() => handleNavigate('trials')}
            />

            {/* Quick Metrics Bar */}
            <StatsCounter />

            {/* Engaging League Perks / Highlights Strip inspired by top cricket leagues */}
            <LeagueHighlights 
              onRegister={handleOpenRegister}
              onExploreProcess={() => handleNavigate('selection-process')}
            />

            {/* Small About Section for Champion Cricket League with original image */}
            <AboutSection
              onLearnMore={() => handleNavigate('about')}
              onRegister={handleOpenRegister}
            />

            {/* Upcoming Trials Section (CONCEPT: SELECT YOUR STATE -> SELECT PREFERRED CITY -> NEAREST AVAILABLE TRIAL) */}
            <UpcomingTrialsFinder onRegister={handleOpenRegister} />

            {/* Homepage Streamlined Upcoming Trials Spotlight */}
            <section className="py-16 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-100 border border-amber-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                      Phase 1 Scouting Live
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      Upcoming State Trials Spotlight
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Phase 1 trials currently scheduled across 16 states. Reporting starts at 8:00 AM sharp with video recording.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('trials')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1B3E8E] hover:text-[#142e6b] bg-white border border-slate-300 px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <span>View All 16 State Venues & Dates</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Featured Trial Cards with Sports Energy */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upcomingFeaturedTrials.map((venue) => (
                    <div
                      key={venue.id}
                      className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Top colored accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B3E8E] via-amber-400 to-red-500"></div>

                      <div className="space-y-3 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#1B3E8E] bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                            {venue.state}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Trial Slots Open
                          </span>
                        </div>

                        <div>
                          <h3 className="font-black text-lg text-slate-900 group-hover:text-[#1B3E8E] transition-colors leading-snug">
                            {venue.city} Selection Trial
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            <span>{venue.venueName}</span>
                          </p>
                        </div>

                        <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <Calendar className="w-4 h-4 text-[#1B3E8E] shrink-0" />
                            <span className="font-extrabold text-slate-900">{venue.upcomingDate}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-500 px-1">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              Reporting: {venue.reportingTime}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                              Turf Pitch
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2">
                        <button
                          onClick={() => handleOpenRegister('Leather', venue.state, venue.city)}
                          className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black rounded-xl transition-all text-center cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                        >
                          <span>Book Trial Slot • Instant Admit Card</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Homepage Streamlined State Tournament Section */}
            <section className="py-16 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="bg-white rounded-3xl p-8 sm:p-12 text-slate-900 shadow-xl relative overflow-hidden border border-slate-200">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-300 inline-flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-600" />
                          <span>State</span>
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                          Televised Tournament & Live YouTube
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
                        Champion Cricket League <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">State Tournament</span>
                      </h2>

                      <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl font-normal">
                        Champion Cricket League (CCL) State Tournament brings together selected players and state teams to compete in an organized cricket championship. Players get the opportunity to showcase their skills, compete at a higher level, and gain match experience, with live YouTube broadcasts and commentary for every match. Tournament facilities and player support are provided as per the applicable guidelines.
                      </p>

                      {/* Featured State Badges with jersey style */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {featuredTeams.map((team) => (
                          <span
                            key={team.id}
                            className="text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-200 transition-all hover:scale-105 shadow-xs"
                          >
                            🏏 {team.name}
                          </span>
                        ))}
                        <span className="text-xs font-black text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-300">
                          +10 More State Squads
                        </span>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handleNavigate('teams')}
                          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>Explore All 16 State Franchises & Squads</span>
                          <ArrowRight className="w-4 h-4 text-neutral-950" />
                        </button>
                        <button
                          onClick={() => handleOpenRegister('Leather')}
                          className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-xs sm:text-sm border border-slate-300 transition-all cursor-pointer"
                        >
                          Join Trial to Get Drafted
                        </button>
                      </div>
                    </div>

                    {/* Right Structure & Accommodation Cards (Rows 12 & 13) */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Row 12: Tournament Match Structure */}
                      <div className="bg-slate-50 border border-slate-200 p-5 sm:p-6 rounded-2xl space-y-2.5 shadow-sm hover:border-amber-300 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1B3E8E] flex items-center justify-center shrink-0">
                            <Trophy className="w-5 h-5" />
                          </div>
                          <h3 className="text-sm sm:text-base font-black text-slate-900">
                            Tournament Match Structure
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          Players compete in organised league matches within their designated age categories, including U-14, U-16, and Open Category, following the applicable tournament format. Match schedules, number of overs, and playing conditions are communicated to participants in advance.
                        </p>
                      </div>

                      {/* Row 13: Accommodation & Player Facilities */}
                      <div className="bg-slate-50 border border-slate-200 p-5 sm:p-6 rounded-2xl space-y-2.5 shadow-sm hover:border-emerald-300 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <h3 className="text-sm sm:text-base font-black text-slate-900">
                            Accommodation & Player Facilities
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          All participating players receive tournament accommodation, Stay, three meals, and an official team jersey for participation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Photo Highlights Grid - Compact Preview */}
            <section id="highlights-section" className="py-16 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
                      On-Ground Action
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Match & Trial Highlights
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Explore authentic photos from turf trials and championship matches.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('gallery')}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B3E8E] hover:text-[#142e6b] transition-colors cursor-pointer shrink-0"
                  >
                    <span>View Complete Photo Archive</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {GALLERY_ITEMS.slice(0, 4).map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenGallery(idx)}
                      className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer h-48 sm:h-56 bg-slate-900"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                        <span className="text-[10px] uppercase font-bold text-amber-300">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                      </div>
                      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white group-hover:bg-black/70 transition-colors">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Showcase - Compact Preview */}
            <section id="reviews-section" className="py-16 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full inline-block mb-2">
                      Verified Feedback
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      What Athletes & Parents Say
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Real reviews from participants of the Champion Cricket League selection trials.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('reviews')}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B3E8E] hover:text-[#142e6b] transition-colors cursor-pointer shrink-0"
                  >
                    <span>Read All 12,000+ Reviews</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-3">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                          "{t.comment}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                        <div className="text-[11px] text-slate-500">{t.role} • {t.state}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Official Sponsors & Partners with Auto-Scroll - Home Page Only */}
            <SponsorsSection />
          </div>
        )}

        {/* Dedicated About View */}
        {currentView === 'about' && (
          <AboutPage onRegister={handleOpenRegister} />
        )}

        {/* Dedicated Selection Process View */}
        {currentView === 'selection-process' && (
          <SelectionProcessPage
            onOpenCalculator={() => setCalculatorOpen(true)}
            onRegister={handleOpenRegister}
          />
        )}

        {/* Dedicated State League View */}
        {currentView === 'state-league' && (
          <StateLeaguePage onRegister={handleOpenRegister} />
        )}

        {/* Dedicated Trials View */}
        {currentView === 'trials' && (
          <div className="py-8 bg-slate-100 min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <button onClick={() => handleNavigate('home')} className="hover:text-[#1B3E8E] font-medium cursor-pointer">Home</button>
                <span>/</span>
                <button onClick={() => handleNavigate('selection-process')} className="hover:text-[#1B3E8E] font-medium cursor-pointer">Process</button>
                <span>/</span>
                <span className="text-slate-900 font-bold">Upcoming Trial Venues & Dates</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                State Trial Venues & Schedules
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Phase 1 trials active across 16 states. Book your slot for Leather ball or Tennis ball trials.
              </p>
            </div>
            <TrialsSection onRegisterVenue={handleOpenRegister} />
          </div>
        )}

        {/* Dedicated Teams View */}
        {currentView === 'teams' && (
          <div className="py-8 bg-slate-100 min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <button onClick={() => handleNavigate('home')} className="hover:text-[#1B3E8E] font-medium cursor-pointer">Home</button>
                <span>/</span>
                <button onClick={() => handleNavigate('about')} className="hover:text-[#1B3E8E] font-medium cursor-pointer">About CCL</button>
                <span>/</span>
                <span className="text-slate-900 font-bold">State Franchises & Teams</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Official State Franchises & Squads
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Explore all state franchise teams competing in the Champion Cricket League Season-2.
              </p>
            </div>
            <TeamsSection />
          </div>
        )}

        {/* Dedicated Mandatory Documents View */}
        {currentView === 'mandatory-docs' && (
          <MandatoryDocsPage onRegister={handleOpenRegister} />
        )}

        {/* Dedicated Contact View */}
        {currentView === 'contact' && (
          <ContactPage />
        )}

        {/* Dedicated Gallery View */}
        {currentView === 'gallery' && (
          <div className="py-10 bg-white min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <button onClick={() => handleNavigate('home')} className="hover:text-[#1B3E8E] font-medium cursor-pointer">Home</button>
                  <span>/</span>
                  <span className="text-slate-900 font-bold">Action Photo Gallery</span>
                </div>
                <span className="text-xs font-bold text-[#1B3E8E] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
                  Match & Training Archive
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Champion Cricket League Photo Gallery
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Click any image to launch the full-screen photo lightbox with category filtering.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {GALLERY_ITEMS.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenGallery(idx)}
                    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer h-52 bg-slate-900"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/logo.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] uppercase font-bold text-amber-300">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Reviews View */}
        {currentView === 'reviews' && (
          <ReviewsPage />
        )}

        {/* Dedicated PhysicCare View */}
        {currentView === 'physiccare' && (
          <PhysicCarePage onRegister={handleOpenRegister} />
        )}

        {/* Dedicated Policies Views */}
        {currentView === 'registration-policy' && (
          <PoliciesPage policyType="registration" />
        )}
        {currentView === 'privacy-policy' && (
          <PoliciesPage policyType="privacy" />
        )}
        {currentView === 'refund-policy' && (
          <PoliciesPage policyType="refund" />
        )}
        {currentView === 'terms-conditions' && (
          <PoliciesPage policyType="terms" />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenCompanyDashboard={() => setCompanyModalOpen(true)}
      />

      {/* Persistent Floating WhatsApp Icon while scrolling */}
      <FloatingWhatsApp />

      {/* Modals */}
      <RegistrationModal
        isOpen={registerModalOpen}
        initialBallType={selectedBallType}
        initialState={selectedStateForReg}
        initialCity={selectedCityForReg}
        onClose={() => setRegisterModalOpen(false)}
      />

      <PointsCalculator
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />

      <GalleryModal
        isOpen={galleryModalOpen}
        initialIndex={selectedGalleryIndex}
        onClose={() => setGalleryModalOpen(false)}
      />

      <CompanyDashboardModal
        isOpen={companyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
      />
    </div>
  );
}
