// src/components/KanjiCard.jsx
import React from "react";

const KanjiListCard = ({ kanji, onyomi, kunyomi, gif, tarjima }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-start p-4
                 w-48 h-64 rounded-3xl shadow-2xl overflow-hidden
                 bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] 
                 text-white text-center font-bold
                 transform transition-transform duration-300 ease-in-out
                 hover:scale-105 hover:shadow-3xl cursor-pointer
                 border-[3px] border-[#FCFAEE]/30"
    >
      {/* GIF rasm */}
      {gif && (
        <img
          src={gif}
          alt={kanji}
          className="w-20 h-20 object-contain mb-2 rounded-md z-10"
        />
      )}

      {/* Kanji */}
      <span className="text-6xl md:text-7xl mb-2">{kanji}</span>

      {/* Onyomi, Kunyomi va Tarjima */}
      <div className="flex flex-col items-start text-left mt-1">
        <span className="text-sm opacity-80">
          Onyomi: <span className="font-mono ml-2">{onyomi}</span>
        </span>
        <span className="text-sm opacity-80 mt-1">
          Kunyomi: <span className="font-mono ml-2">{kunyomi}</span>
        </span>
        {tarjima && (
          <span className="text-sm opacity-80 mt-1">
            Tarjima: <span className="font-mono ml-2">{tarjima}</span>
          </span>
        )}
      </div>

      {/* Glow effect */}
      <span className="absolute w-16 h-16 bg-white opacity-5 rounded-full animate-ping top-2 right-2"></span>
    </div>
  );
};

export default KanjiListCard;
