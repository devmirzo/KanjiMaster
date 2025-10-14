import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, logout } = useKanjis();
  const navigate = useNavigate();

  // 🔹 Logout funksiyasi
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

  // 🔹 Agar foydalanuvchi tizimga kirmagan bo‘lsa
  if (!user) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-[#FCFAEE] text-[#384B70] px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Siz hali tizimga kirmagansiz
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="bg-[#384B70] text-[#FCFAEE] px-6 py-3 rounded-xl text-base sm:text-lg hover:bg-[#2e3c5a] transition"
        >
          Kirish sahifasiga o‘tish
        </motion.button>
      </motion.div>
    );
  }

  // 🔹 Profil mavjud bo‘lsa
  return (
    <motion.div
      className="min-h-screen bg-[#FCFAEE] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-6 sm:p-8 text-center border border-[#384B70]/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ boxShadow: "0px 0px 20px rgba(56, 75, 112, 0.3)" }}
      >
        {/* 🔹 Profil rasmi */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img
            src={
              user.photoURL ||
              "https://www.svgrepo.com/show/452030/avatar-default.svg"
            }
            alt={user.displayName || "User"}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#384B70] shadow-md object-cover"
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        </motion.div>

        {/* 🔹 Foydalanuvchi ismi */}
        <motion.h2
          className="text-xl sm:text-2xl font-bold text-[#384B70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {user.displayName || "Foydalanuvchi"}
        </motion.h2>

        {/* 🔹 Email */}
        <motion.p
          className="text-gray-700 mt-2 text-sm sm:text-base break-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user.email}
        </motion.p>

        {/* 🔹 Hisob turi */}
        <motion.p
          className="text-xs sm:text-sm text-gray-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {user.providerData?.[0]?.providerId === "google.com"
            ? "Google orqali kirilgan"
            : "Qo‘lda ro‘yxatdan o‘tilgan"}
        </motion.p>

        <div className="border-t border-gray-300 my-6"></div>

        {/* 🔹 Tugmalar */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2f4164" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-[#384B70] text-[#FCFAEE] px-4 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
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
            className="border-2 border-[#384B70] text-[#384B70] px-4 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
          >
            Chiqish
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
