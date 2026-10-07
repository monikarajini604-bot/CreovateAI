import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles, Monitor, Check } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export function ThemeSelector() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    {
      id: THEMES.LIGHT,
      label: 'Light Mode',
      desc: 'Crisp bright interface',
      icon: Sun,
      iconColor: 'text-amber-500'
    },
    {
      id: THEMES.DARK,
      label: 'Dark Mode',
      desc: 'Obsidian high-contrast UI',
      icon: Moon,
      iconColor: 'text-purple-400'
    },
    {
      id: THEMES.NIGHT,
      label: 'Night Mode',
      desc: 'Soft warm low-glare dark',
      icon: Sparkles,
      iconColor: 'text-amber-300'
    },
    {
      id: THEMES.SYSTEM,
      label: 'System Sync',
      desc: 'Match OS preference',
      icon: Monitor,
      iconColor: 'text-cyan-400'
    }
  ];

  const currentOption = options.find(o => o.id === theme) || options[1];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={`Theme: ${currentOption.label} (${resolvedTheme})`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 transition-all hover:scale-102"
      >
        <CurrentIcon className={`w-3.5 h-3.5 ${currentOption.iconColor}`} />
        <span className="hidden xl:inline text-[11px] font-medium">{currentOption.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0b101e] border border-purple-500/30 p-2 shadow-2xl z-50 backdrop-blur-xl animate-fade-in text-xs">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1">
            Appearance & Themes
          </div>

          <div className="space-y-1">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-purple-600/20 text-white font-bold border border-purple-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg bg-black/40 ${opt.iconColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{opt.desc}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-purple-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
