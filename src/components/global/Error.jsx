// src/components/global/Error.jsx
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

const Error = ({ message = "Xatolik yuz berdi!", onRetry }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden  px-3 text-gray-800 sm:px-6 md:px-8">
      {/* 🧱 Error box */}

      {/* ⚠️ Animated Icon */}
      <motion.div
        animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-4 flex justify-center"
      >
        <AlertTriangle className="h-12 w-12 text-red-500 drop-shadow-md sm:h-14 sm:w-14 md:h-16 md:w-16" />
      </motion.div>

      {/* 📝 Text */}
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-2 text-xl font-bold text-red-600 sm:text-2xl md:text-3xl"
      >
        Oops! Xatolik yuz berdi 😢
      </motion.h2>

      {/* 🔁 Retry button */}
      {onRetry && (
        <motion.button
          whileHover={{
            scale: 1.08,
            backgroundColor: "#ef4444",
            boxShadow: "0 0 20px rgba(239,68,68,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-base"
        >
          <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
          Qayta urinib ko‘rish
        </motion.button>
      )}
    </div>
  );
};

export default Error;
