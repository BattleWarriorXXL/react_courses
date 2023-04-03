import { initializeApp, } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { getFirestore, getDoc, setDoc } from "firebase/firestore";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const Firebase = {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    getDoc,
    setDoc
};

export default Firebase;
