// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Agar foydalanuvchi allaqachon tizimga kirgan bo‘lsa — asosiy sahifaga yuborish
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Google bilan kirish
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Google orqali muvaffaqiyatli kirdingiz! 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google orqali kirishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Email va parol bilan kirish
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`"Tizimga muvaffaqiyatli kirdingiz! 👏"`);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-credential") {
        toast.error("Email yoki parol noto‘g‘ri!");
      } else if (error.code === "auth/user-not-found") {
        toast.error("Bunday foydalanuvchi topilmadi!");
      } else {
        toast.error("Kirishda xatolik: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCFAEE] to-[#e7e9f3]">
      <div className="bg-[#FCFAEE] p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#384B70] mb-6">
          Kirish
        </h1>

        {/* Email va parol formasi */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[#384B70] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#384B70] font-semibold mb-1">
              Parol
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#384B70] text-[#FCFAEE] font-semibold hover:bg-[#2d3c5c] transition"
          >
            {loading ? "⏳ Kutilmoqda..." : "Kirish"}
          </button>
        </form>

        {/* Yoki Google orqali */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[#384B70]/30"></div>
          <span className="mx-3 text-sm text-[#384B70]/70">yoki</span>
          <div className="flex-grow border-t border-[#384B70]/30"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center py-3 rounded-xl border border-[#384B70] text-[#384B70] font-semibold hover:bg-[#384B70] hover:text-[#FCFAEE] transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Google orqali kirish
        </button>

        {/* Ro‘yxatdan o‘tishga o‘tish */}
        <p className="mt-6 text-sm text-center text-[#384B70]/80">
          Hisobingiz yo‘qmi?{" "}
          <Link
            to="/register"
            className="text-[#384B70] font-semibold underline hover:text-[#2d3c5c]"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
