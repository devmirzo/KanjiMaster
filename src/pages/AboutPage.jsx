// src/pages/About.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `KanjiMaster | About`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col  transition-colors duration-500">
      {/* 🔙 Orqaga tugma */}
      <div className="p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-[#384B70] px-4 py-2 text-xs font-semibold text-[#FCFAEE] shadow-md transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95 sm:text-sm md:text-base"
        >
          ← Orqaga
        </button>
      </div>

      {/* 🔹 Hero bo‘limi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4 px-3 text-center sm:mt-10 sm:px-6"
      >
        <h1 className="mb-2 text-3xl leading-tight font-extrabold text-[#384B70] sm:text-4xl md:text-5xl">
          KanjiMast
        </h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[#384B70]/70 sm:text-base md:text-lg">
          Yapon tili kanjilarini o‘rganish uchun interaktiv platforma
        </p>
      </motion.div>

      {/* 🔹 Asosiy kontent */}
      <div className="mx-auto mt-8 w-full max-w-4xl space-y-8 p-4 sm:mt-12 sm:space-y-12 sm:p-6">
        {/* 🔸 Dastur haqida */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-2xl border border-[#384B70]/30 bg-[#FCFAEE] p-6 text-[#384B70] shadow-lg sm:p-8"
        >
          <h2 className="mb-3 border-l-4 border-[#384B70] pl-3 text-xl leading-snug font-bold text-[#384B70] sm:mb-4 sm:text-2xl md:text-3xl">
            Nima uchun{" "}
            <span className="font-extrabold text-[#384B70]">KanjiMast?</span>
          </h2>
          <p className="text-sm leading-relaxed text-[#384B70]/70 sm:text-base md:text-lg">
            KanjiMast – bu oddiy o‘quv dastur emas, balki sizni yapon tiliga
            oshno qiluvchi raqamli do‘stdir. Har bir kanji uchun:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm sm:space-y-2 sm:text-base">
            <li>Onyomi va Kunyomi o‘qilishi</li>
            <li>Ma’nosi va amaliy misollar</li>
            <li>Yozilish animatsiyasi (GIF)</li>
            <li>N5–N1 darajalargacha tizimlangan o‘rganish</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-[#384B70]/70 sm:text-base md:text-lg">
            Dastur sizga asta-sekinlik bilan yapon yozuv tizimini
            o‘zlashtirishda yordam beradi. Maqsad – o‘rganishni oson, esda
            qolarli va zavqli qilish.
          </p>
        </motion.section>

        {/* 🔸 Dasturchi haqida */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-tr from-[#384B70]/10 to-[#384B70]/20 p-6 text-[#384B70] shadow-xl sm:p-8"
        >
          <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl">
            Dasturchi haqida
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-[#384B70]/80 sm:text-base md:text-lg">
            Men{" "}
            <span className="font-semibold text-[#384B70]">Humoyun Mirzo</span>{" "}
            – IT Universe Academy asoschisi va frontend dasturchiman.
            Texnologiya orqali o‘rganishni ilhomlantirish va yoshlarni global
            miqyosda raqobatbardosh qilish mening eng katta maqsadim.
          </p>
          <p className="text-sm leading-relaxed text-[#384B70]/80 sm:text-base md:text-lg">
            KanjiMast loyihasi – bu mening yapon tiliga va o‘rganishga bo‘lgan
            muhabbatimning mahsuli. Har bir satr – yangi bilim sari qadam.
          </p>

          {/* 🔸 Ijtimoiy tarmoqlar */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-2xl sm:gap-8 sm:text-3xl">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#384B70] transition-all hover:text-[#1B2A4A]"
            >
              <FaTelegramPlane />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://github.com/devmirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#384B70] transition-all hover:text-[#1B2A4A]"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://youtube.com/@DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B6B] transition-all hover:text-[#C24444]"
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.section>

        {/* 🔸 Yakuniy so‘z */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 px-3 text-center sm:mt-10"
        >
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[#384B70]/70 italic sm:text-base md:text-lg">
            “O‘rganish – bu cheksiz yo‘l. Har bir kanji – yangi eshik.”
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
