import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import { Error, LevelCard, Loading } from "../components";

const LevelsPage = () => {
  const navigate = useNavigate();
  const { levels, loading, error } = useKanjis();

  // 🔹 Sahifa chiqish animatsiyasi
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 🔹 Har bir level kartasi uchun animatsiya
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  // 🔹 Bosilganda navigatsiya
  const handleLevelClick = (level) => navigate(`/kanji/${level}`);

  if (loading) return <Loading />;

  if (error)
    return (
      <Error
        message={typeof error === "string" ? error : error.message}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <motion.div
      className="min-h-screen bg-[#FCFAEE] flex flex-col items-center justify-center p-6"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 🔹 Sarlavha */}
      <motion.h1
        className="text-3xl font-bold text-[#384B70] mb-8 text-center"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Kanji darajasini tanlang
      </motion.h1>

      {/* 🔹 Level kartalar */}
      {levels.length === 0 ? (
        <motion.p
          className="text-gray-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Hech qanday level topilmadi 😕
        </motion.p>
      ) : (
        <motion.div
          className=" flex gap-6 flex-wrap items-center justify-center"
          initial="hidden"
          animate="visible"
        >
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl}
              custom={i}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => handleLevelClick(lvl)}
            >
              <LevelCard level={lvl} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LevelsPage;
