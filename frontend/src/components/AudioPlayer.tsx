'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';
import { Language, translationsMap } from '../lib/translations';

interface AudioPlayerProps {
  text: string;
  language: Language;
}

const LANG_SYNTH_CODES: Record<Language, string> = {
  English: 'en-IN',
  Tamil: 'ta-IN',
  Hindi: 'hi-IN',
  Telugu: 'te-IN',
  Marathi: 'mr-IN'
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ text, language }) => {
  const t = translationsMap[language];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text: strip markdown characters for smooth speech
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/₹/g, 'Rupees ')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = LANG_SYNTH_CODES[language] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower, highly intelligible for rural audience
    utterance.pitch = 1.0;

    // Pick Indian regional voice if available
    const voices = window.speechSynthesis.getVoices();
    const regionalVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase().slice(0, 2))
    );
    if (regionalVoice) {
      utterance.voice = regionalVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!supported) return null;

  return (
    <div className="w-full bg-emerald-950/60 border border-emerald-500/40 rounded-3xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-4 text-left">
        <div className={`p-4 rounded-2xl ${isPlaying ? 'bg-emerald-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-300'}`}>
          <Volume2 className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            {t.listenAdvisory} ({language})
            {isPlaying && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                Live Voice
              </span>
            )}
          </h4>
          <p className="text-sm text-emerald-200/80">
            {isPlaying ? t.playingAudio : t.voiceReadoutTip}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {!isPlaying ? (
          <button
            onClick={handleSpeak}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer text-base"
          >
            <Play className="w-5 h-5 fill-current" />
            {isPaused ? 'Resume Audio' : t.listenAdvisory}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer text-base"
          >
            <Pause className="w-5 h-5 fill-current" />
            {t.pauseAdvisory}
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="flex items-center justify-center p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl border border-slate-600 transition-all cursor-pointer"
            title={t.stopAdvisory}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
