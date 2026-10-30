import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxJzVqdnWrsR0qlOJjthaOauAz1HOivlc",
  authDomain: "mentisura.firebaseapp.com",
  projectId: "mentisura",
  storageBucket: "mentisura.firebasestorage.app",
  messagingSenderId: "645491079350",
  appId: "1:645491079350:web:96661e7f645e36f23c0e17",
  measurementId: "G-N3RY2KH4HD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
