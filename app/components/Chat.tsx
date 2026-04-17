"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Chat({ messages = [] }: { messages: string[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔽 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex h-full flex-col px-3 py-4">

      <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
        Chat
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">

        {/* ✨ ANIMATED CHAT */}
        {messages.map((msg, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-300 leading-relaxed 
                       bg-[var(--surface)] px-3 py-2 rounded-md 
                       shadow-[0_0_15px_rgba(59,130,246,0.05)]"
          >
            {msg}
          </motion.p>
        ))}

        {/* 👇 SCROLL TARGET */}
        <div ref={bottomRef} />

      </div>
    </section>
  );
}