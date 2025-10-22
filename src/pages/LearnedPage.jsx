// src/pages/LearnedPage.jsx
import React, { useEffect, useState } from "react";
import { useKanjis } from "../context/KanjiContext";
import { motion, AnimatePresence } from "framer-motion";
import LearnedCard from "../components/LearnedCard";
import { BookOpen, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnedPage = () => {
  const { learned, kanjis, loading } = useKanjis();
  const [learnedKanjis, setLearnedKanjis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "O'rganilganlar | KanjiMaster";
  }, []);

  useEffect(() => {
    if (kanjis.length) {
      setLearnedKanjis(kanjis.filter((k) => learned.includes(k.id)));
    }
  }, [kanjis, learned]);

  return (
    <div className="min-h-screen p-6">
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-36 w-24 animate-pulse rounded-2xl border-2 border-[#E5E5E0] bg-[#4CAF50]/10 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36 dark:border-[#2F3D57] dark:bg-[#7DCE82]/10"
            />
          ))}
        </div>
      ) : learnedKanjis.length > 0 ? (
        <motion.div className="xs:grid-cols-4 grid grid-cols-3 place-items-center gap-2 sm:grid-cols-4 sm:gap-5 md:gap-7 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9">
          <AnimatePresence>
            {learnedKanjis.map((kanji) => (
              <motion.div
                key={kanji.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <LearnedCard kanji={kanji} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-20 text-center">
          <div className="relative mb-4 flex items-center justify-center">
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
            >
              <BookOpen className="h-36 w-36 text-[#4CAF50] dark:text-[#7DCE82]" />
              <motion.div
                className="absolute top-1/2 left-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{
                  x: [0, 15, -15, 10, -10, 0],
                  y: [0, -10, 10, -15, 5, 0],
                  rotate: [0, 15, -10, 10, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Search className="h-16 w-16 text-[#51648F] dark:text-[#F2C46D]" />
              </motion.div>
            </motion.div>
          </div>

          <p className="mt-3 text-lg text-[#2E2E2E] dark:text-white">
            Hozircha o'rganilgan kanjilar yo'q! <br />
            <span className="text-[#6B6B6B] dark:text-[#BFC8D8]">
              Kanjilar bilan tanishing va bilimlaringizni oshiring!
            </span>
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="dark:hover:border-bg-[#6bc76e] rounded-xl border-2 border-[#E5E5E0] bg-white px-6 py-2 text-sm font-semibold text-[#51648F] transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#6bc76e] dark:hover:bg-[#6bc76e] dark:hover:text-[#1E2A3C]"
            >
              Orqaga
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded-xl border-2 border-[#4CAF50] bg-[#4CAF50] px-6 py-2 text-sm font-semibold text-white transition hover:border-[#45a049] hover:bg-[#45a049] dark:border-[#7DCE82] dark:bg-[#7DCE82] dark:text-[#1E2A3C] dark:hover:border-[#6bc76e] dark:hover:bg-[#6bc76e]"
            >
              Bosh sahifaga
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnedPage;
