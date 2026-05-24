import { useMemo, useState } from "react";

export default function LoginScreen({ onLogin, loading, error }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && password.length > 0 && !loading;
  }, [name, password, loading]);

  return (
    <div className="w-full flex flex-col items-center gap-5 animate-slideDown">
      <div className="text-center">
        <div className="text-white/70 text-sm tracking-widest uppercase mb-1">
          Sign in to your birthday
        </div>
        <h2
          className="font-quicksand text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, var(--accent3) 0%, var(--accent) 55%, var(--accent2) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 20px rgba(255,107,157,0.18)",
          }}
        >

          Wish Login
        </h2>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-strong)]/60 backdrop-blur-md p-5 shadow-[var(--shadow-soft)]">

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onLogin({ name: name.trim(), password });
          }}
          className="space-y-3"
        >
          <label className="block">
            <div className="text-white/70 text-xs mb-1">Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl px-3 py-2 bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-pink-300/40"
              autoComplete="off"
              disabled={loading}
            />
          </label>

          <label className="block">
            <div className="text-white/70 text-xs mb-1">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full rounded-xl px-3 py-2 bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-pink-300/40"
              autoComplete="off"
              disabled={loading}
            />
          </label>

          {error && (
            <div className="text-red-300 text-sm bg-red-900/30 border border-red-300/20 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl px-4 py-2 font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>

          <div className="text-white/50 text-xs text-center pt-1">
            If the user doesn’t exist, it will be created automatically.
          </div>
        </form>
      </div>
    </div>
  );
}

