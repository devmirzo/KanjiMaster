// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useKanjis } from "../context/KanjiContext";
import FavoritesCard from "../components/FavoritesCard";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Search } from "lucide-react";

const FavoritesPage = () => {
  const { user, favorites, kanjis } = useKanjis();
  const [favoriteKanjis, setFavoriteKanjis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sevimlilar | KanjiMaster";
  }, []);

  useEffect(() => {
    if (!user) return setFavoriteKanjis([]);

    if (!kanjis.length) return setLoading(true);

    const filtered = kanjis.filter(
      (k) =>
        favorites.includes(Number(k.id)) || favorites.includes(String(k.id)),
    );

    setFavoriteKanjis(filtered);
    setLoading(false);
  }, [user, favorites, kanjis]);

  const handleRemoveFavorite = (id) => {
    setFavoriteKanjis((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className="min-h-screen p-6">
      {favoriteKanjis.length > 0 && (
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-xl border-2 border-[#384B70] bg-[#384B70] px-4 py-2 font-semibold text-white transition hover:border-[#2E3E5E] hover:bg-[#2E3E5E] dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:border-[#E8E4D0] dark:hover:bg-[#E8E4D0]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} /> Orqaga
        </motion.button>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-36 w-24 animate-pulse rounded-2xl border-2 border-[#E5E5E0] bg-[#7081A1]/10 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36 dark:border-[#2F3D57] dark:bg-[#51648F]/10"
            />
          ))}
        </div>
      ) : favoriteKanjis.length > 0 ? (
        <motion.div className="xs:grid-cols-4 grid grid-cols-3 place-items-center gap-2 sm:grid-cols-4 sm:gap-5 md:gap-7 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9">
          <AnimatePresence>
            {favoriteKanjis.map((kanji) => (
              <motion.div
                key={kanji.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <FavoritesCard kanji={kanji} onRemove={handleRemoveFavorite} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-20 text-center">
          <div className="relative mb-4 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-36 w-36 text-[#E63946] dark:text-[#FF6B6B]" />
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
            Hozircha sevimli kanjilar yo'q! <br />
            <span className="text-[#6B6B6B] dark:text-[#BFC8D8]">
              Kanjilar bilan tanishing – yuragingizni to'ldiring!
            </span>
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border-2 border-[#E5E5E0] bg-white px-6 py-2 text-sm font-semibold text-[#51648F] transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
            >
              Orqaga
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded-xl border-2 border-[#384B70] bg-[#384B70] px-6 py-2 text-sm font-semibold text-white transition hover:border-[#2E3E5E] hover:bg-[#2E3E5E] dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:border-[#E8E4D0] dark:hover:bg-[#E8E4D0]"
            >
              Bosh sahifaga
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
