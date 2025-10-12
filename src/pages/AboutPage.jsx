// src/pages/About.jsx
import React from "react";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FCFAEE] p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-[#384B70] text-[#FCFAEE] font-semibold hover:bg-[#2C3E5D] transition-colors"
      >
        ← Orqaga
      </button>
      <div className="max-w-5xl mx-auto">
        {/* 🔹 Sahifa sarlavhasi */}
        <h1 className="text-4xl font-bold text-[#384B70] text-center mb-10">
          Batafsil
        </h1>

        {/* 🔹 Dastur haqida */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-[#384B70] mb-4">
            KanjiMas Dasturi
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            KanjiMas – bu yapon tilidagi kanjilarni o‘rganish uchun
            mo‘ljallangan interaktiv dastur. Ushbu ilova orqali siz kanjilarni
            darajalarga ajratilgan holda ko‘rishingiz, ularning onyomi va
            kunyomi o‘qilishi, ma’nosi, shuningdek misollar bilan
            mustahkamlashingiz mumkin. Dastur N5 darajadan boshlanib, sizga
            bosqichma-bosqich yapon kanjilarini o‘rganish imkonini beradi.
          </p>
        </section>

        {/* 🔹 Dasturchi haqida */}
        <section>
          <h2 className="text-3xl font-semibold text-[#384B70] mb-4">
            Dasturchi: Humoyun Mirzo
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            Men Humoyun Mirzo, IT sohasida faoliyat yurituvchi frontend
            developer. Shu vaqtga qadar bir nechta interaktiv veb-ilovalarni
            ishlab chiqdim, shu jumladan KanjiMas. Maqsadim yoshlarni IT va
            dasturlash bilan tanishtirish va ularni global bozorga
            tayyorlashdir.
          </p>

          {/* 🔹 Ijtimoiy tarmoqlar */}
          <div className="flex space-x-6 text-2xl mt-4">
            <a
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://github.com/devmirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors duration-200"
            >
              <FaGithub />
            </a>
            <a
              href="https://youtube.com/@DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors duration-200"
            >
              <FaYoutube />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
