// src/pages/KanjiPage.jsx
import React, { useEffect, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet"; // ✅ SEO uchun
import { useKanjis } from "../context/KanjiContext";
import { Error, KanjiCard, Loading } from "../components";
import { ArrowLeft, Ghost, RotateCcw, BookOpen, ArrowDown } from "lucide-react";

const KanjiPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { getKanjisByLevel, loading, error } = useKanjis();
  const [kanjisByLevel, setKanjisByLevel] = useState([]);

  useEffect(() => {
    document.title = `KanjiMaster | Daraja: ${level?.toUpperCase() || "Noma'lum"}`;
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

  // === BO'SH HOLAT ===
  if (!kanjisByLevel || kanjisByLevel.length === 0)
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
        <Helmet>
          <title>
            KanjiMaster | {level?.toUpperCase()} darajada kanji topilmadi
          </title>
          <meta
            name="description"
            content={`${level?.toUpperCase()} darajasi uchun hozircha kanjilar mavjud emas. Tez orada yangilanadi!`}
          />
          <meta name="robots" content="index,follow" />
        </Helmet>

        {/* Kitob va sharpa animatsiyasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
            style={{ width: "16rem", height: "8rem" }}
          >
            <BookOpen
              className="z-10 -mt-40 h-36 w-36 text-[#7081A1] dark:text-[#51648F]"
              aria-label="Book icon"
            />
            <motion.div
              className="absolute top-[58%] left-1/2 -translate-x-1/2"
              animate={{
                y: [0, -100, -100, -420],
                opacity: [0, 1, 1, 0],
                scale: [0.7, 1, 0.9, 0.7],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Ghost
                className="h-16 w-16 text-[#7081A1] dark:text-[#51648F]"
                aria-label="Ghost icon"
              />
            </motion.div>
          </motion.div>

          {/* Matn */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-md text-lg leading-relaxed font-medium"
          >
            <h3 className="-mt-24 mb-1 text-xl font-semibold text-[#2E2E2E] dark:text-white">
              Oops — hozircha bu darajada kanji yo‘q!
            </h3>
            <p className="text-[#6B6B6B] dark:text-[#BFC8D8]">
              Kanjilar{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: [0, 2, -1, 0] }}
                className="text-[#384B70] dark:text-[#F2C46D]"
              >
                dam olishmoqda
              </motion.span>{" "}
              — ular tez orada qaytib keladi. Ungacha boshqa darajani ko‘rib
              chiqing 👇
            </p>
          </motion.div>

          {/* Tugmalar */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#384B70] bg-[#384B70] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2E3E5E] dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:bg-[#E8E4D0]"
            >
              <ArrowLeft className="h-5 w-5" /> Orqaga qaytish
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/kanji")}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#E5E5E0] bg-white px-6 py-2 text-sm font-semibold text-[#51648F] hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D]"
            >
              <RotateCcw className="h-5 w-5" /> Boshqa darajani ko‘rish
            </motion.button>
          </div>
        </motion.div>
      </div>
    );

  // === ASOSIY SAHIFA ===
  return (
    <motion.div
      className="min-h-screen px-4 py-6 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>KanjiMaster | {level?.toUpperCase()} darajadagi kanjilar</title>
        <meta
          name="description"
          content={`Learn all ${level?.toUpperCase()} level kanji characters with readings, stroke order, and examples.`}
        />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href={`https://kanjimast.vercel.app/kanji/${level}`}
        />
      </Helmet>

      {/* Orqaga tugma */}
      <motion.button
        onClick={() => navigate(-1)}
        aria-label="Orqaga qaytish"
        className="mb-6 rounded-lg border-2 border-[#E5E5E0] bg-white px-4 py-2 font-semibold text-[#51648F] shadow-sm hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Orqaga
      </motion.button>

      {/* Sarlavha */}
      <motion.h1
        className="mb-4 text-center text-2xl font-bold text-[#2E2E2E] sm:text-3xl dark:text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Kanji darajasi:{" "}
        <span className="text-[#384B70] dark:text-[#F2C46D]">
          {level?.toUpperCase() || "Noma'lum"}
        </span>
      </motion.h1>

      {/* Scroll hint */}
      <motion.div
        className="mb-8 flex justify-center"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="h-5 w-5 text-[#7081A1] dark:text-[#F2C46D]" />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-3 place-items-center gap-2 sm:grid-cols-4 sm:gap-5 md:gap-7 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9">
        {kanjisByLevel.map((k) => (
          <FadeInOnScroll key={k.id}>
            <KanjiCard
              id={k.id}
              kanji={k.kanji_text}
              onyomi={k.onyomi}
              kunyomi={k.kunyomi}
              gif={k.gif_url}
              loading="lazy" // ✅ rasm optimizatsiya
            />
          </FadeInOnScroll>
        ))}
      </div>
    </motion.div>
  );
};

/* Kartani scroll paytida yumshoq chiqarish */
const FadeInOnScroll = memo(({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex w-full justify-center"
    >
      {children}
    </motion.div>
  );
});

export default KanjiPage;
