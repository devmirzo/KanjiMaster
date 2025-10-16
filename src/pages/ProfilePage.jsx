import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, logout } = useKanjis();
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

  if (!user) {
    return (
      <motion.div
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-[#384B70]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="mb-5 text-2xl font-semibold sm:text-3xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Siz hali tizimga kirmagansiz
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="rounded-xl bg-[#384B70] px-6 py-3 text-base text-[#FCFAEE] shadow-md transition hover:bg-[#2f3f62] hover:shadow-xl sm:text-lg"
        >
          Kirish sahifasiga o‘tish
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center  p-4 sm:p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex w-full max-w-md flex-col items-center rounded-3xl border border-[#384B70]/20 bg-white/70 p-6 text-center shadow-2xl backdrop-blur-lg sm:max-w-lg sm:p-8"
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
          <div className="absolute inset-0 rounded-full bg-[#384B70]/10 transition duration-300 group-hover:bg-[#384B70]/20"></div>
        </motion.div>

        {/* Ism */}
        <motion.h2
          className="text-2xl font-bold text-[#384B70] sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {user.displayName || "Foydalanuvchi"}
        </motion.h2>

        {/* Email */}
        <motion.p
          className="mt-2 text-sm break-all text-gray-700 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user.email}
        </motion.p>

        {/* Hisob turi */}
        <motion.p
          className="mt-1 text-xs text-gray-500 italic sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {user.providerData?.[0]?.providerId === "google.com"
            ? "Google orqali kirilgan"
            : "Qo‘lda ro‘yxatdan o‘tilgan"}
        </motion.p>

        <div className="my-6 w-full border-t border-[#384B70]/20"></div>

        {/* Tugmalar */}
        <motion.div
          className="flex w-full flex-col justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#2f4164",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex-1 rounded-xl bg-[#384B70] px-5 py-3 text-sm font-semibold text-[#FCFAEE] shadow-md transition hover:shadow-lg sm:text-base"
          >
            Asosiy sahifaga qaytish
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#384B70",
              color: "#FCFAEE",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex-1 rounded-xl border-2 border-[#384B70] px-5 py-3 text-sm font-semibold text-[#384B70] shadow-md transition hover:shadow-lg sm:text-base"
          >
            Chiqish
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
