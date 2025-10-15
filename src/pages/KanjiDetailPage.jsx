import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { Error, Loading, NotFound } from "../components";

const KanjiDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kanji, setKanji] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKanji = async () => {
      try {
        const { data, error } = await supabase
          .from("kanji")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setKanji(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKanji();
  }, [id]);

  if (loading) return <Loading />;
  if (error)
    return (
      <Error message={error.message} onRetry={() => window.location.reload()} />
    );
  if (!kanji)
    return <NotFound message="Kanji topilmadi." onBack={() => navigate(-1)} />;

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
      className="min-h-screen bg-[#FCFAEE] p-4 sm:p-6 lg:p-10"
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
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-6 px-4 py-2 bg-[#384B70] text-[#FCFAEE] rounded-lg 
                   hover:bg-[#2C3E5D] transition-colors text-sm sm:text-base"
      >
        ← Orqaga
      </motion.button>

      {/* 🔹 Kanji sarlavha */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-[6rem] sm:text-[8rem] lg:text-[10rem] font-light text-[#384B70] leading-none"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {kanji.kanji_text}
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Daraja: {kanji.level}
        </motion.p>
      </motion.div>

      {/* 🔹 Asosiy konteyner */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6 
                   max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* 🎥 Yozilish tartibi */}
        {(kanji.stroke_video || kanji.stroke_order_svgs?.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 text-center">
              Yozilish tartibi
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center">
              {kanji.stroke_video && (
                <motion.video
                  src={kanji.stroke_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl shadow-sm border border-gray-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              )}

              {kanji.stroke_order_svgs?.map((url, i) => (
                <motion.img
                  key={i}
                  src={url}
                  alt={`stroke-${i}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain border border-gray-300 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* 🈷️ Onyomi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            On’yomi
          </h2>
          <p className="text-2xl sm:text-3xl text-[#384B70] mt-2 break-words">
            {kanji.onyomi?.join(", ")}
          </p>
        </motion.div>

        {/* 🈶 Kunyomi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            Kun’yomi
          </h2>
          <p className="text-2xl sm:text-3xl text-[#384B70] mt-2 break-words">
            {kanji.kunyomi?.join(", ")}
          </p>
        </motion.div>

        {/* 🇯🇵 Tarjima */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            Tarjimasi
          </h2>
          <p className="text-2xl sm:text-3xl text-[#384B70] mt-2 break-words first-letter:uppercase">
            {kanji.tarjima?.join(", ")}
          </p>
        </motion.div>

        {/* 📖 Misollar jadvali */}
        {examples.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
              Kanjidan yasalgan so‘zlar
            </h2>
            <div className="overflow-x-auto">
              <motion.table
                className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <thead className="bg-gray-300">
                  <tr>
                    {["So‘z", "Furigana", "Tarjima", "Audio"].map((h, idx) => (
                      <th
                        key={idx}
                        className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-700"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {examples.map((ex, idx) => (
                    <motion.tr
                      key={idx}
                      className="hover:bg-gray-100"
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="px-2 sm:px-4 py-2 text-lg font-semibold text-gray-900 whitespace-nowrap">
                        {ex.word}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-gray-600">
                        {ex.furigana}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-gray-600 first-letter:uppercase">
                        {ex.translation}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {ex.audio && (
                          <motion.button
                            whileHover={{ scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => new Audio(ex.audio).play()}
                            className="bg-[#384B70] text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full p-1 hover:bg-[#2C3E5D] transition-all duration-200"
                          >
                            <img
                              src="../../play.png"
                              alt="play"
                              className="w-4 sm:w-5"
                            />
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default KanjiDetailPage;
