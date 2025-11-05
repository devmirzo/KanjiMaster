// src/pages/About.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `KanjiMaster | About`;
  }, []);

  return (
    <div className=" min-h-screen flex-col bg-[#FCFAEE] transition-colors duration-500 dark:bg-[#1E2A3C]">
      {/* 🔙 Orqaga tugma */}
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 ml-6 flex items-center gap-2 rounded-lg border-2 border-[#E5E5E0] bg-white px-5 py-2 font-medium text-[#51648F] shadow-md transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
      >
        <ArrowLeft className="h-5 w-5" />
        Orqaga
      </motion.button>

      {/* 🔹 Hero bo'limi */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 px-6 text-center sm:mt-20"
      >
        <h1 className="mb-4 text-4xl font-extrabold text-[#384B70] sm:text-5xl md:text-6xl dark:text-[#FCFAEE]">
          KanjiMast
        </h1>
        <p className="mx-auto max-w-lg text-lg leading-relaxed text-[#6B6B6B] sm:text-xl md:text-2xl dark:text-[#BFC8D8]">
          Yapon tili kanjilarini o'rganish uchun interaktiv platforma
        </p>
      </motion.div>

      {/* 🔹 Asosiy kontent */}
      <div className="mx-auto mt-12 w-full max-w-5xl space-y-12 px-4 sm:px-6">
        {/* 🔸 Nima uchun KanjiMast */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-3xl border border-transparent bg-white p-8 shadow-xl dark:bg-[#263347] dark:shadow-[#00000080]"
        >
          <h2 className="mb-4 text-2xl font-bold text-[#384B70] sm:text-3xl md:text-4xl dark:text-[#F2C46D]">
            Nima uchun <span className="font-extrabold">KanjiMast?</span>
          </h2>
          <p className="mb-4 text-base leading-relaxed text-[#6B6B6B] sm:text-lg md:text-xl dark:text-[#BFC8D8]">
            KanjiMast – bu oddiy o'quv dastur emas, balki sizni yapon tiliga
            oshno qiluvchi raqamli do'stdir. Har bir kanji uchun:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-base text-[#6B6B6B] sm:text-lg md:text-xl dark:text-[#BFC8D8]">
            <li>Onyomi va Kunyomi o'qilishi</li>
            <li>Ma'nosi va amaliy misollar</li>
            <li>Yozilish animatsiyasi (GIF)</li>
            <li>N5–N1 darajalargacha tizimlangan o'rganish</li>
          </ul>
          <p className="text-base leading-relaxed text-[#6B6B6B] sm:text-lg md:text-xl dark:text-[#BFC8D8]">
            Dastur sizga asta-sekinlik bilan yapon yozuv tizimini
            o'zlashtirishda yordam beradi. Maqsad – o'rganishni oson, esda
            qolarli va zavqli qilish.
          </p>
        </motion.section>

        {/* 🔸 Dasturchi haqida */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-tr from-[#384B70]/10 via-[#7081A1]/10 to-[#F2C46D]/10 p-8 shadow-2xl dark:from-[#51648F]/15 dark:via-[#F2C46D]/15 dark:to-[#F2C46D]/10"
        >
          <h2 className="mb-4 text-2xl font-bold text-[#384B70] sm:text-3xl md:text-4xl dark:text-[#F2C46D]">
            Dasturchi haqida
          </h2>
          <p className="mb-3 text-base leading-relaxed text-[#6B6B6B] sm:text-lg md:text-xl dark:text-[#BFC8D8]">
            Men{" "}
            <span className="font-semibold text-[#384B70] dark:text-[#F2C46D]">
              Humoyun Mirzo
            </span>{" "}
            – IT Universe Academy asoschisi va frontend dasturchiman.
            Texnologiya orqali o'rganishni ilhomlantirish va yoshlarni global
            miqyosda raqobatbardosh qilish mening eng katta maqsadim.
          </p>
          <p className="mb-6 text-base leading-relaxed text-[#6B6B6B] sm:text-lg md:text-xl dark:text-[#BFC8D8]">
            KanjiMast loyihasi – bu mening yapon tiliga va o'rganishga bo'lgan
            muhabbatimning mahsuli. Har bir satr – yangi bilim sari qadam.
          </p>

          {/* 🔸 Ijtimoiy tarmoqlar */}
          <div className="flex justify-center gap-8 text-3xl sm:text-4xl">
            {[
              {
                href: "https://t.me/DevMirzo",
                icon: FaTelegramPlane,
              },
              {
                href: "https://github.com/devmirzo",
                icon: FaGithub,
              },
              {
                href: "https://youtube.com/@DevMirzo",
                icon: FaYoutube,
              },
            ].map(({ href, icon: Icon }, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#384B70] transition-colors hover:text-[#2E3E5E] dark:text-[#F2C46D] dark:hover:text-[#FCFAEE]"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* 🔸 Yakuniy so'z */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 px-4 text-center"
        >
          <p className="mx-auto max-w-lg text-lg text-[#6B6B6B] italic sm:text-xl md:text-2xl dark:text-[#BFC8D8]">
            "O'rganish – bu cheksiz yo'l. Har bir kanji – yangi eshik."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
