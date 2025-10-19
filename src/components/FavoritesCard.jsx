// src/components/FavoritesCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useKanjis } from "../context/KanjiContext";

const FavoritesCard = ({ kanji, onRemove }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useKanjis();

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

  const handleRemove = (e) => {
    e.stopPropagation();
    toggleFavorite(kanji.id);
    if (onRemove) onRemove(kanji.id);
  };

  const handleNavigateLevel = (e) => {
    e.stopPropagation();
    navigate(`/kanji/${kanji.level}`);
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    navigate(`/kanji/detail/${kanji.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group relative flex h-36 w-24 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#384B70]/30 bg-[#FCFAEE] text-center font-bold text-[#384B70] shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[#384B70]/30 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36"
    >
      {/* 🔹 Daraja tugmasi */}
      <button
        onClick={handleNavigateLevel}
        className="absolute top-1.5 right-1.5 rounded-tr-2xl rounded-bl-xl bg-[#384B70]/10 px-2.5 py-1 text-[10px] font-semibold text-[#384B70] shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-[#384B70]/20 md:opacity-0 md:group-hover:opacity-100"
        title={`Daraja: ${kanji.level || "N/A"}`}
      >
        {kanji.level || "N/A"}
      </button>

      {/* 🔹 Kanji belgisi */}
      <span className="text-4xl font-light drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110">
        {kanji.kanji_text}
      </span>

      {/* 🔹 Tarjima */}
      {tarjima && (
        <div className="absolute inset-0 flex flex-col justify-end opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <div className="w-full border-t border-[#384B70]/30 bg-[#FCFAEE]/80 px-2 py-2 text-[11px] text-[#384B70]/80 backdrop-blur-sm sm:text-[12px] md:text-[13px]">
            <p className="truncate text-center font-normal">
              <strong className="font-semibold text-[#384B70]">Tarjima:</strong>{" "}
              {tarjima}
            </p>
          </div>
        </div>
      )}

      {/* 🔹 O‘chirish tugmasi */}
      <button
        onClick={handleRemove}
        className="absolute top-2 left-2 rounded-full bg-[#384B70]/10 p-1.5 text-[#384B70] opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-[#384B70]/20 md:group-hover:opacity-100"
        title="Sevimlilardan olib tashlash"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default FavoritesCard;
