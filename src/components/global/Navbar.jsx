import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKanjis } from "../../context/KanjiContext";
import {
  Menu,
  X,
  LogOut,
  User,
  Heart,
  BookOpen,
  Sun,
  Moon,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useKanjis();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Dark mode holati
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dark mode toggle handler
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#384B70]/20 bg-[#FCFAEE] text-[#384B70] shadow-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 🔹 Logo */}
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-bold tracking-wide text-[#384B70] transition-transform duration-300 hover:scale-105 hover:text-[#2E3E5E]"
        >
          KanjiMast
        </h1>

        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <div
              ref={dropdownRef}
              className="relative flex items-center space-x-3"
            >
              <img
                src={
                  user.photoURL ||
                  "https://www.svgrepo.com/show/452030/avatar-default.svg"
                }
                alt={user.displayName || "User"}
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="h-10 w-10 cursor-pointer rounded-full border-2 border-[#384B70] shadow-[0_0_10px_rgba(56,75,112,0.3)] transition-transform duration-300 hover:scale-105 md:h-12 md:w-12"
              />

              {dropdownOpen && (
                <div className="absolute top-20 right-0 w-56 overflow-hidden rounded-xl border border-[#384B70]/20 bg-[#FCFAEE] text-[#384B70] shadow-md transition-all duration-300">
                  {/* Header + Dark Mode */}
                  <div className="flex items-center justify-between border-b border-[#384B70]/20 px-4 py-2">
                    <span className="text-sm font-semibold">
                      {user.displayName || "Foydalanuvchi"}
                    </span>
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center gap-1 rounded-full px-1 py-1 text-xs font-semibold text-[#384B70]"
                      title={darkMode ? "Light Mode" : "Dark Mode"}
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  </div>

                  {/* Menyu elementlari */}
                  {[
                    {
                      label: "Profil",
                      icon: <User size={18} />,
                      path: "/profile",
                    },
                    {
                      label: "O‘rganilgan",
                      icon: <BookOpen size={18} />,
                      path: "/learned",
                    },
                    {
                      label: "Sevimli",
                      icon: <Heart size={18} />,
                      path: "/favorites",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        navigate(item.path);
                        setDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left transition-all duration-200 hover:bg-[#384B70] hover:text-[#FCFAEE]"
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}

                  {/* Chiqish */}
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2 text-left font-semibold text-[#E63946] transition-all duration-200 hover:bg-[#384B70]/10"
                  >
                    <LogOut size={18} /> Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden gap-3 md:flex">
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg border border-[#384B70]/30 bg-[#FCFAEE] px-4 py-2 font-semibold text-[#384B70]/80 transition-all duration-200 hover:bg-[#384B70] hover:text-[#FCFAEE]"
              >
                Kirish
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-lg border-2 border-[#384B70] bg-transparent px-4 py-2 font-semibold text-[#384B70] transition-all duration-200 hover:bg-[#384B70] hover:text-[#FCFAEE]"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
