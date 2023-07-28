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
  provider.setCustomParameters({
    prompt: "select_account"
  });
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request" && err.code !== "auth/popup-closed-by-user") {
        console.error(err)
      }
    }    
  };

  const signOutRename = async () => {
    await signOut(auth);
  };
  useEffect(() => {

    if (!loading && !user) 
      router.push("/")
  }, [user])

  return (
    <authContext.Provider value={{ signIn, signOut: signOutRename, user, loading, error }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
