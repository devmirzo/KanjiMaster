// src/components/SearchCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ kanji }) => {
  const navigate = useNavigate();

  if (!kanji) return null;

  const parseSafe = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [String(value)];
    }
  };

  const onyomi = parseSafe(kanji.onyomi).join(", ");
  const kunyomi = parseSafe(kanji.kunyomi).join(", ");
  const tarjima = parseSafe(kanji.tarjima).join(", ");

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${kanji.id}`)}
      className="group relative flex h-36 w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#384B70]/40 bg-[#FCFAEE] text-[#384B70] shadow-[0_4px_20px_rgba(56,75,112,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_6px_30px_rgba(56,75,112,0.25)] sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36"
    >
      {/* 🔹 Level Badge */}
      <div className="absolute top-1.5 right-1.5 rounded-tr-2xl rounded-bl-xl bg-[#384B70]/10 px-2.5 py-1 text-[10px] font-semibold text-[#384B70] opacity-100 shadow-md backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        {kanji.level || "N/A"}
      </div>

      {/* 🔹 Kanji belgisi */}
      <span className="mt-2 text-4xl font-light text-[#384B70] drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110">
        {kanji.kanji_text}
      </span>

      {/* 🔹 Tarjima (hover / mobil) */}
      {tarjima && (
        <div className="absolute inset-0 flex flex-col justify-end opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <div className="w-full border-t border-[#384B70]/30 bg-[#FCFAEE]/90 px-2 py-2 text-[11px] text-[#384B70]/80 backdrop-blur-sm sm:text-[12px] md:text-[13px]">
            <p className="truncate text-center font-normal">
              <strong className="font-semibold text-[#384B70]">Tarjima:</strong>{" "}
              {tarjima}
            </p>
          </div>
        </div>
      )}

      {/* 🔹 Hover kontur */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-[#384B70]/40" />
    </div>
  );
};

export default SearchCard;
