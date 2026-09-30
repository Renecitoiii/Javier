import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Smartphone, 
  Code2, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  Check, 
  HelpCircle,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { StreakCounter } from './components/StreakCounter';
import { StudyButton } from './components/StudyButton';
import { SevenDaysList } from './components/SevenDaysList';
import { QuoteCard } from './components/QuoteCard';
import { AndroidKotlinSource } from './components/AndroidKotlinSource';
import { Quote } from './types';
import { 
  getTodayDateString, 
  calculateConsecutiveStreak, 
  calculateAllTimeBestStreak, 
  getLast7Days,
  formatDateToISO
} from './utils/streak';
import { getRandomQuote } from './utils/quotes';
import { sound } from './utils/sound';

const STORAGE_KEY = 'racha_study_dates_v1';

export default function App() {
  // Load saved dates from localStorage (100% offline)
  const [completedDates, setCompletedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore parse error
    }
    return [];
  });

  const [currentQuote, setCurrentQuote] = useState<Quote>(() => getRandomQuote());
  const [activeTab, setActiveTab] = useState<'app' | 'code'>('app');
  const [phoneFrame, setPhoneFrame] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDates));
    } catch {
      // Storage unavailable
    }
  }, [completedDates]);

  // Calculations
  const { currentStreak, isStudiedToday } = useMemo(() => {
    return calculateConsecutiveStreak(completedDates);
  }, [completedDates]);

  const bestStreak = useMemo(() => {
    const historical = calculateAllTimeBestStreak(completedDates);
    return Math.max(historical, currentStreak);
  }, [completedDates, currentStreak]);

  const last7Days = useMemo(() => {
    return getLast7Days(completedDates);
  }, [completedDates]);

  // Confetti trigger
  const launchCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#00FF66', '#00F0FF', '#FF5500', '#FFDD00', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    } catch {
      // Silently ignore if canvas unsupported
    }
  }, []);

  // Handlers
  const handleStudyToday = () => {
    const todayStr = getTodayDateString();
    if (!completedDates.includes(todayStr)) {
      setCompletedDates((prev) => [...prev, todayStr]);
    }
    sound.playSuccessChime();
    sound.triggerHaptic();
    launchCelebration();
    setCurrentQuote(getRandomQuote(currentQuote.id));
  };

  const handleUndoToday = () => {
    const todayStr = getTodayDateString();
    setCompletedDates((prev) => prev.filter((d) => d !== todayStr));
    sound.playTapSound();
    sound.triggerHaptic();
  };

  const handleTogglePastDay = (dateStr: string) => {
    sound.playTapSound();
    sound.triggerHaptic();
    setCompletedDates((prev) => {
      if (prev.includes(dateStr)) {
        return prev.filter((d) => d !== dateStr);
      } else {
        return [...prev, dateStr];
      }
    });
  };

  const handleRefreshQuote = () => {
    sound.playTapSound();
    setCurrentQuote(getRandomQuote(currentQuote.id));
  };

  // Demo helper: Seed 5 consecutive days to test streak visualization
  const handleDemoSeed = (days: number) => {
    sound.playSuccessChime();
    const newDates: string[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      newDates.push(formatDateToISO(d));
    }
    setCompletedDates(newDates);
    launchCelebration();
  };

  const handleResetData = () => {
    if (window.confirm('¿Seguro que querés reiniciar el contador de racha a 0?')) {
      setCompletedDates([]);
      sound.playTapSound();
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 flex flex-col font-sans selection:bg-[#00FF66] selection:text-black">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0C13]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse" />
              <h1 className="text-xl font-black tracking-widest text-white">RACHA</h1>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500">
              Días consecutivos de estudio
            </span>
          </div>

          {/* Tab Switcher & Quick Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Switcher: App vs Android Code */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('app')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'app'
                    ? 'bg-[#00FF66] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">App</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-[#00FF66] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Kotlin Compose</span>
              </button>
            </div>

            {/* Toggle phone frame on desktop */}
            {activeTab === 'app' && (
              <button
                onClick={() => setPhoneFrame(!phoneFrame)}
                className="hidden md:flex items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={phoneFrame ? 'Expandir vista completa' : 'Ver marco de teléfono Android'}
              >
                {phoneFrame ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => setShowInfoModal(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Información y ayuda"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6">
        {activeTab === 'code' ? (
          <AndroidKotlinSource />
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Phone Container Mockup on Desktop (responsive) */}
            <div
              className={`w-full transition-all duration-300 ${
                phoneFrame
                  ? 'max-w-[420px] rounded-[42px] border-[6px] border-slate-800/90 shadow-2xl bg-[#090A10] overflow-hidden my-2 relative pb-4'
                  : 'max-w-md w-full bg-[#090A10] rounded-2xl border border-slate-800/60 pb-6 my-2'
              }`}
            >
              {/* Android Mock Status Bar */}
              {phoneFrame && (
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono-numbers text-slate-400 select-none">
                  <span>
                    {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-800 mx-auto" />
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-bold text-[#00FF66]">OFFLINE</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {/* App Brand Header inside the single screen */}
              <div className="px-6 pt-3 pb-1 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-widest text-white leading-tight">
                    RACHA
                  </h2>
                  <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                    Modo Oscuro · Neón
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-[#00FF66] bg-[#00FF66]/10 px-2.5 py-1 rounded-full border border-[#00FF66]/20">
                  <ShieldCheck className="w-3 h-3 text-[#00FF66]" />
                  <span>Sin internet</span>
                </div>
              </div>

              {/* Screen Content: Single Screen as requested */}
              <div className="space-y-1">
                {/* 1. Big Consecutive Days Counter */}
                <StreakCounter
                  currentStreak={currentStreak}
                  bestStreak={bestStreak}
                  totalDays={completedDates.length}
                  isStudiedToday={isStudiedToday}
                />

                {/* 2. Main Button: "Hoy sí estudié" */}
                <StudyButton
                  isStudiedToday={isStudiedToday}
                  onStudyClick={handleStudyToday}
                  onUndoClick={handleUndoToday}
                />

                {/* 3. List of the Last Seven Days */}
                <SevenDaysList
                  days={last7Days}
                  onToggleDay={handleTogglePastDay}
                />

                {/* 4. Motivational Message (changes each time) */}
                <QuoteCard
                  quote={currentQuote}
                  onRefreshQuote={handleRefreshQuote}
                />
              </div>

              {/* Bottom Android Pill Bar */}
              {phoneFrame && (
                <div className="pt-6 pb-1 flex justify-center">
                  <div className="w-32 h-1 bg-slate-800 rounded-full" />
                </div>
              )}
            </div>

            {/* Quick Testing & Data controls toolbar */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500 max-w-sm">
              <button
                onClick={() => handleDemoSeed(5)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Cargar 5 días seguidos para probar"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Simular racha 5 días</span>
              </button>

              <button
                onClick={handleResetData}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Reiniciar todos los datos a 0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar racha</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#10121B] border border-slate-800 rounded-2xl max-w-md w-full p-6 text-slate-300 relative shadow-2xl">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-[#00FF66]" />
              <span>Acerca de RACHA</span>
            </h3>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-400">
              <p>
                <strong className="text-white">RACHA</strong> es tu compañero diario de estudio minimalista diseñado para mantenerte enfocado y constante.
              </p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong className="text-slate-200">100% Offline:</strong> No requiere internet ni sincronización remota. Tus fechas quedan guardadas exclusivamente en la memoria local de tu dispositivo.</li>
                <li><strong className="text-slate-200">Cero Anuncios:</strong> Sin interrupciones, banners ni publicidad.</li>
                <li><strong className="text-slate-200">Modo Oscuro Neón:</strong> Colores de alto contraste pensados para estudiar de noche o en sesiones largas sin fatiga visual.</li>
                <li><strong className="text-slate-200">Código Android Kotlin:</strong> Podés ver y copiar el código completo listo para compilar con Jetpack Compose en la pestaña superior.</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-[#00FF66] hover:bg-[#33ff85] text-black font-bold text-xs rounded-xl cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-3 text-center text-[11px] text-slate-600 border-t border-slate-900">
        <span>RACHA · Tu racha de estudio diaria · 100% Privado y Offline</span>
      </footer>
    </div>
  );
}
