import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileCog, Search } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const circles = Array.from({ length: 30 });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden py-10 text-center text-[#384B70]">
      {/* 🔹 Harakatlanuvchi fon doiralar */}
      {circles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#384B70]/15"
          style={{
            width: `${Math.random() * 100 + 60}px`,
            height: `${Math.random() * 100 + 60}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 📂 Fayl va 404 kontent */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center justify-center"
      >
        <div className="relative mb-0 flex items-center justify-center">
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <FileCog className="h-36 w-36 text-[#384B70]" />
            <motion.div
              className="absolute top-1/2 left-1/2"
              style={{ translateX: "-50%", translateY: "-50%" }}
              animate={{
                x: [0, 20, -20, 15, -10, 0],
                y: [0, -10, 10, -15, 5, 0],
                rotate: [0, 15, -10, 10, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Search className="h-16 w-16 text-[#4278e3]" />
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          className="text-[7rem] font-extrabold text-[#384B70] sm:text-[9rem] md:text-[11rem]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="-mt-8 mb-0 text-3xl font-semibold sm:text-3xl"
        >
          Sahifa topilmadi
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-0 mb-0 max-w-md text-sm text-[#384B70]/70 sm:text-base"
        >
          Ehtimol siz noto‘g‘ri manzilga kirdingiz yoki bu sahifa hali
          <span className="font-medium text-[#384B70]"> tayyor emas</span>.
        </motion.p>
      </motion.div>

      {/* 🟦 Har doim pastda turuvchi tugma */}
      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "#384B70",
          boxShadow: "0 0 25px rgba(56,75,112,0.35)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="z-10 -mt-8 mb-24 rounded-xl bg-[#384B70] px-6 py-4 font-semibold text-[#FCFAEE] shadow-lg transition"
      >
        Bosh sahifaga qaytish
      </motion.button>
    </div>
  );
};

export default NotFoundPage;
