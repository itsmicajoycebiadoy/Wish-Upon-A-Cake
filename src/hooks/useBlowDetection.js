import { useCallback, useEffect, useRef, useState } from "react";

export function useBlowDetection({
  onBlowCandle,
  startMusic,
}) {
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [permission, setPermission] = useState("idle"); 
  const [hint, setHint] = useState("");



  const startListening = useCallback(async () => {
    startMusic?.();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;

      source.connect(analyser);
      analyserRef.current = analyser;

      setPermission("granted");
      setListening(true);
      setHint("🎤 Blow into your mic to extinguish the candles!");
    } catch {
      setPermission("denied");
      setHint("🚫 Mic blocked — click each candle to blow it out!");
    }
  }, [startMusic]);

  useEffect(() => {
    if (!listening || !analyserRef.current) return;

    const analyser = analyserRef.current;
    const buf = new Uint8Array(analyser.frequencyBinCount);
    let blowFrames = 0;

    const detect = () => {
      analyser.getByteFrequencyData(buf);

      const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
      if (avg > 28) blowFrames += 1;
      else blowFrames = Math.max(0, blowFrames - 1);

      if (blowFrames > 3) {
        blowFrames = 0;
        // choose first lit candle by asking parent (via onBlowCandle)
        onBlowCandle?.();

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          // after parent updates state, it will call onAllCandlesBlown when needed
        }, 500);
      }

      rafRef.current = requestAnimationFrame(detect);
    };

    rafRef.current = requestAnimationFrame(detect);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [listening, onBlowCandle]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (ctxRef.current) {
        try {
          ctxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Click fallback handled by parent (needs candle index)

  return {
    listening,
    permission,
    hint,
    startListening,
    stopListening: () => {
      setListening(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    },
  };
}

