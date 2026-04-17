# 🎤 TwinMind AI – Real-Time Meeting Assistant

TwinMind AI is a real-time voice-powered assistant that listens to conversations, generates intelligent suggestions, and provides contextual AI responses instantly.

---

## 🚀 Live Features

- 🎤 **Voice Recording** – Capture real-time audio input
- 🧠 **Speech-to-Text** – Convert audio using Groq (Whisper)
- 💡 **Smart Suggestions** – AI-generated actionable ideas
- 💬 **AI Chat Assistant** – Get detailed responses instantly
- ✨ **Animated UI** – Smooth UX using Framer Motion
- 📤 **Export Feature** – Download transcript + chat

---

## 🧠 How It Works

1. User speaks via microphone 🎤  
2. Audio is converted to text (Whisper)  
3. Transcript is sent to AI model  
4. AI generates suggestions 💡  
5. User clicks suggestion → AI responds 💬  

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **AI APIs:** Groq (Whisper + LLM)
- **Language:** TypeScript

---

## 📂 Project Structure

``` id="structure"
app/
 ├── api/
 │    ├── transcribe/   # Speech-to-text
 │    ├── suggest/      # AI suggestions
 │    └── chat/         # AI responses
 │
 ├── components/
 │    ├── Transcript.tsx
 │    ├── Suggestions.tsx
 │    └── Chat.tsx
 │
 └── page.tsx
 video deploy link:|
 https://drive.google.com/file/d/1Kx-y-SkO799yDZRzh3QUgm8jYvKuCK5P/view?usp=drive_link

like:https://twin-mind-ai-project.vercel.app/
