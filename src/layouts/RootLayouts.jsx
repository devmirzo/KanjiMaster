import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useKanjis } from "../context/KanjiContext";

const RootLayouts = () => {
  const { darkMode } = useKanjis();

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFAEE] transition-colors duration-500 dark:bg-[#1E2A3C]">
      {/* 🔹 Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* 🔹 Asosiy kontent */}
      <main className="container mx-auto w-full flex-grow px-4 py-6 transition-all duration-300 sm:px-6 lg:px-8">
        {/* Dekorativ fon elementlari */}
        <div className="fixed top-32 left-10 -z-10 h-64 w-64 rounded-full bg-[#384B70] opacity-[0.03] blur-3xl dark:bg-[#F2C46D] dark:opacity-[0.05]" />
        <div className="fixed right-10 bottom-32 -z-10 h-72 w-72 rounded-full bg-[#7081A1] opacity-[0.03] blur-3xl dark:bg-[#51648F] dark:opacity-[0.05]" />
        <div className="fixed top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2C46D] opacity-[0.02] blur-3xl dark:opacity-[0.03]" />

        {/* Content wrapper with subtle background */}
        <div className="relative min-h-[calc(100vh-20rem)] rounded-2xl transition-all duration-300">
          <Outlet />
        </div>
      </main>

      {/* 🔹 Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayouts;
