// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdSrjMdChxGjI-tt6OUk5UzRUx2UcbO34",
  authDomain: "kanban-board-6766f.firebaseapp.com",
  projectId: "kanban-board-6766f",
  storageBucket: "kanban-board-6766f.appspot.com",
  messagingSenderId: "434429465807",
  appId: "1:434429465807:web:ecc1060f66b9795b7b13ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)