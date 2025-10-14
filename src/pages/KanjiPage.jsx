import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useKanjis } from "../context/KanjiContext";
import { Error, KanjiCard, Loading } from "../components";


const KanjiPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { kanjis, loading, error } = useKanjis();

  // 🔹 Agar kanjis yoki level hali mavjud bo'lmasa
  if (loading) return <Loading />;
  if (error)
    return (
      <Error
        message={error.message || "Ma'lumot yuklanishda xatolik yuz berdi."}
        onRetry={() => window.location.reload()}
      />
    );

  // 🔹 Filtirlashni xavfsiz bajarish (agar level yoki k.level undefined bo'lsa xatolik bermaydi)
  const filtered = kanjis.filter(
    (k) => k?.level?.toUpperCase?.() === level?.toUpperCase?.()
  );

  return (
    <div className="min-h-screen bg-[#FCFAEE] p-6">
      {/* 🔹 Orqaga tugma */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-[#384B70] text-[#FCFAEE] font-semibold hover:bg-[#2C3E5D] transition-colors"
      >
        ← Orqaga
      </button>

      {/* 🔹 Sarlavha */}
      <h1 className="text-3xl font-bold text-[#384B70] mb-6 text-center">
        Kanji darajasi: {level?.toUpperCase?.() || "Noma’lum"}
      </h1>

      {/* 🔹 Natijani ko‘rsatish */}
      {filtered.length === 0 ? (
        <p className="text-center text-lg text-[#384B70]">
          Bu darajada kanjilar mavjud emas.
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-5">
          {filtered.map((k) => (
            <KanjiCard
              key={k.id}
              id={k.id}
              kanji={k.kanji_text}
              onyomi={k.onyomi}
              kunyomi={k.kunyomi}
              gif={k.gif_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KanjiPage;
