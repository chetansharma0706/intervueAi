// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg-KJs3ob0y6ohaEoRiHwzC2qIoUx4KwM",
  authDomain: "intervueai-cd54d.firebaseapp.com",
  projectId: "intervueai-cd54d",
  storageBucket: "intervueai-cd54d.firebasestorage.app",
  messagingSenderId: "918056814346",
  appId: "1:918056814346:web:993134b48455e391bb5cf3",
  measurementId: "G-X8XB8EMH3P"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
