import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXBWMu_FtZBRjvIFZY30aL1_eatZXjP9M",
  authDomain: "mystore-ecfa1.firebaseapp.com",
  projectId: "mystore-ecfa1",
  storageBucket: "mystore-ecfa1.appspot.com",
  messagingSenderId: "997613429976",
  appId: "1:997613429976:web:f51da7697fefdaf13063ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
