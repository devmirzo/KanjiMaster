// src/pages/KanjiDetailPage.jsx
import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  HeartOff,
  BookOpenCheck,
  BookOpen,
} from "lucide-react";
import { useKanjis } from "../context/KanjiContext";
import { Error, Loading } from "../components";

// Helpers moved outside component so they aren't re-created on every render
const safeParseExamples = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // malformed JSON -> fallback
    // eslint-disable-next-line no-console
    console.warn("Failed to parse kanji examples:", e);
    return [];
  }
};

const playAudio = (url) => {
  if (!url) return;
  try {
    const audio = new Audio(url);
    // ignore promise from play(); browsers may require user gesture
    void audio.play();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Audio play failed:", e);
  }
};

const KanjiDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    kanjis,
    loading,
    error,
    favorites,
    learned,
    toggleFavorite,
    toggleLearned,
  } = useKanjis();

  const kanji = useMemo(
    () => kanjis.find((k) => String(k.id) === String(id)),
    [kanjis, id]
  );

  const currentIndex = useMemo(
    () => kanjis.findIndex((k) => String(k.id) === String(id)),
    [kanjis, id]
  );

  const prevKanji = useMemo(() => kanjis[currentIndex - 1], [kanjis, currentIndex]);
  const nextKanji = useMemo(() => kanjis[currentIndex + 1], [kanjis, currentIndex]);

  useEffect(() => {
    document.title = kanji?.kanji_text
      ? `${kanji.kanji_text} – Kanji tafsilotlari`
      : "Kanji tafsilotlari yuklanmoqda...";
  }, [kanji]);

  if (loading) return <Loading />;
  if (error)
    return (
      <Error message={error.message} onRetry={() => window.location.reload()} />
    );
  if (!kanji)
    return <Error message="Kanji topilmadi." onRetry={() => navigate(-1)} />;

  const isFavorite = useMemo(() => !!kanji && favorites.includes(kanji.id), [favorites, kanji]);
  const isLearned = useMemo(() => !!kanji && learned.includes(kanji.id), [learned, kanji]);

  const examples = useMemo(() => safeParseExamples(kanji?.examples), [kanji?.examples]);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen p-6 sm:p-8 lg:p-12"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* 🔙 Orqaga tugma */}
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 flex items-center gap-2 rounded-lg border-2 border-[#E5E5E0] bg-white px-5 py-2 font-medium text-[#51648F] shadow-md transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
      >
        <ArrowLeft className="h-5 w-5" />
        Orqaga
      </motion.button>

      {/* 🔹 Kanji belgisi */}
      <motion.div className="mb-10 text-center">
        <motion.h1 className="text-[7rem] leading-none font-light text-[#384B70] drop-shadow-md sm:text-[9rem] lg:text-[11rem] dark:text-[#FCFAEE]">
          {kanji.kanji_text}
        </motion.h1>
      </motion.div>

      {/* 🔹 Daraja va holatlar */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <motion.button
          onClick={() => navigate(`/kanji/${kanji.level}`)}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#384B70] bg-white px-6 py-1 text-lg font-medium text-[#384B70] transition hover:bg-[#FCFAEE] dark:border-[#F2C46D] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:bg-[#1E2A3C]"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#384B70] dark:bg-[#F2C46D]" />
          {kanji.level} daraja
        </motion.button>

        <div className="mt-3 flex">
          {/* ❤️ Sevimli */}
          <motion.button
            onClick={() => toggleFavorite(kanji.id)}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-center rounded-l-full border-2 px-7 py-2 transition-all ${
              isFavorite
                ? "border-[#E63946] bg-[#E63946] text-white dark:border-[#FF6B6B] dark:bg-[#FF6B6B] dark:text-[#1E2A3C]"
                : "border-[#E5E5E0] bg-white text-[#E63946] hover:bg-[#FCFAEE] dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#FF6B6B] dark:hover:bg-[#1E2A3C]"
            }`}
          >
            {isFavorite ? <HeartOff size={20} /> : <Heart size={20} />}
          </motion.button>

          {/* 📗 O'rganilgan */}
          <motion.button
            onClick={() => toggleLearned(kanji.id)}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-center rounded-r-full border-2 px-7 py-2 transition-all ${
              isLearned
                ? "border-[#4CAF50] bg-[#4CAF50] text-white dark:border-[#7DCE82] dark:bg-[#7DCE82] dark:text-[#1E2A3C]"
                : "border-[#E5E5E0] bg-white text-[#4CAF50] hover:bg-[#FCFAEE] dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#7DCE82] dark:hover:bg-[#1E2A3C]"
            }`}
          >
            {isLearned ? <BookOpenCheck size={20} /> : <BookOpen size={20} />}
          </motion.button>
        </div>
      </div>

      {/* 🔹 Asosiy konteyner */}
      <motion.div className="mx-auto max-w-5xl space-y-6 rounded-2xl border-2 border-[#E5E5E0] bg-white p-6 shadow-lg dark:border-[#2F3D57] dark:bg-[#263347]">
        {/* ✍️ Yozilish tartibi */}
        {(kanji.stroke_video || kanji.stroke_order_svgs?.length > 0) && (
          <div className="text-center">
            <h2 className="mb-3 text-xl font-semibold text-[#2E2E2E] dark:text-white">
              Yozilish tartibi
            </h2>
            <div className="flex flex-wrap justify-center py-8 gap-3 rounded-2xl bg-white">
              {kanji.stroke_video && (
                <video
                  src={kanji.stroke_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-20 w-20 rounded-xl border-2 border-[#E5E5E0] object-contain shadow-sm dark:border-[#2F3D57]"
                />
              )}
              {kanji.stroke_order_svgs?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`stroke-${i}`}
                  className="h-20 w-20 rounded-xl border-2 border-[#E5E5E0] object-contain shadow-sm dark:border-[#2F3D57]"
                />
              ))}
            </div>
          </div>
        )}

        {/* 🈷️ On'yomi */}
        <div>
          <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-white">
            On'yomi
          </h2>
          <p className="mt-2 text-2xl break-words text-[#384B70] dark:text-[#F2C46D]">
            {kanji.onyomi}
          </p>
        </div>

        {/* 🈶 Kun'yomi */}
        <div>
          <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-white">
            Kun'yomi
          </h2>
          <p className="mt-2 text-2xl break-words text-[#384B70] dark:text-[#F2C46D]">
            {kanji.kunyomi}
          </p>
        </div>

        {/* 🇯🇵 Tarjima */}
        <div>
          <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-white">
            Tarjimasi
          </h2>
          <p className="mt-2 text-2xl text-[#6B6B6B] first-letter:uppercase dark:text-[#BFC8D8]">
            {Array.isArray(kanji.tarjima)
              ? kanji.tarjima.join(", ")
              : kanji.tarjima}
          </p>
        </div>

        {/* 📖 Misollar */}
        {examples.length > 0 && (
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[#2E2E2E] dark:text-white">
              Kanjidan yasalgan so'zlar
            </h2>
            <div className="overflow-x-auto rounded-lg border-2 border-[#E5E5E0] dark:border-[#2F3D57]">
              <table className="min-w-full divide-y divide-[#E5E5E0] text-sm sm:text-base dark:divide-[#2F3D57]">
                <thead className="bg-[#FCFAEE] dark:bg-[#1E2A3C]">
                  <tr>
                    {["So'z", "Furigana", "Tarjima", "Audio"].map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left font-semibold text-[#2E2E2E] dark:text-white"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E0] dark:divide-[#2F3D57]">
                  {examples.map((ex, i) => (
                    <tr
                      key={i}
                      className="transition hover:bg-[#FCFAEE] dark:hover:bg-[#1E2A3C]"
                    >
                      <td className="px-4 py-2 text-lg font-semibold text-[#384B70] dark:text-[#F2C46D]">
                        {ex.word}
                      </td>
                      <td className="px-4 py-2 text-[#6B6B6B] dark:text-[#BFC8D8]">
                        {ex.furigana}
                      </td>
                      <td className="px-4 py-2 text-[#6B6B6B] first-letter:uppercase dark:text-[#BFC8D8]">
                        {ex.translation}
                      </td>
                      <td className="px-4 py-2">
                        {ex.audio && (
                          <button
                            onClick={() => playAudio(ex.audio)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#384B70] text-white transition hover:bg-[#2E3E5E] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:bg-[#E8E4D0]"
                          >
                            <img src="../../play.png" alt="play" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* ⬅️➡️ Navigatsiya */}
      <div className="mx-auto mt-10 flex max-w-5xl justify-between">
        {prevKanji ? (
          <motion.button
            onClick={() => navigate(`/kanji/detail/${prevKanji.id}`)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-lg border-2 border-[#E5E5E0] bg-white px-5 py-2 text-[#51648F] shadow-md transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
          >
            <ArrowLeft size={18} /> Oldingi
          </motion.button>
        ) : (
          <div />
        )}

        {nextKanji ? (
          <motion.button
            onClick={() => navigate(`/kanji/detail/${nextKanji.id}`)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-lg border-2 border-[#E5E5E0] bg-white px-5 py-2 text-[#51648F] shadow-md transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
          >
            Keyingi <ArrowRight size={18} />
          </motion.button>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
};

export default KanjiDetailPage;
