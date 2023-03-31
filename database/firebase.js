//import firebase from 'firebase';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjjQufq-HLlTrdQxNG1qMUSoSXK8WIOZQ",
  authDomain: "descobrim-tarrega.firebaseapp.com",
  projectId: "descobrim-tarrega",
  storageBucket: "descobrim-tarrega.appspot.com",
  messagingSenderId: "556968864180",
  appId: "1:556968864180:web:198c1be67c2bdc9eeceae1"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

//const db = firebase.firestore();

export default appFirebase;