import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import commentContext from "@/context/commentContext";
import Comment from "./Comment";

const CommentList = ({ parentID, className }) => {
  const authCtx = useContext(authContext);
  const commentCtx = useContext(commentContext);
  const [comments, setComments] = useState(null);
  

  const getComments = async () => {
    const result = await commentCtx.getComments(parentID, authCtx.user);
    if (result.success) {
      setComments(result.response.data.comments);
    } else if (result.response?.status == 404) {
      setComments([]);
    } else {
      console.log(result.response);
    }
  };

  useEffect(() => {
    getComments();
  }, [commentCtx.reloadCommentsFlag]);

  return comments && (
    <div className={`mb-3 ${className} ${parentID == null ? "" : "border-l-2 pl-4"}`}>
      {comments.length ? (
        comments.map((comment, index) => (
          <Comment
            key={comment._id}
            comment={comment}
            index={index}
          />
        ))
      ) : (
        <p className="mt-2">No comments found.</p>
      )}
    </div>
  );
};

export default CommentList;
