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
  const [darkMode, setDarkMode] = useState(false);
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
    <nav className="sticky top-0 z-50 border-b border-[#E5E5E0] bg-[#FCFAEE] shadow-md transition-all duration-300 dark:border-[#2F3D57] dark:bg-[#1E2A3C]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 🔹 Logo */}
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-bold tracking-wide text-[#384B70] transition-transform duration-300 hover:scale-105 hover:text-[#2E3E5E] dark:text-[#FCFAEE] dark:hover:text-[#E8E4D0]"
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
                className="h-10 w-10 cursor-pointer rounded-full border-2 border-[#384B70] shadow-md transition-transform duration-300 hover:scale-105 md:h-12 md:w-12 dark:border-[#F2C46D]"
              />

              {dropdownOpen && (
                <div className="absolute top-20 right-0 w-56 overflow-hidden rounded-xl border border-[#E5E5E0] bg-white shadow-lg transition-all duration-300 dark:border-[#2F3D57] dark:bg-[#263347]">
                  {/* Header + Dark Mode */}
                  <div className="flex items-center justify-between border-b border-[#E5E5E0] bg-[#FCFAEE] px-4 py-3 dark:border-[#2F3D57] dark:bg-[#1E2A3C]">
                    <span className="text-sm font-semibold text-[#2E2E2E] dark:text-white">
                      {user.displayName || "Foydalanuvchi"}
                    </span>
                    {/* <button
                      onClick={toggleDarkMode}
                      className="flex items-center justify-center rounded-full p-1.5 text-[#384B70] transition-all duration-200 hover:bg-[#384B70] hover:text-white dark:text-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
                      title={darkMode ? "Light Mode" : "Dark Mode"}
                    >
                      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button> */}
                  </div>

                  {/* Menyu elementlari */}
                  {[
                    {
                      label: "Profil",
                      icon: <User size={18} />,
                      path: "/profile",
                    },
                    {
                      label: "O'rganilgan",
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
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-[#6B6B6B] transition-all duration-200 hover:bg-[#384B70] hover:text-white dark:text-[#BFC8D8] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
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
                    className="flex w-full items-center gap-3 rounded-b-xl px-4 py-3 text-left font-semibold text-[#E63946] transition-all duration-200 hover:bg-[#E63946] hover:text-white dark:text-[#FF6B6B] dark:hover:bg-[#FF6B6B] dark:hover:text-[#1E2A3C]"
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
                className="rounded-lg border-2 border-[#E5E5E0] bg-white px-5 py-2.5 font-semibold text-[#51648F] transition-all duration-200 hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
              >
                Kirish
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-lg border-2 border-[#384B70] bg-[#384B70] px-5 py-2.5 font-semibold text-white transition-all duration-200 hover:border-[#2E3E5E] hover:bg-[#2E3E5E] dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:border-[#E8E4D0] dark:hover:bg-[#E8E4D0]"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
