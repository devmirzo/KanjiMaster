// src/pages/KanjiDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-[#FCFAEE] p-6">
      {/* 🔹 Orqaga tugma */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#384B70] text-[#FCFAEE] rounded-lg hover:bg-[#2C3E5D] transition-colors"
      >
        ← Orqaga
      </button>

      {/* 🔹 Kanji sarlavha */}
      <div className="text-center mb-8">
        <h1 className="text-[9rem] font-light text-[#384B70]">
          {kanji.kanji_text}
        </h1>
        <p className="text-2xl text-gray-600">Daraja: {kanji.level}</p>
      </div>

      {/* 🔹 Asosiy konteyner */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        {/* 🎥 + 🖼️ Yozilish tartibi (video + rasmlar) */}
        {(kanji.stroke_video || kanji.stroke_order_svgs?.length > 0) && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3 text-center">
              Yozilish tartibi
            </h2>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {/* 🎥 Video (chap tomonda) */}
              {kanji.stroke_video && (
                <video
                  src={kanji.stroke_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-40 h-40 object-contain rounded-xl shadow-sm border hover:scale-101 border-gray-300"
                />
              )}

              {/* 🖼️ SVG rasmlar (o‘ng tomonda) */}
              {kanji.stroke_order_svgs?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`stroke-${i}`}
                  className="w-40 h-40 object-contain border border-gray-300 rounded-xl shadow-sm hover:scale-101 transition-transform"
                />
              ))}
            </div>
          </div>
        )}

        {/* 🈷️ Onyomi */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">On’yomi</h2>
          <p className="text-3xl text-[#384B70] mt-2 capitalize">
            {kanji.onyomi?.join(", ")}
          </p>
        </div>

        {/* 🈶 Kunyomi */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Kun’yomi</h2>
          <p className="text-3xl text-[#384B70] mt-2 capitalize">
            {kanji.kunyomi?.join(", ")}
          </p>
        </div>

        {/* 🇯🇵 Tarjima */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Tarjimasi</h2>
          <p className="text-3xl text-[#384B70] mt-2 capitalize">
            {kanji.tarjima?.join(", ")}
          </p>
        </div>

        {/* 📖 Misollar */}
        {examples.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Kanjidan yasalgan so‘zlar
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      So‘z
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Furigana
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Tarjima
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Audio
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {examples.map((ex, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-semibold text-gray-900">
                        {ex.word}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{ex.furigana}</td>
                      <td className="px-4 py-2 text-gray-600">
                        {ex.translation}
                      </td>
                      <td className="px-4 py-2">
                        {ex.audio && (
                          <button
                            onClick={() => new Audio(ex.audio).play()}
                            className="bg-[#384B70] text-white w-10 h-10 flex items-center p-1 justify-center rounded-full hover:bg-[#2C3E5D] hover:scale-110 transition-all duration-200"
                          >
                            <img src="../../public/play.png" alt="" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanjiDetailPage;
