// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDq-C5ss22pXBh5qI2qgX4QQWX__J9K7OE",
    authDomain: "tourly-bf7bb.firebaseapp.com",
    projectId: "tourly-bf7bb",
    storageBucket: "tourly-bf7bb.firebasestorage.app",
    messagingSenderId: "488463372318",
    appId: "1:488463372318:web:a0bfeedfce907205731e0f"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);