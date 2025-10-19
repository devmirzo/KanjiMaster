import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, logout, kanjis, favorites, learned } = useKanjis();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profil | KanjiMaster";
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Tizimdan chiqdingiz 👋");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Chiqishda xatolik yuz berdi!");
    }
  };

  const favoriteKanjis = kanjis.filter((k) => favorites.includes(k.id));
  const learnedKanjis = kanjis.filter((k) => learned.includes(k.id));

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center p-4 text-[#384B70] sm:p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center rounded-3xl border border-[#384B70]/20 bg-[#FCFAEE]/90 p-6 text-center shadow-2xl sm:max-w-lg sm:p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Profil rasmi */}
        <motion.div
          className="group relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img
            src={
              user.photoURL ||
              "https://www.svgrepo.com/show/452030/avatar-default.svg"
            }
            alt={user.displayName || "User"}
            className="h-28 w-28 rounded-full border-4 border-[#384B70]/60 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-32"
          />
        </motion.div>

        {/* Ism */}
        <motion.h2
          className="text-2xl font-bold sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {user.displayName || "Foydalanuvchi"}
        </motion.h2>

        {/* Email */}
        <motion.p
          className="mt-2 text-sm break-all sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user.email}
        </motion.p>

        {/* Hisob turi */}
        <motion.p
          className="mt-1 text-xs italic sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {user.providerData?.[0]?.providerId === "google.com"
            ? "Google orqali kirilgan"
            : "Qo‘lda ro‘yxatdan o‘tilgan"}
        </motion.p>

        <div className="my-6 w-full border-t border-[#384B70]/20"></div>

        {/* Sevimli kanjilar */}
        <div className="mb-4 w-full text-left">
          <h3 className="mb-2 text-lg font-semibold"> Sevimli kanjilar</h3>
          {favoriteKanjis.length === 0 ? (
            <p className="text-sm text-[#384B70]/50">
              Hech qanday sevimli kanji yo‘q.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {favoriteKanjis.map((k) => (
                <motion.div
                  key={k.id}
                  className="cursor-pointer rounded-full border border-[#384B70]/30 bg-[#384B70]/10 px-3 py-1 text-sm text-[#384B70] transition hover:bg-[#384B70]/30"
                  onClick={() => navigate(`/kanji/detail/${k.id}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {k.kanji_text}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* O‘rganilgan kanjilar */}
        <div className="mb-6 w-full text-left">
          <h3 className="mb-2 text-lg font-semibold">O‘rganilgan kanjilar</h3>
          {learnedKanjis.length === 0 ? (
            <p className="text-sm text-[#384B70]/50">
              Hech qanday o‘rganilgan kanji yo‘q.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {learnedKanjis.map((k) => (
                <motion.div
                  key={k.id}
                  className="cursor-pointer rounded-full border border-[#384B70]/30 bg-[#384B70]/10 px-3 py-1 text-sm text-[#384B70] transition hover:bg-[#384B70]/30"
                  onClick={() => navigate(`/kanji/detail/${k.id}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {k.kanji_text}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Tugmalar */}
        <motion.div className="flex w-full flex-col gap-3 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex-1 rounded-xl bg-[#384B70] px-5 py-3 text-sm font-semibold text-[#FCFAEE] shadow-md transition hover:bg-[#2f3f62] sm:text-base"
          >
            Asosiy sahifaga qaytish
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex-1 rounded-xl border-2 border-[#384B70] px-5 py-3 text-sm font-semibold text-[#384B70] shadow-md transition hover:bg-[#384B70] hover:text-[#FCFAEE] sm:text-base"
          >
            Chiqish
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
