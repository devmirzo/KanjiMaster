// src/pages/LevelsPage.jsx
import React, {
  useEffect,
  useState,
  useMemo,
  useTransition,
  useDeferredValue,
} from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import { Error, LevelCard, Loading, SearchCard } from "../components";
import { File, Search } from "lucide-react";

const LevelsPage = () => {
  const navigate = useNavigate();
  const { kanjis, levels, loading, error } = useKanjis();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    document.title = "Bosh sahifa | KanjiMaster";
  }, []);

  const onSearchChange = (e) => {
    const value = e.target.value;
    startTransition(() => setSearch(value));
  };

  const filteredKanjis = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) return [];

    const normalize = (field) => {
      if (!field) return "";
      try {
        if (typeof field === "string" && field.startsWith("[")) {
          return JSON.parse(field).join(", ").toLowerCase();
        }
        if (Array.isArray(field)) return field.join(", ").toLowerCase();
        return field.toString().toLowerCase();
      } catch {
        return field.toLowerCase();
      }
    };

    return kanjis.filter((k) => {
      const kanjiChar = normalize(k.kanji_text);
      const onyomi = normalize(k.onyomi);
      const kunyomi = normalize(k.kunyomi);
      const tarjima = normalize(k.tarjima);
      return (
        kanjiChar.includes(query) ||
        onyomi.includes(query) ||
        kunyomi.includes(query) ||
        tarjima.includes(query)
      );
    });
  }, [deferredSearch, kanjis]);

  if (loading) return <Loading />;
  if (error)
    return (
      <Error
        message={typeof error === "string" ? error : error.message}
        onRetry={() => window.location.reload()}
      />
    );

  const isSearching = deferredSearch.trim().length > 0;

  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-start px-4 py-12 transition-colors duration-300 sm:px-6 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* === Sarlavha === */}
      <motion.h1
        className="mb-6 text-center text-3xl font-bold text-[#2E2E2E] md:text-4xl dark:text-white"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Kanji darajasini tanlang
      </motion.h1>

      {/* === Qidiruv input === */}
      <div className="mb-10 w-full max-w-md">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#7081A1] dark:text-[#F2C46D]"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Kanji, Onyomi, Kunyomi yoki tarjima yozing..."
            value={search}
            onChange={onSearchChange}
            aria-label="Kanji qidiruv maydoni"
            className={`w-full rounded-2xl border-2 border-[#E5E5E0] bg-white py-3 pr-4 pl-12 text-[#2E2E2E] placeholder-[#6B6B6B] shadow-sm transition-all duration-200 outline-none focus:border-[#384B70] focus:ring-2 focus:ring-[#384B70]/20 dark:border-[#2F3D57] dark:bg-[#263347] dark:text-white dark:placeholder-[#BFC8D8] dark:focus:border-[#F2C46D] dark:focus:ring-[#F2C46D]/20 ${
              isPending ? "opacity-70" : ""
            }`}
          />
        </div>
      </div>

      {/* === Natijalar yoki Level kartalar === */}
      {isSearching ? (
        filteredKanjis.length > 0 ? (
          <motion.section
            layout
            className="mx-auto grid w-full max-w-[1600px] grid-cols-2 place-items-center gap-3 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredKanjis.map((kanji, index) => (
                <motion.div
                  key={kanji.id}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.02,
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                  layout
                >
                  <SearchCard kanji={kanji} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>
        ) : (
          // === Bo‘sh natija ===
          <motion.div
            className="relative mt-10 flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <File className="h-36 w-36 text-[#7081A1]/50 dark:text-[#51648F]/50" />
              <motion.div
                className="absolute top-1/2 left-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{
                  x: [0, 10, -10, 8, -5, 0],
                  y: [0, -8, 6, -10, 4, 0],
                  rotate: [0, 10, -8, 6, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Search className="h-16 w-16 text-[#51648F] dark:text-[#F2C46D]" />
              </motion.div>
            </motion.div>
            <h3 className="mt-8 text-2xl font-semibold text-[#2E2E2E] dark:text-white">
              Bu kanji hali bizning galaktikamizda yo‘q 
            </h3>
            <p className="text-md text-[#6B6B6B] dark:text-[#BFC8D8]">
              Boshqa belgini sinab ko‘ring — siz haqiqiy kanji izlovchisiz!
            </p>
          </motion.div>
        )
      ) : (
        // === Level kartalar ===
        <motion.section
          className="mx-auto grid w-full max-w-6xl grid-cols-2 place-items-center gap-4 px-2 py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="region"
          aria-label="Kanji darajalari ro‘yxati"
        >
          {levels.map((lvl, index) => (
            <motion.div
              key={lvl}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.25, delay: index * 0.06 },
              }}
              whileHover={{
                y: -6,
                scale: 1.04,
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/kanji/${lvl}`)}
              className="flex w-[120px] cursor-pointer items-center justify-center rounded-2xl border-2 border-[#E5E5E0] bg-white shadow-md transition-all duration-300 hover:border-[#384B70] sm:w-[130px] md:w-[140px] lg:w-[150px] dark:border-[#2F3D57] dark:bg-[#263347] dark:hover:border-[#F2C46D]"
            >
              <LevelCard level={lvl} />
            </motion.div>
          ))}
        </motion.section>
      )}
    </motion.main>
  );
};

export default LevelsPage;
