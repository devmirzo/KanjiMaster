// src/components/LevelCard.jsx
import React from "react";
import { motion } from "framer-motion";

const LevelCard = ({ level, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        rotate: 1,
        boxShadow: "0 0 30px rgba(56, 75, 112, 0.35)", // asosiy rang soyalari
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 230, damping: 16 }}
      onClick={() => onClick(level)}
      className="group relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#384B70]/40 bg-[#FCFAEE] font-bold tracking-wider text-[#384B70] uppercase shadow-[0_6px_25px_rgba(56,75,112,0.12)] transition-all duration-300 ease-in-out select-none hover:shadow-[0_8px_35px_rgba(56,75,112,0.25)] sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-52 lg:w-52"
    >
      {/* 🔹 Hover ichki yoritish effekti */}
      <span className="absolute inset-0 bg-[#384B70]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-25"></span>

      {/* 🔹 Level nomi */}
      <h2 className="z-10 text-3xl text-[#384B70] drop-shadow-md transition-all duration-300 group-hover:text-[#384B70]/70 sm:text-4xl md:text-5xl">
        {level}
      </h2>

      {/* 🔹 Dekorativ Accent halqa */}
      <span className="absolute h-20 w-20 rounded-full bg-[#384B70] opacity-10 blur-2xl transition-all duration-500 group-hover:scale-125"></span>

      {/* 🔹 Pastki dekorativ chiziq */}
      <div className="absolute bottom-0 h-1 w-full rounded-t-full bg-[#384B70]/40 transition-all duration-300 group-hover:bg-[#384B70]/80"></div>

      {/* 🔹 Hover gradient highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#384B70]/10 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </motion.div>
  );
};

export default LevelCard;
