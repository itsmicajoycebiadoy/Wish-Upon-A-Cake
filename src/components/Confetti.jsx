import { useState } from "react";

const CONFETTI_COLORS = [
  "#ff6b9d",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#ef476f",
  "#a855f7",
  "#fff",
  "#ff9900",
];

export default function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? "rounded-full" : "rounded-sm",
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`absolute top-0 ${p.shape} animate-confettiFall`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--duration": `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

