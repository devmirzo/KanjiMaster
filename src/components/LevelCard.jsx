// src/components/LevelCard.jsx
import React from "react";
import { motion } from "framer-motion";

const LevelCard = ({ level, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotate: 1,
        boxShadow: "0 0 30px rgba(56, 75, 112, 0.35)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 130, damping: 1 }}
      onClick={() => onClick(level)}
      className="group relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-[#E5E5E0] bg-white font-bold tracking-wider uppercase shadow-lg transition-all duration-300 ease-in-out select-none hover:border-[#384B70] hover:shadow-xl sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-52 lg:w-52 dark:border-[#2F3D57] dark:bg-[#263347] dark:hover:border-[#F2C46D]"
    >
      {/* 🔹 Hover ichki yoritish effekti */}
      {/* <span className="absolute inset-0 bg-[#384B70]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-25 dark:bg-[#F2C46D]/15"></span> */}

      {/* 🔹 Level nomi */}
      <h2 className="z-10 text-3xl text-[#384B70] drop-shadow-md transition-all duration-300 group-hover:text-[#2E3E5E] sm:text-4xl md:text-5xl dark:text-[#FCFAEE] dark:group-hover:text-[#E8E4D0]">
        {level}
      </h2>

      {/* 🔹 Subtitle (qo'shimcha) */}
      <p className="z-10 mt-2 text-xs font-semibold text-[#7081A1] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-[#51648F]">
        Daraja
      </p>

      {/* 🔹 Dekorativ Accent halqa */}
      {/* <span className="absolute h-20 w-20 rounded-full bg-[#384B70] opacity-10 blur-2xl transition-all duration-500 group-hover:scale-125 dark:bg-[#F2C46D] dark:opacity-15"></span> */}

      {/* 🔹 Pastki dekorativ chiziq */}
      <div className="absolute bottom-0 h-1 w-full rounded-t-full bg-[#7081A1]/30 transition-all duration-300 group-hover:h-1.5 group-hover:bg-[#384B70] dark:bg-[#51648F]/30 dark:group-hover:bg-[#F2C46D]"></div>

      {/* 🔹 Hover gradient highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#384B70]/10 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-[#F2C46D]/10"></div>

      {/* 🔹 Yuqori o'ng burchak accent */}
      <div className="absolute top-0 right-0 h-12 w-12 rounded-bl-3xl bg-[#F2C46D]/15 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-[#F2C46D]/25"></div>

      {/* 🔹 Chap pastki burchak accent */}
      <div className="absolute bottom-0 left-0 h-10 w-10 rounded-tr-3xl bg-[#F2C46D]/10 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-[#F2C46D]/20"></div>
    </motion.div>
  );
};

export default LevelCard;
