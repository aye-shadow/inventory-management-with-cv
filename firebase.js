// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: 'AIzaSyBbpG2kGHVfLY-y6x1p0L1x9vN3WqWTuf8',
  // authDomain: "inventory-management-da261.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: "inventory-management-da261.appspot.com",
  // messagingSenderId: "990344641490",
  // appId: "1:990344641490:web:9e65d5ef8efdd3682ce60b",
  // measurementId: "G-QRBRKQZNNX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { storage, firestore };
