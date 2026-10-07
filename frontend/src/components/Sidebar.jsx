import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Wand2,
  FileText,
  Zap,
  Bookmark,
  Briefcase,
  UserCheck,
  PlusCircle,
  ShieldCheck,
  Film,
  Cpu,
  MessageSquare,
  Building2,
  X
} from 'lucide-react';

export function Sidebar({
  currentPage,
  onNavigate,
  currentRole,
  counts = { shortlisted: 0, briefs: 0, engagements: 0, unreadMessages: 0 },
  isOpen = false,
  onClose = null
}) {
  const brandNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Discover Creators', icon: Compass },
    { id: 'create-brief-page', label: 'Create Brief', icon: PlusCircle },
    { id: 'ai-brief-builder', label: 'AI Brief Builder', icon: Wand2, highlight: true },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare, badge: counts.unreadMessages },
    { id: 'my-briefs', label: 'My Briefs', icon: FileText, badge: counts.briefs },
    { id: 'smart-matches', label: 'Smart Matches', icon: Zap, badge: 'Match' },
    { id: 'shortlist', label: 'Shortlist', icon: Bookmark, badge: counts.shortlisted },
    { id: 'engagements', label: 'Project Tracking', icon: Briefcase, badge: counts.engagements },
    { id: 'brand-profile', label: 'Company Profile', icon: Building2 },
  ];

  const creatorNavItems = [
    { id: 'creator-portal', label: 'Creator Dashboard', icon: LayoutDashboard },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare, badge: counts.unreadMessages },
    { id: 'creator-profile-view', label: 'My Profile', icon: UserCheck },
    { id: 'creator-portfolio-view', label: 'My AI Portfolio', icon: Film },
    { id: 'creator-tools-view', label: 'Skills & AI Tools', icon: Cpu },
    { id: 'creator-portal-proof', label: 'Verification & Trust', icon: ShieldCheck, highlight: true },
    { id: 'my-briefs', label: 'Available Briefs', icon: FileText },
    { id: 'engagements', label: 'Active Projects', icon: Briefcase, badge: counts.engagements },
  ];

  const items = currentRole === 'creator' ? creatorNavItems : brandNavItems;

  const handleItemClick = (targetId) => {
    onNavigate(targetId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        role="navigation"
        aria-label="Sidebar Navigation"
        className={`fixed lg:sticky top-0 lg:top-[61px] h-full lg:h-[calc(100vh-61px)] lg:self-start z-50 lg:z-30 w-64 bg-[#0a0f1d] border-r border-white/10 p-4 flex flex-col justify-between shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation items */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {currentRole === 'creator' ? 'AI Creator Studio' : 'Brand & Agency Suite'}
              </span>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
                  title="Close navigation"
                  aria-label="Close navigation"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <nav aria-label="Main App Navigation" className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || 
                  (item.id === 'creator-portal-proof' && currentPage === 'creator-portal') ||
                  (item.id === 'create-brief-page' && currentPage === 'create-brief-page');

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`${item.label}${item.badge ? ` (${item.badge})` : ''}`}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                      : item.highlight
                      ? 'bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-purple-400' : 'text-slate-400'}`} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge !== null && item.badge !== 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badge === 'Match'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CREOVATE AI Enterprise Trust Badge */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-950/30 via-slate-900/40 to-cyan-950/20 border border-purple-500/20 text-xs space-y-1">
          <div className="flex items-center gap-2 text-purple-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Verified AI Network</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Every creator verified for commercial toolstack, reproducible workflows & IP clearance.
          </p>
        </div>
      </div>
    </aside>
    </>
  );
}
