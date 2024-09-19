// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASFUTRAMwIpDitAguBzsDrTpDQP0r8KsI",
  authDomain: "gradedlab5-d32e0.firebaseapp.com",
  projectId: "gradedlab5-d32e0",
  storageBucket: "gradedlab5-d32e0.appspot.com",
  messagingSenderId: "235375196816",
  appId: "1:235375196816:web:05cbbf57bce5bbe3a03615",
  measurementId: "G-C6L9KL95QM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);