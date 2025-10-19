// src/components/KanjiCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiCard = ({ id, kanji }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${id}`)}
      className="group relative flex h-36 w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#384B70]/40 bg-[#FCFAEE] text-center font-bold text-[#384B70] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(56,75,112,0.25)] sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36"
    >
      {/* 🔹 Kanji belgisi */}
      <span className="mt-2 text-4xl font-light text-[#384B70] drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110">
        {kanji}
      </span>

      {/* 🔹 Dekorativ orqa fon animatsiyasi */}
      <span className="absolute h-12 w-12 animate-ping rounded-full bg-[#384B70] opacity-10 sm:h-16 sm:w-16"></span>

      {/* 🔹 Hover gradient fon */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#384B70]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* 🔹 Pastki chiziq hover effekti */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-[#384B70]/40 transition-all duration-300 group-hover:bg-[#384B70]/80"></div>
    </div>
  );
};

export default KanjiCard;
