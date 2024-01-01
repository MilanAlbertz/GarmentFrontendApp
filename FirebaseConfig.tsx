import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmTOMxgyzfk0YNLZw-zLfPejTWZSBJ5_8",
  authDomain: "stylemateauthentication.firebaseapp.com",
  projectId: "stylemateauthentication",
  storageBucket: "stylemateauthentication.appspot.com",
  messagingSenderId: "1083477596801",
  appId: "1:1083477596801:web:2765695b4558dec1504b80"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);