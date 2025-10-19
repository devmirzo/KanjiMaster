// src/pages/KanjiDetailPage.jsx
import React, { useEffect } from "react";
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
import { Error, Loading,  } from "../components";

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

  const kanji = kanjis.find((k) => String(k.id) === String(id));
  const currentIndex = kanjis.findIndex((k) => String(k.id) === String(id));
  const prevKanji = kanjis[currentIndex - 1];
  const nextKanji = kanjis[currentIndex + 1];

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
    return <NotFound message="Kanji topilmadi." onBack={() => navigate(-1)} />;

  const isFavorite = favorites.includes(kanji.id);
  const isLearned = learned.includes(kanji.id);
  const examples = Array.isArray(kanji.examples)
    ? kanji.examples
    : JSON.parse(kanji.examples || "[]");

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
      className="min-h-screen  p-6 text-[#384B70] sm:p-8 lg:p-12"
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
        className="mb-6 flex items-center gap-2 rounded-lg text-[#384B70] px-5 py-2 font-medium bg-[#FCFAEE] shadow-md transition hover:text-[#2f3d5c]"
      >
        <ArrowLeft className="h-5 w-5" />
        Orqaga
      </motion.button>

      {/* 🔹 Kanji belgisi */}
      <motion.div className="mb-10 text-center">
        <motion.h1 className="text-[7rem] leading-none font-light drop-shadow-md sm:text-[9rem] lg:text-[11rem]">
          {kanji.kanji_text}
        </motion.h1>
      </motion.div>

      {/* 🔹 Daraja va holatlar */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <motion.button
          onClick={() => navigate(`/kanji/${kanji.level}`)}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#384B70] bg-[#FCFAEE] px-6 py-1 text-lg font-medium text-[#384B70] transition hover:bg-[#eae7d8]"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#384B70]" />
          {kanji.level} daraja
        </motion.button>

        <div className="mt-3 flex">
          {/* ❤️ Sevimli */}
          <motion.button
            onClick={() => toggleFavorite(kanji.id)}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-center rounded-l-full border border-[#384B70] px-7 py-2 transition-all ${
              isFavorite
                ? "bg-[#384B70] text-[#FCFAEE]"
                : "bg-[#FCFAEE] text-[#384B70] hover:bg-[#eae7d8]"
            }`}
          >
            {isFavorite ? <HeartOff size={20} /> : <Heart size={20} />}
          </motion.button>

          {/* 📗 O‘rganilgan */}
          <motion.button
            onClick={() => toggleLearned(kanji.id)}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-center rounded-r-full border border-[#384B70] px-7 py-2 transition-all ${
              isLearned
                ? "bg-[#384B70] text-[#FCFAEE]"
                : "bg-[#FCFAEE] text-[#384B70] hover:bg-[#eae7d8]"
            }`}
          >
            {isLearned ? <BookOpenCheck size={20} /> : <BookOpen size={20} />}
          </motion.button>
        </div>
      </div>

      {/* 🔹 Asosiy konteyner */}
      <motion.div className="mx-auto max-w-5xl space-y-6 rounded-2xl border border-[#384B70]/40 bg-white p-6 shadow-lg">
        {/* ✍️ Yozilish tartibi */}
        {(kanji.stroke_video || kanji.stroke_order_svgs?.length > 0) && (
          <div className="text-center">
            <h2 className="mb-3 text-xl font-semibold">Yozilish tartibi</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {kanji.stroke_video && (
                <video
                  src={kanji.stroke_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-20 w-20 rounded-xl border border-[#384B70]/30 object-contain shadow-sm"
                />
              )}
              {kanji.stroke_order_svgs?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`stroke-${i}`}
                  className="h-20 w-20 rounded-xl border border-[#384B70]/30 object-contain shadow-sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* 🈷️ On’yomi */}
        <div>
          <h2 className="text-xl font-semibold">On’yomi</h2>
          <p className="mt-2 text-2xl break-words">{kanji.onyomi}</p>
        </div>

        {/* 🈶 Kun’yomi */}
        <div>
          <h2 className="text-xl font-semibold">Kun’yomi</h2>
          <p className="mt-2 text-2xl break-words">{kanji.kunyomi}</p>
        </div>

        {/* 🇯🇵 Tarjima */}
        <div>
          <h2 className="text-xl font-semibold">Tarjimasi</h2>
          <p className="mt-2 text-2xl first-letter:uppercase">
            {Array.isArray(kanji.tarjima)
              ? kanji.tarjima.join(", ")
              : kanji.tarjima}
          </p>
        </div>

        {/* 📖 Misollar */}
        {examples.length > 0 && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">
              Kanjidan yasalgan so‘zlar
            </h2>
            <div className="overflow-x-auto rounded-lg border border-[#384B70]/40">
              <table className="min-w-full divide-y divide-[#384B70]/30 text-sm sm:text-base">
                <thead className="bg-[#eae7d8]">
                  <tr>
                    {["So‘z", "Furigana", "Tarjima", "Audio"].map((h, i) => (
                      <th key={i} className="px-4 py-2 text-left font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {examples.map((ex, i) => (
                    <tr key={i} className="transition hover:bg-[#384B70]/10">
                      <td className="px-4 py-2 text-lg font-semibold">
                        {ex.word}
                      </td>
                      <td className="px-4 py-2">{ex.furigana}</td>
                      <td className="px-4 py-2 first-letter:uppercase">
                        {ex.translation}
                      </td>
                      <td className="px-4 py-2">
                        {ex.audio && (
                          <button
                            onClick={() => new Audio(ex.audio).play()}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#384B70] text-[#FCFAEE] hover:bg-[#2f3d5c]"
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
            className="flex items-center gap-2 rounded-lg text-[#384B70] px-5 py-2 bg-[#FCFAEE] shadow-md transition hover:text-[#2f3d5c]"
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
            className="flex items-center gap-2 rounded-lg text-[#384B70] px-5 py-2 bg-[#FCFAEE] shadow-md transition hover:text-[#2f3d5c]"
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
