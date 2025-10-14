import React from "react";

const LevelCard = ({ level, onClick }) => {
  return (
    <div
      onClick={() => onClick(level)}
      className="cursor-pointer bg-[#384B70] text-[#FCFAEE] text-2xl font-semibold flex items-center justify-center rounded-2xl shadow-lg hover:scale-102 transition-transform duration-200 px-32 py-20  w-full"
    >
       {level}
    </div>
  );
};

export default LevelCard;
