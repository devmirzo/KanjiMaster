// src/components/KanjiCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiCard = ({ id, kanji }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${id}`)}
      className="group relative flex h-36 w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#E5E5E0] bg-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#384B70] hover:shadow-xl hover:shadow-[#384B70]/20 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36 dark:border-[#2F3D57] dark:bg-[#263347] dark:hover:border-[#F2C46D] dark:hover:shadow-[#F2C46D]/20"
    >
      {/* 🔹 Kanji belgisi */}
      <span className="relative z-10 mt-2 text-4xl font-light text-[#384B70] drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110 dark:text-[#FCFAEE]">
        {kanji}
      </span>

      {/* 🔹 Dekorativ orqa fon animatsiyasi */}
      <span className="absolute h-12 w-12 animate-ping rounded-full bg-[#384B70] opacity-10 sm:h-16 sm:w-16 dark:bg-[#F2C46D] dark:opacity-15"></span>

      {/* 🔹 Hover gradient fon */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#384B70]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-[#F2C46D]/10"></div>

      {/* 🔹 Pastki chiziq hover effekti */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-[#7081A1]/30 transition-all duration-300 group-hover:h-1.5 group-hover:bg-[#384B70] dark:bg-[#51648F]/30 dark:group-hover:bg-[#F2C46D]"></div>

      {/* 🔹 Yuqori burchak dekorativ element */}
      <div className="absolute top-0 right-0 h-8 w-8 rounded-bl-2xl bg-[#F2C46D]/10 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-[#F2C46D]/20"></div>
    </div>
  );
};

export default KanjiCard;
