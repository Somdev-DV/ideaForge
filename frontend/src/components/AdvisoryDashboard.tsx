'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  CloudRain,
  Sun,
  ShieldCheck,
  AlertTriangle,
  BadgePercent,
  Landmark,
  IndianRupee,
  Package,
  Layers,
  ArrowRight,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { Language, translationsMap } from '../lib/translations';
import { AudioPlayer } from './AudioPlayer';

interface AdvisoryDashboardProps {
  data: any;
  language: Language;
  onReset: () => void;
}

export const AdvisoryDashboard: React.FC<AdvisoryDashboardProps> = ({
  data,
  language,
  onReset
}) => {
  const t = translationsMap[language];
  const { mandi, pesticide, scheme, weather, roi, advisory_text, farmer_profile } = data;

  const isRainRisk = !weather.spray_safe;

  return (
    <div className="advisory-dashboard w-full max-w-5xl mx-auto space-y-6 text-left">
      {/* Top Banner with Audio Readout */}
      <AudioPlayer text={advisory_text} language={language} />

      {/* Weather Safety Guardrail Banner */}
      <div
        className={`weather-banner p-6 rounded-3xl border-2 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
          isRainRisk
            ? 'bg-amber-950/70 border-amber-500/80 text-amber-100'
            : 'bg-emerald-950/70 border-emerald-500/80 text-emerald-100'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-4 rounded-2xl ${
              isRainRisk ? 'bg-amber-500 text-amber-950' : 'bg-emerald-500 text-emerald-950'
            }`}
          >
            {isRainRisk ? (
              <CloudRain className="w-8 h-8 animate-bounce" />
            ) : (
              <Sun className="w-8 h-8" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20">
                {isRainRisk ? 'Rain-Wash Guardrail Active' : 'Spray Window Open'}
              </span>
              <span className="text-xs text-slate-300">
                Rain Prob: {weather.rain_probability_pct}% | Temp: {weather.temperature_c}°C
              </span>
            </div>
            <h3 className="text-xl font-black mt-1 text-white">
              {isRainRisk ? t.delaySpraying : t.safeToSpray}
            </h3>
            <p className="text-sm text-slate-200 mt-1 max-w-2xl">{weather.recommendation}</p>
          </div>
        </div>

        <div className="text-right flex-shrink-0 self-end md:self-center">
          <div className="text-xs uppercase font-bold text-slate-400">Location Forecast</div>
          <div className="text-sm font-semibold text-white">{weather.location}</div>
        </div>
      </div>

      {/* Grid of 4 Core Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Active Molecule & Generic vs Branded Savings */}
        <div className="decision-card bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-teal-500/20 text-teal-400 rounded-2xl border border-teal-500/30">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Save {pesticide.savings_percentage}% vs Brand
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{t.pesticideSavingsTitle}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Target: <span className="text-slate-200 font-semibold">{pesticide.target_pest}</span>
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Recommended Active Molecule
                </span>
                <span className="text-base font-extrabold text-white">
                  {pesticide.active_molecule}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Dosage: {pesticide.recommended_dosage_per_acre}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Generic Chemical Price</span>
                  <span className="text-base font-black text-emerald-400">
                    ₹{pesticide.generic_price_per_acre} / acre
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Total: ₹{pesticide.total_generic_cost} ({farmer_profile.acres} Acres)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Expensive Branded Price</span>
                  <span className="text-sm font-semibold text-red-400 line-through">
                    ₹{pesticide.branded_price_per_acre} / acre
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    ({pesticide.branded_name})
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between">
              <span>Direct Generic Savings:</span>
              <span className="font-extrabold text-emerald-300 text-sm">
                +₹{pesticide.savings_total} Saved
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Procure at: {pesticide.vendor}</span>
            <span className="text-emerald-400 font-medium">Verified Active Compound</span>
          </div>
        </div>

        {/* Card 2: State Govt Scheme & Input Subsidy */}
        <div className="decision-card bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                {scheme.subsidy_percentage}% Govt Grant
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{t.govtSubsidyTitle}</h3>
            <p className="text-xs text-slate-400 mb-3">{scheme.state} State Agricultural Mission</p>

            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2 mb-4">
              <h4 className="text-sm font-bold text-purple-200">{scheme.scheme_name}</h4>
              <p className="text-xs text-slate-300">{scheme.description}</p>
              
              <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Subsidy Allotted:</span>
                  <span className="text-sm font-bold text-emerald-400">
                    -₹{scheme.total_subsidy_amount}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{t.netCostAfterSubsidy}:</span>
                  <span className="text-base font-black text-white">
                    ₹{scheme.net_effective_cost}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white">{t.claimAt}:</strong> {scheme.kvk_contact}
                </span>
              </div>
              <div className="flex items-start gap-1.5 text-slate-300">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white">{t.howToClaim}:</strong> {scheme.claim_procedure}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            Valid under National Mission on Sustainable Agriculture (NMSA) & State DBTs
          </div>
        </div>

        {/* Card 3: Live Mandi Rate & Price Trend */}
        <div className="decision-card bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                  mandi.price_trend.startsWith('Rising')
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                }`}
              >
                {mandi.price_trend.startsWith('Rising') ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>{mandi.price_trend}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{t.mandiRateTitle}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Market: <span className="text-slate-200 font-semibold">{mandi.market} ({mandi.district})</span>
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{t.modalPrice}</span>
                <span className="text-2xl font-black text-emerald-400">
                  ₹{mandi.modal_price}
                  <span className="text-xs text-slate-400 font-normal"> / Quintal</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Range: ₹{mandi.min_price} - ₹{mandi.max_price}</span>
                <span className="text-emerald-400 font-medium">
                  {mandi.weekly_change_pct > 0 ? `+${mandi.weekly_change_pct}%` : `${mandi.weekly_change_pct}%`} this week
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div>Commodity: <strong className="text-white">{mandi.commodity}</strong> ({mandi.variety})</div>
              <div>Report Date: <strong className="text-white">{mandi.arrival_date}</strong></div>
              <div>Source: <span className="text-slate-400">{mandi.source}</span></div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            data.gov.in Agmarknet Market Integration
          </div>
        </div>

        {/* Card 4: Net Profit & ROI Breakdown */}
        <div className="decision-card bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <IndianRupee className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                {roi.roi_multiple}x Return
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{t.roiTitle}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Yield Protected on {farmer_profile.acres} Acres: <strong className="text-white">{roi.saved_yield_qtl} Quintals</strong>
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-950/80 border border-emerald-500/40 space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{t.grossGain}:</span>
                <span className="font-bold text-white">₹{roi.gross_yield_gain_inr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Net Subsidized Pesticide Cost:</span>
                <span className="font-bold text-amber-400">-₹{roi.net_pesticide_cost_inr}</span>
              </div>

              <div className="pt-2 border-t border-emerald-500/30 flex items-center justify-between">
                <span className="text-sm font-extrabold text-white">{t.netProfit}:</span>
                <span className="text-2xl font-black text-emerald-400">
                  +₹{roi.net_gain_inr.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Economic Verdict:</span>
              <span className="font-extrabold text-emerald-300">{roi.verdict}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            Formulation: Yield Saved (Qtl) × Live Mandi Rate - Subsidized Input Cost
          </div>
        </div>
      </div>

      {/* Advisory Text Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-3">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Full Agronomic Explanation ({language})
        </h4>
        <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-normal bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
          {advisory_text}
        </div>
      </div>

      {/* Action to consult again */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-2xl font-bold shadow-lg transition cursor-pointer text-base"
        >
          ← {t.newConsultation}
        </button>
      </div>
    </div>
  );
};
