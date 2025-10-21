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
      className="group relative flex h-36 w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#E5E5E0] bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#51648F] hover:shadow-xl hover:shadow-[#51648F]/20 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36 dark:border-[#2F3D57] dark:bg-[#263347] dark:hover:border-[#F2C46D] dark:hover:shadow-[#F2C46D]/20"
    >
      {/* 🔹 Level Badge */}
      <div className="absolute top-1.5 right-1.5 rounded-tr-2xl rounded-bl-xl border border-[#E5E5E0] bg-[#51648F] px-2.5 py-1 text-[10px] font-semibold text-white opacity-100 shadow-md backdrop-blur-sm transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 dark:border-[#2F3D57] dark:bg-[#F2C46D] dark:text-[#1E2A3C]">
        {kanji.level || "N/A"}
      </div>

      {/* 🔹 Kanji belgisi */}
      <span className="mt-2 text-4xl font-light text-[#384B70] drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110 dark:text-[#FCFAEE]">
        {kanji.kanji_text}
      </span>

      {/* 🔹 Tarjima (hover / mobil) */}
      {tarjima && (
        <div className="absolute inset-0 flex flex-col justify-end opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <div className="w-full border-t-2 border-[#E5E5E0] bg-[#FCFAEE]/95 px-2 py-2 text-[11px] backdrop-blur-sm sm:text-[12px] md:text-[13px] dark:border-[#2F3D57] dark:bg-[#1E2A3C]/95">
            <p className="truncate text-center font-normal text-[#6B6B6B] dark:text-[#BFC8D8]">
              <strong className="font-semibold text-[#51648F] dark:text-[#F2C46D]">
                Tarjima:
              </strong>{" "}
              {tarjima}
            </p>
          </div>
        </div>
      )}

      {/* 🔹 Hover kontur */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-[#51648F]/30 dark:group-hover:border-[#F2C46D]/30" />

      {/* 🔹 Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#51648F]/5 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-[#F2C46D]/5"></div>
    </div>
  );
};

export default SearchCard;
