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
    likes: Number,
    dislikes: Number,
  },
  { versionKey: false }
);

let Comment;
try {
  Comment = mongoose.model("comment", commentSchema);
} catch {
  Comment = mongoose.model("comment");
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
            const childComments = await Comment.find({
              recipe_id: query.recipe_id,
              parent_id: comment._id
            });
      
            comment._doc.hasChildren = childComments.length > 0;
            console.log(comment);
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
              likes: 0,
              dislikes: 0,
            });
            await comment.save();
            console.log("Added Comment", comment);
            res.status(200).json({ message: "Commment added" });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error adding comment" });
          }
          break;

        //   case "like":
        //   try {
        //     const comment = await Comment.findOneAndUpdate(
        //       { _id: body.id },
        //       { $inc: { "likes": 1 }}
        //     );
        //     if (comment) {
        //       console.log("Liked comment");
        //       res.status(200).json({ message: "Liked comment" });
        //     } else {
        //       res.status(404).json({ message: "Comment not found" });
        //     }
        //   } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ message: "Error liking comment" });
        //   }
        //   break;

        // case "dislike":
        //   try {
        //     const comment = await Comment.findOneAndUpdate(
        //       { _id: body.id },
        //       { $inc: { "likes": 1 }}
        //     );
        //     if (comment) {
        //       console.log("Liked comment");
        //       res.status(200).json({ message: "Liked comment" });
        //     } else {
        //       res.status(404).json({ message: "Comment not found" });
        //     }
        //   } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ message: "Error liking comment" });
        //   }
        //   break;
        // } catch (error) {
        //   console.error(error);
        //   res.status(500).json({ message: "Error viewing favorites" });
        // }
        // break;

        // default:
        //   res.status(404).send({ message: "Action not found"});
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
