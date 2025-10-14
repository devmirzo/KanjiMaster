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

  // 🔹 Sahifa chiqish effekti
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
      className="min-h-screen bg-[#FCFAEE] p-6"
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
        className="mb-6 px-4 py-2 bg-[#384B70] text-[#FCFAEE] rounded-lg hover:bg-[#2C3E5D] transition-colors"
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
          className="text-[9rem] font-light text-[#384B70]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {kanji.kanji_text}
        </motion.h1>
        <motion.p
          className="text-2xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Daraja: {kanji.level}
        </motion.p>
      </motion.div>

      {/* 🔹 Asosiy konteyner */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
              Yozilish tartibi
            </h2>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {kanji.stroke_video && (
                <motion.video
                  src={kanji.stroke_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-20 h-w-20 object-contain rounded-xl shadow-sm border border-gray-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              )}

              {kanji.stroke_order_svgs?.map((url, i) => (
                <motion.img
                  key={i}
                  src={url}
                  alt={`stroke-${i}`}
                  className="w-20 h-w-20 object-contain border border-gray-300 rounded-xl shadow-sm"
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
          <h2 className="text-2xl font-semibold text-gray-700">On’yomi</h2>
          <p className="text-3xl text-[#384B70] mt-2 capitalize">
            {kanji.onyomi?.join(", ")}
          </p>
        </motion.div>

        {/* 🈶 Kunyomi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">Kun’yomi</h2>
          <p className="text-3xl text-[#384B70] mt-2 capitalize">
            {kanji.kunyomi?.join(", ")}
          </p>
        </motion.div>

        {/* 🇯🇵 Tarjima */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700">Tarjimasi</h2>
          <p className="text-3xl text-[#384B70] mt-2 first-letter:uppercase">
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Kanjidan yasalgan so‘zlar
            </h2>
            <div className="overflow-x-hidden ">
              <motion.table
                className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <thead className="bg-gray-100">
                  <tr>
                    {["So‘z", "Furigana", "Tarjima", "Audio"].map((h, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-2 text-left font-semibold text-gray-700"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {examples.map((ex, idx) => (
                    <motion.tr
                      key={idx}
                      className="hover:bg-gray-50"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <td className="px-4 py-2 text-2xl font-semibold text-gray-900">
                        {ex.word}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{ex.furigana}</td>
                      <td className="px-4 py-2 text-gray-600 first-letter:uppercase">
                        {ex.translation}
                      </td>
                      <td className="px-4 py-2">
                        {ex.audio && (
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => new Audio(ex.audio).play()}
                            className="bg-[#384B70] text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2C3E5D] transition-all duration-200"
                          >
                            ▶
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
