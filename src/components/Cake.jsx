import Candle from "./Candle";

const COLORS = [
  { body: "#ff6b9d", stripe: "#ff9ec4" },
  { body: "#ffd166", stripe: "#ffe599" },
  { body: "#06d6a0", stripe: "#7effd9" },
  { body: "#118ab2", stripe: "#5ac8f5" },
  { body: "#ef476f", stripe: "#ff8fab" },
  { body: "#a855f7", stripe: "#d8b4fe" },
];

export default function Cake({ candles, blowingIdx }) {
  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="flex items-end gap-3 mb-0 z-10 relative"
        style={{ paddingBottom: 2 }}
      >
        {candles.map((lit, i) => (
          <Candle
            key={i}
            color={COLORS[i]}
            isLit={lit}
            blowing={blowingIdx === i}
          />
        ))}
      </div>

      <div
        className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          width: 280,
          height: 60,
          background: "linear-gradient(135deg,#ff8fab,#ff6b9d)",
          boxShadow: "0 4px 0 #d44f7a",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0,#fff 2px,transparent 2px,transparent 12px)",
          }}
        />

        {[15, 45, 80, 115, 150, 185, 220, 255].map((x, i) => (
          <div
            key={i}
            className="absolute top-0 rounded-b-full bg-white opacity-80"
            style={{ left: x, width: 18, height: 10 + (i % 3) * 5 }}
          />
        ))}

        <span className="font-quicksand font-bold text-white text-sm tracking-wider z-10 drop-shadow">
          Happy Birthday
        </span>
      </div>

      <div
        className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          width: 300,
          height: 70,
          background: "linear-gradient(135deg,#ffd166,#ffb703)",
          boxShadow: "0 4px 0 #c88b00",
          marginTop: -4,
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg,#fff 0,#fff 2px,transparent 2px,transparent 14px)",
          }}
        />

        {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
          <div
            key={i}
            className="absolute top-0 rounded-b-full bg-white opacity-70"
            style={{ left: x, width: 20, height: 8 + (i % 4) * 4 }}
          />
        ))}

        <div className="flex gap-3 z-10">
          {["🎸", "⭐", "🎸", "⭐", "🎸"].map((e, i) => (
            <span key={i} className="text-lg">
              {e}
            </span>
          ))}
        </div>
      </div>

      <div
        className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          width: 330,
          height: 80,
          background: "linear-gradient(135deg,#06d6a0,#02a87a)",
          boxShadow: "0 6px 0 #017a59",
          marginTop: -4,
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(30deg,#fff 0,#fff 2px,transparent 2px,transparent 16px)",
          }}
        />

        {[10, 55, 100, 145, 190, 235, 280, 315].map((x, i) => (
          <div
            key={i}
            className="absolute top-0 rounded-b-full bg-white opacity-70"
            style={{ left: x, width: 22, height: 10 + (i % 3) * 6 }}
          />
        ))}

        <div className="flex gap-2 z-10">
          {["💖", "🎵", "🎉", "🎊", "🎵", "💖"].map((e, i) => (
            <span key={i} className="text-xl">
              {e}
            </span>
          ))}
        </div>
      </div>

      <div
        className="rounded-full"
        style={{
          width: 360,
          height: 20,
          marginTop: -4,
          background: "linear-gradient(180deg,#e0e0e0,#bdbdbd)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}

