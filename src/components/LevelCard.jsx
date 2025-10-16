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
      className="relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#FCFAEE]/20 bg-gradient-to-br from-[#384B70] to-[#2C3E5D] font-bold tracking-wider text-[#FCFAEE] uppercase shadow-lg transition-all duration-300 select-none sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-52 lg:w-52"
    >
      {/* 🔹 Ichki yoritish effekti */}
      <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-10"></span>

      {/* 🔹 Level nomi */}
      <h2 className="z-10 text-3xl drop-shadow-md sm:text-4xl md:text-5xl">
        {level}
      </h2>

      {/* 🔹 Pastki dekorativ effekt */}
      <div className="absolute bottom-0 h-1 w-full animate-pulse rounded-t-full bg-[#FCFAEE]/40" />
    </motion.div>
  );
};

export default LevelCard;
