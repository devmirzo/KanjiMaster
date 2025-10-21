// src/components/LearnedCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useKanjis } from "../context/KanjiContext";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const LearnedCard = ({ kanji, onRemove }) => {
  const navigate = useNavigate();
  const { toggleLearned } = useKanjis();

  if (!kanji) return null;

  const parseSafe = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return typeof value === "string" ? [value] : [];
    }
  };

  const tarjima = parseSafe(kanji.tarjima).join(", ");

  const handleNavigateLevel = (e) => {
    e.stopPropagation();
    navigate(`/kanji/${kanji.level}`);
  };

  const handleNavigateDetail = (e) => {
    e.stopPropagation();
    navigate(`/kanji/detail/${kanji.id}`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    toggleLearned(kanji.id);
    if (onRemove) onRemove(kanji.id);
  };

  return (
    <motion.div
      onClick={handleNavigateDetail}
      className="group relative flex h-36 w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#E5E5E0] bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#4CAF50] hover:shadow-xl hover:shadow-[#4CAF50]/20 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36 dark:border-[#2F3D57] dark:bg-[#263347] dark:hover:border-[#7DCE82] dark:hover:shadow-[#7DCE82]/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Daraja tugmasi */}
      <button
        onClick={handleNavigateLevel}
        className="absolute top-1.5 right-1.5 rounded-tr-2xl rounded-bl-xl border border-[#E5E5E0] bg-[#4CAF50] px-2.5 py-1 text-[10px] font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-[#45a049] md:opacity-0 md:group-hover:opacity-100 dark:border-[#2F3D57] dark:bg-[#7DCE82] dark:text-[#1E2A3C] dark:hover:bg-[#6bc76e]"
        title={`Daraja: ${kanji.level || "N/A"}`}
      >
        {kanji.level || "N/A"}
      </button>

      {/* Kanji belgisi */}
      <span className="text-4xl font-light text-[#384B70] drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110 dark:text-[#FCFAEE]">
        {kanji.kanji_text}
      </span>

      {/* Tarjima */}
      {tarjima && (
        <div className="absolute inset-0 flex flex-col justify-end opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <div className="w-full border-t-2 border-[#E5E5E0] bg-[#FCFAEE]/95 px-2 py-2 text-[11px] backdrop-blur-sm sm:text-[12px] md:text-[13px] dark:border-[#2F3D57] dark:bg-[#1E2A3C]/95">
            <p className="truncate text-center font-normal text-[#6B6B6B] dark:text-[#BFC8D8]">
              <strong className="font-semibold text-[#4CAF50] dark:text-[#7DCE82]">
                Tarjima:
              </strong>{" "}
              {tarjima}
            </p>
          </div>
        </div>
      )}

      {/* O'chirish tugmasi */}
      <button
        onClick={handleRemove}
        className="absolute top-2 left-2 rounded-full border border-[#E5E5E0] bg-[#E63946]/90 p-1.5 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#E63946] md:group-hover:opacity-100 dark:border-[#2F3D57] dark:bg-[#FF6B6B]/90 dark:hover:bg-[#FF6B6B]"
        title="O'rganilganlardan olib tashlash"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
};

export default LearnedCard;
