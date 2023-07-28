// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cop4010-cc351.firebaseapp.com",
  projectId: "cop4010-cc351",
  storageBucket: "cop4010-cc351.appspot.com",
  messagingSenderId: "360802886802",
  appId: "1:360802886802:web:a84a36c2334db9bab7724b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => app;

// export const auth = getAuth(app);
