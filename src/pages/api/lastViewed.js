import mongoose from "mongoose";

const connectionURL = process.env.DB_URI;
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const lastViewedSchema = new mongoose.Schema(
  {
    user_id: String,
    recipe_id: String,
  },
  { versionKey: false }
);

const LastViewed =
  mongoose.models.lastviewed || mongoose.model("lastviewed", lastViewedSchema);

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing authentication token" });
  }

  const auth = req.headers.authorization;
  switch (method) {
    case "PUT":
      try {
        // Find the existing entry for the user
        const existingEntry = await LastViewed.findOne({ user_id: auth });

        if (existingEntry) {
          // Update the existing entry with the new recipe_id
          existingEntry.recipe_id = body.recipeData;
          await existingEntry.save();

          res.status(200).json({ message: "Last viewed recipe updated" });
        } else {
          // Create a new entry if no existing entry is found
          const lastViewed = new LastViewed({
            user_id: auth,
            recipe_id: body.recipeData,
          });
          await lastViewed.save();

          res.status(200).json({ message: "Last viewed recipe added" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating last viewed recipe" });
      }
      break;

    case "GET":
      try {
        // Retrieve lastViewed data for the specific user
        const lastViewedData = await LastViewed.find({ user_id: auth });

        res.status(200).json(lastViewedData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving lastViewed data" });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
