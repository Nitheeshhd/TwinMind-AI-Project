"use client";

import { motion } from "framer-motion";

export default function Suggestions({
  suggestions = [],
  onSelect,
}: {
  suggestions?: string[];
  onSelect?: (s: string) => void;
}) {
  return (
    <section className="h-full px-3 py-4 sm:px-4 lg:px-3">
      
      <h2 className="mb-4 text-[1.15rem] font-semibold text-[var(--text-primary)]">
        Suggestions
      </h2>

      <div className="space-y-3">

        {/* 🟡 EMPTY STATE */}
        {suggestions.length === 0 && (
          <p className="text-sm text-gray-400">
            No suggestions yet... Speak to generate suggestions.
          </p>
        )}

        {/* ✨ ANIMATED SUGGESTIONS */}
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect && onSelect(s)}
            className="cursor-pointer rounded-md border border-white/5 bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-secondary)] 
                       hover:bg-[#28344a] transition 
                       shadow-[0_0_20px_rgba(59,130,246,0.08)] hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
          >
            {s}
          </motion.div>
        ))}

      </div>
    </section>
  );
}