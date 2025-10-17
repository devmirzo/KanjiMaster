import React, { useEffect, useState, useMemo, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import { Error, LevelCard, Loading, KanjiListCard } from "../components";
import { File, FileCog, Search } from "lucide-react";

const LevelsPage = () => {
  const navigate = useNavigate();
  const { kanjis, levels, loading, error } = useKanjis();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  // const levels = ["N1", "N2", "N3", "N4", "N5"];

  useEffect(() => {
    document.title = "Bosh sahifa | KanjiMaster";
  }, []);

  // 🔹 Input uchun kechiktirilgan o‘zgarish
  const onSearchChange = (e) => {
    const value = e.target.value;
    startTransition(() => setSearch(value));
  };

  // 🔹 Qidiruv natijalarini tez filtrlash
  const filteredKanjis = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];

    const parseField = (field) => {
      if (!field) return "";
      if (Array.isArray(field)) return field.join(", ");
      if (typeof field === "string" && field.startsWith("[")) {
        try {
          return JSON.parse(field).join(", ");
        } catch {
          return field;
        }
      }
      return field.toString();
    };

    return kanjis.filter((k) => {
      const kanjiChar = (k.kanji_text || "").toLowerCase();
      const onyomi = parseField(k.onyomi).toLowerCase();
      const kunyomi = parseField(k.kunyomi).toLowerCase();
      const tarjima = parseField(k.tarjima).toLowerCase();

      return (
        kanjiChar.includes(query) ||
        onyomi.includes(query) ||
        kunyomi.includes(query) ||
        tarjima.includes(query)
      );
    });
  }, [search, kanjis]);

  if (loading) return <Loading />;
  if (error)
    return (
      <Error
        message={typeof error === "string" ? error : error.message}
        onRetry={() => window.location.reload()}
      />
    );

  const isSearching = search.trim().length > 0;

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-start bg-[#FCFAEE] px-4 py-12 sm:px-6 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* 🔹 Sarlavha */}
      <motion.h1
        className="mb-6 text-center text-3xl font-bold text-[#384B70] md:text-4xl"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Kanji darajasini tanlang
      </motion.h1>

      {/* 🔹 Qidiruv input */}
      <div className="mb-10 w-full max-w-md">
        <input
          type="text"
          placeholder="Kanji, Onyomi, Kunyomi yoki tarjima yozing..."
          value={search}
          onChange={onSearchChange}
          className={`w-full rounded-2xl border border-[#384B70]/30 bg-white px-4 py-3 text-[#384B70] shadow-sm transition outline-none focus:border-[#384B70] focus:ring-2 focus:ring-[#384B70]/20 ${
            isPending ? "opacity-70" : ""
          }`}
        />
      </div>

      {/* 🔹 Natijalar yoki Level kartalar */}
      {isSearching ? (
        filteredKanjis.length > 0 ? (
          <motion.div
            layout
            className="mx-auto grid w-full max-w-[1600px] grid-cols-2 place-items-center gap-3 px-2 sm:grid-cols-3 sm:gap-4 sm:px-4 md:grid-cols-4 md:gap-6 md:px-6 lg:grid-cols-6 lg:gap-8 lg:px-8 xl:grid-cols-7 xl:gap-10 xl:px-10 2xl:grid-cols-8 2xl:gap-12 2xl:px-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredKanjis.map((kanji, index) => (
                <motion.div
                  key={kanji.id}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 180,
                    damping: 14,
                  }}
                  layout
                >
                  <KanjiListCard kanji={kanji} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="relative flex flex-col items-center text-center">
            {/* File icon with animation */}
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
              <File className="h-36 w-36 text-[#384b70]" />

              {/* Floating Search icon */}
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
                <Search className="h-16 w-16 text-[#e14d17]" />
              </motion.div>
            </motion.div>

            {/* Static text message */}
            <p className="mt-8 text-2xl font-medium text-[#384B70]">
              Bu kanji hali bizning galaktikamizda yo‘q 
            </p>
            <span className="text-md text-[#6b7b9b]">
              Boshqa belgini qidirib ko‘ring — siz haqiqiy kanji izlovchisiz 
            </span>
          </div>
        )
      ) : (
        <motion.div
          className="mx-auto grid w-full max-w-6xl grid-cols-2 place-items-center gap-4 px-2 py-6 sm:grid-cols-3 md:grid-cols-4 md:px-6 lg:grid-cols-5 lg:px-8 xl:grid-cols-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", staggerChildren: 0.1 }}
        >
          {levels.map((lvl, index) => (
            <motion.div
              className="mx-auto grid w-full max-w-6xl grid-cols-2 place-items-center gap-4 px-2 py-6 sm:grid-cols-3 md:grid-cols-4 md:px-6 lg:grid-cols-5 lg:px-8 xl:grid-cols-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {levels.map((lvl, index) => (
                <motion.div
                  key={lvl}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth ease
                      delay: index * 0.08,
                    },
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/kanji/${lvl}`)}
                  className="flex w-[120px] cursor-pointer items-center justify-center drop-shadow-md transition-all duration-300 hover:drop-shadow-xl sm:w-[130px] md:w-[140px] lg:w-[150px]"
                >
                  <LevelCard level={lvl} />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LevelsPage;
