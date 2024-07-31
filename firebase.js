// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "inventory-management-a54be.firebaseapp.com",
  projectId: "inventory-management-a54be",
  storageBucket: "inventory-management-a54be.appspot.com",
  messagingSenderId: "1024088555611",
  appId: "1:1024088555611:web:98d77cc440c339ab0e7f7e",
  measurementId: "G-PFCNKF0196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}