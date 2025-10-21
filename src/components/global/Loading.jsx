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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FCFAEE] transition-all duration-500 dark:bg-[#1E2A3C]">
      {/* 🔹 Kanji belgisi */}
      <div className="mb-6 animate-bounce text-9xl font-medium text-[#384B70] drop-shadow-[0_4px_10px_rgba(56,75,112,0.5)] transition-all duration-500 dark:text-[#FCFAEE] dark:drop-shadow-[0_4px_10px_rgba(252,250,238,0.3)]">
        {loadingKanjis[index]}
      </div>

      {/* 🔹 Matn */}
      <p className="animate-pulse text-2xl font-semibold text-[#2E2E2E] dark:text-white">
        Kanji yuklanmoqda...
      </p>

      {/* 🔹 Qo'shimcha tavsif */}
      <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#BFC8D8]">
        Iltimos, kuting...
      </p>

      {/* 🔹 Progress chiziq */}
      <div className="relative mt-8 h-2 w-52 overflow-hidden rounded-full border border-[#E5E5E0] bg-white shadow-inner dark:border-[#2F3D57] dark:bg-[#263347]">
        <div className="animate-loading absolute top-0 left-0 h-full w-1/2 rounded-full bg-[#384B70] dark:bg-[#F2C46D]"></div>
      </div>

      {/* Dekorativ elementlar */}
      <div className="absolute top-32 left-20 h-32 w-32 rounded-full bg-[#384B70] opacity-5 blur-3xl dark:bg-[#F2C46D] dark:opacity-10" />
      <div className="absolute right-20 bottom-32 h-40 w-40 rounded-full bg-[#7081A1] opacity-5 blur-3xl dark:bg-[#51648F] dark:opacity-10" />

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
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
