import { useMemo } from "react";

export default function GreetingScreen() {
  const emojis = useMemo(
    () => ["🎉", "🎊", "✨", "🎁", "💫", "🎈", "🧁", "🎀", "💝", "🥳"],
    []
  );

  return (
    <div className="flex flex-col items-center gap-6 animate-popIn">
      <div className="flex gap-4 text-4xl animate-bounceSoft">
        {emojis.slice(0, 5).map((e, i) => (
          <span
            key={e + i}
            style={{ animationDelay: `${i * 0.15}s`, display: "inline-block" }}
            className="animate-bounceSoft"
          >
            {e}
          </span>
        ))}
      </div>

      <div className="text-center">
        <h1
          className="font-quicksand text-6xl md:text-8xl animate-pulse3d font-extrabold tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.95) 70%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 24px rgba(255,255,255,0.08)",
          }}
        >
          Happy Birthday, You!
        </h1>


      </div>

      <p
        className="font-quicksand font-700 text-xl md:text-2xl text-white opacity-90 animate-slideDown text-center px-4"
        style={{ animationDelay: "0.4s" }}
      >
        🎂 May your day be as magical as you are! 🎂
      </p>

      <div
        className="flex gap-4 text-3xl animate-wiggle"
        style={{ animationDelay: "0.6s" }}
      >
        {emojis.slice(5).map((e, i) => (
          <span key={e + i}>{e}</span>
        ))}
      </div>

      <div
        className="mt-2 px-8 py-3 rounded-full font-quicksand font-bold text-white text-lg animate-slideDown"
        style={{
          background: "linear-gradient(135deg,#ff6b9d,#a855f7)",
          boxShadow: "0 0 30px rgba(255,107,157,0.5)",
          animationDelay: "0.8s",
        }}
      >
        🎯 Wishing you all the love & joy! 🎯
      </div>
    </div>
  );
}

