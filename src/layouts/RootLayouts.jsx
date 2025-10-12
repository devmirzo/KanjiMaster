import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const RootLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAEE] text-[#384B70]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayouts;
