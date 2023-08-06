import { useContext } from "react";
import authContext from "@/context/authContext";

const ViewCommentsSignedOut = ({ setSelectedTab }) => {
  const authCtx = useContext(authContext);
  const signInHandler = async () => {
    await authCtx.signIn();
    setSelectedTab(4);
  };
  return (
    <p>
      Please{" "}
      <a
        className="cursor-pointer text-blue-600 font-semibold"
        onClick={signInHandler}
      >
        sign in
      </a>{" "}
      to view comments.
    </p>
  );
};

export default ViewCommentsSignedOut;
