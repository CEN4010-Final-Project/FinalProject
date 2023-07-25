import { useContext } from "react";
import authContext from "@/context/authContext";

const LandingPage = () => {
  const ctx = useContext(authContext);

  return (
    <div>
      <button
        className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="button"
        onClick={ctx.signIn}
      >
        Sign In
      </button>
    </div>
  );
};

const HomePage = () => {
  return <>Welcome</>;
};

const index = () => {
  const ctx = useContext(authContext);
  if (ctx.loading) {
    return <>Loading...</>;
  }

  if (ctx.user) {
    return <HomePage />;
  }
  return <LandingPage />;
};

export default index;
