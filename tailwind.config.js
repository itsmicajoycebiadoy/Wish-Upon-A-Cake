/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["'Pacifico'", "cursive"],
        quicksand: ["'Quicksand'", "sans-serif"],
      },
      keyframes: {
        flicker: {
          "0%,100%": { transform: "scaleY(1) scaleX(1)", opacity: "1" },
          "25%": { transform: "scaleY(1.08) scaleX(0.92)", opacity: "0.9" },
          "50%": { transform: "scaleY(0.92) scaleX(1.08)", opacity: "0.95" },
          "75%": { transform: "scaleY(1.04) scaleX(0.96)", opacity: "0.85" },
        },
        floatUp: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-120px) scale(0.3)", opacity: "0" },
        },
        popIn: {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "70%": { transform: "scale(1.1) rotate(3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        sparkle: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.5)" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        pulse3d: {
          "0%,100%": { textShadow: "0 0 20px #ff69b4, 0 0 40px #ff69b4" },
          "50%": { textShadow: "0 0 40px #ff1493, 0 0 80px #ff1493, 0 0 120px #ff69b4" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceSoft: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        flicker: "flicker 0.8s ease-in-out infinite",
        floatUp: "floatUp 0.8s ease-out forwards",
        popIn: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        confettiFall: "confettiFall var(--duration, 3s) ease-in forwards",
        pulse3d: "pulse3d 2s ease-in-out infinite",
        slideDown: "slideDown 0.5s ease-out forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
        bounceSoft: "bounceSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};