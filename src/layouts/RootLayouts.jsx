import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useKanjis } from "../context/KanjiContext";

const RootLayouts = () => {
  const { darkMode } = useKanjis();

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-500 `}
    >
      {/* 🔹 Navbar */}
      <header>
        <Navbar />
      </header>

      {/* 🔹 Asosiy kontent */}
      <main
        className={`container mx-auto w-full flex-grow rounded-2xl transition-all duration-300`}
      >
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayouts;
