// src/context/KanjiContext.jsx
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

  // ============================
  // 🗄️ IndexedDB funksiyalari
  // ============================
  const openDB = () =>
    new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open("KanjiDB", 1);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains("kanjiDetails")) {
            db.createObjectStore("kanjiDetails", { keyPath: "id" });
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(request.error || e);
      } catch (e) {
        reject(e);
      }
    });

  const saveToIndexedDB = async (data) => {
    if (!Array.isArray(data)) return;
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("kanjiDetails", "readwrite");
      const store = tx.objectStore("kanjiDetails");
      try {
        data.forEach((item) => store.put(item));
      } catch (e) {
        reject(e);
      }
      tx.oncomplete = () => {
        db.close();
        resolve(true);
      };
      tx.onerror = (e) => {
        db.close();
        reject(tx.error || e);
      };
    });
  };

  const getFromIndexedDB = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("kanjiDetails", "readonly");
      const store = tx.objectStore("kanjiDetails");
      const req = store.getAll();
      req.onsuccess = () => {
        db.close();
        resolve(req.result || []);
      };
      req.onerror = (e) => {
        db.close();
        reject(req.error || e);
      };
    });
  };

  // ============================
  // 🔸 Kanji ma’lumotlarini olish
  // ============================
  useEffect(() => {
    let isMounted = true;
    let parsed = null;

    const fetchKanjis = async () => {
      try {
        // 1️⃣ LocalStorage’dan tez yuklash
        const cachedData = localStorage.getItem("kanjis");
        if (cachedData) {
          parsed = JSON.parse(cachedData);
          if (isMounted) {
            setKanjis(parsed);
            setLevels([...new Set(parsed.map((k) => k.level).filter(Boolean))]);
            setLoading(false);
          }
        }

        // 2️⃣ IndexedDB’dan yuklash
        const indexedData = await getFromIndexedDB();
        if (indexedData.length > 0 && parsed && isMounted) {
          const merged = parsed.map((k) => {
            const heavy = indexedData.find((d) => d.id === k.id);
            return heavy ? { ...k, ...heavy } : k;
          });
          setKanjis(merged);
        } else if (indexedData.length > 0 && !parsed && isMounted) {
          setKanjis(indexedData);
          setLevels([
            ...new Set(indexedData.map((k) => k.level).filter(Boolean)),
          ]);
        }

        // 3️⃣ Supabase’dan so‘nggi versiyasini olish
        const { data, error: sbError } = await supabase
          .from("kanji")
          .select("*");
        if (sbError) throw sbError;

        const lightData = data.map(
          ({ id, kanji_text, onyomi, kunyomi, tarjima, level }) => ({
            id,
            kanji_text,
            onyomi,
            kunyomi,
            tarjima,
            level,
          })
        );

        const heavyData = data.map(
          ({ id, stroke_video, stroke_order_svgs, examples }) => ({
            id,
            stroke_video,
            stroke_order_svgs,
            examples,
          })
        );

        localStorage.setItem("kanjis", JSON.stringify(lightData));
        await saveToIndexedDB(heavyData);

        if (isMounted) {
          setKanjis(data);
          setLevels([...new Set(data.map((k) => k.level).filter(Boolean))]);
        }
      } catch (err) {
        console.error("❌ Ma’lumot olishda xatolik:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchKanjis();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================
  // 🔹 Kanji darajasi bo‘yicha filter
  // ============================
  const getKanjisByLevel = (level) => {
    if (!level) return [];
    return kanjis.filter((k) => k.level?.toLowerCase() === level.toLowerCase());
  };

  // ============================
  // 🔸 Firebase foydalanuvchi holatini kuzatish
  // ============================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL,
            provider: currentUser.providerData?.[0]?.providerId,
          })
        );
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ============================
  // 🔸 Auth funksiyalari
  // ============================
  const registerWithEmail = async (email, password, name) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, { displayName: name });
    setUser(auth.currentUser);
  };

  const loginWithEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    sessionStorage.removeItem("user");
  };

  // ============================
  // 🔸 Context return
  // ============================
  return (
    <KanjiContext.Provider
      value={{
        // 🔹 Kanji ma’lumotlari
        kanjis,
        levels,
        loading,
        error,
        getKanjisByLevel, // ✅ qo‘shildi

        // 🔹 Auth ma’lumotlari
        user,
        authLoading,
        setUser,
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
