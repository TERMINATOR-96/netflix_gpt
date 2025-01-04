// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5fg5TO4lb0Hp9Ex8ANyNlRkFUgr9hzZE",
  authDomain: "netflixgpt-ddf00.firebaseapp.com",
  projectId: "netflixgpt-ddf00",
  storageBucket: "netflixgpt-ddf00.firebasestorage.app",
  messagingSenderId: "738716708476",
  appId: "1:738716708476:web:6b00e0ac892a449a57e3f9",
  measurementId: "G-7HY3WWRLW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();