'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, FileText, Send, Sprout, MapPin } from 'lucide-react';
import { Language, translationsMap } from '../lib/translations';

interface FarmerFormProps {
  language: Language;
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const STATES = ['Tamil Nadu', 'Andhra Pradesh', 'Maharashtra', 'Punjab', 'Uttar Pradesh'];

const DISTRICTS_BY_STATE: Record<string, string[]> = {
  'Tamil Nadu': ['Villupuram', 'Coimbatore', 'Dharmapuri', 'Thanjavur', 'Madurai'],
  'Andhra Pradesh': ['Guntur', 'East Godavari', 'Chittoor', 'Kurnool', 'Krishna'],
  'Maharashtra': ['Nagpur', 'Nashik', 'Kolhapur', 'Pune', 'Amravati'],
  'Punjab': ['Ludhiana', 'Bathinda', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Uttar Pradesh': ['Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Prayagraj']
};

const CROPS = ['Paddy', 'Cotton', 'Tomato', 'Wheat', 'Sugarcane', 'Soybean'];

const SYMPTOM_PRESETS: { label: string; value: string; crop: string }[] = [
  { label: 'Leaf Curl / Whitefly (வெள்ளை ஈ)', value: 'Leaf Curl / Whitefly', crop: 'Paddy / Cotton / Tomato' },
  { label: 'Stem Borer (தண்டு துளைப்பான்)', value: 'Stem Borer', crop: 'Paddy' },
  { label: 'Fungal Blight (இலைக்கருகல்)', value: 'Fungal Blight', crop: 'Tomato / Paddy' },
  { label: 'Bollworm (காய்ப்புழு)', value: 'Bollworm', crop: 'Cotton' },
  { label: 'Aphids / Thrips (அசுவினி)', value: 'Aphids / Thrips', crop: 'Chilli / Cotton' },
  { label: 'Yellowing / Deficiency (இலை மஞ்சள்)', value: 'Nutrient Deficiency (Yellowing / Chlorosis)', crop: 'All Crops' }
];

export const FarmerForm: React.FC<FarmerFormProps> = ({ language, onSubmit, isLoading }) => {
  const t = translationsMap[language];

  const [state, setState] = useState<string>('Tamil Nadu');
  const [district, setDistrict] = useState<string>('Villupuram');
  const [crop, setCrop] = useState<string>('Paddy');
  const [acres, setAcres] = useState<number>(2.5);
  const [symptom, setSymptom] = useState<string>('Leaf Curl / Whitefly');

  // Soil health card optional parameters
  const [showSoil, setShowSoil] = useState<boolean>(false);
  const [soilN, setSoilN] = useState<string>('240');
  const [soilP, setSoilP] = useState<string>('18');
  const [soilK, setSoilK] = useState<string>('190');
  const [soilPh, setSoilPh] = useState<string>('6.8');

  // Voice speech-to-text state
  const [isListening, setIsListening] = useState<boolean>(false);

  const handleStateChange = (newState: string) => {
    setState(newState);
    const availableDistricts = DISTRICTS_BY_STATE[newState] || ['Central Mandi'];
    setDistrict(availableDistricts[0]);
  };

  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type the symptoms.');
      return;
    }

    const recognition = new SpeechRecognition();
    const langMap: Record<Language, string> = {
      English: 'en-IN',
      Tamil: 'ta-IN',
      Hindi: 'hi-IN',
      Telugu: 'te-IN',
      Marathi: 'mr-IN'
    };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSymptom(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const loadSampleSoilCard = () => {
    setShowSoil(true);
    setSoilN('230.5');
    setSoilP('16.2');
    setSoilK('185.0');
    setSoilPh('6.7');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      farmer_language: language,
      state,
      district,
      crop,
      acres: Number(acres),
      symptom,
      soil_n: showSoil && soilN ? parseFloat(soilN) : null,
      soil_p: showSoil && soilP ? parseFloat(soilP) : null,
      soil_k: showSoil && soilK ? parseFloat(soilK) : null,
      soil_ph: showSoil && soilPh ? parseFloat(soilPh) : null
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-left"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
          <Sprout className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {t.farmerFormTitle}
          </h2>
          <p className="text-sm text-slate-300 mt-0.5">{t.farmerFormSubtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        {/* State */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {t.stateLabel}
          </label>
          <select
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            {STATES.map((s) => (
              <option key={s} value={s} className="bg-slate-900 text-white">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* District / Mandi */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {t.districtLabel}
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            {(DISTRICTS_BY_STATE[state] || ['Central']).map((d) => (
              <option key={d} value={d} className="bg-slate-900 text-white">
                {d} Mandi
              </option>
            ))}
          </select>
        </div>

        {/* Crop Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {t.cropLabel}
          </label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            {CROPS.map((c) => (
              <option key={c} value={c} className="bg-slate-900 text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Land Area */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {t.acresLabel}
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="100"
            value={acres}
            onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g. 2.5"
            required
          />
        </div>
      </div>

      {/* Symptom Input + Voice Button */}
      <div className="space-y-2 mb-6">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>{t.symptomLabel}</span>
          <span className="text-emerald-400 font-normal lowercase">{t.voiceInputTooltip}</span>
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl py-4 pl-4 pr-16 text-white text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Type or click the mic button to speak symptoms (e.g. leaf curl, yellowing, stem borer)..."
            required
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            title={t.voiceInputTooltip}
            className={`absolute right-2 p-3 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white animate-bounce'
                : 'bg-emerald-600/30 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
        {isListening && (
          <p className="text-xs text-red-400 font-semibold animate-pulse flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {t.listening}
          </p>
        )}
      </div>

      {/* Quick symptom presets */}
      <div className="mb-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {t.quickSymptoms}:
        </div>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_PRESETS.map((preset) => (
            <button
              type="button"
              key={preset.value}
              onClick={() => setSymptom(preset.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                symptom === preset.value
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Soil Health Card Section (Accordion / Quick Load) */}
      <div className="mb-8 p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-sm font-bold text-white">{t.soilHealthTitle}</h4>
              <p className="text-xs text-slate-400">{t.soilHealthDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadSampleSoilCard}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            >
              {t.sampleSoilCardBtn}
            </button>
            <button
              type="button"
              onClick={() => setShowSoil(!showSoil)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition cursor-pointer"
            >
              {showSoil ? 'Hide Parameters' : 'Enter NPK/pH'}
            </button>
          </div>
        </div>

        {showSoil && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80">
            <div>
              <label className="text-[11px] font-bold text-slate-400">{t.nitrogenLabel}</label>
              <input
                type="number"
                value={soilN}
                onChange={(e) => setSoilN(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm"
                placeholder="240"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400">{t.phosphorusLabel}</label>
              <input
                type="number"
                value={soilP}
                onChange={(e) => setSoilP(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm"
                placeholder="18"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400">{t.potassiumLabel}</label>
              <input
                type="number"
                value={soilK}
                onChange={(e) => setSoilK(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm"
                placeholder="190"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400">{t.soilPhLabel}</label>
              <input
                type="number"
                step="0.1"
                value={soilPh}
                onChange={(e) => setSoilPh(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm"
                placeholder="6.8"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-600/30 text-lg flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            <span>{t.analyzingBtn}</span>
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            <span>{t.getAdvisoryBtn}</span>
          </>
        )}
      </button>
    </form>
  );
};
