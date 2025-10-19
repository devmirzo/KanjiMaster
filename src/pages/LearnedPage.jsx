// src/pages/LearnedPage.jsx
import React, { useEffect, useState } from "react";
import { useKanjis } from "../context/KanjiContext";
import { motion, AnimatePresence } from "framer-motion";
import LearnedCard from "../components/LearnedCard";
import { BookOpen, Search } from "lucide-react";

const LearnedPage = () => {
  const { learned, kanjis, loading } = useKanjis();
  const [learnedKanjis, setLearnedKanjis] = useState([]);

  useEffect(() => {
     document.title = "O'rganilganlar | KanjiMaster";
   }, []);
  useEffect(() => {
    if (kanjis.length) {
      setLearnedKanjis(kanjis.filter((k) => learned.includes(k.id)));
    }
  }, [kanjis, learned]);

  return (
    <div className="min-h-screen p-6 text-[#384B70]">
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-36 w-24 animate-pulse rounded-2xl bg-[#384B70]/20 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36"
            />
          ))}
        </div>
      ) : learnedKanjis.length > 0 ? (
        <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
              <BookOpen className="h-36 w-36 text-[#384B70]" />
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
                <Search className="h-16 w-16 text-[#384B70]" />
              </motion.div>
            </motion.div>
          </div>

          <p className="mt-3 text-lg">
            Hozircha o‘rganilgan kanjilar yo‘q! <br />
            Kanjilar bilan tanishing va bilimlaringizni oshiring!
          </p>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="rounded-xl bg-[#384B70] px-6 py-2 text-sm font-semibold text-[#FCFAEE] hover:bg-[#2C3E5D]"
            >
              Orqaga
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-lg bg-[#384B70] px-5 py-2.5 text-sm font-semibold text-[#FCFAEE] hover:bg-[#2C3E5D]"
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
