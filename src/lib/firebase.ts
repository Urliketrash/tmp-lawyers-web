// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBMozvymscksF28_zMew5fvFO8T38PnQn0",
  authDomain: "tmp-lawyers-web.firebaseapp.com",
  projectId: "tmp-lawyers-web",
  storageBucket: "tmp-lawyers-web.firebasestorage.app",
  messagingSenderId: "828282393045",
  appId: "1:828282393045:web:b9c334d5d5213ad877ed5c"
};

// Initialize Firebase
// We check if apps are already initialized to avoid "Firebase App named '[DEFAULT]' already exists" error in Next.js
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
