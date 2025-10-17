// src/pages/KanjiPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useKanjis } from "../context/KanjiContext";
import { Error, KanjiCard, Loading } from "../components";
import { ArrowLeft, Ghost, RotateCcw, BookOpen } from "lucide-react";

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
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FCFAEE] text-[#384B70]">
        {/* 📘 Kitob + sharpa animatsiyasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col items-center text-center"
        >
          {/* 📘 Kitob */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
            style={{ width: "16rem", height: "8rem" }} // kattaroq konteyner
          >
            {/* 📘 Kitob */}
            <BookOpen className="z-10 -mt-40 h-36 w-36 text-[#384B70] sm:h-40 sm:w-40" />

            {/* 👻 Sharpa kitobning ichidan chiqib yuqoriga uchadi */}
            <motion.div
              className="absolute top-[58%] left-1/2 -z-1 -translate-x-1/2" // boshlanish joyi kitob ichida
              animate={{
                y: [0, -100, -100, -420],
                opacity: [0, 1, 1, 0],
                scale: [0.7, 1, 0.9, 0.7],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Ghost className="z-10 -mt-40 h-16 w-16 text-[#384B70]/80 sm:h-20 sm:w-20" />
            </motion.div>
          </motion.div>

          {/* 📝 Matn */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-md text-lg leading-relaxed font-medium sm:text-xl md:text-2xl"
          >
            <motion.h3
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="-mt-24 mb-1 text-xl font-semibold text-[#2C3E5D] sm:text-2xl"
            >
              Oops — hozircha bu darajada kanji yo‘q!
            </motion.h3>

            {/* Playful explanation with micro-interactions */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-lg text-base leading-relaxed text-[#384B70]/90 sm:text-lg"
            >
              Kanjilar hozircha{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: [0, 2, -1, 0] }}
                className="mx-1 mb-0 inline-block font-medium text-[#2C3E5D]"
              >
                dam olishmoqda
              </motion.span>
              — ular yangi misollar va GIFlar bilan qaytib keladi. Ungacha siz
              ham dam oling!
            </motion.p>
          </motion.p>

          {/* ✨ Tugmalar */}
          <div className="mt-4 flex w-full max-w-xs flex-col items-center gap-4 sm:max-w-sm">
            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: "#FCFAEE",
                color: "#384B70",
                boxShadow: "0 0 25px rgba(56,75,112,0.35)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#384B70] bg-[#384B70] px-6 py-2 text-sm font-semibold text-[#FCFAEE] transition-all sm:text-base"
            >
              <RotateCcw className="h-5 w-5" /> Qayta tekshirish
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: "#2C3E5D",
                boxShadow: "0 0 25px rgba(56,75,112,0.35)",
              }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(-1)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#384B70] px-5 py-2.5 text-sm font-semibold text-[#FCFAEE] shadow-md transition-all sm:text-base"
            >
              <ArrowLeft className="h-5 w-5" />
              Orqaga qaytish
            </motion.button>
          </div>
        </motion.div>
      </div>
    );

  return (
    <motion.div
      className="min-h-screen bg-[#FCFAEE] px-4 py-6 sm:px-6"
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
