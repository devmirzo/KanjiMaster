import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl27iauzwpGW-fMjEGAfWOT2jIJ31SiPY",
  authDomain: "kanjimaster-f40fd.firebaseapp.com",
  projectId: "kanjimaster-f40fd",
  storageBucket: "kanjimaster-f40fd.firebasestorage.app",
  messagingSenderId: "446198147261",
  appId: "1:446198147261:web:8b03319f0ce8acc4e6afd4",
  measurementId: "G-EHQ9V7Q2C2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
