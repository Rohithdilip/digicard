import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCYPamIarY9QwVQOKp4LYHImuWjey745QA",
  authDomain: "digicard-f9f20.firebaseapp.com",
  projectId: "digicard-f9f20",
  storageBucket: "digicard-f9f20.appspot.com",
  messagingSenderId: "220857435661",
  appId: "1:220857435661:web:002ac831ee6aea60bd7744",
  measurementId: "G-K0VWFT2HGT",
});

const performance = getPerformance();
