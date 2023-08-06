import mongoose from "mongoose";

const connectionURL = process.env.DB_URI; // Replace with your MongoDB connection URL

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const commentSchema = new mongoose.Schema(
  {
    user_id: String,
    user_name: String,
    recipe_id: String,
    parent_id: String,
    content: String,
    time: Date,
  },
  { versionKey: false }
);

const likeDislikeSchema = new mongoose.Schema(
  {
    user_id: String,
    comment_id: String,
    likeOrDislike: Boolean
  }
);

let Comment;
try {
  Comment = mongoose.model("comment", commentSchema);
} catch {
  Comment = mongoose.model("comment");
}

let LikeDislike;
try {
  LikeDislike = mongoose.model("LikeDislike", likeDislikeSchema);
} catch {
  LikeDislike = mongoose.model("LikeDislike");
}


export default async function handler(req, res) {
  const { method, query, body } = req;
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing authentication token" });
  }

  const auth = req.headers.authorization;
  switch (method) {
    case "GET":
      try {
        let comments = await Comment.find({
          recipe_id: query.recipe_id,
          parent_id: query.parent_id == "null" ? null : query.parent_id
        });
        if (comments.length) {
          for (const comment of comments) {
            // get likes and dislikes

            const likesDislikes = await LikeDislike.find({
              comment_id: comment._id
            });

            comment._doc.likes = likesDislikes.filter(ld => ld.likeOrDislike).length
            comment._doc.dislikes = likesDislikes.filter(ld => !ld.likeOrDislike).length
            const childComments = await Comment.find({
              recipe_id: query.recipe_id,
              parent_id: comment._id
            });
            comment._doc.hasChildren = childComments.length > 0;
            const possibleUserLikeDislike = await LikeDislike.findOne({
              user_id: auth,
              comment_id: comment._id
            })
            comment._doc.userLiked = possibleUserLikeDislike != null && possibleUserLikeDislike.likeOrDislike;
            comment._doc.userDisliked = possibleUserLikeDislike != null && !possibleUserLikeDislike.likeOrDislike;
          }      
          console.log("Listing Comments");
          res.status(200).json({ comments });
        } else {
          res.status(404).json({ message: "Comments not found" });
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error listing comments" });
      }
      break;
    case "POST":
      switch (body.action) {
        case "comment":
          try {
            const comment = new Comment({
              user_id: auth,
              user_name: body.user_name,
              recipe_id: body.recipe_id,
              parent_id: body.parent_id,
              content: body.content,
              time: Date.now(),
            });
            await comment.save();
            console.log("Added Comment", comment);
            res.status(200).json({ message: "Commment added" });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error adding comment" });
          }
          break;

          case "like":
          case "dislike":
          try {
            const likeDislike = new LikeDislike({
              user_id: auth,
              comment_id: body.comment_id,
              likeOrDislike: body.action == "like"
            })
            console.log(likeDislike)
            const comment = await Comment.find({
              _id: body.comment_id
            });
            if (comment) {
              const possibleDuplicate = await LikeDislike.findOne({
                user_id: auth,
                comment_id: body.comment_id,
              });
              if (possibleDuplicate) {
                await LikeDislike.deleteOne({
                  user_id: auth,
                  comment_id: body.comment_id,
                })
              }
              await likeDislike.save();
              //console.log("Liked/Disliked comment");
              res.status(200).json({ message: "Liked/Disliked comment" });
            } else {
              res.status(404).json({ message: "Comment not found" });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error liking/disliking comment" });
          }
          break;

        default:
          res.status(404).send({ message: "Action not found"});
      }
      break;
    
    case "DELETE": // can only remove likes/dislikes, not comments
      const possibleUserLikeDislike = await LikeDislike.findOne({
        user_id: auth,
        comment_id: query.comment_id,
      });
      if (possibleUserLikeDislike) {
        await LikeDislike.deleteOne({
          user_id: auth,
          comment_id: query.comment_id,
        });
        console.log("Like/dislike removed");
        res.status(200).json({ message: "Like/dislike removed" });
      } else {
        res.status(404).json({ message: "Like/dislike not found" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
