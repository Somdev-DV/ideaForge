'use client';

import React, { useState, useEffect } from 'react';
import { Language, translationsMap } from '../lib/translations';
import { LanguageSelector } from '../components/LanguageSelector';
import { FarmerForm } from '../components/FarmerForm';
import { AdvisoryDashboard } from '../components/AdvisoryDashboard';
import { Sprout, History } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [language, setLanguage] = useState<Language>('Tamil');
  const [advisoryResult, setAdvisoryResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('krishi_farmer_language') as Language;
      if (savedLang && translationsMap[savedLang]) {
        setLanguage(savedLang);
      }
    }
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('krishi_farmer_language', lang);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/history?limit=5`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.warn('Could not fetch advisory history:', e);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/advise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setAdvisoryResult(data);
      fetchHistory();
    } catch (err) {
      console.error('Advisory request failed:', err);
      alert('Could not connect to backend server at ' + API_BASE_URL + '. Please ensure FastAPI is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAdvisoryResult(null);
  };

  const t = translationsMap[language];

  return (
    <div className="app-shell min-h-screen text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <header className="glass-header sticky top-0 z-50 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl text-white shadow-md shadow-emerald-500/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              {t.appName}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest hidden sm:inline-block">
                Free Tech Stack
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden md:block">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              if (!showHistory) fetchHistory();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 rounded-2xl text-xs font-semibold transition cursor-pointer"
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Recent</span>
          </button>

          <LanguageSelector
            currentLanguage={language}
            onSelectLanguage={handleLanguageSelect}
            isCompact={true}
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:py-10 flex flex-col items-center">
        {/* Banner with Language Onboarding cards if user hasn't gotten an advisory */}
        {!advisoryResult && (
          <>
            <div className="hero-copy text-center max-w-3xl mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30 mb-3 inline-block">
                Hackathon Track 02 - Problem Statement 01
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
                {t.appName}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
                Empowering Indian farmers with generic molecule price transparency, state government subsidies, live Agmarknet mandi rates, and rain safety guardrails in your mother tongue.
              </p>
            </div>

            {/* Language Selection Grid */}
            <LanguageSelector
              currentLanguage={language}
              onSelectLanguage={handleLanguageSelect}
              isCompact={false}
            />

            {/* Input Form */}
            <FarmerForm
              language={language}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </>
        )}

        {/* Advisory Output Dashboard */}
        {advisoryResult && (
          <AdvisoryDashboard
            data={advisoryResult}
            language={language}
            onReset={handleReset}
          />
        )}

        {/* Recent Consultations Drawer / Section */}
        {showHistory && (
          <div className="history-panel w-full max-w-4xl mt-10 p-6 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl text-left">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-400" />
                {t.historyTitle} (SQLite `agritech.db`)
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-400">No saved consultations yet. Submit your first crop query above.</p>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="history-item p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">
                        {item.crop} ({item.acres} Acres) - {item.district}, {item.state}
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        Symptom: <span className="text-emerald-400">{item.symptom}</span> | Molecule: {item.active_molecule}
                      </div>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className="font-extrabold text-emerald-400">
                        Net Gain: +₹{item.net_financial_gain.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Mandi: ₹{item.mandi_price_qtl}/Qtl ({item.farmer_language})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/60 bg-slate-950 py-6 px-4 text-center text-xs text-slate-300">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Free Stack: Next.js App Router • FastAPI • SQLite • data.gov.in • Gemini 2.5 • Web Speech API</span>
          </div>
          <div>
            Built for Indian Agritech Hackathon Track 02 • Problem Statement 01
          </div>
        </div>
      </footer>
    </div>
  );
}
