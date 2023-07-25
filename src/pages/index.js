import React from "react";
import { initFirebase } from "../../firebase/firebaseApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const index = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  if (loading) {
    return <div>Loading.....</div>;
  }

  if (user) {
    router.push("/recipes");
    return <div>Welcome {user.displayName}</div>;
  }

  return (
    <div>
      <button
        className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="button"
        onClick={signIn}
      >
        Sign In
      </button>
    </div>
  );
};

export default index;
