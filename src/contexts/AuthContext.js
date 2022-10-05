import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      const user = auth.currentUser;
      updateProfile(user, { displayName: name });
    });
  };

  const authUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        console.log(user);
        setUser(user);
      }),
    []
  );

  return (
    <UserContext.Provider
      value={{ createUser, authUser, signInWithGoogle, user, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
