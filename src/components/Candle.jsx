export default function Candle({ color, isLit, blowing }) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ width: 28, userSelect: "none" }}
    >
      <div className="relative flex justify-center" style={{ height: 32 }}>
        {isLit ? (
          <div
            className={`relative flex justify-center items-end ${
              blowing ? "animate-floatUp" : "animate-flicker"
            }`}
          >
            <div className="flame-outer relative flex justify-center" />
            <div className="flame-inner" />
          </div>
        ) : (
          <div className="w-0.5 h-4 bg-gray-500 opacity-40 self-end" />
        )}
      </div>

      <div className="w-px h-2 bg-gray-700" />

      <div
        className="rounded-t-sm relative overflow-hidden"
        style={{ width: 16, height: 48, backgroundColor: color.body }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: 6,
              top: i * 12,
              backgroundColor: color.stripe,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div
        className="rounded-b-sm"
        style={{ width: 20, height: 6, backgroundColor: color.body, opacity: 0.8 }}
      />
    </div>
  );
}


