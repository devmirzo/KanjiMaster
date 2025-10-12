// src/components/global/Error.jsx
import React from "react";

const Error = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAEE] px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-xl shadow-lg max-w-md w-full text-center animate-fadeIn">
        <h2 className="text-2xl font-bold mb-2">❌ Xatolik yuz berdi</h2>
        <p className="mb-4 text-gray-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            Qayta urinib ko‘rish
          </button>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Error;
