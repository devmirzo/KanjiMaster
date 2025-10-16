import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Kanji Master | About`;
  }, []);

  return (
    <div className="min-h-screen  text-[#2C3E5D] flex flex-col">
      {/* 🔙 Orqaga tugma */}
      <div className="p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-xs sm:text-sm md:text-base rounded-lg bg-[#384B70] text-[#FCFAEE] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          ← Orqaga
        </button>
      </div>

      {/* 🔹 Hero qismi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-4 sm:mt-10 px-3 sm:px-6"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-[#384B70] leading-tight">
          KanjiMast
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#2C3E5D]/80 max-w-md mx-auto leading-relaxed">
          Yapon tili kanjilarini o‘rganish uchun interaktiv platforma
        </p>
      </motion.div>

      {/* 🔹 Asosiy kontent */}
      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 mt-6 sm:mt-10 space-y-6 sm:space-y-10">
        {/* 🔹 Dastur haqida */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-5 sm:p-8 border border-[#384B70]/10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 border-l-4 border-[#384B70] pl-3 leading-snug">
            Nima uchun <span className="text-[#384B70]">KanjiMast?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#2C3E5D]/90">
            KanjiMast – bu oddiy o‘quv dastur emas, balki sizni yapon tiliga
            oshno qiluvchi raqamli do‘stdir. Har bir kanji uchun:
          </p>
          <ul className="list-disc pl-6 mt-3 text-[#2C3E5D]/90 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>Onyomi va Kunyomi o‘qilishi</li>
            <li>Ma’nosi va amaliy misollar</li>
            <li>Yozilish animatsiyasi (GIF)</li>
            <li>N5–N1 darajalargacha tizimlangan o‘rganish</li>
          </ul>
          <p className="mt-4 text-[#2C3E5D]/80 text-sm sm:text-base md:text-lg leading-relaxed">
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
          className="bg-gradient-to-tr from-[#384B70] to-[#2C3E5D] rounded-2xl shadow-xl p-5 sm:p-8 text-[#FCFAEE]"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            👨‍💻 Dasturchi haqida
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 opacity-90">
            Men <span className="font-semibold">Humoyun Mirzo</span> – IT
            Universe Academy asoschisi va frontend dasturchiman. Texnologiya
            orqali o‘rganishni ilhomlantirish va yoshlarni global miqyosda
            raqobatbardosh qilish mening eng katta maqsadim.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-90">
            KanjiMast loyihasi – bu mening yapon tiliga va o‘rganishga bo‘lgan
            muhabbatimning mahsuli. Har bir satr – yangi bilim sari qadam.
          </p>

          {/* 🔹 Ijtimoiy tarmoqlar */}
          <div className="flex justify-center flex-wrap gap-6 sm:gap-8 text-2xl sm:text-3xl mt-6">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-all"
            >
              <FaTelegramPlane />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://github.com/devmirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-all"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
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
          className="text-center mt-6 sm:mt-10 px-3"
        >
          <p className="text-[#2C3E5D]/80 text-sm sm:text-base md:text-lg italic leading-relaxed max-w-md mx-auto">
            “O‘rganish – bu cheksiz yo‘l. Har bir kanji – yangi eshik.”
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
