import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCTrc-mGje8MWzRA1LdbRfZ1tPQng6dZZU",
  authDomain: "practice-firebase-67e62.firebaseapp.com",
  projectId: "practice-firebase-67e62",
  storageBucket: "practice-firebase-67e62.appspot.com",
  messagingSenderId: "269337360560",
  appId: "1:269337360560:web:eb7342ff38246ddb136375",
  measurementId: "G-SJGBDBZSWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;