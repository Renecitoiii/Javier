import React from 'react';
import { Flame, Trophy, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
  totalDays: number;
  isStudiedToday: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  currentStreak,
  bestStreak,
  totalDays,
  isStudiedToday,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-6 px-4">
      {/* Background ambient neon glow behind the counter */}
      <div 
        className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          currentStreak > 0
            ? isStudiedToday
              ? 'bg-[#00FF66]/20'
              : 'bg-[#FF5500]/20'
            : 'bg-white/5'
        }`}
      />

      {/* Flame Icon with neon pulse */}
      <div className="relative mb-2">
        <motion.div
          animate={
            currentStreak > 0
              ? {
                  scale: [1, 1.08, 1],
                  filter: [
                    'drop-shadow(0 0 12px rgba(255, 85, 0, 0.7))',
                    'drop-shadow(0 0 24px rgba(255, 120, 0, 0.95))',
                    'drop-shadow(0 0 12px rgba(255, 85, 0, 0.7))',
                  ],
                }
              : { scale: 1 }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex items-center justify-center"
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
              currentStreak > 0
                ? 'bg-gradient-to-tr from-[#FF3300]/20 to-[#FF7700]/30 border border-[#FF5500]/50 text-[#FF6600]'
                : 'bg-slate-900 border border-slate-800 text-slate-600'
            }`}
          >
            <Flame
              className={`w-9 h-9 transition-colors duration-500 ${
                currentStreak > 0 ? 'text-[#FF5500] fill-[#FF5500]/30' : 'text-slate-600'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Main Massive Number */}
      <div className="relative my-1">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentStreak}
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.15, opacity: 0, y: -15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex items-baseline justify-center"
          >
            <span
              className={`font-mono-numbers text-8xl sm:text-9xl font-black tracking-tighter leading-none select-none ${
                currentStreak > 0
                  ? isStudiedToday
                    ? 'text-[#00FF66] neon-text-glow-green'
                    : 'text-[#FF6600] neon-text-glow-orange'
                  : 'text-slate-600'
              }`}
            >
              {currentStreak}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center">
        <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-slate-400">
          {currentStreak === 1 ? 'DÍA CONSECUTIVO' : 'DÍAS CONSECUTIVOS'}
        </h2>
        <span
          className={`text-xs font-semibold tracking-wider uppercase mt-1 transition-colors ${
            isStudiedToday
              ? 'text-[#00FF66]'
              : currentStreak > 0
              ? 'text-amber-400'
              : 'text-slate-500'
          }`}
        >
          {isStudiedToday
            ? '🔥 Racha activa hoy'
            : currentStreak > 0
            ? '⚡ ¡Estudiá hoy para mantener la racha!'
            : 'Comenzá tu racha hoy'}
        </span>
      </div>

      {/* Metadata stats bar (clean, non-pill, typographic separators) */}
      <div className="mt-5 flex items-center justify-center gap-4 text-xs font-medium text-slate-400 border-t border-slate-800/80 pt-3 w-full max-w-xs">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Récord: <strong className="text-white font-mono-numbers">{bestStreak}</strong> {bestStreak === 1 ? 'día' : 'días'}</span>
        </div>
        <span className="text-slate-700" aria-hidden="true">·</span>
        <div className="flex items-center gap-1.5">
          <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Total: <strong className="text-white font-mono-numbers">{totalDays}</strong> {totalDays === 1 ? 'día' : 'días'}</span>
        </div>
      </div>
    </div>
  );
};
