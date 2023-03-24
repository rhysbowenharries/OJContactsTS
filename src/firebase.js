// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA46SO0RC2J3IGRTwzwV1xsjfFYuXq9gM",
  authDomain: "contact-list-549e7.firebaseapp.com",
  projectId: "contact-list-549e7",
  storageBucket: "contact-list-549e7.appspot.com",
  messagingSenderId: "154173778744",
  appId: "1:154173778744:web:60c00be32597e639bc6fcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
