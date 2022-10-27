import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const UserContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const createUser = async (email, password, name) =>
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      const user = auth.currentUser;
      updateProfile(user, { displayName: name });
    });

  const authUser = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => signOut(auth);

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        setUser(user);
      }),
    []
  );

  return (
    <UserContext.Provider
      value={{
        createUser,
        authUser,
        signInWithGoogle,
        user,
        logOut,
        signInWithFacebook,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserAuth = () => useContext(UserContext);
