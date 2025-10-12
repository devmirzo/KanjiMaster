import React from "react";
import { useNavigate } from "react-router-dom";
import { useKanjis } from "../context/KanjiContext";

const ProfilePage = () => {
  const { user, logout } = useKanjis();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FCFAEE] text-[#384B70] px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Siz hali tizimga kirmagansiz
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#384B70] text-[#FCFAEE] px-6 py-3 rounded-xl text-base sm:text-lg hover:bg-[#2e3c5a] transition"
        >
          Kirish sahifasiga o‘tish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAEE] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-6 sm:p-8 text-center border border-[#384B70]/20 transition-all duration-300 hover:shadow-[#384B70]/30">
        {/* 🔹 Profil rasmi */}
        <div className="flex justify-center mb-6">
          <img
            src={
              user.photoURL ||
              "https://www.svgrepo.com/show/452030/avatar-default.svg"
            }
            alt={user.displayName || "User"}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#384B70] shadow-md object-cover"
          />
        </div>

        {/* 🔹 Foydalanuvchi ismi */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#384B70]">
          {user.displayName || "Foydalanuvchi"}
        </h2>

        {/* 🔹 Email */}
        <p className="text-gray-700 mt-2 text-sm sm:text-base break-all">
          {user.email}
        </p>

        {/* 🔹 Hisob turi */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {user.providerData?.[0]?.providerId === "google.com"
            ? "Google orqali kirilgan"
            : "Qo‘lda ro‘yxatdan o‘tilgan"}
        </p>

        <div className="border-t border-gray-300 my-6"></div>

        {/* 🔹 Tugmalar */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-[#384B70] text-[#FCFAEE] px-4 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#2f4164] transition text-sm sm:text-base"
          >
            Asosiy sahifaga qaytish
          </button>

          <button
            onClick={logout}
            className="border-2 border-[#384B70] text-[#384B70] px-4 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#384B70] hover:text-[#FCFAEE] transition text-sm sm:text-base"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
