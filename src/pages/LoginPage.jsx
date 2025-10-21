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
      <div className="flex min-h-screen items-center justify-center bg-[#FCFAEE] dark:bg-[#1E2A3C]">
        <p className="text-lg font-semibold text-[#384B70] dark:text-[#F2C46D]">
          ⏳ Yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl border-2 border-[#E5E5E0] bg-white p-10 shadow-2xl dark:border-[#2F3D57] dark:bg-[#263347]"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="mb-6 text-center text-3xl font-bold text-[#384B70] dark:text-[#FCFAEE]"
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
            <label className="mb-1 block font-semibold text-[#2E2E2E] dark:text-white">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-[#E5E5E0] bg-[#FCFAEE] p-3 text-[#2E2E2E] placeholder-[#6B6B6B] transition outline-none focus:border-[#384B70] focus:ring-2 focus:ring-[#384B70]/20 dark:border-[#2F3D57] dark:bg-[#1E2A3C] dark:text-white dark:placeholder-[#BFC8D8] dark:focus:border-[#F2C46D] dark:focus:ring-[#F2C46D]/20"
            />
          </div>

          {/* Parol */}
          <div>
            <label className="mb-1 block font-semibold text-[#2E2E2E] dark:text-white">
              Parol
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-[#E5E5E0] bg-[#FCFAEE] p-3 text-[#2E2E2E] placeholder-[#6B6B6B] transition outline-none focus:border-[#384B70] focus:ring-2 focus:ring-[#384B70]/20 dark:border-[#2F3D57] dark:bg-[#1E2A3C] dark:text-white dark:placeholder-[#BFC8D8] dark:focus:border-[#F2C46D] dark:focus:ring-[#F2C46D]/20"
            />
          </div>

          {/* Login tugmasi */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
            className={`w-full rounded-xl border-2 py-3 font-semibold transition ${
              loading
                ? "cursor-not-allowed border-[#7081A1]/50 bg-[#7081A1]/50 text-white dark:border-[#51648F]/50 dark:bg-[#51648F]/50"
                : "border-[#384B70] bg-[#384B70] text-white hover:border-[#2E3E5E] hover:bg-[#2E3E5E] dark:border-[#F2C46D] dark:bg-[#F2C46D] dark:text-[#1E2A3C] dark:hover:border-[#E8E4D0] dark:hover:bg-[#E8E4D0]"
            }`}
          >
            {loading ? "⏳ Kutilmoqda..." : "Kirish"}
          </motion.button>
        </motion.form>

        {/* Yoki */}
        <motion.div
          className="my-6 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-grow border-t border-[#E5E5E0] dark:border-[#2F3D57]"></div>
          <span className="mx-3 text-sm text-[#6B6B6B] dark:text-[#BFC8D8]">
            yoki
          </span>
          <div className="flex-grow border-t border-[#E5E5E0] dark:border-[#2F3D57]"></div>
        </motion.div>

        {/* Google button */}
        <motion.button
          onClick={handleGoogleLogin}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="flex w-full items-center justify-center rounded-xl border-2 border-[#E5E5E0] bg-white py-3 font-semibold text-[#51648F] transition hover:border-[#384B70] hover:bg-[#384B70] hover:text-white dark:border-[#2F3D57] dark:bg-[#263347] dark:text-[#F2C46D] dark:hover:border-[#F2C46D] dark:hover:bg-[#F2C46D] dark:hover:text-[#1E2A3C]"
        >
          <motion.img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="mr-2 h-6 w-6"
            whileHover={{ rotate: 10 }}
          />
          Google orqali kirish
        </motion.button>

        {/* Ro'yxatdan o'tish linki */}
        <motion.p
          className="mt-6 text-center text-sm text-[#6B6B6B] dark:text-[#BFC8D8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hisobingiz yo'qmi?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#51648F] underline transition hover:text-[#2E3E5E] dark:text-[#F2C46D] dark:hover:text-[#E8E4D0]"
          >
            Ro'yxatdan o'tish
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
