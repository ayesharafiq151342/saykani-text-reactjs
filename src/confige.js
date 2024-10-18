import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvQeSn-TuTYPqWKcUV23SXOfJbjz2u60g",
  authDomain: "test-488fc.firebaseapp.com",
  projectId: "test-488fc",
  storageBucket: "test-488fc.appspot.com", // Make sure this is included in your config
  messagingSenderId: "582465991904",
  appId: "1:582465991904:web:e6bca0a10946248ef38c85",
  measurementId: "G-1SSRQE9B7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app); // Initialize and export Firebase Storage
