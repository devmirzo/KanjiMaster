// src/pages/KanjiPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // 👈 scroll trigger uchun
import { useKanjis } from "../context/KanjiContext";
import { Error, KanjiCard, Loading } from "../components";

const KanjiPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { getKanjisByLevel, loading, error } = useKanjis();
  const [kanjisByLevel, setKanjisByLevel] = useState([]);

  // 🔹 Ma'lumot olish
  useEffect(() => {
    const fetchKanjis = async () => {
      try {
        const data = await getKanjisByLevel(level);
        const sortedData = data.sort((a, b) => a.id - b.id);
        setKanjisByLevel(sortedData);
      } catch (err) {
        console.error("Kanji olishda xatolik:", err);
      }
    };
    fetchKanjis();
  }, [level, getKanjisByLevel]);

  // 🔹 Yuklanish holati
  if (loading) return <Loading />;

  // 🔹 Xatolik holati
  if (error)
    return (
      <Error
        message={error.message || "Ma'lumot yuklanishda xatolik yuz berdi."}
        onRetry={() => window.location.reload()}
      />
    );

  // 🔹 Bo‘sh natija holati
  if (!kanjisByLevel || kanjisByLevel.length === 0)
    return (
      <div className="min-h-screen bg-[#FCFAEE] flex flex-col items-center justify-center p-6 text-[#384B70]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded-lg bg-[#384B70] text-[#FCFAEE] font-semibold hover:bg-[#2C3E5D] transition-colors"
        >
          ← Orqaga
        </motion.button>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl"
        >
          Bu darajada kanjilar mavjud emas.
        </motion.p>
      </div>
    );

  return (
    <motion.div
      className="min-h-screen bg-[#FCFAEE] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🔹 Orqaga tugma */}
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-[#384B70] text-[#FCFAEE] font-semibold hover:bg-[#2C3E5D] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Orqaga
      </motion.button>

      {/* 🔹 Sarlavha */}
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#384B70] mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Kanji darajasi: {level?.toUpperCase() || "Noma’lum"}
      </motion.h1>

      {/* 🔹 Kanji kartalari */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-7 sm:gap-3">
        {kanjisByLevel.map((k) => (
          <FadeInOnScroll key={k.id}>
            <KanjiCard
              id={k.id}
              kanji={k.kanji_text}
              onyomi={k.onyomi}
              kunyomi={k.kunyomi}
              gif={k.gif_url}
            />
          </FadeInOnScroll>
        ))}
      </div>
    </motion.div>
  );
};

/* 🔹 Har bir kartani scroll paytida ko‘rsatish uchun komponent */
const FadeInOnScroll = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // 20% ko‘rinishi yetarli
    triggerOnce: false, // scroll orqaga qaytganda yana yo‘qoladi
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    } else {
      controls.start({ opacity: 0, y: 40 }); // 👈 yo‘qolish animatsiyasi
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      whileHover={{ scale: 1.01, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

export default KanjiPage;
