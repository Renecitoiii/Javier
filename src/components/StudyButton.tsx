import React from 'react';
import { CheckCircle2, Zap, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface StudyButtonProps {
  isStudiedToday: boolean;
  onStudyClick: () => void;
  onUndoClick: () => void;
}

export const StudyButton: React.FC<StudyButtonProps> = ({
  isStudiedToday,
  onStudyClick,
  onUndoClick,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto px-4 flex flex-col items-center">
      {!isStudiedToday ? (
        <motion.button
          onClick={onStudyClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="relative w-full py-5 px-6 rounded-2xl font-black text-lg sm:text-xl tracking-wider uppercase text-black bg-[#00FF66] hover:bg-[#33ff85] active:bg-[#00e65c] transition-all cursor-pointer shadow-lg neon-glow-green flex items-center justify-center gap-3 overflow-hidden group"
        >
          {/* Subtle animated neon sheen highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <Zap className="w-6 h-6 fill-black text-black animate-pulse" />
          <span>Hoy sí estudié</span>
        </motion.button>
      ) : (
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg tracking-wide uppercase bg-[#00FF66]/10 border-2 border-[#00FF66] text-[#00FF66] flex items-center justify-center gap-3 shadow-inner">
            <CheckCircle2 className="w-6 h-6 text-[#00FF66]" />
            <span>¡Hoy sí estudiaste!</span>
          </div>

          <button
            onClick={onUndoClick}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 py-1 px-3 transition-colors cursor-pointer"
            title="Desmarcar día de hoy"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Deshacer registro de hoy</span>
          </button>
        </div>
      )}
    </div>
  );
};
