import { useContext, useState } from "react";
import authContext from "@/context/authContext";
import commentContext from "@/context/commentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { formattedColor } from "@/helpers/RGBtoHSL";
import CommentList from "./CommentList";

const Comment = ({ comment, index }) => {
  const authCtx = useContext(authContext);
  const commentCtx = useContext(commentContext);
  const [currentReply, setCurrentReply] = useState("");
  const [color, setColors] = useState(
    commentCtx.colors[Math.round(Math.random() * 5)]
  );
  const [showChildComments, setShowChildComments] = useState(false);
  const replying = commentCtx.currentParent == comment;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const difference = new Date().getTime() - date.getTime();
    if (difference < 3600000) {
      return "Just now";
    } else if (difference < 86400000) {
      return "Today";
    } else {
      return dateObject.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year:
          date.getFullYear() == new Date().getFullYear()
            ? undefined
            : "numeric",
      });
    }
  };

  const beginReplyHandler = () => {
    commentCtx.setCurrentParent((prevComment) =>
      prevComment == comment ? null : comment
    );
  };

  const addReplyHandler = async () => {
    const result = await commentCtx.addComment(currentReply, authCtx.user);
    if (result.success) {
      commentCtx.reloadComments();
      setShowChildComments(true);
    } else {
      console.log(result.response);
    }
  };

  return (
    <div key={comment._id} className={`${index > 0 ? "border-t-2" : ""} py-2`}>
      <h3 className="text-zinc-500">
        <strong
          className="font-semibold"
          style={{
            color: formattedColor(color, 40),
          }}
        >
          {comment.user_name}
        </strong>{" "}
        &bull; {comment.time ? formatDate(comment.time) : "no date listed"}
      </h3>
      {
        <div className="flex my-1 gap-2">
          <button className="bg-slate-200 rounded-full p-0.5 px-2.5 text-sm">
            <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
          </button>
          <button className="bg-slate-200 rounded-full p-0.5 px-2.5 text-sm">
            <FontAwesomeIcon icon={faThumbsDown} /> {comment.dislikes}
          </button>
          <button
            className="bg-slate-200 rounded-full p-0.5 px-2.5 text-sm"
            onClick={beginReplyHandler}
          >
            {replying ? "Cancel" : "Reply"}
          </button>
          {comment.hasChildren && (
            <button
              className="bg-slate-200 rounded-full p-0.5 px-2.5 text-sm"
              onClick={() => setShowChildComments((s) => !s)}
            >
              {showChildComments ? "Hide replies" : "Show Replies"}
            </button>
          )}
        </div>
      }
      <div>{comment.content}</div>
      {replying && (
        <div className="border-l-2 pl-4 mt-2 mb-1">
          <textarea
            className="w-full p-2 h-52 md:h-28 focus:outline-slate-200"
            placeholder={`Reply to ${comment.user_name}`}
            value={currentReply}
            onChange={(e) => setCurrentReply(e.target.value)}
            maxLength="150"
          ></textarea>
          <button
            className="relative float-right bg-yellow-200 rounded-lg px-3 py-1 font-semibold z-10 -mt-12 mr-8"
            onClick={addReplyHandler}
          >
            Reply
          </button>
        </div>
      )}
      {showChildComments && (
        <CommentList className="mt-3" parentID={comment._id} />
      )}
    </div>
  );
};

export default Comment;
