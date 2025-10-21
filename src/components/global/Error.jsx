// src/components/global/Error.jsx
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

const Error = ({ message = "Xatolik yuz berdi!", onRetry }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden  px-3 transition-colors duration-300 sm:px-6 md:px-8 ">
      {/* ⚠️ Asosiy belgisi */}
      <motion.div
        animate={{
          rotate: [0, -10, 10, -8, 8, 0],
          y: [0, -15, 0, -10, 0],
          scale: [1, 1.05, 1, 1.02, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="z-10 mb-4 flex justify-center"
      >
        <AlertTriangle className="h-20 w-20 text-[#E63946] drop-shadow-lg transition-colors duration-300 sm:h-24 sm:w-24 dark:text-[#FF6B6B]" />
      </motion.div>

      {/* 📝 Xabar */}
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center text-xl font-bold text-[#2E2E2E] transition-colors duration-300 sm:text-2xl md:text-3xl dark:text-white"
      >
        {message}
      </motion.h2>

      {/* Qo'shimcha tavsif */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 max-w-md text-center text-sm text-[#6B6B6B] transition-colors duration-300 sm:text-base dark:text-[#BFC8D8]"
      >
        Iltimos, bir oz kutib qayta urinib ko'ring yoki texnik yordam bilan
        bog'laning.
      </motion.p>

      {/* 🔁 Qayta urinish tugmasi */}
      {onRetry && (
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 20px rgba(56,75,112,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="z-10 mt-4 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#384B70] bg-[#384B70] px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:border-[#2E3E5E] hover:bg-[#2E3E5E] sm:px-7 sm:py-2.5 sm:text-base dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:border-[#E8E4D0] dark:hover:bg-[#E8E4D0]"
        >
          <motion.div
            whileHover={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
          Qayta urinib ko'rish
        </motion.button>
      )}

      {/* Dekorativ elementlar */}
      <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-[#E63946] opacity-10 blur-3xl dark:bg-[#FF6B6B] dark:opacity-20" />
      <div className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-[#384B70] opacity-10 blur-3xl dark:bg-[#F2C46D] dark:opacity-20" />
    </div>
  );
};

export default Error;
