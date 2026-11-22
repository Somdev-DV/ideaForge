'use client';

import React from 'react';
import { Language } from '../lib/translations';
import { Globe2, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  isCompact?: boolean;
}

const LANGUAGES: { code: Language; label: string; native: string; script: string }[] = [
  { code: 'English', label: 'English', native: 'English', script: 'Standard English' },
  { code: 'Tamil', label: 'Tamil', native: 'தமிழ்', script: 'தமிழ்நாடு' },
  { code: 'Hindi', label: 'Hindi', native: 'हिन्दी', script: 'उत्तर भारत' },
  { code: 'Telugu', label: 'Telugu', native: 'తెలుగు', script: 'ఆంధ్రప్రదేశ్ & తెలంగాణ' },
  { code: 'Marathi', label: 'Marathi', native: 'मराठी', script: 'महाराष्ट्र' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  isCompact = false
}) => {
  if (isCompact) {
    return (
      <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-1 shadow-sm">
        <Globe2 className="w-4 h-4 text-emerald-400 ml-2" />
        <select
          value={currentLanguage}
          onChange={(e) => onSelectLanguage(e.target.value as Language)}
          className="bg-transparent text-emerald-100 font-medium py-1 px-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
              {lang.native} ({lang.label})
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-6 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 rounded-3xl shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
          <Globe2 className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Select Your Language / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
          </h2>
          <p className="text-sm text-slate-300">
            All pesticide comparisons, government subsidies, and audio readouts will adapt automatically.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        {LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 border-2 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 p-1 bg-emerald-500 rounded-full text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <span className="text-xl font-bold mb-1 text-emerald-300">{lang.native}</span>
              <span className="text-xs font-medium text-slate-300">{lang.label}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{lang.script}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
