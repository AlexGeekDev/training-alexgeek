import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDkHrT2ATQDx58ofPBaemyiZPr9zqtn8Q8",

  authDomain: "trainingalexgeek.firebaseapp.com",

  projectId: "trainingalexgeek",

  storageBucket: "trainingalexgeek.appspot.com",

  messagingSenderId: "427391603868",

  appId: "1:427391603868:web:5c648cfa1887308f900959",

  measurementId: "G-BP4MKP7ZP3",
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);
const auth = getAuth();
const googleAuth = new GoogleAuthProvider();
const faceAuth = new FacebookAuthProvider();
const functions = getFunctions();

export {
  firebase,
  auth,
  googleAuth,
  faceAuth,
  db,
  storage,
  functions,
  analytics,
};

export default firebaseConfig;
