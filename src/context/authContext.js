import { createContext } from "react";
import { initFirebase } from "../../firebase/firebaseApp";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    await signOut(auth);
  };

  return (
    <authContext.Provider value={{ signIn, signOut, user, loading, error }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
