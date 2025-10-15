import React from "react";
import { motion } from "framer-motion";

const LevelCard = ({ level, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        rotate: 1,
        boxShadow: "0 0 25px rgba(56, 75, 112, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      onClick={() => onClick(level)}
      className="
        relative cursor-pointer select-none
        flex flex-col items-center justify-center
        rounded-3xl shadow-lg border border-[#FCFAEE]/20
        bg-gradient-to-br from-[#384B70] to-[#2C3E5D]
        text-[#FCFAEE] font-bold uppercase tracking-wider
        w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* 🔹 Ichki yoritish effekti */}
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>

      {/* 🔹 Level nomi */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl drop-shadow-md z-10">
        {level}
      </h2>

      {/* 🔹 Pastki dekorativ effekt */}
      <div className="absolute bottom-0 w-full h-1 bg-[#FCFAEE]/40 rounded-t-full animate-pulse" />
    </motion.div>
  );
};

export default LevelCard;
