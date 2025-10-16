import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import { Error, LevelCard, Loading } from "../components";

const LevelsPage = () => {
  const navigate = useNavigate();
  const { levels, loading, error } = useKanjis();

  const level = ["N1", "N2", "N3", "N4", "N5"];

  useEffect(() => {
    document.title = "Bosh sahifa | KanjiMaster";
  }, []);

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
      className="flex min-h-screen flex-col items-center justify-center bg-[#FCFAEE] px-4 py-12 sm:px-6 md:px-10"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 🔹 Sarlavha */}
      <motion.h1
        className="mb-10 text-center text-3xl font-bold text-[#384B70] md:text-4xl"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Kanji darajasini tanlang
      </motion.h1>

      {/* 🔹 Level kartalar */}
      <motion.div
        className="grid w-full max-w-5xl grid-cols-2 justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        initial="hidden"
        animate="visible"
      >
        {level.map((lvl, i) => (
          <motion.div
            key={lvl}
            custom={i}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => handleLevelClick(lvl)}
            className="flex w-[110px] justify-center sm:w-[130px] md:w-[150px]"
          >
            <LevelCard level={lvl} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LevelsPage;
