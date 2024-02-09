// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFDpYtz2UikE_HGHJmH4V6ZYcHeGCxfig",
    authDomain: "trello-clone-d2dbe.firebaseapp.com",
    projectId: "trello-clone-d2dbe",
    storageBucket: "trello-clone-d2dbe.appspot.com",
    messagingSenderId: "724651943603",
    appId: "1:724651943603:web:3b7d0e5f4ab8e0c97f32c6",
    measurementId: "G-6PPX2WSKVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);