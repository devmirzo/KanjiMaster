// src/pages/KanjiDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Error, Loading } from "../components";

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
      <Error
        message={error.message} // Supabase'dan kelgan xabar
        onRetry={() => window.location.reload()} // Qayta yuklash tugmasi
      />
    );

  if (!kanji)
    return (
      <NotFound
        message="Kanji topilmadi."
        onBack={() => navigate(-1)} // Oldingi sahifaga qaytaradi
      />
    );

  return (
    <div className="min-h-screen bg-[#FCFAEE] p-6">
      {/* 🔹 Back tugmasi */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#384B70] text-[#FCFAEE] rounded-lg hover:bg-[#2C3E5D] transition-colors"
      >
        ← Orqaga
      </button>

      {/* 🔹 Kanji va tafsilotlar */}
      <div className="px-4 sm:px-0 mb-6">
        <h3 className="text-9xl font-light text-[#384B70]">{kanji.kanji}</h3>
        <p className="mt-9 text-3xl text-gray-900">Kanji tafsilotlari</p>
      </div>

      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {/* Onyomi */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-3xl font-medium text-gray-500">Onyomi</dt>
            <dd className="mt-1 text-4xl font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
              {kanji.onyomi}
            </dd>
          </div>

          {/* Kunyomi */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-3xl font-medium text-gray-500">Kunyomi</dt>
            <dd className="mt-1 text-4xl font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
              {kanji.kunyomi}
            </dd>
          </div>

          {/* Meaning */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-3xl font-medium text-gray-500">Tarjimasi</dt>
            <dd className="mt-1 text-4xl font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
              {kanji.meaning}
            </dd>
          </div>

          {/* Level */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-3xl font-medium text-gray-500">Daraja</dt>
            <dd className="mt-1 text-4xl font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
              {kanji.level}
            </dd>
          </div>

          {/* Onyomi Examples */}
          {kanji.onyomi_examples && kanji.onyomi_examples.length > 0 && (
            <div className="px-4 py-6 sm:px-0">
              <h3 className="text-3xl font-medium text-gray-500 mb-2">
                Onyomiga misollar
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        So'z
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 pl-12">
                        Ma'nosi
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Furigana
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {kanji.onyomi_examples.map((ex, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-2 text-gray-900 font-semibold">
                          {ex.word}
                        </td>
                        <td className="px-4 py-2 text-gray-700 pl-12">
                          {ex.meaning}
                        </td>
                        <td className="px-4 py-2 text-gray-500">
                          {ex.furigana}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Kunyomi Examples */}
          {kanji.kunyomi_examples && kanji.kunyomi_examples.length > 0 && (
            <div className="px-4 py-6 sm:px-0">
              <h3 className="text-3xl font-medium text-gray-500 mb-2">
                Kunyomiga misollar
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        So'z
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 pl-12">
                        Ma'nosi
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Furigana
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {kanji.kunyomi_examples.map((ex, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-2 text-gray-900 font-semibold">
                          {ex.word}
                        </td>
                        <td className="px-4 py-2 text-gray-700 pl-12">
                          {ex.meaning}
                        </td>
                        <td className="px-4 py-2 text-gray-500">
                          {ex.furigana}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default KanjiDetailPage;
