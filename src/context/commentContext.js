import { createContext, useState, useEffect } from "react";
import axios from "axios";

const commentContext = createContext();

export const CommentContextProvider = ({ recipe, colors, children }) => {
  const [currentParent, setCurrentParent] = useState(null);
  const [reloadCommentsFlag, setReloadCommentsFlag] = useState(false);
  const reloadComments = () => setReloadCommentsFlag(f => !f);
  const getComments = async (parentID, user) => {
    try {
      const response = await axios(
        `/api/comments?recipe_id=${recipe.id}&parent_id=${
          parentID ? parentID : "null"
        }`,
        { headers: { Authorization: user.uid } }
      );
      return { success: true, response: response }
    } catch (err) {
      return { success: false, response: err.response ? err.response : err }
    }
  };

  const addComment = async (newComment, user) => {
    try {
      const response = await axios.post(
        "/api/comments",
        {
          action: "comment",
          user_name: user.displayName,
          recipe_id: recipe.id,
          parent_id: currentParent ? currentParent._id : null,
          content: newComment,
        },
        { headers: { Authorization: user.uid } }
      );
      return { success: true, response: response }
    } catch (err) {
      return { success: false, response: err.response ? err.response : err  }
    }
  };

  const likeOrDislikeComment = async(commentID, user, likeOrDislike) => {
    try {
      
      const response = await axios.post(
        "/api/comments",
        {
          action: likeOrDislike ? "like" : "dislike",
          comment_id: commentID
        },
        { headers: { Authorization: user.uid } }
      );
      return { success: true, response: response }
    } catch (err) {
      return { success: false, response: err.response ? err.response : err  }
    }
  }

  const removeLikeOrDislike = async(commentID, user) => {
    try {
      const response = await axios.delete(
        `/api/comments?comment_id=${commentID}`,
        { headers: { Authorization: user.uid } }
      );
      return { success: true, response: response }
    } catch (err) {
      return { success: false, response: err.response ? err.response : err  }
    }
  }

  return (
    <commentContext.Provider
      value={{
        recipe,
        colors,
        currentParent,
        setCurrentParent,
        getComments,
        addComment,
        likeOrDislikeComment,
        removeLikeOrDislike,
        reloadComments,
        reloadCommentsFlag,
      }}
    >
      {children}
    </commentContext.Provider>
  );
};

export default commentContext;
