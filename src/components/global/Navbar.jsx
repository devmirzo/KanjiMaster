import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKanjis } from "../../context/KanjiContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useKanjis();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔹 Tashqariga bosilganda menyuni yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#384B70] text-[#FCFAEE] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ✅ Chap tomonda — dastur nomi */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold tracking-wide cursor-pointer hover:text-[#F5EEC2] transition-colors"
        >
          KanjiMas
        </h1>

        {/* ✅ O‘ng tomonda — foydalanuvchi */}
        {user ? (
          <div
            className="flex items-center space-x-3 relative"
            ref={dropdownRef}
          >
            <span className="hidden md:inline font-medium text-lg">
              {user.displayName || "Foydalanuvchi"}
            </span>

            {/* Profil rasmi */}
            <img
              src={
                user.photoURL ||
                "https://www.svgrepo.com/show/452030/avatar-default.svg"
              }
              alt={user.displayName || "User"}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#FCFAEE] cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {/* 🔽 Dropdown menyu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-14 bg-[#FCFAEE] text-[#384B70] rounded-xl shadow-lg py-2 w-40 animate-fade-in">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-[#E6E4D8] transition rounded-t-xl"
                >
                  Profil
                </button>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-[#E6E4D8] transition rounded-b-xl"
                >
                  Chiqish
                </button>
              </div>
            )}
          </div>
        ) : (
          // 🔹 Agar user yo‘q bo‘lsa
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FCFAEE] text-[#384B70] px-4 py-2 rounded-lg font-semibold hover:bg-[#E6E4D8] transition"
            >
              Kirish
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border-2 border-[#FCFAEE] text-[#FCFAEE] px-4 py-2 rounded-lg font-semibold hover:bg-[#FCFAEE] hover:text-[#384B70] transition"
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
