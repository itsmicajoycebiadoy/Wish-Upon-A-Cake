import { useState, useRef, useCallback, useEffect } from "react";
import InstructionChatbot from "./components/InstructionChatbot.jsx";
import LoginScreen from "./components/LoginScreen.jsx";



/*CONSTANTS */
const CANDLE_COUNT = 3;


const COLORS = [
  { body: "#a855f7", stripe: "#d8b4fe" },
  { body: "#60a5fa", stripe: "#bfdbfe" },
  { body: "#f472b6", stripe: "#fbcfe8" },
];
const CONFETTI_COLORS = ["#ff6b9d","#ffd166","#06d6a0","#118ab2","#ef476f","#a855f7","#fff","#ff9900"];

/* MUSIC*/
function useBirthdayMusic() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const loopRef = useRef(null);

  const stopAll = useCallback(() => {
    nodesRef.current.forEach(n => {
      try {
        n.stop();
      } catch {
        // ignore
      }
    });
    nodesRef.current = [];
  }, []);

  const play = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    stopAll();

    const NOTE = (f, t, d, vol = 0.22) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime + t;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.04);
      gain.gain.setValueAtTime(vol, now + d - 0.05);
      gain.gain.linearRampToValueAtTime(0, now + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + d + 0.01);
      nodesRef.current.push(osc);
    };

    const HARM = (f, t, d) => NOTE(f, t, d, 0.06);
    const bpm = 100, b = 60 / bpm;
    const notes = [
      [261.63,0*b,0.4*b],[261.63,0.5*b,0.2*b],[293.66,0.75*b,1*b],
      [261.63,1.75*b,1*b],[349.23,2.75*b,1*b],[329.63,3.75*b,2*b],
      [261.63,5.75*b,0.4*b],[261.63,6.25*b,0.2*b],[293.66,6.5*b,1*b],
      [261.63,7.5*b,1*b],[392.00,8.5*b,1*b],[349.23,9.5*b,2*b],
      [261.63,11.5*b,0.4*b],[261.63,12*b,0.2*b],[523.25,12.25*b,1*b],
      [440.00,13.25*b,1*b],[349.23,14.25*b,1*b],[329.63,15.25*b,1*b],[293.66,16.25*b,2*b],
      [466.16,18.25*b,0.4*b],[466.16,18.75*b,0.2*b],[440.00,19*b,1*b],
      [349.23,20*b,1*b],[392.00,21*b,1*b],[349.23,22*b,2.5*b],
    ];
    notes.forEach(([f, t, d]) => { NOTE(f, t, d); HARM(f * 1.5, t, d); });
  }, [stopAll]);

  const startLoop = useCallback(() => {
    const bpm = 100, b = 60 / bpm;
    const totalDur = (25 * b + 0.5) * 1000;
    play();
    loopRef.current = setInterval(play, totalDur);
  }, [play]);

  const stop = useCallback(() => {
    clearInterval(loopRef.current);
    stopAll();
  }, [stopAll]);

  return { startLoop, stop };
}

/*CONFETTI*/
function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? "rounded-full" : "rounded-sm",
    }))
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div key={p.id} className={`absolute top-0 ${p.shape}`}
          style={{
            left: `${p.left}%`, width: p.size, height: p.size,
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

/*STARS*/
function Stars() {
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 1 + Math.random() * 2.5, delay: Math.random() * 4, dur: 1.5 + Math.random() * 3,
    }))
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map(s => (
        <div key={s.id} className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
            animation: `sparkle ${s.dur}s ${s.delay}s ease-in-out infinite`, opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/*CANDLE*/
function Candle({ color, isLit, blowing, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none"
      style={{ width: 28 }}
      onClick={onClick}
      title={isLit ? "Click to blow out! 🌬️" : "Already out"}
    >
      <div className="relative flex justify-center" style={{ height: 32 }}>
        {isLit ? (
          <div className={`relative flex justify-center items-end ${blowing ? "animate-floatUp" : "animate-flicker"}`}>
            <div className="flame-outer relative flex justify-center" />
            <div className="flame-inner" />
          </div>
        ) : (
          <div className="w-0.5 h-4 bg-gray-500 opacity-40 self-end" />
        )}
      </div>
      <div className="w-px h-2 bg-gray-700" />
      <div className="rounded-t-sm relative overflow-hidden"
        style={{ width: 16, height: 48, backgroundColor: color.body }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="absolute w-full"
            style={{ height: 6, top: i * 12, backgroundColor: color.stripe, opacity: 0.6 }} />
        ))}
      </div>
      <div className="rounded-b-sm"
        style={{ width: 20, height: 6, backgroundColor: color.body, opacity: 0.8 }} />
    </div>
  );
}

