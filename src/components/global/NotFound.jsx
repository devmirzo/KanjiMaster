// src/components/global/NotFound.jsx
import React from "react";

const NotFound = ({ message = "Topilmadi", onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-xl font-semibold text-[#384B70] mb-4">{message}</p>
      {onBack && (
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#384B70] text-[#FCFAEE] rounded-lg hover:bg-[#2C3E5D] transition-colors"
        >
          ← Orqaga
        </button>
      )}
    </div>
  );
};

export default NotFound;
