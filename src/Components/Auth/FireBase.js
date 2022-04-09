import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCmdfQYpfkUaXJ-xkObvbsqGh7uc03FH0o",
  authDomain: "hackcovit.firebaseapp.com",
  projectId: "hackcovit",
  storageBucket: "hackcovit.appspot.com",
  messagingSenderId: "1068590734279",
  appId: "1:1068590734279:web:7caf22e7e05328107e97e2",
  measurementId: "G-VBR8ZDKN36"
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Logged in");
  } else {
    console.log("Logged Out");
  }
});
