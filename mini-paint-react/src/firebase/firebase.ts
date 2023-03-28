import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);