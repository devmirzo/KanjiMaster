// src/pages/About.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `KanjiMaster | About`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-500">
      {/* 🔙 Orqaga tugma */}
      <div className="p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border-2 border-[#384B70] bg-[#384B70] px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:border-[#2E3E5E] hover:bg-[#2E3E5E] active:scale-95 sm:text-sm md:text-base dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:border-[#E8E4D0] dark:hover:bg-[#E8E4D0]"
        >
          ← Orqaga
        </button>
      </div>

      {/* 🔹 Hero bo'limi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4 px-3 text-center sm:mt-10 sm:px-6"
      >
        <h1 className="mb-2 text-3xl leading-tight font-extrabold text-[#384B70] sm:text-4xl md:text-5xl dark:text-[#FCFAEE]">
          KanjiMast
        </h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[#6B6B6B] sm:text-base md:text-lg dark:text-[#BFC8D8]">
          Yapon tili kanjilarini o'rganish uchun interaktiv platforma
        </p>
      </motion.div>

      {/* 🔹 Asosiy kontent */}
      <div className="mx-auto mt-8 w-full max-w-4xl space-y-8 p-4 sm:mt-12 sm:space-y-12 sm:p-6">
        {/* 🔸 Dastur haqida */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-2xl border-2 border-[#E5E5E0] bg-white p-6 shadow-lg sm:p-8 dark:border-[#2F3D57] dark:bg-[#263347]"
        >
          <h2 className="mb-3 border-l-4 border-[#384B70] pl-3 text-xl leading-snug font-bold text-[#2E2E2E] sm:mb-4 sm:text-2xl md:text-3xl dark:border-[#F2C46D] dark:text-white">
            Nima uchun{" "}
            <span className="font-extrabold text-[#384B70] dark:text-[#F2C46D]">
              KanjiMast?
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-[#6B6B6B] sm:text-base md:text-lg dark:text-[#BFC8D8]">
            KanjiMast – bu oddiy o'quv dastur emas, balki sizni yapon tiliga
            oshno qiluvchi raqamli do'stdir. Har bir kanji uchun:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-[#6B6B6B] sm:space-y-2 sm:text-base dark:text-[#BFC8D8]">
            <li>Onyomi va Kunyomi o'qilishi</li>
            <li>Ma'nosi va amaliy misollar</li>
            <li>Yozilish animatsiyasi (GIF)</li>
            <li>N5–N1 darajalargacha tizimlangan o'rganish</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] sm:text-base md:text-lg dark:text-[#BFC8D8]">
            Dastur sizga asta-sekinlik bilan yapon yozuv tizimini
            o'zlashtirishda yordam beradi. Maqsad – o'rganishni oson, esda
            qolarli va zavqli qilish.
          </p>
        </motion.section>

        {/* 🔸 Dasturchi haqida */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-2xl border-2 border-[#E5E5E0] bg-gradient-to-tr from-[#384B70]/5 via-[#7081A1]/5 to-[#F2C46D]/5 p-6 shadow-xl sm:p-8 dark:border-[#2F3D57] dark:from-[#51648F]/10 dark:via-[#F2C46D]/10 dark:to-[#F2C46D]/5"
        >
          <h2 className="mb-3 text-xl font-bold text-[#2E2E2E] sm:mb-4 sm:text-2xl md:text-3xl dark:text-white">
            Dasturchi haqida
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-[#6B6B6B] sm:text-base md:text-lg dark:text-[#BFC8D8]">
            Men{" "}
            <span className="font-semibold text-[#384B70] dark:text-[#F2C46D]">
              Humoyun Mirzo
            </span>{" "}
            – IT Universe Academy asoschisi va frontend dasturchiman.
            Texnologiya orqali o'rganishni ilhomlantirish va yoshlarni global
            miqyosda raqobatbardosh qilish mening eng katta maqsadim.
          </p>
          <p className="text-sm leading-relaxed text-[#6B6B6B] sm:text-base md:text-lg dark:text-[#BFC8D8]">
            KanjiMast loyihasi – bu mening yapon tiliga va o'rganishga bo'lgan
            muhabbatimning mahsuli. Har bir satr – yangi bilim sari qadam.
          </p>

          {/* 🔸 Ijtimoiy tarmoqlar */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-2xl sm:gap-8 sm:text-3xl">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#51648F] transition-all hover:text-[#2E3E5E] dark:text-[#F2C46D] dark:hover:text-[#E8E4D0]"
            >
              <FaTelegramPlane />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://github.com/devmirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#51648F] transition-all hover:text-[#2E3E5E] dark:text-[#F2C46D] dark:hover:text-[#E8E4D0]"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://youtube.com/@DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#51648F] transition-all hover:text-[#2E3E5E] dark:text-[#F2C46D] dark:hover:text-[#E8E4D0]"
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.section>

        {/* 🔸 Yakuniy so'z */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 px-3 text-center sm:mt-10"
        >
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[#6B6B6B] italic sm:text-base md:text-lg dark:text-[#BFC8D8]">
            "O'rganish – bu cheksiz yo'l. Har bir kanji – yangi eshik."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
