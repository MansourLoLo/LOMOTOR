// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FIREBASE_CONFIG = {

  apiKey: "AIzaSyCp_26jj13FSZzAhp7ZYah4LdYAdJ65XVw",
  authDomain: "lomotor-5bac0.firebaseapp.com",
  databaseURL: "https://lomotor-5bac0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lomotor-5bac0",
  storageBucket: "lomotor-5bac0.appspot.com",
  messagingSenderId: "1004371237467",
  appId: "1:1004371237467:web:e27321b50635635defbd7e",
  measurementId: "G-K4WY55JLX5"

};


// Initialize Firebase
const APP = initializeApp(FIREBASE_CONFIG);

export { getDatabase, ref, onValue, push, set };
