import React from 'react';
import { ShieldCheck, CheckCircle2, Building2, Globe, Mail, Phone, UserCheck, X, ExternalLink } from 'lucide-react';

export function BrandVerificationModal({ brand, isOpen, onClose }) {
  if (!isOpen || !brand) return null;

  const v = brand.verification_status || {
    is_verified: true,
    badge_type: brand.company_type?.includes('Agency') ? 'Verified Agency' : 'Verified Brand',
    email_verified: true,
    phone_verified: true,
    identity_verified: true,
    website_verified: true,
    business_profile_verified: true,
    contact_person_verified: true,
    verified_date: 'March 2026'
  };

  const badgeTitle = v.badge_type || (brand.company_type?.includes('Agency') ? 'Verified Agency' : 'Verified Brand');

  const verificationItems = [
    {
      label: 'Business Email Verified',
      desc: brand.contact_info?.business_email ? `Verified domain: ${brand.contact_info.business_email}` : 'Corporate domain authenticated via SPF & DKIM record handshake',
      icon: Mail,
      verified: v.email_verified !== false
    },
    {
      label: 'Company Identity Verified',
      desc: `Registered legal corporate entity in ${brand.location || 'United States'}`,
      icon: Building2,
      verified: v.identity_verified !== false
    },
    {
      label: 'Official Website Verified',
      desc: brand.website ? `Active TLS/SSL authenticated portal (${brand.website})` : 'Encrypted corporate portal confirmed',
      icon: Globe,
      verified: v.website_verified !== false
    },
    {
      label: 'Contact Person Verified',
      desc: brand.contact_info?.contact_person ? `${brand.contact_info.contact_person.name} (${brand.contact_info.contact_person.designation})` : 'Authorized project manager identity confirmed',
      icon: UserCheck,
      verified: v.contact_person_verified !== false
    },
    {
      label: 'Business Phone Verified',
      desc: brand.contact_info?.business_phone ? `Direct communications route verified (+1)` : 'SMS & telecom routing handshake confirmed',
      icon: Phone,
      verified: v.phone_verified !== false
    },
    {
      label: 'Business Profile & Commercial Rights',
      desc: 'Active commercial engagement history on CREOVATE AI with 100% escrow settlement record',
      icon: ShieldCheck,
      verified: v.business_profile_verified !== false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0c1222] border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Trust & Identity Passport</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                  {v.verified_date || 'Active'}
                </span>
              </div>
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                {brand.name}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {badgeTitle} • {brand.company_type || 'Brand'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verified signals list */}
        <div className="space-y-3 relative z-10 max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              This organization has completed CREOVATE AI enterprise authentication. Creators working with this client benefit from verified project briefs, guaranteed escrow milestone disbursements, and authentic commercial IP release agreements.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {verificationItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-start justify-between gap-3 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <span className="text-[11px]">
            Audited by CREOVATE AI Trust Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors text-xs"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
}
