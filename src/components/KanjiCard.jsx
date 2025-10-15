import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiCard = ({ id, kanji, onyomi, kunyomi, gif }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${id}`)}
      className="
        relative flex flex-col items-center justify-center
        w-20 h-32 sm:w-24 sm:h-36 md:w-28 md:h-40 lg:w-32 lg:h-44
        rounded-xl sm:rounded-2xl md:rounded-3xl  shadow-2xl overflow-hidden
        bg-gradient-to-tr from-[#384B70] to-[#2C3E5D]
        text-white text-center font-bold
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-[#384B70]/40 hover:shadow-2xl
        cursor-pointer border border-[#FCFAEE]/20
      "
    >
      {/* 🔹 Kanji belgisi */}
      <span
        className="
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          mt-2 font-light drop-shadow-md
        "
      >
        {kanji}
      </span>

      {/* 🔹 Onyomi va Kunyomi qisqa ko‘rinish */}
      <div
        className="
          mt-2 text-[10px] sm:text-xs md:text-sm text-[#FCFAEE]/90
        "
      >
        {/* Agar xohlasangiz pastdagini ochishingiz mumkin */}
        {/* <p className="truncate">音: {onyomi || "-"}</p>
        <p className="truncate">訓: {kunyomi || "-"}</p> */}
      </div>

      {/* 🔹 Dekorativ animatsiya */}
      <span className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-white opacity-10 rounded-full animate-ping"></span>
    </div>
  );
};

export default KanjiCard;