/* CAKE*/
function Cake({ candles, blowingIdx, onBlowCandle }) {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-end gap-3 mb-0 z-10 relative" style={{ paddingBottom: 2 }}>
        {candles.map((lit, i) => (
          <Candle
            key={i}
            color={COLORS[i]}
            isLit={lit}
            blowing={blowingIdx === i}
            onClick={() => lit && onBlowCandle(i)}
          />
        ))}
      </div>

      <div className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{ width: 280, height: 60, background: "linear-gradient(135deg,#ff8fab,#ff6b9d)", boxShadow: "0 4px 0 #d44f7a" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 2px,transparent 2px,transparent 12px)" }} />
        {[15,45,80,115,150,185,220,255].map((x,i) => (
          <div key={i} className="absolute top-0 rounded-b-full bg-white opacity-80"
            style={{ left: x, width: 18, height: 10 + (i%3)*5 }} />
        ))}
      </div>

      <div className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{ width: 300, height: 70, background: "linear-gradient(135deg,#ffd166,#ffb703)", boxShadow: "0 4px 0 #c88b00", marginTop: -4 }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg,#fff 0,#fff 2px,transparent 2px,transparent 14px)" }} />
        {[20,60,100,140,180,220,260].map((x,i) => (
          <div key={i} className="absolute top-0 rounded-b-full bg-white opacity-70"
            style={{ left: x, width: 20, height: 8 + (i%4)*4 }} />
        ))}
      </div>

      <div className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{ width: 330, height: 80, background: "linear-gradient(135deg,#06d6a0,#02a87a)", boxShadow: "0 6px 0 #017a59", marginTop: -4 }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(30deg,#fff 0,#fff 2px,transparent 2px,transparent 16px)" }} />
        {[10,55,100,145,190,235,280,315].map((x,i) => (
          <div key={i} className="absolute top-0 rounded-b-full bg-white opacity-70"
            style={{ left: x, width: 22, height: 10 + (i%3)*6 }} />
        ))}
      </div>

      <div className="rounded-full" style={{
        width: 360, height: 20, marginTop: -4,
        background: "linear-gradient(180deg,#e0e0e0,#bdbdbd)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      }} />
    </div>
  );
}

/*GREETING SCREEN*/
function GreetingScreen({ userName = "" }) {
  const celebrant = (userName || "").trim() || "You";

  const emojis = [];
  return (
    <div className="flex flex-col items-center gap-6 animate-popIn">


      <div className="flex gap-4 text-4xl animate-bounceSoft">
        {emojis.slice(0,5).map((e,i) => (
          <span key={i} style={{ animationDelay: `${i*0.15}s`, display:"inline-block" }}
            className="animate-bounceSoft">{e}</span>
        ))}
      </div>
      <div className="text-center">
          <h1 className="font-pacifico text-5xl md:text-7xl animate-pulse3d"
          style={{ color: "#ff6b9d", textShadow: "0 0 30px #ff69b4, 0 0 60px #ff1493" }}>
          Happy Birthday, {celebrant}!
        </h1>


      </div>
      <p className="font-quicksand font-bold text-xl md:text-2xl text-white opacity-90 animate-slideDown text-center px-4"
        style={{ animationDelay: "0.4s" }}>
        May your day be as magical as you are! 
      </p>
    </div>
  );
}

/*MAIN APP*/
export default function App() {
  const [candles, setCandles] = useState(Array(CANDLE_COUNT).fill(true));
  const [playerName, setPlayerName] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [blowingIdx, setBlowingIdx] = useState(null);
  const [allBlown, setAllBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const blowTimeoutRef = useRef(null);

  const { startLoop, stop: stopMusic } = useBirthdayMusic();

  const startMusic = useCallback(() => {
    if (!musicStarted) { startLoop(); setMusicStarted(true); }
  }, [musicStarted, startLoop]);

  const blowCandle = useCallback((i) => {
    startMusic();
    if (!candles[i] || blowingIdx !== null) return;
    setBlowingIdx(i);
    clearTimeout(blowTimeoutRef.current);
    blowTimeoutRef.current = setTimeout(() => {
      setCandles(prev => {
        const next = [...prev];
        next[i] = false;
        if (next.every(c => !c)) {
          setAllBlown(true);
          setShowConfetti(true);
          stopMusic();
          setTimeout(startLoop, 600);
        }
        return next;
      });
      setBlowingIdx(null);
    }, 500);
  }, [candles, blowingIdx, startMusic, stopMusic, startLoop]);

  useEffect(() => () => clearTimeout(blowTimeoutRef.current), []);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(168,85,247,0.35) 0%, rgba(30,64,175,0.25) 35%, rgba(9,9,33,1) 100%)",
      }}>
      <Stars />
      {showConfetti && <Confetti />}

      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% 70%, rgba(255,107,157,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        {!playerName ? (
          <LoginScreen

            onLogin={async ({ name, password }) => {
              try {
                setIsLoggingIn(true);
                setLoginError("");

                const payload = {
                  name: name.trim(),
                  password,
                };

                // Local multi-user “login” stored in browser
                // (no server / no API calls)
                const key = "birthday_users_v1";
                const raw = window.localStorage.getItem(key);
                const users = raw ? JSON.parse(raw) : [];

                const existing = users.find(
                  (u) => String(u.name).toLowerCase() === String(payload.name).toLowerCase()
                );

                if (existing) {
                  if (existing.password !== payload.password) {
                    setLoginError("Incorrect password.");
                    return;
                  }
                } else {
                  users.push({ name: payload.name, password: payload.password });
                  window.localStorage.setItem(key, JSON.stringify(users));
                }

                setPlayerName(payload.name);
                window.localStorage.setItem("birthday_last_user_v1", payload.name);
              } catch {
                setLoginError("Could not log in. Storage may be blocked.");
              } finally {
                setIsLoggingIn(false);
              }
            }}
            loading={isLoggingIn}
            error={loginError}
          />
        ) : !allBlown ? (

          <>
            <div className="text-center animate-slideDown">
              <p className="font-quicksand text-white/60 text-sm tracking-widest uppercase mb-1">
                Wish Mode
              </p>
              <h2 className="font-pacifico text-3xl md:text-4xl" style={{ color: "#ffd166" }}>
                Make your wish ✨
              </h2>
            </div>


            <div className="relative">
              <div
                className="absolute -inset-8 rounded-full opacity-20 blur-3xl"
                style={{
                  background: "radial-gradient(circle, #ff6b9d, #ffd166, transparent)",
                }}
              />
              <Cake candles={candles} blowingIdx={blowingIdx} onBlowCandle={blowCandle} />
            </div>
          </>
        ) : (
          <GreetingScreen userName={playerName} />
        )}


      </div>

      <InstructionChatbot />

      <button
        onClick={() => {
          // ▶️ should play, ⏹ should stop
          if (musicStarted) {
            stopMusic();
            setMusicStarted(false);
          } else {
            startLoop();
            setMusicStarted(true);
          }
        }}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center text-lg bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 shadow-[0_0_24px_rgba(168,85,247,0.35)]"
        title={musicStarted ? "Stop music" : "Play music"}
        aria-label={musicStarted ? "Stop music" : "Play music"}
      >
        {musicStarted ? "⏹️" : "▶️"}
      </button>
    </div>
  );
}