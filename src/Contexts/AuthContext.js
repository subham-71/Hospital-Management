import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../Components/Auth/FireBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      await setDoc(doc(firestore, "users", user.uid), {
        name: username,
        uid: user.uid,
        email: email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    };
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function createUserDocument(user, additionalData) {
    const userRef = firestore.doc(`users/${user.uid}`);

    const snapshot = userRef.get();

    if (!snapshot.exists) {
      const email = user.email;
      const username = additionalData;
      try {
        userRef.set({
          email,
          username,
        });
      } catch (error) {
        console.log("Error in creating user", error);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    createUserDocument,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
