import { useEffect, useMemo, useRef, useState } from "react";

function formatAssistant(text) {
  // Minimal formatting: keep newlines.
  return text;
}

export default function InstructionChatbot() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState(() => [
    {
      id: "m0",
      role: "assistant",
      text:
        "Hi! I can teach you how to use this birthday app.\n\nTry asking: \"How do I blow out the candles?\" or \"How do I get the Happy Birthday message?\"",
    },
  ]);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef(null);

  const quickReplies = useMemo(
    () => [
      "How do I blow out the candles?",
      "How do I get the Happy Birthday Greetings?",
      "Do I need a microphone?",
      "What does the music button do?",
    ],
    []
  );

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking]);

  const getAnswer = (q) => {
    const s = (q || "").toLowerCase();

    if (s.includes("blow") || s.includes("candle") || s.includes("extinguish")) {
      return [
        "To extinguish a candle:",
        "• Click the candle BODY area (not just the flame).",
        "• Do it one by one.",
        "When you click a lit candle, its flame goes off.",
      ].join("\n");
    }

    if (s.includes("happy") || s.includes("greeting") || s.includes("message") || s.includes("appear")) {
      return [
        "The “Happy Birthday Greetings” screen appears after you extinguish ALL candles.",
        "Once the last candle is out, the greeting will show automatically.",
      ].join("\n");
    }

    if (s.includes("microphone") || s.includes("mic") || s.includes("sound") || s.includes("audio")) {
      return [
        "You do NOT need a microphone for this version.",
        "Use the candle click/tap to blow them out.",
      ].join("\n");
    }

    if (s.includes("music") || s.includes("soundtrack") || s.includes("button")) {
      return [
        "Music is generated automatically using the browser’s Web Audio API.",
        "• Use the 🔊/🔇 button in the bottom-right to play/stop the music.",
        "• The music stops when the greeting screen appears.",
      ].join("\n");
    }

    if (s.includes("help") || s.includes("instructions") || s.includes("how do i")) {
      return [
        "Quick guide:",
        "1) Click each lit candle body to blow it out.",
        "2) After the last candle is out, “Happy Birthday Greetings” appears.",
        "3) Music can be played/stopped using the button.",
      ].join("\n");
    }

    return [
      "I can help with usage instructions.",
      "Ask things like:",
      "• “How do I blow out the candles?”",
      "• “How do I get the Happy Birthday message?”",
      "• “Do I need a microphone?”",
    ].join("\n");
  };

  const idCounterRef = useRef(1);

  const send = (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed || thinking) return;

    const userId = `u-${idCounterRef.current++}`;
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text: trimmed },
    ]);
    setInput("");
    setThinking(true);

    // Simulated assistant delay.
    window.setTimeout(() => {
      const answer = getAnswer(trimmed);
      const assistantId = `a-${idCounterRef.current++}`;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", text: formatAssistant(answer) },
      ]);
      setThinking(false);
    }, 450);
  };

  return (
    <div
      className="fixed left-4 bottom-4 z-[60]"
      style={{ maxWidth: 360 }}
      aria-label="Instruction chatbot"
    >
{open && (
        <div className="rounded-2xl shadow-2xl border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                🤖
              </div>
              <div>
                <div className="text-white font-quicksand font-bold leading-tight">
                  Birthday Helper
                </div>
                <div className="text-white/60 text-xs leading-tight">Ask for instructions</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white px-2 py-1"
              aria-label="Close chatbot"
              title="Close"
            >
              ✕
            </button>
          </div>

          <div
            ref={listRef}
            className="px-4 py-3 h-64 overflow-auto space-y-3"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "bg-white/10 border border-white/15 text-white rounded-2xl px-3 py-2 max-w-[80%]"
                      : "bg-white/5 border border-white/10 text-white rounded-2xl px-3 py-2 max-w-[80%]"
                  }
                  style={{ whiteSpace: "pre-wrap", lineHeight: 1.25 }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-white rounded-2xl px-3 py-2">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="px-4 pb-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => send(t)}
                  className="text-xs text-white/80 hover:text-white border border-white/15 bg-white/5 rounded-full px-3 py-1"
                >
                  {t}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-xl px-3 py-2 bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                className="rounded-xl px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-2xl shadow-2xl border border-white/10 bg-black/60 backdrop-blur-md px-4 py-3 text-white/90 hover:text-white flex items-center gap-2"
        >
          <span>🤖</span>
          <span className="font-quicksand font-bold">Helper</span>
        </button>
      )}
    </div>
  );
}

