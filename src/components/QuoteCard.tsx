import React from 'react';
import { Quote as QuoteIcon, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
  onRefreshQuote: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onRefreshQuote,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto px-4 mt-6">
      <div className="relative rounded-2xl bg-[#0F1118] border border-slate-800/90 p-4 overflow-hidden">
        {/* Neon subtle accent bar on the left */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#00F0FF] via-[#00FF66] to-[#FF5500]" />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#00F0FF]">
            <QuoteIcon className="w-3.5 h-3.5" />
            <span>Motivación para hoy</span>
          </div>

          <button
            onClick={onRefreshQuote}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Ver otro mensaje"
            aria-label="Cambiar mensaje motivador"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="min-h-[64px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-medium text-slate-200 italic leading-relaxed">
                "{quote.text}"
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-2 text-right">
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
