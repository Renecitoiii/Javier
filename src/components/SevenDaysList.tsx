import React from 'react';
import { Check, Flame } from 'lucide-react';
import { DayHistoryItem } from '../types';

interface SevenDaysListProps {
  days: DayHistoryItem[];
  onToggleDay: (dateString: string) => void;
}

export const SevenDaysList: React.FC<SevenDaysListProps> = ({
  days,
  onToggleDay,
}) => {
  const completedCount = days.filter((d) => d.isCompleted).length;

  return (
    <div className="w-full max-w-sm mx-auto px-4 mt-6">
      <div className="flex items-center justify-between mb-3 text-xs tracking-wider uppercase font-bold text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Flame className="w-3.5 h-3.5 text-[#00FF66]" />
          <span>Últimos 7 días</span>
        </span>
        <span className="font-mono-numbers text-slate-400">
          <strong className="text-[#00FF66]">{completedCount}</strong> de 7 cumplidos
        </span>
      </div>

      {/* Horizontal 7-day strip */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((item) => {
          return (
            <button
              key={item.dateString}
              onClick={() => onToggleDay(item.dateString)}
              className={`flex flex-col items-center justify-between py-2.5 px-1 rounded-xl transition-all cursor-pointer relative ${
                item.isToday
                  ? item.isCompleted
                    ? 'bg-[#00FF66]/15 border-2 border-[#00FF66] text-white shadow-sm'
                    : 'bg-slate-900 border-2 border-dashed border-[#00FF66]/60 text-slate-200'
                  : item.isCompleted
                  ? 'bg-slate-800/90 border border-[#00FF66]/40 text-white'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
              title={`${item.dayName} ${item.dayNumber} ${item.monthName} - ${
                item.isCompleted ? 'Estudiado (clic para alternar)' : 'No registrado (clic para marcar)'
              }`}
            >
              {/* Day Name */}
              <span className="text-[10px] font-bold tracking-tight text-slate-400 uppercase">
                {item.dayName}
              </span>

              {/* Status Circle / Check */}
              <div
                className={`my-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  item.isCompleted
                    ? 'bg-[#00FF66] text-black neon-glow-green-sm'
                    : item.isToday
                    ? 'border-2 border-amber-400/80 text-amber-400 animate-pulse'
                    : 'bg-slate-900 text-slate-600 border border-slate-800'
                }`}
              >
                {item.isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : item.isToday ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                ) : (
                  <span className="text-[10px] font-mono-numbers opacity-40">-</span>
                )}
              </div>

              {/* Day Number */}
              <span
                className={`text-xs font-mono-numbers font-semibold ${
                  item.isCompleted
                    ? 'text-white'
                    : item.isToday
                    ? 'text-[#00FF66] font-bold'
                    : 'text-slate-500'
                }`}
              >
                {item.dayNumber}
              </span>

              {/* 'HOY' badge */}
              {item.isToday && (
                <span className="absolute -top-1.5 px-1 py-0.2 bg-[#00FF66] text-black text-[8px] font-black uppercase rounded tracking-tighter">
                  Hoy
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-center text-slate-600 mt-2">
        Tocá cualquier día para marcar o desmarcar si lo necesitás.
      </p>
    </div>
  );
};
