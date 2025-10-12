import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { auth, googleProvider } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const KanjiContext = createContext();

export const KanjiProvider = ({ children }) => {
  // 🔹 Kanji ma’lumotlari
  const [kanjis, setKanjis] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Auth ma’lumotlari
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 🔸 Supabase’dan kanji ma’lumotlarini olish
  useEffect(() => {
    const fetchKanjis = async () => {
      try {
        const { data, error } = await supabase.from("kanji").select("*");
        if (error) throw error;

        setKanjis(data);
        const uniqueLevels = [
          ...new Set(data.map((k) => k.level).filter(Boolean)),
        ];
        setLevels(uniqueLevels);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKanjis();
  }, []);

  // 🔸 Firebase foydalanuvchi holatini kuzatish
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔸 Login & Register funksiyalari
  const registerWithEmail = async (email, password, name) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: name });
      setUser(auth.currentUser);
    } catch (err) {
      console.error("❌ Ro‘yxatdan o‘tishda xatolik:", err.message);
      setError(err.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("❌ Login xatosi:", err.message);
      setError(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("❌ Google login xatosi:", err.message);
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("❌ Chiqishda xatolik:", err.message);
    }
  };

  return (
    <KanjiContext.Provider
      value={{
        // 🔹 Kanji ma’lumotlari
        kanjis,
        levels,
        loading,
        error,

        // 🔹 Auth ma’lumotlari
        user,
        authLoading,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </KanjiContext.Provider>
  );
};

// Custom hook
export const useKanjis = () => useContext(KanjiContext);
