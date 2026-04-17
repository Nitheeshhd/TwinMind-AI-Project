"use client";

import { useState } from "react";
import Chat from "./components/Chat";
import Suggestions from "./components/Suggestions";
import Transcript from "./components/Transcript";

export default function Home() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  // 💬 HANDLE CLICK + LOADER
  const handleSuggestionClick = async (suggestion: string) => {
    try {
      // 👉 show suggestion
      setChatMessages((prev) => [...prev, "👉 " + suggestion]);

      // ⏳ show loader
      setChatMessages((prev) => [...prev, "⏳ Thinking..."]);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: suggestion }),
      });

      const data = await res.json();

      // ❌ remove loader + add reply
      setChatMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove "Thinking..."
        return [...updated, data.reply || "No response"];
      });

    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  // 📤 EXPORT FUNCTION
  const handleExport = () => {
    const content = `
=== TRANSCRIPT & SUGGESTIONS ===
${suggestions.join("\n")}

=== CHAT ===
${chatMessages.join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "twinmind-output.txt";
    a.click();
  };

  return (
    <main className="relative min-h-screen bg-[var(--app-background)] text-[var(--text-primary)]">

      {/* 📤 EXPORT BUTTON */}
      <button
        onClick={handleExport}
        className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
      >
        Export
      </button>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr]">

        {/* 🎤 TRANSCRIPT */}
        <div className="border-b border-[var(--divider)] lg:border-b-0 lg:border-r">
          <Transcript setSuggestions={setSuggestions} />
        </div>

        {/* 💡 SUGGESTIONS */}
        <div className="border-b border-[var(--divider)] lg:border-b-0 lg:border-r">
          <Suggestions
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
          />
        </div>

        {/* 💬 CHAT */}
        <div>
          <Chat messages={chatMessages} />
        </div>

      </div>
    </main>
  );
}