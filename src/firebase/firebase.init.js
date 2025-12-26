// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVDxchwcLVl3_spYNQFyFdHR6t43IkR5E",
    authDomain: "project-pluse.firebaseapp.com",
    projectId: "project-pluse",
    storageBucket: "project-pluse.firebasestorage.app",
    messagingSenderId: "393242981702",
    appId: "1:393242981702:web:eeb41b96ac0b9736f82147"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);