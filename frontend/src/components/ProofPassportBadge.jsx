import React from 'react';
import { ShieldCheck, Cpu, Film, Layers, CheckCircle2 } from 'lucide-react';

export function ProofPassportBadge({ badge, status, size = "md", showTooltip = true, onClick = null }) {
  let badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  let Icon = ShieldCheck;
  let text = "Verified";
  let explanation = "Creator has verified tools, portfolio artifacts, and reproducible workflows.";

  const effectiveBadge = badge || status || "Verified";
  const badgeLower = effectiveBadge.toLowerCase();

  if (badgeLower.includes("identity")) {
    badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/30";
    Icon = ShieldCheck;
    text = "Identity Verified";
    explanation = "Creator identity, professional portfolio attribution, and credentials verified.";
  } else if (badgeLower.includes("tool")) {
    badgeStyle = "bg-purple-500/10 text-purple-300 border-purple-500/30";
    Icon = Cpu;
    text = "Tool Verified";
    explanation = "AI tools and model stack inspected and verified via generation telemetry.";
  } else if (badgeLower.includes("portfolio")) {
    badgeStyle = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    Icon = Film;
    text = "Portfolio Verified";
    explanation = "Past project deliverables and high-resolution masters verified with clients.";
  } else if (badgeLower.includes("workflow")) {
    badgeStyle = "bg-indigo-500/10 text-indigo-300 border-indigo-500/30";
    Icon = Layers;
    text = "Workflow Verified";
    explanation = "Full human-in-the-loop pipeline & node graphs tested for consistency.";
  } else if (badgeLower.includes("commercial")) {
    badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    Icon = CheckCircle2;
    text = "Commercial Rights Verified";
    explanation = "Guaranteed commercial use availability, buyout rights, and model training clearance.";
  }

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs gap-1" : "px-2.5 py-1 text-xs gap-1.5 font-medium";

  return (
    <span
      onClick={onClick}
      title={showTooltip ? explanation : undefined}
      className={`inline-flex items-center rounded-full border transition-all duration-200 select-none ${badgeStyle} ${sizeClasses} ${onClick ? 'cursor-pointer hover:scale-105 hover:bg-white/5' : ''}`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{text}</span>
    </span>
  );
}
