import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDK7k52giQ8HDzWoigs60QIv7YDE8kjRwE",
    authDomain: "mini-paint-react.firebaseapp.com",
    projectId: "mini-paint-react",
    storageBucket: "mini-paint-react.appspot.com",
    messagingSenderId: "267381094389",
    appId: "1:267381094389:web:1531ac741e058065e092bc",
    measurementId: "G-6P94SBQPRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
