import { useCallback, useRef } from "react";

export function useBirthdayMusic() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);

  const stopAll = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try {
        n.stop();
      } catch {
        // ignore stop errors
      }
    });
    nodesRef.current = [];
  }, []);

  const playOnce = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

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

    const bpm = 100;
    const b = 60 / bpm;

    const notes = [
      // "Happy Birthday to you"
      [261.63, 0 * b, 0.4 * b],
      [261.63, 0.5 * b, 0.2 * b],
      [293.66, 0.75 * b, 1 * b],
      [261.63, 1.75 * b, 1 * b],
      [349.23, 2.75 * b, 1 * b],
      [329.63, 3.75 * b, 2 * b],

      // "Happy Birthday to you"
      [261.63, 5.75 * b, 0.4 * b],
      [261.63, 6.25 * b, 0.2 * b],
      [293.66, 6.5 * b, 1 * b],
      [261.63, 7.5 * b, 1 * b],
      [392.0, 8.5 * b, 1 * b],
      [349.23, 9.5 * b, 2 * b],

      // "Happy Birthday dear friend"
      [261.63, 11.5 * b, 0.4 * b],
      [261.63, 12 * b, 0.2 * b],
      [523.25, 12.25 * b, 1 * b],
      [440.0, 13.25 * b, 1 * b],
      [349.23, 14.25 * b, 1 * b],
      [329.63, 15.25 * b, 1 * b],
      [293.66, 16.25 * b, 2 * b],

      // "Happy Birthday to you"
      [466.16, 18.25 * b, 0.4 * b],
      [466.16, 18.75 * b, 0.2 * b],
      [440.0, 19 * b, 1 * b],
      [349.23, 20 * b, 1 * b],
      [392.0, 21 * b, 1 * b],
      [349.23, 22 * b, 2.5 * b],
    ];

    notes.forEach(([f, t, d]) => {
      NOTE(f, t, d);
      HARM(f * 1.5, t, d);
    });
  }, [stopAll]);

  const loopRef = useRef(null);

  const startLoop = useCallback(() => {
    const bpm = 100;
    const b = 60 / bpm;
    const totalDurMs = (25 * b + 0.5) * 1000;

    playOnce();

    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = setInterval(playOnce, totalDurMs);
  }, [playOnce]);

  const stop = useCallback(() => {
    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = null;
    stopAll();
  }, [stopAll]);

  return { startLoop, stop };
}

