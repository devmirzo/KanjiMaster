import React from "react";
import { useNavigate } from "react-router-dom";

const KanjiListCard = ({ kanji }) => {
  const navigate = useNavigate();

  if (!kanji) return null;

  // JSON yoki array holatini xavfsiz tarzda boshqarish funksiyasi
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

  // Har bir maydonni parse qilish
  const onyomiArr = parseSafe(kanji.onyomi);
  const kunyomiArr = parseSafe(kanji.kunyomi);
  const tarjimaArr = parseSafe(kanji.tarjima);

  // Arrayni stringga aylantirish
  const onyomi = onyomiArr.join(", ");
  const kunyomi = kunyomiArr.join(", ");
  const tarjima = tarjimaArr.join(", ");

  return (
    <div
      onClick={() => navigate(`/kanji/detail/${kanji.id}`)}
      className="group relative flex h-36 w-24 transform cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#FCFAEE]/20 bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] text-center font-bold text-white shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[#384B70]/40 sm:h-40 sm:w-28 md:h-44 md:w-32 lg:h-48 lg:w-36"
    >
      {/* 🔹 Level badge (border-radiusga mos, hoverda yoki mobil ekranda doimiy ko‘rinadi) */}
      <div className="absolute top-1.5 right-1.5 rounded-tr-2xl rounded-bl-xl bg-[#FCFAEE]/20 px-2.5 py-1 text-[10px] font-semibold text-[#FCFAEE] opacity-100 shadow-md backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        {kanji.level || "N/A"}
      </div>

      {/* 🔹 Kanji belgisi */}
      <span className="text-4xl font-light text-[#FCFAEE] drop-shadow-md transition-transform duration-300 sm:text-5xl md:text-6xl md:group-hover:scale-110">
        {kanji.kanji_text}
      </span>

      {/* 🔹 Tarjima (mobil qurilmalarda doimiy, desktopda hoverda) */}
      <div className="absolute inset-0 flex flex-col justify-end opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        {tarjima && (
          <div className="w-full border-t border-[#FCFAEE]/20 bg-[#FCFAEE]/15 px-2 py-2 text-[11px] text-[#FCFAEE] backdrop-blur-sm sm:text-[12px] md:text-[13px]">
            <p className="truncate text-center font-normal">
              <strong className="font-semibold">Tarjima:</strong> {tarjima}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanjiListCard;
