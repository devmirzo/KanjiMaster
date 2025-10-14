// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      {/* 🔙 Orqaga tugma */}
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-[#384B70] text-[#FCFAEE] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          ← Orqaga
        </button>
      </div>

      {/* 🔹 Hero qismi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-10"
      >
        <h1 className="text-5xl font-extrabold mb-3">KanjiMas</h1>
        <p className="text-lg text-[#2C3E5D]/80">
          Yapon tili kanjilarini o‘rganish uchun interaktiv platforma
        </p>
      </motion.div>

      {/* 🔹 Asosiy kontent */}
      <div className="max-w-5xl mx-auto p-6 mt-12">
        {/* 🔹 Dastur haqida */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-10 border border-[#384B70]/10"
        >
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-[#384B70] pl-3">
            Nima uchun <span className="text-[#384B70]">KanjiMas?</span>
          </h2>
          <p className="text-lg leading-relaxed text-[#2C3E5D]/90">
            KanjiMas – bu oddiy o‘quv dastur emas, balki sizni yapon tiliga
            oshno qiluvchi raqamli do‘stdir. Har bir kanji uchun:
          </p>
          <ul className="list-disc pl-8 mt-3 text-[#2C3E5D]/90">
            <li>🎴 Onyomi va Kunyomi o‘qilishi</li>
            <li>🈶 Ma’nosi va amaliy misollar</li>
            <li>🎥 Har bir kanjining yozilish animatsiyasi (GIF)</li>
            <li>🔰 N5–N1 darajalargacha tizimlangan tartibda o‘rganish</li>
          </ul>
          <p className="mt-4 text-[#2C3E5D]/80">
            Dastur sizga asta-sekinlik bilan yapon yozuv tizimini
            o‘zlashtirishda yordam beradi. Maqsad – o‘rganishni oson, esda
            qolarli va zavqli qilish.
          </p>
        </motion.section>

        {/* 🔹 Dasturchi haqida */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] rounded-3xl shadow-xl p-8 text-[#FCFAEE]"
        >
          <h2 className="text-3xl font-bold mb-4">👨‍💻 Dasturchi haqida</h2>
          <p className="text-lg leading-relaxed mb-4 opacity-90">
            Men <span className="font-semibold">Humoyun Mirzo</span> – IT
            Universe Academy asoschisi va frontend dasturchiman. Texnologiya
            orqali o‘rganishni ilhomlantirish va yoshlarni global miqyosda
            raqobatbardosh qilish mening eng katta maqsadim.
          </p>
          <p className="text-lg leading-relaxed opacity-90">
            KanjiMas loyihasi – bu mening yapon tiliga va o‘rganishga bo‘lgan
            muhabbatimning mahsuli. Har bir satr – yangi bilim sari qadam.
          </p>

          {/* 🔹 Ijtimoiy tarmoqlar */}
          <div className="flex justify-center space-x-8 text-3xl mt-8">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-all"
            >
              <FaTelegramPlane />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/devmirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-all"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://youtube.com/@DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-all"
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.section>

        {/* 🔹 Yakuniy so‘z */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-[#2C3E5D]/80 text-lg italic">
            “O‘rganish – bu cheksiz yo‘l. Har bir kanji – yangi eshik.”
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
