import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiCard = ({ kanji, onyomi, kunyomi, gif, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${id}`)}
      className="relative flex flex-col items-center justify-center 
                 w-40 h-56 rounded-3xl shadow-2xl overflow-hidden
                 bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] 
                 text-white text-center font-bold
                 transform transition-transform duration-300 ease-in-out
                 hover:scale-105 hover:shadow-3xl cursor-pointer
                 border-2 border-[#FCFAEE]/30"
    >
      {gif && (
        <video
          src={gif}
          alt={kanji}
          className="w-20 h-20 object-contain mt-3 z-10"
        />
      )}
      <span className="text-4xl md:text-6xl mt-2 font-light">{kanji}</span>
      <span className="text-sm mt-1 opacity-80">
        {/* Onyomi: {onyomi} <br /> */}
        {/* Kunyomi: {kunyomi} */}
      </span>
      <span className="absolute w-16 h-16 bg-white opacity-5 rounded-full animate-ping"></span>
    </div>
  );
};

export default KanjiCard;
