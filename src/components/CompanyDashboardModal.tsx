import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  User, 
  ExternalLink, 
  Search, 
  RefreshCw, 
  Lock, 
  Key, 
  Check, 
  AlertCircle, 
  Download, 
  Filter, 
  Calendar,
  MessageCircle,
  Copy,
  Clock
} from 'lucide-react';
import { COMPANY_OWNER_EMAIL } from '../services/notificationService';

interface CompanyDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Allowed Admin Passkeys
const VALID_PASSKEYS = ['ccl2026', 'ccl@admin2026', 'admin123', 'khelbharat2026'];

export const CompanyDashboardModal: React.FC<CompanyDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ccl_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);

  // Tab state (only 2 tabs now: Paid Registrations & Pending Leads)
  const [activeTab, setActiveTab] = useState<'registrations' | 'leads'>('registrations');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ballFilter, setBallFilter] = useState<'ALL' | 'Leather' | 'Tennis'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = () => {
    try {
      setRegistrations(JSON.parse(localStorage.getItem('ccl_company_registrations') || '[]'));
      setLeads(JSON.parse(localStorage.getItem('ccl_company_leads') || '[]'));
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handlePasskeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passkeyInput.trim().toLowerCase();
    if (VALID_PASSKEYS.includes(cleanKey)) {
      setIsAuthenticated(true);
      setPasskeyError(false);
      try {
        sessionStorage.setItem('ccl_admin_auth', 'true');
      } catch {}
    } else {
      setPasskeyError(true);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No records available to export.');
      return;
    }
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(fieldName => {
          const val = row[fieldName] ? String(row[fieldName]).replace(/"/g, '""') : '';
          return `"${val}"`;
        }).join(',')
      )
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // ========================================================
  // VIEW 1: PASSKEY PROTECTION GATE
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
        <div className="bg-[#0f172a] text-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-700 overflow-hidden p-6 sm:p-8">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-7 h-7 text-neutral-950" />
            </div>
            
            <span className="text-[11px] font-black tracking-widest uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
              Restricted Portal
            </span>

            <h3 className="text-xl font-black text-white">
              Admin Pass Key Required
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              This console contains candidate lead data, financial statements, and trial rosters. <br />
              <strong className="text-slate-300 font-semibold">(This is for Admins Only)</strong>
            </p>
          </div>

          <form onSubmit={handlePasskeySubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Pass Key
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  autoFocus
                  required
                  placeholder="Enter passkey..."
                  value={passkeyInput}
                  onChange={(e) => {
                    setPasskeyInput(e.target.value);
                    if (passkeyError) setPasskeyError(false);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-mono"
                />
              </div>
              {passkeyError && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-semibold bg-rose-950/40 p-2 rounded-lg border border-rose-800/50">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Wrong passkey! Please check and try again.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Unlock Console</span>
                <Check className="w-4 h-4 text-neutral-950" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-sm transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ========================================================
  // VIEW 2: AUTHENTICATED ADMIN CONSOLE (TABLOID DATA LAYOUT)
  // ========================================================
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch = !searchTerm || 
      r.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.candidatePhone?.includes(searchTerm) ||
      r.trialLocation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBall = ballFilter === 'ALL' || r.ballType === ballFilter;
    return matchesSearch && matchesBall;
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = !searchTerm || 
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.tempId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone?.includes(searchTerm) ||
      l.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.state?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBall = ballFilter === 'ALL' || l.ballType === ballFilter;
    return matchesSearch && matchesBall;
  });

  const totalPaidRevenue = registrations.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalPendingValue = leads.reduce((sum, l) => sum + (Number(l.feeAmount) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-4 sm:p-5 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-neutral-950 font-black flex items-center justify-center text-sm shadow">
              <Building className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-white">
                  CCL League Administration Console
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full">
                  Authorized Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Roster linked to: <span className="text-amber-300 font-mono">{COMPANY_OWNER_EMAIL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh Roster Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                try { sessionStorage.removeItem('ccl_admin_auth'); } catch {}
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
              title="Lock Console"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Lock</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls Bar (Only 2 Tabs) */}
        <div className="bg-slate-100 p-2.5 sm:px-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'registrations'
                  ? 'bg-[#1B3E8E] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Paid Registrations</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'registrations' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {registrations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'leads'
                  ? 'bg-[#1B3E8E] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Registration Leads</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {leads.length}
              </span>
            </button>
          </div>

          {/* Search & Ball Category Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 text-[11px] font-bold">
              {(['ALL', 'Leather', 'Tennis'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBallFilter(b)}
                  className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    ballFilter === b 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate / city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B3E8E] bg-white text-slate-900"
              />
            </div>

            <button
              onClick={() => exportToCSV(
                activeTab === 'registrations' ? filteredRegistrations : filteredLeads,
                activeTab === 'registrations' ? 'ccl_paid_registrations' : 'ccl_pending_leads'
              )}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
              title="Download Excel / CSV format"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tabloid Main Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          
          {/* STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {activeTab === 'registrations' ? 'Paid Athletes' : 'Pending Leads'}
              </span>
              <span className="text-xl font-black text-slate-900">
                {activeTab === 'registrations' ? registrations.length : leads.length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {activeTab === 'registrations' ? 'Confirmed & verified' : 'Awaiting payment'}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {activeTab === 'registrations' ? 'Total Revenue' : 'Unrealized Value'}
              </span>
              <span className="text-xl font-black text-emerald-700">
                ₹{(activeTab === 'registrations' ? totalPaidRevenue : totalPendingValue).toLocaleString('en-IN')}/-
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Settled via Razorpay
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Leather Trials
              </span>
              <span className="text-xl font-black text-red-600">
                {(activeTab === 'registrations' ? registrations : leads).filter(x => x.ballType === 'Leather').length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                BCCI-Standard Turf
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tennis Trials
              </span>
              <span className="text-xl font-black text-amber-600">
                {(activeTab === 'registrations' ? registrations : leads).filter(x => x.ballType === 'Tennis').length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Hard Tennis Ball
              </span>
            </div>
          </div>

          {/* TAB 1: PAID REGISTRATIONS (TABLOID TABLE) */}
          {activeTab === 'registrations' && (
            <div>
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl text-slate-500 text-xs">
                  <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 text-sm">No paid registrations match your filter.</p>
                  <p className="text-slate-400 mt-1 max-w-md mx-auto">
                    When players complete their fee payment on Razorpay, their official admit card and confirmed records are tabulated here in real-time.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/90 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                          <th className="py-3 px-3.5">Registration No.</th>
                          <th className="py-3 px-3.5">Candidate Details</th>
                          <th className="py-3 px-3.5">Contact (WhatsApp / Mail)</th>
                          <th className="py-3 px-3.5">Category &amp; Specialty</th>
                          <th className="py-3 px-3.5">Trial Venue / Hub</th>
                          <th className="py-3 px-3.5">Fee &amp; Payment ID</th>
                          <th className="py-3 px-3.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRegistrations.map((item, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                            {/* Reg No */}
                            <td className="py-3 px-3.5 font-mono">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#1B3E8E] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px]">
                                  {item.registrationNumber}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(item.registrationNumber, `reg_${idx}`)}
                                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                                  title="Copy Registration Number"
                                >
                                  {copiedId === `reg_${idx}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {new Date(item.registeredAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </span>
                            </td>

                            {/* Candidate */}
                            <td className="py-3 px-3.5">
                              <span className="font-extrabold text-slate-900 block text-sm">
                                {item.candidateName}
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">
                                Age: {item.candidateAge || item.age} yrs • {Number(item.candidateAge || item.age) < 16 ? 'Under-16' : 'Open / Senior'}
                              </span>
                            </td>

                            {/* Contact */}
                            <td className="py-3 px-3.5">
                              <div className="flex items-center gap-1 font-medium text-slate-800">
                                <span>{item.candidatePhone}</span>
                                <a
                                  href={`https://wa.me/91${item.candidatePhone?.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-600 hover:text-emerald-700 ml-1"
                                  title="WhatsApp Candidate"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <span className="text-[11px] text-slate-500 block truncate max-w-[180px]">
                                {item.candidateEmail}
                              </span>
                            </td>

                            {/* Category & Speciality */}
                            <td className="py-3 px-3.5">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1 ${
                                item.ballType === 'Leather'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                {item.ballType} Ball
                              </span>
                              <span className="font-bold text-slate-800 block text-xs">
                                {item.speciality}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="py-3 px-3.5">
                              <span className="font-bold text-slate-900 block">
                                {item.trialLocation}
                              </span>
                              <span className="text-[10px] text-slate-500 block">
                                Slot: 08:00 AM IST
                              </span>
                            </td>

                            {/* Payment */}
                            <td className="py-3 px-3.5">
                              <span className="font-black text-emerald-700 text-sm block">
                                ₹{item.amount || (item.ballType === 'Leather' ? 1199 : 799)}/-
                              </span>
                              <span className="font-mono text-[10px] text-slate-500 block truncate max-w-[140px]" title={item.paymentId}>
                                {item.paymentId}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-3 px-3.5 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                                <Check className="w-3 h-3 text-emerald-700" />
                                Verified
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PENDING LEADS (TABLOID TABLE) */}
          {activeTab === 'leads' && (
            <div>
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl text-slate-500 text-xs">
                  <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 text-sm">No pending leads match your criteria.</p>
                  <p className="text-slate-400 mt-1 max-w-md mx-auto">
                    When candidates fill out the registration form but pause or cancel before completing Razorpay payment, their details appear here for company follow-up.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/90 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                          <th className="py-3 px-3.5">Provisional Ref</th>
                          <th className="py-3 px-3.5">Candidate Details</th>
                          <th className="py-3 px-3.5">Contact (WhatsApp / Mail)</th>
                          <th className="py-3 px-3.5">Trial Category</th>
                          <th className="py-3 px-3.5">Preferred Hub</th>
                          <th className="py-3 px-3.5">Fee (Pending)</th>
                          <th className="py-3 px-3.5 text-center">Action / Follow-up</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((item, idx) => (
                          <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                            {/* Ref */}
                            <td className="py-3 px-3.5 font-mono">
                              <span className="font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] block">
                                {item.tempId || item.registrationNumber}
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'Recent'}
                              </span>
                            </td>

                            {/* Candidate */}
                            <td className="py-3 px-3.5">
                              <span className="font-extrabold text-slate-900 block text-sm">
                                {item.name || item.candidateName}
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">
                                Age: {item.age || item.candidateAge} yrs • {Number(item.age || item.candidateAge) < 16 ? 'Under-16' : 'Open'}
                              </span>
                            </td>

                            {/* Contact */}
                            <td className="py-3 px-3.5">
                              <span className="font-medium text-slate-800 block">
                                {item.phone || item.candidatePhone}
                              </span>
                              <span className="text-[11px] text-slate-500 block truncate max-w-[180px]">
                                {item.email || item.candidateEmail}
                              </span>
                            </td>

                            {/* Discipline */}
                            <td className="py-3 px-3.5">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1 ${
                                item.ballType === 'Leather'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                {item.ballType} Ball
                              </span>
                              <span className="font-bold text-slate-800 block text-xs">
                                {item.speciality}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="py-3 px-3.5">
                              <span className="font-bold text-slate-900 block">
                                {item.city}, {item.state}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                Recommended Hub
                              </span>
                            </td>

                            {/* Pending Fee */}
                            <td className="py-3 px-3.5">
                              <span className="font-black text-rose-600 text-sm block">
                                ₹{item.feeAmount || item.amount || 1199}/-
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 inline-block mt-0.5">
                                Payment Pending
                              </span>
                            </td>

                            {/* Action */}
                            <td className="py-3 px-3.5 text-center">
                              <a
                                href={`https://wa.me/91${(item.phone || item.candidatePhone)?.replace(/\D/g, '')}?text=Dear%20${encodeURIComponent(item.name || item.candidateName || 'Player')},%20we%20noticed%20your%20registration%20for%20Champion%20Cricket%20League%20Season%202%20Trials%20is%20pending.%20Would%20you%20like%20assistance%20to%20complete%20your%20slot%20reservation?`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-2xs cursor-pointer transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Reminder</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Console Footer */}
        <div className="bg-slate-50 p-3.5 sm:px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Tabloid Database Synchronized • Champion Cricket League</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                try { sessionStorage.removeItem('ccl_admin_auth'); } catch {}
              }}
              className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer text-xs"
            >
              Lock Console
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
            >
              Close Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
