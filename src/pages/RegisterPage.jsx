import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useKanjis } from "../context/KanjiContext";

const RegisterPage = () => {
  const { setUser } = useKanjis();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Agar foydalanuvchi login bo‘lsa, avtomatik yo‘naltiramiz
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser]);

  // ✅ Google orqali login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      toast.success("Google orqali muvaffaqiyatli kirildi!");
      navigate("/");
    } catch (error) {
      toast.error("Google orqali kirishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Email orqali ro‘yxatdan o‘tish
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Parollar mos emas! Iltimos, tekshirib qayta kiriting.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: name });
      setUser({ ...userCredential.user, displayName: name });

      toast.success("🎉 Ro‘yxatdan o‘tish muvaffaqiyatli!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Xatolik: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCFAEE] to-[#e7e9f3]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        className="bg-[#FCFAEE] p-10 rounded-3xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-[#384B70] mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Ro‘yxatdan o‘tish
        </motion.h1>

        {/* 🔹 Forma */}
        <motion.form
          onSubmit={handleRegister}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* 🔸 Ism */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-[#384B70] font-semibold mb-1">
              Ism
            </label>
            <input
              type="text"
              placeholder="Humoyun Mirzo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70]"
            />
          </motion.div>

          {/* 🔸 Email */}
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
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70]"
            />
          </div>

          {/* 🔸 Parol */}
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
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70]"
            />
          </div>

          {/* 🔸 Parolni tasdiqlash */}
          <div>
            <label className="block text-[#384B70] font-semibold mb-1">
              Parolni tasdiqlang
            </label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-[#384B70]/30 rounded-xl focus:ring-2 focus:ring-[#384B70]"
            />
          </div>

          {/* 🔹 Submit tugmasi */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-[#7b8bb4] text-[#FCFAEE] cursor-not-allowed"
                : "bg-[#384B70] text-[#FCFAEE] hover:bg-[#2d3c5c]"
            }`}
          >
            {loading ? "⏳ Kutilmoqda..." : "Ro‘yxatdan o‘tish"}
          </motion.button>
        </motion.form>

        {/* 🔹 Yoki Google orqali */}
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

        {/* 🔹 Google tugmasi */}
        <motion.button
          onClick={handleGoogleLogin}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center py-3 rounded-xl border border-[#384B70] text-[#384B70] font-semibold hover:bg-[#384B70] hover:text-[#FCFAEE] transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Google orqali kirish
        </motion.button>

        {/* 🔹 Login link */}
        <motion.p
          className="mt-6 text-sm text-center text-[#384B70]/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="text-[#384B70] font-semibold underline hover:text-[#2d3c5c]"
          >
            Kirish
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
