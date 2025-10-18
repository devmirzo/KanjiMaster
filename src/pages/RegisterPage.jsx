import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
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

  useEffect(() => {
    document.title = `Register`;
  }, []);

  // ✅ Agar foydalanuvchi allaqachon login bo‘lsa
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

      navigate("/");
      // Toast global darajada chiqadi
      setTimeout(() => {
        toast.success(`Salom, ${result.user.displayName || "dasturchi"}! 👋`);
      }, 300);
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
        password,
      );

      await updateProfile(userCredential.user, { displayName: name });
      setUser({ ...userCredential.user, displayName: name });

      // Sahifani almashtiramiz
      navigate("/");
      // Toastni biroz kechiktirib global holatda ko‘rsatamiz
      setTimeout(() => {
        toast.success(`🎉 Xush kelibsiz, ${name}! 👋`);
      }, 300);
    } catch (error) {
      toast.error("Xatolik: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FCFAEE] to-[#e7e9f3]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl bg-[#FCFAEE] p-10 shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="mb-6 text-center text-3xl font-bold text-[#384B70]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Ro‘yxatdan o‘tish
        </motion.h1>

        {/* 🔹 Forma */}
        <motion.form
          onSubmit={handleRegister}
          className="space-y-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* 🔸 Ism */}
          <motion.div whileFocus={{ scale: 1.03 }}>
            <label className="block font-semibold text-[#384B70]">Ism</label>
            <motion.input
              type="text"
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              placeholder="Humoyun Mirzo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#384B70]/30 p-2 outline-none focus:ring-2 focus:ring-[#384B70]"
              required
            />
          </motion.div>

          {/* 🔸 Email */}
          <div>
            <label className="block font-semibold text-[#384B70]">Email</label>
            <motion.input
              type="email"
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#384B70]/30 p-2 outline-none focus:ring-2 focus:ring-[#384B70]"
              required
            />
          </div>

          {/* 🔸 Parol */}
          <div>
            <label className="block font-semibold text-[#384B70]">Parol</label>
            <motion.input
              type="password"
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#384B70]/30 p-2 outline-none focus:ring-2 focus:ring-[#384B70]"
              required
            />
          </div>

          {/* 🔸 Parolni tasdiqlash */}
          <div>
            <label className="block font-semibold text-[#384B70]">
              Parolni tasdiqlang
            </label>
            <motion.input
              type="password"
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-[#384B70]/30 p-2 outline-none focus:ring-2 focus:ring-[#384B70]"
              required
            />
          </div>

          {/* 🔹 Submit tugmasi */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className={`w-full rounded-xl py-2 font-semibold transition ${
              loading
                ? "cursor-not-allowed bg-[#7b8bb4] text-[#FCFAEE]"
                : "bg-[#384B70] text-[#FCFAEE] hover:bg-[#2d3c5c]"
            }`}
          >
            {loading ? "⏳ Kutilmoqda..." : "Ro‘yxatdan o‘tish"}
          </motion.button>
        </motion.form>

        {/* 🔹 Yoki Google orqali */}
        <motion.div
          className="my-3 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-grow border-t border-[#384B70]/30"></div>
          <span className="mx-5 text-sm text-[#384B70]/70">yoki</span>
          <div className="flex-grow border-t border-[#384B70]/30"></div>
        </motion.div>

        {/* 🔹 Google tugmasi */}
        <motion.button
          onClick={handleGoogleLogin}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex w-full items-center justify-center rounded-xl border border-[#384B70] py-2 font-semibold text-[#384B70] transition hover:bg-[#384B70] hover:text-[#FCFAEE]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="mr-2 h-6 w-6"
          />
          Google orqali kirish
        </motion.button>

        {/* 🔹 Login link */}
        <motion.p
          className="mt-6 text-center text-sm text-[#384B70]/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#384B70] underline hover:text-[#2d3c5c]"
          >
            Kirish
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
