import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTelegramPlane,
  FaGithub,
  FaYoutube,
  FaInfoCircle,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate(); // navigate hook

  return (
    <footer className="bg-[#384B70] text-[#FCFAEE] py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* 🔹 Dastur nomi */}
        <h2
          className="text-2xl font-bold tracking-wide mb-4 md:mb-0 cursor-pointer"
          onClick={() => navigate("/")} // bosilganda asosiy sahifaga o'tadi
        >
          KanjiMas
        </h2>

        {/* 🔹 Ijtimoiy tarmoq ikonkalari */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://t.me/DevMirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://github.com/devmirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://youtube.com/@DevMirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-200"
          >
            <FaYoutube />
          </a>

          {/* 🔹 About sahifasiga olib o'tuvchi icon */}
          <Link
            to="/about"
            className="hover:text-amber-400 transition-colors duration-200"
          >
            <FaInfoCircle />
          </Link>
        </div>
      </div>

      {/* 🔹 Pastki yozuv */}
      <div className="border-t border-[#FCFAEE]/20 mt-6 pt-4 text-center text-sm text-[#FCFAEE]/70">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">KanjiMas</span>. All rights reserved.
        </p>
        <p className="mt-1">
          Developed by <span className="font-semibold">Humoyun Mirzo</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
