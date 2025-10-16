// src/pages/KanjiPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useKanjis } from "../context/KanjiContext";
import { Error, KanjiCard, Loading } from "../components";

const KanjiPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { getKanjisByLevel, loading, error } = useKanjis();
  const [kanjisByLevel, setKanjisByLevel] = useState([]);

  useEffect(() => {
    document.title = `Daraja: ${level?.toUpperCase() || "Noma’lum"}`;
  }, [level]);

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

  if (loading) return <Loading />;

  if (error)
    return (
      <Error
        message={error.message || "Ma'lumot yuklanishda xatolik yuz berdi."}
        onRetry={() => window.location.reload()}
      />
    );

  if (!kanjisByLevel || kanjisByLevel.length === 0)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FCFAEE] p-6 text-[#384B70]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-6 rounded-lg bg-[#384B70] px-4 py-2 font-semibold text-[#FCFAEE] transition-colors hover:bg-[#2C3E5D]"
        >
          ← Orqaga
        </motion.button>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xl"
        >
          Bu darajada kanjilar mavjud emas.
        </motion.p>
      </div>
    );

  return (
    <motion.div
      className="min-h-screen bg-[#FCFAEE] px-4 py-6 sm:px-6 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🔙 Orqaga tugma */}
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-6 rounded-lg bg-[#384B70] px-4 py-2 font-semibold text-[#FCFAEE] transition-colors hover:bg-[#2C3E5D]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Orqaga
      </motion.button>

      {/* 🔹 Sarlavha */}
      <motion.h1
        className="mb-6 text-center text-xl font-bold text-[#384B70] sm:text-2xl md:text-3xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Kanji darajasi: {level?.toUpperCase() || "Noma’lum"}
      </motion.h1>

      {/* ✅ Responsiv grid */}
      <div className="xs:grid-cols-4 grid grid-cols-3 place-items-center gap-2 sm:grid-cols-4 sm:gap-5 md:gap-7 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9">
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

/* 🔹 Scroll paytida har bir kartani yumshoq chiqarish */
const FadeInOnScroll = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    } else {
      controls.start({ opacity: 0, y: 40 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex w-full justify-center"
    >
      {children}
    </motion.div>
  );
};

export default KanjiPage;
