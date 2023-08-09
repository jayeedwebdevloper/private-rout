// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDF_3gMS6J4qruCoZjYIwWbAo-zI_Vr9hs",
    authDomain: "jayeedemailauth.firebaseapp.com",
    projectId: "jayeedemailauth",
    storageBucket: "jayeedemailauth.appspot.com",
    messagingSenderId: "639258452631",
    appId: "1:639258452631:web:3732501b0798da7516bfd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;