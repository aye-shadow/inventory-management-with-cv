// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inventory-management-da261.firebaseapp.com",
  projectId: "inventory-management-da261",
  storageBucket: "inventory-management-da261.appspot.com",
  messagingSenderId: "990344641490",
  appId: "1:990344641490:web:9e65d5ef8efdd3682ce60b",
  measurementId: "G-QRBRKQZNNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}