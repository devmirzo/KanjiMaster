import React from "react";

const loadingKanjis = ["百", "千", "万", "円", "年", "上", "下", "中"];

const Loading = () => {
  const [index, setIndex] = React.useState(0);

  // Har 300ms da yangi kanji ko'rsatiladi
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingKanjis.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center transition-all duration-500"
      style={{ backgroundColor: "#FCFAEE", color: "#384B70" }}
    >
      {/* 🔹 Kanji belgisi */}
      <div
        className="mb-6 animate-bounce text-9xl font-medium drop-shadow-[0_4px_10px_rgba(56,75,112,0.5)] transition-all duration-500"
        style={{ color: "#384B70" }}
      >
        {loadingKanjis[index]}
      </div>

      {/* 🔹 Matn */}
      <p
        className="animate-pulse text-2xl font-semibold"
        style={{ color: "#384B70" }}
      >
        Kanji yuklanmoqda...
      </p>

      {/* 🔹 Progress chiziq */}
      <div
        className="relative mt-8 h-2 w-52 overflow-hidden rounded-full shadow-inner"
        style={{ backgroundColor: "#e0e0d8" }}
      >
        <div
          className="animate-loading absolute top-0 left-0 h-full w-1/2"
          style={{ backgroundColor: "#384B70" }}
        ></div>
      </div>

      {/* 🔹 Link */}
      <a
        href="https://t.me/DevMirzo"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 font-semibold transition-all duration-300 hover:underline"
        style={{ color: "#384B70" }}
      >
        @DevMirzo Telegram’da
      </a>

      {/* 🔹 Custom animatsiya */}
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          .animate-loading {
            animation: loading 2s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
