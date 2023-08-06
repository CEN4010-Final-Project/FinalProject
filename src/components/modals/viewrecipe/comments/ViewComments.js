import { useContext, useState } from "react";
import authContext from "@/context/authContext";
import commentContext from "@/context/commentContext";
import CommentList from "./CommentList";

const ViewComments = () => {
  const authCtx = useContext(authContext);
  const commentCtx = useContext(commentContext);
  const [currentComment, setCurrentComment] = useState("");
  const [reloadCommentsFlag, setReloadCommentsFlag] = useState(false);

  const addCommentHandler = async (newComment) => {
    const result = await commentCtx.addComment(newComment, authCtx.user);
    if (result.success) {
      setCurrentComment("");
      commentCtx.reloadComments();
    } else {
      console.log(result.response);
    }
  };

  return (
    <div className="min-h-full flex flex-col">
      <h2 className="text-lg font-semibold">Comments</h2>
      <div className="flex-grow">
      <CommentList
        parentID={null}
        reloadCommentsFlag={reloadCommentsFlag}
      />
      </div>
      <div className="border-t-2">
        <textarea
          className="w-full h-52 md:h-28 p-2 focus:outline-slate-200"
          value={currentComment}
          placeholder="Write your thoughts!"
          onChange={(e) => setCurrentComment(e.target.value)}
          maxLength="150"
        ></textarea>
        <button
          className="relative float-right bg-yellow-200 rounded-lg px-3 py-1 font-semibold z-10 -mt-12 mr-8"
          onClick={() => addCommentHandler(currentComment)}
        >
          Add comment
        </button>
      </div>
    </div>
  );
};

export default ViewComments;
