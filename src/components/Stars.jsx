import { useState } from "react";

export default function Stars({ count = 80 }) {
  const [stars] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 4,
      dur: 1.5 + Math.random() * 3,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `sparkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

