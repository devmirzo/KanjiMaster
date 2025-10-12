import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Agar foydalanuvchi allaqachon login bo‘lsa — / sahifaga yo‘naltiramiz
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  // 🔹 Google orqali ro‘yxatdan o‘tish
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Google orqali muvaffaqiyatli kirildi!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google orqali kirishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Email orqali ro‘yxatdan o‘tish
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

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("🎉 Ro‘yxatdan o‘tish muvaffaqiyatli!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Xatolik: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCFAEE] to-[#e7e9f3]">
      {/* 🔔 Toast joylashuvi */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-[#FCFAEE] p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#384B70] mb-6">
          Ro‘yxatdan o‘tish
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* 🔸 Ism */}
          <div>
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
          </div>

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

          {/* 🔸 Ro‘yxatdan o‘tish tugmasi */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-[#7b8bb4] text-[#FCFAEE] cursor-not-allowed"
                : "bg-[#384B70] text-[#FCFAEE] hover:bg-[#2d3c5c]"
            }`}
          >
            {loading ? "⏳ Kutilmoqda..." : "Ro‘yxatdan o‘tish"}
          </button>
        </form>

        {/* 🔸 Google orqali kirish */}
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

        {/* 🔸 Kirish sahifasiga link */}
        <p className="mt-6 text-sm text-center text-[#384B70]/80">
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="text-[#384B70] font-semibold underline hover:text-[#2d3c5c]"
          >
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
