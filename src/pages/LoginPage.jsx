// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useKanjis } from "../context/KanjiContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, authLoading, loginWithEmail, loginWithGoogle } = useKanjis();

  useEffect(() => {
    if (!authLoading && user) navigate("/");
  }, [user, authLoading, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success("Google orqali muvaffaqiyatli kirdingiz! 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google orqali kirishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginWithEmail(email, password);
      toast.success("Tizimga muvaffaqiyatli kirdingiz! 👏");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Kirishda xatolik: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAEE]">
        <p className="text-[#384B70] text-lg font-semibold">
          ⏳ Yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCFAEE] to-[#e7e9f3]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-[#FCFAEE] p-10 rounded-3xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-[#384B70] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Kirish
        </motion.h1>

        <motion.form
          onSubmit={handleLogin}
          className="space-y-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Email */}
          <div>
            <label className="block text-[#384B70] font-semibold mb-1">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70] outline-none"
            />
          </div>

          {/* Parol */}
          <div>
            <label className="block text-[#384B70] font-semibold mb-1">
              Parol
            </label>
            <motion.input
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70] outline-none"
            />
          </div>

          {/* Login tugmasi */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
            className={`w-full py-3 rounded-xl font-semibold ${
              loading
                ? "bg-[#7b8bb4] text-[#FCFAEE] cursor-not-allowed"
                : "bg-[#384B70] text-[#FCFAEE] hover:bg-[#2d3c5c]"
            }`}
          >
            {loading ? "⏳ Kutilmoqda..." : "Kirish"}
          </motion.button>
        </motion.form>

        {/* Yoki Google orqali */}
        <motion.div
          className="flex items-center my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-grow border-t border-[#384B70]/30"></div>
          <span className="mx-3 text-sm text-[#384B70]/70">yoki</span>
          <div className="flex-grow border-t border-[#384B70]/30"></div>
        </motion.div>

        {/* Google button */}
        <motion.button
          onClick={handleGoogleLogin}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="w-full flex items-center justify-center py-3 rounded-xl border border-[#384B70] text-[#384B70] font-semibold hover:bg-[#384B70] hover:text-[#FCFAEE] transition"
        >
          <motion.img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6 mr-2"
            whileHover={{ rotate: 10 }}
          />
          Google orqali kirish
        </motion.button>

        {/* Ro‘yxatdan o‘tish linki */}
        <motion.p
          className="mt-6 text-sm text-center text-[#384B70]/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hisobingiz yo‘qmi?{" "}
          <Link
            to="/register"
            className="text-[#384B70] font-semibold underline hover:text-[#2d3c5c]"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
