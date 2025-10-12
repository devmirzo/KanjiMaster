import React from "react";

const loadingKanjis = ["百", "千", "万", "円", "年", "上", "下", "中"];

const Loading = () => {
  const [index, setIndex] = React.useState(0);

  // Har 300msda yangi kanji ko'rsatiladi
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingKanjis.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAEE]">
      <div className="text-[#384B70] text-9xl animate-bounce mb-6">
        {loadingKanjis[index]}
      </div>
      <p className="text-[#384B70] text-2xl font-semibold animate-pulse">
        Kanji yuklanmoqda...
      </p>
      <div className="mt-6 w-40 h-1 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full bg-[#384B70] animate-loading"></div>
      </div>

      {/* Tailwind animatsiyasini qo'shish */}
      <style>
        {`
          @keyframes loading {
            0% { width: 0; }
            50% { width: 100%; }
            100% { width: 0; }
          }
          .animate-loading {
            animation: loading 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
