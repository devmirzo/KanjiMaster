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
    <footer className="sticky top-0 z-50 border-t border-[#E5E5E0] bg-[#FCFAEE] shadow-md transition-all duration-300 dark:border-[#2F3D57] dark:bg-[#1E2A3C]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-center md:flex-row md:text-left">
        {/* 🔹 Logo va tavsif */}
        <div className="flex flex-col items-center md:items-start">
          <h2
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-extrabold tracking-wide text-[#384B70] transition-colors duration-300 hover:text-[#2E3E5E] dark:text-[#FCFAEE] dark:hover:text-[#E8E4D0]"
          >
            KanjiMast
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#BFC8D8]">
            Yapon tilini o'rganish platformasi
          </p>
        </div>

        {/* 🔹 Pastki matn */}
        <div className="text-center text-sm">
          <p className="text-[#2E2E2E] dark:text-white">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#384B70] dark:text-[#F2C46D]">
              KanjiMast
            </span>
            . Barcha huquqlar himoyalangan.
          </p>
          <p className="mt-2 text-[#6B6B6B] dark:text-[#BFC8D8]">
            Ishlab chiquvchi:{" "}
            <a
              href="https://t.me/DevMirzo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#51648F] transition-all duration-300 hover:text-[#2E3E5E] hover:underline dark:text-[#E8E4D0] dark:hover:text-[#F2C46D]"
            >
              Humoyun Mirzo
            </a>
          </p>
        </div>

        {/* 🔹 Ijtimoiy tarmoqlar */}
        <div className="flex items-center space-x-4">
          {/* Telegram */}
          <a
            href="https://t.me/DevMirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#E5E5E0] bg-white text-[#51648F] transition-all duration-300 hover:scale-110 hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
            title="Telegram"
          >
            <FaTelegramPlane className="text-xl" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/devmirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#E5E5E0] bg-white text-[#51648F] transition-all duration-300 hover:scale-110 hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
            title="GitHub"
          >
            <FaGithub className="text-xl" />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@DevMirzo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#E5E5E0] bg-white text-[#51648F] transition-all duration-300 hover:scale-110 hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
            title="YouTube"
          >
            <FaYoutube className="text-xl" />
          </a>

          {/* About sahifasi */}
          <Link
            to="/about"
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#E5E5E0] bg-white text-[#51648F] transition-all duration-300 hover:scale-110 hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
            title="Biz haqimizda"
          >
            <FaInfoCircle className="text-xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
