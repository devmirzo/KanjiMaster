import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiCard = ({ id, kanji, onyomi, kunyomi, gif }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${id}`)}
      className="relative flex h-36 w-24 transform cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-[#FCFAEE]/20 bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] text-center font-bold text-white shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#384B70]/40 sm:h-40 sm:w-28 sm:rounded-2xl md:h-44 md:w-32 md:rounded-3xl lg:h-48 lg:w-36"
    >
      {/* 🔹 Kanji belgisi */}
      <span className="mt-2 text-3xl font-light drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
        {kanji}
      </span>

      {/* 🔹 Onyomi va Kunyomi qisqa ko‘rinish */}
      <div className="mt-2 text-[10px] text-[#FCFAEE]/90 sm:text-xs md:text-sm"></div>

      {/* 🔹 Dekorativ animatsiya */}
      <span className="absolute h-12 w-12 animate-ping rounded-full bg-white opacity-10 sm:h-16 sm:w-16"></span>
    </div>
  );
};

export default KanjiCard;
