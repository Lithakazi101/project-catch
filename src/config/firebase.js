
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore"; 

 

const firebaseConfig = {
  apiKey: "AIzaSyCTb0ckZQBwrsQgrs0d4Vk0BmrgceXpZ7M",
  authDomain: "project-catch-3.firebaseapp.com",
  projectId: "project-catch-3",
  storageBucket: "project-catch-3.appspot.com",
  messagingSenderId: "606579526490",
  appId: "1:606579526490:web:f744ba9c4aeec231bb4163",
  measurementId: "G-F4V1ZP2C41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
const db = getFirestore(app);
export {db};
const colRef = collection(db, 'users');
export {colRef};


