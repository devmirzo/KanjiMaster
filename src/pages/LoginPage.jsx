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
    document.title = `Login`;
  }, []);

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
      <div className="flex min-h-screen items-center justify-center bg-[#FCFAEE]">
        <p className="text-lg font-semibold text-[#384B70]">
          ⏳ Yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl border border-[#384B70] bg-[#FCFAEE] p-10 shadow-2xl"
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
          Kirish
        </motion.h1>

        <motion.form
          onSubmit={handleLogin}
          className="space-y-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Email */}
          <div>
            <label className="mb-1 block font-semibold text-[#384B70]">
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
              className="w-full rounded-xl border border-[#384B70] p-2 outline-none focus:ring-2 focus:ring-[#384B70]"
            />
          </div>

          {/* Parol */}
          <div>
            <label className="mb-1 block font-semibold text-[#384B70]">
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
              className="w-full rounded-xl border border-[#384B70] p-2 outline-none focus:ring-2 focus:ring-[#384B70]"
            />
          </div>

          {/* Login tugmasi */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
            className={`w-full rounded-xl py-2 font-semibold ${
              loading
                ? "cursor-not-allowed bg-[#384B70]/50 text-[#FCFAEE]"
                : "bg-[#384B70] text-[#FCFAEE] hover:bg-[#2d3c5c]"
            }`}
          >
            {loading ? "⏳ Kutilmoqda..." : "Kirish"}
          </motion.button>
        </motion.form>

        {/* Yoki */}
        <motion.div
          className="my-3 flex items-center"
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
          className="flex w-full items-center justify-center rounded-xl border border-[#384B70] py-2 font-semibold text-[#384B70] transition hover:bg-[#384B70] hover:text-[#FCFAEE]"
        >
          <motion.img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="mr-2 h-6 w-6"
            whileHover={{ rotate: 10 }}
          />
          Google orqali kirish
        </motion.button>

        {/* Ro‘yxatdan o‘tish linki */}
        <motion.p
          className="mt-6 text-center text-sm text-[#384B70]/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hisobingiz yo‘qmi?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#384B70] underline hover:text-[#2d3c5c]"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
