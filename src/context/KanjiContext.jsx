import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { auth, googleProvider, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Context yaratish
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

  // 🔹 Favorites va Learned
  const [favorites, setFavorites] = useState([]);
  const [learned, setLearned] = useState([]);

  // ============================
  // 🗄 IndexedDB (Offline caching)
  // ============================
  const openDB = () =>
    new Promise((resolve, reject) => {
      const request = indexedDB.open("KanjiDB", 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("kanjiDetails")) {
          db.createObjectStore("kanjiDetails", { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

  const saveToIndexedDB = async (data) => {
    if (!Array.isArray(data)) return;
    const db = await openDB();
    const tx = db.transaction("kanjiDetails", "readwrite");
    const store = tx.objectStore("kanjiDetails");
    data.forEach((item) => store.put(item));
    return new Promise((resolve) => {
      tx.oncomplete = () => {
        db.close();
        resolve(true);
      };
    });
  };

  const getFromIndexedDB = async () => {
    const db = await openDB();
    const tx = db.transaction("kanjiDetails", "readonly");
    const store = tx.objectStore("kanjiDetails");
    const req = store.getAll();
    return new Promise((resolve) => {
      req.onsuccess = () => {
        db.close();
        resolve(req.result || []);
      };
    });
  };

  // ============================
  // 🔸 Supabase’dan Kanji olish
  // ============================
  useEffect(() => {
    let isMounted = true;
    const fetchKanjis = async () => {
      try {
        const cached = localStorage.getItem("kanjis");
        if (cached && isMounted) {
          const parsed = JSON.parse(cached);
          setKanjis(parsed);
          setLevels([...new Set(parsed.map((k) => k.level))]);
        }

        const indexed = await getFromIndexedDB();
        if (indexed.length && isMounted) setKanjis(indexed);

        const { data, error } = await supabase.from("kanji").select("*");
        if (error) throw error;

        localStorage.setItem("kanjis", JSON.stringify(data));
        await saveToIndexedDB(data);

        if (isMounted) {
          setKanjis(data);
          setLevels([...new Set(data.map((k) => k.level))]);
        }
      } catch (err) {
        console.error("❌ Kanji olishda xato:", err);
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
  // 🔸 Firestore foydalanuvchi ma’lumotlari
  // ============================
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        setFavorites(data.favorites || []);
        setLearned(data.learned || []);
      } else {
        await setDoc(userRef, { favorites: [], learned: [] });
      }
    } catch (err) {
      console.error("❌ Foydalanuvchi ma’lumotlarini olishda xato:", err);
    }
  };

  // ============================
  // 🔸 Favorites funksiyalari
  // ============================
  const toggleFavorite = async (kanjiId) => {
    if (!user) return alert("Avval tizimga kiring!");
    const userRef = doc(db, "users", user.uid);
    const isFav = favorites.includes(kanjiId);
    try {
      await updateDoc(userRef, {
        favorites: isFav ? arrayRemove(kanjiId) : arrayUnion(kanjiId),
      });
      setFavorites((prev) =>
        isFav ? prev.filter((id) => id !== kanjiId) : [...prev, kanjiId],
      );
    } catch (err) {
      console.error("❌ Sevimliga qo‘shishda xato:", err);
    }
  };

  // ============================
  // 🔸 Learned funksiyalari
  // ============================
  const toggleLearned = async (kanjiId) => {
    if (!user) return alert("Avval tizimga kiring!");
    const userRef = doc(db, "users", user.uid);
    const isLearned = learned.includes(kanjiId);
    try {
      await updateDoc(userRef, {
        learned: isLearned ? arrayRemove(kanjiId) : arrayUnion(kanjiId),
      });
      setLearned((prev) =>
        isLearned ? prev.filter((id) => id !== kanjiId) : [...prev, kanjiId],
      );
    } catch (err) {
      console.error("❌ O‘rganilganlarga qo‘shishda xato:", err);
    }
  };

  // ============================
  // 🔸 Auth holatini kuzatish
  // ============================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL,
          }),
        );
        await loadUserData(currentUser.uid);
      } else {
        setUser(null);
        setFavorites([]);
        setLearned([]);
        sessionStorage.removeItem("user");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ============================
  // 🔸 Auth funksiyalar
  // ============================
  const registerWithEmail = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    await setDoc(doc(db, "users", cred.user.uid), {
      favorites: [],
      learned: [],
    });
    setUser(auth.currentUser);
  };

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", result.user.uid);
      const snap = await getDoc(userRef);

      // 🔹 Agar foydalanuvchi hujjati mavjud bo‘lmasa — yangisini yaratamiz
      if (!snap.exists()) {
        await setDoc(userRef, { favorites: [], learned: [] });
      }

      await loadUserData(result.user.uid);
      setUser(result.user);
    } catch (err) {
      console.error("❌ Google orqali kirishda xato:", err.message);
      alert("Google orqali kirishda xatolik yuz berdi!");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setFavorites([]);
    setLearned([]);
    sessionStorage.removeItem("user");
  };

  // 🔹 Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // 🔹 Dark mode toggle
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  // ============================
  // 🔹 LocalStorage dan theme olish
  // ============================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ============================
  // 🔸 Context return
  // ============================
  return (
    <KanjiContext.Provider
      value={{
        kanjis,
        levels,
        loading,
        error,
        user,
        authLoading,
        favorites,
        learned,
        getKanjisByLevel: (level) =>
          kanjis.filter((k) => k.level?.toLowerCase() === level?.toLowerCase()),
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
        toggleFavorite,
        toggleLearned,
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </KanjiContext.Provider>
  );
};

export const useKanjis = () => useContext(KanjiContext);
