import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiCard = ({ id, kanji, onyomi, kunyomi, gif }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${id}`)}
      className="relative flex flex-col items-center justify-center 
                 w-40 h-56 sm:w-44 sm:h-60 rounded-3xl shadow-2xl overflow-hidden
                 bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] 
                 text-white text-center font-bold
                 transform transition-all duration-300 ease-in-out
                 hover:scale-105 hover:shadow-[#384B70]/40 hover:shadow-2xl cursor-pointer
                 border border-[#FCFAEE]/20"
    >
      {/* 🔹 Kanji animatsiyasi yoki fallback rasmi */}

      {/* <div className="w-20 h-20 mt-3 flex items-center justify-center bg-[#FCFAEE]/10 rounded-xl text-5xl">
        {kanji}
      </div> */}

      {/* 🔹 Kanji belgisi */}
      <span className="text-7xl md:text-7xl mt-2 font-light drop-shadow-md">
        {kanji}
      </span>

      {/* 🔹 Onyomi va Kunyomi qisqa ko‘rinish */}
      <div className="mt-1 text-xs text-[#FCFAEE]/90">
        {/* <p className="truncate">音: {onyomi || "-"}</p> */}
        {/* <p className="truncate">訓: {kunyomi || "-"}</p> */}
      </div>

      {/* 🔹 Dekorativ animatsiya */}
      <span className="absolute w-16 h-16 bg-white opacity-10 rounded-full animate-ping"></span>
    </div>
  );
};

export default KanjiCard;
