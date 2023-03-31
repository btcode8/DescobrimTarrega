import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjjQufq-HLlTrdQxNG1qMUSoSXK8WIOZQ",
  authDomain: "descobrim-tarrega.firebaseapp.com",
  projectId: "descobrim-tarrega",
  storageBucket: "descobrim-tarrega.appspot.com",
  messagingSenderId: "556968864180",
  appId: "1:556968864180:web:198c1be67c2bdc9eeceae1",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
