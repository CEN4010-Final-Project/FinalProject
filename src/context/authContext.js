import { createContext, useEffect } from "react";
import { initFirebase } from "../../firebase/firebaseApp";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  const signOutRename = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    if (!user) 
      router.push("/")
  }, [user])

  return (
    <authContext.Provider value={{ signIn, signOut: signOutRename, user, loading, error }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
