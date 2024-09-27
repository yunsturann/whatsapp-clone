import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "whatsapp-web-b3525.firebaseapp.com",
  projectId: "whatsapp-web-b3525",
  storageBucket: "whatsapp-web-b3525.appspot.com",
  messagingSenderId: "564032147198",
  appId: "1:564032147198:web:a4c15716e819e7faf71faf",
};

// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
