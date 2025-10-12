// src/pages/LevelsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useKanjis } from "../context/KanjiContext";
import { Error, Loading } from "../components";
const LevelsPage = () => {
  const navigate = useNavigate();
  const { levels, loading, error } = useKanjis();

  if (loading) return <Loading />;

  if (error)
    return (
      <Error
        message={error.message} // Supabase'dan kelgan xabar
        onRetry={() => window.location.reload()} // Qayta yuklash tugmasi
      />
    );

  return (
    <div className="min-h-screen bg-[#FCFAEE] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-[#384B70] mb-8 text-center">
        Kanji Level tanlang
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {levels.map((lvl) => (
          <div
            key={lvl}
            onClick={() => navigate(`/kanji/${lvl}`)}
            className="cursor-pointer relative flex items-center justify-center 
                       w-32 h-32 rounded-3xl shadow-2xl overflow-hidden
                       bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] 
                       text-white text-xl font-bold
                       transform transition-transform duration-300 ease-in-out
                       hover:scale-105 hover:shadow-3xl"
          >
            {lvl}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelsPage;
