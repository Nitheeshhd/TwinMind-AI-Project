"use client";
import { useRef, useState } from "react";

export default function Transcript({ setSuggestions }: any) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // 🎤 START RECORDING
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  // 🛑 STOP RECORDING
  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      try {
        const audioBlob = new Blob(audioChunks.current, {
          type: "audio/webm",
        });

        const file = new File([audioBlob], "recording.webm", {
          type: "audio/webm",
        });

        const formData = new FormData();
        formData.append("file", file);

        // 🎧 TRANSCRIBE
        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!data.text) return;

        setTranscript((prev) => {
          const updated = [...prev, data.text];

          fetch("/api/suggest", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transcript: updated.join(" "),
            }),
          })
            .then((res) => res.json())
            .then((data2) => {
              setSuggestions(data2.suggestions || []);
            })
            .catch((err) => console.error(err));

          return updated;
        });

      } catch (err) {
        console.error("Recording error:", err);
      }
    };

    setRecording(false);
  };

  return (
    <section className="flex h-full min-h-[24rem] flex-col px-3 py-4 sm:px-4 lg:px-3">

      {/* 🎤 BUTTONS + MIC ANIMATION */}
      <div className="flex items-center gap-3 mb-3">

        {/* START BUTTON */}
        <button
          onClick={startRecording}
          className={`relative px-4 py-2 rounded-md text-sm font-medium transition
            ${
              recording
                ? "bg-green-500 shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          🎤 Start
        </button>

        {/* STOP BUTTON */}
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-600 rounded-md text-sm hover:bg-red-700 transition"
        >
          Stop
        </button>

        {/* 🔴 LIVE MIC INDICATOR */}
        {recording && (
          <div className="flex items-center gap-2 ml-2">

            {/* Pulsing dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>

            {/* Listening text */}
            <span className="text-sm text-red-400 animate-pulse">
              Listening...
            </span>

          </div>
        )}
      </div>

      {/* 📜 TRANSCRIPT */}
      <div className="h-[60vh] min-h-[22rem] rounded-md border border-white/5 bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-secondary)] overflow-y-auto shadow-[0_0_20px_rgba(59,130,246,0.05)]">
        <div className="space-y-2">
          {transcript.map((line, index) => (
            <p key={index} className="text-gray-300">
              {line}
            </p>
          ))}

          {recording && (
            <p className="text-green-400 animate-pulse">Recording...</p>
          )}
        </div>
      </div>

    </section>
  );
}