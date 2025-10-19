// src/components/global/Error.jsx
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

const Error = ({ message = "Xatolik yuz berdi!", onRetry }) => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-3 sm:px-6 md:px-8"
    
    >
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
        <AlertTriangle
          className="h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24"
          style={{ color: "#384B70" }}
        />
      </motion.div>

      {/* 📝 Xabar */}
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center font-bold sm:text-2xl md:text-3xl"
        style={{ color: "#384B70" }}
      >
        {message}
      </motion.h2>

      {/* 🔁 Qayta urinish tugmasi */}
      {onRetry && (
        <motion.button
          whileHover={{
            scale: 1.08,
            backgroundColor: "#384B70",
            boxShadow: "0 0 15px rgba(56,75,112,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="z-10 mt-4 inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-[#FCFAEE] shadow-md transition-all sm:px-7 sm:py-2.5 sm:text-base"
          style={{ backgroundColor: "#384B70" }}
        >
          <motion.div
            whileHover={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
          Qayta urinib ko‘rish
        </motion.button>
      )}
    </div>
  );
};

export default Error;
