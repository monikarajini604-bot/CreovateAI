import React from 'react';

/**
 * CreovateLogo Component
 * 
 * Minimal, modern letter "C" logo for CREOVATE AI.
 * - Smooth, elegant, rounded "C" shape
 * - Friendly, positive, creative, and trustworthy appearance
 * - Soft blue-to-teal gradient
 * - Pure symbol: no extra text, no symbols, no complicated graphics
 * - Transparent background, adaptive across Light, Dark, and Night themes
 */
export function CreovateLogo({ size = 36, className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`creovate-logo shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="CREOVATE AI Logo — C"
    >
      <defs>
        {/* Soft Blue-to-Teal Gradient */}
        <linearGradient
          id="creovateCGradient"
          x1="12"
          y1="8"
          x2="38"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--logo-c-start, #38bdf8)" />
          <stop offset="35%" stopColor="var(--logo-c-mid, #3b82f6)" />
          <stop offset="70%" stopColor="var(--logo-c-teal, #06b6d4)" />
          <stop offset="100%" stopColor="var(--logo-c-end, #10b981)" />
        </linearGradient>

        {/* Subtle Ambient Depth */}
        <filter id="creovateCDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="2"
            floodColor="var(--logo-ambient-shadow, rgba(14, 165, 233, 0.25))"
          />
        </filter>
      </defs>

      {/* Smooth, elegant, rounded letter "C" */}
      <path
        d="M 37 14.5 C 28.5 7.5, 16.5 8, 11 14 C 5.5 20, 5.5 28, 11 34 C 16.5 40, 28.5 40.5, 37 33.5"
        stroke="url(#creovateCGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#creovateCDropShadow)"
      />
    </svg>
  );
}

export default CreovateLogo;
