import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTelegramPlane,
  FaGithub,
  FaYoutube,
  FaInfoCircle,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-[#384B70]/20 bg-[#FCFAEE] text-[#384B70] shadow-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-8 text-center md:flex-row md:text-left">
        {/* 🔹 Logo nomi */}
        <h2
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-extrabold tracking-wide text-[#384B70] transition-colors duration-300 hover:text-[#2E3E5E]"
        >
          KanjiMast
        </h2>

        {/* 🔹 Pastki matn */}
        <div className="pt-4 text-center text-sm text-[#384B70]/80 transition-colors duration-300">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#384B70]">KanjiMast</span>. All
            rights reserved.
          </p>
          <p className="mt-1">
            Developed by{" "}
            <a
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#384B70] transition-all duration-300 hover:text-[#2E3E5E] hover:underline"
            >
              Humoyun Mirzo
            </a>
          </p>
        </div>

        {/* 🔹 Ijtimoiy tarmoqlar */}
        <div className="mt-4 flex items-center space-x-6 text-2xl md:mt-0">
          {/* Telegram */}
          <a
            href="https://t.me/DevMirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#384B70] transition-all duration-300 hover:text-[#2E3E5E]"
          >
            <FaTelegramPlane className="transition-transform duration-300 hover:scale-110" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/devmirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#384B70] transition-all duration-300 hover:text-[#2E3E5E]"
          >
            <FaGithub className="transition-transform duration-300 hover:scale-110" />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@DevMirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#384B70] transition-all duration-300 hover:text-[#2E3E5E]"
          >
            <FaYoutube className="transition-transform duration-300 hover:scale-110" />
          </a>

          {/* About sahifasi */}
          <Link
            to="/about"
            className="text-[#384B70] transition-all duration-300 hover:text-[#2E3E5E]"
          >
            <FaInfoCircle className="transition-transform duration-300 hover:scale-110" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
